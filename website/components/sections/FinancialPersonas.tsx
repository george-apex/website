'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { PersonaSwitcher, Persona } from '@/components/ui/persona-switcher'
import { cn } from '@/lib/utils'

// Mouse-following glow effect
function MouseFollowGlow() {
  const ref = React.useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const x = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const y = useSpring(mouseY, { stiffness: 80, damping: 20 })
  
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )
  
  return (
    <div 
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: 'none' }}
    >
      {/* We need to capture mouse events on parent */}
    </div>
  )
}

// Animated trajectory lines
function TrajectoryLines() {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="trajectory-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(48, 158, 186, 0)" />
          <stop offset="50%" stopColor="rgba(48, 158, 186, 0.3)" />
          <stop offset="100%" stopColor="rgba(48, 158, 186, 0)" />
        </linearGradient>
      </defs>
      
      {/* Subtle curved trajectory paths */}
      <motion.path
        d="M-100,200 Q200,100 500,150 T1000,120"
        fill="none"
        stroke="url(#trajectory-gradient)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M-100,400 Q300,350 600,380 T1200,360"
        fill="none"
        stroke="url(#trajectory-gradient)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, delay: 0.2, ease: "easeInOut" }}
      />
    </svg>
  )
}

export function FinancialPersonas() {
  const [selectedPersona, setSelectedPersona] = React.useState<Persona | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  // Mouse position for reactive glow
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const x = useSpring(mouseX, { stiffness: 100, damping: 25 })
  const y = useSpring(mouseY, { stiffness: 100, damping: 25 })
  
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  const handlePersonaChange = (persona: Persona) => {
    setSelectedPersona(persona)
    // Could trigger other UI updates based on persona selection
  }

  return (
    <section 
      id="personas" 
      ref={containerRef}
      className="section-main relative overflow-hidden bg-surface-900"
      onMouseMove={handleMouseMove}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-data opacity-20" />
      
      {/* Mouse-following ambient glow */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          x: x,
          y: y,
          translateX: '-50%',
          translateY: '-50%',
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(48, 158, 186, 0.06) 0%, rgba(48, 158, 186, 0.02) 40%, transparent 70%)',
        }}
      />
      
      {/* Trajectory lines */}
      <TrajectoryLines />
      
      {/* Floating signal particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/30"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.5,
              delay: i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container-main relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <span className="section-label">Tailored Solutions</span>
          <h2 className="section-title">
            <span className="text-content-primary">Built for Your</span>{' '}
            <span className="gradient-accent">Specific Role</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Select your area of focus to see how APEXE3 addresses your unique challenges, 
            workflows, and outcomes.
          </p>
        </motion.div>

        {/* Persona Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <PersonaSwitcher
            defaultPersona="public-markets"
            onPersonaChange={handlePersonaChange}
            showMetrics={true}
          />
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-body-sm text-content-tertiary">
            All personas benefit from our core capabilities: AI Sovereignty, Bespoke Agents, and Last-Mile Deployment.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default FinancialPersonas
