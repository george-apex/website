'use client'

import * as React from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Target, Filter, CheckCircle2, PieChart, Zap } from 'lucide-react'

// =============================================================================
// CONSTANTS & DATA
// =============================================================================

const CONVICTION_SCORE = 94
const RISK_LEVEL = 'Moderate'
const TIME_TO_INSIGHT = '3.2s'
const DATA_SOURCES = 12

const PORTFOLIO_DATA = [
  { name: 'NVDA', allocation: 18.5, change: 2.4, conviction: 'High' },
  { name: 'AAPL', allocation: 14.2, change: -0.8, conviction: 'Medium' },
  { name: 'MSFT', allocation: 12.8, change: 1.2, conviction: 'High' },
  { name: 'GOOGL', allocation: 10.5, change: 0.5, conviction: 'Medium' },
]

const NETWORK_NODES = [
  { id: 'center', x: 50, y: 50, label: 'NVDA', size: 'lg' },
  { id: 'n1', x: 25, y: 30, label: 'AMD', size: 'sm' },
  { id: 'n2', x: 75, y: 25, label: 'TSM', size: 'sm' },
  { id: 'n3', x: 20, y: 65, label: 'AVGO', size: 'sm' },
  { id: 'n4', x: 80, y: 70, label: 'MU', size: 'sm' },
  { id: 'n5', x: 50, y: 20, label: 'SMCI', size: 'xs' },
  { id: 'n6', x: 50, y: 80, label: 'ARM', size: 'xs' },
]

const NETWORK_EDGES = [
  ['center', 'n1'], ['center', 'n2'], ['center', 'n3'],
  ['center', 'n4'], ['center', 'n5'], ['center', 'n6'],
  ['n1', 'n2'], ['n3', 'n4'], ['n1', 'n5'], ['n2', 'n5'],
]

const THESIS_DATA = {
  title: 'AI Infrastructure Play',
  status: 'On Track',
  supportingEvidence: 24,
  counterEvidence: 3,
}

// =============================================================================
// DOT GENERATORS
// =============================================================================

// Generate scattered noise dots with chaotic movement patterns
const generateNoiseDots = (count: number) => Array.from({ length: count }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  opacity: 0.3 + Math.random() * 0.5,
  delay: Math.random() * 0.5,
  // Unique chaotic movement keyframes for this dot - 5 waypoints for more chaotic movement
  chaosPath: {
    x1: Math.random() * 100,
    y1: Math.random() * 100,
    x2: Math.random() * 100,
    y2: Math.random() * 100,
    x3: Math.random() * 100,
    y3: Math.random() * 100,
    x4: Math.random() * 100,
    y4: Math.random() * 100,
    x5: Math.random() * 100,
    y5: Math.random() * 100,
    scale1: 0.5 + Math.random() * 1,
    scale2: 0.5 + Math.random() * 1,
    scale3: 0.5 + Math.random() * 1,
    scale4: 0.5 + Math.random() * 1,
    scale5: 0.5 + Math.random() * 1,
    duration: 2 + Math.random() * 2, // Faster = more frantic
  },
}))

// Target positions for each card's dots
const generateCardTargets = () => {
  const targets: { x: number; y: number; card: string }[] = []
  
  // Card positions (percentage of viewport)
  // Left column: Conviction Score + Metrics
  // Center column: Intelligence Network
  // Right column: Portfolio + Summary
  
  // Conviction Score card (left, top) - dots form the progress bar area
  for (let i = 0; i < 30; i++) {
    const row = Math.floor(i / 10)
    const col = i % 10
    targets.push({
      x: 8 + col * 1.5,  // Progress bar area
      y: 28 + row * 0.8,
      card: 'conviction'
    })
  }
  
  // Risk Level & Time to Insight cards (left, bottom)
  for (let i = 0; i < 20; i++) {
    targets.push({
      x: 6 + (i % 5) * 2,
      y: 42 + Math.floor(i / 5) * 1.5,
      card: 'metrics'
    })
  }
  
  // Intelligence Network (center) - dots form nodes and edges
  for (let i = 0; i < 40; i++) {
    const node = NETWORK_NODES[i % NETWORK_NODES.length]
    const angle = (i / 40) * Math.PI * 2
    const radius = 2 + Math.random() * 3
    targets.push({
      x: node.x + Math.cos(angle) * radius,
      y: node.y + Math.sin(angle) * radius,
      card: 'network'
    })
  }
  
  // Portfolio Exposure (right, top)
  for (let i = 0; i < 25; i++) {
    targets.push({
      x: 78 + (i % 5) * 1.2,
      y: 28 + Math.floor(i / 5) * 1.5,
      card: 'portfolio'
    })
  }
  
  // Summary card (right, bottom)
  for (let i = 0; i < 15; i++) {
    targets.push({
      x: 76 + (i % 5) * 1,
      y: 52 + Math.floor(i / 5) * 1.2,
      card: 'summary'
    })
  }
  
  return targets
}

// =============================================================================
// COMPONENT
// =============================================================================

export function NoiseToConvictionHero() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [showCards, setShowCards] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  
  // Generate dots only on client
  const [noiseDots, setNoiseDots] = React.useState<ReturnType<typeof generateNoiseDots>>([])
  const [cardTargets, setCardTargets] = React.useState<ReturnType<typeof generateCardTargets>>([])
  
  React.useEffect(() => {
    setNoiseDots(generateNoiseDots(150))
    setCardTargets(generateCardTargets())
    setIsMounted(true)
  }, [])
  
  // Trigger animation when in view
  React.useEffect(() => {
    if (isInView && !isAnimating && !showCards) {
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isInView, isAnimating, showCards])
  
  // Show cards after animation completes
  React.useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setShowCards(true)
      }, 6000) // 6 seconds for dots to organize
      return () => clearTimeout(timer)
    }
  }, [isAnimating])
  
  // Combine noise dots with their targets
  const dotsWithTargets = React.useMemo(() => {
    if (!isMounted) return []
    return noiseDots.map((dot, i) => ({
      ...dot,
      target: cardTargets[i % cardTargets.length] || { x: 50, y: 50, card: 'center' }
    }))
  }, [noiseDots, cardTargets, isMounted])

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-surface-950"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900 to-surface-950" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(48,107,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(48,107,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* ================================================================== */}
      {/* HEADER */}
      {/* ================================================================== */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 text-center z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-sm font-medium tracking-widest text-accent uppercase">
            Core Differentiators
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-content-primary mb-4"
        >
          From Noise <span className="text-content-tertiary">to</span> <span className="text-accent">Conviction</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-content-secondary max-w-2xl mx-auto"
        >
          Data, research, and signals synthesized into actionable intelligence.
        </motion.p>
      </div>
      
      {/* ================================================================== */}
      {/* ANIMATING DOTS LAYER */}
      {/* ================================================================== */}
      <AnimatePresence>
        {!showCards && isMounted && (
          <motion.div 
            className="absolute inset-0 z-10"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* SVG for connection lines during animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="dotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#306BFF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#306BFF" stopOpacity="0.4" />
                </linearGradient>
                <filter id="dotGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
            
            {/* The dots */}
            {dotsWithTargets.map((dot) => (
              <motion.div
                key={dot.id}
                className="absolute rounded-full"
                style={{
                  width: dot.size,
                  height: dot.size,
                  // Single solid color for noise, blue for synthesis
                  background: isAnimating 
                    ? '#306BFF' 
                    : '#E74C3C',
                  boxShadow: isAnimating 
                    ? `0 0 ${dot.size * 2}px rgba(48, 107, 255, 0.5)` 
                    : `0 0 ${dot.size * 1.5}px rgba(231, 76, 60, 0.4)`,
                }}
                initial={{ 
                  left: `${dot.x}%`, 
                  top: `${dot.y}%`,
                  scale: 1,
                }}
                animate={
                  isAnimating
                    ? {
                        left: `${dot.target.x}%`,
                        top: `${dot.target.y}%`,
                        scale: [1, 1.2, 1],
                      }
                    : {
                        // Continuous chaotic movement for noise effect - 5 waypoints
                        left: [`${dot.x}%`, `${dot.chaosPath.x1}%`, `${dot.chaosPath.x2}%`, `${dot.chaosPath.x3}%`, `${dot.chaosPath.x4}%`, `${dot.chaosPath.x5}%`, `${dot.x}%`],
                        top: [`${dot.y}%`, `${dot.chaosPath.y1}%`, `${dot.chaosPath.y2}%`, `${dot.chaosPath.y3}%`, `${dot.chaosPath.y4}%`, `${dot.chaosPath.y5}%`, `${dot.y}%`],
                        scale: [1, dot.chaosPath.scale1, dot.chaosPath.scale2, dot.chaosPath.scale3, dot.chaosPath.scale4, dot.chaosPath.scale5, 1],
                      }
                }
                transition={
                  isAnimating
                    ? {
                        duration: 6,
                        delay: dot.delay + (dot.id % 30) * 0.03,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }
                    : {
                        duration: dot.chaosPath.duration,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: dot.delay,
                      }
                }
              />
            ))}
            
            {/* Processing indicator */}
            {isAnimating && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-2xl font-bold text-accent/60 tracking-widest">
                  SYNTHESIZING...
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* ================================================================== */}
      {/* CARDS LAYER - The organized state */}
      {/* ================================================================== */}
      <AnimatePresence>
        {showCards && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-8 pt-40">
              <div className="w-full max-w-6xl grid lg:grid-cols-3 gap-6">
                
                {/* LEFT COLUMN - Conviction Score + Metrics */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.7 }}
                >
                  {/* Conviction Score Card */}
                  <div className="p-5 rounded-xl border border-accent/20 bg-surface-900/80 backdrop-blur-sm relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'radial-gradient(circle at 30% 50%, rgba(48, 107, 255, 0.15) 0%, transparent 70%)',
                      }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-content-tertiary">Conviction Score</span>
                        <div className="flex items-center gap-1 text-positive text-xs">
                          <ArrowUpRight className="w-3 h-3" />
                          +12%
                        </div>
                      </div>
                      <motion.div 
                        className="text-4xl font-bold text-accent mb-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {CONVICTION_SCORE}%
                      </motion.div>
                      <div className="h-2 bg-surface-800 rounded-full overflow-hidden relative">
                        <motion.div 
                          className="h-full rounded-full relative"
                          style={{
                            background: 'linear-gradient(90deg, #306BFF, #306BFF)',
                            boxShadow: '0 0 12px rgba(48, 107, 255, 0.4)',
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${CONVICTION_SCORE}%` }}
                          transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Risk Level', value: RISK_LEVEL, trend: 'Stable', positive: true },
                      { label: 'Time to Insight', value: TIME_TO_INSIGHT, trend: '-87%', positive: true },
                    ].map((metric, i) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                        className="p-3 rounded-lg border border-border/50 bg-surface-900/60"
                      >
                        <div className="text-xs text-content-tertiary mb-1">{metric.label}</div>
                        <div className="text-lg font-semibold text-content-primary">{metric.value}</div>
                        <div className={`text-xs ${metric.positive ? 'text-positive' : 'text-negative'}`}>
                          {metric.trend}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Thesis Tracker */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="p-4 rounded-xl border border-positive/20 bg-positive/5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-positive" />
                      <span className="text-sm font-medium text-content-primary">{THESIS_DATA.title}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-positive">{THESIS_DATA.status}</span>
                      <span className="text-content-tertiary">{THESIS_DATA.supportingEvidence} supporting</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* CENTER COLUMN - Intelligence Network */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                  className="p-5 rounded-xl border border-border bg-surface-900/60 backdrop-blur-sm relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-content-primary">Intelligence Network</span>
                      <motion.div 
                        className="flex items-center gap-1.5 text-xs text-accent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        <Filter className="w-3 h-3" />
                        <span>AI Mapped</span>
                      </motion.div>
                    </div>
                    
                    {/* Network Graph */}
                    <div className="relative h-64">
                      <svg className="absolute inset-0 w-full h-full">
                        <defs>
                          <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#306BFF" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="#306BFF" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#306BFF" stopOpacity="0.2" />
                          </linearGradient>
                        </defs>
                        {/* Edges */}
                        {NETWORK_EDGES.map(([from, to], i) => {
                          const fromNode = NETWORK_NODES.find(n => n.id === from)
                          const toNode = NETWORK_NODES.find(n => n.id === to)
                          if (!fromNode || !toNode) return null
                          return (
                            <motion.line
                              key={`edge-${i}`}
                              x1={`${fromNode.x}%`}
                              y1={`${fromNode.y}%`}
                              x2={`${toNode.x}%`}
                              y2={`${toNode.y}%`}
                              stroke="url(#edgeGradient)"
                              strokeWidth="1"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 0.5 }}
                              transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                            />
                          )
                        })}
                      </svg>
                      
                      {/* Nodes */}
                      {NETWORK_NODES.map((node, i) => (
                        <motion.div
                          key={node.id}
                          className="absolute"
                          style={{ left: `${node.x}%`, top: `${node.y}%` }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
                        >
                          <motion.div
                            className={`
                              -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center
                              ${node.size === 'lg' 
                                ? 'w-14 h-14' 
                                : node.size === 'sm'
                                ? 'w-10 h-10 bg-surface-800 border border-accent/40'
                                : 'w-7 h-7 bg-surface-800 border border-border'}
                            `}
                            style={node.size === 'lg' ? {
                              background: 'linear-gradient(135deg, #306BFF, #6B9FFF)',
                              boxShadow: '0 0 20px rgba(48, 107, 255, 0.3)',
                            } : {}}
                          >
                            <span className={`
                              font-medium
                              ${node.size === 'lg' ? 'text-sm text-surface-900' : 'text-xs text-content-secondary'}
                            `}>{node.label}</span>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Evidence Summary */}
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4">
                          <span className="text-content-tertiary">
                            <CheckCircle2 className="w-3 h-3 inline mr-1 text-positive" />
                            {THESIS_DATA.supportingEvidence} supporting
                          </span>
                          <span className="text-content-tertiary">
                            {THESIS_DATA.counterEvidence} counter
                          </span>
                        </div>
                        <span className="text-accent font-medium">View full thesis</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* RIGHT COLUMN - Portfolio + Summary */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  {/* Portfolio Exposure */}
                  <div className="p-5 rounded-xl border border-border bg-surface-900/80 backdrop-blur-sm relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-content-primary">Portfolio Exposure</span>
                        <PieChart className="w-4 h-4 text-content-tertiary" />
                      </div>
                      
                      {PORTFOLIO_DATA.map((holding, i) => (
                        <motion.div
                          key={holding.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                          className="flex items-center justify-between py-2 border-b border-border/30 last:border-0 relative"
                        >
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 -z-10"
                            initial={{ width: 0 }}
                            animate={{ width: `${holding.allocation}%` }}
                            transition={{ delay: 0.7 + i * 0.1, duration: 0.8 }}
                            style={{
                              background: 'linear-gradient(90deg, rgba(48, 107, 255, 0.08) 0%, transparent 100%)',
                            }}
                          />
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-content-primary">{holding.name}</span>
                            <span className={`text-xs ${holding.change >= 0 ? 'text-positive' : 'text-negative'}`}>
                              {holding.change >= 0 ? '+' : ''}{holding.change}%
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-content-secondary">{holding.allocation}%</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              holding.conviction === 'High' 
                                ? 'bg-positive/10 text-positive' 
                                : 'bg-warning/10 text-warning'
                            }`}>
                              {holding.conviction}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* AI Summary Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="p-4 rounded-xl border border-accent/30 bg-accent/5 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute -right-4 -top-4 w-24 h-24 rounded-full"
                      animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        background: 'radial-gradient(circle, rgba(48, 107, 255, 0.3) 0%, transparent 70%)',
                      }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-start gap-3">
                        <motion.div 
                          className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <Zap className="w-4 h-4 text-accent" />
                        </motion.div>
                        <div>
                          <div className="text-sm font-medium text-content-primary mb-1">AI Summary</div>
                          <p className="text-xs text-content-secondary leading-relaxed">
                            NVDA remains conviction high with strong AI infrastructure tailwinds. 
                            Consider increasing allocation to 20% on pullbacks. 
                            <span className="text-accent ml-1">24 sources cited</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Action Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                    className="w-full py-3 rounded-lg bg-accent text-surface-900 font-medium text-sm hover:bg-accent-light transition-colors flex items-center justify-center gap-2 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">View Full Analysis</span>
                    <ArrowUpRight className="w-4 h-4 relative z-10" />
                  </motion.button>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* ================================================================== */}
      {/* STATE INDICATOR */}
      {/* ================================================================== */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-surface-900/80 backdrop-blur-sm"
        >
          <div className={`w-2 h-2 rounded-full ${showCards ? 'bg-positive' : 'bg-accent animate-pulse'}`} />
          <span className="text-sm text-content-secondary">
            {showCards ? 'Conviction Achieved' : isAnimating ? 'Synthesizing...' : 'Analyzing Data'}
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export default NoiseToConvictionHero
