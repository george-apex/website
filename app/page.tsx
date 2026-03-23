'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroTransformation } from '@/components/sections/HeroTransformation'
import { ValueProposition } from '@/components/sections/ValueProposition'
import { ApexMetaphor } from '@/components/sections/ApexMetaphor'
import { WhyMostAIFails } from '@/components/sections/WhyMostAIFails'
import { ALICEResponseDemo } from '@/components/sections/ALICEResponseDemo'
import { CTASection } from '@/components/sections/CTASection'
import { SubNavigation } from '@/components/layout/SubNavigation'

const HOME_SUB_TABS = [
  { id: 'hero', label: 'Chaos to Clarity', shortLabel: 'Hero' },
  { id: 'value', label: 'Core Differentiators', shortLabel: 'Value' },
  { id: 'apex', label: 'The Last Mile', shortLabel: 'Last Mile' },
  { id: 'problem', label: 'Why AI Fails', shortLabel: 'Problem' },
  { id: 'demo', label: 'Interactive Demo', shortLabel: 'Demo' },
  { id: 'cta', label: 'Get Started', shortLabel: 'CTA' },
]

export default function Home() {
  const [activeSection, setActiveSection] = React.useState('apex')

  const handleTabClick = React.useCallback((sectionId: string) => {
    setActiveSection(sectionId)
  }, [])

  const sectionContent: Record<string, React.ReactNode> = {
    value: (
      <>
        <HeroTransformation />
        <ValueProposition />
      </>
    ),
    apex: <ApexMetaphor />,
    problem: <WhyMostAIFails />,
    demo: <ALICEResponseDemo />,
    cta: <CTASection />,
  }

  return (
    <div className="relative bg-surface-900 min-h-screen">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-radial-accent opacity-20 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-radial-data opacity-15 pointer-events-none z-0" />

      <SubNavigation activeSubTab={activeSection} onSubTabClick={handleTabClick} />

      <div className="relative z-10 pt-28">
        <AnimatePresence mode="wait">
          {HOME_SUB_TABS.map((section) => (
            activeSection === section.id && (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {sectionContent[section.id]}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
