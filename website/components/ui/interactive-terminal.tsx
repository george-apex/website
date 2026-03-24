'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Badge } from './badge'

// Types
interface TerminalCommand {
  id: string
  query: string
  response: TerminalResponse
  category?: string
}

interface TerminalResponse {
  type: 'analysis' | 'data' | 'alert' | 'success' | 'comparison'
  title: string
  content: string
  metrics?: {
    label: string
    value: string
    change?: string
    positive?: boolean
  }[]
  actions?: string[]
}

// Sample commands for different financial scenarios
const terminalCommands: TerminalCommand[] = [
  {
    id: 'portfolio-risk',
    query: 'Analyze portfolio risk exposure',
    category: 'Risk',
    response: {
      type: 'analysis',
      title: 'Portfolio Risk Analysis',
      content: 'Multi-factor risk assessment complete',
      metrics: [
        { label: 'Total Exposure', value: '$2.4B' },
        { label: 'VaR (95%)', value: '$48.2M', change: '-12%', positive: true },
        { label: 'Beta', value: '1.23' },
        { label: 'Sharpe Ratio', value: '1.87', change: '+0.24', positive: true },
      ],
      actions: ['Reduce NVDA position by 3%', 'Increase hedge ratio to 15%'],
    },
  },
  {
    id: 'deal-scout',
    query: 'Find comparable M&A transactions',
    category: 'Deals',
    response: {
      type: 'comparison',
      title: 'Comparable Transactions',
      content: '5 similar deals found in target sector',
      metrics: [
        { label: 'Avg EV/EBITDA', value: '12.4x' },
        { label: 'Median Premium', value: '28%' },
        { label: 'Deal Size Range', value: '$500M-$2B' },
        { label: 'Time to Close', value: '127 days' },
      ],
      actions: ['Run sensitivity on 15x multiple', 'Pull buyer universe'],
    },
  },
  {
    id: 'credit-check',
    query: 'Run credit analysis on Acme Corp',
    category: 'Credit',
    response: {
      type: 'alert',
      title: 'Credit Analysis: Acme Corp',
      content: 'Credit metrics indicate moderate risk profile',
      metrics: [
        { label: 'Leverage Ratio', value: '4.2x', change: '+0.8x', positive: false },
        { label: 'Interest Coverage', value: '2.1x', change: '-0.4x', positive: false },
        { label: 'Rating Implied', value: 'BB+' },
        { label: 'Default Prob', value: '2.4%' },
      ],
      actions: ['Flag for covenant review', 'Request updated financials'],
    },
  },
  {
    id: 'market-scan',
    query: 'Scan market for alpha opportunities',
    category: 'Strategy',
    response: {
      type: 'success',
      title: 'Alpha Signal Detection',
      content: '3 high-confidence signals identified',
      metrics: [
        { label: 'Momentum Score', value: '0.84', change: '+0.12', positive: true },
        { label: 'Mean Rev Signal', value: '2.1σ' },
        { label: 'Sentiment Delta', value: '+15%' },
        { label: 'Confidence', value: '92%' },
      ],
      actions: ['Execute sector rotation', 'Hedge with options'],
    },
  },
  {
    id: 'due-diligence',
    query: 'Generate DD checklist for Tech target',
    category: 'IB',
    response: {
      type: 'data',
      title: 'Due Diligence Framework',
      content: 'Technology sector DD template loaded',
      metrics: [
        { label: 'Categories', value: '47' },
        { label: 'Critical Items', value: '12' },
        { label: 'Data Room Items', value: '234' },
        { label: 'Est. Timeline', value: '6 weeks' },
      ],
      actions: ['Export to SharePoint', 'Assign to team members'],
    },
  },
]

// Interactive Terminal Props
export interface InteractiveTerminalProps {
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showControls?: boolean
}

