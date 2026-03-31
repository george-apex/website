'use client'

import * as React from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/section'
import { 
  FileText, 
  Network, 
  Sparkles, 
  ArrowRight,
  Layers,
  Target,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  X,
  Database,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  Percent,
  TrendingDown
} from 'lucide-react'

// Many more chaos elements - scattered, messy, overwhelming
const chaosDocuments = Array.from({ length: 25 }, (_, i) => ({
  id: `doc-${i}`,
  x: Math.random() * 85 + 5,
  y: Math.random() * 85 + 5,
  rotate: Math.random() * 60 - 30,
  type: ['doc', 'tab', 'note', 'chart', 'alert'][Math.floor(Math.random() * 5)],
  delay: Math.random() * 2,
  duration: 3 + Math.random() * 4,
}))

// Floating noise particles
const noiseParticles = Array.from({ length: 50 }, (_, i) => ({
  id: `noise-${i}`,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 6,
  duration: 2 + Math.random() * 6,
  delay: Math.random() * 3,
}))

// Disconnected data lines
const disconnectedLines = Array.from({ length: 15 }, (_, i) => ({
  id: `line-${i}`,
  x1: Math.random() * 100,
  y1: Math.random() * 100,
  x2: Math.random() * 100,
  y2: Math.random() * 100,
  delay: Math.random() * 2,
}))

// Clarity graph data - conviction meter
const convictionData = [
  { label: 'Jan', value: 45 },
  { label: 'Feb', value: 52 },
  { label: 'Mar', value: 48 },
  { label: 'Apr', value: 61 },
  { label: 'May', value: 73 },
  { label: 'Jun', value: 68 },
  { label: 'Jul', value: 82 },
  { label: 'Aug', value: 89 },
  { label: 'Sep', value: 94 },
]

// Before/After comparison data
const comparisonData = {
  before: [
    { icon: AlertCircle, text: 'Scattered across 47 browser tabs' },
    { icon: Layers, text: 'Fragmented research in silos' },
    { icon: FileText, text: 'Manual synthesis taking hours' },
    { icon: TrendingUp, text: 'Signals buried in noise' },
    { icon: AlertCircle, text: 'Missed connections & patterns' },
  ],
  after: [
    { icon: CheckCircle2, text: 'Unified intelligence dashboard' },
    { icon: Network, text: 'Connected knowledge graph' },
    { icon: Zap, text: 'Instant synthesis & insights' },
    { icon: Target, text: 'Prioritized, decision-ready signals' },
    { icon: Sparkles, text: 'Clear action recommendations' },
  ]
}

