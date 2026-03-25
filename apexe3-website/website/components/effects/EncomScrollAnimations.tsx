'use client'

import * as React from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// ============================================
// ENCOM SCROLL CONTROLLER
// Main scroll animation orchestration
// ============================================
interface EncomScrollControllerProps {
  children: React.ReactNode
  enableProgressIndicator?: boolean
  enableGlowTrails?: boolean
  enableDataStreams?: boolean
  enableGridDistortion?: boolean
}

export function EncomScrollController({
  children,
  enableProgressIndicator = true,
  enableGlowTrails = true,
  enableDataStreams = true,
}: EncomScrollControllerProps) {
  const { scrollY, scrollYProgress } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const [isScrolling, setIsScrolling] = React.useState(false)
  const [scrollDirection, setScrollDirection] = React.useState<'up' | 'down'>('down')

  // Detect scroll state
  React.useEffect(() => {
    let timeout: NodeJS.Timeout
    let lastY = 0

    const handleScroll = () => {
      const currentY = window.scrollY
      setScrollDirection(currentY > lastY ? 'down' : 'up')
      setIsScrolling(true)
      lastY = currentY

      clearTimeout(timeout)
      timeout = setTimeout(() => setIsScrolling(false), 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      {/* Progress Indicator */}
      {enableProgressIndicator && <ScrollProgressLine />}

      {/* Glow Trails */}
      <AnimatePresence>
        {enableGlowTrails && isScrolling && <ScrollingGlowTrails direction={scrollDirection} />}
      </AnimatePresence>

      {/* Data Streams */}
      {enableDataStreams && <VerticalDataStreams progress={scrollYProgress} />}

      {/* Children */}
      {children}
    </>
  )
}

// ============================================
// SCROLL PROGRESS LINE
// Top progress bar with ENCOM glow
// ============================================
function ScrollProgressLine() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left">
      <motion.div
        className="h-full"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #00d4ff 0%, #0088ff 50%, #00d4ff 100%)',
          boxShadow: '0 0 10px #00d4ff, 0 0 20px rgba(0, 212, 255, 0.5)',
        }}
      />
    </motion.div>
  )
}

