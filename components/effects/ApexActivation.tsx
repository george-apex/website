'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════
// APEX ACTIVATION — INSTITUTIONAL TERMINAL TRANSITION
// ═══════════════════════════════════════════════════════════════════════════
// Premium financial terminal transition for entering the A.L.I.C.E. workspace.
// 
// Design Philosophy:
// - Entering a live institutional intelligence terminal
// - Structured data assembling with precision
// - High-performance financial research environment
// - Chaos resolving into clarity and conviction
// 
// Visual Language:
// - Dark charcoal / navy depth
// - Controlled cyan / electric blue / white accents
// - Terminal-inspired modular panels
// - Elegant financial interface elements
// 
// Animation Sequence (~2400ms):
// 1. CLICK ACKNOWLEDGEMENT (0-300ms): Button responds, interface acknowledges
// 2. TERMINAL SWEEP (300-1200ms): Dark overlay sweeps, data elements appear
// 3. SYSTEM ASSEMBLY (1200-2000ms): Panels align, traces draw, geometry sharpens
// 4. WORKSPACE REVEAL (2000-2400ms): Clean emergence of A.L.I.C.E. workspace
// ═══════════════════════════════════════════════════════════════════════════

interface ApexActivationProps {
  isActive: boolean
  originPoint: { x: number; y: number } | null
  onComplete: () => void
}

// Premium easing curves - precise and institutional
const EASE = {
  smooth: [0.22, 1, 0.36, 1] as const,
  crisp: [0.16, 1, 0.3, 1] as const,
  precise: [0.25, 0.46, 0.45, 0.94] as const,
  institutional: [0.4, 0, 0.2, 1] as const,
}

// Animation timing constants (in seconds)
const TIMING = {
  total: 1500, // Total animation duration in ms - matches when visuals complete
  phase1End: 0.3, // Click acknowledgement ends
  phase2Start: 0.2, // Terminal sweep starts
  phase2End: 1.2, // Terminal sweep ends
  phase3End: 2.0, // System assembly ends
  revealStart: 1.0, // Reveal transition starts
}

// ─────────────────────────────────────────────────────────────────────────────
// FINANCIAL DATA ELEMENTS - Institutional terminal content
// ─────────────────────────────────────────────────────────────────────────────

const TERMINAL_DATA = {
  tickers: ['UST10Y', 'SPX', 'DXY', 'EURUSD', 'GBPUSD', 'XAU', 'CRUDE', 'VIX', 'FTSE', 'NIKKEI'],
  prices: ['98.42', '5,234.18', '104.32', '1.0842', '1.2631', '2,341.50', '78.42', '14.23', '7,842.50', '38,421.00'],
  changes: ['+2.3bps', '-0.12%', '+0.08%', '-0.15%', '+0.22%', '+0.45%', '-1.2%', '+0.8%', '+0.35%', '-0.42%'],
  metrics: ['Sharpe: 1.87', 'Vol: 12.4%', 'Beta: 1.02', 'Alpha: 2.1%', 'Info: 0.94'],
  signals: ['CONFIDENCE: 0.94', 'SIGNAL: STRONG', 'RISK: MODERATE', 'THESIS: INTACT'],
  labels: ['Entry', 'Target', 'Stop', 'Size', 'Duration'],
  status: ['ACTIVE', 'PENDING', 'MONITORING', 'COMPLETE'],
}

// ─────────────────────────────────────────────────────────────────────────────
// CLICK ACKNOWLEDGEMENT - Button response and interface acknowledgment
// ─────────────────────────────────────────────────────────────────────────────

