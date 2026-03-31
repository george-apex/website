'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Video, Calendar, Clock, Play, Users, ArrowRight } from 'lucide-react'

const upcomingWebinars = [
  {
    title: 'Enterprise AI Deployment: From Pilot to Production',
    date: 'Coming Soon',
    time: '10:00 AM PST',
    duration: '60 min',
    description: 'Learn the critical steps for taking AI from proof-of-concept to full production deployment.',
    speaker: 'APEXE3 Solutions Team',
    spots: 'Limited seats',
  },
  {
    title: 'Security & Compliance in Enterprise AI',
    date: 'Coming Soon',
    time: '11:00 AM PST',
    duration: '45 min',
    description: 'Best practices for building AI systems that meet regulatory requirements.',
    speaker: 'APEXE3 Security Team',
    spots: 'Limited seats',
  },
  {
    title: 'Building Custom AI Agents with A.L.I.C.E.',
    date: 'Coming Soon',
    time: '2:00 PM PST',
    duration: '90 min',
    description: 'Technical deep-dive into configuring and deploying custom AI agents.',
    speaker: 'APEXE3 Engineering Team',
    spots: 'Limited seats',
  },
]

const onDemandWebinars = [
  {
    title: 'The Sovereignty Imperative in Enterprise AI',
    duration: '52 min',
    views: '1.2K views',
    description: 'Why enterprises need to own their AI infrastructure and how to achieve it.',
  },
  {
    title: 'AI in Regulated Industries: A Practical Guide',
    duration: '67 min',
    views: '2.4K views',
    description: 'Navigating compliance requirements when deploying AI in finance and healthcare.',
  },
  {
    title: 'The Last Mile: Making AI Work in Production',
    duration: '45 min',
    views: '3.1K views',
    description: 'Real-world lessons from deploying AI agents at enterprise scale.',
  },
]

export default function WebinarsPage() {
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
                <Video className="w-5 h-5 text-accent" />
              </div>
              <span className="text-label text-accent uppercase tracking-wider">Webinars</span>
            </div>
            
            <h1 className="text-display-lg font-bold text-content-primary mb-6">
              Learn from{' '}
              <span className="text-accent">Enterprise AI Experts</span>
            </h1>
            
            <p className="text-body-lg text-content-secondary leading-relaxed max-w-3xl">
              Live sessions and on-demand content covering enterprise AI strategy, deployment, and best practices from the APEXE3 team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Webinars */}
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
              Upcoming Sessions
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl">
              Register for live webinars and interactive Q&A sessions.
            </p>
          </motion.div>

          <div className="space-y-6">
            {upcomingWebinars.map((webinar, index) => (
              <motion.div
                key={webinar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <span className="flex items-center gap-2 text-label text-accent">
                        <Calendar className="w-4 h-4" />
                        {webinar.date}
                      </span>
                      <span className="flex items-center gap-2 text-label text-content-tertiary">
                        <Clock className="w-4 h-4" />
                        {webinar.time} · {webinar.duration}
                      </span>
                    </div>
                    <h3 className="text-heading-md font-semibold text-content-primary mb-2">
                      {webinar.title}
                    </h3>
                    <p className="text-body-sm text-content-secondary mb-3">
                      {webinar.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-body-sm text-content-tertiary">
                        Speaker: {webinar.speaker}
                      </span>
                      <span className="flex items-center gap-1 text-body-sm text-accent">
                        <Users className="w-4 h-4" />
                        {webinar.spots}
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-card bg-accent text-surface-950 font-medium hover:bg-accent/90 transition-colors">
                    Register Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* On-Demand Webinars */}
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
              On-Demand Library
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl">
              Watch past sessions anytime, anywhere.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {onDemandWebinars.map((webinar, index) => (
              <motion.div
                key={webinar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <div className="w-full aspect-video rounded-card bg-surface-800 mb-4 flex items-center justify-center border border-border group-hover:border-accent/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <Play className="w-5 h-5 text-accent ml-0.5" />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-label text-content-tertiary">{webinar.duration}</span>
                  <span className="text-label text-content-tertiary">{webinar.views}</span>
                </div>
                <h3 className="text-heading-sm font-semibold text-content-primary mb-2">
                  {webinar.title}
                </h3>
                <p className="text-body-sm text-content-secondary">
                  {webinar.description}
                </p>
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
              Never Miss a Session
            </h2>
            <p className="text-body-lg text-content-secondary mb-8">
              Get notified about upcoming webinars and new on-demand content.
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
