'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Clock,
  Database,
  ShieldCheck,
  RefreshCw
} from 'lucide-react'

const dataQualityRisks = [
  {
    risk: 'Incomplete Datasets',
    impact: 'Missing data points lead to flawed analysis',
    solution: 'Comprehensive coverage validation',
    icon: Database,
  },
  {
    risk: 'Lookahead Bias',
    impact: 'Point-in-time violations corrupt backtests',
    solution: 'True point-in-time architecture',
    icon: Clock,
  },
  {
    risk: 'Schema Inconsistency',
    impact: 'Breaking changes disrupt pipelines',
    solution: 'Versioned, stable schemas',
    icon: RefreshCw,
  },
  {
    risk: 'Stale Data',
    impact: 'Outdated signals miss market moves',
    solution: 'Real-time freshness monitoring',
    icon: TrendingUp,
  },
]

const qualityPillars = [
  { label: 'Coverage', value: 99.2, color: 'from-green-500 to-emerald-600' },
  { label: 'Accuracy', value: 99.8, color: 'from-blue-500 to-indigo-600' },
  { label: 'Timeliness', value: 99.5, color: 'from-purple-500 to-violet-600' },
  { label: 'Consistency', value: 99.9, color: 'from-amber-500 to-orange-600' },
]

// Animated quality meter
function QualityMeter({ value, label, color }: { value: number; label: string; color: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <div ref={ref} className="relative">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-content-secondary">{label}</span>
        <span className="text-sm font-mono font-bold text-accent">{value}%</span>
      </div>
      <div className="h-2 bg-surface-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// Risk card with animation
function RiskCard({ item, index, isHovered, onHover }: {
  item: typeof dataQualityRisks[0]
  index: number
  isHovered: boolean
  onHover: () => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={onHover}
      className={`relative p-5 rounded-xl border transition-all duration-300 cursor-pointer
                 ${isHovered 
                   ? 'border-green-500/50 bg-green-500/5' 
                   : 'border-border/50 bg-surface-800/30'}`}
    >
      <div className="flex items-start gap-4">
        {/* Status indicator */}
        <motion.div
          animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          {isHovered ? (
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500/50" />
          )}
        </motion.div>

        <div className="flex-1">
          {/* Risk */}
          <div className="mb-2">
            <p className="text-xs text-red-400/80 mb-1">Risk</p>
            <p className="text-sm font-medium text-content-primary">{item.risk}</p>
            <p className="text-xs text-content-tertiary">{item.impact}</p>
          </div>

          {/* Solution - appears on hover */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-3 border-t border-border/50">
              <p className="text-xs text-green-400 mb-1">Our Solution</p>
              <p className="text-sm text-content-secondary">{item.solution}</p>
            </div>
          </motion.div>
        </div>

        <item.icon className="w-5 h-5 text-content-tertiary" />
      </div>
    </motion.div>
  )
}

export function DataQualitySection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredRisk, setHoveredRisk] = React.useState<number | null>(null)

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-800/20" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-green-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 
                           border border-green-500/30 mb-6">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-400 font-medium">Data Foundation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-content-primary mb-4">
              Why Data Quality Matters
            </h2>
            <p className="text-lg text-content-secondary mb-8">
              In fast-moving markets, bad data doesn't just slow you down—it leads to 
              wrong decisions. Our infrastructure is built to eliminate the most common 
              data quality risks.
            </p>

            {/* Quality meters */}
            <div className="space-y-4">
              {qualityPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <QualityMeter {...pillar} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Risk cards */}
          <div className="space-y-4">
            {dataQualityRisks.map((item, index) => (
              <RiskCard
                key={item.risk}
                item={item}
                index={index}
                isHovered={hoveredRisk === index}
                onHover={() => setHoveredRisk(index)}
              />
            ))}
            
            {/* Info note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="p-4 rounded-xl bg-accent/5 border border-accent/20"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
                <p className="text-sm text-content-secondary">
                  <span className="text-content-primary font-medium">Industry insight: </span>
                  Studies show that data quality issues cost financial institutions 
                  an average of 15-25% of revenue. We help you avoid these hidden costs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
