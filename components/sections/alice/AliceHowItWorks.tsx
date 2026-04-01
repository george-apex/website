'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/section'
import { 
  MessageSquare, 
  Split, 
  Network, 
  Cpu,
  Sparkles,
  FileCheck,
  ArrowRight,
  Zap,
  Clock,
  Database,
  Shield
} from 'lucide-react'

const steps = [
  {
    id: 1,
    icon: MessageSquare,
    title: 'Submit Your Query',
    description: 'Enter a natural language question about any investment topic. No special syntax required.',
    details: [
      'Plain English queries',
      'Context-aware understanding',
      'Multi-part questions supported',
    ],
    timing: '< 1s',
  },
  {
    id: 2,
    icon: Split,
    title: 'Task Decomposition',
    description: 'A.L.I.C.E. analyzes your query and breaks it into discrete sub-tasks for specialized processing.',
    details: [
      'Intent classification',
      'Dependency mapping',
      'Parallel task identification',
    ],
    timing: '1-2s',
  },
  {
    id: 3,
    icon: Network,
    title: 'Agent Orchestration',
    description: 'Each sub-task is routed to the optimal AI agent based on task type and data requirements.',
    details: [
      'Dynamic agent selection',
      'Load balancing',
      'Fallback handling',
    ],
    timing: '2-3s',
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'Evidence Synthesis',
    description: 'Outputs from multiple agents are combined, cross-referenced, and validated.',
    details: [
      'Source attribution',
      'Conflict resolution',
      'Confidence scoring',
    ],
    timing: '3-4s',
  },
  {
    id: 5,
    icon: FileCheck,
    title: 'Structured Output',
    description: 'Receive decision-ready intelligence with conviction scores, risk flags, and cited evidence.',
    details: [
      'Executive summary',
      'Key findings',
      'Actionable recommendations',
    ],
    timing: '4-5s',
  },
]

export function AliceHowItWorks() {
  const [activeStep, setActiveStep] = React.useState(1)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % steps.length) + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Section variant="dark" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-surface-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        <SectionHeader
          label="How It Works"
          title="From Query to Intelligence in Seconds"
          subtitle="A.L.I.C.E. orchestrates multiple AI capabilities to transform your questions into structured, actionable intelligence."
          align="center"
          className="text-center mx-auto mb-16"
        />

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = activeStep === step.id
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div
                      className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? 'bg-accent/10 border-accent/40 shadow-lg shadow-accent/10' 
                          : 'bg-surface-800/30 border-border/30 hover:border-border/60'
                      }`}
                      onClick={() => setActiveStep(step.id)}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className={`relative mb-3`}>
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            isActive ? 'bg-accent/20 scale-110' : 'bg-surface-700'
                          }`}>
                            <Icon className={`w-6 h-6 transition-colors ${
                              isActive ? 'text-accent' : 'text-content-secondary'
                            }`} />
                          </div>
                          {isActive && (
                            <motion.div
                              layoutId="stepGlow"
                              className="absolute inset-0 rounded-xl bg-accent/20 blur-xl"
                            />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-mono ${
                            isActive ? 'text-accent' : 'text-content-tertiary'
                          }`}>
                            {String(step.id).padStart(2, '0')}
                          </span>
                          <h4 className={`text-sm font-medium ${
                            isActive ? 'text-accent' : 'text-content-primary'
                          }`}>
                            {step.title}
                          </h4>
                        </div>
                        
                        <p className="text-xs text-content-secondary line-clamp-2">
                          {step.description}
                        </p>
                        
                        <div className={`mt-3 px-2 py-1 rounded text-xs font-mono ${
                          isActive 
                            ? 'bg-accent/20 text-accent' 
                            : 'bg-surface-700 text-content-tertiary'
                        }`}>
                          {step.timing}
                        </div>
                      </div>
                    </div>

                    {index < steps.length - 1 && (
                      <div className="hidden lg:flex absolute top-1/2 -right-2 z-10 -translate-y-1/2">
                        <ArrowRight className={`w-4 h-4 transition-colors ${
                          isActive ? 'text-accent' : 'text-border'
                        }`} />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 p-6 rounded-2xl bg-surface-800/50 border border-border/50"
          >
            {(() => {
              const step = steps.find(s => s.id === activeStep)
              if (!step) return null
              
              return (
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-content-primary">
                          {step.title}
                        </h3>
                        <p className="text-xs text-content-tertiary">Step {step.id} of {steps.length}</p>
                      </div>
                    </div>
                    <p className="text-content-secondary mb-4">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.details.map((detail) => (
                        <span
                          key={detail}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-700/50 text-xs text-content-secondary"
                        >
                          <Zap className="w-3 h-3 text-accent" />
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-surface-700/30 border border-border/30 text-center">
                      <Clock className="w-5 h-5 text-accent mx-auto mb-2" />
                      <div className="text-lg font-bold text-content-primary">{step.timing}</div>
                      <div className="text-xs text-content-tertiary">Processing</div>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-700/30 border border-border/30 text-center">
                      <Database className="w-5 h-5 text-accent mx-auto mb-2" />
                      <div className="text-lg font-bold text-content-primary">47+</div>
                      <div className="text-xs text-content-tertiary">Data Sources</div>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-700/30 border border-border/30 text-center">
                      <Shield className="w-5 h-5 text-accent mx-auto mb-2" />
                      <div className="text-lg font-bold text-content-primary">100%</div>
                      <div className="text-xs text-content-tertiary">Traceable</div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default AliceHowItWorks
