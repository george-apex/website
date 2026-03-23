'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CASE_STUDIES } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function CaseStudies() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(0)

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setActiveIndex((prev) => {
      const next = prev + newDirection
      if (next < 0) return CASE_STUDIES.length - 1
      if (next >= CASE_STUDIES.length) return 0
      return next
    })
  }

  const currentStudy = CASE_STUDIES[activeIndex]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <section id="case-studies" className="section-main relative overflow-hidden bg-surface-900">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-radial-accent opacity-30" />
      
      {/* Accent line */}
      <motion.div
        className="absolute left-0 right-0 h-px top-[10%]"
        style={{ 
          background: 'linear-gradient(90deg, transparent, rgba(48, 107, 255, 0.15) 30%, rgba(74, 144, 217, 0.2) 50%, rgba(48, 107, 255, 0.15) 70%, transparent)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className="container-main relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Case Studies</span>
          <h2 className="section-title">
            <span className="text-content-primary">Proven Results</span>
            <br />
            <span className="gradient-accent">Enterprise Impact</span>
          </h2>
          <p className="section-subtitle mx-auto">
            See how leading enterprises have transformed their operations 
            with APEXE3&apos;s sovereign AI solutions.
          </p>
        </motion.div>

        {/* Case study carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation buttons */}
          <div className="absolute top-1/2 -left-4 lg:-left-12 z-10 -translate-y-1/2">
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded border border-border bg-surface-800 flex items-center justify-center text-content-tertiary hover:text-accent hover:border-accent/30 transition-all"
              aria-label="Previous case study"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-4 lg:-right-12 z-10 -translate-y-1/2">
            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded border border-border bg-surface-800 flex items-center justify-center text-content-tertiary hover:text-accent hover:border-accent/30 transition-all"
              aria-label="Next case study"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="grid lg:grid-cols-2 gap-6"
            >
              {/* Left side - Challenge & Solution */}
              <div className="space-y-4">
                {/* Company header */}
                <div className="flex items-center gap-4 mb-4 p-4 rounded bg-surface-800 border border-border">
                  <div className="w-12 h-12 rounded border border-accent/30 bg-gradient-to-br from-data/20 to-accent/10 flex items-center justify-center text-accent font-bold text-lg font-mono">
                    {currentStudy.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-content-primary">
                      {currentStudy.company}
                    </h3>
                    <p className="text-sm text-content-tertiary">
                      {currentStudy.industry}
                    </p>
                  </div>
                </div>

                {/* Challenge */}
                <div className="p-5 rounded border border-negative/10 bg-negative/5">
                  <h4 className="text-negative font-medium mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-negative" />
                    Challenge
                  </h4>
                  <p className="text-content-secondary text-sm leading-relaxed">
                    {currentStudy.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="p-5 rounded border border-accent/10 bg-accent/5">
                  <h4 className="text-accent font-medium mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Solution
                  </h4>
                  <p className="text-content-secondary text-sm leading-relaxed">
                    {currentStudy.solution}
                  </p>
                </div>

                {/* Quote */}
                <Card variant="default" className="p-5">
                  <Quote className="w-5 h-5 text-data/40 mb-3" />
                  <p className="text-content-secondary text-sm italic leading-relaxed mb-3">
                    &ldquo;{currentStudy.quote.text}&rdquo;
                  </p>
                  <p className="text-content-tertiary text-xs font-mono">
                    — {currentStudy.quote.author}
                  </p>
                </Card>
              </div>

              {/* Right side - Results */}
              <div className="flex flex-col justify-center">
                <h4 className="text-sm font-medium text-accent uppercase tracking-wider mb-6">
                  Results
                </h4>
                
                <div className="space-y-3 mb-8">
                  {currentStudy.results.map((result, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded border border-data/10 bg-gradient-to-r from-data/5 to-transparent"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="text-2xl font-bold text-content-primary font-mono tracking-tight data-mono">
                        {result.metric}
                      </div>
                      <div className="text-content-secondary text-sm">
                        {result.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button className="w-full sm:w-auto">
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {CASE_STUDIES.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1)
                  setActiveIndex(index)
                }}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  index === activeIndex
                    ? 'bg-accent w-8'
                    : 'bg-surface-600 hover:bg-surface-500 w-1.5'
                )}
                aria-label={`Go to case study ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* All case studies link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-light transition-colors"
          >
            <span>View all case studies</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default CaseStudies
