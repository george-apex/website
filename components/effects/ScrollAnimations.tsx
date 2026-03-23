'use client'

import * as React from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useScrollPosition } from '@/hooks'

// ============================================
// SCROLL PROGRESS INDICATOR
// Luminous progress bar at top of screen
// ============================================
interface ScrollProgressIndicatorProps {
  className?: string
  color?: string
  height?: number
}

export function ScrollProgressIndicator({
  className = '',
  color = '#00d4ff',
  height = 3,
}: ScrollProgressIndicatorProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={cn('fixed top-0 left-0 right-0 z-[100] origin-left', className)}
      style={{
        scaleX,
        height,
        background: `linear-gradient(90deg, ${color}, #0088ff, ${color})`,
        boxShadow: `0 0 15px ${color}, 0 0 30px ${color}, 0 0 45px rgba(0, 212, 255, 0.3)`,
      }}
    />
  )
}

// ============================================
// SCROLL PARALLAX LAYERS
// Multi-depth parallax background layers
// ============================================
interface ScrollParallaxLayerProps {
  children: React.ReactNode
  className?: string
  speed?: number // -1 to 1, negative = slower, positive = faster
  direction?: 'vertical' | 'horizontal'
}

export function ScrollParallaxLayer({
  children,
  className = '',
  speed = 0.5,
  direction = 'vertical',
}: ScrollParallaxLayerProps) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, speed * 300])
  const x = useTransform(scrollY, [0, 1000], [0, speed * 300])

  return (
    <motion.div
      className={className}
      style={{ y: direction === 'vertical' ? y : 0, x: direction === 'horizontal' ? x : 0 }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// SCROLL GLOW TRAILS
// Luminous trails that follow scroll direction
// ============================================
interface ScrollGlowTrailsProps {
  className?: string
  trailCount?: number
  color?: string
}

export function ScrollGlowTrails({
  className = '',
  trailCount = 8,
  color = 'rgba(0, 212, 255, 0.15)',
}: ScrollGlowTrailsProps) {
  const { scrollYProgress } = useScroll()
  const { direction } = useScrollPosition()
  const [trails, setTrails] = React.useState<{ id: number; x: number; y: number; size: number }[]>([])

  // Create trail particles on scroll
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', () => {
      if (direction) {
        const newTrail = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 20 + Math.random() * 60,
        }
        setTrails(prev => [...prev.slice(-trailCount + 1), newTrail])
      }
    })
    return unsubscribe
  }, [scrollYProgress, direction, trailCount])

  return (
    <div className={cn('fixed inset-0 pointer-events-none overflow-hidden z-10', className)}>
      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute rounded-full"
          style={{
            left: `${trail.x}%`,
            top: `${trail.y}%`,
            width: trail.size,
            height: trail.size,
            background: `radial-gradient(circle, ${color}, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// SCROLL GRID DISTORTION
// Grid that warps based on scroll velocity
// ============================================
interface ScrollGridDistortionProps {
  className?: string
  gridSize?: number
  lineColor?: string
  distortionIntensity?: number
}

export function ScrollGridDistortion({
  className = '',
  gridSize = 60,
  lineColor = 'rgba(0, 212, 255, 0.04)',
  distortionIntensity = 0.3,
}: ScrollGridDistortionProps) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const [distortion, setDistortion] = React.useState({ x: 0, y: 0 })

  useAnimationFrame(() => {
    const velocity = scrollVelocity.get()
    setDistortion({
      x: Math.sin(velocity * 0.01) * distortionIntensity * 20,
      y: Math.cos(velocity * 0.01) * distortionIntensity * 10,
    })
  })

  return (
    <motion.svg
      className={cn('absolute inset-0 w-full h-full', className)}
      style={{
        transform: `perspective(500px) rotateX(${distortion.y}deg) rotateY(${distortion.x}deg)`,
      }}
    >
      <defs>
        <pattern id="distort-grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
          <line x1={gridSize} y1="0" x2={gridSize} y2={gridSize} stroke={lineColor} strokeWidth="0.5" />
          <line x1="0" y1={gridSize} x2={gridSize} y2={gridSize} stroke={lineColor} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#distort-grid)" />
    </motion.svg>
  )
}

// ============================================
// SCROLL DATA STREAMS
// Animated vertical data streams controlled by scroll
// ============================================
interface ScrollDataStreamsProps {
  className?: string
  streamCount?: number
  color?: string
}

export function ScrollDataStreams({
  className = '',
  streamCount = 6,
  color = '#00d4ff',
}: ScrollDataStreamsProps) {
  const { scrollYProgress } = useScroll()
  const [streams] = React.useState(() =>
    Array.from({ length: streamCount }, (_, i) => ({
      id: i,
      x: 10 + (i * 80 / streamCount) + Math.random() * 10,
      height: 100 + Math.random() * 200,
      delay: i * 0.5,
    }))
  )

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className={cn('fixed inset-0 pointer-events-none overflow-hidden z-0', className)}>
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute w-px"
          style={{
            left: `${stream.x}%`,
            top: '-10%',
            height: stream.height,
            background: `linear-gradient(180deg, 
              transparent 0%, 
              ${color}00 10%, 
              ${color}40 50%, 
              ${color}00 90%, 
              transparent 100%
            )`,
            y,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            delay: stream.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// SCROLL SECTION TRANSITION
// Smooth transitions between sections with ENCOM effects
// ============================================
interface ScrollSectionTransitionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function ScrollSectionTransition({
  children,
  className = '',
  id,
}: ScrollSectionTransitionProps) {
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50])

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={{ opacity, scale, y }}
    >
      {children}
    </motion.section>
  )
}

// ============================================
// SCROLL REVEAL ENCOM
// Enhanced reveal with ENCOM glitch/scan effects
// ============================================
interface ScrollRevealEncomProps {
  children: React.ReactNode
  className?: string
  effect?: 'glitch' | 'scan' | 'fade' | 'slice' | 'wipe'
  delay?: number
  duration?: number
  threshold?: number
}

export function ScrollRevealEncom({
  children,
  className = '',
  effect = 'fade',
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
}: ScrollRevealEncomProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  const effectVariants = {
    glitch: {
      hidden: { opacity: 0, x: -20, filter: 'blur(10px)' },
      visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
    },
    scan: {
      hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
      visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
    },
    fade: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    slice: {
      hidden: { opacity: 0, clipPath: 'inset(50% 0 50% 0)' },
      visible: { opacity: 1, clipPath: 'inset(0% 0 0% 0)' },
    },
    wipe: {
      hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      visible: { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={effectVariants[effect]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// SCROLL HORIZONTAL LINE TRACE
// Animated horizontal lines that trace on scroll
// ============================================
interface ScrollLineTraceProps {
  className?: string
  position?: number // 0-100 percentage from top
  color?: string
  thickness?: number
}

export function ScrollLineTrace({
  className = '',
  position = 50,
  color = 'rgba(0, 212, 255, 0.3)',
  thickness = 1,
}: ScrollLineTraceProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className={cn('absolute left-0 right-0 pointer-events-none', className)} style={{ top: `${position}%` }}>
      <motion.div
        className="w-full origin-center"
        style={{
          scaleX,
          opacity,
          height: thickness,
          background: `linear-gradient(90deg, transparent 0%, ${color} 20%, ${color} 80%, transparent 100%)`,
        }}
      />
    </div>
  )
}

// ============================================
// SCROLL COUNTER
// Animated number counter that triggers on scroll
// ============================================
interface ScrollCounterProps {
  value: number
  className?: string
  duration?: number
  prefix?: string
  suffix?: string
}

export function ScrollCounter({
  value,
  className = '',
  duration = 2,
  prefix = '',
  suffix = '',
}: ScrollCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = React.useState(0)
  const [hasAnimated, setHasAnimated] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / (duration * 1000), 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setDisplayValue(Math.floor(value * easeOut))
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, duration, hasAnimated])

  return (
    <span ref={ref} className={cn('font-mono', className)}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}

// ============================================
// SCROLL PULSE EFFECT
// Pulsing glow effect triggered by scroll velocity
// ============================================
interface ScrollPulseEffectProps {
  children: React.ReactNode
  className?: string
  color?: string
  pulseIntensity?: number
}

export function ScrollPulseEffect({
  children,
  className = '',
  color = 'rgba(0, 212, 255, 0.3)',
  pulseIntensity = 1,
}: ScrollPulseEffectProps) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const [glowIntensity, setGlowIntensity] = React.useState(0)

  useAnimationFrame(() => {
    const velocity = Math.abs(scrollVelocity.get())
    const targetGlow = Math.min(velocity / 500 * pulseIntensity, 1)
    setGlowIntensity(prev => prev + (targetGlow - prev) * 0.1)
  })

  return (
    <motion.div
      className={className}
      style={{
        boxShadow: `0 0 ${20 + glowIntensity * 40}px ${color.replace('0.3', String(0.1 + glowIntensity * 0.4))}`,
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// SCROLL REVEAL STAGGER
// Stagger children animations on scroll
// ============================================
interface ScrollRevealStaggerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale'
}

export function ScrollRevealStagger({
  children,
  className = '',
  staggerDelay = 0.1,
  animation = 'fadeUp',
}: ScrollRevealStaggerProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  }).scrollYProgress

  const animationVariants = {
    fadeUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    fadeLeft: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    fadeRight: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={animationVariants[animation]}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// ============================================
// SCROLL BEZIER CURVE
// Animated bezier curves that draw on scroll
// ============================================
interface ScrollBezierCurveProps {
  className?: string
  paths?: { start: { x: number; y: number }; end: { x: number; y: number }; control: { x: number; y: number } }[]
  color?: string
  strokeWidth?: number
}

export function ScrollBezierCurve({
  className = '',
  paths = [
    { start: { x: 0, y: 100 }, control: { x: 50, y: 0 }, end: { x: 100, y: 100 } },
  ],
  color = '#00d4ff',
  strokeWidth = 1,
}: ScrollBezierCurveProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className={cn('w-full h-64', className)}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={`M ${path.start.x} ${path.start.y} Q ${path.control.x} ${path.control.y} ${path.end.x} ${path.end.y}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            style={{ pathLength, opacity }}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  )
}

export default ScrollProgressIndicator
