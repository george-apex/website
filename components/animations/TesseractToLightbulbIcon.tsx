'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { LIGHTBULB_WIREFRAME_DATA } from './lightbulbWireframeData'

// Constants for icon-sized animation
const MAX_LINES = 4000 // Full lightbulb wireframe line count
const POINTS_PER_LINE = 16

// Generate lightbulb wireframe positions
function generateLightbulbWireframe(maxLines: number, scale: number = 0.8, yOffset: number = 0.3): THREE.Vector3[][] {
  const lines: THREE.Vector3[][] = []
  
  for (let i = 0; i < Math.min(LIGHTBULB_WIREFRAME_DATA.length, maxLines); i++) {
    const edge = LIGHTBULB_WIREFRAME_DATA[i]
    const line: THREE.Vector3[] = []
    const [p1, p2] = edge
    
    for (let j = 0; j < POINTS_PER_LINE; j++) {
      const t = j / (POINTS_PER_LINE - 1)
      const x = (p1[0] + (p2[0] - p1[0]) * t) * scale
      const y = (p1[1] + (p2[1] - p1[1]) * t) * scale
      const z = (p1[2] + (p2[2] - p1[2]) * t) * scale
      line.push(new THREE.Vector3(x, y + yOffset, z))
    }
    lines.push(line)
  }
  
  return lines
}

// Get tesseract node position (inner and outer cube)
function getTesseractNodePosition(
  nodeIndex: number,
  nodeType: 'inner' | 'outer',
  time: number
): THREE.Vector3 {
  const isInner = nodeType === 'inner'
  const cornerIdx = isInner ? nodeIndex : nodeIndex - 8
  
  const x = (cornerIdx & 1 ? 1 : -1)
  const y = (cornerIdx & 2 ? 1 : -1)
  const z = (cornerIdx & 4 ? 1 : -1)
  
  const baseSize = isInner ? 0.5 : 0.85
  const pulse = Math.sin(time * 1.5 + cornerIdx * 0.5) * 0.08
  const scale = baseSize + pulse
  
  // Subtle rotation
  const rotX = Math.sin(time * 0.4 + cornerIdx * 0.2) * 0.1
  const rotZ = Math.cos(time * 0.5 + cornerIdx * 0.15) * 0.1
  
  const rotatedY = y * Math.cos(rotX) - z * Math.sin(rotX)
  const rotatedZ = y * Math.sin(rotX) + z * Math.cos(rotX)
  const finalX = x * Math.cos(rotZ) - rotatedY * Math.sin(rotZ)
  const finalY = x * Math.sin(rotZ) + rotatedY * Math.cos(rotZ)
  
  return new THREE.Vector3(finalX * scale, finalY * scale, rotatedZ * scale)
}

// Generate tesseract connections (inner cube, outer cube, and connecting edges)
function generateTesseractConnections() {
  const connections: { a: number; b: number; aType: 'inner' | 'outer'; bType: 'inner' | 'outer' }[] = []
  
  // Inner cube edges
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      const bitDiff = i ^ j
      if (bitDiff === 1 || bitDiff === 2 || bitDiff === 4) {
        connections.push({ a: i, b: j, aType: 'inner', bType: 'inner' })
      }
    }
  }
  
  // Outer cube edges
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      const bitDiff = i ^ j
      if (bitDiff === 1 || bitDiff === 2 || bitDiff === 4) {
        connections.push({ a: i + 8, b: j + 8, aType: 'outer', bType: 'outer' })
      }
    }
  }
  
  // Connecting edges between inner and outer cubes
  for (let i = 0; i < 8; i++) {
    connections.push({ a: i, b: i + 8, aType: 'inner', bType: 'outer' })
  }
  
  return connections
}

type Phase = 'tesseract' | 'morphing_to_lightbulb' | 'lightbulb' | 'morphing_to_tesseract'

interface MorphingIconProps {
  size?: number
  lightbulbScale?: number
  lightbulbYOffset?: number
}

