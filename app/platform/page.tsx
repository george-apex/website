'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import InteractiveInfrastructure from '@/components/sections/InteractiveInfrastructure'

export default function PlatformPage() {
  return (
    <div className="relative bg-surface-900">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-radial-data opacity-20 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-radial-accent opacity-15 pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Minimal Hero */}
        <section className="pt-28 pb-8 lg:pt-36 lg:pb-12">
          <div className="container-main">
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-widest text-accent font-medium mb-3 block">Platform</span>
              <h1 className="text-3xl lg:text-4xl font-medium text-content-primary mb-4">
                Enterprise-Grade<br />
                <span className="gradient-accent">AI Infrastructure</span>
              </h1>
              <p className="text-content-tertiary text-sm max-w-md mx-auto">
                Explore the architecture powering sovereign, scalable AI deployment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Interactive Infrastructure - Main Experience */}
        <InteractiveInfrastructure />

        {/* Minimal CTA */}
        <section className="py-16 lg:py-24">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-xl mx-auto"
            >
              <h2 className="text-xl lg:text-2xl font-medium text-content-primary mb-3">
                Ready to deploy?
              </h2>
              <p className="text-content-secondary text-sm mb-6">
                Schedule a technical consultation to discuss your infrastructure requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Schedule Technical Call
                </Button>
                <Button variant="secondary" size="md">
                  View Security
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
