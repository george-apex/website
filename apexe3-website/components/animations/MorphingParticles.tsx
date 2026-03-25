'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { F1_WIREFRAME_DATA } from './f1WireframeData'

const CAR_LINE_COUNT = 4000
const CHAOS_LINE_COUNT = 500
const POINTS_PER_LINE = 32
const CAR_SCALE = 2.5

function generateF1CarWireframe(): THREE.Vector3[][] {
  const lines: THREE.Vector3[][] = []
  const step = Math.max(1, Math.floor(F1_WIREFRAME_DATA.length / CAR_LINE_COUNT))
  
  for (let i = 0; i < F1_WIREFRAME_DATA.length && lines.length < CAR_LINE_COUNT; i += step) {
    const edge = F1_WIREFRAME_DATA[i]
    const line: THREE.Vector3[] = []
    const [p1, p2] = edge
    for (let j = 0; j < POINTS_PER_LINE; j++) {
      const t = j / (POINTS_PER_LINE - 1)
      line.push(new THREE.Vector3(
        (p1[0] + (p2[0] - p1[0]) * t) * CAR_SCALE,
        (p1[1] + (p2[1] - p1[1]) * t) * CAR_SCALE,
        (p1[2] + (p2[2] - p1[2]) * t) * CAR_SCALE
      ))
    }
    lines.push(line)
  }
  
  for (let i = lines.length - 1; i > 0; i--) {
    const j = Math.floor((i * 2654435761) % (i + 1))
    ;[lines[i], lines[j]] = [lines[j], lines[i]]
  }
  
  return lines
}

function generateChaosLines(): THREE.Vector3[][] {
  const lines: THREE.Vector3[][] = []
  const { inner, outer, extra } = generateTesseractBaseNodes()
  const nodes = [...inner, ...outer, ...extra]
  
  const connections: [number, number][] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = nodes[i].distanceTo(nodes[j])
      if (dist < 1.5 && dist > 0.2) {
        connections.push([i, j])
      }
    }
  }
  
  for (let i = 0; i < CHAOS_LINE_COUNT; i++) {
    const connIdx = i % connections.length
    const [nodeAIdx, nodeBIdx] = connections[connIdx]
    const nodeA = nodes[nodeAIdx]
    const nodeB = nodes[nodeBIdx]
    
    const line: THREE.Vector3[] = []
    for (let j = 0; j < POINTS_PER_LINE; j++) {
      const t = j / (POINTS_PER_LINE - 1)
      line.push(new THREE.Vector3(
        nodeA.x + (nodeB.x - nodeA.x) * t,
        nodeA.y + (nodeB.y - nodeA.y) * t,
        nodeA.z + (nodeB.z - nodeA.z) * t
      ))
    }
    lines.push(line)
  }
  
  return lines
}

function generateTesseractBaseNodes(): { inner: THREE.Vector3[], outer: THREE.Vector3[], extra: THREE.Vector3[] } {
  const inner: THREE.Vector3[] = []
  const outer: THREE.Vector3[] = []
  const extra: THREE.Vector3[] = []
  const innerSize = 0.7
  const outerSize = 1.2
  const yOffset = 0.3
  
  for (let x = -1; x <= 1; x += 2) {
    for (let y = -1; y <= 1; y += 2) {
      for (let z = -1; z <= 1; z += 2) {
        inner.push(new THREE.Vector3(x * innerSize, y * innerSize + yOffset, z * innerSize))
        outer.push(new THREE.Vector3(x * outerSize, y * outerSize + yOffset, z * outerSize))
      }
    }
  }
  
  for (let i = 0; i < 20; i++) {
    const theta = (i / 20) * Math.PI * 2
    const phi = (i % 5) / 5 * Math.PI
    extra.push(new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta) * 1.0,
      Math.cos(phi) * 0.8 + yOffset,
      Math.sin(phi) * Math.sin(theta) * 1.0
    ))
  }
  
  return { inner, outer, extra }
}

interface LineData {
  currentPositions: Float32Array
  chaosPositions: Float32Array
  targetPositions: Float32Array
  morphStartPositions: Float32Array
  visible: boolean
  nodeAIndex: number
  nodeBIndex: number
  nodeAType: 'inner' | 'outer' | 'extra'
  nodeBType: 'inner' | 'outer' | 'extra'
}

