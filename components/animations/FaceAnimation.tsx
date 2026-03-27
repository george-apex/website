'use client'

import { useRef, useMemo, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const TESSERACT_LINE_COUNT = 150
const POINTS_PER_LINE = 32

type Phase = 'idle' | 'morphing_to_model' | 'showing_model'
type WireframeMode = 'lines' | 'points' | 'triangles' | 'dotted' | 'thick'
type HologramMode = 'none' | 'transparent' | 'glass' | 'inner-glow' | 'point-cloud'
type AnimationMode = 'none' | 'scramble' | 'glow'

interface LineWithColor {
  positions: THREE.Vector3[]
  colors: THREE.Color[]
}

interface TextureCache {
  data: Uint8ClampedArray
  width: number
  height: number
}

function createTextureCache(texture: THREE.Texture | null): TextureCache | null {
  if (!texture) return null
  
  const img = texture.image as HTMLImageElement | HTMLCanvasElement | undefined
  if (!img) return null
  
  const canvas = document.createElement('canvas')
  const width = img.width || 512
  const height = img.height || 512
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  
  ctx.drawImage(img as CanvasImageSource, 0, 0)
  const imageData = ctx.getImageData(0, 0, width, height)
  
  return {
    data: imageData.data,
    width: width,
    height: height
  }
}

function sampleTextureCache(cache: TextureCache | null, u: number, v: number): THREE.Color {
  if (!cache) return new THREE.Color(0.38, 0.65, 0.98)
  
  const x = Math.floor(u * cache.width)
  const y = Math.floor(v * cache.height)
  const clampedX = Math.min(Math.max(0, x), cache.width - 1)
  const clampedY = Math.min(Math.max(0, y), cache.height - 1)
  const idx = (clampedY * cache.width + clampedX) * 4
  
  return new THREE.Color(
    cache.data[idx] / 255,
    cache.data[idx + 1] / 255,
    cache.data[idx + 2] / 255
  )
}

function extractAllTrianglesAsLinesWithColors(
  geometries: THREE.BufferGeometry[], 
  textureCache: TextureCache | null
): LineWithColor[] {
  const lines: LineWithColor[] = []
  const scale = 5.0
  
  for (const geometry of geometries) {
    const positionAttr = geometry.getAttribute('position')
    const uvAttr = geometry.getAttribute('uv') || geometry.getAttribute('TEXCOORD_0') || geometry.getAttribute('aTexcoord')
    if (!positionAttr) continue
    
    const indices = geometry.getIndex()
    
    const addLine = (
      p1: THREE.Vector3, p2: THREE.Vector3, 
      uv1: THREE.Vector2 | null, uv2: THREE.Vector2 | null
    ) => {
      const positions: THREE.Vector3[] = []
      const colors: THREE.Color[] = []
      
      for (let j = 0; j < POINTS_PER_LINE; j++) {
        const t = j / (POINTS_PER_LINE - 1)
        positions.push(new THREE.Vector3(
          (p1.x + (p2.x - p1.x) * t) * scale,
          (p1.y + (p2.y - p1.y) * t) * scale,
          (p1.z + (p2.z - p1.z) * t) * scale
        ))
        
        if (uv1 && uv2 && textureCache) {
          const u = uv1.x + (uv2.x - uv1.x) * t
          const v = uv1.y + (uv2.y - uv1.y) * t
          colors.push(sampleTextureCache(textureCache, u, v))
        } else {
          colors.push(new THREE.Color(0.38, 0.65, 0.98))
        }
      }
      lines.push({ positions, colors })
    }
    
    const getUV = (idx: number): THREE.Vector2 | null => {
      if (!uvAttr) return null
      return new THREE.Vector2(uvAttr.getX(idx), uvAttr.getY(idx))
    }
    
    if (indices) {
      for (let i = 0; i < indices.count; i += 3) {
        const i0 = indices.getX(i)
        const i1 = indices.getX(i + 1)
        const i2 = indices.getX(i + 2)
        
        const p0 = new THREE.Vector3(positionAttr.getX(i0), positionAttr.getY(i0), positionAttr.getZ(i0))
        const p1 = new THREE.Vector3(positionAttr.getX(i1), positionAttr.getY(i1), positionAttr.getZ(i1))
        const p2 = new THREE.Vector3(positionAttr.getX(i2), positionAttr.getY(i2), positionAttr.getZ(i2))
        
        const uv0 = getUV(i0)
        const uv1 = getUV(i1)
        const uv2 = getUV(i2)
        
        addLine(p0, p1, uv0, uv1)
        addLine(p1, p2, uv1, uv2)
        addLine(p2, p0, uv2, uv0)
      }
    } else {
      for (let i = 0; i < positionAttr.count; i += 3) {
        const p0 = new THREE.Vector3(positionAttr.getX(i), positionAttr.getY(i), positionAttr.getZ(i))
        const p1 = new THREE.Vector3(positionAttr.getX(i + 1), positionAttr.getY(i + 1), positionAttr.getZ(i + 1))
        const p2 = new THREE.Vector3(positionAttr.getX(i + 2), positionAttr.getY(i + 2), positionAttr.getZ(i + 2))
        
        const uv0 = getUV(i)
        const uv1 = getUV(i + 1)
        const uv2 = getUV(i + 2)
        
        addLine(p0, p1, uv0, uv1)
        addLine(p1, p2, uv1, uv2)
        addLine(p2, p0, uv2, uv0)
      }
    }
  }
  
  return lines
}

interface MeshData {
  geometry: THREE.BufferGeometry
  texture: THREE.Texture | null
}

function FaceModel({ onLoad, onMeshLoad }: { onLoad: (lines: LineWithColor[]) => void, onMeshLoad: (meshes: MeshData[]) => void }) {
  const gltf = useGLTF('/models/Naail.glb') as any
  const scene = gltf?.scene
  
  useEffect(() => {
    if (!scene) return
    
    const geometries: THREE.BufferGeometry[] = []
    const meshData: MeshData[] = []
    let baseColorTexture: THREE.Texture | null = null
    
    scene.traverse((child: any) => {
      if (child.isMesh && child.geometry) {
        geometries.push(child.geometry)
        let texture: THREE.Texture | null = null
        if (child.material) {
          const mat = child.material
          if (mat.map) {
            texture = mat.map
            if (!baseColorTexture) baseColorTexture = mat.map
          } else if (mat.pbrMetallicRoughness?.baseColorTexture) {
            texture = mat.pbrMetallicRoughness.baseColorTexture
            if (!baseColorTexture) baseColorTexture = mat.pbrMetallicRoughness.baseColorTexture
          }
        }
        meshData.push({ geometry: child.geometry, texture })
      }
    })
    
    console.log('Loaded geometries:', geometries.length)
    console.log('Mesh data:', meshData.map(m => ({ hasGeo: !!m.geometry, hasTex: !!m.texture })))
    onMeshLoad(meshData)
    
    if (!baseColorTexture && gltf.textures && gltf.textures.length > 0) {
      for (const tex of gltf.textures) {
        if (tex && tex.image) {
          baseColorTexture = tex
          break
        }
      }
    }
    
    const processTexture = () => {
      const cache = createTextureCache(baseColorTexture)
      const lines = extractAllTrianglesAsLinesWithColors(geometries, cache)
      console.log('Extracted model lines:', lines.length)
      if (lines.length > 0) {
        console.log('Sample line positions:', lines[0].positions[0], lines[Math.floor(lines.length/2)].positions[0])
        onLoad(lines)
      }
    }
    
    const texture = baseColorTexture as THREE.Texture | null
    if (texture && !texture.image) {
      const loader = new THREE.ImageLoader()
      const imgSrc = (texture as any).image?.src || ''
      if (imgSrc) {
        loader.load(imgSrc, (image) => {
          texture.image = image
          texture.needsUpdate = true
          processTexture()
        })
      } else {
        processTexture()
      }
    } else {
      processTexture()
    }
  }, [scene, onLoad, onMeshLoad, gltf])
  
  return null
}

function getTesseractNodePosition(nodeIndex: number, nodeType: 'inner' | 'outer' | 'extra', time: number): THREE.Vector3 {
  const yOffset = 0.3
  
  if (nodeType === 'inner') {
    const cornerIdx = nodeIndex
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
    const cornerIdx = nodeIndex - 8
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
    const extraIdx = nodeIndex - 16
    const baseTheta = (extraIdx / 20) * Math.PI * 2
    const basePhi = (extraIdx % 5) / 5 * Math.PI
    
    const theta = baseTheta + time * 0.4 + extraIdx * 0.2
    const phi = basePhi + Math.sin(time * 0.6 + extraIdx * 0.3) * 0.3
    const radius = 1.0 + Math.sin(time * 1.5 + extraIdx * 0.4) * 0.15
    
    return new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta) * radius,
      Math.cos(phi) * 0.8 + yOffset + Math.sin(time * 0.7 + extraIdx * 0.5) * 0.1,
      Math.sin(phi) * Math.sin(theta) * radius
    )
  }
}

