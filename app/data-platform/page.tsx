'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Database, Brain, Shield, Zap, Globe, TrendingUp, 
  Activity, Building2, Leaf, FileText, Lock, Layers,
  Play, ArrowRight, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SubNavigation } from '@/components/layout/SubNavigation'

// Buzzwords marquee
const buzzwords = [
  'REAL-TIME', 'AI-POWERED', 'POINT-IN-TIME', 'ENTERPRISE-GRADE',
  'ZERO-LATENCY', 'INSTITUTIONAL', 'REGULATORY-READY', 'PRIVATE-BY-DESIGN'
]

// Data types with interactive hover
const dataTypes = [
  { icon: Activity, label: 'Market', value: '50+ Exchanges', color: '#22c55e' },
  { icon: Building2, label: 'Fundamentals', value: '100K+ Companies', color: '#3b82f6' },
  { icon: Globe, label: 'Macro', value: '200+ Countries', color: '#a855f7' },
  { icon: TrendingUp, label: 'Sentiment', value: '1M+ Sources', color: '#f59e0b' },
  { icon: Leaf, label: 'ESG', value: '40K+ Issuers', color: '#14b8a6' },
  { icon: FileText, label: 'Documents', value: '10M+ Files', color: '#ec4899' },
]

// AI Agents
const agents = [
  { icon: Globe, label: 'Macro Portfolio', color: '#a855f7' },
  { icon: FileText, label: 'Prospectus AI', color: '#3b82f6' },
  { icon: Lock, label: 'Credit Risk', color: '#ef4444' },
  { icon: Leaf, label: 'ESG Analysis', color: '#22c55e' },
  { icon: Building2, label: 'Earnings', color: '#f59e0b' },
  { icon: Database, label: 'Private Data', color: '#64748b' },
]

// Security features
const securityFeatures = [
  { icon: Lock, label: 'Encrypted' },
  { icon: Shield, label: 'Isolated' },
  { icon: Brain, label: 'No Training' },
  { icon: Layers, label: 'Audited' },
]

// Animated counter
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = React.useState(0)
  
  React.useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return <span className="font-mono">{count.toLocaleString()}{suffix}</span>
}

// Interactive orbital visualization
function OrbitalVisualization() {
  const [activeNode, setActiveNode] = React.useState<number | null>(null)
  const nodes = dataTypes.map((d, i) => ({
    ...d,
    angle: (i * 60 - 90) * (Math.PI / 180),
  }))

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-accent/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Middle ring */}
      <motion.div
        className="absolute inset-8 rounded-full border border-accent/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Center core */}
      <motion.div
        className="absolute inset-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/20 
                   border border-accent/30 flex items-center justify-center"
        animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 30px rgba(var(--accent), 0.2)', '0 0 60px rgba(var(--accent), 0.4)', '0 0 30px rgba(var(--accent), 0.2)'] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Brain className="w-12 h-12 text-accent" />
      </motion.div>

      {/* Orbiting nodes */}
      {nodes.map((node, i) => {
        const x = Math.cos(node.angle) * 140 + 160 - 40
        const y = Math.sin(node.angle) * 140 + 160 - 40
        
        return (
          <motion.div
            key={node.label}
            className="absolute cursor-pointer"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            onMouseEnter={() => setActiveNode(i)}
            onMouseLeave={() => setActiveNode(null)}
          >
            <motion.div
              className="w-20 h-20 rounded-2xl border flex flex-col items-center justify-center gap-1
                         transition-all duration-300 backdrop-blur-xl"
              style={{ 
                borderColor: activeNode === i ? node.color : 'rgba(255,255,255,0.1)',
                backgroundColor: activeNode === i ? `${node.color}20` : 'rgba(15,23,42,0.8)'
              }}
              animate={{ 
                scale: activeNode === i ? 1.15 : 1,
                boxShadow: activeNode === i ? `0 0 30px ${node.color}40` : '0 0 0px transparent'
              }}
            >
              <node.icon className="w-6 h-6" style={{ color: node.color }} />
              <span className="text-xs font-medium text-white">{node.label}</span>
            </motion.div>
            
            {/* Tooltip */}
            <AnimatePresence>
              {activeNode === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 
                             bg-surface-800 border border-border rounded-lg whitespace-nowrap z-50"
                >
                  <span className="text-xs font-mono" style={{ color: node.color }}>{node.value}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node, i) => (
          <motion.line
            key={i}
            x1="160"
            y1="160"
            x2={Math.cos(node.angle) * 140 + 160}
            y2={Math.sin(node.angle) * 140 + 160}
            stroke={activeNode === i ? node.color : 'rgba(255,255,255,0.05)'}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}
      </svg>
    </div>
  )
}

// Pulsing metrics
function PulsingMetric({ label, value, color, delay }: { 
  label: string
  value: string
  color: string
  delay: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="relative p-4 rounded-xl bg-surface-800/60 border border-border/50 text-center
                 hover:border-accent/50 transition-all duration-300 group"
    >
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `radial-gradient(circle at center, ${color}10 0%, transparent 70%)` }}
      />
      <div className="text-2xl font-mono font-bold" style={{ color }}>{value}</div>
      <div className="text-xs text-content-tertiary mt-1">{label}</div>
    </motion.div>
  )
}

