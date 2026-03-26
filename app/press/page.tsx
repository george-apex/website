'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Newspaper, FileText, Download, ExternalLink } from 'lucide-react'

const pressReleases = [
  {
    date: 'Coming Soon',
    title: 'Press Release',
    excerpt: 'Check back soon for the latest news and announcements from APEXE3.',
  },
]

const assets = [
  {
    name: 'Company Logo Pack',
    description: 'High-resolution logos in various formats (PNG, SVG, EPS)',
    type: 'ZIP',
  },
  {
    name: 'Brand Guidelines',
    description: 'Official brand colors, typography, and usage guidelines',
    type: 'PDF',
  },
  {
    name: 'Executive Bios',
    description: 'Background information on leadership team',
    type: 'PDF',
  },
  {
    name: 'Company Fact Sheet',
    description: 'Key facts and figures about APEXE3',
    type: 'PDF',
  },
]

const contact = {
  name: 'Press Inquiries',
  email: 'press@apexe3.ai',
  phone: '+44 (0) 20 1234 5678',
}

export default function PressPage() {
  return (
    <div className="min-h-screen bg-surface-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
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
                <Newspaper className="w-5 h-5 text-accent" />
              </div>
              <span className="text-label text-accent uppercase tracking-wider">Press & Media</span>
            </div>
            
            <h1 className="text-display-lg font-bold text-content-primary mb-6">
              Press & Media{' '}
              <span className="text-accent">Resources</span>
            </h1>
            
            <p className="text-body-lg text-content-secondary leading-relaxed max-w-3xl">
              Find the latest news, press releases, and media resources for APEXE3. For press inquiries, contact our communications team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Press Releases */}
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
              Press Releases
            </h2>
          </motion.div>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-all duration-300"
              >
                <p className="text-label text-content-tertiary mb-2">{release.date}</p>
                <h3 className="text-heading-sm font-semibold text-content-primary mb-2">
                  {release.title}
                </h3>
                <p className="text-body text-content-secondary">
                  {release.excerpt}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Assets */}
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
              Media Assets
            </h2>
            <p className="text-body-lg text-content-secondary">
              Download official logos, brand assets, and company materials.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {assets.map((asset, index) => (
              <motion.div
                key={asset.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-card border border-border bg-surface-900/50 flex items-start justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-card border border-accent/20 bg-surface-800 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-heading-sm font-semibold text-content-primary mb-1">
                      {asset.name}
                    </h3>
                    <p className="text-body-sm text-content-secondary mb-2">
                      {asset.description}
                    </p>
                    <p className="text-label text-content-tertiary">{asset.type}</p>
                  </div>
                </div>
                <button className="p-2 rounded-card border border-border hover:border-accent/30 hover:bg-surface-800 transition-all duration-200 text-content-secondary hover:text-accent">
                  <Download className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="p-8 rounded-card border border-accent/20 bg-surface-900/50 text-center">
              <h2 className="text-heading-md font-semibold text-content-primary mb-4">
                Press Contact
              </h2>
              <p className="text-body text-content-secondary mb-6">
                For media inquiries, interview requests, or additional information, please contact:
              </p>
              <div className="space-y-2">
                <p className="text-body font-medium text-content-primary">{contact.name}</p>
                <p className="text-body text-content-secondary">
                  <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
                    {contact.email}
                  </a>
                </p>
                <p className="text-body text-content-secondary">{contact.phone}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
