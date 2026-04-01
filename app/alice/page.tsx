'use client'

import { AliceHero } from '@/components/sections/alice/AliceHero'
import { AliceDefinition } from '@/components/sections/alice/AliceDefinition'
import { AliceCapabilities } from '@/components/sections/alice/AliceCapabilities'
import { AliceUseCases } from '@/components/sections/alice/AliceUseCases'
import { AliceHowItWorks } from '@/components/sections/alice/AliceHowItWorks'
import { AliceMetrics } from '@/components/sections/alice/AliceMetrics'
import { ALICEResponseDemo } from '@/components/sections/ALICEResponseDemo'
import { TrustSecurity } from '@/components/sections/TrustSecurity'
import { CTASection } from '@/components/sections/CTASection'

export default function ALICEPage() {
  return (
    <main className="relative">
      <AliceHero />
      <AliceDefinition />
      <AliceCapabilities />
      <AliceHowItWorks />
      <AliceUseCases />
      <ALICEResponseDemo />
      <AliceMetrics />
      <TrustSecurity />
      <CTASection />
    </main>
  )
}
