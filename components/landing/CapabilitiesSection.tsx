'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  BarChart3, 
  Shield, 
  Database, 
  Brain, 
  Zap, 
  Lock,
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TesseractGrid, InfiniteCorridor } from '@/components/effects/TesseractGrid'
import { LightThreads, DataRays } from '@/components/effects/LightThreads'
import { SpaceDust, GravitationalGlow } from '@/components/effects/GravitationalGlow'

// =============================================================================
// CAPABILITIES DATA
// =============================================================================
const CAPABILITIES = [
  {
    icon: BarChart3,
    title: 'Quantitative Research',
    description: 'Advanced analytics and backtesting infrastructure for systematic strategies.',
    gradient: 'from-accent to-accent-light',
  },
  {
    icon: Shield,
    title: 'Risk Analytics',
    description: 'Real-time portfolio risk monitoring, VaR calculations, and stress testing.',
    gradient: 'from-accent-light to-accent',
  },
  {
    icon: Database,
    title: 'Data Infrastructure',
    description: 'Enterprise-grade data pipelines with 500+ integrated sources.',
    gradient: 'from-accent to-accent-light',
  },
  {
    icon: Brain,
    title: 'AI Agents',
    description: 'Specialized AI agents trained on financial workflows and domain expertise.',
    gradient: 'from-accent-light to-accent',
  },
  {
    icon: Lock,
    title: 'AI Sovereignty',
    description: 'Deploy on your infrastructure. Your data never leaves your environment.',
    gradient: 'from-accent to-accent-light',
  },
  {
    icon: Zap,
    title: 'Alpha Generation',
    description: 'Signal detection, factor analysis, and systematic alpha discovery.',
    gradient: 'from-accent-light to-accent',
  },
]

// =============================================================================
// CAPABILITY CARD
// =============================================================================
interface CapabilityCardProps {
  capability: typeof CAPABILITIES[0]
  index: number
}

function CapabilityCard({ capability, index }: CapabilityCardProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = capability.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className="group relative"
    >
      {/* Card with dimensional depth */}
      <div className="relative h-full p-6 lg:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] transition-all duration-500 hover:bg-white/[0.04] hover:border-accent/30 overflow-hidden">
        
        {/* Dimensional depth layers on hover */}
        <motion.div 
          className="absolute inset-0 rounded-2xl border border-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            transform: 'translateZ(-20px) scale(1.02)',
            background: 'radial-gradient(circle at center, rgba(48, 107, 255, 0.05) 0%, transparent 70%)',
          }}
        />
        
        {/* Light thread through card on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <motion.div
            className="absolute left-0 right-0 h-px top-1/2"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(48, 107, 255, 0.3), transparent)',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileHover={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Icon */}
        <div className={cn(
          'relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br overflow-hidden',
          capability.gradient
        )}>
          <Icon className="w-6 h-6 text-white relative z-10" />
          
          {/* Icon glow pulse on hover */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'radial-gradient(circle at center, rgba(48, 107, 255, 0.4) 0%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors relative z-10">
          {capability.title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed relative z-10">
          {capability.description}
        </p>

        {/* Arrow indicator on hover */}
        <motion.div
          className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          <ArrowRight className="w-5 h-5 text-accent/60" />
        </motion.div>

        {/* Corner accent on hover */}
        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 right-4 w-10 h-px bg-gradient-to-l from-accent/50 to-transparent" />
          <div className="absolute top-4 right-4 w-px h-10 bg-gradient-to-b from-accent/50 to-transparent" />
        </div>
        
        {/* Bottom light line on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>
    </motion.div>
  )
}

// =============================================================================
// SECTION DIVIDER - Dimensional rift style
// =============================================================================
function SectionDivider() {
  return (
    <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
      {/* Center glow point */}
      <div 
        className="absolute left-1/2 top-0 -translate-x-1/2 w-40 h-1"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(48, 107, 255, 0.3) 0%, transparent 70%)',
        }}
      />
      
      {/* Extending lines */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  )
}

// =============================================================================
// CAPABILITIES SECTION
// =============================================================================
export function CapabilitiesSection() {
  const headerRef = React.useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-surface-950" />
      
      {/* Tesseract grid - subtle */}
      <TesseractGrid 
        className="opacity-20" 
        depth={4}
        color="rgba(48, 107, 255, 0.04)"
      />
      
      {/* Infinite corridor - very subtle */}
      <InfiniteCorridor
        frameCount={3}
        color="rgba(48, 107, 255, 0.03)"
      />
      
      {/* Space dust */}
      <SpaceDust
        particleCount={20}
        color="rgba(255, 255, 255, 0.06)"
        speed="slow"
      />
      
      {/* Data rays - subtle vertical lines */}
      <DataRays
        rayCount={6}
        color="rgba(48, 107, 255, 0.05)"
        direction="vertical"
        speed="slow"
      />

      {/* Section divider */}
      <SectionDivider />

      <div className="relative container-main">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-accent tracking-wide uppercase mb-4">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6">
            Complete Infrastructure{' '}
            <span className="text-white/60">for AI-Driven Finance</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            From data pipelines to intelligent agents—everything you need to deploy production AI.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((capability, index) => (
            <CapabilityCard key={capability.title} capability={capability} index={index} />
          ))}
        </div>
        
        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isSectionInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 max-[393px]:mt-0 flex justify-center"
        >
          <div className="relative">
            {/* Central glow */}
            <div 
              className="w-32 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(48, 107, 255, 0.3), transparent)',
              }}
            />
            
            {/* Center dot */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(48, 107, 255, 0.6) 0%, transparent 70%)',
                boxShadow: '0 0 10px rgba(48, 107, 255, 0.4)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CapabilitiesSection
