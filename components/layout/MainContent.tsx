'use client'

import * as React from 'react'
import { HoverContext } from './Navbar'
import { cn } from '@/lib/utils'

interface MainContentProps {
  children: React.ReactNode
}

export function MainContent({ children }: MainContentProps) {
  const { isSubNavVisible, currentPageHasSubNav } = React.useContext(HoverContext)
  
  const shouldAddPadding = isSubNavVisible && !currentPageHasSubNav
  
  return (
    <main 
      id="main-content" 
      className={cn(
        "relative transition-all duration-200",
        "desktop:pt-0",
        shouldAddPadding && "desktop:pt-14"
      )}
    >
      {children}
    </main>
  )
}
