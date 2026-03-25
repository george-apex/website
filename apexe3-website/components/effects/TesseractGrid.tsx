'use client'

import { useEffect, useRef } from 'react'

interface TesseractGridProps {
  className?: string
  depth?: number
  color?: string
}

export function TesseractGrid({ 
  className = '', 
  depth = 4,
  color = 'rgba(48, 107, 255, 0.1)'
}: TesseractGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    const gridSize = 60
    let offset = 0
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = color
      
      for (let layer = 0; layer < depth; layer++) {
        const layerOffset = layer * 15
        const opacity = 1 - (layer / depth) * 0.7
        
        ctx.globalAlpha = opacity * 0.3
        ctx.lineWidth = 0.5
        
        for (let x = 0; x < canvas.width + gridSize; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x + ((offset + layerOffset) % gridSize), 0)
          ctx.lineTo(x + ((offset + layerOffset) % gridSize), canvas.height)
          ctx.stroke()
        }
        
        for (let y = 0; y < canvas.height + gridSize; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y + ((offset + layerOffset) % gridSize))
          ctx.lineTo(canvas.width, y + ((offset + layerOffset) % gridSize))
          ctx.stroke()
        }
      }
      
      offset += 0.2
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [depth, color])
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  )
}

interface InfiniteCorridorProps {
  frameCount?: number
  color?: string
}

export function InfiniteCorridor({ 
  frameCount = 4,
  color = 'rgba(48, 107, 255, 0.1)'
}: InfiniteCorridorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    let time = 0
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      for (let i = 0; i < frameCount; i++) {
        const size = 100 + i * 80 + Math.sin(time + i * 0.5) * 20
        const opacity = 0.1 - i * 0.02
        
        ctx.strokeStyle = color
        ctx.globalAlpha = opacity
        ctx.lineWidth = 1
        
        ctx.beginPath()
        ctx.rect(centerX - size / 2, centerY - size / 2, size, size)
        ctx.stroke()
      }
      
      time += 0.01
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [frameCount, color])
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  )
}
