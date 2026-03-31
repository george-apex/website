'use client'

import * as React from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  Target, 
  Activity, 
  Zap, 
  PieChart,
  ArrowUpRight,
  CheckCircle2,
  Filter,
  Cpu,
  Network,
  Sparkles
} from 'lucide-react'

// =============================================================================
// CHAOS DATA - Overwhelming, fragmented financial information IN YOUR FACE
// =============================================================================

const chaosFragments = [
  // Large prominent tickers - CENTER STAGE
  { id: 'c1', type: 'ticker', content: 'NVDA +2.4%', x: 8, y: 18, rotate: -12, size: 'xl' },
  { id: 'c2', type: 'ticker', content: 'AAPL -0.8%', x: 72, y: 15, rotate: 15, size: 'xl' },
  { id: 'c3', type: 'ticker', content: 'MSFT ???', x: 40, y: 8, rotate: -8, size: 'lg' },
  { id: 'c4', type: 'ticker', content: 'TSLA +5.2%', x: 82, y: 40, rotate: 22, size: 'lg' },
  { id: 'c5', type: 'ticker', content: 'GOOGL...', x: 18, y: 72, rotate: -18, size: 'lg' },
  { id: 'c22', type: 'ticker', content: 'META +1.1%', x: 12, y: 48, rotate: 10, size: 'xl' },
  { id: 'c26', type: 'ticker', content: 'AMZN ???', x: 68, y: 78, rotate: -14, size: 'lg' },
  { id: 'c27', type: 'ticker', content: 'AMD -2.1%', x: 48, y: 35, rotate: 8, size: 'xl' },
  
  // Large numbers - BOLD
  { id: 'c6', type: 'number', content: '$2.4B', x: 52, y: 25, rotate: 6, size: 'xl' },
  { id: 'c7', type: 'number', content: '15.7x', x: 28, y: 55, rotate: -20, size: 'lg' },
  { id: 'c8', type: 'number', content: '-3.2%', x: 75, y: 62, rotate: 12, size: 'xl' },
  { id: 'c9', type: 'number', content: '47 TABS', x: 5, y: 38, rotate: -5, size: 'xl' },
  { id: 'c10', type: 'number', content: '???bp', x: 62, y: 88, rotate: 14, size: 'lg' },
  { id: 'c23', type: 'number', content: '847 DOCS', x: 88, y: 55, rotate: -12, size: 'xl' },
  { id: 'c28', type: 'number', content: '-18.5%', x: 35, y: 82, rotate: 18, size: 'lg' },
  
  // Research snippets - LONGER, MORE VISIBLE
  { id: 'c11', type: 'snippet', content: 'revenue growth concerns...', x: 15, y: 28, rotate: -8, size: 'md' },
  { id: 'c12', type: 'snippet', content: 'competitive landscape...', x: 78, y: 22, rotate: 5, size: 'md' },
  { id: 'c13', type: 'snippet', content: 'margin pressure...', x: 3, y: 65, rotate: -12, size: 'lg' },
  { id: 'c14', type: 'snippet', content: 'market share erosion...', x: 45, y: 92, rotate: 9, size: 'md' },
  { id: 'c15', type: 'snippet', content: 'execution risk...', x: 88, y: 72, rotate: -3, size: 'lg' },
  { id: 'c24', type: 'snippet', content: 'regulatory concerns...', x: 55, y: 15, rotate: 4, size: 'md' },
  { id: 'c29', type: 'snippet', content: 'downgrade risk...', x: 22, y: 85, rotate: -16, size: 'md' },
  
  // ALERT SIGNALS - BIG AND SCARY
  { id: 'c16', type: 'signal', content: '⚠ Signal #1', x: 32, y: 22, rotate: 4, size: 'xl' },
  { id: 'c17', type: 'signal', content: '⚠ Signal #2', x: 65, y: 48, rotate: -9, size: 'xl' },
  { id: 'c18', type: 'signal', content: '⚠ Signal ???', x: 18, y: 78, rotate: 14, size: 'lg' },
  { id: 'c25', type: 'signal', content: '🚨 ALERT', x: 42, y: 45, rotate: -11, size: 'xl' },
  { id: 'c30', type: 'signal', content: '⚠ WARNING', x: 78, y: 32, rotate: 7, size: 'xl' },
  
  // Notes - SCATTERED
  { id: 'c19', type: 'note', content: 'Note: check...', x: 58, y: 52, rotate: -6, size: 'md' },
  { id: 'c20', type: 'note', content: 'TODO: review...', x: 72, y: 28, rotate: 11, size: 'md' },
  { id: 'c21', type: 'note', content: '???', x: 45, y: 68, rotate: -10, size: 'lg' },
]

// Chaos particles generator
const generateChaosParticles = () => Array.from({ length: 120 }, (_, i) => ({
  id: `p${i}`,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 6,
  duration: 2 + Math.random() * 4,
  delay: Math.random() * 2,
  animX: Math.random() * 200 - 100,
  animY: Math.random() * 200 - 100,
}))

// Disconnected lines generator
const generateDisconnectedLines = () => Array.from({ length: 25 }, (_, i) => ({
  id: `l${i}`,
  x1: Math.random() * 100,
  y1: Math.random() * 100,
  x2: Math.random() * 100,
  y2: Math.random() * 100,
  delay: Math.random() * 2,
}))

// Chaos fragments animation offsets generator
const generateChaosAnimationOffsets = () => chaosFragments.map(() => ({
  x: Math.random() * 40 - 20,
  y: Math.random() * 40 - 20,
  rotateOffset: Math.random() * 20 - 10,
  duration: 3 + Math.random() * 4,
}))

// =============================================================================
// CLARITY DATA - Structured intelligence outputs
// =============================================================================

const clarityMetrics = [
  { label: 'Conviction Score', value: '94%', trend: '+12%', positive: true },
  { label: 'Risk Level', value: 'Moderate', trend: 'Stable', positive: true },
  { label: 'Time to Insight', value: '3.2s', trend: '-87%', positive: true },
  { label: 'Data Sources', value: '12', trend: 'Unified', positive: true },
]

