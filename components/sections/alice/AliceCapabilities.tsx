'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/section'
import { 
  Split, 
  Network, 
  Sparkles, 
  Target,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Clock,
  TrendingUp
} from 'lucide-react'

const capabilities = [
  {
    id: 'decomposition',
    icon: Split,
    title: 'Task Decomposition',
    description: 'Breaks complex natural language prompts into discrete, manageable sub-tasks for specialized processing.',
    features: [
      'Intent recognition and classification',
      'Multi-step query planning',
      'Dependency mapping between tasks',
      'Parallel task identification',
    ],
    stats: {
      value: '3.2s',
      label: 'Avg. decomposition time',
    },
    color: 'accent',
  },
  {
    id: 'orchestration',
    icon: Network,
    title: 'Tool Orchestration',
    description: 'Routes each sub-task to the optimal agentic tool based on task type, data requirements, and context.',
    features: [
      'Dynamic tool selection',
      'Multi-agent coordination',
      'Load balancing across agents',
      'Fallback and retry logic',
    ],
    stats: {
      value: '12+',
      label: 'Specialized agents',
    },
    color: 'accent',
  },
  {
    id: 'synthesis',
    icon: Sparkles,
    title: 'Evidence Synthesis',
    description: 'Combines outputs from multiple agents into coherent, structured intelligence with full traceability.',
    features: [
      'Cross-referencing and validation',
      'Conflict resolution',
      'Source attribution',
      'Confidence scoring',
    ],
    stats: {
      value: '47',
      label: 'Avg. sources per query',
    },
    color: 'accent',
  },
  {
    id: 'confidence',
    icon: Target,
    title: 'Decision Confidence',
    description: 'Provides conviction scores, risk flags, and uncertainty quantification for every output.',
    features: [
      'Numerical conviction scores',
      'Risk flag identification',
      'Uncertainty ranges',
      'Sensitivity analysis',
    ],
    stats: {
      value: '94%',
      label: 'Accuracy rate',
    },
    color: 'positive',
  },
]

export function AliceCapabilities() {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)

  return (
    <Section variant="dark" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-surface-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        <SectionHeader
          label="Core Capabilities"
          title="Intelligence at Every Step"
          subtitle="A.L.I.C.E. orchestrates multiple AI capabilities to transform natural language queries into structured, decision-ready intelligence."
          align="center"
          className="text-center mx-auto mb-16"
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon
            const isHovered = hoveredId === capability.id
            
            return (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative group p-6 rounded-2xl border transition-all duration-300 ${
                  isHovered 
                    ? 'bg-surface-800/80 border-accent/40 shadow-lg shadow-accent/10' 
                    : 'bg-surface-800/40 border-border/50 hover:border-accent/30'
                }`}
                onMouseEnter={() => setHoveredId(capability.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${
                    capability.color === 'positive' ? 'bg-positive/20' : 'bg-accent/20'
                  } flex items-center justify-center transition-transform duration-300 ${
                    isHovered ? 'scale-110' : ''
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      capability.color === 'positive' ? 'text-positive' : 'text-accent'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-content-primary mb-1">
                      {capability.title}
                    </h3>
                    <p className="text-sm text-content-secondary">
                      {capability.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {capability.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-center gap-2 text-xs text-content-secondary"
                    >
                      <CheckCircle2 className="w-3 h-3 text-accent flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className={`pt-4 border-t ${
                  isHovered ? 'border-accent/30' : 'border-border/30'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-2xl font-bold ${
                        capability.color === 'positive' ? 'text-positive' : 'text-accent'
                      }`}>
                        {capability.stats.value}
                      </span>
                      <p className="text-xs text-content-tertiary mt-0.5">
                        {capability.stats.label}
                      </p>
                    </div>
                    <motion.div
                      animate={{ x: isHovered ? 4 : 0 }}
                      className={`p-2 rounded-lg ${
                        isHovered ? 'bg-accent/20' : 'bg-surface-700/50'
                      } transition-colors`}
                    >
                      <ArrowRight className={`w-4 h-4 ${
                        isHovered ? 'text-accent' : 'text-content-tertiary'
                      }`} />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-border/30"
        >
          <div className="flex items-center gap-2 text-sm text-content-secondary">
            <Clock className="w-4 h-4 text-accent" />
            <span>Real-time processing</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-content-secondary">
            <Shield className="w-4 h-4 text-accent" />
            <span>Enterprise-grade security</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-content-secondary">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span>Continuous learning</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-content-secondary">
            <Zap className="w-4 h-4 text-accent" />
            <span>Sub-5s response time</span>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

export default AliceCapabilities
