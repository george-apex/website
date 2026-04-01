'use client'

import * as React from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/section'
import { 
  Zap, 
  Target, 
  Database, 
  Shield,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

const metrics = [
  {
    icon: Clock,
    value: 4.2,
    suffix: 's',
    label: 'Average Response Time',
    description: 'From query submission to structured intelligence output',
    color: 'accent',
  },
  {
    icon: Database,
    value: 47,
    suffix: '+',
    label: 'Data Sources Per Query',
    description: 'Comprehensive evidence gathering across structured and unstructured data',
    color: 'accent',
  },
  {
    icon: Target,
    value: 94,
    suffix: '%',
    label: 'Accuracy Rate',
    description: 'Validated against ground truth in production environments',
    color: 'positive',
  },
  {
    icon: Shield,
    value: 100,
    suffix: '%',
    label: 'Source Attribution',
    description: 'Every insight traced back to original sources',
    color: 'accent',
  },
]

const performanceData = [
  { label: 'Task Decomposition', value: 95, description: 'Accuracy in breaking down complex queries' },
  { label: 'Agent Selection', value: 92, description: 'Optimal agent routing for task type' },
  { label: 'Evidence Synthesis', value: 89, description: 'Coherent output from multiple sources' },
  { label: 'Risk Detection', value: 97, description: 'Identification of potential risk factors' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const [displayValue, setDisplayValue] = React.useState(0)

  React.useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  React.useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })
  }, [springValue])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  )
}

export function AliceMetrics() {
  return (
    <Section variant="dark" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-900 to-surface-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        <SectionHeader
          label="Performance Metrics"
          title="Enterprise-Grade Intelligence at Scale"
          subtitle="A.L.I.C.E. delivers consistent, reliable performance across thousands of queries daily."
          align="center"
          className="text-center mx-auto mb-16"
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-6 rounded-2xl bg-surface-800/40 border border-border/50 text-center group hover:border-accent/30 transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className={`relative w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                    metric.color === 'positive' ? 'bg-positive/20' : 'bg-accent/20'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      metric.color === 'positive' ? 'text-positive' : 'text-accent'
                    }`} />
                  </div>
                  
                  <div className={`text-4xl font-bold mb-2 ${
                    metric.color === 'positive' ? 'text-positive' : 'text-accent'
                  }`}>
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                  
                  <h4 className="text-sm font-medium text-content-primary mb-1">
                    {metric.label}
                  </h4>
                  
                  <p className="text-xs text-content-tertiary">
                    {metric.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-surface-800/40 border border-border/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-content-primary">
                  Component Performance
                </h3>
                <p className="text-sm text-content-tertiary">
                  Accuracy metrics across A.L.I.C.E. processing stages
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-content-tertiary">
                <TrendingUp className="w-4 h-4 text-positive" />
                <span>Updated in real-time</span>
              </div>
            </div>

            <div className="space-y-4">
              {performanceData.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-sm text-content-primary">{item.label}</span>
                    </div>
                    <span className="text-sm font-medium text-accent">{item.value}%</span>
                  </div>
                  <div className="relative h-2 bg-surface-700 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-accent-light rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                    />
                  </div>
                  <p className="text-xs text-content-tertiary mt-1">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-content-secondary"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>Sub-5s response time</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>SOC 2 Type II compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-accent" />
              <span>On-premise deployment</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default AliceMetrics
