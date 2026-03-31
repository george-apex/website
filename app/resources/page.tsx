'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Video, BookOpen, Presentation, ExternalLink } from 'lucide-react'

const whitepapers = [
  {
    title: 'Enterprise AI Sovereignty',
    description: 'Why owning your AI infrastructure matters for regulated industries.',
    type: 'Whitepaper',
    pages: 24,
  },
  {
    title: 'The Last Mile Problem in AI',
    description: 'Bridging the gap between AI prototypes and production deployment.',
    type: 'Whitepaper',
    pages: 18,
  },
  {
    title: 'Security-First AI Architecture',
    description: 'Building AI systems that meet enterprise security requirements.',
    type: 'Technical Brief',
    pages: 12,
  },
  {
    title: 'ROI of Enterprise AI Agents',
    description: 'Measuring and maximizing the business value of AI deployment.',
    type: 'Report',
    pages: 16,
  },
]

const caseStudies = [
  {
    title: 'Global Investment Bank',
    industry: 'Financial Services',
    result: '40% reduction in compliance review time',
    summary: 'How A.L.I.C.E. automated regulatory document analysis for a tier-1 investment bank.',
  },
  {
    title: 'Healthcare Network',
    industry: 'Healthcare',
    result: '60% faster patient data processing',
    summary: 'Deploying AI agents for secure medical record analysis at scale.',
  },
  {
    title: 'Manufacturing Leader',
    industry: 'Industrial',
    result: '25% improvement in supply chain efficiency',
    summary: 'Real-time supply chain intelligence with autonomous AI agents.',
  },
]

export default function ResourcesPage() {
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
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <span className="text-label text-accent uppercase tracking-wider">Resources</span>
            </div>
            
            <h1 className="text-display-lg font-bold text-content-primary mb-6">
              Knowledge for{' '}
              <span className="text-accent">Enterprise AI Leaders</span>
            </h1>
            
            <p className="text-body-lg text-content-secondary leading-relaxed max-w-3xl">
              Whitepapers, case studies, and insights to help you navigate the complexities of enterprise AI deployment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Whitepapers Section */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-display-md font-bold text-content-primary mb-4">
              Whitepapers & Reports
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl">
              In-depth research and analysis on enterprise AI strategy and implementation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {whitepapers.map((paper, index) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-card border border-accent/20 bg-surface-800 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <span className="text-label text-content-tertiary uppercase">{paper.type}</span>
                      <p className="text-body-sm text-content-tertiary">{paper.pages} pages</p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-content-tertiary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-heading-sm font-semibold text-content-primary mb-2">
                  {paper.title}
                </h3>
                <p className="text-body-sm text-content-secondary">
                  {paper.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-display-md font-bold text-content-primary mb-4">
              Case Studies
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl">
              Real-world results from enterprises deploying APEXE3 AI agents.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <span className="text-label text-accent uppercase tracking-wider">{study.industry}</span>
                <h3 className="text-heading-md font-semibold text-content-primary mt-2 mb-3">
                  {study.title}
                </h3>
                <p className="text-body-sm text-content-secondary mb-4">
                  {study.summary}
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-body-sm font-medium text-accent">
                    {study.result}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-content-tertiary group-hover:text-accent transition-colors">
                  <span className="text-body-sm">Read case study</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
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
              Stay Informed
            </h2>
            <p className="text-body-lg text-content-secondary mb-8">
              Get the latest insights on enterprise AI delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-card border border-border bg-surface-900 text-content-primary placeholder:text-content-tertiary focus:border-accent/50 focus:outline-none"
              />
              <button className="px-6 py-3 rounded-card bg-accent text-surface-950 font-medium hover:bg-accent/90 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
