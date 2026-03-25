'use client'

import * as React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Shield, Zap, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MorphingParticlesV2, Phase } from '@/components/animations/MorphingParticlesV2'

// =============================================================================
// TESSERACT HERO - Synchronized messaging with morphing animation
// =============================================================================
// The hero uses MorphingParticlesV2 as the primary visual
// Text synchronizes with animation phases:
// - "From Complexity" → during chaos/tesseract (idle/morphing_to_model early)
// - "to Clarity" → when structured shapes resolve (showing_model)
// =============================================================================

export function TesseractHero() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  
  const [phase, setPhase] = React.useState<Phase>('idle')
  
  // Typing animation state
  const [displayedText, setDisplayedText] = React.useState('')
  const fullText = 'From Complexity → To Clarity'
  
  // Typing animation effect
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const typeText = () => {
      let currentIndex = 0
      setDisplayedText('')
      
      const typeNextChar = () => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex))
          currentIndex++
          timeoutId = setTimeout(typeNextChar, 70) // 70ms per character
        } else {
          // Wait then restart
          timeoutId = setTimeout(() => {
            typeText()
          }, 2500) // 2.5 second pause before restarting
        }
      }
      
      typeNextChar()
    }
    
    // Start after a brief delay
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-surface-950" />
      
      {/* Morphing particles animation - centered background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <MorphingParticlesV2 
          className="w-full h-full"
          onPhaseChange={handlePhaseChange}
        />
      </div>
      
      {/* Subtle vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }}
      />
      
      {/* Heading at top of screen */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-36 sm:pt-40 lg:pt-44 text-center pointer-events-none">
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight"
        >
          <span className="text-white">APEX</span>
          <span className="text-accent">:E3</span>
        </motion.h1>
      </div>

      {/* Bottom section - Rest of content */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 z-10 pb-8 sm:pb-12 lg:pb-16 pointer-events-auto"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Subheadline - Typing animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4 h-12"
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

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-base sm:text-lg text-white/60 mb-8 max-w-xl mx-auto"
          >
            Transform fragmented, multi-dimensional data into structured, actionable insights. 
            Purpose-built for institutional finance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            <Button 
              size="lg" 
              icon={<ArrowRight className="w-4 h-4" />}
              className="bg-accent hover:bg-accent-light text-white font-medium px-8"
            >
              Schedule Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              icon={<Play className="w-4 h-4" />}
              iconPosition="left"
              className="border-white/20 text-white hover:bg-white/5 backdrop-blur-sm"
            >
              See Platform
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="pt-6 border-t border-white/10"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-white/50">
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
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-900 to-transparent" />
    </section>
  )
}

export default TesseractHero