function SculptureLines() {
  const groupRef = useRef<THREE.Group>(null)
  const linesDataRef = useRef<LineData[]>([])
  const [phase, setPhase] = useState<'chaos' | 'forming' | 'formed' | 'dissolving'>('chaos')
  const phaseStartRef = useRef(0)
  const morphProgressRef = useRef(0)
  const visibleCountRef = useRef(CHAOS_LINE_COUNT)
  const tesseractTimeRef = useRef(0)
  const dissolveStartTesseractTimeRef = useRef(0)
  
  const chaosLines = useMemo(() => generateChaosLines(), [])
  const targetLines = useMemo(() => generateF1CarWireframe(), [])
  
  useEffect(() => {
    linesDataRef.current = []
    
    const { inner, outer, extra } = generateTesseractBaseNodes()
    const nodes = [...inner, ...outer, ...extra]
    
    const connections: { a: number, b: number, aType: 'inner' | 'outer' | 'extra', bType: 'inner' | 'outer' | 'extra' }[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j])
        if (dist < 1.5 && dist > 0.2) {
          const getType = (idx: number): 'inner' | 'outer' | 'extra' => {
            if (idx < inner.length) return 'inner'
            if (idx < inner.length + outer.length) return 'outer'
            return 'extra'
          }
          connections.push({ a: i, b: j, aType: getType(i), bType: getType(j) })
        }
      }
    }
    
    for (let i = 0; i < CAR_LINE_COUNT; i++) {
      const chaosLine = chaosLines[i % CHAOS_LINE_COUNT]
      const targetLine = targetLines[i] || chaosLine
      const currentPositions = new Float32Array(POINTS_PER_LINE * 3)
      const chaosPositions = new Float32Array(POINTS_PER_LINE * 3)
      const targetPositions = new Float32Array(POINTS_PER_LINE * 3)
      
      chaosLine.forEach((p, j) => {
        currentPositions[j * 3] = p.x
        currentPositions[j * 3 + 1] = p.y
        currentPositions[j * 3 + 2] = p.z
        chaosPositions[j * 3] = p.x
        chaosPositions[j * 3 + 1] = p.y
        chaosPositions[j * 3 + 2] = p.z
      })
      
      targetLine.forEach((p, j) => {
        targetPositions[j * 3] = p.x
        targetPositions[j * 3 + 1] = p.y
        targetPositions[j * 3 + 2] = p.z
      })
      
      const connIdx = i % connections.length
      const conn = connections[connIdx]
      
      const morphStartPositions = new Float32Array(POINTS_PER_LINE * 3)
      
      linesDataRef.current.push({
        currentPositions,
        chaosPositions,
        targetPositions,
        morphStartPositions,
        visible: i < CHAOS_LINE_COUNT,
        nodeAIndex: conn.a,
        nodeBIndex: conn.b,
        nodeAType: conn.aType,
        nodeBType: conn.bType,
      })
    }
    
    visibleCountRef.current = CHAOS_LINE_COUNT
    phaseStartRef.current = performance.now()
  }, [chaosLines, targetLines])
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    const now = performance.now()
    const phaseElapsed = (now - phaseStartRef.current) / 1000
    
    if (phase === 'chaos' && phaseElapsed > 4) {
      linesDataRef.current.forEach(data => {
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          data.morphStartPositions[j] = data.currentPositions[j]
        }
      })
      setPhase('forming')
      phaseStartRef.current = now
      morphProgressRef.current = 0
    } else if (phase === 'forming' && phaseElapsed > 3) {
      setPhase('formed')
      phaseStartRef.current = now
      visibleCountRef.current = CAR_LINE_COUNT
    } else if (phase === 'formed' && phaseElapsed > 3.5) {
      linesDataRef.current.forEach(data => {
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          data.morphStartPositions[j] = data.currentPositions[j]
        }
      })
      dissolveStartTesseractTimeRef.current = tesseractTimeRef.current
      setPhase('dissolving')
      phaseStartRef.current = now
      morphProgressRef.current = 0
    } else if (phase === 'dissolving' && phaseElapsed > 2) {
      setPhase('chaos')
      phaseStartRef.current = now
      visibleCountRef.current = CHAOS_LINE_COUNT
    }
    
    if (phase === 'forming') {
      const progress = Math.min(1, phaseElapsed / 2.5)
      const targetVisible = CHAOS_LINE_COUNT + Math.floor((CAR_LINE_COUNT - CHAOS_LINE_COUNT) * progress)
      visibleCountRef.current = targetVisible
    } else if (phase === 'dissolving') {
      const progress = Math.min(1, phaseElapsed / 2)
      const targetVisible = CAR_LINE_COUNT - Math.floor((CAR_LINE_COUNT - CHAOS_LINE_COUNT) * progress)
      visibleCountRef.current = targetVisible
    }
    
    if (phase === 'chaos') {
      tesseractTimeRef.current += 0.015
    } else if (phase === 'forming') {
      tesseractTimeRef.current += 0.015 * (1 - morphProgressRef.current * 0.8)
    }
    
    const tesseractTime = tesseractTimeRef.current
    const innerSize = 0.7
    const outerSize = 1.2
    const yOffset = 0.3
    const t = (Math.sin(tesseractTime) + 1) * 0.5
    const innerScale = innerSize + (outerSize - innerSize) * t
    const outerScale = outerSize - (outerSize - innerSize) * t
    
    const getNodePosition = (nodeIndex: number, nodeType: 'inner' | 'outer' | 'extra'): THREE.Vector3 => {
      const innerIdx = nodeIndex
      const outerIdx = nodeIndex - 8
      const extraIdx = nodeIndex - 16
      
      if (nodeType === 'inner') {
        const cornerIdx = innerIdx
        const x = (cornerIdx & 1 ? 1 : -1)
        const y = (cornerIdx & 2 ? 1 : -1)
        const z = (cornerIdx & 4 ? 1 : -1)
        return new THREE.Vector3(x * innerScale, y * innerScale + yOffset, z * innerScale)
      } else if (nodeType === 'outer') {
        const cornerIdx = outerIdx
        const x = (cornerIdx & 1 ? 1 : -1)
        const y = (cornerIdx & 2 ? 1 : -1)
        const z = (cornerIdx & 4 ? 1 : -1)
        return new THREE.Vector3(x * outerScale, y * outerScale + yOffset, z * outerScale)
      } else {
        const extraIdxActual = extraIdx
        const theta = (extraIdxActual / 20) * Math.PI * 2
        const phi = (extraIdxActual % 5) / 5 * Math.PI
        const radius = 1.0 + Math.sin(tesseractTime + extraIdxActual * 0.3) * 0.12
        return new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * radius,
          Math.cos(phi) * 0.8 + yOffset,
          Math.sin(phi) * Math.sin(theta) * radius
        )
      }
    }
    
    groupRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line
      const geometry = line.geometry
      const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute
      const data = linesDataRef.current[i]
      
      if (!data) return
      
      const isVisible = i < visibleCountRef.current
      line.visible = isVisible
      
      if (!isVisible) return
      
      if (phase === 'chaos') {
        const nodeA = getNodePosition(data.nodeAIndex, data.nodeAType)
        const nodeB = getNodePosition(data.nodeBIndex, data.nodeBType)
        
        for (let j = 0; j < POINTS_PER_LINE; j++) {
          const pt = j / (POINTS_PER_LINE - 1)
          const x = nodeA.x + (nodeB.x - nodeA.x) * pt
          const y = nodeA.y + (nodeB.y - nodeA.y) * pt
          const z = nodeA.z + (nodeB.z - nodeA.z) * pt
          positionAttr.array[j * 3] = x
          positionAttr.array[j * 3 + 1] = y
          positionAttr.array[j * 3 + 2] = z
          data.currentPositions[j * 3] = x
          data.currentPositions[j * 3 + 1] = y
          data.currentPositions[j * 3 + 2] = z
        }
      } else if (phase === 'forming') {
        morphProgressRef.current = Math.min(1, phaseElapsed / 2.5)
        const t = morphProgressRef.current
        const eased = t < 0.5 
          ? 2 * t * t 
          : 1 - Math.pow(-2 * t + 2, 2) / 2
        
        const nodeA = getNodePosition(data.nodeAIndex, data.nodeAType)
        const nodeB = getNodePosition(data.nodeBIndex, data.nodeBType)
        
        for (let j = 0; j < POINTS_PER_LINE; j++) {
          const pt = j / (POINTS_PER_LINE - 1)
          const tesseractX = nodeA.x + (nodeB.x - nodeA.x) * pt
          const tesseractY = nodeA.y + (nodeB.y - nodeA.y) * pt
          const tesseractZ = nodeA.z + (nodeB.z - nodeA.z) * pt
          
          const x = tesseractX + (data.targetPositions[j * 3] - tesseractX) * eased
          const y = tesseractY + (data.targetPositions[j * 3 + 1] - tesseractY) * eased
          const z = tesseractZ + (data.targetPositions[j * 3 + 2] - tesseractZ) * eased
          
          positionAttr.array[j * 3] = x
          positionAttr.array[j * 3 + 1] = y
          positionAttr.array[j * 3 + 2] = z
          data.currentPositions[j * 3] = x
          data.currentPositions[j * 3 + 1] = y
          data.currentPositions[j * 3 + 2] = z
        }
      } else if (phase === 'formed') {
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          positionAttr.array[j] = data.targetPositions[j]
          data.currentPositions[j] = data.targetPositions[j]
        }
      } else if (phase === 'dissolving') {
        morphProgressRef.current = Math.min(1, phaseElapsed / 2)
        const t = morphProgressRef.current
        const eased = t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2
        
        const nodeA = getNodePosition(data.nodeAIndex, data.nodeAType)
        const nodeB = getNodePosition(data.nodeBIndex, data.nodeBType)
        
        for (let j = 0; j < POINTS_PER_LINE; j++) {
          const pt = j / (POINTS_PER_LINE - 1)
          const targetX = nodeA.x + (nodeB.x - nodeA.x) * pt
          const targetY = nodeA.y + (nodeB.y - nodeA.y) * pt
          const targetZ = nodeA.z + (nodeB.z - nodeA.z) * pt
          
          const x = data.morphStartPositions[j * 3] + (targetX - data.morphStartPositions[j * 3]) * eased
          const y = data.morphStartPositions[j * 3 + 1] + (targetY - data.morphStartPositions[j * 3 + 1]) * eased
          const z = data.morphStartPositions[j * 3 + 2] + (targetZ - data.morphStartPositions[j * 3 + 2]) * eased
          
          positionAttr.array[j * 3] = x
          positionAttr.array[j * 3 + 1] = y
          positionAttr.array[j * 3 + 2] = z
          data.currentPositions[j * 3] = x
          data.currentPositions[j * 3 + 1] = y
          data.currentPositions[j * 3 + 2] = z
        }
      }
      
      positionAttr.needsUpdate = true
    })
    
    groupRef.current.rotation.y = time * 0.08
    groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.08
  })
  
  const lineObjects = useMemo(() => {
    const objects: THREE.Line[] = []
    
    for (let i = 0; i < CAR_LINE_COUNT; i++) {
      const chaosLine = chaosLines[i % CHAOS_LINE_COUNT]
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(POINTS_PER_LINE * 3)
      
      for (let j = 0; j < POINTS_PER_LINE; j++) {
        const p = chaosLine[j]
        positions[j * 3] = p.x
        positions[j * 3 + 1] = p.y
        positions[j * 3 + 2] = p.z
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      
      const material = new THREE.LineBasicMaterial({
        color: '#60A5FA',
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      })
      
      const line = new THREE.Line(geometry, material)
      line.visible = i < CHAOS_LINE_COUNT
      objects.push(line)
    }
    return objects
  }, [chaosLines])
  
  return (
    <group ref={groupRef} position={[-4.5, 1.35, 0]} scale={0.75}>
      {lineObjects.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}
    </group>
  )
}

function GlowParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 50
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return pos
  }, [])
  
  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.elapsedTime
    const posAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      posAttr.array[i3 + 1] += Math.sin(time + i * 0.1) * 0.001
    }
    posAttr.needsUpdate = true
    
    pointsRef.current.rotation.y = time * 0.02
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#5088FF"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function CameraRig() {
  const { camera } = useThree()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    camera.position.x = Math.sin(t * 0.08) * 0.5
    camera.position.y = 2.6 + Math.sin(t * 0.1) * 0.15
    camera.position.x = -4.5 + Math.sin(t * 0.08) * 0.3
    camera.position.z = 5 + Math.cos(t * 0.08) * 0.3
    camera.lookAt(-4.5, 1.35, 0)
  })
  
  return null
}

interface MorphingParticlesProps {
  className?: string
}

export function MorphingParticles({ className = '' }: MorphingParticlesProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [-4.5, 2.6, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#306BFF" />
        <pointLight position={[-10, 5, -10]} intensity={0.2} color="#4A90D9" />
        
        <SculptureLines />
        <GlowParticles />
        <CameraRig />
      </Canvas>
    </div>
  )
}

export default MorphingParticles