// ============================================
// SCROLLING GLOW TRAILS
// Particle trails that follow scroll direction
// ============================================
function ScrollingGlowTrails({ direction }: { direction: 'up' | 'down' }) {
  const [particles, setParticles] = React.useState<Array<{ id: number; x: number; y: number; size: number }>>([])

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: direction === 'down' ? 0 : 100,
        size: 50 + Math.random() * 100,
      }
      setParticles(prev => [...prev.slice(-20), newParticle])
    }, 50) // Generate particles more frequently

    return () => clearInterval(interval)
  }, [direction])

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            x: `${particle.x}%`, 
            y: `${particle.y}%`,
            opacity: 0.8,
            scale: 0.3 
          }}
          animate={{ 
            y: direction === 'down' ? '100%' : '0%',
            opacity: 0,
            scale: 2.5 
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.6) 0%, rgba(0, 136, 255, 0.3) 50%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// VERTICAL DATA STREAMS
// Animated vertical lines that respond to scroll
// ============================================
function VerticalDataStreams({ progress }: { progress: any }) {
  const streams = React.useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 3 + i * 8 + Math.random() * 3,
      height: 200 + Math.random() * 300,
    })),
  [])

  const y = useTransform(progress, [0, 1], ['-20%', '20%'])

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute w-px"
          style={{
            left: `${stream.x}%`,
            height: stream.height,
            y,
            background: 'linear-gradient(180deg, transparent 0%, rgba(0, 212, 255, 0.6) 50%, transparent 100%)',
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3,
            delay: stream.id * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// ENCOM SECTION WRAPPER
// Wrapper that adds scroll animations to sections
// ============================================
interface EncomSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  enableParallax?: boolean
  enableGlow?: boolean
  glowColor?: string
}

export function EncomSection({
  children,
  className = '',
  id,
  enableParallax = true,
  enableGlow = true,
  glowColor = 'rgba(0, 212, 255, 0.15)',
}: EncomSectionProps) {
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.97, 1, 1, 0.97])
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [50, 0, 0, -50])

  // Glow intensity based on scroll
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0])

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn('relative', className)}
      style={enableParallax ? { opacity, scale, y } : { opacity }}
    >
      {/* Section glow effect */}
      {enableGlow && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(ellipse 100% 60% at 50% 50%, ${glowColor}, transparent)`,
            opacity: glowOpacity,
          }}
        />
      )}
      
      {/* Content */}
      {children}
    </motion.section>
  )
}

// ============================================
// ENCOM CARD SCROLL
// Card with scroll-triggered animations
// ============================================
interface EncomCardScrollProps {
  children: React.ReactNode
  className?: string
  index?: number
  totalCards?: number
}

export function EncomCardScroll({
  children,
  className = '',
  index = 0,
  totalCards = 1,
}: EncomCardScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Staggered reveal based on index
  const delay = index / totalCards
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2 + delay * 0.1, 0.8, 1],
    [0, 1, 1, 0]
  )
  
  const y = useTransform(
    scrollYProgress,
    [0, 0.2 + delay * 0.1, 0.8, 1],
    [50 + index * 10, 0, 0, -30]
  )

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95])

  // Border glow
  const borderOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.5, 0])

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      style={{ opacity, y, scale }}
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-sm pointer-events-none"
        style={{
          border: '1px solid rgba(0, 212, 255, 0.3)',
          borderColor: `rgba(0, 212, 255, ${borderOpacity.get()})`,
          boxShadow: `0 0 20px rgba(0, 212, 255, ${borderOpacity.get() * 0.3})`,
        }}
      />
      
      {children}
    </motion.div>
  )
}

// ============================================
// ENCOM SCROLL TEXT
// Text that animates character by character on scroll
// ============================================
interface EncomScrollTextProps {
  text: string
  className?: string
  charDelay?: number
}

export function EncomScrollText({
  text,
  className = '',
  charDelay = 0.03,
}: EncomScrollTextProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const chars = text.split('')

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <span className="inline-flex">
        {chars.map((char, i) => {
          const charProgress = useTransform(
            scrollYProgress,
            [0, Math.min(1, (i + 1) * charDelay * 2)],
            [0, 1]
          )

          const opacity = useTransform(charProgress, [0, 1], [0, 1])
          const y = useTransform(charProgress, [0, 1], [20, 0])

          return (
            <motion.span
              key={i}
              style={{ opacity, y, display: 'inline-block' }}
              className={char === ' ' ? 'w-[0.3em]' : ''}
            >
              {char}
            </motion.span>
          )
        })}
      </span>
    </div>
  )
}

// ============================================
// ENCOM HORIZONTAL SCROLL
// Horizontal scroll section with parallax
// ============================================
interface EncomHorizontalScrollProps {
  children: React.ReactNode
  className?: string
}

export function EncomHorizontalScroll({
  children,
  className = '',
}: EncomHorizontalScrollProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  return (
    <section ref={containerRef} className={cn('relative h-[300vh]', className)}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-6">
          {children}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// ENCOM SCROLL STAT
// Animated statistics that count on scroll
// ============================================
interface EncomScrollStatProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  className?: string
}

export function EncomScrollStat({
  value,
  label,
  suffix = '',
  prefix = '',
  className = '',
}: EncomScrollStatProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [displayValue, setDisplayValue] = React.useState(0)
  const [hasAnimated, setHasAnimated] = React.useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (progress > 0 && !hasAnimated) {
        setHasAnimated(true)
        const duration = 2000
        const startTime = Date.now()

        const animate = () => {
          const elapsed = Date.now() - startTime
          const p = Math.min(elapsed / duration, 1)
          const easeOut = 1 - Math.pow(1 - p, 3)
          setDisplayValue(Math.floor(value * easeOut))

          if (p < 1) requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
      }
    })

    return unsubscribe
  }, [scrollYProgress, hasAnimated, value])

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className="text-4xl lg:text-5xl font-bold text-luminous-cyan font-mono">
        {prefix}
        <span className="glow-text">{displayValue.toLocaleString()}</span>
        {suffix}
      </div>
      <div className="text-text-tertiary mt-2 text-sm uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

// ============================================
// ENCOM SCROLL IMAGE
// Image with scroll-based reveal and effects
// ============================================
interface EncomScrollImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: number
}

export function EncomScrollImage({
  src,
  alt,
  className = '',
  aspectRatio = 16 / 9,
}: EncomScrollImageProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const clipProgress = useTransform(scrollYProgress, [0, 0.3], [100, 0])

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden rounded-sm', className)}
      style={{ aspectRatio }}
    >
      <motion.div
        className="absolute inset-0 bg-encom-void z-10"
        style={{
          clipPath: useTransform(
            clipProgress,
            (v) => `inset(0 0 ${v}% 0)`
          ),
        }}
      />
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ scale }}
      />
      <motion.div
        className="absolute inset-0 border border-luminous-cyan/20 pointer-events-none"
        style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]) }}
      />
    </div>
  )
}

export default EncomScrollController
