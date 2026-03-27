'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { F1_WIREFRAME_DATA } from './f1WireframeData'

const MAX_LINE_COUNT = 4000
const CHAOS_LINE_COUNT = 500
const POINTS_PER_LINE = 32
const CAR_SCALE = 5.25

const MODELS: { name: string; data: typeof F1_WIREFRAME_DATA; scale: number; rotationOffset: number; lineMultiplier?: number }[] = [
  { name: 'f1', data: F1_WIREFRAME_DATA, scale: CAR_SCALE, rotationOffset: 0 },
]

function getModelLineCount(modelIndex: number): number {
  const model = MODELS[modelIndex]
  const baseCount = Math.min(model.data.length, MAX_LINE_COUNT)
  const multiplier = model.lineMultiplier || 1
  return Math.min(baseCount * multiplier, MAX_LINE_COUNT)
}

function generateModelWireframe(modelIndex: number, maxLines?: number): THREE.Vector3[][] {
  const model = MODELS[modelIndex]
  const lines: THREE.Vector3[][] = []
  const edgeCount = model.data.length
  const multiplier = model.lineMultiplier || 1
  const rotationOffset = model.rotationOffset || 0
  
  const cosR = Math.cos(rotationOffset)
  const sinR = Math.sin(rotationOffset)
  
  if (multiplier > 1) {
    const targetCount = maxLines ? Math.min(maxLines, edgeCount * multiplier) : edgeCount * multiplier
    
    for (let i = 0; i < targetCount; i++) {
      const edgeIndex = i % edgeCount
      const copyIndex = Math.floor(i / edgeCount)
      const edge = model.data[edgeIndex]
      const line: THREE.Vector3[] = []
      const [p1, p2] = edge
      
      const offsetScale = 0.003
      const offsetAngle = copyIndex * 0.5
      const offsetX = Math.cos(offsetAngle) * offsetScale * copyIndex
      const offsetY = Math.sin(offsetAngle) * offsetScale * copyIndex
      const offsetZ = Math.cos(offsetAngle + 1) * offsetScale * copyIndex
      
      for (let j = 0; j < POINTS_PER_LINE; j++) {
        const t = j / (POINTS_PER_LINE - 1)
        const x = (p1[0] + (p2[0] - p1[0]) * t) * model.scale + offsetX
        const y = (p1[1] + (p2[1] - p1[1]) * t) * model.scale + offsetY
        const z = (p1[2] + (p2[2] - p1[2]) * t) * model.scale + offsetZ
        
        const rotX = x * cosR - z * sinR
        const rotZ = x * sinR + z * cosR
        
        line.push(new THREE.Vector3(rotX, y, rotZ))
      }
      lines.push(line)
    }
  } else {
    const targetCount = maxLines ? Math.min(maxLines, edgeCount) : edgeCount
    const step = edgeCount / targetCount
    
    for (let i = 0; i < targetCount; i++) {
      const edgeIndex = Math.floor(i * step) % edgeCount
      const edge = model.data[edgeIndex]
      const line: THREE.Vector3[] = []
      const [p1, p2] = edge
      for (let j = 0; j < POINTS_PER_LINE; j++) {
        const t = j / (POINTS_PER_LINE - 1)
        const x = (p1[0] + (p2[0] - p1[0]) * t) * model.scale
        const y = (p1[1] + (p2[1] - p1[1]) * t) * model.scale
        const z = (p1[2] + (p2[2] - p1[2]) * t) * model.scale
        
        const rotX = x * cosR - z * sinR
        const rotZ = x * sinR + z * cosR
        
        line.push(new THREE.Vector3(rotX, y, rotZ))
      }
      lines.push(line)
    }
  }
  
  for (let i = lines.length - 1; i > 0; i--) {
    const j = Math.floor((i * 2654435761) % (i + 1))
    ;[lines[i], lines[j]] = [lines[j], lines[i]]
  }
  
  return lines
}

interface LineData {
  currentPositions: Float32Array
  targetPositions: Float32Array
  morphStartPositions: Float32Array
  visible: boolean
  nodeAIndex: number
  nodeBIndex: number
  nodeAType: 'inner' | 'outer' | 'extra'
  nodeBType: 'inner' | 'outer' | 'extra'
}

