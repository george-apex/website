'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Zap, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

import type { Phase } from '@/components/animations/MorphingParticlesV2'

const MorphingParticlesV2 = dynamic(
  () => import('@/components/animations/MorphingParticlesV2').then(mod => mod.MorphingParticlesV2),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-surface-950 animate-pulse" />
    )
  }
)

export function TesseractHero() {
  const [phase, setPhase] = React.useState<Phase>('idle')
  
  const handlePhaseChange = React.useCallback((newPhase: Phase) => {
    setPhase(newPhase)
  }, [])

  return (
    <section className="relative flex flex-col overflow-hidden desktop:min-h-[900px]">
      <div className="absolute inset-0 bg-surface-950" />
      
      <div className="relative z-0 flex-1 desktop:grid desktop:grid-cols-2 desktop:items-center desktop:max-w-[1600px] desktop:mx-auto desktop:px-12 desktop:py-20">
        
        <motion.div 
          className="relative z-[5] px-6 py-12 burger-range:py-16 desktop:py-0 desktop:px-0"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="mb-8"
            >
              <svg 
                className="h-10 burger-range:h-14 desktop:h-20 w-auto [&_.apex-part]:fill-white [&_.e3-part]:fill-accent"
                viewBox="0 0 416.41 73.99"
              >
                <g className="apex-part">
                  <path d="M91.28,43.15v30.84h-11.9V1.55h22.56c13.04,0,24.22,6.83,24.22,19.77,0,16.35-10.97,21.84-24.01,21.84h-10.87,0ZM91.28,31.46h10.87c5.48,0,11.9-1.97,11.9-9.11s-6.42-9.11-11.9-9.11h-10.87v18.21h0Z"/>
                  <path d="M236.58,37.77l25.46,36.22h-15.21l-17.9-26.7-17.8,26.7h-15.21l25.46-36.22L195.91,1.55h15.21l17.8,26.39L246.83,1.55h15.21l-25.46,36.22h0Z"/>
                  <polygon points="33.12 0 0 73.99 12.11 73.99 33.12 27.84 54.12 73.99 66.23 73.99 33.12 0"/>
                  <polygon points="139.28 73.88 177.36 73.88 182.48 62.76 139.28 62.76 139.28 73.88"/>
                  <polygon points="139.28 43.34 172.24 43.34 177.36 32.21 139.28 32.21 139.28 43.34"/>
                  <polygon points="139.28 12.69 177.36 12.69 182.48 1.57 139.28 1.57 139.28 12.69"/>
                </g>
                <g className="e3-part">
                  <polygon points="405.28 .83 367.2 .83 362.08 11.96 405.28 11.96 405.28 .83"/>
                  <polygon points="405.28 62.04 367.2 62.04 362.08 73.15 405.28 73.15 405.28 62.04"/>
                  <polygon points="405.29 11.96 405.29 31.43 372.85 31.43 367.2 42.57 405.29 42.57 405.29 62.03 416.41 62.03 416.41 11.96 405.29 11.96"/>
                  <polygon points="312.45 73.15 350.53 73.15 355.65 62.04 312.45 62.04 312.45 73.15"/>
                  <polygon points="312.45 11.96 350.53 11.96 355.65 .83 312.45 .83 312.45 11.96"/>
                  <polygon points="350.53 31.43 312.44 31.43 312.44 11.96 301.32 11.96 301.32 62.03 312.44 62.03 312.44 42.57 345 42.57 350.53 31.43"/>
                  <rect x="276.12" y="11.96" width="11.12" height="11.12"/>
                  <rect x="276.12" y="50.92" width="11.12" height="11.12"/>
                </g>
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Introducing A.L.I.C.E. — Autonomous AI Agent
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-3xl burger-range:text-4xl desktop:text-5xl font-semibold leading-tight mb-6"
            >
              <span className="text-white">The AI Agent for Capital Markets</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-base burger-range:text-lg text-white/60 mb-8"
            >
              A.L.I.C.E. autonomously researches, analyzes, and acts across equities, fixed income, multi-asset, and alternatives. Secure data processing. Explainable models. Natural language analytics. Deployed on your infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                See Platform
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-wrap items-center gap-6 text-sm text-white/70"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-positive" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-accent" />
                <span>On-Premise Deploy</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                <span>$10T+ AUM</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="relative flex items-center justify-center overflow-visible py-8 burger-range:py-4 desktop:py-0 desktop:h-[700px]">
          <div className="w-[85vw] h-[85vw] burger-range:w-[70vw] burger-range:h-[70vw] desktop:w-full desktop:h-full desktop:max-w-[600px]">
            <MorphingParticlesV2 
              className="w-full h-full"
              onPhaseChange={handlePhaseChange}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TesseractHero
