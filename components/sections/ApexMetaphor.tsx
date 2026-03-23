'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/ui/section'

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
      style={{ filter: 'drop-shadow(0 0 20px rgba(48, 107, 255, 0.1))' }}
    >
      <defs>
        {/* Gradient for optimal path */}
        <linearGradient id="apexGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4A90D9" stopOpacity="0.3" />
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
      <g opacity="0.05">
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
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      <motion.path
        d={latePath}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
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
          opacity="0.3"
        />
        {/* Inner ring */}
        <circle
          cx={apexPoint.x}
          cy={apexPoint.y}
          r="8"
          fill="none"
          stroke="#306BFF"
          strokeWidth="1.5"
          opacity="0.6"
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
          initial={{ scale: 1, opacity: 0.6 }}
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
        fontWeight="500"
        letterSpacing="0.05em"
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
        fill="rgba(255,255,255,0.4)"
        fontSize="9"
        letterSpacing="0.1em"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        COMPLEXITY
      </motion.text>
      <motion.text
        x={pathEnd.x - 60}
        y={pathEnd.y - 8}
        fill="rgba(255,255,255,0.4)"
        fontSize="9"
        letterSpacing="0.1em"
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
  return (
    <Section variant="default" className="relative overflow-hidden">
      {/* Subtle background trajectory lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-[0.03]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="bgLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="white" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {/* Curved motion lines in background */}
          <path d="M -100 400 Q 200 200 600 300 T 1400 200" fill="none" stroke="url(#bgLine)" strokeWidth="1" />
          <path d="M -50 600 Q 300 400 700 450 T 1500 350" fill="none" stroke="url(#bgLine)" strokeWidth="0.5" />
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Animated visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-start"
          >
            <ApexCurve />
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
              THE APEX PRINCIPLE
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
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default ApexMetaphor
