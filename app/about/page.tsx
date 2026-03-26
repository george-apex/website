'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Lightbulb, Award } from 'lucide-react'

const values = [
  {
    icon: Users,
    title: 'Sovereignty First',
    description: 'We believe enterprises should own their AI infrastructure, data, and decisions. Our solutions are built to preserve your autonomy.',
  },
  {
    icon: Target,
    title: 'Last-Mile Focus',
    description: 'We don\'t stop at the demo. Our commitment extends to full production deployment and real operational impact.',
  },
  {
    icon: Lightbulb,
    title: 'Bespoke Solutions',
    description: 'Every enterprise is unique. We build AI agents tailored to your specific workflows, not generic templates.',
  },
  {
    icon: Award,
    title: 'Enterprise Trust',
    description: 'Security, compliance, and governance aren\'t afterthoughts—they\'re foundational to everything we build.',
  },
]

const team = [
  {
    name: 'Leadership Team',
    role: 'Executive Leadership',
    description: 'Our leadership brings decades of experience in enterprise technology, AI research, and regulated industries.',
  },
  {
    name: 'Engineering Team',
    role: 'AI & Platform Engineering',
    description: 'World-class engineers building production-grade AI systems with deep expertise in ML, distributed systems, and security.',
  },
  {
    name: 'Customer Success',
    role: 'Delivery & Support',
    description: 'Dedicated teams ensuring your AI deployment succeeds from pilot to production and beyond.',
  },
]

export default function AboutPage() {
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
                <Users className="w-5 h-5 text-accent" />
              </div>
              <span className="text-label text-accent uppercase tracking-wider">About Us</span>
            </div>
            
            <h1 className="text-display-lg font-bold text-content-primary mb-6">
              Building AI That{' '}
              <span className="text-accent">Respects Enterprise Reality</span>
            </h1>
            
            <p className="text-body-lg text-content-secondary leading-relaxed max-w-3xl">
              APEXE3 was founded on a simple belief: enterprise AI shouldn't require enterprises to compromise on sovereignty, security, or operational fit. We build AI agents that deploy where you need them, adapt to your workflows, and deliver real impact at scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-md font-bold text-content-primary mb-4">
              Our Values
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl mx-auto">
              The principles that guide everything we build
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-card border border-accent/20 bg-surface-800 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-heading-sm font-semibold text-content-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-body-sm text-content-secondary">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-display-md font-bold text-content-primary mb-4">
              Our Team
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl mx-auto">
              Experts in enterprise AI, security, and operational deployment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((group, index) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-card border border-border bg-surface-900/50 text-center"
              >
                <h3 className="text-heading-md font-semibold text-content-primary mb-2">
                  {group.name}
                </h3>
                <p className="text-label text-accent uppercase tracking-wider mb-4">
                  {group.role}
                </p>
                <p className="text-body-sm text-content-secondary">
                  {group.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-display-md font-bold text-content-primary mb-6">
              Our Mission
            </h2>
            <p className="text-body-lg text-content-secondary leading-relaxed mb-8">
              We exist to bridge the gap between AI potential and operational reality. While others build AI that works in demos, we build AI that works in production—at enterprise scale, with enterprise security, and with respect for enterprise sovereignty.
            </p>
            <div className="p-8 rounded-card border border-accent/20 bg-surface-900/50">
              <p className="text-heading-md font-medium text-content-primary italic">
                "The last mile of AI isn't about technology—it's about trust, fit, and deployment."
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