function generateTesseractConnections(): { a: number, b: number, aType: 'inner' | 'outer' | 'extra', bType: 'inner' | 'outer' | 'extra' }[] {
  const connections: { a: number, b: number, aType: 'inner' | 'outer' | 'extra', bType: 'inner' | 'outer' | 'extra' }[] = []
  
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      if ((i ^ j) === 1 || (i ^ j) === 2 || (i ^ j) === 4) {
        connections.push({ a: i, b: j, aType: 'inner', bType: 'inner' })
      }
    }
  }
  
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      if ((i ^ j) === 1 || (i ^ j) === 2 || (i ^ j) === 4) {
        connections.push({ a: i + 8, b: j + 8, aType: 'outer', bType: 'outer' })
      }
    }
  }
  
  for (let i = 0; i < 8; i++) {
    connections.push({ a: i, b: i + 8, aType: 'inner', bType: 'outer' })
  }
  
  for (let i = 0; i < 20; i++) {
    connections.push({ a: 16 + i, b: i % 8, aType: 'extra', bType: 'inner' })
    connections.push({ a: 16 + i, b: ((i + 1) % 8) + 8, aType: 'extra', bType: 'outer' })
  }
  
  for (let i = 0; i < 20; i++) {
    for (let j = i + 1; j < 20; j++) {
      if (Math.abs(i - j) <= 2 || Math.abs(i - j) >= 18) {
        connections.push({ a: 16 + i, b: 16 + j, aType: 'extra', bType: 'extra' })
      }
    }
  }
  
  return connections
}

