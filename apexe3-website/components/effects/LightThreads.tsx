'use client'

import { useEffect, useRef } from 'react'

interface LightThreadsProps {
  className?: string
  threadCount?: number
  color?: string
}

export function LightThreads({ 
  className = '',
  threadCount = 5,
  color = 'rgba(48, 107, 255, 0.1)'
}: LightThreadsProps) {
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
    
    const threads = Array.from({ length: threadCount }, (_, i) => ({
      y: (canvas.height / threadCount) * i,
      amplitude: 20 + Math.random() * 30,
      frequency: 0.005 + Math.random() * 0.01,
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.02
    }))
    
    let time = 0
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      threads.forEach(thread => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.3
        
        for (let x = 0; x < canvas.width; x += 2) {
          const y = thread.y + Math.sin(x * thread.frequency + thread.phase + time * thread.speed) * thread.amplitude
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      })
      
      time++
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [threadCount, color])
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  )
}

interface DataRaysProps {
  rayCount?: number
  color?: string
  direction?: 'vertical' | 'horizontal'
  speed?: 'slow' | 'medium' | 'fast'
}

export function DataRays({ 
  rayCount = 5,
  color = 'rgba(48, 107, 255, 0.1)',
  direction = 'vertical',
  speed = 'medium'
}: DataRaysProps) {
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
    
    const speedMultiplier = speed === 'slow' ? 0.5 : speed === 'fast' ? 2 : 1
    
    const rays = Array.from({ length: rayCount }, () => ({
      position: Math.random() * (direction === 'vertical' ? canvas.width : canvas.height),
      length: 100 + Math.random() * 200,
      opacity: 0.1 + Math.random() * 0.2,
      speed: (0.5 + Math.random() * 1) * speedMultiplier
    }))
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      rays.forEach(ray => {
        const gradient = ctx.createLinearGradient(
          direction === 'vertical' ? ray.position : 0,
          direction === 'vertical' ? 0 : ray.position,
          direction === 'vertical' ? ray.position : canvas.width,
          direction === 'vertical' ? canvas.height : ray.position
        )
        
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(0.5, color.replace(/[\d.]+\)$/, `${ray.opacity})`))
        gradient.addColorStop(1, 'transparent')
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.globalAlpha = ray.opacity
        
        ctx.beginPath()
        if (direction === 'vertical') {
          ctx.moveTo(ray.position, 0)
          ctx.lineTo(ray.position, canvas.height)
        } else {
          ctx.moveTo(0, ray.position)
          ctx.lineTo(canvas.width, ray.position)
        }
        ctx.stroke()
        
        ray.position += ray.speed
        if (direction === 'vertical' && ray.position > canvas.width) {
          ray.position = 0
        } else if (direction === 'horizontal' && ray.position > canvas.height) {
          ray.position = 0
        }
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [rayCount, color, direction, speed])
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  )
}
