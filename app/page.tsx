'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TesseractHero, CapabilitiesSection, IntelligenceLayer } from '@/components/landing'
import { ApexMetaphor } from '@/components/sections/ApexMetaphor'
import { ALICEResponseDemo } from '@/components/sections/ALICEResponseDemo'
import { CTASection } from '@/components/sections/CTASection'
import { HoverContext } from '@/components/layout/Navbar'

const HOME_SUB_TABS = [
  { id: 'home', label: 'Home', shortLabel: 'Home' },
  { id: 'last-mile', label: 'The Last Mile', shortLabel: 'Last Mile' },
  { id: 'demo', label: 'Interactive Demo', shortLabel: 'Demo' },
  { id: 'cta', label: 'Get Started', shortLabel: 'CTA' },
]

export default function Home() {
  const { activeHomeSection } = React.useContext(HoverContext)

  const sectionContent: Record<string, React.ReactNode> = {
    home: (
      <>
        <TesseractHero />
        <IntelligenceLayer />
        <CapabilitiesSection />
      </>
    ),
    'last-mile': <ApexMetaphor />,
    demo: <ALICEResponseDemo />,
    cta: <CTASection />,
  }

  return (
    <div className="relative bg-surface-900 min-h-screen">
      <AnimatePresence mode="wait">
        {HOME_SUB_TABS.map((section) => (
          activeHomeSection === section.id && (
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
  )
}
