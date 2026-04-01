'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Zap, Database, Cpu, Network, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

import type { AlicePhase } from '@/components/animations/AliceParticles'

const AliceParticles = dynamic(
  () => import('@/components/animations/AliceParticles').then(mod => mod.AliceParticles),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-surface-950 animate-pulse" />
    )
  }
)

export function AliceHero() {
  const [phase, setPhase] = React.useState<AlicePhase>('idle')
  
  const handlePhaseChange = React.useCallback((newPhase: AlicePhase) => {
    setPhase(newPhase)
  }, [])

  return (
    <section className="relative flex flex-col overflow-hidden desktop:min-h-[900px]">
      <div className="absolute inset-0 bg-surface-950" />
      
      <div className="relative z-0 flex-1 desktop:grid desktop:grid-cols-2 desktop:items-center desktop:max-w-[1600px] desktop:mx-auto desktop:px-12 desktop:py-20">
        
        <div className="relative flex items-center justify-center overflow-visible py-8 burger-range:py-4 desktop:py-0 desktop:h-[700px] desktop:mr-8">
          <div className="w-[85vw] h-[85vw] burger-range:w-[70vw] burger-range:h-[70vw] desktop:w-full desktop:h-full desktop:max-w-[600px]">
            <AliceParticles 
              className="w-full h-full"
              onPhaseChange={handlePhaseChange}
            />
          </div>
        </div>

        <motion.div 
          className="relative z-[5] px-6 py-12 burger-range:py-16 desktop:py-0 desktop:px-0"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-xl desktop:ml-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent font-medium">
                <Cpu className="w-4 h-4" />
                Agentic Intelligence Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl burger-range:text-5xl desktop:text-6xl font-bold leading-none mb-4"
            >
              <span className="bg-gradient-to-r from-white via-accent to-accent bg-clip-text text-transparent">A.L.I.C.E.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-xl burger-range:text-2xl desktop:text-3xl font-medium text-white mb-2"
            >
              Autonomous Intelligence for Capital Markets
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-base burger-range:text-lg text-accent font-medium mb-6"
            >
              Researches. Analyzes. Acts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-wrap items-center gap-3 mb-8 text-sm text-white/70"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800/50 border border-border/50">
                <Network className="w-4 h-4 text-accent" />
                <span>Decomposes Prompts</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800/50 border border-border/50">
                <Cpu className="w-4 h-4 text-accent" />
                <span>Orchestrates Agents</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-800/50 border border-border/50">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Delivers Intelligence</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-base burger-range:text-lg text-white/60 mb-8"
            >
              An enterprise-grade agentic harness that breaks down complex queries, routes tasks to specialized AI tools, and synthesizes structured, decision-ready intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Button 
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
                className="bg-accent hover:bg-accent-light text-white font-medium px-6 burger-range:px-8 burger-range:text-base"
              >
                Schedule Demo
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                icon={<Play className="w-4 h-4" />}
                iconPosition="left"
                className="border-white/20 text-white hover:bg-white/5 backdrop-blur-sm px-6 burger-range:px-8 burger-range:text-base"
              >
                See It Work
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-wrap items-center gap-5 text-xs text-white/50"
            >
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-positive/70" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-accent/70" />
                <span>On-Premise</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-accent/70" />
                <span>$10T+ AUM</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AliceHero
