'use client'

import * as React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, PenTool, Sliders, Link, Upload, Maximize } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { DEPLOYMENT_JOURNEY } from '@/lib/constants'
import { cn } from '@/lib/utils'

// Icon map
const iconMap = {
  Search: Search,
  PenTool: PenTool,
  Sliders: Sliders,
  Link: Link,
  Upload: Upload,
  Maximize: Maximize,
}

export function PilotToProduction() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section 
      id="journey" 
      ref={containerRef}
      className="section-main relative overflow-hidden bg-surface-900"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-radial-data opacity-40" />
      
      {/* Accent line */}
      <motion.div
        className="absolute left-0 right-0 h-px top-[5%]"
        style={{ 
          background: 'linear-gradient(90deg, transparent, rgba(48, 107, 255, 0.15) 30%, rgba(48, 107, 255, 0.2) 50%, rgba(48, 107, 255, 0.15) 70%, transparent)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className="container-main relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">The Journey</span>
          <h2 className="section-title">
            <span className="text-content-primary">From Pilot</span>
            <br />
            <span className="gradient-accent">To Production</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A proven methodology that takes AI from concept to enterprise-wide 
            deployment with zero compromise on security or sovereignty.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="relative max-w-5xl mx-auto hidden lg:block">
          {/* Progress line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="h-full bg-border" />
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{ 
                height: lineHeight,
                background: 'linear-gradient(to bottom, var(--data), var(--accent))',
                boxShadow: '0 0 20px rgba(48, 107, 255, 0.3)'
              }}
            />
          </div>

          {/* Journey steps */}
          <div className="space-y-20">
            {DEPLOYMENT_JOURNEY.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap]
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={cn(
                    'relative flex items-center gap-8',
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  )}
                >
                  {/* Content panel */}
                  <div className="flex-1">
                    <Card variant="default" className={cn(
                      'p-6 lg:p-8',
                      isEven ? 'text-right' : 'text-left'
                    )}>
                      {/* Step number and title */}
                      <div className={cn(
                        'flex items-center gap-3 mb-4',
                        isEven ? 'justify-end' : 'justify-start'
                      )}>
                        <span className="text-accent text-sm font-medium uppercase tracking-wider">
                          {step.title}
                        </span>
                        <span className="text-4xl font-bold font-mono text-accent/20 data-mono">
                          {String(step.step).padStart(2, '0')}
                        </span>
                      </div>
                      
                      <p className="text-content-secondary leading-relaxed">
                        {step.description}
                      </p>
                    </Card>
                  </div>

                  {/* Center icon */}
                  <div className="relative z-10 flex items-center justify-center">
                    <motion.div
                      className={cn(
                        'w-14 h-14 rounded flex items-center justify-center',
                        'border border-accent/30',
                        'bg-gradient-to-br from-accent/20 to-accent/10'
                      )}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className="w-6 h-6 text-accent" />
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden space-y-6">
          {DEPLOYMENT_JOURNEY.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap]
            
            return (
              <motion.div
                key={`mobile-${step.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Card variant="default" className="p-5 flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded border border-border bg-accent/5 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-accent text-sm font-medium">
                        {step.title}
                      </span>
                      <span className="text-content-tertiary text-xs font-mono data-mono">
                        Step {String(step.step).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-content-secondary text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 max-[393px]:mt-0"
        >
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { value: '8-12', label: 'weeks to initial deployment' },
              { value: '90%', label: 'project success rate' },
              { value: '5x', label: 'faster than DIY approaches' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded bg-surface-800 border border-border"
              >
                <div className="text-3xl font-bold text-content-primary font-mono mb-2 data-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-content-tertiary uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PilotToProduction
