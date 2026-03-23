'use client'

import * as React from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Globe,
  FileSearch,
  AlertCircle,
  Leaf,
  BarChart3,
  Lock,
  LineChart,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Brain
} from 'lucide-react'

const aiAgents = [
  {
    id: 'macro',
    icon: Globe,
    title: 'Global Macro Portfolio',
    description: 'Analyze macroeconomic trends and build portfolio strategies across global markets',
    color: 'from-purple-500 to-violet-600',
    tags: ['Portfolio Analysis', 'Macro Trends', 'Cross-Asset'],
    preview: {
      metrics: ['VaR: 2.3%', 'Sharpe: 1.8', 'Beta: 0.85'],
      chart: 'line'
    }
  },
  {
    id: 'prospectus',
    icon: FileSearch,
    title: 'Prospectus Analysis',
    description: 'Extract and analyze key information from IPO and offering documents',
    color: 'from-blue-500 to-indigo-600',
    tags: ['IPO Analysis', 'Document AI', 'Risk Factors'],
    preview: {
      metrics: ['Pages: 245', 'Risk Items: 18', 'Key Sections: 12'],
      chart: 'bar'
    }
  },
  {
    id: 'credit',
    icon: AlertCircle,
    title: 'Credit Risk Analysis',
    description: 'Assess creditworthiness and monitor default risk across corporate issuers',
    color: 'from-red-500 to-orange-600',
    tags: ['Credit Scoring', 'Default Risk', 'Spread Analysis'],
    preview: {
      metrics: ['Rating: BBB+', 'Spread: 145bp', 'PD: 0.8%'],
      chart: 'gauge'
    }
  },
  {
    id: 'esg',
    icon: Leaf,
    title: 'ESG Analysis',
    description: 'Evaluate environmental, social, and governance factors for investment decisions',
    color: 'from-teal-500 to-green-600',
    tags: ['Sustainability', 'Governance', 'Impact'],
    preview: {
      metrics: ['Score: 72/100', 'Rating: A', 'Trend: ↑'],
      chart: 'donut'
    }
  },
  {
    id: 'earnings',
    icon: BarChart3,
    title: 'Earnings & Fundamentals',
    description: 'Deep dive into company financials, earnings quality, and valuation metrics',
    color: 'from-amber-500 to-yellow-600',
    tags: ['Earnings', 'Valuation', 'Quality'],
    preview: {
      metrics: ['P/E: 18.5', 'ROE: 24%', 'Growth: 12%'],
      chart: 'bar'
    }
  },
  {
    id: 'private',
    icon: Lock,
    title: 'Private Data Analysis',
    description: 'Secure analysis of proprietary and alternative data sources',
    color: 'from-slate-500 to-gray-600',
    tags: ['Alternative Data', 'Private', 'Secure'],
    preview: {
      metrics: ['Sources: 12', 'Coverage: 85%', 'Freshness: 1h'],
      chart: 'line'
    }
  },
]

// Mini chart components
function MiniLineChart() {
  const path = "M 0 40 Q 10 35 20 38 T 40 30 T 60 35 T 80 20 T 100 25"
  return (
    <svg viewBox="0 0 100 50" className="w-full h-16">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(var(--data))" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={path + " L 100 50 L 0 50 Z"}
        fill="url(#areaGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
    </svg>
  )
}

function MiniBarChart() {
  const bars = [60, 80, 45, 90, 70, 85, 55]
  return (
    <div className="flex items-end gap-1 h-16 w-full">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-gradient-to-t from-accent/50 to-data/50 rounded-t"
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        />
      ))}
    </div>
  )
}

function MiniDonutChart() {
  return (
    <div className="relative w-16 h-16 mx-auto">
      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
        <circle
          cx="18" cy="18" r="14"
          fill="none" stroke="currentColor"
          strokeWidth="4" className="text-surface-700"
        />
        <motion.circle
          cx="18" cy="18" r="14"
          fill="none" stroke="url(#donutGrad)"
          strokeWidth="4" strokeLinecap="round"
          strokeDasharray="88"
          initial={{ strokeDashoffset: 88 }}
          animate={{ strokeDashoffset: 22 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(var(--accent))" />
            <stop offset="100%" stopColor="rgb(var(--data))" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
        75%
      </div>
    </div>
  )
}

function MiniGaugeChart() {
  return (
    <div className="relative w-16 h-10 mx-auto">
      <svg viewBox="0 0 60 30" className="w-full h-full">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        <path
          d="M 5 30 A 25 25 0 0 1 55 30"
          fill="none" stroke="url(#gaugeGrad)"
          strokeWidth="6" strokeLinecap="round"
        />
        <motion.circle
          cx="35" cy="15" r="4"
          fill="currentColor"
          className="text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      </svg>
    </div>
  )
}

// Agent card component
function AgentCard({ agent, index, isHovered, onHover, onSelect }: {
  agent: typeof aiAgents[0]
  index: number
  isHovered: boolean
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const renderChart = () => {
    switch (agent.preview.chart) {
      case 'line': return <MiniLineChart />
      case 'bar': return <MiniBarChart />
      case 'donut': return <MiniDonutChart />
      case 'gauge': return <MiniGaugeChart />
      default: return <MiniLineChart />
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => onHover(agent.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(agent.id)}
      className={`relative group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden
                 ${isHovered ? 'border-accent/50 scale-[1.02] shadow-lg shadow-accent/10' : 'border-border/50'}`}
    >
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 
                       group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Glow effect */}
      <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${agent.color} opacity-0 
                       group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className={`p-3 rounded-xl bg-gradient-to-br ${agent.color}`}
            animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            <agent.icon className="w-6 h-6 text-white" />
          </motion.div>

          <motion.div
            animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-5 h-5 text-accent" />
          </motion.div>
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-content-primary mb-2">
          {agent.title}
        </h3>
        <p className="text-sm text-content-secondary mb-4">
          {agent.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {agent.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-surface-700/50 text-content-tertiary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Preview panel */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border/50">
                {/* Mini chart */}
                <div className="mb-3">
                  {renderChart()}
                </div>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  {agent.preview.metrics.map((metric, i) => (
                    <div key={i} className="text-center p-2 rounded bg-surface-700/30">
                      <span className="text-xs font-mono text-accent">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function AIAgentsShowcase() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredAgent, setHoveredAgent] = React.useState<string | null>(null)
  const [selectedAgent, setSelectedAgent] = React.useState<string | null>(null)

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-800/30" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-data/5 rounded-full blur-[100px]" />

      <div className="container-main relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
            <Brain className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">AI-Powered Tools</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-content-primary mb-4">
            Intelligent Agents for Every Task
          </h2>
          <p className="text-lg text-content-secondary max-w-2xl mx-auto">
            Pre-built AI agents ready to analyze, extract, and generate insights 
            from your financial data
          </p>
        </motion.div>

        {/* Agent grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiAgents.map((agent, index) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              index={index}
              isHovered={hoveredAgent === agent.id}
              onHover={setHoveredAgent}
              onSelect={setSelectedAgent}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-surface-800/50 border border-border/50">
            <div className="flex -space-x-2">
              {[Sparkles, Zap, TrendingUp].map((Icon, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-accent/20 border-2 border-surface-800 
                                       flex items-center justify-center">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-content-primary">More agents coming soon</p>
              <p className="text-xs text-content-tertiary">Custom agents available on request</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