const portfolioData = [
  { name: 'NVDA', allocation: 18.5, change: 2.4, conviction: 'High' },
  { name: 'AAPL', allocation: 14.2, change: -0.8, conviction: 'Medium' },
  { name: 'MSFT', allocation: 12.8, change: 1.2, conviction: 'High' },
  { name: 'GOOGL', allocation: 10.5, change: 0.5, conviction: 'Medium' },
]

const thesisData = {
  title: 'AI Infrastructure Play',
  status: 'On Track',
  confidence: 94,
  supportingEvidence: 24,
  counterEvidence: 3,
}

// Graph nodes for intelligence network
const networkNodes = [
  { id: 'center', x: 50, y: 50, label: 'NVDA', size: 'lg' },
  { id: 'n1', x: 25, y: 30, label: 'AMD', size: 'sm' },
  { id: 'n2', x: 75, y: 25, label: 'TSM', size: 'sm' },
  { id: 'n3', x: 20, y: 65, label: 'AVGO', size: 'sm' },
  { id: 'n4', x: 80, y: 70, label: 'MU', size: 'sm' },
  { id: 'n5', x: 50, y: 20, label: 'SMCI', size: 'xs' },
  { id: 'n6', x: 50, y: 80, label: 'ARM', size: 'xs' },
]

const networkEdges = [
  ['center', 'n1'], ['center', 'n2'], ['center', 'n3'], 
  ['center', 'n4'], ['center', 'n5'], ['center', 'n6'],
  ['n1', 'n2'], ['n3', 'n4'], ['n1', 'n5'], ['n2', 'n5'],
]

// =============================================================================
// TRANSFORMATION MAPPING - Where chaos elements go during reconfiguration
// =============================================================================

