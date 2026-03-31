'use client'

import * as React from 'react'

interface MainContentProps {
  children: React.ReactNode
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main id="main-content" className="relative desktop:pt-0">
      {children}
    </main>
  )
}
