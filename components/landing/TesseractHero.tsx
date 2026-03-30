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
  
  const [displayedText, setDisplayedText] = React.useState('')
  const fullText = 'From Complexity → To Clarity'
  
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const typeText = () => {
      let currentIndex = 0
      setDisplayedText('')
      
      const typeNextChar = () => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex))
          currentIndex++
          timeoutId = setTimeout(typeNextChar, 70)
        } else {
          timeoutId = setTimeout(() => {
            typeText()
          }, 2500)
        }
      }
      
      typeNextChar()
    }
    
    const startTimeout = setTimeout(typeText, 800)
    
    return () => {
      clearTimeout(timeoutId)
      clearTimeout(startTimeout)
    }
  }, [])
  
  const handlePhaseChange = React.useCallback((newPhase: Phase) => {
    setPhase(newPhase)
  }, [])

  return (
    <section className="relative flex flex-col overflow-hidden desktop:overflow-hidden burger-range:h-auto burger-range:pt-[calc(120px+12vw-45px)] burger-range:pb-[50vw] desktop:h-[1100px]">
      <div className="absolute inset-0 bg-surface-950" />
      
      <div className="relative z-0 flex-1 grid grid-rows-[1fr_auto] desktop:flex desktop:items-center desktop:justify-center">
        
        <div className="relative flex items-center justify-center overflow-visible py-8 burger-range:py-4 desktop:py-0 desktop:my-[100px]">
          <div className="w-[85vw] h-[85vw] burger-range:w-[75vw] burger-range:h-[75vw] desktop:w-[75vw] desktop:h-[800px]">
            <MorphingParticlesV2 
              className="w-full h-full"
              onPhaseChange={handlePhaseChange}
            />
          </div>
        </div>

        <motion.div 
          className="relative z-[5] px-4 burger-range:absolute burger-range:top-[68vw] burger-range:left-0 burger-range:right-0 desktop:absolute desktop:bottom-12 desktop:left-1/2 desktop:-translate-x-1/2 desktop:w-full desktop:max-w-4xl desktop:px-6"
        >
          <div className="relative">
            <div 
              className="absolute -inset-16 burger-range:hidden desktop:block"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(10, 10, 12, 0.9) 0%, rgba(10, 10, 12, 0.5) 35%, rgba(10, 10, 12, 0) 65%)',
              }}
            />
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-xl burger-range:text-2xl desktop:text-4xl font-medium mb-4"
              >
                <span className="text-white/80">
                  <span>{displayedText.split(' → ')[0]}</span>
                  {displayedText.includes(' → ') && (
                    <>
                      <span className="text-white/50"> → </span>
                      <span className="text-accent">
                        {displayedText.split(' → ')[1]}
                      </span>
                    </>
                  )}
                  <span className="animate-pulse text-accent ml-0.5">|</span>
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-base burger-range:text-lg text-white/60 mb-6 burger-range:mb-8 max-w-xl mx-auto"
              >
                Transform fragmented, multi-dimensional data into structured, actionable insights. 
                Purpose-built for institutional finance.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-wrap items-center justify-center gap-2 burger-range:gap-4 mb-6 burger-range:mb-8"
              >
                <Button 
                  size="sm"
                  icon={<ArrowRight className="w-3 h-3 burger-range:w-4 burger-range:h-4" />}
                  className="bg-accent hover:bg-accent-light text-white font-medium px-4 burger-range:px-8 burger-range:text-base"
                >
                  Schedule Demo
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<Play className="w-3 h-3 burger-range:w-4 burger-range:h-4" />}
                  iconPosition="left"
                  className="border-white/20 text-white hover:bg-white/5 backdrop-blur-sm px-4 burger-range:px-8 burger-range:text-base"
                >
                  See Platform
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="pt-4 burger-range:pt-6 pb-4 burger-range:pb-6"
              >
                <div className="flex flex-wrap items-center justify-center gap-4 burger-range:gap-6 desktop:gap-8 text-sm text-white">
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
                    <span>$500B+ Analyzed</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TesseractHero
