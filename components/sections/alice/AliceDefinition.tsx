'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/section'
import { 
  MessageSquare, 
  Split, 
  Cpu, 
  Network, 
  Sparkles, 
  FileCheck,
  ArrowRight,
  Zap,
  Target,
  Shield
} from 'lucide-react'

const flowSteps = [
  {
    id: 'prompt',
    icon: MessageSquare,
    label: 'Natural Language Prompt',
    description: 'User submits a complex query in plain language',
    color: 'text-accent',
    bgColor: 'bg-accent/20',
  },
  {
    id: 'decompose',
    icon: Split,
    label: 'Task Decomposition',
    description: 'A.L.I.C.E. breaks the prompt into discrete sub-tasks',
    color: 'text-accent',
    bgColor: 'bg-accent/20',
  },
  {
    id: 'orchestrate',
    icon: Network,
    label: 'Agent Orchestration',
    description: 'Each task is routed to specialized agentic tools',
    color: 'text-accent',
    bgColor: 'bg-accent/20',
  },
  {
    id: 'synthesize',
    icon: Sparkles,
    label: 'Evidence Synthesis',
    description: 'Outputs are combined and cross-referenced',
    color: 'text-accent',
    bgColor: 'bg-accent/20',
  },
  {
    id: 'output',
    icon: FileCheck,
    label: 'Structured Intelligence',
    description: 'Decision-ready output with confidence scores',
    color: 'text-positive',
    bgColor: 'bg-positive/20',
  },
]

const keyPoints = [
  {
    icon: Cpu,
    title: 'Multi-Agent Orchestration',
    description: 'Coordinates multiple specialized AI agents to handle different aspects of complex queries.',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade',
    description: 'Built for capital markets with compliance, audit trails, and explainability at every step.',
  },
  {
    icon: Target,
    title: 'Decision-Ready Output',
    description: 'Not just text—structured intelligence with conviction scores, risk flags, and cited evidence.',
  },
]

export function AliceDefinition() {
  const [activeStep, setActiveStep] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Section variant="dark" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-900 to-surface-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10">
        <SectionHeader
          label="What Is A.L.I.C.E.?"
          title="An Agentic Harness for Capital Markets"
          subtitle="A.L.I.C.E. is an enterprise-grade orchestration layer that decomposes complex prompts, routes tasks to specialized AI agents, and synthesizes structured, decision-ready intelligence."
          align="center"
          className="text-center mx-auto mb-16"
        />

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {flowSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = activeStep === index
                
                return (
                  <motion.div
                    key={step.id}
                    className={`relative flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 ${
                      isActive 
                        ? 'bg-accent/10 border-accent/40' 
                        : 'bg-surface-800/30 border-border/30'
                    }`}
                    animate={{
                      scale: isActive ? 1.02 : 1,
                    }}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${step.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-content-tertiary font-mono">0{index + 1}</span>
                        <h4 className={`font-medium ${isActive ? 'text-accent' : 'text-content-primary'}`}>
                          {step.label}
                        </h4>
                      </div>
                      <p className="text-sm text-content-secondary mt-1">
                        {step.description}
                      </p>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <Zap className="w-4 h-4 text-accent" />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent rounded-3xl blur-3xl" />
              
              <div className="relative bg-surface-800/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Network className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-content-primary">Agentic Harness</h3>
                    <p className="text-sm text-content-tertiary">Intelligent task orchestration</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {keyPoints.map((point, index) => {
                    const Icon = point.icon
                    return (
                      <motion.div
                        key={point.title}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-surface-700/50 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-content-primary">{point.title}</h4>
                          <p className="text-xs text-content-secondary mt-0.5">{point.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-content-tertiary">Average processing time</span>
                    <span className="text-accent font-medium">4.2 seconds</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default AliceDefinition