function ClickAcknowledgement({ origin }: { origin: { x: number; y: number } }) {
  return (
    <>
      {/* Primary pulse ring */}
      <motion.div
        className="fixed pointer-events-none z-[80]"
        style={{ left: origin.x, top: origin.y }}
        initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 2.5],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.6,
          ease: EASE.crisp
        }}
      >
        <div className="w-16 h-16 rounded-full border-2 border-cyan-400/70" />
      </motion.div>
      
      {/* Secondary pulse */}
      <motion.div
        className="fixed pointer-events-none z-[80]"
        style={{ left: origin.x, top: origin.y }}
        initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.5, 3.5],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: EASE.crisp
        }}
      >
        <div className="w-16 h-16 rounded-full border border-cyan-400/40" />
      </motion.div>
      
      {/* Tertiary pulse */}
      <motion.div
        className="fixed pointer-events-none z-[80]"
        style={{ left: origin.x, top: origin.y }}
        initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 2, 4.5],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 1.0,
          delay: 0.2,
          ease: EASE.crisp
        }}
      >
        <div className="w-16 h-16 rounded-full border border-cyan-400/20" />
      </motion.div>
      
      {/* Center acknowledgment point */}
      <motion.div
        className="fixed pointer-events-none z-[81]"
        style={{ left: origin.x, top: origin.y }}
        initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.4,
          ease: EASE.crisp
        }}
      >
        <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
      </motion.div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TERMINAL OVERLAY - Dark sweep layer
// ─────────────────────────────────────────────────────────────────────────────

