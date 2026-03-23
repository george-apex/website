'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  TrendingUp,
  Building2,
  Briefcase,
  Scale,
  Target,
  LineChart,
  Landmark,
  DollarSign,
  PieChart,
  Activity,
} from 'lucide-react'

// Persona types
interface Persona {
  id: string
  name: string
  title: string
  icon: React.ElementType
  color: string
  description: string
  features: string[]
  metrics: {
    label: string
    value: string
    trend?: string
  }[]
  useCases: string[]
}

// Financial personas
const personas: Persona[] = [
  {
    id: 'public-markets',
    name: 'Public Markets',
    title: 'Hedge Funds & Asset Managers',
    icon: TrendingUp,
    color: 'accent',
    description: 'Real-time alpha generation, risk analytics, and portfolio optimization for institutional investors.',
    features: [
      'Multi-factor alpha signals',
      'Real-time risk monitoring',
      'Portfolio attribution analysis',
      'Market regime detection',
    ],
    metrics: [
      { label: 'Alpha Generated', value: '+4.2%', trend: 'YTD' },
      { label: 'Sharpe Ratio', value: '2.1' },
      { label: 'Max Drawdown', value: '-3.2%' },
      { label: 'Win Rate', value: '68%' },
    ],
    useCases: ['Portfolio Rebalancing', 'Risk Budgeting', 'Factor Exposure Analysis'],
  },
  {
    id: 'private-equity',
    name: 'Private Equity',
    title: 'Deal Sourcing & Due Diligence',
    icon: Building2,
    color: 'data',
    description: 'Deal sourcing, due diligence automation, and portfolio company monitoring for PE firms.',
    features: [
      'Automated deal sourcing',
      'DD checklist generation',
      'Comparable transaction analysis',
      'Portfolio performance tracking',
    ],
    metrics: [
      { label: 'Deals Analyzed', value: '1,247', trend: 'This quarter' },
      { label: 'Avg DD Time', value: '4.2 weeks' },
      { label: 'Target IRR', value: '24%' },
      { label: 'MOIC Target', value: '2.5x' },
    ],
    useCases: ['Deal Screening', 'Valuation Analysis', 'Exit Planning'],
  },
  {
    id: 'investment-banking',
    name: 'Investment Banking',
    title: 'M&A Advisory & Capital Markets',
    icon: Briefcase,
    color: 'accent',
    description: 'Pitch deck automation, precedent analysis, and transaction execution support for IB teams.',
    features: [
      'Pitch deck generation',
      'Precedent transaction analysis',
      'Buyer universe mapping',
      'Synergy modeling',
    ],
    metrics: [
      { label: 'Pitch Efficiency', value: '+65%', trend: 'Time saved' },
      { label: 'Comps Updated', value: '847', trend: 'This year' },
      { label: 'Model Accuracy', value: '99.2%' },
      { label: 'Deal Close Rate', value: '78%' },
    ],
    useCases: ['Comparable Analysis', 'Buy-side DD', 'Fairness Opinion Support'],
  },
  {
    id: 'credit',
    name: 'Credit',
    title: 'Direct Lending & Credit Funds',
    icon: Scale,
    color: 'data',
    description: 'Credit analysis, covenant monitoring, and portfolio risk management for credit investors.',
    features: [
      'Automated credit scoring',
      'Covenant tracking & alerts',
      'Default probability modeling',
      'Stress testing scenarios',
    ],
    metrics: [
      { label: 'Portfolio Size', value: '$2.8B' },
      { label: 'Avg Rating', value: 'BB+' },
      { label: 'Default Rate', value: '0.8%', trend: 'Below benchmark' },
      { label: 'Coverage Ratio', value: '3.2x' },
    ],
    useCases: ['Credit Committee Prep', 'Covenant Analysis', 'Workout Strategy'],
  },
  {
    id: 'strategy',
    name: 'Strategy',
    title: 'Corporate Strategy & Development',
    icon: Target,
    color: 'accent',
    description: 'Strategic planning, market intelligence, and M&A execution for corporate development teams.',
    features: [
      'Market landscape analysis',
      'Competitive intelligence',
      'M&A target screening',
      'Integration planning',
    ],
    metrics: [
      { label: 'Markets Tracked', value: '42' },
      { label: 'Targets Identified', value: '156', trend: 'Active pipeline' },
      { label: 'Deal Volume', value: '$4.2B', trend: 'Last 12 months' },
      { label: 'Integration Success', value: '92%' },
    ],
    useCases: ['Market Entry Analysis', 'Target Screening', 'Post-Merger Integration'],
  },
]

// Persona Switcher Props
interface PersonaSwitcherProps {
  className?: string
  defaultPersona?: string
  onPersonaChange?: (persona: Persona) => void
  showMetrics?: boolean
  variant?: 'full' | 'compact'
}