type Phase = 'idle' | 'morphing_to_model' | 'showing_model'

function SculptureLines({ position = [-4.5, 1.35, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const linesDataRef = useRef<LineData[]>([])
  const [phase, setPhase] = useState<Phase>('idle')
  const phaseStartRef = useRef(0)
  const morphProgressRef = useRef(0)
  const visibleCountRef = useRef(CHAOS_LINE_COUNT)
  const tesseractTimeRef = useRef(0)
  const morphDurationRef = useRef(2.5)
  const idleDurationRef = useRef(4)
  const currentModelIndexRef = useRef(0)
  const currentLineCountRef = useRef(getModelLineCount(0))
  const hasMorphedRef = useRef(false)
  
  const targetLines = useMemo(() => generateModelWireframe(0, MAX_LINE_COUNT), [])
  
  const getTesseractNodePosition = (
    nodeIndex: number, 
    nodeType: 'inner' | 'outer' | 'extra', 
    time: number
  ): THREE.Vector3 => {
    const innerIdx = nodeIndex
    const outerIdx = nodeIndex - 8
    const extraIdx = nodeIndex - 16
    const yOffset = 0.3
    
    if (nodeType === 'inner') {
      const cornerIdx = innerIdx
      const x = (cornerIdx & 1 ? 1 : -1)
      const y = (cornerIdx & 2 ? 1 : -1)
      const z = (cornerIdx & 4 ? 1 : -1)
      
      const baseSize = 0.7
      const pulseA = Math.sin(time * 1.2 + cornerIdx * 0.5) * 0.15
      const pulseB = Math.sin(time * 0.8 + cornerIdx * 0.3) * 0.1
      const scale = baseSize + pulseA + pulseB
      
      const rotX = Math.sin(time * 0.3 + cornerIdx * 0.2) * 0.1
      const rotZ = Math.cos(time * 0.4 + cornerIdx * 0.15) * 0.1
      
      const rotatedY = y * Math.cos(rotX) - z * Math.sin(rotX)
      const rotatedZ = y * Math.sin(rotX) + z * Math.cos(rotX)
      const finalX = x * Math.cos(rotZ) - rotatedY * Math.sin(rotZ)
      const finalY = x * Math.sin(rotZ) + rotatedY * Math.cos(rotZ)
      
      return new THREE.Vector3(finalX * scale, finalY * scale + yOffset, rotatedZ * scale)
    } else if (nodeType === 'outer') {
      const cornerIdx = outerIdx
      const x = (cornerIdx & 1 ? 1 : -1)
      const y = (cornerIdx & 2 ? 1 : -1)
      const z = (cornerIdx & 4 ? 1 : -1)
      
      const baseSize = 1.2
      const pulseA = Math.sin(time * 0.9 + cornerIdx * 0.4 + Math.PI) * 0.12
      const pulseB = Math.sin(time * 1.1 + cornerIdx * 0.25) * 0.08
      const scale = baseSize + pulseA + pulseB
      
      const rotX = Math.sin(time * 0.25 + cornerIdx * 0.15 + Math.PI * 0.5) * 0.08
      const rotZ = Math.cos(time * 0.35 + cornerIdx * 0.1) * 0.08
      
      const rotatedY = y * Math.cos(rotX) - z * Math.sin(rotX)
      const rotatedZ = y * Math.sin(rotX) + z * Math.cos(rotX)
      const finalX = x * Math.cos(rotZ) - rotatedY * Math.sin(rotZ)
      const finalY = x * Math.sin(rotZ) + rotatedY * Math.cos(rotZ)
      
      return new THREE.Vector3(finalX * scale, finalY * scale + yOffset, rotatedZ * scale)
    } else {
      const extraIdxActual = extraIdx
      const baseTheta = (extraIdxActual / 20) * Math.PI * 2
      const basePhi = (extraIdxActual % 5) / 5 * Math.PI
      
      const thetaOffset = time * 0.4 + extraIdxActual * 0.2
      const phiOffset = Math.sin(time * 0.6 + extraIdxActual * 0.3) * 0.3
      
      const theta = baseTheta + thetaOffset
      const phi = basePhi + phiOffset
      
      const radiusPulse = Math.sin(time * 1.5 + extraIdxActual * 0.4) * 0.15
      const radius = 1.0 + radiusPulse
      
      return new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * radius,
        Math.cos(phi) * 0.8 + yOffset + Math.sin(time * 0.7 + extraIdxActual * 0.5) * 0.1,
        Math.sin(phi) * Math.sin(theta) * radius
      )
    }
  }
  
  const generateTesseractConnections = useMemo(() => {
    const connections: { a: number, b: number, aType: 'inner' | 'outer' | 'extra', bType: 'inner' | 'outer' | 'extra' }[] = []
    
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 8; j++) {
        const bitDiff = i ^ j
        if (bitDiff === 1 || bitDiff === 2 || bitDiff === 4) {
          connections.push({ a: i, b: j, aType: 'inner', bType: 'inner' })
        }
      }
    }
    
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 8; j++) {
        const bitDiff = i ^ j
        if (bitDiff === 1 || bitDiff === 2 || bitDiff === 4) {
          connections.push({ a: i + 8, b: j + 8, aType: 'outer', bType: 'outer' })
        }
      }
    }
    
    for (let i = 0; i < 8; i++) {
      connections.push({ a: i, b: i + 8, aType: 'inner', bType: 'outer' })
    }
    
    for (let i = 0; i < 20; i++) {
      const innerIdx = i % 8
      const outerIdx = (i + 1) % 8
      connections.push({ a: 16 + i, b: innerIdx, aType: 'extra', bType: 'inner' })
      connections.push({ a: 16 + i, b: outerIdx + 8, aType: 'extra', bType: 'outer' })
    }
    
    for (let i = 0; i < 20; i++) {
      for (let j = i + 1; j < 20; j++) {
        if (Math.abs(i - j) <= 2 || Math.abs(i - j) >= 18) {
          connections.push({ a: 16 + i, b: 16 + j, aType: 'extra', bType: 'extra' })
        }
      }
    }
    
    return connections
  }, [])
  
  useEffect(() => {
    linesDataRef.current = []
    
    for (let i = 0; i < MAX_LINE_COUNT; i++) {
      const targetLine = targetLines[i % targetLines.length]
      const currentPositions = new Float32Array(POINTS_PER_LINE * 3)
      const targetPositions = new Float32Array(POINTS_PER_LINE * 3)
      const morphStartPositions = new Float32Array(POINTS_PER_LINE * 3)
      
      targetLine.forEach((p, j) => {
        targetPositions[j * 3] = p.x
        targetPositions[j * 3 + 1] = p.y
        targetPositions[j * 3 + 2] = p.z
      })
      
      const connIdx = i % generateTesseractConnections.length
      const conn = generateTesseractConnections[connIdx]
      
      linesDataRef.current.push({
        currentPositions,
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
  }, [targetLines, generateTesseractConnections])
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime
    const now = performance.now()
    const phaseElapsed = (now - phaseStartRef.current) / 1000
    
    if (phase === 'idle') {
      tesseractTimeRef.current += 0.016
      
      if (phaseElapsed > idleDurationRef.current && !hasMorphedRef.current) {
        linesDataRef.current.forEach(data => {
          for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
            data.morphStartPositions[j] = data.currentPositions[j]
          }
        })
        
        const newTargetLines = generateModelWireframe(currentModelIndexRef.current, MAX_LINE_COUNT)
        currentLineCountRef.current = newTargetLines.length
        linesDataRef.current.forEach((data, i) => {
          const targetLine = newTargetLines[i % newTargetLines.length]
          targetLine.forEach((p, j) => {
            data.targetPositions[j * 3] = p.x
            data.targetPositions[j * 3 + 1] = p.y
            data.targetPositions[j * 3 + 2] = p.z
          })
        })
        
        setPhase('morphing_to_model')
        phaseStartRef.current = now
        morphProgressRef.current = 0
      }
    } else if (phase === 'morphing_to_model') {
      tesseractTimeRef.current += 0.016
      morphProgressRef.current = Math.min(1, phaseElapsed / morphDurationRef.current)
      
      if (phaseElapsed > morphDurationRef.current) {
        setPhase('showing_model')
        phaseStartRef.current = now
        visibleCountRef.current = currentLineCountRef.current
        hasMorphedRef.current = true
      } else {
        const progress = morphProgressRef.current
        const targetVisible = CHAOS_LINE_COUNT + Math.floor((currentLineCountRef.current - CHAOS_LINE_COUNT) * progress)
        visibleCountRef.current = targetVisible
      }
    } else if (phase === 'showing_model') {
    }
    
    const tesseractTime = tesseractTimeRef.current
    
    const tesseractColor = new THREE.Color('#FFFFFF')
    const modelColor = new THREE.Color('#60A5FA')
    
    let targetColor: THREE.Color
    if (phase === 'idle') {
      targetColor = tesseractColor
    } else if (phase === 'morphing_to_model') {
      targetColor = tesseractColor.clone().lerp(modelColor, morphProgressRef.current)
    } else {
      targetColor = modelColor
    }
    
    groupRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line
      const geometry = line.geometry
      const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute
      const data = linesDataRef.current[i]
      
      if (!data) return
      
      const material = line.material as THREE.LineBasicMaterial
      material.color.copy(targetColor)
      
      const isVisible = i < visibleCountRef.current
      line.visible = isVisible
      
      if (!isVisible) return
      
      if (phase === 'idle') {
        const nodeA = getTesseractNodePosition(data.nodeAIndex, data.nodeAType, tesseractTime)
        const nodeB = getTesseractNodePosition(data.nodeBIndex, data.nodeBType, tesseractTime)
        
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
      } else if (phase === 'morphing_to_model') {
        const t = morphProgressRef.current
        const eased = t < 0.5 
          ? 2 * t * t 
          : 1 - Math.pow(-2 * t + 2, 2) / 2
        
        const nodeA = getTesseractNodePosition(data.nodeAIndex, data.nodeAType, tesseractTime)
        const nodeB = getTesseractNodePosition(data.nodeBIndex, data.nodeBType, tesseractTime)
        
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
      } else if (phase === 'showing_model') {
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          positionAttr.array[j] = data.targetPositions[j]
          data.currentPositions[j] = data.targetPositions[j]
        }
      }
      
      positionAttr.needsUpdate = true
    })
    
    const groupRotationY = time * 0.15
    const groupRotationX = Math.sin(time * 0.1) * 0.12
    const groupRotationZ = Math.cos(time * 0.08) * 0.05
    groupRef.current.rotation.y = groupRotationY
    groupRef.current.rotation.x = groupRotationX
    groupRef.current.rotation.z = groupRotationZ
  })
  
  const lineObjects = useMemo(() => {
    const objects: THREE.Line[] = []
    
    for (let i = 0; i < MAX_LINE_COUNT; i++) {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(POINTS_PER_LINE * 3)
      
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
  }, [])
  
  return (
    <group ref={groupRef} position={position} scale={0.5}>
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

function CameraRig({ lookAt = [-4.5, 1.35, 0], cameraOffset = [-4.5, 2.6, 5] }: { lookAt?: [number, number, number]; cameraOffset?: [number, number, number] }) {
  const { camera } = useThree()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    camera.position.x = cameraOffset[0] + Math.sin(t * 0.08) * 0.3
    camera.position.y = cameraOffset[1] + Math.sin(t * 0.1) * 0.15
    camera.position.z = cameraOffset[2] + Math.cos(t * 0.08) * 0.3
    camera.lookAt(lookAt[0], lookAt[1], lookAt[2])
  })
  
  return null
}

interface LastMileAnimationProps {
  className?: string
  centered?: boolean
}

export function LastMileAnimation({ className = '', centered = false }: LastMileAnimationProps) {
  const groupPosition = centered ? [0, 0, 0] : [-4.5, 1.35, 0]
  const cameraPosition = centered ? [0, 0.5, 3.5] : [-4.5, 2.6, 5]
  const lookAtTarget = centered ? [0, 0, 0] : [-4.5, 1.35, 0]
  const fov = centered ? 40 : 45
  
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: cameraPosition as [number, number, number], fov }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.4} color="#306BFF" />
        <pointLight position={[-10, 5, -10]} intensity={0.2} color="#4A90D9" />
        
        <SculptureLines position={groupPosition as [number, number, number]} />
        <GlowParticles />
        <CameraRig lookAt={lookAtTarget as [number, number, number]} cameraOffset={centered ? [0, 0.5, 3.5] : [-4.5, 2.6, 5]} />
      </Canvas>
    </div>
  )
}

export default LastMileAnimation