function MorphingLines({ 
  connections, 
  modelLines,
  phase,
  morphProgress
}: { 
  connections: { a: number, b: number, aType: 'inner' | 'outer' | 'extra', bType: 'inner' | 'outer' | 'extra' }[]
  modelLines: LineWithColor[] | null
  phase: Phase
  morphProgress: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)
  const noiseOffsetsRef = useRef<number[]>([])
  
  const lineObjects = useMemo(() => {
    const objects: THREE.Line[] = []
    noiseOffsetsRef.current = []
    for (let i = 0; i < TESSERACT_LINE_COUNT; i++) {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(POINTS_PER_LINE * 3)
      const colors = new Float32Array(POINTS_PER_LINE * 3)
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
      
      const material = new THREE.LineBasicMaterial({
        color: '#FFFFFF',
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      })
      
      objects.push(new THREE.Line(geometry, material))
      noiseOffsetsRef.current.push(Math.random() * 100)
    }
    return objects
  }, [])
  
  useFrame(() => {
    if (!groupRef.current) return
    timeRef.current += 0.016
    
    const morphingToModel = phase === 'morphing_to_model'
    const showing = phase === 'showing_model'
    const progress = morphProgress
    
    groupRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line
      const geometry = line.geometry
      const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute
      const colorAttr = geometry.getAttribute('color') as THREE.BufferAttribute
      const material = line.material as THREE.LineBasicMaterial
      
      const connIdx = i % connections.length
      const conn = connections[connIdx]
      const noiseOffset = noiseOffsetsRef.current[i]
      
      const nodeA = getTesseractNodePosition(conn.a, conn.aType, timeRef.current)
      const nodeB = getTesseractNodePosition(conn.b, conn.bType, timeRef.current)
      
      const modelLine = modelLines ? modelLines[i % modelLines.length] : null
      
      for (let j = 0; j < POINTS_PER_LINE; j++) {
        const pt = j / (POINTS_PER_LINE - 1)
        
        const tesseractX = nodeA.x + (nodeB.x - nodeA.x) * pt
        const tesseractY = nodeA.y + (nodeB.y - nodeA.y) * pt
        const tesseractZ = nodeA.z + (nodeB.z - nodeA.z) * pt
        
        let finalX = tesseractX
        let finalY = tesseractY
        let finalZ = tesseractZ
        
        let finalR = 1, finalG = 1, finalB = 1
        
        if (morphingToModel && modelLine) {
          const targetPoint = modelLine.positions[j]
          const targetColor = modelLine.colors[j]
          
          const eased = 1 - Math.pow(1 - progress, 3)
          
          finalX = tesseractX + (targetPoint.x - tesseractX) * eased
          finalY = tesseractY + (targetPoint.y - tesseractY) * eased
          finalZ = tesseractZ + (targetPoint.z - tesseractZ) * eased
          
          finalR = 1 + (targetColor.r - 1) * eased
          finalG = 1 + (targetColor.g - 1) * eased
          finalB = 1 + (targetColor.b - 1) * eased
        } else if (showing && modelLine) {
          const targetPoint = modelLine.positions[j]
          const targetColor = modelLine.colors[j]
          
          finalX = targetPoint.x
          finalY = targetPoint.y
          finalZ = targetPoint.z
          
          finalR = targetColor.r
          finalG = targetColor.g
          finalB = targetColor.b
        }
        
        positionAttr.array[j * 3] = finalX
        positionAttr.array[j * 3 + 1] = finalY
        positionAttr.array[j * 3 + 2] = finalZ
        colorAttr.array[j * 3] = finalR
        colorAttr.array[j * 3 + 1] = finalG
        colorAttr.array[j * 3 + 2] = finalB
      }
      
      positionAttr.needsUpdate = true
      colorAttr.needsUpdate = true
      material.opacity = 0.7
    })
  })
  
  return (
    <group ref={groupRef}>
      {lineObjects.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}
    </group>
  )
}

