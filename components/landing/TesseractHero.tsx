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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <svg 
            className="h-8 sm:h-10 md:h-12 lg:h-16 w-auto mx-auto [&_.apex-part]:fill-white [&_.e3-part]:fill-accent"
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
              <polygon points="405.28 31.43 372.31 31.43 367.2 42.56 405.28 42.56 405.28 31.43"/>
              <polygon points="405.28 62.04 367.2 62.04 362.08 73.15 405.28 73.15 405.28 62.04"/>
              <rect x="405.29" y="11.96" width="11.12" height="50.07"/>
              <polygon points="312.45 73.15 350.53 73.15 355.65 62.04 312.45 62.04 312.45 73.15"/>
              <polygon points="312.45 42.56 345.42 42.56 350.53 31.43 312.45 31.43 312.45 42.56"/>
              <polygon points="312.45 11.96 350.53 11.96 355.65 .83 312.45 .83 312.45 11.96"/>
              <rect x="301.32" y="11.96" width="11.12" height="50.07"/>
              <rect x="276.12" y="11.96" width="11.12" height="11.12"/>
              <rect x="276.12" y="50.92" width="11.12" height="11.12"/>
            </g>
          </svg>
        </motion.div>
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