function TerminalOverlay({ delay }: { delay: number }) {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[50]"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 1.3,
        delay,
        times: [0, 0.1, 0.75, 1],
        ease: EASE.smooth
      }}
    >
      {/* Base charcoal */}
      <div className="absolute inset-0 bg-[#0a0c10]" />
      
      {/* Navy depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] via-[#0a0c10] to-[#080a0e]" />
      
      {/* Subtle radial depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(30,58,95,0.08)_0%,transparent_70%)]" />
      
      {/* Fine noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// WATCHLIST PANEL - Terminal-style watchlist rows
// ─────────────────────────────────────────────────────────────────────────────

function WatchlistPanel({ delay, side }: { delay: number; side: 'left' | 'right' }) {
  const rows = Array.from({ length: 5 }).map((_, i) => ({
    ticker: TERMINAL_DATA.tickers[i + (side === 'left' ? 0 : 4)],
    price: TERMINAL_DATA.prices[i + (side === 'left' ? 0 : 4)],
    change: TERMINAL_DATA.changes[i + (side === 'left' ? 0 : 4)],
    isPositive: !TERMINAL_DATA.changes[i + (side === 'left' ? 0 : 4)].startsWith('-'),
  }))

  return (
    <motion.div
      className={`fixed top-1/4 ${side === 'left' ? 'left-8' : 'right-8'} w-48 pointer-events-none z-[55]`}
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      animate={{ opacity: [0, 0, 0.95, 0.95, 0], x: side === 'left' ? [-30, 0, 0, 0] : [30, 0, 0, 0] }}
      transition={{
        duration: 1.1,
        delay,
        times: [0, 0.15, 0.3, 0.7, 1],
        ease: EASE.smooth
      }}
    >
      {/* Panel header */}
      <div className="flex items-center gap-2 mb-3 px-2">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
        <span className="text-[9px] font-medium text-slate-400 tracking-wider uppercase">
          {side === 'left' ? 'Rates' : 'Crosses'}
        </span>
      </div>
      
      {/* Watchlist rows */}
      <div className="space-y-1.5 font-mono">
        {rows.map((row, i) => (
          <motion.div
            key={i}
            className="flex items-center justify-between py-1.5 px-2 rounded bg-white/[0.02] border border-white/[0.03]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0, 1, 1, 0], y: [10, 0, 0, 0] }}
            transition={{
              duration: 1.0,
              delay: delay + 0.15 + i * 0.08,
              times: [0, 0.25, 0.4, 0.7, 1],
            }}
          >
            <span className="text-[11px] text-white/80 font-medium">{row.ticker}</span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-white/60">{row.price}</span>
              <span className={`text-[10px] ${row.isPositive ? 'text-emerald-400/80' : 'text-rose-400/80'}`}>
                {row.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHART FRAGMENT - Mini chart with drawing trace
// ─────────────────────────────────────────────────────────────────────────────

function ChartFragment({ delay, position }: { delay: number; position: 'top' | 'bottom' }) {
  // Generate chart path points
  const points = Array.from({ length: 12 }).map((_, i) => ({
    x: i * 8,
    y: 15 + Math.sin(i * 0.8) * 12 + (position === 'top' ? 0 : 5),
  }))
  
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <motion.div
      className={`fixed ${position === 'top' ? 'top-[18%] left-1/3' : 'bottom-[22%] right-1/4'} w-36 h-24 pointer-events-none z-[54]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 0.9, 0.9, 0] }}
      transition={{
        duration: 1.0,
        delay,
        times: [0, 0.2, 0.35, 0.7, 1],
      }}
    >
      {/* Chart panel */}
      <div className="relative w-full h-full bg-white/[0.02] rounded border border-white/[0.04] overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0">
          {[0.25, 0.5, 0.75].map((ratio, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-[1px] bg-white/[0.03]"
              style={{ top: `${ratio * 100}%` }}
            />
          ))}
          {[0.33, 0.66].map((ratio, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-[1px] bg-white/[0.03]"
              style={{ left: `${ratio * 100}%` }}
            />
          ))}
        </div>
        
        {/* Chart trace */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 96 40" preserveAspectRatio="none">
          <motion.path
            d={pathD}
            fill="none"
            stroke="rgba(56, 189, 248, 0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 0.9, 0.9] }}
            transition={{
              duration: 0.8,
              delay: delay + 0.3,
              ease: EASE.precise
            }}
          />
        </svg>
        
        {/* Axis labels */}
        <div className="absolute bottom-0.5 left-1 text-[7px] text-white/30 font-mono">0</div>
        <div className="absolute bottom-0.5 right-1 text-[7px] text-white/30 font-mono">12m</div>
        <div className="absolute top-0.5 left-1 text-[7px] text-cyan-400/50 font-mono">P</div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// METRIC PANEL - Signal and confidence metrics
// ─────────────────────────────────────────────────────────────────────────────

function MetricPanel({ delay }: { delay: number }) {
  const metrics = [
    { label: 'CONFIDENCE', value: '0.94', status: 'high' },
    { label: 'SIGNAL', value: 'STRONG BUY', status: 'positive' },
    { label: 'RISK', value: 'MODERATE', status: 'neutral' },
  ]

  return (
    <motion.div
      className="fixed top-[38%] right-[15%] w-40 pointer-events-none z-[56]"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: [0, 0, 0.95, 0.95, 0], y: [15, 0, 0, 0] }}
      transition={{
        duration: 1.0,
        delay,
        times: [0, 0.2, 0.35, 0.7, 1],
      }}
    >
      {/* Panel container */}
      <div className="space-y-2">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            className="flex items-center justify-between py-2 px-3 bg-white/[0.02] rounded border border-white/[0.04]"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: [0, 0, 1, 1, 0], x: [15, 0, 0, 0] }}
            transition={{
              duration: 0.9,
              delay: delay + 0.2 + i * 0.1,
              times: [0, 0.25, 0.4, 0.7, 1],
            }}
          >
            <span className="text-[9px] text-slate-500 tracking-wider uppercase">{metric.label}</span>
            <span className={`text-[11px] font-medium font-mono ${
              metric.status === 'high' ? 'text-cyan-400' :
              metric.status === 'positive' ? 'text-emerald-400' :
              'text-amber-400/80'
            }`}>
              {metric.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GRID GEOMETRY - Terminal grid lines
// ─────────────────────────────────────────────────────────────────────────────

function GridGeometry({ delay }: { delay: number }) {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[51]"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.7, 0.5, 0] }}
      transition={{
        duration: 1.1,
        delay,
        times: [0, 0.3, 0.65, 1],
      }}
    >
      {/* Vertical grid lines */}
      <div className="absolute inset-0 flex justify-between">
        {[0.1, 0.3, 0.5, 0.7, 0.9].map((pos, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"
            style={{ left: `${pos * 100}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 0.6, 0.4, 0] }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.05,
              times: [0, 0.35, 0.65, 1],
            }}
          />
        ))}
      </div>
      
      {/* Horizontal grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[0.15, 0.35, 0.65, 0.85].map((pos, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
            style={{ top: `${pos * 100}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 0.5, 0.3, 0] }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.05,
              times: [0, 0.35, 0.65, 1],
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// STATUS BAR - Terminal status indicator
// ─────────────────────────────────────────────────────────────────────────────

function StatusBar({ delay }: { delay: number }) {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-[58]"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: [0, 0, 0.9, 0.9, 0], y: [15, 0, 0, 0] }}
      transition={{
        duration: 1.1,
        delay,
        times: [0, 0.15, 0.3, 0.7, 1],
      }}
    >
      <div className="flex items-center gap-4 px-5 py-2.5 bg-white/[0.03] rounded-full border border-white/[0.06]">
        {/* Status indicator */}
        <motion.div
          className="w-2 h-2 rounded-full bg-cyan-400"
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            delay: delay + 0.3,
            repeat: 2,
          }}
        />
        
        {/* Status text */}
        <span className="text-[11px] text-slate-400 font-medium tracking-wide">
          INITIALIZING WORKSPACE
        </span>
        
        {/* Progress dots */}
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-cyan-400/60"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 0.6,
                delay: delay + 0.2 + i * 0.15,
                repeat: 3,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// THESIS INDICATOR - Portfolio/thesis fragment