function WireframeModel({ lines, opacity, mode = 'lines', animationMode = 'none' }: { lines: LineWithColor[], opacity: number, mode?: WireframeMode, animationMode?: AnimationMode }) {
  const meshRef = useRef<THREE.LineSegments>(null)
  const materialRef = useRef<THREE.LineBasicMaterial>(null)
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(lines.length * 2 * 3)
    const colors = new Float32Array(lines.length * 2 * 3)
    
    lines.forEach((line, i) => {
      const startColor = line.colors[0]
      const endColor = line.colors[POINTS_PER_LINE - 1]
      
      positions[i * 6] = line.positions[0].x
      positions[i * 6 + 1] = line.positions[0].y
      positions[i * 6 + 2] = line.positions[0].z
      positions[i * 6 + 3] = line.positions[POINTS_PER_LINE - 1].x
      positions[i * 6 + 4] = line.positions[POINTS_PER_LINE - 1].y
      positions[i * 6 + 5] = line.positions[POINTS_PER_LINE - 1].z
      
      colors[i * 6] = startColor.r
      colors[i * 6 + 1] = startColor.g
      colors[i * 6 + 2] = startColor.b
      colors[i * 6 + 3] = endColor.r
      colors[i * 6 + 4] = endColor.g
      colors[i * 6 + 5] = endColor.b
    })
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [lines])
  
  const originalPositions = useMemo(() => {
    const pos = geometry.getAttribute('position')
    return pos ? pos.array.slice() : new Float32Array(0)
  }, [geometry])
  
  const originalColors = useMemo(() => {
    const col = geometry.getAttribute('color')
    return col ? col.array.slice() : new Float32Array(0)
  }, [geometry])
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    const posAttr = meshRef.current.geometry.getAttribute('position')
    const colAttr = meshRef.current.geometry.getAttribute('color')
    if (!posAttr || !colAttr) return
    
    if (animationMode === 'none') {
      for (let i = 0; i < posAttr.count; i++) {
        posAttr.setX(i, originalPositions[i * 3])
        posAttr.setY(i, originalPositions[i * 3 + 1])
        posAttr.setZ(i, originalPositions[i * 3 + 2])
        colAttr.setX(i, originalColors[i * 3])
        colAttr.setY(i, originalColors[i * 3 + 1])
        colAttr.setZ(i, originalColors[i * 3 + 2])
      }
      posAttr.needsUpdate = true
      colAttr.needsUpdate = true
      return
    }
    
    const time = state.clock.elapsedTime
    
    if (animationMode === 'scramble') {
      for (let i = 0; i < posAttr.count; i++) {
        const noise = Math.sin(time * 5 + i * 0.1) * 0.01
        posAttr.setX(i, originalPositions[i * 3] + noise)
        posAttr.setY(i, originalPositions[i * 3 + 1] + noise)
        posAttr.setZ(i, originalPositions[i * 3 + 2] + noise)
      }
    } else if (animationMode === 'glow') {
      const brightness = 0.7 + Math.sin(time * 3) * 0.3
      for (let i = 0; i < colAttr.count; i++) {
        colAttr.setX(i, originalColors[i * 3] * brightness)
        colAttr.setY(i, originalColors[i * 3 + 1] * brightness)
        colAttr.setZ(i, originalColors[i * 3 + 2] * brightness)
      }
    }
    
    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })
  
  if (mode === 'points') {
    return <PointsModel lines={lines} opacity={opacity} animationMode={animationMode} />
  } else if (mode === 'triangles') {
    return <TrianglesModel lines={lines} opacity={opacity} animationMode={animationMode} />
  } else if (mode === 'dotted') {
    return <DottedLinesModel lines={lines} opacity={opacity} animationMode={animationMode} />
  } else if (mode === 'thick') {
    return <ThickLinesModel lines={lines} opacity={opacity} animationMode={animationMode} />
  }
  
  return (
    <lineSegments ref={meshRef} geometry={geometry} renderOrder={0}>
      <lineBasicMaterial ref={materialRef} transparent opacity={opacity} vertexColors depthWrite={false} />
    </lineSegments>
  )
}

function PointsModel({ lines, opacity, animationMode }: { lines: LineWithColor[], opacity: number, animationMode: AnimationMode }) {
  const meshRef = useRef<THREE.Points>(null)
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const vertexCount = lines.length * 2
    const positions = new Float32Array(vertexCount * 3)
    const colors = new Float32Array(vertexCount * 3)
    
    lines.forEach((line, i) => {
      const startColor = line.colors[0]
      const endColor = line.colors[POINTS_PER_LINE - 1]
      
      positions[i * 6] = line.positions[0].x
      positions[i * 6 + 1] = line.positions[0].y
      positions[i * 6 + 2] = line.positions[0].z
      positions[i * 6 + 3] = line.positions[POINTS_PER_LINE - 1].x
      positions[i * 6 + 4] = line.positions[POINTS_PER_LINE - 1].y
      positions[i * 6 + 5] = line.positions[POINTS_PER_LINE - 1].z
      
      colors[i * 6] = startColor.r
      colors[i * 6 + 1] = startColor.g
      colors[i * 6 + 2] = startColor.b
      colors[i * 6 + 3] = endColor.r
      colors[i * 6 + 4] = endColor.g
      colors[i * 6 + 5] = endColor.b
    })
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [lines])
  
  const originalPositions = useMemo(() => {
    const pos = geometry.getAttribute('position')
    return pos ? pos.array.slice() : new Float32Array(0)
  }, [geometry])
  
  const originalColors = useMemo(() => {
    const col = geometry.getAttribute('color')
    return col ? col.array.slice() : new Float32Array(0)
  }, [geometry])
  
  useFrame((state) => {
    if (!meshRef.current || animationMode === 'none') return
    const posAttr = meshRef.current.geometry.getAttribute('position')
    const colAttr = meshRef.current.geometry.getAttribute('color')
    if (!posAttr || !colAttr) return
    const time = state.clock.elapsedTime
    
    if (animationMode === 'scramble') {
      for (let i = 0; i < posAttr.count; i++) {
        const noise = Math.sin(time * 5 + i * 0.1) * 0.01
        posAttr.setX(i, originalPositions[i * 3] + noise)
        posAttr.setY(i, originalPositions[i * 3 + 1] + noise)
        posAttr.setZ(i, originalPositions[i * 3 + 2] + noise)
      }
    } else if (animationMode === 'glow') {
      const brightness = 0.7 + Math.sin(time * 3) * 0.3
      for (let i = 0; i < colAttr.count; i++) {
        colAttr.setX(i, originalColors[i * 3] * brightness)
        colAttr.setY(i, originalColors[i * 3 + 1] * brightness)
        colAttr.setZ(i, originalColors[i * 3 + 2] * brightness)
      }
    }
    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })
  
  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial size={0.03} transparent opacity={opacity} vertexColors sizeAttenuation />
    </points>
  )
}