function MorphingLines({ size = 40, lightbulbScale = 0.8, lightbulbYOffset = 0.3 }: MorphingIconProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [phase, setPhase] = useState<Phase>('tesseract')
  const phaseStartRef = useRef(0)
  const morphProgressRef = useRef(0)
  const timeRef = useRef(0)
  
  const tesseractConnections = useMemo(() => generateTesseractConnections(), [])
  const lightbulbLines = useMemo(() => generateLightbulbWireframe(MAX_LINES, lightbulbScale, lightbulbYOffset), [lightbulbScale, lightbulbYOffset])
  
  // Timing configuration
  const tesseractDuration = 2.5
  const lightbulbDuration = 2.5
  const morphDuration = 1.5
  
  // Initialize line data
  const linesDataRef = useRef<{
    currentPositions: Float32Array
    targetPositions: Float32Array
    morphStartPositions: Float32Array
    nodeAIndex: number
    nodeBIndex: number
    nodeAType: 'inner' | 'outer'
    nodeBType: 'inner' | 'outer'
  }[]>([])
  
  useEffect(() => {
    linesDataRef.current = []
    
    for (let i = 0; i < MAX_LINES; i++) {
      const currentPositions = new Float32Array(POINTS_PER_LINE * 3)
      const targetPositions = new Float32Array(POINTS_PER_LINE * 3)
      const morphStartPositions = new Float32Array(POINTS_PER_LINE * 3)
      
      // Initialize with lightbulb target
      if (i < lightbulbLines.length) {
        lightbulbLines[i].forEach((p, j) => {
          targetPositions[j * 3] = p.x
          targetPositions[j * 3 + 1] = p.y
          targetPositions[j * 3 + 2] = p.z
        })
      }
      
      const connIdx = i % tesseractConnections.length
      const conn = tesseractConnections[connIdx]
      
      linesDataRef.current.push({
        currentPositions,
        targetPositions,
        morphStartPositions,
        nodeAIndex: conn.a,
        nodeBIndex: conn.b,
        nodeAType: conn.aType,
        nodeBType: conn.bType,
      })
    }
    
    phaseStartRef.current = performance.now()
  }, [lightbulbLines, tesseractConnections])
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const now = performance.now()
    const phaseElapsed = (now - phaseStartRef.current) / 1000
    timeRef.current = state.clock.elapsedTime
    
    // Phase transitions
    if (phase === 'tesseract' && phaseElapsed > tesseractDuration) {
      // Store current positions as morph start
      linesDataRef.current.forEach(data => {
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          data.morphStartPositions[j] = data.currentPositions[j]
        }
      })
      setPhase('morphing_to_lightbulb')
      phaseStartRef.current = now
      morphProgressRef.current = 0
    } else if (phase === 'morphing_to_lightbulb' && phaseElapsed > morphDuration) {
      setPhase('lightbulb')
      phaseStartRef.current = now
    } else if (phase === 'lightbulb' && phaseElapsed > lightbulbDuration) {
      // Store current positions as morph start
      linesDataRef.current.forEach(data => {
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          data.morphStartPositions[j] = data.currentPositions[j]
        }
      })
      setPhase('morphing_to_tesseract')
      phaseStartRef.current = now
      morphProgressRef.current = 0
    } else if (phase === 'morphing_to_tesseract' && phaseElapsed > morphDuration) {
      setPhase('tesseract')
      phaseStartRef.current = now
    }
    
    // Update morph progress
    if (phase === 'morphing_to_lightbulb' || phase === 'morphing_to_tesseract') {
      morphProgressRef.current = Math.min(1, phaseElapsed / morphDuration)
    }
    
    const time = timeRef.current
    
    // Color interpolation
    const tesseractColor = new THREE.Color('#FFFFFF')
    const lightbulbColor = new THREE.Color('#60A5FA') // Blue for lightbulb
    
    let targetColor: THREE.Color
    if (phase === 'tesseract') {
      targetColor = tesseractColor
    } else if (phase === 'morphing_to_lightbulb') {
      targetColor = tesseractColor.clone().lerp(lightbulbColor, morphProgressRef.current)
    } else if (phase === 'lightbulb') {
      targetColor = lightbulbColor
    } else {
      targetColor = lightbulbColor.clone().lerp(tesseractColor, morphProgressRef.current)
    }
    
    // Update line positions
    groupRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line
      const geometry = line.geometry
      const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute
      const data = linesDataRef.current[i]
      
      if (!data) return
      
      const material = line.material as THREE.LineBasicMaterial
      material.color.copy(targetColor)
      
      if (phase === 'tesseract') {
        // Animate tesseract
        const nodeA = getTesseractNodePosition(data.nodeAIndex, data.nodeAType, time)
        const nodeB = getTesseractNodePosition(data.nodeBIndex, data.nodeBType, time)
        
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
      } else if (phase === 'morphing_to_lightbulb') {
        const t = morphProgressRef.current
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        
        const nodeA = getTesseractNodePosition(data.nodeAIndex, data.nodeAType, time)
        const nodeB = getTesseractNodePosition(data.nodeBIndex, data.nodeBType, time)
        
        for (let j = 0; j < POINTS_PER_LINE; j++) {
          const pt = j / (POINTS_PER_LINE - 1)
          const tessX = nodeA.x + (nodeB.x - nodeA.x) * pt
          const tessY = nodeA.y + (nodeB.y - nodeA.y) * pt
          const tessZ = nodeA.z + (nodeB.z - nodeA.z) * pt
          
          const targetX = data.targetPositions[j * 3]
          const targetY = data.targetPositions[j * 3 + 1]
          const targetZ = data.targetPositions[j * 3 + 2]
          
          const x = tessX + (targetX - tessX) * eased
          const y = tessY + (targetY - tessY) * eased
          const z = tessZ + (targetZ - tessZ) * eased
          
          positionAttr.array[j * 3] = x
          positionAttr.array[j * 3 + 1] = y
          positionAttr.array[j * 3 + 2] = z
          data.currentPositions[j * 3] = x
          data.currentPositions[j * 3 + 1] = y
          data.currentPositions[j * 3 + 2] = z
        }
      } else if (phase === 'lightbulb') {
        // Show lightbulb with slight pulse
        const pulseScale = 1 + Math.sin(time * 2) * 0.02
        for (let j = 0; j < POINTS_PER_LINE * 3; j++) {
          const val = data.targetPositions[j] * pulseScale
          positionAttr.array[j] = val
          data.currentPositions[j] = val
        }
      } else if (phase === 'morphing_to_tesseract') {
        const t = morphProgressRef.current
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        
        const nodeA = getTesseractNodePosition(data.nodeAIndex, data.nodeAType, time)
        const nodeB = getTesseractNodePosition(data.nodeBIndex, data.nodeBType, time)
        
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
    
    // Gentle rotation
    groupRef.current.rotation.y = time * 0.3
    groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
  })
  
  // Create line objects
  const lineObjects = useMemo(() => {
    const objects: THREE.Line[] = []
    
    for (let i = 0; i < MAX_LINES; i++) {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(POINTS_PER_LINE * 3)
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      
      const material = new THREE.LineBasicMaterial({
        color: '#FFFFFF',
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      })
      
      const line = new THREE.Line(geometry, material)
      objects.push(line)
    }
    return objects
  }, [])
  
  return (
    <group ref={groupRef} scale={size / 100}>
      {lineObjects.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}
    </group>
  )
}

interface TesseractToLightbulbIconProps {
  className?: string
  size?: number
  lightbulbScale?: number
  lightbulbYOffset?: number
}

export function TesseractToLightbulbIcon({ className = '', size = 40, lightbulbScale = 0.8, lightbulbYOffset = 0.3 }: TesseractToLightbulbIconProps) {
  return (
    <div className={`${className}`} style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <MorphingLines size={size} lightbulbScale={lightbulbScale} lightbulbYOffset={lightbulbYOffset} />
      </Canvas>
    </div>
  )
}

export default TesseractToLightbulbIcon
