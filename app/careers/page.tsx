'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const benefits = [
  'Competitive compensation',
  'Equity participation',
  'Remote-first culture',
  'Flexible working hours',
  'Professional development',
  'Health & wellness benefits',
  'Conference & learning budget',
  'Modern equipment budget',
]

const departments = [
  {
    name: 'Engineering',
    roles: 0,
    description: 'Build the AI infrastructure that powers enterprise transformation.',
  },
  {
    name: 'Product',
    roles: 0,
    description: 'Shape the vision and roadmap for enterprise AI solutions.',
  },
  {
    name: 'Customer Success',
    roles: 0,
    description: 'Ensure our customers achieve real operational impact.',
  },
  {
    name: 'Sales & Marketing',
    roles: 0,
    description: 'Connect enterprises with AI solutions that transform their operations.',
  },
]

export default function CareersPage() {
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
                <Briefcase className="w-5 h-5 text-accent" />
              </div>
              <span className="text-label text-accent uppercase tracking-wider">Careers</span>
            </div>
            
            <h1 className="text-display-lg font-bold text-content-primary mb-6">
              Build the Future of{' '}
              <span className="text-accent">Enterprise AI</span>
            </h1>
            
            <p className="text-body-lg text-content-secondary leading-relaxed max-w-3xl">
              We're looking for people who believe AI should work in production, not just in demos. Join us in building AI infrastructure that enterprises can trust, deploy, and scale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Open Positions Notice */}
      <section className="py-16 border-t border-border">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="p-8 rounded-card border border-border bg-surface-900/50">
              <h2 className="text-heading-md font-semibold text-content-primary mb-4">
                No Open Positions Currently
              </h2>
              <p className="text-body text-content-secondary mb-6">
                We're not actively hiring at the moment, but we're always interested in connecting with talented individuals who share our vision for enterprise AI.
              </p>
              <p className="text-body-sm text-content-secondary">
                Send your resume to{' '}
                <a href="mailto:careers@apexe3.ai" className="text-accent hover:underline">
                  careers@apexe3.ai
                </a>
                {' '}and we'll reach out when a suitable role opens up.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Departments Section */}
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
              Our Teams
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl mx-auto">
              Explore the teams building enterprise AI infrastructure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-all duration-300"
              >
                <h3 className="text-heading-sm font-semibold text-content-primary mb-2">
                  {dept.name}
                </h3>
                <p className="text-body-sm text-content-secondary mb-4">
                  {dept.description}
                </p>
                <p className="text-label text-accent uppercase tracking-wider">
                  {dept.roles} open roles
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Benefits & Perks
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl mx-auto">
              We believe in taking care of our team
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-4 rounded-card border border-border bg-surface-900/30 text-center"
              >
                <p className="text-body-sm text-content-primary">{benefit}</p>
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
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-heading-md font-semibold text-content-primary mb-4">
              Don't see a role that fits?
            </h2>
            <p className="text-body text-content-secondary mb-8">
              We're always looking for exceptional talent. Reach out and tell us how you could contribute to our mission.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-surface-950 font-medium rounded-card hover:bg-accent-light transition-colors duration-200"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
