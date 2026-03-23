'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Activity, 
  Building2, 
  Globe, 
  MessageSquare, 
  Leaf, 
  AlertTriangle,
  FileText,
  Users,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  ArrowRight
} from 'lucide-react'

const dataCategories = [
  {
    id: 'market',
    icon: Activity,
    label: 'Market Data',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    description: 'Real-time prices, volume, order books across global exchanges',
    stats: ['50+ Exchanges', 'Real-time & Historical', 'Tick-level Data'],
    examples: ['Equities', 'FX', 'Commodities', 'Crypto', 'Derivatives']
  },
  {
    id: 'fundamental',
    icon: Building2,
    label: 'Fundamental Data',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    description: 'Company financials, estimates, and ownership data',
    stats: ['100K+ Companies', '20+ Years History', 'Standardized'],
    examples: ['Income Statement', 'Balance Sheet', 'Cash Flow', 'Ratios']
  },
  {
    id: 'macro',
    icon: Globe,
    label: 'Macroeconomic',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    description: 'Economic indicators from central banks and government sources',
    stats: ['200+ Countries', '5K+ Indicators', 'Daily Updates'],
    examples: ['GDP', 'Inflation', 'Employment', 'Trade Data']
  },
  {
    id: 'sentiment',
    icon: MessageSquare,
    label: 'Sentiment & Geopolitical',
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    description: 'News sentiment, social signals, and geopolitical risk scores',
    stats: ['1M+ Sources', 'Real-time Processing', 'NLP Scored'],
    examples: ['News Sentiment', 'Social Signals', 'Event Detection', 'Risk Scores']
  },
  {
    id: 'esg',
    icon: Leaf,
    label: 'ESG & Risk',
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
    description: 'Environmental, social, governance scores and risk metrics',
    stats: ['40K+ Companies', 'Multiple Providers', 'Controversy Alerts'],
    examples: ['Carbon Footprint', 'Governance Scores', 'Controversies', 'SDG Alignment']
  },
  {
    id: 'documents',
    icon: FileText,
    label: 'Documents & Filings',
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    description: 'SEC filings, earnings transcripts, IPO docs, insider reports',
    stats: ['10M+ Documents', 'Searchable Text', 'AI-Ready Format'],
    examples: ['10-K/10-Q', 'Earnings Calls', 'IPO Prospectus', 'Insider Filings']
  },
]

// Animated bar chart
function AnimatedBarChart({ isActive }: { isActive: boolean }) {
  const bars = [60, 80, 45, 90, 70, 85, 55, 75, 95, 65]
  
  return (
    <div className="flex items-end gap-1 h-24">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-3 bg-gradient-to-t from-accent to-data rounded-t"
          initial={{ height: 0 }}
          animate={{ height: isActive ? `${height}%` : 0 }}
          transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// Mini donut chart
function MiniDonut({ isActive, color }: { isActive: boolean; color: string }) {
  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-surface-700"
        />
        <motion.circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="88"
          initial={{ strokeDashoffset: 88 }}
          animate={{ strokeDashoffset: isActive ? 22 : 88 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className={color} stopColor="currentColor" />
            <stop offset="100%" className={color} stopColor="currentColor" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div 
        className="absolute inset-0 flex items-center justify-center text-sm font-mono font-bold"
        animate={{ opacity: isActive ? 1 : 0 }}
      >
        75%
      </motion.div>
    </div>
  )
}

// Data flow visualization
function DataFlowVisual() {
  return (
    <div className="relative h-32 flex items-center justify-center gap-4">
      {/* Input nodes */}
      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-8 h-8 rounded-lg bg-surface-700 border border-border flex items-center justify-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-accent" />
          </motion.div>
        ))}
      </div>
      
      {/* Flow lines */}
      <div className="relative w-32">
        <svg className="w-full h-32" viewBox="0 0 100 100">
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M 0 ${20 + i * 30} Q 50 ${15 + i * 30} 100 50`}
              fill="none"
              stroke="url(#flowGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.2" />
              <stop offset="50%" stopColor="rgb(var(--accent))" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(var(--data))" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Animated dot on path */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-accent"
          animate={{
            left: ['0%', '100%'],
            top: ['50%', '50%'],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      
      {/* Output node */}
      <motion.div
        className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-data flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <TrendingUp className="w-6 h-6 text-white" />
      </motion.div>
    </div>
  )
}

export function DataCoverageSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null)

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-900 via-surface-800/50 to-surface-900" />
      
      <div className="container-main relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-content-primary mb-4">
            Complete Data Coverage
          </h2>
          <p className="text-lg text-content-secondary max-w-2xl mx-auto">
            Every dataset you need across the investment stack, delivered in real-time 
            with point-in-time accuracy
          </p>
        </motion.div>

        {/* Interactive grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              className={`relative group cursor-pointer rounded-2xl border transition-all duration-500 overflow-hidden
                         ${hoveredCard === category.id || activeCategory === category.id 
                           ? `${category.borderColor} scale-[1.02]` 
                           : 'border-border/50'}`}
            >
              {/* Card background */}
              <div className={`absolute inset-0 ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <motion.div
                    animate={{ rotate: hoveredCard === category.id ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-5 h-5 text-content-tertiary" />
                  </motion.div>
                </div>

                {/* Title & description */}
                <h3 className="text-xl font-semibold text-content-primary mb-2">
                  {category.label}
                </h3>
                <p className="text-sm text-content-secondary mb-4">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.stats.map((stat, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-surface-700/50 text-content-tertiary"
                    >
                      {stat}
                    </span>
                  ))}
                </div>

                {/* Expandable examples */}
                <motion.div
                  initial={false}
                  animate={{ 
                    height: hoveredCard === category.id || activeCategory === category.id ? 'auto' : 0,
                    opacity: hoveredCard === category.id || activeCategory === category.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs text-content-tertiary mb-2">Includes:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((ex, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded bg-gradient-to-r ${category.color} text-white`}
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '50+', label: 'Data Sources' },
            { value: '10M+', label: 'Data Points/Day' },
            { value: '99.99%', label: 'Data Quality' },
            { value: '<100ms', label: 'Avg Latency' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-surface-800/50 border border-border/50">
              <div className="text-2xl font-mono font-bold text-accent mb-1">{stat.value}</div>
              <div className="text-sm text-content-tertiary">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
