'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/ui/section'
import MorphingParticles from '@/components/animations/MorphingParticles'

const competitors = [
  {
    id: 'general-ai',
    name: 'General AI',
    color: '#10A37F',
    crashText: 'Spun out under production load',
  },
  {
    id: 'reasoning-ai',
    name: 'Reasoning AI',
    color: '#D97706',
    crashText: 'Hit the wall - no guardrails',
  },
  {
    id: 'search-ai',
    name: 'Search AI',
    color: '#1E88E5',
    crashText: 'Ran off track - no traction',
  },
  {
    id: 'apexe3',
    name: 'APEX:E3',
    color: '#306BFF',
    crashText: null,
  },
]

function Legend() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {competitors.map((car) => (
        <div
          key={car.id}
          className="p-3 rounded-lg"
          style={{
            background: car.id === 'apexe3'
              ? 'rgba(48, 107, 255, 0.1)'
              : 'rgba(255,255,255,0.02)',
            border: `1px solid ${car.id === 'apexe3' ? 'rgba(48, 107, 255, 0.3)' : 'rgba(255,255,255,0.05)'}`,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-2.5 rounded-sm"
              style={{ background: car.color }}
            />
            <span className="text-body-sm font-medium text-white/90">{car.name}</span>
          </div>
          <div className={`text-label mt-1.5 ${car.crashText ? 'text-[#E74C3C]/70' : 'text-[#2ECC71]/70'}`}>
            {car.crashText || '✓ Championship winner'}
          </div>
        </div>
      ))}
    </div>
  )
}

export function ApexMetaphor() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false })

  return (
    <Section variant="default" className="relative overflow-hidden min-h-screen">
      <div 
        className="absolute inset-0 bg-black"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(48, 107, 255, 0.15) 0%, transparent 60%), black',
        }}
      />
      <div className="absolute inset-0 z-0 w-[60%] left-0 -translate-y-8 overflow-visible">
        <MorphingParticles className="w-full h-full" />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[500px] py-12">
          <div className="lg:col-span-3">
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <span className="inline-block text-label font-medium text-accent mb-3 tracking-wider">
              THE LAST MILE
            </span>
            <h2 className="text-display-lg lg:text-display-xl text-content-primary font-medium max-w-xl">
              In racing, the apex{' '}
              <span className="text-content-tertiary">defines the exit.</span>
              <br />
              <span className="gradient-accent">In enterprise AI, so does Apexe3.</span>
            </h2>
            <p className="text-body-lg text-content-secondary max-w-lg">
              The apex is the critical point where precision, control, timing, and trajectory converge.
              Hit it right, and you set up the fastest possible path forward.
            </p>
            <p className="text-body-lg text-content-secondary max-w-lg">
              Championship on the line. Final lap. Four cars enter The Apex.
              Only one makes it through to claim the title.
            </p>
            <div className="pt-4">
              <Legend />
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}

export default ApexMetaphor
