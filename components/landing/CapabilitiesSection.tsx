'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  BarChart3, 
  Shield, 
  Database, 
  Brain, 
  Zap, 
  Lock,
  TrendingUp,
  Search,
  FileSearch
} from 'lucide-react'
import { cn } from '@/lib/utils'

// =============================================================================
// CAPABILITIES DATA
// =============================================================================
const CAPABILITIES = [
  {
    icon: BarChart3,
    title: 'Quantitative Research',
    description: 'Advanced analytics and backtesting infrastructure for systematic strategies.',
    gradient: 'from-accent to-accent-light',
  },
  {
    icon: Shield,
    title: 'Risk Analytics',
    description: 'Real-time portfolio risk monitoring, VaR calculations, and stress testing.',
    gradient: 'from-accent-light to-accent',
  },
  {
    icon: Database,
    title: 'Data Infrastructure',
    description: 'Enterprise-grade data pipelines with 500+ integrated sources.',
    gradient: 'from-accent to-accent-light',
  },
  {
    icon: Brain,
    title: 'AI Agents',
    description: 'Specialized AI agents trained on financial workflows and domain expertise.',
    gradient: 'from-accent-light to-accent',
  },
  {
    icon: Lock,
    title: 'AI Sovereignty',
    description: 'Deploy on your infrastructure. Your data never leaves your environment.',
    gradient: 'from-accent to-accent-light',
  },
  {
    icon: Zap,
    title: 'Alpha Generation',
    description: 'Signal detection, factor analysis, and systematic alpha discovery.',
    gradient: 'from-accent to-accent-light',
  },
]

// =============================================================================
// CAPABILITY CARD
// =============================================================================
interface CapabilityCardProps {
  capability: typeof CAPABILITIES[0]
  index: number
}

function CapabilityCard({ capability, index }: CapabilityCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = capability.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative h-full p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] transition-all duration-300 hover:bg-white/[0.04] hover:border-accent/30">
        {/* Icon */}
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br',
          capability.gradient,
          'bg-opacity-10'
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
          {capability.title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed">
          {capability.description}
        </p>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Corner accent on hover */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-3 right-3 w-8 h-px bg-gradient-to-l from-accent/50 to-transparent" />
          <div className="absolute top-3 right-3 w-px h-8 bg-gradient-to-b from-accent/50 to-transparent" />
        </div>
      </div>
    </motion.div>
  )
}

// =============================================================================
// CAPABILITIES SECTION
// =============================================================================
export function CapabilitiesSection() {
  const headerRef = React.useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-900 via-surface-800/30 to-surface-900" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative container-main">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-accent tracking-wide uppercase mb-4">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Enterprise AI,{' '}
            <span className="text-white/60">purpose-built for finance</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            From data infrastructure to intelligent agents, we provide the complete stack
            for institutional AI deployment.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((capability, index) => (
            <CapabilityCard key={capability.title} capability={capability} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CapabilitiesSection
