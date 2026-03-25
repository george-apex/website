'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowOrbProps {
  color?: 'blue' | 'cyan' | 'purple' | 'mixed'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  opacity?: number
  position?: { x?: string; y?: string }
  animate?: boolean
}

const colorVariants = {
  blue: {
    core: 'bg-apex-blue',
    glow: 'bg-apex-blue/30',
  },
  cyan: {
    core: 'bg-apex-cyan',
    glow: 'bg-apex-cyan/30',
  },
  purple: {
    core: 'bg-apex-purple',
    glow: 'bg-apex-purple/30',
  },
  mixed: {
    core: 'bg-gradient-to-br from-apex-blue via-apex-cyan to-apex-purple',
    glow: 'bg-gradient-to-br from-apex-blue/30 via-apex-cyan/30 to-apex-purple/30',
  },
}

const sizeVariants = {
  sm: { core: 'w-32 h-32', glow: 'w-64 h-64' },
  md: { core: 'w-48 h-48', glow: 'w-96 h-96' },
  lg: { core: 'w-64 h-64', glow: 'w-[32rem] h-[32rem]' },
  xl: { core: 'w-96 h-96', glow: 'w-[48rem] h-[48rem]' },
}

const blurVariants = {
  sm: 'blur-3xl',
  md: 'blur-[100px]',
  lg: 'blur-[150px]',
  xl: 'blur-[200px]',
}

export function GlowOrb({
  color = 'blue',
  size = 'md',
  className = '',
  blur = 'lg',
  opacity = 0.15,
  position,
  animate = true,
}: GlowOrbProps) {
  const colors = colorVariants[color]
  const sizes = sizeVariants[size]

  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        left: position?.x,
        top: position?.y,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    >
      {/* Outer glow */}
      <motion.div
        className={cn(
          'absolute rounded-full',
          sizes.glow,
          colors.glow,
          blurVariants[blur]
        )}
        style={{ opacity }}
        animate={
          animate
            ? {
                scale: [1, 1.1, 1],
                opacity: [opacity, opacity * 1.2, opacity],
              }
            : undefined
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

// Multiple orbs component for complex backgrounds
interface MultiOrbBackgroundProps {
  className?: string
}

export function MultiOrbBackground({ className = '' }: MultiOrbBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <GlowOrb
        color="blue"
        size="xl"
        blur="xl"
        opacity={0.08}
        position={{ x: '20%', y: '30%' }}
      />
      <GlowOrb
        color="cyan"
        size="lg"
        blur="xl"
        opacity={0.06}
        position={{ x: '80%', y: '60%' }}
      />
      <GlowOrb
        color="purple"
        size="md"
        blur="lg"
        opacity={0.05}
        position={{ x: '50%', y: '80%' }}
      />
    </div>
  )
}
