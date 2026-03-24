'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/ui/section'
import MorphingParticles from '@/components/animations/MorphingParticles'

// =============================================================================
// LEGEND - AI Solution Comparison
// =============================================================================

const competitors = [
  {
    id: 'general-ai',
    name: 'General AI',
    color: '#10A37F',
    crashText: 'Spun out under production load',
  },
  {
    id: 'reasoning-ai',
    name: 'Reasoning AI',
    color: '#D97706',
    crashText: 'Hit the wall - no guardrails',
  },
  {
    id: 'search-ai',
    name: 'Search AI',
    color: '#1E88E5',
    crashText: 'Ran off track - no traction',
  },
  {
    id: 'apexe3',
    name: 'APEX:E3',
    color: '#306BFF',
    crashText: null,
  },
]

function Legend() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {competitors.map((car) => (
        <div
          key={car.id}
          className="p-3 rounded-lg"
          style={{
            background: car.id === 'apexe3'
              ? 'rgba(48, 107, 255, 0.1)'
              : 'rgba(255,255,255,0.02)',
            border: `1px solid ${car.id === 'apexe3' ? 'rgba(48, 107, 255, 0.3)' : 'rgba(255,255,255,0.05)'}`,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-2.5 rounded-sm"
              style={{ background: car.color }}
            />
            <span className="text-body-sm font-medium text-white/90">{car.name}</span>
          </div>
          <div className={`text-label mt-1.5 ${car.crashText ? 'text-[#E74C3C]/70' : 'text-[#2ECC71]/70'}`}>
            {car.crashText || '✓ Championship winner'}
          </div>
        </div>
      ))}
    </div>
  )
}

// =============================================================================
// ANIMATED APEX CURVE - SVG trajectory visualization
// =============================================================================

function ApexCurve() {
  const ref = React.useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Control points for a smooth corner/apex curve
  const pathStart = { x: 40, y: 180 }
  const apexPoint = { x: 200, y: 100 }  // The critical point
  const pathEnd = { x: 360, y: 40 }
  
  // Bezier curve through apex
  const curvePath = `M ${pathStart.x} ${pathStart.y} 
                     Q 80 ${pathStart.y - 20}, 140 140
                     Q ${apexPoint.x - 40} ${apexPoint.y + 60}, ${apexPoint.x} ${apexPoint.y}
                     Q ${apexPoint.x + 80} ${apexPoint.y - 40}, ${pathEnd.x} ${pathEnd.y}`
  
  // Suboptimal path (too early)
  const earlyPath = `M ${pathStart.x} ${pathStart.y}
                     Q 60 ${pathStart.y - 80}, 120 80
                     Q 180 30, ${pathEnd.x} ${pathEnd.y}`
  
  // Suboptimal path (too late)
  const latePath = `M ${pathStart.x} ${pathStart.y}
                    Q 200 ${pathStart.y - 10}, 280 180
                    Q 340 140, ${pathEnd.x} ${pathEnd.y}`

  return (
    <svg 
      ref={ref} 
      viewBox="0 0 400 220" 
      className="w-full max-w-md"
      style={{ filter: 'drop-shadow(0 0 20px rgba(48, 107, 255, 0.3))' }}
    >
      <defs>
        {/* Gradient for optimal path */}
        <linearGradient id="apexGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#306BFF" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#306BFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#306BFF" stopOpacity="0.6" />
        </linearGradient>
        
        {/* Glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Arrow marker */}
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#306BFF" opacity="0.8" />
        </marker>
      </defs>
      
      {/* Background subtle grid lines */}
      <g opacity="0.1">
        {[...Array(8)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 28 + 20} x2="400" y2={i * 28 + 20} stroke="white" strokeWidth="0.5" />
        ))}
        {[...Array(10)].map((_, i) => (
          <line key={`v${i}`} x1={i * 40 + 20} y1="0" x2={i * 40 + 20} y2="220" stroke="white" strokeWidth="0.5" />
        ))}
      </g>
      
      {/* Suboptimal paths - faded */}
      <motion.path
        d={earlyPath}
        fill="none"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      <motion.path
        d={latePath}
        fill="none"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      
      {/* Optimal path through apex */}
      <motion.path
        d={curvePath}
        fill="none"
        stroke="url(#apexGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        filter="url(#glow)"
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
      />
      
      {/* Apex point marker */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.5 }}
      >
        {/* Outer ring */}
        <circle
          cx={apexPoint.x}
          cy={apexPoint.y}
          r="16"
          fill="none"
          stroke="#306BFF"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Inner ring */}
        <circle
          cx={apexPoint.x}
          cy={apexPoint.y}
          r="8"
          fill="none"
          stroke="#306BFF"
          strokeWidth="1.5"
          opacity="0.8"
        />
        {/* Center dot */}
        <circle
          cx={apexPoint.x}
          cy={apexPoint.y}
          r="3"
          fill="#306BFF"
        />
        {/* Pulse animation */}
        <motion.circle
          cx={apexPoint.x}
          cy={apexPoint.y}
          r="8"
          fill="none"
          stroke="#306BFF"
          strokeWidth="1"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.g>
      
      {/* Labels */}
      <motion.text
        x={apexPoint.x}
        y={apexPoint.y + 40}
        textAnchor="middle"
        fill="#306BFF"
        fontSize="11"
        fontWeight="600"
        letterSpacing="0.1em"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
      >
        APEX
      </motion.text>
      
      {/* Entry/Exit labels */}
      <motion.text
        x={pathStart.x + 10}
        y={pathStart.y + 20}
        fill="rgba(255,255,255,0.6)"
        fontSize="9"
        letterSpacing="0.15em"
        fontWeight="500"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        COMPLEXITY
      </motion.text>
      <motion.text
        x={pathEnd.x - 60}
        y={pathEnd.y - 8}
        fill="rgba(255,255,255,0.6)"
        fontSize="9"
        letterSpacing="0.15em"
        fontWeight="500"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        EXECUTION
      </motion.text>
    </svg>
  )
}

export function ApexMetaphor() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false })

  return (
    <Section variant="default" className="relative overflow-hidden min-h-[600px]">
      {/* Morphing Particles Background */}
      <div className="absolute inset-0 z-0">
        <MorphingParticles className="w-full h-full" />
        
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-surface-900/95 via-surface-900/80 to-surface-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-transparent to-surface-900/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-900/60 via-transparent to-surface-900/80" />
        
        {/* Subtle blue accent overlay */}
        <div className="absolute inset-0 bg-accent/5" />
      </div>

      {/* Content */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto">
        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[500px] py-12">
          {/* Left: Animated visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Glow behind the curve */}
              <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-full scale-150" />
              <ApexCurve />
            </div>
          </motion.div>
          
          {/* Right: Key message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <span className="inline-block text-label font-medium text-accent mb-3 tracking-wider">
              THE LAST MILE
            </span>
            <h2 className="text-display-lg lg:text-display-xl text-content-primary font-medium max-w-xl">
              In racing, the apex{' '}
              <span className="text-content-tertiary">defines the exit.</span>
              <br />
              <span className="gradient-accent">In enterprise AI, so does Apexe3.</span>
            </h2>
            <p className="text-body-lg text-content-secondary max-w-lg">
              The apex is the critical point where precision, control, timing, and trajectory converge.
              Hit it right, and you set up the fastest possible path forward.
            </p>
            <p className="text-body-lg text-content-secondary max-w-lg">
              Championship on the line. Final lap. Four cars enter The Apex.
              Only one makes it through to claim the title.
            </p>
            <div className="pt-4">
              <Legend />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default ApexMetaphor
