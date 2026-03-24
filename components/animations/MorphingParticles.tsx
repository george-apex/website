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
  
  return lines
}

function generateTesseractNodes(): THREE.Vector3[] {
  const nodes: THREE.Vector3[] = []
  const innerSize = 0.7
  const outerSize = 1.2
  
  for (let x = -1; x <= 1; x += 2) {
    for (let y = -1; y <= 1; y += 2) {
      for (let z = -1; z <= 1; z += 2) {
        nodes.push(new THREE.Vector3(x * innerSize, y * innerSize, z * innerSize))
        nodes.push(new THREE.Vector3(x * outerSize, y * outerSize, z * outerSize))
      }
    }
  }
  
  for (let i = 0; i < 20; i++) {
    const theta = (i / 20) * Math.PI * 2
    const phi = (i % 5) / 5 * Math.PI
    nodes.push(new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta) * 1.0,
      Math.cos(phi) * 0.8,
      Math.sin(phi) * Math.sin(theta) * 1.0
    ))
  }
  
  return nodes
}

function generateChaosLines(): THREE.Vector3[][] {
  const lines: THREE.Vector3[][] = []
  const nodes = generateTesseractNodes()
  
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

function generateDissolveTargets(): THREE.Vector3[][] {
  const lines: THREE.Vector3[][] = []
  const nodes = generateTesseractNodes()
  
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
    const connIdx = (i * 7 + 3) % connections.length
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

interface LineData {
  currentPositions: Float32Array
  chaosPositions: Float32Array
  targetPositions: Float32Array
  dissolvePositions: Float32Array
  visible: boolean
}

function SculptureLines() {
  const groupRef = useRef<THREE.Group>(null)
  const linesDataRef = useRef<LineData[]>([])
  const [phase, setPhase] = useState<'chaos' | 'forming' | 'formed' | 'dissolving'>('chaos')
  const phaseStartRef = useRef(0)
  const morphProgressRef = useRef(0)
  const visibleCountRef = useRef(CHAOS_LINE_COUNT)

  
  const chaosLines = useMemo(() => generateChaosLines(), [])
  const targetLines = useMemo(() => generateF1CarWireframe(), [])
  const dissolveLines = useMemo(() => generateDissolveTargets(), [])
  
  useEffect(() => {
    linesDataRef.current = []
    
    for (let i = 0; i < CAR_LINE_COUNT; i++) {
      const chaosLine = chaosLines[i % CHAOS_LINE_COUNT]
      const targetLine = targetLines[i] || chaosLine
      const dissolveLine = dissolveLines[i % CHAOS_LINE_COUNT] || chaosLine
      const currentPositions = new Float32Array(POINTS_PER_LINE * 3)
      const chaosPositions = new Float32Array(POINTS_PER_LINE * 3)
      const targetPositions = new Float32Array(POINTS_PER_LINE * 3)
      const dissolvePositions = new Float32Array(POINTS_PER_LINE * 3)
      
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
      
      dissolveLine.forEach((p, j) => {
        dissolvePositions[j * 3] = p.x
        dissolvePositions[j * 3 + 1] = p.y
        dissolvePositions[j * 3 + 2] = p.z
      })
      
      linesDataRef.current.push({
        currentPositions,
        chaosPositions,
        targetPositions,
        dissolvePositions,
        visible: i < CHAOS_LINE_COUNT,
      })
    }
    
    visibleCountRef.current = CHAOS_LINE_COUNT
    phaseStartRef.current = performance.now()
  }, [chaosLines, targetLines, dissolveLines])
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    const now = performance.now()
    const phaseElapsed = (now - phaseStartRef.current) / 1000
    
    if (phase === 'chaos' && phaseElapsed > 3) {
      setPhase('forming')
      phaseStartRef.current = now
      morphProgressRef.current = 0
    } else if (phase === 'forming' && phaseElapsed > 4) {
      setPhase('formed')
      phaseStartRef.current = now
      visibleCountRef.current = CAR_LINE_COUNT
    } else if (phase === 'formed' && phaseElapsed > 3) {
      setPhase('dissolving')
      phaseStartRef.current = now
      morphProgressRef.current = 0
    } else if (phase === 'dissolving' && phaseElapsed > 3) {
      setPhase('chaos')
      phaseStartRef.current = now
      visibleCountRef.current = CHAOS_LINE_COUNT
      
      linesDataRef.current.forEach((data, i) => {
        data.visible = i < CHAOS_LINE_COUNT
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          data.currentPositions[j] = data.chaosPositions[j]
        }
      })
    }
    
    if (phase === 'forming') {
      const progress = Math.min(1, phaseElapsed / 3.5)
      const targetVisible = CHAOS_LINE_COUNT + Math.floor((CAR_LINE_COUNT - CHAOS_LINE_COUNT) * progress)
      visibleCountRef.current = targetVisible
    } else if (phase === 'dissolving') {
      const progress = Math.min(1, phaseElapsed / 2.5)
      const targetVisible = CAR_LINE_COUNT - Math.floor((CAR_LINE_COUNT - CHAOS_LINE_COUNT) * progress)
      visibleCountRef.current = targetVisible
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
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          positionAttr.array[j] = data.chaosPositions[j]
        }
      } else if (phase === 'forming') {
        morphProgressRef.current = Math.min(1, phaseElapsed / 3.5)
        const eased = 1 - Math.pow(1 - morphProgressRef.current, 3)
        
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          positionAttr.array[j] = data.chaosPositions[j] + (data.targetPositions[j] - data.chaosPositions[j]) * eased
        }
      } else if (phase === 'formed') {
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          positionAttr.array[j] = data.targetPositions[j]
        }
      } else if (phase === 'dissolving') {
        morphProgressRef.current = Math.min(1, phaseElapsed / 2.5)
        const eased = 1 - Math.pow(1 - morphProgressRef.current, 2)
        
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          positionAttr.array[j] = data.targetPositions[j] + (data.dissolvePositions[j] - data.targetPositions[j]) * eased
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
    <group ref={groupRef}>
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
    camera.position.y = 0.8 + Math.sin(t * 0.1) * 0.15
    camera.position.z = 4 + Math.cos(t * 0.08) * 0.3
    camera.lookAt(0, 0, 0)
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
        camera={{ position: [0, 0.8, 4], fov: 45 }}
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
