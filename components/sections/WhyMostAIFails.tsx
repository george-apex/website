'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { XCircle, EyeOff, Unlink, Users, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'
import { Section } from '@/components/ui/section'

// Icon map
const iconMap = {
  XCircle: XCircle,
  EyeOff: EyeOff,
  Unlink: Unlink,
  Users: Users,
  ShieldAlert: ShieldAlert,
}

// Failure points - simplified
const failurePoints = [
  { icon: 'XCircle', title: 'Generic Workflows' },
  { icon: 'EyeOff', title: 'Black-Box Models' },
  { icon: 'Unlink', title: 'Integration Gaps' },
  { icon: 'Users', title: 'Scale Barriers' },
  { icon: 'ShieldAlert', title: 'Compliance Concerns' },
]

// Stats
const stats = [
  { value: '87%', label: 'fail to reach production' },
  { value: '18mo', label: 'avg. pilot to deploy' },
  { value: '3x', label: 'success with APEXE3' },
]

export function WhyMostAIFails() {
  return (
    <Section id="why-fails" className="relative overflow-hidden">
      {/* Warning accent line */}
      <div className="absolute left-0 right-0 top-1/4 h-px bg-gradient-to-r from-transparent via-negative/20 to-transparent" />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left side - Problem */}
        <div>
          <Badge variant="negative" className="mb-4">
            The Problem
          </Badge>
          <h2 className="text-display-lg lg:text-display-xl text-content-primary font-medium mb-6">
            Why Most AI Pilots
            <br />
            <span className="text-negative">Never Reach Production</span>
          </h2>

          {/* Failure points - compact grid */}
          <div className="grid grid-cols-2 gap-3">
            {failurePoints.map((point, index) => {
              const Icon = iconMap[point.icon as keyof typeof iconMap]
              
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex items-center gap-3 p-3 rounded-lg border border-negative/10 bg-negative/5"
                >
                  <Icon className="w-4 h-4 text-negative shrink-0" />
                  <span className="text-body-sm text-content-secondary">{point.title}</span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right side - Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card variant="panel" padding="lg">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-card bg-accent flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-surface-900" />
              </div>
              <div>
                <Badge variant="default" size="sm">The Solution</Badge>
                <h3 className="text-display-sm text-content-primary font-medium mt-1">APEXE3 Approach</h3>
              </div>
            </div>

            {/* Key points */}
            <ul className="space-y-3 mb-8">
              {[
                'AI built for your workflows',
                'Full sovereignty & control',
                'Deep system integration',
                'Proven user adoption',
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-body-sm text-content-secondary">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button className="w-full group">
              See How We Deploy
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Stats bar - simplified */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 grid grid-cols-3 gap-4"
      >
        {stats.map((stat, index) => (
          <Card key={index} variant="default" padding="md" className="text-center">
            <div className="text-display-sm font-mono text-content-primary mb-1">{stat.value}</div>
            <div className="text-terminal-sm text-content-tertiary uppercase tracking-wider">{stat.label}</div>
          </Card>
        ))}
      </motion.div>
    </Section>
  )
}

export default WhyMostAIFails
