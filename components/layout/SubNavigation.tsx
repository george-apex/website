'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SubTab } from './Navbar'

interface SubNavigationProps {
  activeSubTab?: string
  onSubTabClick?: (subTabId: string) => void
}

export function SubNavigation({ activeSubTab, onSubTabClick }: SubNavigationProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  const currentNavLink = React.useMemo(() => {
    return NAV_LINKS.find(link => {
      if (link.href === pathname) return true
      if (link.subTabs) {
        return link.subTabs.some(sub => sub.href === pathname)
      }
      return false
    })
  }, [pathname])

  const subTabs = currentNavLink?.subTabs
  const isHomePage = pathname === '/'

  if (!subTabs || subTabs.length === 0) return null

  return (
    <div className="fixed top-20 left-0 right-0 z-40 bg-surface-950/95 backdrop-blur-xl border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-14">
          <nav className="flex items-center gap-1">
            {subTabs.map((sub) => {
              const isActive = isHomePage 
                ? activeSubTab === sub.id 
                : pathname === sub.href
              
              return (
                <React.Fragment key={sub.id}>
                  {isHomePage && !sub.href ? (
                    <button
                      onClick={() => onSubTabClick?.(sub.id)}
                      className={cn(
                        'relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                        isActive 
                          ? 'text-accent' 
                          : 'text-content-tertiary hover:text-content-secondary hover:bg-surface-800/50'
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeSubTab"
                          className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/30"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 hidden sm:inline">{sub.label}</span>
                      <span className="relative z-10 sm:hidden">{sub.shortLabel || sub.label}</span>
                    </button>
                  ) : (
                    <Link
                      href={sub.href || `/${sub.id}`}
                      className={cn(
                        'relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                        isActive 
                          ? 'text-accent' 
                          : 'text-content-tertiary hover:text-content-secondary hover:bg-surface-800/50'
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeSubTab"
                          className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/30"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 hidden sm:inline">{sub.label}</span>
                      <span className="relative z-10 sm:hidden">{sub.shortLabel || sub.label}</span>
                    </Link>
                  )}
                </React.Fragment>
              )
            })}
          </nav>
        </div>
      </div>
      
      <div className="h-0.5 bg-surface-800">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-data"
          initial={{ width: 0 }}
          animate={{ 
            width: `${((subTabs.findIndex(s => 
              isHomePage ? s.id === activeSubTab : s.href === pathname
            ) + 1) / subTabs.length) * 100}%` 
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default SubNavigation
