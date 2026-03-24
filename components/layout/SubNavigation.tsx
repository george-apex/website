'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SubTab, HoverContext } from './Navbar'

export function SubNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { hoveredParent, setHoveredParent, cancelClear, activeHomeSection, setActiveHomeSection } = React.useContext(HoverContext)
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  const currentNavByPath = React.useMemo(() => {
    return NAV_LINKS.find(link => {
      if (link.href === pathname) return true
      if (link.subTabs) {
        return link.subTabs.some(sub => sub.href === pathname)
      }
      return false
    })
  }, [pathname])

  const navByHover = React.useMemo(() => {
    if (!hoveredParent) return null
    return NAV_LINKS.find(link => link.label === hoveredParent)
  }, [hoveredParent])

  const activeNavLink = navByHover || currentNavByPath
  const subTabs = activeNavLink?.subTabs
  const isHomePage = pathname === '/'
  const isVisible = subTabs && subTabs.length > 0

  if (!isVisible) return null

  const activeKey = activeNavLink?.label || 'none'
  
  return (
    <div
      className={cn(
        "fixed top-20 left-0 right-0 z-40 bg-surface-950/95 backdrop-blur-xl border-b border-border/30 transition-all duration-200",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      )}
      onMouseEnter={() => activeNavLink && cancelClear()}
      onMouseLeave={() => setHoveredParent(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-14">
          <AnimatePresence mode="wait">
            <motion.nav
              key={activeKey}
              className="flex items-center gap-1"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {subTabs!.map((sub) => {
                const isActive = sub.href 
                  ? pathname === sub.href 
                  : isHomePage && activeHomeSection === sub.id
                
                return (
                  <React.Fragment key={sub.id}>
                    {sub.href ? (
                      <Link
                        href={sub.href}
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
                    ) : (
                      <button
                        onClick={() => {
                          if (pathname !== '/') {
                            router.push('/')
                          }
                          setActiveHomeSection(sub.id)
                        }}
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
                    )}
                  </React.Fragment>
                )
              })}
            </motion.nav>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="h-0.5 bg-surface-800">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent"
          initial={{ width: 0 }}
          animate={{ 
            width: `${((subTabs!.findIndex(s => 
              isHomePage ? s.id === activeHomeSection : s.href === pathname
            ) + 1) / subTabs!.length) * 100}%` 
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default SubNavigation