// Agent card with glow
function AgentCard({ agent, index }: { agent: typeof agents[0]; index: number }) {
  const [isHovered, setIsHovered] = React.useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-4 rounded-xl bg-surface-800/40 border border-border/30 
                 cursor-pointer transition-all duration-300"
      style={{ borderColor: isHovered ? agent.color : undefined }}
    >
      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{ boxShadow: `0 0 40px ${agent.color}30, inset 0 0 40px ${agent.color}10` }}
      />
      
      <div className="relative flex items-center gap-3">
        <motion.div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${agent.color}20` }}
          animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.4 }}
        >
          <agent.icon className="w-5 h-5" style={{ color: agent.color }} />
        </motion.div>
        <span className="text-sm font-medium text-white">{agent.label}</span>
      </div>
    </motion.div>
  )
}

// Security badge
function SecurityBadge({ feature, index }: { feature: typeof securityFeatures[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-800/60 border border-border/30
                 hover:border-green-500/50 transition-all duration-300"
    >
      <feature.icon className="w-4 h-4 text-green-500" />
      <span className="text-xs text-content-secondary">{feature.label}</span>
    </motion.div>
  )
}

export default function DataPlatformPage() {
  return (
    <div className="min-h-screen bg-surface-900 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(var(--accent), 0.05)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ backgroundColor: 'rgba(var(--data), 0.05)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Sub Navigation */}
      <SubNavigation />

      {/* Main content */}
      <div className="relative container-main pt-40 pb-24">
        
        {/* Hero Section - Compact */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 
                         border border-accent/30 mb-4"
              animate={{ boxShadow: ['0 0 0px rgba(var(--accent), 0.3)', '0 0 20px rgba(var(--accent), 0.3)', '0 0 0px rgba(var(--accent), 0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-3 h-3 text-accent" />
              <span className="text-xs font-medium text-accent">AI-POWERED INFRASTRUCTURE</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              Data Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent">
                Decisions
              </span>
            </h1>

            <p className="text-content-secondary mb-6 max-w-lg">
              Real-time financial data infrastructure powering AI agents, trading signals, 
              and portfolio decisions.
            </p>

            <div className="flex gap-3 mb-8">
              <Button className="group">
                Request Demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline">
                <Play className="w-4 h-4 mr-2" />
                Watch
              </Button>
            </div>

            {/* Quick metrics */}
            <div className="grid grid-cols-4 gap-3">
              <PulsingMetric label="Sources" value="50+" color="rgb(var(--accent))" delay={0.2} />
              <PulsingMetric label="Latency" value="&lt;100ms" color="#22c55e" delay={0.3} />
              <PulsingMetric label="Uptime" value="99.9%" color="#3b82f6" delay={0.4} />
              <PulsingMetric label="Quality" value="100%" color="#a855f7" delay={0.5} />
            </div>
          </motion.div>

          {/* Right - Orbital visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OrbitalVisualization />
          </motion.div>
        </div>

        {/* Divider with animation */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-12"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* AI Agents Grid - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <h2 className="text-lg font-semibold text-white">AI Agents</h2>
            <span className="text-xs text-content-tertiary ml-2">Click to explore</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {agents.map((agent, i) => (
              <AgentCard key={agent.label} agent={agent} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Infrastructure Visual - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-accent" />
            <h2 className="text-lg font-semibold text-white">Infrastructure</h2>
          </div>

          {/* Visual flow diagram */}
          <div className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-surface-800/30 border border-border/30">
            {/* Input */}
            <div className="flex flex-col gap-2">
              {['Market', 'Fund', 'Macro'].map((label, i) => (
                <motion.div
                  key={label}
                  className="px-3 py-1.5 rounded-lg bg-surface-700 border border-border/50 text-xs text-content-tertiary"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                >
                  {label}
                </motion.div>
              ))}
            </div>

            {/* Arrow */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6 text-accent" />
            </motion.div>

            {/* Processing */}
            <motion.div
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-accent/20 to-accent/20 border border-accent/30"
              animate={{ boxShadow: ['0 0 20px rgba(var(--accent), 0.2)', '0 0 40px rgba(var(--accent), 0.4)', '0 0 20px rgba(var(--accent), 0.2)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-white">AI Layer</span>
              </div>
              <div className="text-xs text-content-tertiary mt-1">MCP • Pipelines • BDAaS</div>
            </motion.div>

            {/* Arrow */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              <ArrowRight className="w-6 h-6 text-accent" />
            </motion.div>

            {/* Output */}
            <div className="flex flex-col gap-2">
              {['Signals', 'Models', 'Apps'].map((label, i) => (
                <motion.div
                  key={label}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-accent/20 to-accent/20 border border-accent/30 text-xs text-white"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Security - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-green-500" />
            <h2 className="text-lg font-semibold text-white">Enterprise Security</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {securityFeatures.map((feature, i) => (
              <SecurityBadge key={feature.label} feature={feature} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-r from-accent/10 to-accent/10 
                     border border-accent/20"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Ready for Better Data?
          </h2>
          <p className="text-content-secondary mb-4">
            Join institutions using AI-powered data infrastructure
          </p>
          <Button size="lg" className="group">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

      </div>
    </div>
  )
}