// Map chaos fragments to clarity panel destinations
const fragmentDestinations: Record<string, { targetX: number; targetY: number; panel: string }> = {
  // Tickers move toward portfolio panel (right side)
  'c1': { targetX: 75, targetY: 35, panel: 'portfolio' },
  'c2': { targetX: 75, targetY: 40, panel: 'portfolio' },
  'c3': { targetX: 75, targetY: 45, panel: 'portfolio' },
  'c4': { targetX: 85, targetY: 55, panel: 'portfolio' },
  'c5': { targetX: 75, targetY: 50, panel: 'portfolio' },
  'c22': { targetX: 80, targetY: 30, panel: 'portfolio' },
  'c26': { targetX: 85, targetY: 60, panel: 'portfolio' },
  'c27': { targetX: 50, targetY: 50, panel: 'network' },
  
  // Numbers move toward metrics panel (left side)
  'c6': { targetX: 20, targetY: 35, panel: 'metrics' },
  'c7': { targetX: 25, targetY: 55, panel: 'metrics' },
  'c8': { targetX: 25, targetY: 65, panel: 'metrics' },
  'c9': { targetX: 15, targetY: 25, panel: 'metrics' },
  'c10': { targetX: 25, targetY: 75, panel: 'metrics' },
  'c23': { targetX: 20, targetY: 45, panel: 'metrics' },
  'c28': { targetX: 25, targetY: 70, panel: 'metrics' },
  
  // Snippets compress toward center then vanish
  'c11': { targetX: 50, targetY: 50, panel: 'center' },
  'c12': { targetX: 50, targetY: 50, panel: 'center' },
  'c13': { targetX: 50, targetY: 50, panel: 'center' },
  'c14': { targetX: 50, targetY: 50, panel: 'center' },
  'c15': { targetX: 50, targetY: 50, panel: 'center' },
  'c24': { targetX: 50, targetY: 50, panel: 'center' },
  'c29': { targetX: 50, targetY: 50, panel: 'center' },
  
  // Signals transform into conviction indicators
  'c16': { targetX: 20, targetY: 30, panel: 'metrics' },
  'c17': { targetX: 50, targetY: 50, panel: 'network' },
  'c18': { targetX: 50, targetY: 50, panel: 'center' },
  'c25': { targetX: 50, targetY: 50, panel: 'center' },
  'c30': { targetX: 50, targetY: 50, panel: 'center' },
  
  // Notes vanish into center
  'c19': { targetX: 50, targetY: 50, panel: 'center' },
  'c20': { targetX: 50, targetY: 50, panel: 'center' },
  'c21': { targetX: 50, targetY: 50, panel: 'center' },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function HeroTransformation() {
  const [isTransformed, setIsTransformed] = React.useState(false)
  const [isHovering, setIsHovering] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const [isTransitioning, setIsTransitioning] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  // Client-side only random data
  const [chaosParticles, setChaosParticles] = React.useState<Array<{
    id: string;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    animX: number;
    animY: number;
  }>>([])
  const [disconnectedLines, setDisconnectedLines] = React.useState<Array<{
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    delay: number;
  }>>([])
  const [chaosAnimationOffsets, setChaosAnimationOffsets] = React.useState<Array<{
    x: number;
    y: number;
    rotateOffset: number;
    duration: number;
  }>>([])
  const [filterParticles, setFilterParticles] = React.useState<Array<{
    id: number;
    left: number;
    top: number;
    duration: number;
    delay: number;
    repeatDelay: number;
  }>>([])
  
  // Generate random data only on client after mount
  React.useEffect(() => {
    setChaosParticles(generateChaosParticles())
    setDisconnectedLines(generateDisconnectedLines())
    setChaosAnimationOffsets(generateChaosAnimationOffsets())
    setFilterParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: 2 + Math.random() * 1,
      repeatDelay: 3 + Math.random() * 2,
    })))
    setIsMounted(true)
  }, [])
  
  // Mouse position for subtle parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Main transformation progress - staged spring animation
  const transformProgress = useSpring(0, { stiffness: 60, damping: 20, mass: 1.5 })
  
  // Phase-specific progress values for layered transformation
  const phase1Progress = useTransform(transformProgress, [0, 0.35], [0, 1])    // Compression
  const phase2Progress = useTransform(transformProgress, [0.35, 0.7], [0, 1])  // Assembly
  const phase3Progress = useTransform(transformProgress, [0.7, 1], [0, 1])     // Resolution
  
  // Handle mouse move
  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x * 20)
    mouseY.set(y * 20)
  }, [mouseX, mouseY])
  
  // Track transition direction
  const [transitionDirection, setTransitionDirection] = React.useState<'toClarity' | 'toChaos' | null>(null)

  // Toggle transformation
  const toggleTransform = React.useCallback(() => {
    setTransitionDirection(isTransformed ? 'toChaos' : 'toClarity')
    setIsTransitioning(true)
    setIsTransformed(prev => !prev)
    setTimeout(() => {
      setIsTransitioning(false)
      setTransitionDirection(null)
    }, 3000)
  }, [isTransformed])
  
  // Update spring when state changes
  React.useEffect(() => {
    transformProgress.set(isTransformed ? 1 : 0)
  }, [isTransformed, transformProgress])
  
  // Auto-transform after delay on first view
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionDirection('toClarity')
      setIsTransitioning(true)
      setIsTransformed(true)
      setTimeout(() => {
        setIsTransitioning(false)
        setTransitionDirection(null)
      }, 3000)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-surface-950"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900 to-surface-950" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(48,107,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(48,107,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* ================================================================== */}
      {/* INTELLIGENT ASSEMBLY LAYER - The computational transformation */}
      {/* ================================================================== */}
      <motion.div className="absolute inset-0 z-[4] pointer-events-none">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            {/* Gradients */}
            <linearGradient id="assemblyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#306BFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#306BFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#306BFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="dataFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#306BFF" stopOpacity="0" />
              <stop offset="30%" stopColor="#306BFF" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#306BFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#306BFF" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="processingCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#306BFF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#306BFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#306BFF" stopOpacity="0" />
            </radialGradient>
            <filter id="assemblyGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* ========== PROCESSING CORE - Central intelligence hub ========== */}
          <motion.g>
            {/* Outer processing ring */}
            <motion.circle
              cx="50%"
              cy="50%"
              r="180"
              fill="none"
              stroke="#306BFF"
              strokeWidth="0.5"
              strokeDasharray="4 8"
              style={{
                opacity: useTransform(phase1Progress, [0, 0.5, 1], [0, 0.6, 0]),
                rotate: useTransform(phase1Progress, [0, 1], [0, 180])
              }}
            />
            {/* Middle processing ring */}
            <motion.circle
              cx="50%"
              cy="50%"
              r="140"
              fill="none"
              stroke="#306BFF"
              strokeWidth="0.5"
              strokeDasharray="2 6"
              style={{
                opacity: useTransform(phase1Progress, [0.1, 0.6, 1], [0, 0.5, 0]),
                rotate: useTransform(phase1Progress, [0, 1], [0, -120])
              }}
            />
            {/* Inner processing ring */}
            <motion.circle
              cx="50%"
              cy="50%"
              r="100"
              fill="none"
              stroke="url(#assemblyGradient)"
              strokeWidth="1"
              style={{
                opacity: useTransform(phase1Progress, [0.2, 0.7, 1], [0, 0.7, 0]),
                scale: useTransform(phase1Progress, [0.2, 0.7], [0.8, 1.1])
              }}
            />
            {/* Core glow */}
            <motion.circle
              cx="50%"
              cy="50%"
              r="60"
              fill="url(#processingCore)"
              style={{
                opacity: useTransform(phase1Progress, [0.3, 0.8, 1], [0, 0.8, 0]),
                scale: useTransform(phase1Progress, [0.3, 0.8], [0.5, 1.2])
              }}
            />
          </motion.g>

          {/* ========== CLASSIFICATION BEAMS - Scanning lines ========== */}
          {[0, 45, 90, 135].map((angle, i) => (
            <motion.line
              key={`scan-beam-${i}`}
              x1="50%"
              y1="50%"
              x2={`${50 + Math.cos((angle * Math.PI) / 180) * 45}%`}
              y2={`${50 + Math.sin((angle * Math.PI) / 180) * 45}%`}
              stroke="#306BFF"
              strokeWidth="1"
              strokeLinecap="round"
              filter="url(#assemblyGlow)"
              style={{
                opacity: useTransform(phase1Progress, [0.2 + i * 0.05, 0.5 + i * 0.05, 1], [0, 0.8, 0]),
                pathLength: useTransform(phase1Progress, [0.2 + i * 0.05, 0.6 + i * 0.05], [0, 1])
              }}
            />
          ))}

          {/* ========== DATA STREAM PIPES - Connection pathways ========== */}
          {[
            { from: { x: 17.5, y: 50 }, to: { x: 37, y: 50 }, delay: 0 },
            { from: { x: 82.5, y: 50 }, to: { x: 63, y: 50 }, delay: 0.1 },
            { from: { x: 50, y: 50 }, to: { x: 50, y: 35 }, delay: 0.05 },
          ].map((pipe, i) => (
            <motion.g key={`data-pipe-${i}`}>
              {/* Pipe outline */}
              <motion.line
                x1={`${pipe.from.x}%`}
                y1={`${pipe.from.y}%`}
                x2={`${pipe.to.x}%`}
                y2={`${pipe.to.y}%`}
                stroke="rgba(48, 107, 255, 0.2)"
                strokeWidth="20"
                strokeLinecap="round"
                style={{
                  opacity: useTransform(phase2Progress, [0.1 + pipe.delay, 0.4 + pipe.delay], [0, 0.3])
                }}
              />
              {/* Data flow particles */}
              {[0, 0.33, 0.66].map((offset, j) => (
                <motion.circle
                  key={`flow-${i}-${j}`}
                  r="3"
                  fill="#306BFF"
                  filter="url(#assemblyGlow)"
                  style={{
                    x: useTransform(
                      phase2Progress,
                      [0.1 + pipe.delay + offset * 0.2, 0.5 + pipe.delay + offset * 0.2],
                      [`${pipe.from.x}%`, `${pipe.to.x}%`]
                    ),
                    y: useTransform(
                      phase2Progress,
                      [0.1 + pipe.delay + offset * 0.2, 0.5 + pipe.delay + offset * 0.2],
                      [`${pipe.from.y}%`, `${pipe.to.y}%`]
                    ),
                    opacity: useTransform(
                      phase2Progress,
                      [0.1 + pipe.delay + offset * 0.2, 0.3 + pipe.delay + offset * 0.2, 0.6 + pipe.delay],
                      [0, 1, 0]
                    ),
                    scale: useTransform(
                      phase2Progress,
                      [0.1 + pipe.delay + offset * 0.2, 0.3 + pipe.delay + offset * 0.2],
                      [0.5, 1]
                    )
                  }}
                />
              ))}
            </motion.g>
          ))}

          {/* ========== PANEL FORMATION GRID ========== */}
          {/* Left panel grid */}
          <motion.rect
            x="5%"
            y="25%"
            width="25%"
            height="50%"
            fill="none"
            stroke="url(#assemblyGradient)"
            strokeWidth="1"
            rx="12"
            filter="url(#assemblyGlow)"
            style={{
              opacity: useTransform(phase2Progress, [0.05, 0.3, 0.7, 1], [0, 0.6, 0.3, 0]),
              scale: useTransform(phase2Progress, [0.05, 0.35], [0.9, 1.02])
            }}
          />
          {/* Center panel grid */}
          <motion.rect
            x="37%"
            y="20%"
            width="26%"
            height="60%"
            fill="none"
            stroke="url(#assemblyGradient)"
            strokeWidth="1"
            rx="12"
            filter="url(#assemblyGlow)"
            style={{
              opacity: useTransform(phase2Progress, [0.1, 0.35, 0.75, 1], [0, 0.6, 0.3, 0]),
              scale: useTransform(phase2Progress, [0.1, 0.4], [0.9, 1.02])
            }}
          />
          {/* Right panel grid */}
          <motion.rect
            x="70%"
            y="25%"
            width="25%"
            height="50%"
            fill="none"
            stroke="url(#assemblyGradient)"
            strokeWidth="1"
            rx="12"
            filter="url(#assemblyGlow)"
            style={{
              opacity: useTransform(phase2Progress, [0.15, 0.4, 0.8, 1], [0, 0.6, 0.3, 0]),
              scale: useTransform(phase2Progress, [0.15, 0.45], [0.9, 1.02])
            }}
          />

          {/* ========== NEURAL NETWORK FORMATION ========== */}
          {networkEdges.map(([from, to], i) => {
            const fromNode = networkNodes.find(n => n.id === from)
            const toNode = networkNodes.find(n => n.id === to)
            if (!fromNode || !toNode) return null
            return (
              <motion.line
                key={`neural-edge-${i}`}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke="url(#dataFlowGradient)"
                strokeWidth="1"
                strokeLinecap="round"
                style={{
                  pathLength: useTransform(phase2Progress, [0.3 + i * 0.02, 0.6 + i * 0.02], [0, 1]),
                  opacity: useTransform(phase2Progress, [0.3 + i * 0.02, 0.7 + i * 0.02, 1], [0, 0.6, 0])
                }}
              />
            )
          })}
        </svg>

        {/* ========== PROCESSING STATUS INDICATORS ========== */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="absolute top-[45%] left-1/2 -translate-x-1/2 text-center z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/30 backdrop-blur-sm"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(48, 107, 255, 0.2)',
                    '0 0 40px rgba(48, 107, 255, 0.4)',
                    '0 0 20px rgba(48, 107, 255, 0.2)',
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Cpu className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-sm font-medium text-accent">
                  {transitionDirection === 'toClarity' ? 'Assembling Intelligence...' : 'Disassembling...'}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========== ORBITAL ASSEMBLY PARTICLES ========== */}
        {isMounted && chaosParticles.slice(0, 30).map((particle, i) => {
          const angle = (i / 30) * Math.PI * 2
          const orbitRadius = 100 + (i % 3) * 40
          const centerX = 50
          const centerY = 50
          
          return (
            <motion.div
              key={`orbital-particle-${particle.id}`}
              className="absolute rounded-full"
              style={{
                width: 3 + (i % 3),
                height: 3 + (i % 3),
                background: i % 2 === 0 ? 'rgba(48, 107, 255, 0.8)' : 'rgba(48, 107, 255, 0.8)',
                boxShadow: `0 0 ${4 + (i % 4)}px ${i % 2 === 0 ? 'rgba(48, 107, 255, 0.5)' : 'rgba(48, 107, 255, 0.5)'}`,
              }}
              initial={{ 
                x: `${particle.x}%`,
                y: `${particle.y}%`,
                scale: 0,
                opacity: 0
              }}
              animate={
                isTransformed
                  ? {
                      x: [
                        `${particle.x}%`,
                        `${centerX + Math.cos(angle) * orbitRadius / 5}%`,
                        `${centerX + Math.cos(angle + Math.PI) * 20}%`
                      ],
                      y: [
                        `${particle.y}%`,
                        `${centerY + Math.sin(angle) * orbitRadius / 5}%`,
                        `${centerY + Math.sin(angle + Math.PI) * 20}%`
                      ],
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }
                  : {
                      x: `${particle.x}%`,
                      y: `${particle.y}%`,
                      scale: 0,
                      opacity: 0
                    }
              }
              transition={
                isTransformed
                  ? {
                      duration: 2,
                      delay: 0.2 + i * 0.03,
                      ease: [0.4, 0, 0.2, 1],
                    }
                  : {
                      duration: 0.3,
                      delay: i * 0.01,
                    }
              }
            />
          )
        })}

        {/* ========== SIGNAL EXTRACTION BEAMS ========== */}
        <motion.div
          className="absolute left-1/2 top-0 w-px h-full -translate-x-1/2"
          style={{
            opacity: useTransform(phase1Progress, [0.1, 0.4, 0.8], [0, 0.3, 0])
          }}
        >
          <motion.div
            className="w-full h-20 bg-gradient-to-b from-transparent via-accent/50 to-transparent"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2"
          style={{
            opacity: useTransform(phase1Progress, [0.15, 0.45, 0.85], [0, 0.3, 0])
          }}
        >
          <motion.div
            className="h-full w-20 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* ========== DATA CLASSIFICATION TAGS ========== */}
        <AnimatePresence>
          {isTransitioning && (
            <>
              {['ANALYZING', 'CLASSIFYING', 'STRUCTURING'].map((label, i) => (
                <motion.div
                  key={`tag-${i}`}
                  className={`absolute px-3 py-1.5 rounded text-xs font-medium border backdrop-blur-sm ${
                    i === 0 ? 'top-[30%] left-[20%]' :
                    i === 1 ? 'top-[50%] right-[20%]' :
                    'bottom-[35%] left-1/2 -translate-x-1/2'
                  }`}
                  style={{
                    background: 'rgba(48, 107, 255, 0.1)',
                    borderColor: 'rgba(48, 107, 255, 0.3)',
                    color: '#306BFF'
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8], y: 0 }}
                  transition={{
                    duration: 2,
                    delay: 0.3 + i * 0.4,
                    ease: 'easeOut'
                  }}
                >
                  {label}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ================================================================== */}
      {/* CHAOS LAYER - OVERWHELMING, IN YOUR FACE fragmented information */}
      {/* Visible in CHAOS mode AND during transition to show transformation */}
      {/* ================================================================== */}
      <motion.div
        className="absolute inset-0 z-[5]"
        style={{ opacity: useTransform(transformProgress, [0, 0.25], [1, 0]) }}
      >
        {/* Floating noise particles - visible in chaos AND during transition */}
        {isMounted && chaosParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: `rgba(231, 76, 60, ${0.2 + Math.random() * 0.3})`,
            }}
            animate={
              isTransitioning
                ? {
                    x: [0, particle.animX * 0.5, particle.animX],
                    y: [0, particle.animY * 0.5, particle.animY],
                    opacity: [0.5, 0.3, 0],
                    scale: [1, 0.8, 0],
                  }
                : !isTransformed
                ? {
                    x: [0, particle.animX, 0],
                    y: [0, particle.animY, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }
                : {}
            }
            transition={
              isTransitioning
                ? { duration: 2, delay: particle.delay * 0.5, ease: [0.4, 0, 0.2, 1] }
                : { duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        ))}

        {/* Disconnected lines - visible during transition */}
        <svg className="absolute inset-0 w-full h-full opacity-60">
          {isMounted && disconnectedLines.map((line) => (
            <motion.line
              key={line.id}
              x1={`${line.x1}%`}
              y1={`${line.y1}%`}
              x2={`${line.x2}%`}
              y2={`${line.y2}%`}
              stroke="#E74C3C"
              strokeWidth="2"
              strokeDasharray="8 6"
              initial={{ opacity: 0.3 }}
              animate={
                isTransitioning
                  ? { opacity: [0.5, 0.3, 0], strokeDashoffset: [0, 15, 30] }
                  : !isTransformed
                  ? { opacity: [0.3, 0.8, 0.3], strokeDashoffset: [0, 30] }
                  : {}
              }
              transition={
                isTransitioning
                  ? { duration: 2, delay: line.delay * 0.5, ease: [0.4, 0, 0.2, 1] }
                  : { duration: 2, delay: line.delay, repeat: Infinity }
              }
            />
          ))}
        </svg>

        {/* Chaos fragments with transformation behavior */}
        {/* These are the KEY transformation elements - visible during transition */}
        {chaosFragments.map((fragment, i) => {
          const destination = fragmentDestinations[fragment.id]
          const targetX = destination ? destination.targetX : 50
          const targetY = destination ? destination.targetY : 50
          
          return (
            <motion.div
              key={fragment.id}
              className="absolute pointer-events-none"
              style={{
                left: `${fragment.x}%`,
                top: `${fragment.y}%`,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isTransitioning && transitionDirection === 'toClarity'
                  ? {
                      // ASSEMBLING: Fragments move toward their destinations and fade
                      x: [0, (targetX - fragment.x) * 1.5, (targetX - fragment.x) * 3],
                      y: [0, (targetY - fragment.y) * 1.5, (targetY - fragment.y) * 3],
                      rotate: [fragment.rotate, 0, destination?.panel === 'center' ? 0 : 0],
                      scale: [1, 0.7, 0],
                      opacity: [1, 0.6, 0],
                    }
                  : isTransitioning && transitionDirection === 'toChaos'
                  ? {
                      // DISASSEMBLING: Fragments appear from destinations and scatter
                      x: [-(targetX - fragment.x) * 2, -(targetX - fragment.x) * 0.5, 0],
                      y: [-(targetY - fragment.y) * 2, -(targetY - fragment.y) * 0.5, 0],
                      rotate: [0, fragment.rotate * 0.5, fragment.rotate],
                      scale: [0, 0.8, 1],
                      opacity: [0, 0.7, 1],
                    }
                  : !isTransformed
                  ? {
                      // CHAOS MODE: Fragments float and shake
                      opacity: [0.7, 1, 0.7],
                      scale: [1, 1.08, 1],
                      x: isMounted && chaosAnimationOffsets[i] ? [0, chaosAnimationOffsets[i].x, 0] : 0,
                      y: isMounted && chaosAnimationOffsets[i] ? [0, chaosAnimationOffsets[i].y, 0] : 0,
                      rotate: isMounted && chaosAnimationOffsets[i] 
                        ? [fragment.rotate, fragment.rotate + chaosAnimationOffsets[i].rotateOffset, fragment.rotate]
                        : fragment.rotate,
                    }
                  : {
                      // CLARITY MODE: Hidden
                      opacity: 0,
                      scale: 0,
                    }
              }
              transition={
                isTransitioning
                  ? {
                      duration: 2.2,
                      delay: i * 0.03,
                      ease: [0.4, 0, 0.2, 1],
                    }
                  : {
                      duration: isMounted && chaosAnimationOffsets[i] ? chaosAnimationOffsets[i].duration : 3,
                      delay: i * 0.05,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
            >
              <div className={`
                px-4 py-2 rounded-lg whitespace-nowrap font-bold shadow-lg
                ${fragment.size === 'xl' ? 'text-xl md:text-2xl px-6 py-3' : 
                  fragment.size === 'lg' ? 'text-lg md:text-xl px-5 py-2.5' : 
                  'text-base md:text-lg px-4 py-2'}
                ${fragment.type === 'ticker' ? 'text-negative bg-negative/20 border-2 border-negative/50 shadow-negative/20' :
                  fragment.type === 'number' ? 'text-warning bg-warning/20 border-2 border-warning/50 shadow-warning/20' :
                  fragment.type === 'snippet' ? 'text-content-secondary bg-surface-800/80 border-2 border-border/60' :
                  fragment.type === 'signal' ? 'text-accent bg-accent/20 border-2 border-accent/50 shadow-data/20 animate-pulse' :
                  'text-content-tertiary bg-surface-700/50 border border-border/40'}
                shadow-xl
              `}>
                {fragment.content}
              </div>
            </motion.div>
          )
        })}

        {/* Central chaos indicator */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10"
          animate={
            isTransitioning && transitionDirection === 'toClarity'
              ? { opacity: [0.7, 0.3, 0], scale: [1, 0.8, 0.5] }
              : isTransitioning && transitionDirection === 'toChaos'
              ? { opacity: [0, 0.5, 0.9], scale: [0.5, 0.8, 1] }
              : isTransformed
              ? { opacity: 0, scale: 0.5 }
              : { 
                  opacity: [0.5, 0.9, 0.5],
                  scale: [1, 1.1, 1],
                }
          }
          transition={
            isTransitioning
              ? { duration: 2, ease: [0.4, 0, 0.2, 1] }
              : { duration: 2, repeat: Infinity }
          }
        >
          <div className="text-8xl md:text-9xl font-bold text-negative/40 mb-4">?</div>
          <div className="text-xl md:text-2xl text-negative/60 font-bold tracking-widest uppercase">HOURS OF RESEARCH</div>
        </motion.div>

        {/* Warning badges - visible during transition */}
        <AnimatePresence>
          {(!isTransformed || isTransitioning) && (
            <>
              <motion.div
                className="absolute top-[12%] left-[5%] flex items-center gap-3 px-5 py-3 rounded-xl bg-negative/20 border-2 border-negative/50 shadow-lg shadow-negative/20"
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isTransitioning && transitionDirection === 'toClarity'
                    ? { opacity: [0.8, 0.4, 0], x: [0, 10, 30], scale: [1, 0.9, 0.7] }
                    : isTransitioning && transitionDirection === 'toChaos'
                    ? { opacity: [0, 0.5, 0.8], x: [-20, -5, 0], scale: [0.7, 0.9, 1] }
                    : { x: [0, 10, 0], opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }
                }
                transition={
                  isTransitioning
                    ? { duration: 2, ease: [0.4, 0, 0.2, 1] }
                    : { duration: 2, repeat: Infinity }
                }
              >
                <div className="w-3 h-3 rounded-full bg-negative animate-pulse" />
                <span className="text-lg font-bold text-negative">47 browser tabs</span>
              </motion.div>

              <motion.div
                className="absolute top-[18%] right-[5%] flex items-center gap-3 px-5 py-3 rounded-xl bg-warning/20 border-2 border-warning/50 shadow-lg shadow-warning/20"
                initial={{ opacity: 0, x: 20 }}
                animate={
                  isTransitioning && transitionDirection === 'toClarity'
                    ? { opacity: [0.8, 0.4, 0], x: [0, -10, -30], scale: [1, 0.9, 0.7] }
                    : isTransitioning && transitionDirection === 'toChaos'
                    ? { opacity: [0, 0.5, 0.8], x: [20, 5, 0], scale: [0.7, 0.9, 1] }
                    : { x: [0, -10, 0], opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }
                }
                transition={
                  isTransitioning
                    ? { duration: 2, delay: 0.1, ease: [0.4, 0, 0.2, 1] }
                    : { duration: 2.5, repeat: Infinity, delay: 0.3 }
                }
              >
                <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
                <span className="text-lg font-bold text-warning">847 documents</span>
              </motion.div>

              <motion.div
                className="absolute bottom-[15%] left-[8%] flex items-center gap-3 px-5 py-3 rounded-xl bg-accent/20 border-2 border-accent/50 shadow-lg shadow-data/20"
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isTransitioning && transitionDirection === 'toClarity'
                    ? { opacity: [0.8, 0.4, 0], x: [0, 8, 25], scale: [1, 0.9, 0.7] }
                    : isTransitioning && transitionDirection === 'toChaos'
                    ? { opacity: [0, 0.5, 0.8], x: [-20, -5, 0], scale: [0.7, 0.9, 1] }
                    : { x: [0, 8, 0], opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }
                }
                transition={
                  isTransitioning
                    ? { duration: 2, delay: 0.2, ease: [0.4, 0, 0.2, 1] }
                    : { duration: 2.2, repeat: Infinity, delay: 0.6 }
                }
              >
                <Activity className="w-5 h-5 text-accent animate-pulse" />
                <span className="text-lg font-bold text-accent">12 data sources</span>
              </motion.div>

              <motion.div
                className="absolute bottom-[22%] right-[5%] flex items-center gap-3 px-5 py-3 rounded-xl bg-negative/20 border-2 border-negative/50 shadow-lg shadow-negative/20"
                initial={{ opacity: 0, x: 20 }}
                animate={
                  isTransitioning && transitionDirection === 'toClarity'
                    ? { opacity: [0.8, 0.4, 0], x: [0, -8, -25], scale: [1, 0.9, 0.7] }
                    : isTransitioning && transitionDirection === 'toChaos'
                    ? { opacity: [0, 0.5, 0.8], x: [20, 5, 0], scale: [0.7, 0.9, 1] }
                    : { x: [0, -8, 0], opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }
                }
                transition={
                  isTransitioning
                    ? { duration: 2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }
                    : { duration: 2.8, repeat: Infinity, delay: 0.9 }
                }
              >
                <div className="w-3 h-3 rounded-full bg-negative animate-pulse" />
                <span className="text-lg font-bold text-negative">Signal lost in noise</span>
              </motion.div>

              <motion.div
                className="absolute top-[35%] left-[3%] flex items-center gap-2 px-4 py-2 rounded-lg bg-negative/30 border border-negative/60"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isTransitioning && transitionDirection === 'toClarity'
                    ? { opacity: [0.8, 0.4, 0], y: [0, -15, -40], scale: [1, 0.9, 0.7] }
                    : isTransitioning && transitionDirection === 'toChaos'
                    ? { opacity: [0, 0.5, 0.8], y: [20, 5, 0], scale: [0.7, 0.9, 1] }
                    : { y: [0, -15, 0], opacity: [0.6, 1, 0.6] }
                }
                transition={
                  isTransitioning
                    ? { duration: 2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }
                    : { duration: 3, repeat: Infinity, delay: 1.2 }
                }
              >
                <span className="text-base font-bold text-negative">Drowning in data?</span>
              </motion.div>

              <motion.div
                className="absolute top-[45%] right-[3%] flex items-center gap-2 px-4 py-2 rounded-lg bg-warning/30 border border-warning/60"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isTransitioning && transitionDirection === 'toClarity'
                    ? { opacity: [0.8, 0.4, 0], y: [0, -15, -40], scale: [1, 0.9, 0.7] }
                    : isTransitioning && transitionDirection === 'toChaos'
                    ? { opacity: [0, 0.5, 0.8], y: [20, 5, 0], scale: [0.7, 0.9, 1] }
                    : { y: [0, -15, 0], opacity: [0.6, 1, 0.6] }
                }
                transition={
                  isTransitioning
                    ? { duration: 2, delay: 0.5, ease: [0.4, 0, 0.2, 1] }
                    : { duration: 3.5, repeat: Infinity, delay: 1.5 }
                }
              >
                <span className="text-base font-bold text-warning">Manual synthesis?</span>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Chaos Trajectory Lines - visible during transition */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="chaosTrajectory" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E74C3C" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#E74C3C" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#E74C3C" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[
            'M 5,80 Q 20,60 35,75 T 65,40 T 95,50',
            'M 5,85 Q 30,90 45,70 T 80,55 T 95,30',
            'M 10,90 Q 40,95 55,80 T 75,60 T 90,45',
          ].map((d, i) => (
            <motion.path
              key={`chaos-traj-${i}`}
              d={d}
              fill="none"
              stroke="url(#chaosTrajectory)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isTransitioning && transitionDirection === 'toClarity'
                  ? { pathLength: [1, 0.5, 0], opacity: [0.6, 0.3, 0] }
                  : isTransitioning && transitionDirection === 'toChaos'
                  ? { pathLength: [0, 0.5, 1], opacity: [0, 0.3, 0.6] }
                  : !isTransformed
                  ? { pathLength: 1, opacity: 0.6 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={
                isTransitioning
                  ? { duration: 2, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }
                  : { duration: 2 + i * 0.5, delay: i * 0.3, repeat: Infinity, repeatType: 'reverse' }
              }
            />
          ))}
        </svg>
      </motion.div>

      {/* ================================================================== */}
      {/* CLARITY LAYER - Structured, decision-ready intelligence */}
      {/* ================================================================== */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ opacity: useTransform(transformProgress, [0.6, 0.85], [0, 1]) }}
      >
        {/* Clarity Trajectory Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="clarityTrajectory" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#306BFF" stopOpacity="0.1" />
              <stop offset="40%" stopColor="#306BFF" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#306BFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#306BFF" stopOpacity="0.2" />
            </linearGradient>
            <filter id="trajectoryGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d="M 2,95 Q 15,85 30,70 T 50,45 T 70,25 T 98,5"
            fill="none"
            stroke="url(#clarityTrajectory)"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#trajectoryGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: isTransformed ? 1 : 0, opacity: isTransformed ? 0.8 : 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          />
          <motion.circle
            cx="50%"
            cy="45%"
            r="4"
            fill="#306BFF"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isTransformed ? 1 : 0, opacity: isTransformed ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          />
          <motion.circle
            cx="50%"
            cy="45%"
            r="12"
            fill="none"
            stroke="#306BFF"
            strokeWidth="1"
            strokeOpacity="0.3"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isTransformed ? 1 : 0, opacity: isTransformed ? 0.3 : 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="w-full max-w-6xl grid lg:grid-cols-3 gap-6">
            
            {/* Left Panel - Conviction Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateY: -15 }}
              animate={{ 
                opacity: isTransformed ? 1 : 0, 
                y: isTransformed ? 0 : 30,
                rotateY: isTransformed ? 0 : -15,
              }}
              transition={{ 
                delay: 1.5, 
                duration: 0.7, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              className="space-y-4"
            >
              {/* Conviction Score Card */}
              <div className="p-5 rounded-xl border border-accent/20 bg-surface-900/80 backdrop-blur-sm relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 opacity-0"
                  animate={{ opacity: isTransformed ? 0.03 : 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                  style={{
                    background: 'radial-gradient(circle at 30% 50%, rgba(48, 107, 255, 0.3) 0%, transparent 70%)',
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
                  <div className="text-4xl font-bold text-accent mb-3">94%</div>
                  <div className="h-2 bg-surface-800 rounded-full overflow-hidden relative">
                    <motion.div 
                      className="h-full rounded-full relative"
                      style={{
                        background: 'linear-gradient(90deg, #306BFF, #306BFF)',
                        boxShadow: '0 0 12px rgba(48, 107, 255, 0.4)',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: isTransformed ? '94%' : 0 }}
                      transition={{ delay: 1.9, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, delay: 2.5 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                {clarityMetrics.slice(1).map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{ 
                      opacity: isTransformed ? 1 : 0, 
                      scale: isTransformed ? 1 : 0.85,
                      y: isTransformed ? 0 : 15
                    }}
                    transition={{ 
                      delay: 1.7 + i * 0.08, 
                      duration: 0.5, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
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
                animate={{ opacity: isTransformed ? 1 : 0, y: isTransformed ? 0 : 15 }}
                transition={{ delay: 1.9, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="p-4 rounded-xl border border-positive/20 bg-positive/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-positive" />
                  <span className="text-sm font-medium text-content-primary">{thesisData.title}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-positive">{thesisData.status}</span>
                  <span className="text-content-tertiary">{thesisData.supportingEvidence} supporting</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Center Panel - Intelligence Graph */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: isTransformed ? 1 : 0, scale: isTransformed ? 1 : 0.92 }}
              transition={{ delay: 1.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="p-5 rounded-xl border border-border bg-surface-900/60 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Signal filtering effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {isMounted && filterParticles.map((particle) => (
                  <motion.div
                    key={`filter-particle-${particle.id}`}
                    className="absolute w-1 h-1 rounded-full bg-accent/30"
                    style={{
                      left: `${particle.left}%`,
                      top: `${particle.top}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isTransformed ? {
                      opacity: [0, 0.6, 0],
                      scale: [0, 1, 0],
                      y: [0, -30],
                    } : {}}
                    transition={{
                      duration: particle.duration,
                      delay: particle.delay,
                      repeat: Infinity,
                      repeatDelay: particle.repeatDelay,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-content-primary">Intelligence Network</span>
                  <motion.div 
                    className="flex items-center gap-1.5 text-xs text-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isTransformed ? 1 : 0 }}
                    transition={{ delay: 2.2 }}
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
                      <filter id="nodeGlow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Edges with animated reveal */}
                    {networkEdges.map(([from, to], i) => {
                      const fromNode = networkNodes.find(n => n.id === from)
                      const toNode = networkNodes.find(n => n.id === to)
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
                          animate={{ 
                            pathLength: isTransformed ? 1 : 0, 
                            opacity: isTransformed ? 0.5 : 0 
                          }}
                          transition={{ 
                            delay: 1.6 + i * 0.04, 
                            duration: 0.6, 
                            ease: 'easeOut' 
                          }}
                        />
                      )
                    })}
                  </svg>
                  
                  {/* Nodes with spring animation */}
                  {networkNodes.map((node, i) => (
                    <motion.div
                      key={node.id}
                      className="absolute"
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: isTransformed ? 1 : 0, opacity: isTransformed ? 1 : 0 }}
                      transition={{ 
                        delay: 1.5 + i * 0.06, 
                        type: 'spring', 
                        stiffness: 260, 
                        damping: 20 
                      }}
                    >
                      <motion.div
                        className={`
                          -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center relative
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
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className={`
                          font-medium
                          ${node.size === 'lg' ? 'text-sm text-surface-900' : 'text-xs text-content-secondary'}
                        `}>{node.label}</span>
                        {node.size === 'lg' && (
                          <motion.div
                            className="absolute inset-0 rounded-full border border-accent/30"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
                          />
                        )}
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
                        {thesisData.supportingEvidence} supporting
                      </span>
                      <span className="text-content-tertiary">
                        {thesisData.counterEvidence} counter
                      </span>
                    </div>
                    <span className="text-accent font-medium">View full thesis</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Portfolio Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateY: 15 }}
              animate={{ 
                opacity: isTransformed ? 1 : 0, 
                y: isTransformed ? 0 : 30,
                rotateY: isTransformed ? 0 : 15,
              }}
              transition={{ delay: 1.55, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-4"
            >
              {/* Portfolio Allocation */}
              <div className="p-5 rounded-xl border border-border bg-surface-900/80 backdrop-blur-sm relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 opacity-0"
                  animate={{ opacity: isTransformed ? 0.02 : 0 }}
                  transition={{ duration: 0.8, delay: 1.7 }}
                  style={{
                    background: 'radial-gradient(circle at 70% 30%, rgba(48, 107, 255, 0.2) 0%, transparent 50%)',
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-content-primary">Portfolio Exposure</span>
                    <PieChart className="w-4 h-4 text-content-tertiary" />
                  </div>
                  
                  {portfolioData.map((holding, i) => (
                    <motion.div
                      key={holding.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: isTransformed ? 1 : 0, x: isTransformed ? 0 : 20 }}
                      transition={{ delay: 1.75 + i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="flex items-center justify-between py-2 border-b border-border/30 last:border-0 relative"
                    >
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 -z-10"
                        initial={{ width: 0 }}
                        animate={{ width: isTransformed ? `${holding.allocation}%` : 0 }}
                        transition={{ delay: 1.9 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                        style={{
                          background: 'linear-gradient(90deg, rgba(48, 107, 255, 0.05) 0%, transparent 100%)',
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
                animate={{ opacity: isTransformed ? 1 : 0, y: isTransformed ? 0 : 15 }}
                transition={{ delay: 2, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="p-4 rounded-xl border border-accent/30 bg-accent/5 relative overflow-hidden"
              >
                <motion.div
                  className="absolute -right-4 -top-4 w-24 h-24 rounded-full"
                  animate={{ 
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.1, 1],
                  }}
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
                      transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
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
                animate={{ opacity: isTransformed ? 1 : 0, y: isTransformed ? 0 : 10 }}
                transition={{ delay: 2.1, duration: 0.3 }}
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

      {/* ================================================================== */}
      {/* TRANSFORMATION TRIGGER */}
      {/* ================================================================== */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
        <motion.button
          onClick={toggleTransform}
          className="flex items-center gap-3 px-6 py-3 rounded-full border border-border/50 bg-surface-900/80 backdrop-blur-sm hover:border-accent/50 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm text-content-secondary">
            {isTransformed ? 'See the Process' : 'Experience A.L.I.C.E.'}
          </span>
          <motion.div
            animate={{ rotate: isTransformed ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {isTransformed ? (
              <Network className="w-4 h-4 text-accent" />
            ) : (
              <Sparkles className="w-4 h-4 text-accent" />
            )}
          </motion.div>
        </motion.button>
        
        {/* State indicator */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className={`text-xs ${isTransformed ? 'text-accent' : 'text-content-tertiary'}`}>
            {isTransformed ? 'INSIGHT' : 'RESEARCH'}
          </span>
        </motion.div>
      </div>

      {/* ================================================================== */}
      {/* OVERLAY CONTENT - Hero Text */}
      {/* ================================================================== */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-4"
        >
          <span className="text-sm font-medium tracking-widest text-accent uppercase">
            Research Efficiency
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-content-primary mb-4"
        >
          Hours of Research.
          <span className="text-accent"> Seconds of Insight.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg md:text-xl text-content-secondary max-w-2xl mx-auto"
        >
          The same depth. Fraction of the time.
        </motion.p>
      </div>
    </div>
  )
}

export default HeroTransformation