// ─────────────────────────────────────────────────────────────────────────────

function ThesisIndicator({ delay }: { delay: number }) {
  return (
    <motion.div
      className="fixed bottom-[30%] left-[12%] w-52 pointer-events-none z-[55]"
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: [0, 0, 0.9, 0.9, 0], x: [-25, 0, 0, 0] }}
      transition={{
        duration: 1.0,
        delay,
        times: [0, 0.15, 0.28, 0.75, 1],
      }}
    >
      <div className="bg-white/[0.02] rounded border border-white/[0.04] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.04]">
          <span className="text-[9px] text-slate-500 tracking-wider uppercase">Active Thesis</span>
          <span className="text-[8px] text-cyan-400/70 font-mono">ID: 4821</span>
        </div>
        
        {/* Content */}
        <div className="px-3 py-2.5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/70">Duration</span>
            <span className="text-[10px] text-white/50 font-mono">6-12m</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/70">Conviction</span>
            <div className="flex items-center gap-1">
              <div className="w-16 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-400/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: ['0%', '82%'] }}
                  transition={{
                    duration: 0.8,
                    delay: delay + 0.5,
                    ease: EASE.smooth
                  }}
                />
              </div>
              <span className="text-[9px] text-cyan-400/70 font-mono">0.82</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// NODE MAP - Intelligence node visualization
// ─────────────────────────────────────────────────────────────────────────────

function NodeMap({ delay }: { delay: number }) {
  const nodes = [
    { x: 20, y: 30, size: 3, label: 'α' },
    { x: 45, y: 25, size: 4, label: 'β' },
    { x: 70, y: 35, size: 3, label: 'γ' },
    { x: 35, y: 50, size: 3.5, label: 'δ' },
    { x: 60, y: 55, size: 3, label: 'ε' },
  ]

  return (
    <motion.div
      className="fixed top-[55%] left-[35%] w-48 h-32 pointer-events-none z-[53]"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0, 0.8, 0.8, 0] }}
      transition={{
        duration: 1.0,
        delay,
        times: [0, 0.18, 0.32, 0.75, 1],
      }}
    >
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {/* α to β */}
        <motion.line
          x1="20%" y1="30%" x2="45%" y2="25%"
          stroke="rgba(56,189,248,0.2)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.5] }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
        />
        {/* β to γ */}
        <motion.line
          x1="45%" y1="25%" x2="70%" y2="35%"
          stroke="rgba(56,189,248,0.2)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.5] }}
          transition={{ duration: 0.6, delay: delay + 0.5 }}
        />
        {/* δ to ε */}
        <motion.line
          x1="35%" y1="50%" x2="60%" y2="55%"
          stroke="rgba(56,189,248,0.2)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.5] }}
          transition={{ duration: 0.6, delay: delay + 0.55 }}
        />
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/60 border border-cyan-400/40 flex items-center justify-center"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size * 3,
            height: node.size * 3,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1], opacity: [0, 0.9, 0.9] }}
          transition={{
            duration: 0.5,
            delay: delay + 0.3 + i * 0.08,
            ease: EASE.crisp
          }}
        >
          <span className="text-[7px] text-cyan-400 font-mono">{node.label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// REVEAL TRANSITION - Clean workspace emergence
// ─────────────────────────────────────────────────────────────────────────────

function RevealTransition({ delay }: { delay: number }) {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[52]"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{
        duration: 0.5,
        delay,
        times: [0, 0.4, 1],
        ease: EASE.smooth
      }}
    >
      {/* Center reveal gradient */}
      <motion.div
        className="absolute inset-0 bg-[#0a0c10]"
        initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        animate={{ 
          clipPath: [
            'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)'
          ]
        }}
        transition={{
          duration: 0.6,
          delay: delay + 0.1,
          ease: EASE.institutional
        }}
      />
    </motion.div>
  )
}

// ┐═════════════════════════════════════════════════════════════════════════
// MAIN ACTIVATION COMPONENT
// ┐═════════════════════════════════════════════════════════════════════════

export function ApexActivation({ isActive, originPoint, onComplete }: ApexActivationProps) {
  const [elapsed, setElapsed] = React.useState(0)
  const [phase, setPhase] = React.useState('')

  React.useEffect(() => {
    if (!isActive) {
      setElapsed(0)
      setPhase('')
      return
    }

    const startTime = Date.now()
    
    const interval = setInterval(() => {
      const now = Date.now()
      const ms = now - startTime
      setElapsed(ms)
      
      if (ms < 300) setPhase('Phase 1: Click Acknowledgement')
      else if (ms < 1000) setPhase('Phase 2: Terminal Sweep')
      else if (ms < 1400) setPhase('Phase 3: System Assembly')
      else if (ms < 1500) setPhase('Phase 4: Workspace Reveal')
      else setPhase('Complete - Opening Modal')
    }, 16)

    const timer = setTimeout(() => {
      setPhase('Complete - Opening Modal')
      onComplete()
      clearInterval(interval)
    }, TIMING.total)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [isActive, onComplete])

  if (!isActive || !originPoint) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[50]">
      {/* DEBUG TIMER OVERLAY */}
      <div className="fixed top-4 left-4 z-[100] pointer-events-auto bg-black/90 text-white font-mono text-sm px-4 py-3 rounded-lg border border-cyan-400/50">
        <div className="text-cyan-400 text-xs mb-1">DEBUG TIMER</div>
        <div className="text-xl font-bold">{elapsed}ms</div>
        <div className="text-yellow-400 text-xs mt-1">{phase}</div>
        <div className="text-white/50 text-[10px] mt-2">
          Modal opens at: 1500ms
        </div>
      </div>
      
      {/* Phase 1: Click Acknowledgement (0-300ms) */}
      <ClickAcknowledgement origin={originPoint} />
      
      {/* Phase 2: Terminal Sweep (300-1200ms) */}
      <TerminalOverlay delay={TIMING.phase2Start} />
      <GridGeometry delay={0.25} />
      
      {/* Terminal Data Elements */}
      <WatchlistPanel delay={0.35} side="left" />
      <WatchlistPanel delay={0.4} side="right" />
      <ChartFragment delay={0.45} position="top" />
      <ChartFragment delay={0.5} position="bottom" />
      <MetricPanel delay={0.4} />
      <ThesisIndicator delay={0.45} />
      <NodeMap delay={0.35} />
      <StatusBar delay={0.3} />
      
      {/* Phase 3 & 4: Assembly & Reveal (1200-2400ms) */}
      <RevealTransition delay={TIMING.revealStart} />
    </div>
  )
}

// ┐═════════════════════════════════════════════════════════════════════════
// BUTTON WRAPPER - Wraps the Try Agent button with activation
// ┐═════════════════════════════════════════════════════════════════════════

interface ApexButtonProps {
  children: React.ReactNode
  onClick: () => void
  isHovered: boolean
  className?: string
}

export function ApexActivationButton({ children, onClick, isHovered, className }: ApexButtonProps) {
  const [isActivating, setIsActivating] = React.useState(false)
  const [originPoint, setOriginPoint] = React.useState<{ x: number; y: number } | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOriginPoint({ x: e.clientX, y: e.clientY })
    setIsActivating(true)
  }

  const handleComplete = () => {
    setIsActivating(false)
    onClick()
  }

  return (
    <>
      <motion.button
        onClick={handleClick}
        className={className}
        disabled={isActivating}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.button>
      
      <AnimatePresence>
        {isActivating && originPoint && (
          <ApexActivation
            isActive={isActivating}
            originPoint={originPoint}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default ApexActivation
