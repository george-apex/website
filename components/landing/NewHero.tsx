'use client'

import * as React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, Shield, Zap, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PremiumHeroBackground } from '@/components/effects/PremiumHeroEffect'

// =============================================================================
// BUSINESS SECTORS - Typing animation content
// =============================================================================
const BUSINESS_SECTORS = [
  'Quantitative Research',
  'Risk Analytics',
  'Market Intelligence',
  'Data Infrastructure',
  'AI Sovereignty',
  'Portfolio Analytics',
  'Alpha Generation',
  'Due Diligence',
]

// =============================================================================
// TYPING TEXT COMPONENT
// =============================================================================
interface TypingTextProps {
  words: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

function TypingText({
  words,
  className = '',
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: TypingTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0)
  const [currentText, setCurrentText] = React.useState('')
  const [isDeleting, setIsDeleting] = React.useState(false)

  React.useEffect(() => {
    const currentWord = words[currentWordIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1))
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        className="inline-block w-[3px] h-[1em] bg-accent ml-1 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      />
    </span>
  )
}

// =============================================================================
// PREMIUM HERO VISUALIZATION - Cinematic light reveal effect
// =============================================================================
function PremiumVisualization() {
  return (
    <PremiumHeroBackground />
  )
}

// =============================================================================
// NEW HERO COMPONENT
// =============================================================================
export function NewHero() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-surface-950" />

      {/* Premium light reveal visualization background */}
      <div className="absolute inset-0 max-[393px]:hidden">
        <PremiumVisualization />
      </div>

      {/* Subtle vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Content */}
      <motion.div 
        className="relative z-10 container-main py-20 lg:py-0 pointer-events-none"
        style={{ opacity, scale }}
      >
        <div className="max-w-4xl mx-auto text-center pointer-events-auto">
          {/* Pre-headline badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-content-tertiary">Enterprise AI Infrastructure</span>
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
          >
            <svg 
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto [&_.apex-part]:fill-white [&_.e3-part]:fill-accent"
              viewBox="0 0 411.49 73.99"
            >
              <g className="apex-part">
                <path d="M91.28,43.15v30.84h-11.9V1.55h22.56c13.04,0,24.22,6.83,24.22,19.77,0,16.35-10.97,21.84-24.01,21.84h-10.87ZM91.28,31.46h10.87c5.48,0,11.9-1.97,11.9-9.11s-6.42-9.11-11.9-9.11h-10.87v18.21Z"/>
                <path d="M236.58,37.77l25.46,36.22h-15.21l-17.9-26.7-17.8,26.7h-15.21l25.46-36.22L195.91,1.55h15.21l17.8,26.39L246.83,1.55h15.21l-25.46,36.22Z"/>
                <polygon points="33.12 0 0 73.99 12.11 73.99 33.12 27.84 54.12 73.99 66.23 73.99 33.12 0"/>
                <polygon points="139.28 73.88 177.36 73.88 182.48 62.76 139.28 62.76 139.28 73.88"/>
                <polygon points="139.28 43.34 172.24 43.34 177.36 32.21 139.28 32.21 139.28 43.34"/>
                <polygon points="139.28 12.69 177.36 12.69 182.48 1.57 139.28 1.57 139.28 12.69"/>
              </g>
              <g className="e3-part">
                <path d="M275.91,12.14h14.08v13.68h-14.08v-13.68ZM275.91,49.73h14.08v13.67h-14.08v-13.67Z"/>
                <g>
                  <polygon points="405.93 1.61 367.85 1.61 362.73 12.74 405.93 12.74 405.93 1.61"/>
                  <polygon points="405.93 32.21 372.96 32.21 367.85 43.34 405.93 43.34 405.93 32.21"/>
                  <polygon points="405.93 62.81 367.85 62.81 362.73 73.93 405.93 73.93 405.93 62.81"/>
                  <rect x="375.34" y="32.21" width="61.19" height="11.12" transform="translate(443.71 -368.16) rotate(90)"/>
                </g>
                <g>
                  <polygon points="313.1 73.93 351.18 73.93 356.3 62.81 313.1 62.81 313.1 73.93"/>
                  <polygon points="313.1 43.34 346.07 43.34 351.18 32.21 313.1 32.21 313.1 43.34"/>
                  <polygon points="313.1 12.74 351.18 12.74 356.3 1.61 313.1 1.61 313.1 12.74"/>
                  <rect x="282.5" y="32.21" width="61.19" height="11.12" transform="translate(275.32 350.87) rotate(-90)"/>
                </g>
              </g>
            </svg>
          </motion.div>

          {/* Typing subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white/90">
              <TypingText words={BUSINESS_SECTORS} />
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-lg sm:text-xl text-content-tertiary mb-10 max-w-2xl mx-auto"
          >
            One company. All of this.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-base sm:text-lg text-white/60 mb-12 max-w-xl mx-auto"
          >
            Transform fragmented data into decision-ready intelligence.
            Purpose-built for institutional finance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-wrap items-center justify-center gap-4"
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
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/50">
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

export default NewHero
