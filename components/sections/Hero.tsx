'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Button, Badge, InteractiveTerminal } from '@/components/ui'
import { ArrowRight, Play, Shield, Server, BarChart3 } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-surface-900">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      
      {/* Radial accent glow */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-radial-accent opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-radial-data opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="container-main relative z-10 pt-8 min-[393px]:pt-32 lg:pt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="max-w-xl">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="default" size="md">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse mr-1.5" />
                Enterprise AI Infrastructure
              </Badge>
            </motion.div>

            {/* Transformation tagline */}
            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <span className="text-content-tertiary text-body-sm">Hours of Research</span>
              <motion.div 
                className="flex items-center gap-1"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-8 h-px bg-gradient-to-r from-negative/50 via-warning/50 to-accent" />
                <ArrowRight className="w-3 h-3 text-accent" />
              </motion.div>
              <span className="text-accent text-body-sm font-medium">Seconds of Insight</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-display-xl lg:text-display-2xl font-medium text-content-primary mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              AI Built for
              <br />
              <span className="gradient-accent">Financial Reality</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-body-lg text-content-secondary mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-content-primary font-medium">Too much noise.</span> Not enough signal.{' '}
              <span className="text-accent">A.L.I.C.E.</span> transforms fragmented information into structured, 
              decision-ready intelligence for institutional finance.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Schedule Demo
              </Button>
              <Button variant="secondary" size="lg" icon={<Play className="w-4 h-4" />} iconPosition="left">
                See Platform
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap items-center gap-6 pt-8 border-t border-border"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 text-content-secondary text-body-sm">
                <Shield className="w-4 h-4 text-accent" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2 text-content-secondary text-body-sm">
                <Server className="w-4 h-4 text-accent" />
                <span>On-Premise Deploy</span>
              </div>
              <div className="flex items-center gap-2 text-content-secondary text-body-sm">
                <BarChart3 className="w-4 h-4 text-accent" />
                <span>$500B+ Analyzed</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - Interactive Terminal Demo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <InteractiveTerminal 
              autoPlay={true}
              autoPlayInterval={6000}
              showControls={true}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-900 to-transparent" />
    </section>
  )
}

export default Hero
