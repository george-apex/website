'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/ui/section'

// =============================================================================
// F1 CAR PARTICLE DEFINITIONS
// =============================================================================

interface Particle {
  x: number
  y: number
  size: number
  brightness: number
}

function generateF1CarParticles(): Particle[] {
  const particles: Particle[] = []
  
  // Front wing endplates (left)
  particles.push(
    { x: -48, y: 14, size: 2.5, brightness: 0.7 },
    { x: -50, y: 12, size: 2, brightness: 0.6 },
    { x: -52, y: 10, size: 2, brightness: 0.5 },
    { x: -50, y: 8, size: 2, brightness: 0.5 },
    { x: -48, y: 6, size: 2, brightness: 0.6 },
  )
  
  // Front wing endplates (right)
  particles.push(
    { x: -48, y: -14, size: 2.5, brightness: 0.7 },
    { x: -50, y: -12, size: 2, brightness: 0.6 },
    { x: -52, y: -10, size: 2, brightness: 0.5 },
    { x: -50, y: -8, size: 2, brightness: 0.5 },
    { x: -48, y: -6, size: 2, brightness: 0.6 },
  )
  
  // Front wing main element
  for (let i = 0; i < 12; i++) {
    particles.push({
      x: -44 + i * 2,
      y: 4,
      size: 2.5,
      brightness: 0.9
    })
    particles.push({
      x: -44 + i * 2,
      y: -4,
      size: 2.5,
      brightness: 0.9
    })
  }
  
  // Front wing flaps
  for (let i = 0; i < 8; i++) {
    particles.push({
      x: -40 + i * 2.5,
      y: 5,
      size: 2,
      brightness: 0.8
    })
    particles.push({
      x: -40 + i * 2.5,
      y: -5,
      size: 2,
      brightness: 0.8
    })
  }
  
  // Nose cone
  particles.push(
    { x: -22, y: 2, size: 2.5, brightness: 0.95 },
    { x: -22, y: -2, size: 2.5, brightness: 0.95 },
    { x: -20, y: 1, size: 2.5, brightness: 0.95 },
    { x: -20, y: -1, size: 2.5, brightness: 0.95 },
    { x: -18, y: 0, size: 3, brightness: 1.0 },
    { x: -16, y: 0, size: 3, brightness: 1.0 },
  )
  
  // Chassis front section
  for (let i = 0; i < 6; i++) {
    particles.push({
      x: -14 + i * 2,
      y: 3,
      size: 3,
      brightness: 1.0
    })
    particles.push({
      x: -14 + i * 2,
      y: -3,
      size: 3,
      brightness: 1.0
    })
    particles.push({
      x: -14 + i * 2,
      y: 0,
      size: 3.5,
      brightness: 1.0
    })
  }
  
  // Sidepods (left)
  for (let i = 0; i < 10; i++) {
    particles.push({
      x: -6 + i * 3,
      y: 10,
      size: 3.5,
      brightness: 0.85
    })
    particles.push({
      x: -6 + i * 3,
      y: 12,
      size: 3,
      brightness: 0.75
    })
    particles.push({
      x: -4 + i * 3,
      y: 14,
      size: 2.5,
      brightness: 0.65
    })
  }
  
  // Sidepods (right)
  for (let i = 0; i < 10; i++) {
    particles.push({
      x: -6 + i * 3,
      y: -10,
      size: 3.5,
      brightness: 0.85
    })
    particles.push({
      x: -6 + i * 3,
      y: -12,
      size: 3,
      brightness: 0.75
    })
    particles.push({
      x: -4 + i * 3,
      y: -14,
      size: 2.5,
      brightness: 0.65
    })
  }
  
  // Cockpit opening
  particles.push(
    { x: -2, y: -5, size: 2.5, brightness: 0.6 },
    { x: 0, y: -6, size: 2.5, brightness: 0.6 },
    { x: 2, y: -6, size: 2.5, brightness: 0.6 },
    { x: 4, y: -5, size: 2.5, brightness: 0.6 },
    { x: 6, y: -4, size: 2.5, brightness: 0.6 },
  )
  
  // Halo structure
  particles.push(
    { x: -1, y: -7, size: 2, brightness: 0.95 },
    { x: 1, y: -8, size: 2, brightness: 0.95 },
    { x: 3, y: -8, size: 2, brightness: 0.95 },
    { x: 5, y: -7, size: 2, brightness: 0.95 },
    { x: 0, y: -9, size: 1.5, brightness: 0.9 },
    { x: 2, y: -9.5, size: 1.5, brightness: 0.9 },
    { x: 4, y: -9, size: 1.5, brightness: 0.9 },
  )
  
  // Driver helmet
  particles.push(
    { x: 1, y: -3, size: 3.5, brightness: 0.5 },
    { x: 2, y: -4, size: 3, brightness: 0.5 },
    { x: 3, y: -3, size: 3, brightness: 0.5 },
  )
  
  // Engine cover
  for (let i = 0; i < 12; i++) {
    particles.push({
      x: 8 + i * 2.5,
      y: 2,
      size: 3,
      brightness: 1.0
    })
    particles.push({
      x: 8 + i * 2.5,
      y: -2,
      size: 3,
      brightness: 1.0
    })
    particles.push({
      x: 8 + i * 2.5,
      y: 0,
      size: 3.5,
      brightness: 1.0
    })
  }
  
  // Engine cover top detail
  for (let i = 0; i < 8; i++) {
    particles.push({
      x: 12 + i * 3,
      y: -4,
      size: 2,
      brightness: 0.9
    })
  }
  
  // Air intake above driver
  particles.push(
    { x: 4, y: -11, size: 3, brightness: 0.85 },
    { x: 5, y: -12, size: 2.5, brightness: 0.8 },
    { x: 6, y: -11, size: 3, brightness: 0.85 },
  )
  
  // Floor/diffuser
  for (let i = 0; i < 8; i++) {
    particles.push({
      x: 20 + i * 2,
      y: 6,
      size: 2.5,
      brightness: 0.8
    })
    particles.push({
      x: 20 + i * 2,
      y: -6,
      size: 2.5,
      brightness: 0.8
    })
  }
  
  // Rear wing endplates (left)
  particles.push(
    { x: 38, y: 10, size: 3, brightness: 0.9 },
    { x: 40, y: 12, size: 3, brightness: 0.85 },
    { x: 42, y: 14, size: 2.5, brightness: 0.8 },
    { x: 44, y: 16, size: 2, brightness: 0.7 },
    { x: 40, y: 8, size: 3, brightness: 0.9 },
    { x: 42, y: 6, size: 2.5, brightness: 0.8 },
  )
  
  // Rear wing endplates (right)
  particles.push(
    { x: 38, y: -10, size: 3, brightness: 0.9 },
    { x: 40, y: -12, size: 3, brightness: 0.85 },
    { x: 42, y: -14, size: 2.5, brightness: 0.8 },
    { x: 44, y: -16, size: 2, brightness: 0.7 },
    { x: 40, y: -8, size: 3, brightness: 0.9 },
    { x: 42, y: -6, size: 2.5, brightness: 0.8 },
  )
  
  // Rear wing main plane
  for (let i = 0; i < 6; i++) {
    particles.push({
      x: 36 + i * 1.5,
      y: 4,
      size: 3,
      brightness: 1.0
    })
    particles.push({
      x: 36 + i * 1.5,
      y: -4,
      size: 3,
      brightness: 1.0
    })
    particles.push({
      x: 36 + i * 1.5,
      y: 0,
      size: 3.5,
      brightness: 1.0
    })
  }
  
  // DRS flap
  for (let i = 0; i < 5; i++) {
    particles.push({
      x: 38 + i * 1.5,
      y: 8,
      size: 2.5,
      brightness: 0.9
    })
    particles.push({
      x: 38 + i * 1.5,
      y: -8,
      size: 2.5,
      brightness: 0.9
    })
  }
  
  // Front wheels (left)
  particles.push(
    { x: -20, y: 18, size: 5, brightness: 0.5 },
    { x: -18, y: 20, size: 4.5, brightness: 0.45 },
    { x: -22, y: 20, size: 4, brightness: 0.4 },
    { x: -20, y: 22, size: 4, brightness: 0.4 },
    { x: -16, y: 18, size: 3.5, brightness: 0.35 },
  )
  
  // Front wheels (right)
  particles.push(
    { x: -20, y: -18, size: 5, brightness: 0.5 },
    { x: -18, y: -20, size: 4.5, brightness: 0.45 },
    { x: -22, y: -20, size: 4, brightness: 0.4 },
    { x: -20, y: -22, size: 4, brightness: 0.4 },
    { x: -16, y: -18, size: 3.5, brightness: 0.35 },
  )
  
  // Rear wheels (left)
  particles.push(
    { x: 28, y: 18, size: 5.5, brightness: 0.5 },
    { x: 30, y: 20, size: 5, brightness: 0.45 },
    { x: 26, y: 20, size: 4.5, brightness: 0.4 },
    { x: 28, y: 22, size: 4.5, brightness: 0.4 },
    { x: 32, y: 18, size: 4, brightness: 0.35 },
  )
  
  // Rear wheels (right)
  particles.push(
    { x: 28, y: -18, size: 5.5, brightness: 0.5 },
    { x: 30, y: -20, size: 5, brightness: 0.45 },
    { x: 26, y: -20, size: 4.5, brightness: 0.4 },
    { x: 28, y: -22, size: 4.5, brightness: 0.4 },
    { x: 32, y: -18, size: 4, brightness: 0.35 },
  )
  
  // Suspension arms (front left)
  particles.push(
    { x: -18, y: 8, size: 1.5, brightness: 0.7 },
    { x: -19, y: 10, size: 1.5, brightness: 0.65 },
    { x: -19, y: 12, size: 1.5, brightness: 0.6 },
    { x: -19, y: 14, size: 1.5, brightness: 0.55 },
  )
  
  // Suspension arms (front right)
  particles.push(
    { x: -18, y: -8, size: 1.5, brightness: 0.7 },
    { x: -19, y: -10, size: 1.5, brightness: 0.65 },
    { x: -19, y: -12, size: 1.5, brightness: 0.6 },
    { x: -19, y: -14, size: 1.5, brightness: 0.55 },
  )
  
  // Suspension arms (rear left)
  particles.push(
    { x: 26, y: 8, size: 1.5, brightness: 0.7 },
    { x: 27, y: 10, size: 1.5, brightness: 0.65 },
    { x: 27, y: 12, size: 1.5, brightness: 0.6 },
    { x: 27, y: 14, size: 1.5, brightness: 0.55 },
  )
  
  // Suspension arms (rear right)
  particles.push(
    { x: 26, y: -8, size: 1.5, brightness: 0.7 },
    { x: 27, y: -10, size: 1.5, brightness: 0.65 },
    { x: 27, y: -12, size: 1.5, brightness: 0.6 },
    { x: 27, y: -14, size: 1.5, brightness: 0.55 },
  )
  
  return particles
}

// =============================================================================
// VEHICLE DEFINITIONS
// =============================================================================

const vehicles = [
  {
    id: 'general-ai',
    name: 'General AI',
    color: '#10A37F',
    glowColor: 'rgba(16, 163, 127, 0.8)',
    lane: 0,
    failure: 'wall-crash',
    failureProgress: 0.68,
    failureText: 'Fragmented under production load',
  },
  {
    id: 'reasoning-ai',
    name: 'Reasoning AI',
    color: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.8)',
    lane: 1,
    failure: 'engine-failure',
    failureProgress: 0.72,
    failureText: 'No domain-specific guardrails',
  },
  {
    id: 'search-ai',
    name: 'Search AI',
    color: '#64B5F6',
    glowColor: 'rgba(100, 181, 246, 0.8)',
    lane: 2,
    failure: 'spin-out',
    failureProgress: 0.75,
    failureText: 'Search ≠ Action',
  },
  {
    id: 'apexe3',
    name: 'APEX:E3',
    color: '#306BFF',
    glowColor: 'rgba(48, 107, 255, 0.9)',
    lane: 3,
    failure: null,
    failureProgress: null,
    failureText: null,
  },
]

// =============================================================================
// DEBRIS PARTICLE
// =============================================================================

interface DebrisParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  life: number
}

