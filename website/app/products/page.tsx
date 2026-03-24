'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Database, Bot, BarChart3, Shield, Zap, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SubNavigation } from '@/components/layout/SubNavigation'

const PRODUCTS_SUB_TABS = [
  { id: 'data-platform', label: 'Data Platform', shortLabel: 'Data', href: '/data-platform' },
  { id: 'agents', label: 'Agents', shortLabel: 'Agents', href: '/agents' },
  { id: 'e3-quant-hub', label: 'E3 Quant Hub', shortLabel: 'Quant Hub', href: '/e3-quant-hub' },
]

const PRODUCTS = [
  {
    id: 'data-platform',
    title: 'Data Platform',
    description: 'Unified data infrastructure for enterprise AI. Connect, transform, and govern your data at scale.',
    icon: Database,
    features: ['Real-time data pipelines', 'Multi-source integration', 'Data governance', 'Schema management'],
    href: '/data-platform',
  },
  {
    id: 'agents',
    title: 'AI Agents',
    description: 'Autonomous AI agents that execute complex workflows, make decisions, and integrate with your systems.',
    icon: Bot,
    features: ['Multi-step task execution', 'Tool integration', 'Human-in-the-loop', 'Continuous learning'],
    href: '/agents',
  },
  {
    id: 'e3-quant-hub',
    title: 'E3 Quant Hub',
    description: 'Advanced quantitative analysis and investment intelligence platform for financial decision-making.',
    icon: BarChart3,
    features: ['Portfolio analytics', 'Risk modeling', 'Market intelligence', 'Conviction scoring'],
    href: '/e3-quant-hub',
  },
]

export default function ProductsPage() {
  const [activeSubTab, setActiveSubTab] = React.useState('data-platform')

  return (
    <div className="relative bg-surface-900 min-h-screen">
      <SubNavigation activeSubTab={activeSubTab} onSubTabClick={setActiveSubTab} />
      
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-radial-accent opacity-20 pointer-events-none z-0" />

      <div className="relative z-10 pt-28">
        <section className="py-16 lg:py-24">
          <div className="container-main">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Products</span>
              <h1 className="section-title">
                <span className="text-content-primary">Enterprise AI</span>{' '}
                <span className="gradient-accent">Platform</span>
              </h1>
              <p className="section-subtitle mx-auto">
                A comprehensive suite of AI products designed for enterprise scale, security, and sovereignty.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((product, index) => {
                const Icon = product.icon
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card variant="interactive" className="p-6 h-full group">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg border border-accent/30 bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-content-primary group-hover:text-accent transition-colors">
                            {product.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-content-secondary mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-content-tertiary">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <a
                        href={product.href}
                        className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Schedule Demo
                </Button>
                <Button variant="secondary" size="lg">
                  View Documentation
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