function TrianglesModel({ lines, opacity, animationMode }: { lines: LineWithColor[], opacity: number, animationMode: AnimationMode }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const triangleCount = Math.floor(lines.length / 3)
    const positions = new Float32Array(triangleCount * 9)
    const colors = new Float32Array(triangleCount * 9)
    
    for (let t = 0; t < triangleCount; t++) {
      const line0 = lines[t * 3]
      const line1 = lines[t * 3 + 1]
      const line2 = lines[t * 3 + 2]
      
      if (!line0 || !line1 || !line2) continue
      
      const p0 = line0.positions[0]
      const p1 = line1.positions[0]
      const p2 = line2.positions[0]
      const c0 = line0.colors[0]
      const c1 = line1.colors[0]
      const c2 = line2.colors[0]
      
      const idx = t * 9
      positions[idx] = p0.x
      positions[idx + 1] = p0.y
      positions[idx + 2] = p0.z
      positions[idx + 3] = p1.x
      positions[idx + 4] = p1.y
      positions[idx + 5] = p1.z
      positions[idx + 6] = p2.x
      positions[idx + 7] = p2.y
      positions[idx + 8] = p2.z
      
      colors[idx] = c0.r
      colors[idx + 1] = c0.g
      colors[idx + 2] = c0.b
      colors[idx + 3] = c1.r
      colors[idx + 4] = c1.g
      colors[idx + 5] = c1.b
      colors[idx + 6] = c2.r
      colors[idx + 7] = c2.g
      colors[idx + 8] = c2.b
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [lines])
  
  const originalPositions = useMemo(() => {
    const pos = geometry.getAttribute('position')
    return pos ? pos.array.slice() : new Float32Array(0)
  }, [geometry])
  
  const originalColors = useMemo(() => {
    const col = geometry.getAttribute('color')
    return col ? col.array.slice() : new Float32Array(0)
  }, [geometry])
  
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vColor;
        attribute vec3 color;
        void main() {
          vColor = color;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float frontOpacity;
        uniform float backOpacity;
        varying vec3 vColor;
        void main() {
          float opacity = gl_FrontFacing ? frontOpacity : backOpacity;
          gl_FragColor = vec4(vColor, opacity);
        }
      `,
      uniforms: {
        frontOpacity: { value: opacity * 0.85 },
        backOpacity: { value: opacity * 0.2 }
      },
      transparent: true,
      side: THREE.DoubleSide
    })
  }, [opacity])
  
  useFrame((state) => {
    if (!meshRef.current || animationMode === 'none') return
    const posAttr = meshRef.current.geometry.getAttribute('position')
    const colAttr = meshRef.current.geometry.getAttribute('color')
    if (!posAttr || !colAttr) return
    const time = state.clock.elapsedTime
    
    if (animationMode === 'scramble') {
      for (let i = 0; i < posAttr.count; i++) {
        const noise = Math.sin(time * 5 + i * 0.1) * 0.01
        posAttr.setX(i, originalPositions[i * 3] + noise)
        posAttr.setY(i, originalPositions[i * 3 + 1] + noise)
        posAttr.setZ(i, originalPositions[i * 3 + 2] + noise)
      }
    } else if (animationMode === 'glow') {
      const brightness = 0.7 + Math.sin(time * 3) * 0.3
      for (let i = 0; i < colAttr.count; i++) {
        colAttr.setX(i, originalColors[i * 3] * brightness)
        colAttr.setY(i, originalColors[i * 3 + 1] * brightness)
        colAttr.setZ(i, originalColors[i * 3 + 2] * brightness)
      }
    }
    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })
  
  return (
    <mesh ref={meshRef} geometry={geometry}>
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function DottedLinesModel({ lines, opacity, animationMode }: { lines: LineWithColor[], opacity: number, animationMode: AnimationMode }) {
  const meshRef = useRef<THREE.Points>(null)
  
  const geometry = useMemo(() => {
    const step = 8
    const positions: number[] = []
    const colors: number[] = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      for (let j = 0; j < POINTS_PER_LINE; j += step) {
        const pos = line.positions[j]
        const col = line.colors[j]
        positions.push(pos.x, pos.y, pos.z)
        colors.push(col.r, col.g, col.b)
      }
    }
    
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return geo
  }, [lines])
  
  const originalPositions = useMemo(() => {
    const pos = geometry.getAttribute('position')
    return pos ? pos.array.slice() : new Float32Array(0)
  }, [geometry])
  
  const originalColors = useMemo(() => {
    const col = geometry.getAttribute('color')
    return col ? col.array.slice() : new Float32Array(0)
  }, [geometry])
  
  useFrame((state) => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.getAttribute('position')
    const colAttr = meshRef.current.geometry.getAttribute('color')
    if (!posAttr || !colAttr) return
    
    if (animationMode === 'none') {
      for (let i = 0; i < posAttr.count; i++) {
        posAttr.setX(i, originalPositions[i * 3])
        posAttr.setY(i, originalPositions[i * 3 + 1])
        posAttr.setZ(i, originalPositions[i * 3 + 2])
        colAttr.setX(i, originalColors[i * 3])
        colAttr.setY(i, originalColors[i * 3 + 1])
        colAttr.setZ(i, originalColors[i * 3 + 2])
      }
      posAttr.needsUpdate = true
      colAttr.needsUpdate = true
      return
    }
    
    const time = state.clock.elapsedTime
    
    if (animationMode === 'scramble') {
      for (let i = 0; i < posAttr.count; i++) {
        const noise = Math.sin(time * 5 + i * 0.1) * 0.01
        posAttr.setX(i, originalPositions[i * 3] + noise)
        posAttr.setY(i, originalPositions[i * 3 + 1] + noise)
        posAttr.setZ(i, originalPositions[i * 3 + 2] + noise)
      }
    } else if (animationMode === 'glow') {
      const brightness = 0.7 + Math.sin(time * 3) * 0.3
      for (let i = 0; i < colAttr.count; i++) {
        colAttr.setX(i, originalColors[i * 3] * brightness)
        colAttr.setY(i, originalColors[i * 3 + 1] * brightness)
        colAttr.setZ(i, originalColors[i * 3 + 2] * brightness)
      }
    }
    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })
  
  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial size={0.025} transparent opacity={opacity} vertexColors sizeAttenuation />
    </points>
  )
}

function ThickLinesModel({ lines, opacity, animationMode }: { lines: LineWithColor[], opacity: number, animationMode: AnimationMode }) {
  const meshRef = useRef<THREE.LineSegments>(null)
  
  const geometry = useMemo(() => {
    const positions: number[] = []
    const colors: number[] = []
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const start = line.positions[0]
      const end = line.positions[POINTS_PER_LINE - 1]
      const startColor = line.colors[0]
      const endColor = line.colors[POINTS_PER_LINE - 1]
      
      positions.push(start.x, start.y, start.z, end.x, end.y, end.z)
      colors.push(startColor.r, startColor.g, startColor.b, endColor.r, endColor.g, endColor.b)
    }
    
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    return geo
  }, [lines])
  
  const originalPositions = useMemo(() => {
    const pos = geometry.getAttribute('position')
    return pos ? pos.array.slice() : new Float32Array(0)
  }, [geometry])
  
  const originalColors = useMemo(() => {
    const col = geometry.getAttribute('color')
    return col ? col.array.slice() : new Float32Array(0)
  }, [geometry])
  
  useFrame((state) => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.getAttribute('position')
    const colAttr = meshRef.current.geometry.getAttribute('color')
    if (!posAttr || !colAttr) return
    
    if (animationMode === 'none') {
      for (let i = 0; i < posAttr.count; i++) {
        posAttr.setX(i, originalPositions[i * 3])
        posAttr.setY(i, originalPositions[i * 3 + 1])
        posAttr.setZ(i, originalPositions[i * 3 + 2])
        colAttr.setX(i, originalColors[i * 3])
        colAttr.setY(i, originalColors[i * 3 + 1])
        colAttr.setZ(i, originalColors[i * 3 + 2])
      }
      posAttr.needsUpdate = true
      colAttr.needsUpdate = true
      return
    }
    
    const time = state.clock.elapsedTime
    
    if (animationMode === 'scramble') {
      for (let i = 0; i < posAttr.count; i++) {
        const noise = Math.sin(time * 5 + i * 0.1) * 0.01
        posAttr.setX(i, originalPositions[i * 3] + noise)
        posAttr.setY(i, originalPositions[i * 3 + 1] + noise)
        posAttr.setZ(i, originalPositions[i * 3 + 2] + noise)
      }
    } else if (animationMode === 'glow') {
      const brightness = 0.7 + Math.sin(time * 3) * 0.3
      for (let i = 0; i < colAttr.count; i++) {
        colAttr.setX(i, originalColors[i * 3] * brightness)
        colAttr.setY(i, originalColors[i * 3 + 1] * brightness)
        colAttr.setZ(i, originalColors[i * 3 + 2] * brightness)
      }
    }
    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })
  
  return (
    <lineSegments ref={meshRef} geometry={geometry}>
      <lineBasicMaterial transparent opacity={opacity} vertexColors />
    </lineSegments>
  )
}

function HologramOverlay({ meshes, mode, opacity, animationMode }: { meshes: MeshData[], mode: HologramMode, opacity: number, animationMode: AnimationMode }) {
  if (mode === 'none' || meshes.length === 0) return null
  
  return (
    <group scale={5.0}>
      {meshes.map((mesh, i) => (
        <HologramMesh key={i} geometry={mesh.geometry} texture={mesh.texture} mode={mode} opacity={opacity} animationMode={animationMode} />
      ))}
    </group>
  )
}

function HologramMesh({ geometry, texture, mode, opacity, animationMode }: { geometry: THREE.BufferGeometry, texture: THREE.Texture | null, mode: HologramMode, opacity: number, animationMode: AnimationMode }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const baseMaterial = useMemo(() => {
  if (mode === 'transparent') {
       return new THREE.MeshBasicMaterial({
         map: texture,
         color: 0xaaaaaa,
         transparent: true,
         opacity: 0.85,
         side: THREE.DoubleSide,
         depthWrite: false,
       })
} else if (mode === 'glass') {
       return new THREE.MeshPhysicalMaterial({
         map: texture,
         transparent: true,
         opacity: 0.6,
         transmission: 0.4,
         roughness: 0.1,
         metalness: 0.1,
         side: THREE.DoubleSide,
         depthWrite: false,
       })
     } else if (mode === 'inner-glow') {
       return new THREE.MeshBasicMaterial({
         map: texture,
         transparent: true,
         opacity: 0.6,
         side: THREE.DoubleSide,
         blending: THREE.AdditiveBlending,
         depthWrite: false,
       })
     }
    return null
  }, [texture, mode])
  
  const originalPositions = useMemo(() => {
    const pos = geometry.getAttribute('position')
    return pos ? pos.array.slice() : new Float32Array(0)
  }, [geometry])
  
  useEffect(() => {
     if (baseMaterial) {
       if (mode === 'transparent') {
         (baseMaterial as THREE.MeshBasicMaterial).opacity = opacity * 0.85
       } else if (mode === 'glass') {
         (baseMaterial as THREE.MeshPhysicalMaterial).opacity = opacity * 0.6
       } else if (mode === 'inner-glow') {
         (baseMaterial as THREE.MeshBasicMaterial).opacity = opacity * 0.6
       }
     }
   }, [opacity, baseMaterial, mode])
  
  useFrame((state) => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.getAttribute('position')
    if (!posAttr) return
    
    if (animationMode === 'none') {
      for (let i = 0; i < posAttr.count; i++) {
        posAttr.setX(i, originalPositions[i * 3])
        posAttr.setY(i, originalPositions[i * 3 + 1])
        posAttr.setZ(i, originalPositions[i * 3 + 2])
      }
      posAttr.needsUpdate = true
      return
    }
    
    const time = state.clock.elapsedTime
    
    if (animationMode === 'scramble') {
      for (let i = 0; i < posAttr.count; i++) {
        const noise = Math.sin(time * 5 + i * 0.1) * 0.005
        posAttr.setX(i, originalPositions[i * 3] + noise)
        posAttr.setY(i, originalPositions[i * 3 + 1] + noise)
        posAttr.setZ(i, originalPositions[i * 3 + 2] + noise)
      }
      posAttr.needsUpdate = true
    }
  })
  
  if (mode === 'point-cloud') {
    return <PointCloudMesh geometry={geometry} texture={texture} opacity={opacity} animationMode={animationMode} />
  }
  
  if (!baseMaterial) return null
  
  return <mesh ref={meshRef} geometry={geometry} material={baseMaterial} renderOrder={1} />
}

function PointCloudMesh({ geometry, texture, opacity, animationMode }: { geometry: THREE.BufferGeometry, texture: THREE.Texture | null, opacity: number, animationMode: AnimationMode }) {
  const meshRef = useRef<THREE.Points>(null)
  const textureCache = useMemo(() => texture ? createTextureCache(texture) : null, [texture])
  
  const points = useMemo(() => {
    const posAttr = geometry.getAttribute('position')
    if (!posAttr) return { positions: new Float32Array(0), colors: new Float32Array(0) }
    
    const count = posAttr.count
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const uvAttr = geometry.getAttribute('uv') || geometry.getAttribute('TEXCOORD_0')
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = posAttr.getX(i)
      positions[i * 3 + 1] = posAttr.getY(i)
      positions[i * 3 + 2] = posAttr.getZ(i)
      
      if (textureCache && uvAttr) {
        const u = uvAttr.getX(i)
        const v = uvAttr.getY(i)
        const color = sampleTextureCache(textureCache, u, v)
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
      } else {
        colors[i * 3] = 0.38
        colors[i * 3 + 1] = 0.65
        colors[i * 3 + 2] = 0.98
      }
    }
    
    return { positions, colors }
  }, [geometry, texture])
  
  const originalPositions = useMemo(() => points.positions.slice(), [points])
  const originalColors = useMemo(() => points.colors.slice(), [points])
  
useFrame((state) => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.getAttribute('position')
    const colAttr = meshRef.current.geometry.getAttribute('color')
    if (!posAttr || !colAttr) return
    
    if (animationMode === 'none') {
      for (let i = 0; i < posAttr.count; i++) {
        posAttr.setX(i, originalPositions[i * 3])
        posAttr.setY(i, originalPositions[i * 3 + 1])
        posAttr.setZ(i, originalPositions[i * 3 + 2])
        colAttr.setX(i, originalColors[i * 3])
        colAttr.setY(i, originalColors[i * 3 + 1])
        colAttr.setZ(i, originalColors[i * 3 + 2])
      }
      posAttr.needsUpdate = true
      colAttr.needsUpdate = true
      return
    }
    
    const time = state.clock.elapsedTime
    
    if (animationMode === 'scramble') {
      for (let i = 0; i < posAttr.count; i++) {
        const noise = Math.sin(time * 5 + i * 0.1) * 0.01
        posAttr.setX(i, originalPositions[i * 3] + noise)
        posAttr.setY(i, originalPositions[i * 3 + 1] + noise)
        posAttr.setZ(i, originalPositions[i * 3 + 2] + noise)
      }
    } else if (animationMode === 'glow') {
      const brightness = 0.7 + Math.sin(time * 3) * 0.3
      for (let i = 0; i < colAttr.count; i++) {
        colAttr.setX(i, originalColors[i * 3] * brightness)
        colAttr.setY(i, originalColors[i * 3 + 1] * brightness)
        colAttr.setZ(i, originalColors[i * 3 + 2] * brightness)
      }
    }
    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.positions.length / 3} array={points.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={points.colors.length / 3} array={points.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} transparent opacity={opacity * 0.6} vertexColors sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function SculptureAnimation({ modelLines, mode, meshes, hologramMode, animationMode }: { modelLines: LineWithColor[] | null, mode: WireframeMode, meshes: MeshData[], hologramMode: HologramMode, animationMode: AnimationMode }) {
  const groupRef = useRef<THREE.Group>(null)
  const connections = useMemo(() => generateTesseractConnections(), [])
  
  const [phase, setPhase] = useState<Phase>('idle')
  const [morphProgress, setMorphProgress] = useState(0)
  
  const phaseStartRef = useRef(0)
  const hasMorphedRef = useRef(false)
  
  const idleDuration = 4
  const morphDuration = 3.0
  
  useFrame((state) => {
    if (!groupRef.current) return
    
    const now = performance.now()
    const phaseElapsed = (now - phaseStartRef.current) / 1000
    
    if (phase === 'idle') {
      if (phaseElapsed > idleDuration && !hasMorphedRef.current && modelLines) {
        phaseStartRef.current = now
        setPhase('morphing_to_model')
      }
    } else if (phase === 'morphing_to_model') {
      const progress = Math.min(1, phaseElapsed / morphDuration)
      setMorphProgress(progress)
      
      if (phaseElapsed > morphDuration) {
        setPhase('showing_model')
        hasMorphedRef.current = true
      }
    }
  })
  
  const wireframeOpacity = phase === 'showing_model' 
    ? 1 
    : phase === 'morphing_to_model' 
      ? Math.max(0, (morphProgress - 0.7) / 0.3)
      : 0
  
  const hologramOpacity = phase === 'showing_model' 
    ? 1 
    : phase === 'morphing_to_model' 
      ? Math.max(0, (morphProgress - 0.3) / 0.7)
      : 0.5
  
  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={1.0}>
      {meshes.length > 0 && hologramOpacity > 0 && (
        <HologramOverlay meshes={meshes} mode={hologramMode} opacity={hologramOpacity} animationMode={animationMode} />
      )}
      <MorphingLines 
        connections={connections} 
        modelLines={modelLines}
        phase={phase}
        morphProgress={morphProgress}
      />
      {modelLines && wireframeOpacity > 0 && (
        <WireframeModel lines={modelLines} opacity={wireframeOpacity} mode={mode} animationMode={animationMode} />
      )}
    </group>
  )
}

function GlowParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 30
  
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
      posAttr.array[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.001
    }
    posAttr.needsUpdate = true
    pointsRef.current.rotation.y = time * 0.02
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#5088FF" transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  )
}

const MODES: { value: WireframeMode; label: string }[] = [
  { value: 'lines', label: 'Lines' },
  { value: 'points', label: 'Points' },
  { value: 'triangles', label: 'Triangles' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'thick', label: 'Thick' },
]

const HOLOGRAM_MODES: { value: HologramMode; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'transparent', label: 'Transparent' },
  { value: 'glass', label: 'Glass' },
  { value: 'inner-glow', label: 'Glow' },
  { value: 'point-cloud', label: 'Points' },
]

const ANIMATION_MODES: { value: AnimationMode; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'scramble', label: 'Scramble' },
  { value: 'glow', label: 'Glow' },
]

export function FaceAnimation({ className = '' }: { className?: string }) {
  const [modelLines, setModelLines] = useState<LineWithColor[] | null>(null)
  const [meshes, setMeshes] = useState<MeshData[]>([])
  const [mode, setMode] = useState<WireframeMode>('lines')
  const [hologramMode, setHologramMode] = useState<HologramMode>('none')
  const [animationMode, setAnimationMode] = useState<AnimationMode>('none')
  
  const handleLoad = useCallback((lines: LineWithColor[]) => {
    setModelLines(lines)
  }, [])
  
  const handleMeshLoad = useCallback((meshData: MeshData[]) => {
    setMeshes(meshData)
  }, [])
  
  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-10, 5, -10]} intensity={0.4} color="#4A90D9" />
        <pointLight position={[0, -5, 5]} intensity={0.3} color="#306BFF" />
        <FaceModel onLoad={handleLoad} onMeshLoad={handleMeshLoad} />
        <SculptureAnimation modelLines={modelLines} mode={mode} meshes={meshes} hologramMode={hologramMode} animationMode={animationMode} />
        <GlowParticles />
        <OrbitControls minDistance={1} maxDistance={10} />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center">
        <div className="flex gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
          {MODES.map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                mode === m.value 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
          <span className="text-xs text-white/50 px-2">Hologram:</span>
          {HOLOGRAM_MODES.map((m) => (
            <button
              key={m.value}
              onClick={() => setHologramMode(m.value)}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                hologramMode === m.value 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
          <span className="text-xs text-white/50 px-2">Anim:</span>
          {ANIMATION_MODES.map((m) => (
            <button
              key={m.value}
              onClick={() => setAnimationMode(m.value)}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                animationMode === m.value 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FaceAnimation
