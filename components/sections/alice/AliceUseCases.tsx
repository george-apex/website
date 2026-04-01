'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/section'
import { 
  PieChart, 
  TrendingUp, 
  Building2, 
  Briefcase,
  Search,
  FileText,
  AlertTriangle,
  BarChart3,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

const useCases = [
  {
    id: 'portfolio_manager',
    icon: PieChart,
    title: 'Portfolio Managers',
    subtitle: 'Long-term conviction & allocation',
    description: 'Transform investment theses into actionable intelligence with comprehensive evidence synthesis.',
    examples: [
      {
        query: 'Should I increase my NVDA position ahead of earnings?',
        outcome: 'Structured thesis with conviction score, risk flags, and position sizing recommendation',
      },
      {
        query: 'What\'s the relative value case for semiconductor exposure vs. software?',
        outcome: 'Comparative analysis with sector dynamics, valuation metrics, and allocation framework',
      },
    ],
    capabilities: ['Thesis validation', 'Risk assessment', 'Position sizing', 'Sector analysis'],
    color: 'accent',
  },
  {
    id: 'trader',
    icon: TrendingUp,
    title: 'Traders',
    subtitle: 'Tactical entry & exit signals',
    description: 'Real-time market intelligence with technical context and catalyst awareness.',
    examples: [
      {
        query: 'What\'s the technical setup for NVDA ahead of the 50-day test?',
        outcome: 'Technical analysis with key levels, volume profile, and trade recommendations',
      },
      {
        query: 'What catalysts could move the stock in the next 48 hours?',
        outcome: 'Catalyst calendar with probability-weighted impact analysis',
      },
    ],
    capabilities: ['Technical analysis', 'Catalyst tracking', 'Options flow', 'Risk management'],
    color: 'accent',
  },
  {
    id: 'private_equity',
    icon: Building2,
    title: 'Private Equity',
    subtitle: 'Due diligence & value creation',
    description: 'Deep company analysis with competitive positioning and value creation opportunities.',
    examples: [
      {
        query: 'What\'s the competitive moat for the target company in the AI value chain?',
        outcome: 'Moat analysis with competitive dynamics, switching costs, and durability assessment',
      },
      {
        query: 'Who are the likely strategic acquirers for this asset?',
        outcome: 'Buyer universe analysis with strategic fit, precedent transactions, and likelihood scoring',
      },
    ],
    capabilities: ['Due diligence', 'Competitive analysis', 'Value creation', 'Exit planning'],
    color: 'accent',
  },
  {
    id: 'investment_banking',
    icon: Briefcase,
    title: 'Investment Banking',
    subtitle: 'Deal context & market positioning',
    description: 'Market intelligence for deal execution, positioning, and capital markets activity.',
    examples: [
      {
        query: 'What\'s the current market appetite for AI infrastructure IPOs?',
        outcome: 'Market sentiment analysis with comparable transactions and timing recommendations',
      },
      {
        query: 'How should we position this company\'s equity story for the roadshow?',
        outcome: 'Positioning framework with key messages, investor concerns, and peer comparison',
      },
    ],
    capabilities: ['Market analysis', 'Positioning', 'Valuation', 'Capital markets'],
    color: 'accent',
  },
]

export function AliceUseCases() {
  const [activeCase, setActiveCase] = React.useState(useCases[0].id)

  const activeData = useCases.find(c => c.id === activeCase)

  return (
    <Section variant="dark" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-900 via-surface-950 to-surface-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10">
        <SectionHeader
          label="Use Cases"
          title="Built for Capital Markets Professionals"
          subtitle="A.L.I.C.E. adapts to your role, delivering intelligence tailored to your specific workflow and decision-making needs."
          align="center"
          className="text-center mx-auto mb-12"
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[280px,1fr] gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              {useCases.map((useCase) => {
                const Icon = useCase.icon
                const isActive = activeCase === useCase.id
                
                return (
                  <button
                    key={useCase.id}
                    onClick={() => setActiveCase(useCase.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                      isActive 
                        ? 'bg-accent/10 border-accent/40' 
                        : 'bg-surface-800/30 border-border/30 hover:border-border/60 hover:bg-surface-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-accent/20 text-accent' : 'bg-surface-700 text-content-secondary'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium text-sm ${
                          isActive ? 'text-accent' : 'text-content-primary'
                        }`}>
                          {useCase.title}
                        </h4>
                        <p className="text-xs text-content-tertiary truncate">
                          {useCase.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </motion.div>

            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-surface-800/40 border border-border/50 rounded-2xl p-6"
            >
              {activeData && (
                <>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <activeData.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-content-primary">
                        {activeData.title}
                      </h3>
                      <p className="text-sm text-content-secondary mt-1">
                        {activeData.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h4 className="text-xs font-medium text-content-tertiary uppercase tracking-wider">
                      Example Queries
                    </h4>
                    {activeData.examples.map((example, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-surface-700/30 border border-border/30"
                      >
                        <div className="flex items-start gap-3">
                          <Search className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-content-primary font-medium">
                              "{example.query}"
                            </p>
                            <div className="flex items-start gap-2 mt-2">
                              <ArrowRight className="w-3 h-3 text-positive flex-shrink-0 mt-1" />
                              <p className="text-xs text-content-secondary">
                                {example.outcome}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border/30">
                    <h4 className="text-xs font-medium text-content-tertiary uppercase tracking-wider mb-3">
                      Key Capabilities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeData.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-xs text-accent"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default AliceUseCases