// =============================================================================
// CANVAS RACE TRACK
// =============================================================================

interface CarState {
  x: number
  y: number
  rotation: number
  scale: number
  exploded: boolean
  explosionProgress: number
  particles: Array<{
    baseX: number
    baseY: number
    x: number
    y: number
    vx: number
    vy: number
    size: number
    brightness: number
    rotation: number
  }>
}

const speedProfiles: Record<string, number[]> = {
  'general-ai': [0.8, 0.9, 1.1, 1.0, 0.85, 0.95, 1.05, 0.9, 0.75, 0.7],
  'reasoning-ai': [1.1, 1.0, 0.9, 1.2, 1.15, 0.95, 1.0, 1.1, 0.85, 0.8],
  'search-ai': [0.95, 1.05, 1.0, 0.85, 1.1, 1.15, 0.9, 1.0, 0.8, 0.75],
  'apexe3': [1.0, 1.05, 1.0, 1.1, 1.05, 1.15, 1.1, 1.2, 1.25, 1.3],
}

function RaceCanvas({ 
  progress, 
  width, 
  height 
}: { 
  progress: number
  width: number
  height: number 
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const carStatesRef = React.useRef<CarState[]>([])
  const debrisRef = React.useRef<DebrisParticle[]>([])
  const animationRef = React.useRef<number>()
  const prevProgressRef = React.useRef(0)
  
  const baseParticles = React.useMemo(() => generateF1CarParticles(), [])
  
  const laneHeight = 60
  const trackPadding = 60
  const carScale = 0.55
  
  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    if (carStatesRef.current.length === 0) {
      vehicles.forEach((vehicle, index) => {
        const laneY = trackPadding + index * laneHeight + laneHeight / 2
        carStatesRef.current.push({
          x: 80,
          y: laneY,
          rotation: 0,
          scale: carScale,
          exploded: false,
          explosionProgress: 0,
          particles: baseParticles.map(p => ({
            baseX: p.x,
            baseY: p.y,
            x: p.x,
            y: p.y,
            vx: 0,
            vy: 0,
            size: p.size,
            brightness: p.brightness,
            rotation: 0,
          }))
        })
      })
    }
    
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      
      ctx.fillStyle = 'rgba(12, 13, 15, 0.98)'
      ctx.fillRect(0, 0, width, height)
      
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 1
      for (let i = 1; i < 4; i++) {
        const y = trackPadding + i * laneHeight
        ctx.setLineDash([20, 15])
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
      ctx.setLineDash([])
      
      const lastMileStart = width * 0.6
      if (progress >= 0.6) {
        const gradient = ctx.createLinearGradient(lastMileStart, 0, width, 0)
        gradient.addColorStop(0, 'rgba(231, 76, 60, 0)')
        gradient.addColorStop(1, 'rgba(231, 76, 60, 0.08)')
        ctx.fillStyle = gradient
        ctx.fillRect(lastMileStart, 0, width - lastMileStart, height)
      }
      
      const finishX = width - 80
      ctx.strokeStyle = progress >= 0.95 ? '#2ECC71' : 'rgba(255, 255, 255, 0.15)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(finishX, 0)
      ctx.lineTo(finishX, height)
      ctx.stroke()
      
      if (progress >= 0.95) {
        ctx.shadowColor = '#2ECC71'
        ctx.shadowBlur = 20
        ctx.strokeStyle = '#2ECC71'
        ctx.beginPath()
        ctx.moveTo(finishX, 0)
        ctx.lineTo(finishX, height)
        ctx.stroke()
        ctx.shadowBlur = 0
      }
      
      debrisRef.current.forEach(debris => {
        if (debris.opacity > 0.05) {
          ctx.beginPath()
          ctx.arc(debris.x, debris.y, debris.size, 0, Math.PI * 2)
          ctx.fillStyle = debris.color
          ctx.globalAlpha = debris.opacity
          ctx.shadowColor = debris.color
          ctx.shadowBlur = 6
          ctx.fill()
          ctx.shadowBlur = 0
          ctx.globalAlpha = 1
        }
      })
      
      vehicles.forEach((vehicle, index) => {
        const carState = carStatesRef.current[index]
        if (!carState) return
        
        const isApexE3 = vehicle.id === 'apexe3'
        const failurePoint = vehicle.failureProgress || 1
        
        const speedProfile = speedProfiles[vehicle.id] || speedProfiles['apexe3']
        const profileIndex = Math.min(Math.floor(progress * speedProfile.length), speedProfile.length - 1)
        const nextIndex = Math.min(profileIndex + 1, speedProfile.length - 1)
        const t = (progress * speedProfile.length) % 1
        const speedMultiplier = speedProfile[profileIndex] + (speedProfile[nextIndex] - speedProfile[profileIndex]) * t
        
        const carProgress = Math.min(progress * speedMultiplier, isApexE3 ? progress : failurePoint)
        const targetX = 80 + (carProgress * (width - 160))
        
        if (!isApexE3 && progress >= failurePoint && !carState.exploded) {
          carState.exploded = true
          
          carState.particles.forEach((p, i) => {
            const angle = (i / carState.particles.length) * Math.PI * 2 + Math.random() * 0.5
            const speed = 2 + Math.random() * 4
            
            switch (vehicle.failure) {
              case 'wall-crash':
                p.vx = Math.cos(angle) * speed * 0.3 + 8 + Math.random() * 4
                p.vy = Math.sin(angle) * speed * 1.5 + (Math.random() - 0.5) * 6
                p.rotation = (Math.random() - 0.5) * 0.5
                break
              case 'engine-failure':
                p.vx = -Math.abs(Math.cos(angle)) * speed * 1.2 - 2 - Math.random() * 3
                p.vy = Math.sin(angle) * speed * 0.8 + (Math.random() - 0.5) * 4
                p.rotation = (Math.random() - 0.5) * 0.3
                break
              case 'spin-out':
                const spinAngle = carState.rotation * 3 + angle
                p.vx = Math.cos(spinAngle) * speed * 1.8
                p.vy = Math.sin(spinAngle) * speed * 1.8
                p.rotation = (Math.random() - 0.5) * 0.6
                break
            }
          })
        }
        
        if (carState.exploded) {
          carState.explosionProgress = Math.min(1, carState.explosionProgress + 0.006)
          
          carState.particles.forEach(p => {
            p.x += p.vx
            p.y += p.vy
            p.vx *= 0.985
            p.vy *= 0.985
            p.vy += 0.03
          })
          
          if (Math.random() < 0.4 && carState.explosionProgress < 0.9) {
            const randomParticle = carState.particles[Math.floor(Math.random() * carState.particles.length)]
            debrisRef.current.push({
              x: carState.x + randomParticle.x * carState.scale,
              y: carState.y + randomParticle.y * carState.scale,
              vx: randomParticle.vx * 0.4 + (Math.random() - 0.5) * 2,
              vy: randomParticle.vy * 0.4 + (Math.random() - 0.5) * 2,
              size: randomParticle.size * 0.7,
              color: vehicle.color,
              opacity: 1,
              life: 1,
            })
          }
        } else {
          carState.x = targetX
          
          if (!isApexE3 && progress >= failurePoint - 0.1) {
            switch (vehicle.failure) {
              case 'wall-crash':
                carState.rotation = Math.max(-0.5, carState.rotation - 0.02)
                carState.y -= 1.5
                carState.scale *= 0.998
                break
              case 'engine-failure':
                carState.scale = Math.max(0.85, carState.scale - 0.003)
                carState.x -= 0.5
                break
              case 'spin-out':
                carState.rotation += 0.06
                break
            }
          }
        }
        
        ctx.save()
        ctx.translate(carState.x, carState.y)
        ctx.rotate(carState.rotation)
        ctx.scale(-carState.scale, carState.scale)
        
        const particleOpacity = carState.exploded ? Math.max(0, 1 - carState.explosionProgress) : 1
        
        carState.particles.forEach(p => {
          const px = carState.exploded ? p.x : p.baseX
          const py = carState.exploded ? p.y : p.baseY
          
          ctx.beginPath()
          ctx.arc(px, py, p.size, 0, Math.PI * 2)
          ctx.fillStyle = vehicle.color
          ctx.globalAlpha = particleOpacity * p.brightness
          ctx.shadowColor = vehicle.color
          ctx.shadowBlur = isApexE3 ? 12 : 8
          ctx.fill()
        })
        
        ctx.globalAlpha = 1
        ctx.shadowBlur = 0
        ctx.restore()
      })
      
      debrisRef.current = debrisRef.current.filter(d => {
        d.x += d.vx
        d.y += d.vy
        d.vx *= 0.99
        d.vy *= 0.99
        d.opacity *= 0.998
        d.life -= 0.0008
        return d.opacity > 0.02 && d.life > 0
      })
      
      prevProgressRef.current = progress
      animationRef.current = requestAnimationFrame(render)
    }
    
    render()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [progress, width, height, baseParticles, laneHeight, trackPadding, carScale])
  
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full"
    />
  )
}

