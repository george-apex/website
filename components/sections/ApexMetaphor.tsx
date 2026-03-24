'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/ui/section'
import MorphingParticles from '@/components/animations/MorphingParticles'

export function ApexMetaphor() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false })

  return (
    <Section variant="default" className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-surface-950" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-900/50 via-transparent to-surface-900/50" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(48,107,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(48,107,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute inset-0 z-0 w-[60%] left-0 -translate-y-8 overflow-visible">
        <MorphingParticles className="w-full h-full" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] py-12">
          <div className="lg:col-span-1">
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 space-y-8 ml-16"
          >
            <div className="space-y-4">
              <span className="inline-block text-label font-semibold text-accent tracking-[0.2em] uppercase">
                The Last Mile
              </span>
              <h2 className="text-display-lg lg:text-display-xl text-content-primary font-semibold leading-tight">
                Everyone talks about AI.
                <br />
                <span className="text-content-tertiary">Few cross the finish line.</span>
              </h2>
            </div>
            
            <div className="h-px w-24 bg-gradient-to-r from-accent to-transparent" />
            
            <div className="space-y-6">
              <p className="text-body-lg text-content-secondary">
                Most AI projects never reach production. They stall in pilot purgatory—stuck between 
                proof-of-concept and deployment with no clear path forward.
              </p>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-white/70 font-bold text-lg">80%</span>
                </div>
                <p className="text-body-lg text-content-secondary pt-2">
                  is where other providers stop. They deliver a model, then leave you to handle 
                  integration, security, and compliance on your own.
                </p>
              </div>
            </div>
            
            <div className="p-5 rounded-xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
              <p className="text-body-lg text-white/90">
                <span className="gradient-accent font-semibold">APEX:E3 crosses the last mile.</span> We engineer 
                complete production systems—from data pipelines to deployment, compliance to monitoring. 
                <span className="text-accent font-medium"> Full implementation. Real results.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default ApexMetaphor
