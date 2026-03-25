'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface ParticleFieldProps {
  count?: number
  className?: string
  color?: string
  minSize?: number
  maxSize?: number
}

export function ParticleField({
  count = 30,
  className = '',
  color = 'rgba(59, 130, 246, 0.3)',
  minSize = 1,
  maxSize = 3,
}: ParticleFieldProps) {
  const [particles, setParticles] = React.useState<Particle[]>([])

  React.useEffect(() => {
    const newParticles: Particle[] = []
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        duration: 10 + Math.random() * 20,
        delay: Math.random() * 5,
      })
    }
    setParticles(newParticles)
  }, [count, minSize, maxSize])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