// =============================================================================
// LEGEND
// =============================================================================

function Legend({ progress }: { progress: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
      {vehicles.map((vehicle) => {
        const hasFailed = vehicle.failureProgress && progress >= vehicle.failureProgress
        const hasFinished = vehicle.id === 'apexe3' && progress >= 1
        
        return (
          <div
            key={vehicle.id}
            className="p-3 rounded-lg transition-all duration-300"
            style={{
              background: vehicle.id === 'apexe3' 
                ? 'rgba(48, 107, 255, 0.1)'
                : 'rgba(255,255,255,0.02)',
              border: `1px solid ${vehicle.id === 'apexe3' ? 'rgba(48, 107, 255, 0.3)' : 'rgba(255,255,255,0.05)'}`,
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background: vehicle.color,
                  boxShadow: `0 0 10px ${vehicle.glowColor}`,
                }}
              />
              <span className="text-body-sm font-medium text-white/90">{vehicle.name}</span>
            </div>
            <div 
              className="text-label mt-1.5 transition-all duration-300"
              style={{
                color: hasFailed ? '#E74C3C' : hasFinished ? '#2ECC71' : 'rgba(255,255,255,0.5)'
              }}
            >
              {hasFailed ? (
                <span className="flex items-center gap-1">
                  <span>💥</span> {vehicle.failureText}
                </span>
              ) : hasFinished ? (
                <span className="flex items-center gap-1">
                  <span>🏆</span> Deployed to Production
                </span>
              ) : (
                'Racing...'
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function LastMileTraffic() {
  const ref = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [progress, setProgress] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [hasPlayed, setHasPlayed] = React.useState(false)
  const [dimensions, setDimensions] = React.useState({ width: 1200, height: 320 })

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({
          width: Math.max(800, rect.width),
          height: 320
        })
      }
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  React.useEffect(() => {
    if (isInView && !hasPlayed) {
      setIsPlaying(true)
      setHasPlayed(true)
    }
  }, [isInView, hasPlayed])

  React.useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          setIsPlaying(false)
          return 1
        }
        return prev + 0.004
      })
    }, 16)

    return () => clearInterval(interval)
  }, [isPlaying])

  const handleReplay = () => {
    setProgress(0)
    setIsPlaying(true)
  }

  return (
    <Section variant="default" className="relative overflow-hidden" container={false}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-radial-accent opacity-[0.08]" />
      </div>

      <div ref={ref} className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block text-label font-medium text-accent mb-3 tracking-wider">
            THE LAST MILE
          </span>
          <h2 className="text-display-lg lg:text-display-xl text-content-primary font-medium max-w-3xl mx-auto mb-4">
            The highway to <span className="text-content-tertiary">production.</span>
          </h2>
          <p className="text-body-lg text-content-secondary max-w-2xl mx-auto">
            Everyone starts the journey. Most get stuck in the last mile. 
            See who actually makes it to production.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div 
            ref={containerRef}
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ 
              height: 320,
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <RaceCanvas progress={progress} width={dimensions.width} height={dimensions.height} />
            
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="text-label text-white/40 tracking-wider font-medium">START</div>
            </div>
            
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <div 
                className="text-label font-semibold tracking-wider"
                style={{ color: progress >= 1 ? '#2ECC71' : 'rgba(255,255,255,0.5)' }}
              >
                PRODUCTION
              </div>
            </div>
            
            {progress >= 0.6 && progress < 0.95 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className="text-label text-[#E74C3C] tracking-wider font-medium animate-pulse">
                  ⚠ LAST MILE
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-label text-white/40">Progress</span>
              <div className="w-32 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-label text-white/70 font-medium">
                {Math.round(progress * 100)}%
              </span>
            </div>
            
            <motion.button
              onClick={handleReplay}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-label text-white/50 hover:text-white/80 hover:bg-white/5 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 8C2 4.68629 4.68629 2 8 2C10.5 2 12.5 3.5 13.5 5.5M14 8C14 11.3137 11.3137 14 8 14C5.5 14 3.5 12.5 2.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M13 2V5.5H9.5M3 14V10.5H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Replay
            </motion.button>
          </div>

          <Legend progress={progress} />
        </motion.div>
      </div>
    </Section>
  )
}

export default LastMileTraffic
