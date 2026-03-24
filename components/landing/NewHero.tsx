'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NeuralSovereigntyBg } from './NeuralSovereigntyBg'
import { cn } from '@/lib/utils'

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
// NEW HERO COMPONENT
// =============================================================================
export function NewHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <NeuralSovereigntyBg />

      {/* Content */}
      <div className="relative z-10 container-main py-20 lg:py-0">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-headline badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-content-tertiary">Enterprise AI Infrastructure</span>
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6"
          >
            <span className="text-white">APEX</span>
            <span className="text-accent">:E3</span>
          </motion.h1>

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
              className="border-white/20 text-white hover:bg-white/5"
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
                <div className="w-2 h-2 rounded-full bg-positive" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>On-Premise Deploy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>$500B+ Analyzed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-900 to-transparent" />
    </section>
  )
}

export default NewHero
