'use client'

import { TesseractHero, CapabilitiesSection, IntelligenceLayer, ClientRibbon } from '@/components/landing'
import { ApexMetaphor } from '@/components/sections/ApexMetaphor'
import { ALICEResponseDemo } from '@/components/sections/ALICEResponseDemo'

export default function Home() {
  return (
    <div className="relative bg-surface-900">
      <TesseractHero />
      <ClientRibbon />
      <ALICEResponseDemo />
      <ApexMetaphor />
      <IntelligenceLayer />
      <CapabilitiesSection />
    </div>
  )
}