export function ChaosToClarity() {
  const [showClarityPanel, setShowClarityPanel] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  // Mouse position for the clarity reveal effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovering, setIsHovering] = React.useState(false)
  const [clarityRadius, setClarityRadius] = React.useState(120)

  // Handle mouse move for the interactive clarity zone
  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }, [mouseX, mouseY])

  // Handle mouse enter/leave
  const handleMouseEnter = React.useCallback(() => {
    setIsHovering(true)
    // Expand clarity radius smoothly
    setClarityRadius(150)
  }, [])

  const handleMouseLeave = React.useCallback(() => {
    setIsHovering(false)
    setClarityRadius(120)
  }, [])

  return (
    <Section variant="dark" className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-900 via-surface-900 to-surface-800" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <SectionHeader
        label="The Transformation"
        title={
          <>
            <span className="text-content-tertiary">From Chaos</span>
            {' '}
            <span className="text-accent">to Clarity</span>
          </>
        }
        subtitle="A.L.I.C.E. transforms fragmented information into structured, decision-ready intelligence. Stop drowning in data. Start making decisions with conviction."
        align="center"
        className="text-center mx-auto mb-16"
      />

      {/* Main Interactive Visualization */}
      <div className="max-w-6xl mx-auto">
        {/* Instruction */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-content-tertiary mb-6"
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Move your mouse to experience A.L.I.C.E.'s clarity
          </span>
        </motion.p>

        {/* Interactive Chaos/Clarity Container */}
        <motion.div
          ref={containerRef}
          className="relative aspect-[16/9] rounded-2xl border border-border bg-surface-900 overflow-hidden cursor-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* LAYER 1: Chaos Background - Always visible, always moving */}
          <div className="absolute inset-0">
            {/* Noise texture overlay */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Disconnected lines */}
            <svg className="absolute inset-0 w-full h-full opacity-40">
              {disconnectedLines.map((line) => (
                <motion.line
                  key={line.id}
                  x1={`${line.x1}%`}
                  y1={`${line.y1}%`}
                  x2={`${line.x2}%`}
                  y2={`${line.y2}%`}
                  stroke="#E74C3C"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0.2 }}
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                    strokeDashoffset: [0, 20],
                  }}
                  transition={{ 
                    duration: 3,
                    delay: line.delay,
                    repeat: Infinity,
                  }}
                />
              ))}
            </svg>

            {/* Floating noise particles */}
            {noiseParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-content-tertiary/30"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: particle.size,
                  height: particle.size,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Scattered Documents */}
            {chaosDocuments.map((doc) => (
              <motion.div
                key={doc.id}
                className="absolute"
                style={{ left: `${doc.x}%`, top: `${doc.y}%` }}
                animate={{
                  x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
                  y: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
                  rotate: [doc.rotate, doc.rotate + Math.random() * 20 - 10, doc.rotate],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: doc.duration,
                  delay: doc.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className={`relative backdrop-blur-[1px] ${
                  doc.type === 'doc' ? 'w-14 h-16 rounded border border-accent/30 bg-surface-700/40' :
                  doc.type === 'tab' ? 'w-16 h-10 rounded-t border border-accent/30 bg-surface-700/40' :
                  doc.type === 'note' ? 'w-12 h-12 rounded border border-warning/30 bg-warning/10 rotate-6' :
                  doc.type === 'chart' ? 'w-16 h-14 rounded border border-negative/30 bg-surface-700/40' :
                  'w-10 h-10 rounded-full border border-negative/50 bg-negative/10'
                }`}>
                  {doc.type === 'doc' && (
                    <div className="p-1.5 space-y-0.5">
                      <FileText className="w-3 h-3 text-accent/50" />
                      <div className="w-6 h-0.5 bg-surface-600 rounded" />
                      <div className="w-4 h-0.5 bg-surface-600 rounded" />
                    </div>
                  )}
                  {doc.type === 'tab' && (
                    <div className="flex items-center gap-1 p-1.5">
                      <div className="w-1.5 h-1.5 rounded-sm bg-accent/40" />
                      <div className="w-1.5 h-1.5 rounded-sm bg-accent/40" />
                      <div className="w-1.5 h-1.5 rounded-sm bg-warning/40" />
                    </div>
                  )}
                  {doc.type === 'note' && (
                    <div className="p-2 space-y-0.5">
                      <X className="w-3 h-3 text-warning/60 absolute top-1 right-1" />
                      <div className="w-4 h-0.5 bg-warning/40 rounded" />
                    </div>
                  )}
                  {doc.type === 'chart' && (
                    <div className="p-1.5">
                      <BarChart3 className="w-4 h-4 text-negative/50" />
                    </div>
                  )}
                  {doc.type === 'alert' && (
                    <AlertCircle className="w-4 h-4 text-negative/70 m-auto" />
                  )}
                </div>
              </motion.div>
            ))}

            {/* Floating warning labels */}
            <motion.div
              className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-negative/10 border border-negative/30"
              animate={{ 
                x: [0, 5, -3, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <AlertCircle className="w-3 h-3 text-negative" />
              <span className="text-xs text-negative/80">47 tabs open</span>
            </motion.div>

            <motion.div
              className="absolute top-6 right-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/30"
              animate={{ 
                x: [0, -4, 3, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            >
              <FileText className="w-3 h-3 text-warning" />
              <span className="text-xs text-warning/80">156 documents</span>
            </motion.div>

            <motion.div
              className="absolute bottom-6 left-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30"
              animate={{ 
                x: [0, 3, -5, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
            >
              <Database className="w-3 h-3 text-accent" />
              <span className="text-xs text-accent/80">12 data sources</span>
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-negative/10 border border-negative/30"
              animate={{ 
                x: [0, -4, 4, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 5.5, repeat: Infinity, delay: 1.5 }}
            >
              <TrendingDown className="w-3 h-3 text-negative" />
              <span className="text-xs text-negative/80">Signal lost in noise</span>
            </motion.div>

            {/* Central chaos indicator */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-4xl font-bold text-content-tertiary/30">?</div>
              <div className="text-xs text-content-tertiary/40 mt-1">No clear path</div>
            </motion.div>
          </div>

          {/* LAYER 2: Clarity Reveal - Follows mouse with ALICE branding */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: mouseX,
              top: mouseY,
              x: '-50%',
              y: '-50%',
            }}
          >
            {/* Clarity zone with radial gradient mask */}
            <motion.div
              className="absolute"
              style={{
                width: clarityRadius * 2,
                height: clarityRadius * 2,
                x: '-50%',
                y: '-50%',
                background: 'radial-gradient(circle, rgba(10, 11, 13, 0.98) 0%, rgba(10, 11, 13, 0.9) 50%, transparent 70%)',
              }}
              animate={{
                width: isHovering ? clarityRadius * 2 : 0,
                height: isHovering ? clarityRadius * 2 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Clean organized elements inside the clarity zone */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Mini clarity dashboard */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: isHovering ? 1 : 0, 
                    opacity: isHovering ? 1 : 0 
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  {/* Central decision node */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border-2 border-accent/60 flex items-center justify-center">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                  
                  {/* Connected nodes */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 text-accent" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-positive/20 border border-positive/40 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-positive" />
                  </div>
                  <div className="absolute top-1/2 -left-8 -translate-y-1/2 w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-accent" />
                  </div>
                  <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-accent" />
                  </div>

                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{ left: '-40px', top: '-40px', width: 'calc(100% + 80px)', height: 'calc(100% + 80px)' }}>
                    <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="#306BFF" strokeWidth="1" opacity="0.5" />
                    <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="#2ECC71" strokeWidth="1" opacity="0.5" />
                    <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="#306BFF" strokeWidth="1" opacity="0.5" />
                    <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="#306BFF" strokeWidth="1" opacity="0.5" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* ALICE cursor indicator */}
            <motion.div
              className="absolute"
              style={{
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                scale: isHovering ? 1 : 0.8,
              }}
            >
              {/* Outer ring */}
              <motion.div
                className="absolute w-20 h-20 rounded-full border-2 border-accent/30"
                style={{ left: '-50%', top: '-50%' }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* ALICE Logo/Icon */}
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-lg shadow-accent/30">
                <span className="text-surface-900 font-bold text-sm">A</span>
              </div>
              
              {/* "Clarity" label */}
              <motion.div
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
                initial={{ opacity: 0, y: -5 }}
                animate={{ 
                  opacity: isHovering ? 1 : 0,
                  y: isHovering ? 0 : -5
                }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-xs text-accent font-medium bg-surface-900/90 px-2 py-0.5 rounded-full border border-accent/30">
                  A.L.I.C.E.
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hover state indicator */}
          <AnimatePresence>
            {!isHovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl mb-2"
                  >
                    👆
                  </motion.div>
                  <p className="text-sm text-content-tertiary">Hover to reveal clarity</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Full Clarity Panel Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <motion.button
            onClick={() => setShowClarityPanel(!showClarityPanel)}
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-surface-800/80 backdrop-blur-sm hover:border-accent/50 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-medium text-content-secondary">
              {showClarityPanel ? 'Hide' : 'Show'} Full Clarity Dashboard
            </span>
            <motion.div
              animate={{ rotate: showClarityPanel ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="w-4 h-4 text-accent" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Full Clarity Panel - Shows conviction graph */}
        <AnimatePresence>
          {showClarityPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden mt-8"
            >
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Conviction Graph */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-xl border border-accent/30 bg-accent/5"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="font-medium text-content-primary">Decision Conviction</h4>
                      <p className="text-sm text-content-tertiary">Confidence over time</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-positive" />
                      <span className="text-2xl font-bold text-positive">+49%</span>
                    </div>
                  </div>
                  
                  {/* Graph */}
                  <div className="relative h-40">
                    <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4].map((i) => (
                        <line
                          key={i}
                          x1="0"
                          y1={i * 37.5}
                          x2="400"
                          y2={i * 37.5}
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Gradient fill */}
                      <defs>
                        <linearGradient id="convictionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#306BFF" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#306BFF" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Area fill */}
                      <motion.path
                        d={`M 0 ${150 - convictionData[0].value * 1.4} ${convictionData.map((d, i) => 
                          `L ${i * 50} ${150 - d.value * 1.4}`
                        ).join(' ')} L 400 150 L 0 150 Z`}
                        fill="url(#convictionGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                      
                      {/* Line */}
                      <motion.path
                        d={`M 0 ${150 - convictionData[0].value * 1.4} ${convictionData.map((d, i) => 
                          `L ${i * 50} ${150 - d.value * 1.4}`
                        ).join(' ')}`}
                        fill="none"
                        stroke="#306BFF"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      />
                      
                      {/* Data points */}
                      {convictionData.map((d, i) => (
                        <motion.circle
                          key={i}
                          cx={i * 50}
                          cy={150 - d.value * 1.4}
                          r="4"
                          fill="#306BFF"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        />
                      ))}
                    </svg>
                    
                    {/* X-axis labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-content-tertiary pt-2">
                      {convictionData.map((d, i) => (
                        <span key={i}>{d.label}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Clarity Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-border bg-surface-800/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-accent" />
                        <span className="text-xs text-content-tertiary">Signal Quality</span>
                      </div>
                      <div className="text-2xl font-bold text-content-primary">94%</div>
                      <div className="text-xs text-positive">+32% vs baseline</div>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-surface-800/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-accent" />
                        <span className="text-xs text-content-tertiary">Time to Insight</span>
                      </div>
                      <div className="text-2xl font-bold text-content-primary">3.2s</div>
                      <div className="text-xs text-positive">-87% vs manual</div>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-surface-800/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Network className="w-4 h-4 text-accent" />
                        <span className="text-xs text-content-tertiary">Data Sources</span>
                      </div>
                      <div className="text-2xl font-bold text-content-primary">12</div>
                      <div className="text-xs text-accent">Unified</div>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-surface-800/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-positive" />
                        <span className="text-xs text-content-tertiary">Decision Ready</span>
                      </div>
                      <div className="text-2xl font-bold text-content-primary">Yes</div>
                      <div className="text-xs text-positive">Action recommended</div>
                    </div>
                  </div>
                  
                  {/* Action recommendation */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-4 rounded-xl border border-positive/30 bg-positive/5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-positive/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-positive" />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-content-primary mb-1">Recommended Action</h5>
                        <p className="text-xs text-content-secondary">
                          Based on synthesized data from 12 sources, increase position in NVDA by 2.5% with 15% stop-loss. 
                          Conviction: <span className="text-positive font-medium">High (94%)</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Before/After Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Before Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-xl border border-negative/30 bg-negative/5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-negative/20 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-negative" />
              </div>
              <h4 className="font-medium text-content-primary">
                Life Before A.L.I.C.E.
              </h4>
            </div>
            <ul className="space-y-3">
              {comparisonData.before.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-negative/60" />
                    <span className="text-sm text-content-secondary">
                      {item.text}
                    </span>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>

          {/* After Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-xl border border-accent/30 bg-accent/5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <h4 className="font-medium text-content-primary">
                Life With A.L.I.C.E.
              </h4>
            </div>
            <ul className="space-y-3">
              {comparisonData.after.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                    <span className="text-sm text-content-secondary">
                      {item.text}
                    </span>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-body-lg text-content-secondary mb-6">
            <span className="text-accent font-medium">Too much noise.</span> Not enough signal.{' '}
            <span className="text-content-primary font-medium">Until A.L.I.C.E.</span>
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-surface-900 font-medium hover:bg-accent-light transition-colors"
          >
            See A.L.I.C.E. in Action
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </Section>
  )
}

export default ChaosToClarity
