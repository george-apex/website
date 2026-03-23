'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HoverBackgroundProps {
  children: React.ReactNode
  className?: string
  /**
   * Color theme: 'accent' (blue) or 'data' (cyan)
   */
  color?: 'accent' | 'data'
  /**
   * Size of the glow effect
   */
  size?: number
  /**
   * Intensity of the glow (0-1)
   */
  intensity?: number
  /**
   * Whether to show the grid pattern
   */
  showGrid?: boolean
  /**
   * Whether to show particles
   */
  showParticles?: boolean
}

// Floating particle component
function FloatingParticle({ 
  delay, 
  duration, 
  x, 
  y,
  color 
}: { 
  delay: number
  duration: number
  x: string
  y: string
  color: string
}) {
  return (
    <motion.div
      className={cn(
        "absolute w-1 h-1 rounded-full",
        color === 'accent' ? 'bg-accent/20' : 'bg-data/20'
      )}
      style={{ left: x, top: y }}
      animate={{
        y: [0, -20, 0],
        opacity: [0, 0.5, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function HoverBackground({
  children,
  className,
  color = 'accent',
  size = 400,
  intensity = 0.15,
  showGrid = true,
  showParticles = false,
}: HoverBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isHovered = React.useState(false)
  
  // Smooth spring animation for mouse following
  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  
  // Transform for gradient size based on hover
  const glowOpacity = useTransform(
    x,
    [0, 1],
    [intensity * 0.5, intensity]
  )
  
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )
  
  const handleMouseEnter = React.useCallback(() => {
    isHovered[1](true)
  }, [isHovered])
  
  const handleMouseLeave = React.useCallback(() => {
    isHovered[1](false)
    mouseX.set(-size)
    mouseY.set(-size)
  }, [mouseX, mouseY, size])
  
  const colorValue = color === 'accent' 
    ? 'rgba(74, 144, 217,' 
    : 'rgba(48, 158, 186,'
  
  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grid background */}
      {showGrid && (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      )}
      
      {/* Floating particles */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <FloatingParticle
              key={i}
              delay={i * 0.5}
              duration={3 + i * 0.5}
              x={`${20 + i * 15}%`}
              y={`${30 + (i % 3) * 20}%`}
              color={color}
            />
          ))}
        </div>
      )}
      
      {/* Gradient glow that follows mouse */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          x: x,
          y: y,
          translateX: '-50%',
          translateY: '-50%',
          width: size,
          height: size,
          background: `radial-gradient(circle, ${colorValue}${intensity}) 0%, ${colorValue}0.08) 40%, transparent 70%)`,
          opacity: isHovered[0] ? 1 : 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered[0] ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Subtle inner glow at edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${colorValue}0.03) 0%, transparent 10%, transparent 90%, ${colorValue}0.03) 100%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Simpler variant for section backgrounds
export function SectionHoverGlow({
  children,
  className,
  color = 'accent',
}: {
  children: React.ReactNode
  className?: string
  color?: 'accent' | 'data'
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const x = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const y = useSpring(mouseY, { stiffness: 100, damping: 20 })
  
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )
  
  const colorValue = color === 'accent' 
    ? 'rgba(74, 144, 217,' 
    : 'rgba(48, 158, 186,'
  
  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      onMouseMove={handleMouseMove}
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${x}px ${y}px, ${colorValue}0.04), transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}

export default HoverBackground
