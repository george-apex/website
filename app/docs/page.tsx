'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Book, Code, FileText, Layers, Terminal, Zap } from 'lucide-react'

const docCategories = [
  {
    icon: Terminal,
    title: 'Getting Started',
    description: 'Quick start guides and installation instructions for ALICE and our platform.',
    links: ['Quick Start Guide', 'Installation', 'Configuration', 'First AI Agent'],
  },
  {
    icon: Code,
    title: 'API Reference',
    description: 'Complete API documentation for integrating APEXE3 into your workflows.',
    links: ['Authentication', 'Endpoints', 'SDKs', 'Error Handling'],
  },
  {
    icon: Layers,
    title: 'Platform Architecture',
    description: 'Technical documentation on our enterprise AI infrastructure.',
    links: ['System Overview', 'Data Flow', 'Security Model', 'Scaling'],
  },
  {
    icon: FileText,
    title: 'Integration Guides',
    description: 'Step-by-step guides for connecting your enterprise systems.',
    links: ['Database Connections', 'API Integration', 'SSO Setup', 'Webhooks'],
  },
]

const resources = [
  {
    icon: Book,
    title: 'Tutorials',
    count: '12+ guides',
  },
  {
    icon: Zap,
    title: 'Code Examples',
    count: '50+ samples',
  },
  {
    icon: FileText,
    title: 'Whitepapers',
    count: '8 papers',
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-surface-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-card border border-accent/30 bg-surface-800 flex items-center justify-center">
                <Book className="w-5 h-5 text-accent" />
              </div>
              <span className="text-label text-accent uppercase tracking-wider">Documentation</span>
            </div>
            
            <h1 className="text-display-lg font-bold text-content-primary mb-6">
              Build with{' '}
              <span className="text-accent">Confidence</span>
            </h1>
            
            <p className="text-body-lg text-content-secondary leading-relaxed max-w-3xl">
              Comprehensive documentation for integrating, deploying, and scaling enterprise AI agents with APEXE3. From quick starts to deep technical references.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 border-t border-border">
        <div className="container-main">
          <div className="flex flex-wrap gap-4">
            {resources.map((resource) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 px-6 py-3 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-colors"
              >
                <resource.icon className="w-5 h-5 text-accent" />
                <span className="text-body font-medium text-content-primary">{resource.title}</span>
                <span className="text-label text-content-tertiary">{resource.count}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-6">
            {docCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-card border border-accent/20 bg-surface-800 flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-heading-md font-semibold text-content-primary mb-2">
                  {category.title}
                </h3>
                <p className="text-body-sm text-content-secondary mb-4">
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.links.map((link) => (
                    <li key={link}>
                      <span className="text-body-sm text-content-tertiary hover:text-accent cursor-pointer transition-colors">
                        → {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-display-md font-bold text-content-primary mb-4">
              Need Help?
            </h2>
            <p className="text-body-lg text-content-secondary mb-8">
              Our team is ready to assist with your integration and deployment questions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 rounded-card bg-accent text-surface-950 font-medium hover:bg-accent/90 transition-colors">
                Contact Support
              </button>
              <button className="px-6 py-3 rounded-card border border-border text-content-primary hover:border-accent/30 transition-colors">
                Schedule a Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