export function PersonaSwitcher({
  className,
  defaultPersona = 'public-markets',
  onPersonaChange,
  showMetrics = true,
  variant = 'full',
}: PersonaSwitcherProps) {
  const [activePersona, setActivePersona] = React.useState<string>(defaultPersona)
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  const currentPersona = personas.find((p) => p.id === activePersona) || personas[0]

  const handlePersonaChange = (personaId: string) => {
    if (personaId === activePersona) return
    setIsTransitioning(true)
    
    setTimeout(() => {
      setActivePersona(personaId)
      const newPersona = personas.find((p) => p.id === personaId)
      if (newPersona) {
        onPersonaChange?.(newPersona)
      }
      setIsTransitioning(false)
    }, 150)
  }

  const IconComponent = currentPersona.icon

  return (
    <div className={cn('relative', className)}>
      {/* Persona tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {personas.map((persona) => {
          const PersonaIcon = persona.icon
          const isActive = activePersona === persona.id

          return (
            <button
              key={persona.id}
              onClick={() => handlePersonaChange(persona.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-panel font-medium transition-all',
                'border',
                isActive
                  ? persona.color === 'accent'
                    ? 'bg-accent/10 text-accent border-accent/30'
                    : 'bg-data/10 text-data border-data/30'
                  : 'bg-surface-800 text-content-secondary border-border hover:text-content-primary hover:border-content-tertiary'
              )}
            >
              <PersonaIcon className="w-4 h-4" />
              <span className="text-body-sm">{persona.name}</span>
            </button>
          )
        })}
      </div>

      {/* Persona content */}
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={activePersona}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid lg:grid-cols-2 gap-6"
          >
            {/* Left: Description & Features */}
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'p-3 rounded-panel',
                    currentPersona.color === 'accent' ? 'bg-accent/10' : 'bg-data/10'
                  )}
                >
                  <IconComponent
                    className={cn(
                      'w-6 h-6',
                      currentPersona.color === 'accent' ? 'text-accent' : 'text-data'
                    )}
                  />
                </div>
                <div>
                  <h3 className="text-heading-lg text-content-primary mb-1">
                    {currentPersona.title}
                  </h3>
                  <p className="text-body text-content-secondary">
                    {currentPersona.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {currentPersona.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-body-sm text-content-secondary"
                  >
                    <div
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        currentPersona.color === 'accent' ? 'bg-accent' : 'bg-data'
                      )}
                    />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Use Cases */}
              <div>
                <h4 className="text-body-sm font-medium text-content-tertiary mb-3 uppercase tracking-wider">
                  Key Use Cases
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentPersona.useCases.map((useCase, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded bg-surface-800 text-body-sm text-content-secondary border border-border"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Metrics */}
            {showMetrics && (
              <div className="bg-surface-800 rounded-panel border border-border p-6">
                <h4 className="text-body-sm font-medium text-content-tertiary mb-4 uppercase tracking-wider">
                  Performance Metrics
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {currentPersona.metrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-surface-900 rounded-panel p-4 border border-border"
                    >
                      <div className="text-terminal-xs text-content-tertiary font-mono mb-1">
                        {metric.label}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className={cn(
                            'text-2xl font-medium font-mono',
                            currentPersona.color === 'accent' ? 'text-accent' : 'text-data'
                          )}
                        >
                          {metric.value}
                        </span>
                        {metric.trend && (
                          <span className="text-terminal-xs text-content-tertiary font-mono">
                            {metric.trend}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex gap-3">
                    <button
                      className={cn(
                        'flex-1 py-2.5 rounded-panel text-body-sm font-medium transition-colors',
                        currentPersona.color === 'accent'
                          ? 'bg-accent text-surface-900 hover:bg-accent/90'
                          : 'bg-data text-surface-900 hover:bg-data/90'
                      )}
                    >
                      Schedule Demo
                    </button>
                    <button className="flex-1 py-2.5 rounded-panel text-body-sm font-medium border border-border text-content-secondary hover:text-content-primary hover:border-content-tertiary transition-colors">
                      View Use Cases
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Compact variant for inline use
export function PersonaSwitcherCompact({
  className,
  defaultPersona = 'public-markets',
  onPersonaChange,
}: Omit<PersonaSwitcherProps, 'variant' | 'showMetrics'>) {
  const [activePersona, setActivePersona] = React.useState<string>(defaultPersona)

  const handlePersonaChange = (personaId: string) => {
    setActivePersona(personaId)
    const newPersona = personas.find((p) => p.id === personaId)
    if (newPersona) {
      onPersonaChange?.(newPersona)
    }
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {personas.map((persona) => {
        const PersonaIcon = persona.icon
        const isActive = activePersona === persona.id

        return (
          <button
            key={persona.id}
            onClick={() => handlePersonaChange(persona.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-panel text-body-sm font-medium transition-all',
              'border',
              isActive
                ? persona.color === 'accent'
                  ? 'bg-accent/10 text-accent border-accent/30'
                  : 'bg-data/10 text-data border-data/30'
                : 'bg-surface-800 text-content-secondary border-border hover:text-content-primary'
            )}
          >
            <PersonaIcon className="w-4 h-4" />
            {persona.name}
          </button>
        )
      })}
    </div>
  )
}

// Export personas for external use
export { personas }
export type { Persona }

export default PersonaSwitcher
