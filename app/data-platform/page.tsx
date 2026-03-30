'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Database, Brain, Shield, Zap, Globe, TrendingUp, 
  Activity, Building2, Leaf, FileText, Lock, Layers,
  Play, ArrowRight, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScheduleDemoDialog } from '@/components/ui/ScheduleDemoDialog'


// Buzzwords marquee
const buzzwords = [
  'REAL-TIME', 'AI-POWERED', 'POINT-IN-TIME', 'ENTERPRISE-GRADE',
  'ZERO-LATENCY', 'INSTITUTIONAL', 'REGULATORY-READY', 'PRIVATE-BY-DESIGN'
]

// Data types with interactive hover
const dataTypes = [
  { icon: Activity, label: 'Market', color: '#22c55e' },
  { icon: Building2, label: 'Fundamentals', color: '#3b82f6' },
  { icon: Globe, label: 'Macro', color: '#a855f7' },
  { icon: TrendingUp, label: 'Sentiment', color: '#f59e0b' },
  { icon: Leaf, label: 'ESG', color: '#14b8a6' },
  { icon: FileText, label: 'Documents', color: '#ec4899' },
]

// AI Agents
const agents = [
  { icon: Globe, label: 'Global Macro Portfolio Agent', color: '#a855f7' },
  { icon: FileText, label: 'Prospecter Analyser Agent', color: '#3b82f6' },
  { icon: Shield, label: 'Credit Risk Analysis Agent', color: '#ef4444' },
  { icon: Leaf, label: 'ESG Agent', color: '#22c55e' },
  { icon: TrendingUp, label: 'Fundamental & Earnings Agent', color: '#f59e0b' },
  { icon: Database, label: 'Fundamental Search Agent', color: '#06b6d4' },
  { icon: Lock, label: 'Private Data Analyst', color: '#64748b' },
  { icon: Activity, label: 'Multi Asset Chart Builder', color: '#ec4899' },
  { icon: Brain, label: 'Chart & Data Analyser', color: '#8b5cf6' },
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
      <div className="text-xs text-sky-300 mt-1">{label}</div>
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

      {/* Main content */}
      <div className="relative container-main pt-8 pb-24 min-[393px]:pt-48 burger-range:pt-[120px] desktop:pt-48">
        
        {/* Hero Section - Compact */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="ml-8"
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
              Faster Signals. Better Decisions.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent">
                Stronger Performance.
              </span>
            </h1>

            <p className="text-content-secondary mb-6 max-w-lg">
              Institutional-grade, point-in-time financial data powering trading signals, portfolio decisions, and AI-driven research.
            </p>

            <div className="flex gap-3 mb-8">
              <ScheduleDemoDialog
                trigger={
                  <Button className="group">
                    Schedule Demo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                }
              />
              <Link href="/agents">
                <Button variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Explore our Agents
                </Button>
              </Link>
            </div>

            {/* Quick metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
            className="mt-16"
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

        {/* Core Pillars - Speed, Accuracy, Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-accent" />
                <span className="text-base font-semibold text-white">Low Latency</span>
              </div>
              <p className="text-sm text-sky-300">Real-time data-to-signal delivery</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-base font-semibold text-white">Point-in-Time Accuracy</span>
              </div>
              <p className="text-sm text-sky-300">No lookahead bias</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-purple-500" />
                <span className="text-base font-semibold text-white">Privacy</span>
              </div>
              <p className="text-sm text-sky-300">Your data stays yours</p>
            </div>
          </div>
        </motion.div>

        {/* Better Decisions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Better Decisions Start With Better Data</h2>
            <p className="text-sky-300 max-w-2xl mx-auto">In fast-moving markets, performance depends on the speed, accuracy, and integrity of data.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-surface-800/40 border border-border/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-white">Execution Edge</h3>
              </div>
              <p className="text-sm text-sky-300 mb-4">Reduce latency from data to execution-critical signals</p>
              <ul className="space-y-2 text-sm text-sky-300">
                <li>• Real-time data-to-signal pipelines</li>
                <li>• Low-latency delivery across datasets</li>
                <li>• Streaming-first architecture</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-surface-800/40 border border-border/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-base font-semibold text-white">Continuous Signal Availability</h3>
              </div>
              <p className="text-sm text-sky-300 mb-4">Maintain uninterrupted signal generation during market volatility</p>
              <ul className="space-y-2 text-sm text-sky-300">
                <li>• Multi-source data validation and cross-checking</li>
                <li>• Continuous validation and anomaly detection</li>
                <li>• Resilient systems for uninterrupted data access</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-surface-800/40 border border-border/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-base font-semibold text-white">Signal Integrity</h3>
              </div>
              <p className="text-sm text-sky-300 mb-4">Bias-free, point-in-time data you can trust in production models</p>
              <ul className="space-y-2 text-sm text-sky-300">
                <li>• No lookahead bias</li>
                <li>• Anomaly detection</li>
                <li>• Survivorship bias eliminated</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Data Coverage Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Data That Drives Investment Decisions</h2>
            <p className="text-sky-300 max-w-2xl mx-auto">From macro positioning to single-name analysis — all delivered with point-in-time accuracy.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-xl bg-surface-800/40 border border-border/30">
              <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent" />
                Market Data
              </h3>
              <ul className="space-y-1.5 text-sm text-sky-300">
                <li>• Real-time & historical prices</li>
                <li>• Tick-level & OHLCV data</li>
                <li>• Exchange coverage</li>
                <li>• Corporate actions</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-surface-800/40 border border-border/30">
              <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-500" />
                Fundamental Data
              </h3>
              <ul className="space-y-1.5 text-sm text-sky-300">
                <li>• Company financials (quarterly/annual)</li>
                <li>• Earnings estimates & revisions</li>
                <li>• Segment-level breakdowns</li>
                <li>• Industry classifications</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-surface-800/40 border border-border/30">
              <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-500" />
                Economic & Macro Data
              </h3>
              <ul className="space-y-1.5 text-sm text-sky-300">
                <li>• Inflation & rates</li>
                <li>• Labour market</li>
                <li>• Wages</li>
                <li>• Sector/regional</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-surface-800/40 border border-border/30">
              <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                Alternative & Sentiment Data
              </h3>
              <ul className="space-y-1.5 text-sm text-sky-300">
                <li>• News & social sentiment</li>
                <li>• Geopolitical news</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-surface-800/40 border border-border/30">
              <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-500" />
                ESG & Risk Data
              </h3>
              <ul className="space-y-1.5 text-sm text-sky-300">
                <li>• ESG scores and sustainability profiles</li>
                <li>• Governance and oversight signals</li>
                <li>• Controversy and reputational risk</li>
                <li>• Peer-relative ESG positioning</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-surface-800/40 border border-border/30">
              <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-pink-500" />
                Documents & Filings
              </h3>
              <ul className="space-y-1.5 text-sm text-sky-300">
                <li>• SEC filings</li>
                <li>• Earnings call transcripts</li>
                <li>• Prospectuses & IPO docs</li>
                <li>• Insider trading reports</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-sky-300 text-center italic">
            All datasets are delivered with point-in-time accuracy to eliminate lookahead bias.
          </p>
        </motion.div>

        {/* Data & AI Access Layer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-4 h-4 text-accent" />
            <h2 className="text-lg font-semibold text-white">Data & AI Access Layer</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* BDAaS */}
            <div className="p-6 rounded-xl bg-surface-800/40 border border-border/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Database className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-white">BDAaS</h3>
              </div>
              <p className="text-sm text-sky-300 mb-4">A unified data layer that ingests, processes, and distributes structured and unstructured datasets — powering agents, models, and products with consistent, high-quality data.</p>
              <ul className="space-y-2 text-sm text-sky-300">
                <li>• <span className="text-white">Real-time & Batch</span> — Live feeds and historical datasets</li>
                <li>• <span className="text-white">Fast Distribution</span> — APIs, websockets, and caching</li>
                <li>• <span className="text-white">Audit & Compliance</span> — Full lineage and traceability</li>
              </ul>
            </div>

            {/* MCP Server */}
            <div className="p-6 rounded-xl bg-surface-800/40 border border-border/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="text-base font-semibold text-white">MCP Server</h3>
              </div>
              <p className="text-sm text-sky-300 mb-4">Model Context Protocol — standardized AI agent connectivity.</p>
              <ul className="space-y-2 text-sm text-sky-300">
                <li>• RAG-ready context injection for AI-native workflows</li>
                <li>• Schema-enforced, type-safe data delivery</li>
                <li>• Secure, access-controlled endpoints for model interaction</li>
                <li>• Low-latency execution with intelligent caching and rate limiting</li>
              </ul>
            </div>

            {/* AI Agents */}
            <div className="p-6 rounded-xl bg-surface-800/40 border border-border/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-base font-semibold text-white">AI Agents</h3>
              </div>
              <p className="text-sm text-sky-300 mb-4">Production-ready AI agents built on top of institutional-grade data and secure model access.</p>
              <ul className="space-y-2 text-sm text-sky-300">
                <li>• Pre-built workflows for macro, fundamental, and multi-asset analysis.</li>
                <li>• Seamless integration with the underlying data and access layer.</li>
                <li>• Secure, access-controlled execution across sensitive financial data.</li>
              </ul>
              <Link href="/agents" className="inline-block mt-4">
                <Button variant="outline" size="sm">
                  Explore our Agents
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Data Quality Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Data Quality Determines Outcomes</h2>
            <p className="text-sky-300 max-w-2xl mx-auto">Data quality drives model reliability — directly impacting signal quality and investment decisions.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Data Risks */}
            <div className="p-6 rounded-xl bg-surface-800/40 border border-red-500/20">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-500" />
                Data Risks
              </h3>
              <p className="text-sm text-sky-300 mb-6">Inaccurate, delayed, or incomplete data introduces risk at every stage of decision-making.</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-sm text-white">Incomplete datasets</span>
                    <span className="text-sm text-red-400"> → Gaps in analysis and missed opportunities</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-sm text-white">Inconsistent schemas</span>
                    <span className="text-sm text-red-400"> → Model instability and integration issues</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-sm text-white">Lookahead bias</span>
                    <span className="text-sm text-red-400"> → Distorted backtesting and unreliable signals</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="text-sm text-white">Stale data</span>
                    <span className="text-sm text-red-400"> → Delayed responses in fast-moving markets</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Integrity Standards */}
            <div className="p-6 rounded-xl bg-surface-800/40 border border-green-500/20">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Data Integrity Standards
              </h3>
              <p className="text-sm text-sky-300 mb-6">Datasets are engineered to meet institutional-grade requirements for analysis and model development.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-white">Coverage</span>
                    <span className="text-xs text-sky-300 ml-2">Comprehensive and complete</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-white">Temporal Accuracy</span>
                    <span className="text-xs text-sky-300 ml-2">Point-in-time alignment</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-white">Standardisation</span>
                    <span className="text-xs text-sky-300 ml-2">Consistent schemas</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-white">Data Quality</span>
                    <span className="text-xs text-sky-300 ml-2">Continuous validation</span>
                  </div>
                </div>
              </div>
            </div>
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
          <Link href="/contact">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