export function InteractiveTerminal({
  className,
  autoPlay = true,
  autoPlayInterval = 6000,
  showControls = true,
}: InteractiveTerminalProps) {
  const [activeCommand, setActiveCommand] = React.useState(0)
  const [phase, setPhase] = React.useState<'typing' | 'processing' | 'response'>('typing')
  const [typedText, setTypedText] = React.useState('')
  const [showMetrics, setShowMetrics] = React.useState(false)
  const [history, setHistory] = React.useState<number[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const currentCmd = terminalCommands[activeCommand]

  // Typing animation
  React.useEffect(() => {
    if (phase !== 'typing') return

    let index = 0
    setTypedText('')
    setShowMetrics(false)

    const timer = setInterval(() => {
      if (index < currentCmd.query.length) {
        setTypedText(currentCmd.query.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        setPhase('processing')
      }
    }, 40)

    return () => clearInterval(timer)
  }, [activeCommand, phase, currentCmd.query])

  // Processing delay
  React.useEffect(() => {
    if (phase !== 'processing') return

    const timer = setTimeout(() => {
      setPhase('response')
      setShowMetrics(true)
    }, 800)

    return () => clearTimeout(timer)
  }, [phase])

  // Auto-play cycle
  React.useEffect(() => {
    if (!autoPlay || phase !== 'response') return

    const timer = setTimeout(() => {
      setHistory((prev) => [...prev.slice(-4), activeCommand])
      setActiveCommand((prev) => (prev + 1) % terminalCommands.length)
      setPhase('typing')
    }, autoPlayInterval)

    return () => clearTimeout(timer)
  }, [autoPlay, autoPlayInterval, phase, activeCommand])

  // Handle manual command selection
  const handleCommandSelect = (index: number) => {
    setHistory((prev) => [...prev.slice(-4), activeCommand])
    setActiveCommand(index)
    setPhase('typing')
    setTypedText('')
    setShowMetrics(false)
  }

  // Get response type styling
  const getResponseStyle = (type: TerminalResponse['type']) => {
    const styles = {
      analysis: 'border-accent/30 bg-accent/5',
      data: 'border-accent/30 bg-accent/5',
      alert: 'border-negative/30 bg-negative/5',
      success: 'border-positive/30 bg-positive/5',
      comparison: 'border-accent/30 bg-accent/5',
    }
    return styles[type]
  }

  return (
    <div className={cn('relative', className)}>
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-accent/10 blur-3xl rounded-3xl opacity-60" />

      {/* Terminal window */}
      <div className="relative bg-surface-900 border border-border rounded-panel overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-surface-800 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-negative/80" />
              <span className="w-3 h-3 rounded-full bg-warning/80" />
              <span className="w-3 h-3 rounded-full bg-positive/80" />
            </div>
            <span className="text-terminal-sm font-mono text-content-tertiary">
              APEXE3 Terminal
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="data" size="sm">
              <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse mr-1" />
              LIVE
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 min-h-[380px]">
          {/* Command categories */}
          {showControls && (
            <div className="flex flex-wrap gap-2 mb-4">
              {terminalCommands.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onClick={() => handleCommandSelect(i)}
                  className={cn(
                    'text-terminal-sm font-mono px-2.5 py-1 rounded transition-all',
                    activeCommand === i
                      ? 'bg-accent/15 text-accent border border-accent/30'
                      : 'bg-surface-700 text-content-tertiary hover:text-content-secondary border border-transparent'
                  )}
                >
                  {cmd.category}
                </button>
              ))}
            </div>
          )}

          {/* Input line */}
          <div className="flex items-center gap-2 font-mono">
            <span className="text-accent">❯</span>
            <span className="text-content-primary">{typedText}</span>
            {phase === 'typing' && (
              <span className="w-2 h-4 bg-accent animate-pulse" />
            )}
          </div>

          {/* Processing indicator */}
          <AnimatePresence>
            {phase === 'processing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-content-tertiary font-mono text-terminal-sm"
              >
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>Analyzing...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Response */}
          <AnimatePresence>
            {phase === 'response' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'rounded-panel border p-4',
                  getResponseStyle(currentCmd.response.type)
                )}
              >
                {/* Response header */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-content-primary">
                    {currentCmd.response.title}
                  </h4>
                  <Badge
                    variant={currentCmd.response.type === 'alert' ? 'negative' : 'data'}
                    size="sm"
                  >
                    {currentCmd.response.type.toUpperCase()}
                  </Badge>
                </div>

                {/* Response content */}
                <p className="text-body-sm text-content-secondary mb-4">
                  {currentCmd.response.content}
                </p>

                {/* Metrics grid */}
                {currentCmd.response.metrics && showMetrics && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 gap-3 mb-4"
                  >
                    {currentCmd.response.metrics.map((metric, i) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="bg-surface-800 rounded p-2.5 border border-border"
                      >
                        <div className="text-terminal-xs text-content-tertiary font-mono">
                          {metric.label}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-medium text-content-primary font-mono">
                            {metric.value}
                          </span>
                          {metric.change && (
                            <span
                              className={cn(
                                'text-terminal-xs font-mono',
                                metric.positive ? 'text-positive' : 'text-negative'
                              )}
                            >
                              {metric.change}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Action suggestions */}
                {currentCmd.response.actions && (
                  <div className="flex flex-wrap gap-2">
                    {currentCmd.response.actions.map((action, i) => (
                      <button
                        key={i}
                        className="text-terminal-sm font-mono px-2.5 py-1 rounded bg-surface-700 text-content-secondary hover:text-accent hover:bg-surface-700/50 transition-colors border border-border"
                      >
                        → {action}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-surface-800 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-4 text-terminal-sm text-content-tertiary font-mono">
            <span>v2.4.1</span>
            <span className="text-border">|</span>
            <span>apex-finance-large</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-terminal-sm text-content-tertiary font-mono">
              Latency: 47ms
            </span>
            <span className="text-terminal-sm text-positive font-mono">
              ● Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveTerminal
