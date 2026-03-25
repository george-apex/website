'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'
import { useScrollPosition } from '@/hooks'

export interface SubTab {
  id: string
  label: string
  shortLabel?: string
  href?: string
  icon?: React.ReactNode
}

export interface NavLink {
  label: string
  href?: string
  subTabs?: SubTab[]
}

export const NAV_LINKS: NavLink[] = [
  { 
    label: 'Home', 
    href: '/',
    subTabs: [
      { id: 'home', label: 'APEX:E3', shortLabel: 'APEX:E3' },
      { id: 'last-mile', label: 'The Last Mile', shortLabel: 'Last Mile' },
      { id: 'demo', label: 'Interactive Demo', shortLabel: 'Live Demo' },
      { id: 'cta', label: 'Get Started', shortLabel: 'Ready?' },
    ]
  },
  { 
    label: 'Products',
    href: '/data-platform',
    subTabs: [
      { id: 'data-platform', label: 'Data Platform', href: '/data-platform' },
      { id: 'agents', label: 'Agents', href: '/agents' },
      { id: 'e3-quant-hub', label: 'E3 Quant Hub', shortLabel: 'E3 Quant Hub', href: '/e3-quant-hub' },
    ]
  },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Security', href: '/security' },
  { label: 'Contact', href: '/contact' },
]

interface HoverContextType {
  hoveredParent: string | null
  setHoveredParent: (parent: string | null) => void
  cancelClear: () => void
  activeHomeSection: string
  setActiveHomeSection: (section: string) => void
  isSubNavVisible: boolean
  currentPageHasSubNav: boolean
  hoveredSubTab: string | null
  setHoveredSubTab: (subTab: string | null) => void
}

export const HoverContext = React.createContext<HoverContextType>({
  hoveredParent: null,
  setHoveredParent: () => {},
  cancelClear: () => {},
  activeHomeSection: 'home',
  setActiveHomeSection: () => {},
  isSubNavVisible: false,
  currentPageHasSubNav: false,
  hoveredSubTab: null,
  setHoveredSubTab: () => {},
})

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [hoveredParent, setHoveredParentState] = React.useState<string | null>(null)
  const [activeHomeSection, setActiveHomeSection] = React.useState('home')
  const [hoveredSubTab, setHoveredSubTab] = React.useState<string | null>(null)
  const clearTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const cancelClear = React.useCallback(() => {
    if (clearTimeoutRef.current) {
      clearTimeout(clearTimeoutRef.current)
      clearTimeoutRef.current = null
    }
  }, [])

  const setHoveredParent = React.useCallback((parent: string | null) => {
    cancelClear()
    
    if (parent === null) {
      clearTimeoutRef.current = setTimeout(() => {
        setHoveredParentState(null)
      }, 150)
    } else {
      setHoveredParentState(parent)
    }
  }, [cancelClear])

  const isSubNavVisible = React.useMemo(() => {
    const navWithSubTabs = NAV_LINKS.find(link => link.label === hoveredParent)
    return !!(navWithSubTabs?.subTabs && navWithSubTabs.subTabs.length > 0)
  }, [hoveredParent])

  const currentPageHasSubNav = React.useMemo(() => {
    const currentNav = NAV_LINKS.find(link => {
      if (link.href === pathname) return true
      if (link.subTabs) {
        return link.subTabs.some(sub => sub.href === pathname)
      }
      return false
    })
    return !!(currentNav?.subTabs && currentNav.subTabs.length > 0)
  }, [pathname])

  React.useEffect(() => {
    return () => {
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current)
      }
    }
  }, [])

  return (
    <HoverContext.Provider value={{ hoveredParent, setHoveredParent, cancelClear, activeHomeSection, setActiveHomeSection, isSubNavVisible, currentPageHasSubNav, hoveredSubTab, setHoveredSubTab }}>
      {children}
    </HoverContext.Provider>
  )
}

export function getParentTab(pathname: string): string | null {
  for (const link of NAV_LINKS) {
    if (link.href === pathname) return link.label
    if (link.subTabs) {
      for (const sub of link.subTabs) {
        if (sub.href === pathname) return link.label
      }
    }
  }
  return null
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const scrollPosition = useScrollPosition()
  const { hoveredParent, setHoveredParent, cancelClear, setActiveHomeSection } = React.useContext(HoverContext)

  const activeParent = getParentTab(pathname)
  const displayParent = hoveredParent || activeParent

  React.useEffect(() => {
    setIsScrolled(scrollPosition.y > 50)
  }, [scrollPosition.y])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
        setOpenDropdown(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-[393px]:hidden',
          isScrolled
            ? 'bg-surface-900/95 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle top accent line */}
        {isScrolled && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        )}
        
        <nav className="container-main">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-card border border-accent/30 bg-surface-800 flex items-center justify-center">
                  <span className="text-accent font-bold text-lg font-mono">A</span>
                </div>
                <div className="absolute inset-0 rounded-card bg-accent/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-lg font-medium text-content-primary">
                {SITE_CONFIG.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden min-[800px]:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const hasSubTabs = link.subTabs && link.subTabs.length > 0
                const isActive = displayParent === link.label
                const isHovered = hoveredParent === link.label

                if (hasSubTabs) {
                  return (
                    <div 
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setHoveredParent(link.label)}
                      onMouseLeave={() => setHoveredParent(null)}
                    >
                      <Link
                        href={link.href || '#'}
                        onClick={() => {
                          if (link.label === 'Home') {
                            setActiveHomeSection('home')
                          }
                        }}
                        className={cn(
                          'flex items-center gap-1 px-3 py-2 text-body-sm rounded-lg transition-all',
                          isActive 
                            ? 'text-accent font-semibold' 
                            : 'text-content-secondary hover:text-content-primary hover:bg-surface-800/50'
                        )}
                      >
                        <span className="relative">
                          {link.label}
                          {(isHovered || isActive) && (
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                          )}
                        </span>
                      </Link>
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href || '#'}
                    className={cn(
                      'px-3 py-2 text-body-sm rounded-lg transition-all',
                      isActive 
                        ? 'text-accent font-semibold' 
                        : 'text-content-secondary hover:text-content-primary hover:bg-surface-800/50'
                    )}
                    onMouseEnter={() => setHoveredParent(link.label)}
                    onMouseLeave={() => setHoveredParent(null)}
                  >
                    <span className="relative">
                      {link.label}
                      {(isHovered || isActive) && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                      )}
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden min-[800px]:flex items-center gap-3">
              <Link href="/contact">
                <Button size="sm">Schedule Demo</Button>
              </Link>
            </div>

            {/* Mobile Menu Button - visible between 394px and 799px */}
            <button
              className="min-[800px]:hidden max-[393px]:hidden p-2 text-content-secondary hover:text-content-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - hidden at 393px and below (uses MobileFloatingNav) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 min-[800px]:hidden max-[393px]:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-surface-900/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              className="absolute top-20 left-0 right-0 bg-surface-800 border-b border-border p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, index) => {
                  const hasSubTabs = link.subTabs && link.subTabs.length > 0
                  const isActive = displayParent === link.label
                  const isExpanded = openDropdown === link.label

                  return (
                    <div key={link.label}>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {hasSubTabs ? (
                          <button
                            className={cn(
                              'w-full flex items-center justify-between py-3 px-4 text-body-lg rounded-card transition-colors',
                              isActive 
                                ? 'text-accent font-semibold' 
                                : 'text-content-secondary hover:text-accent hover:bg-surface-700'
                            )}
                            onClick={() => {
                              if (link.label === 'Home') {
                                setActiveHomeSection('home')
                                router.push('/')
                                setIsMobileMenuOpen(false)
                              } else {
                                setOpenDropdown(isExpanded ? null : link.label)
                              }
                            }}
                          >
                            <span className="relative">
                              {link.label}
                              {isActive && (
                                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                              )}
                            </span>
                            <ChevronDown className={cn(
                              'w-4 h-4 transition-transform duration-200',
                              isExpanded && 'rotate-180'
                            )} />
                          </button>
                        ) : (
                          <Link
                            href={link.href || '#'}
                            className={cn(
                              'block py-3 px-4 text-body-lg rounded-card transition-colors',
                              isActive 
                                ? 'text-accent font-semibold' 
                                : 'text-content-secondary hover:text-accent hover:bg-surface-700'
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="relative">
                              {link.label}
                              {isActive && (
                                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                              )}
                            </span>
                          </Link>
                        )}
                      </motion.div>

                      <AnimatePresence>
                        {hasSubTabs && isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-1">
                              {link.subTabs!.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={sub.href || `/${sub.id}`}
                                  className={cn(
                                    'block py-2.5 px-4 text-body rounded-card transition-colors',
                                    pathname === sub.href 
                                      ? 'text-accent bg-accent/5' 
                                      : 'text-content-tertiary hover:text-accent hover:bg-surface-700'
                                  )}
                                  onClick={() => {
                                    setOpenDropdown(null)
                                    setIsMobileMenuOpen(false)
                                  }}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
                
                <div className="h-px bg-border my-4" />
                
                <motion.div
                  className="flex flex-col gap-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full">Schedule Demo</Button>
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
