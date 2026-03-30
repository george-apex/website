'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TesseractHero, CapabilitiesSection, IntelligenceLayer, HeroLogo } from '@/components/landing'
import { ApexMetaphor } from '@/components/sections/ApexMetaphor'
import { ALICEResponseDemo } from '@/components/sections/ALICEResponseDemo'
import { AboutSection } from '@/components/sections/AboutSection'
import { HoverContext } from '@/components/layout/Navbar'

const HOME_SUB_TABS = [
  { id: 'home', label: 'Home', shortLabel: 'Home' },
  { id: 'last-mile', label: 'The Last Mile', shortLabel: 'Last Mile' },
  { id: 'demo', label: 'Interactive Demo', shortLabel: 'Demo' },
  { id: 'about', label: 'About Us', shortLabel: 'About' },
]

export default function Home() {
  const { activeHomeSection } = React.useContext(HoverContext)

  const sectionContent: Record<string, React.ReactNode> = {
    home: (
      <div className="relative">
        <HeroLogo />
        <TesseractHero />
        <IntelligenceLayer />
        <CapabilitiesSection />
      </div>
    ),
    'last-mile': <ApexMetaphor />,
    demo: <ALICEResponseDemo />,
    about: <AboutSection />,
  }

  const activeSection = HOME_SUB_TABS.find(s => s.id === activeHomeSection)
  
  return (
    <div className="relative bg-surface-900">
      <AnimatePresence mode="wait">
        {activeSection && (
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {sectionContent[activeSection.id]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
