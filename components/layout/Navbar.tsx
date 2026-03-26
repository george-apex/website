'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScheduleDemoDialog } from '@/components/ui/ScheduleDemoDialog'
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
      { id: 'about', label: 'About Us', shortLabel: 'About' },
      { id: 'last-mile', label: 'The Last Mile', shortLabel: 'Last Mile' },
      { id: 'demo', label: 'Interactive Demo', shortLabel: 'Live Demo' },
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
            <Link href="/" className="flex items-center group">
              <svg 
                className="h-6 w-auto [&_.apex-part]:fill-white [&_.e3-part]:fill-white group-hover:[&_.apex-part]:fill-accent group-hover:[&_.e3-part]:fill-accent transition-colors duration-300"
                viewBox="0 0 416.41 73.99"
              >
                <g className="apex-part">
                  <path d="M91.28,43.15v30.84h-11.9V1.55h22.56c13.04,0,24.22,6.83,24.22,19.77,0,16.35-10.97,21.84-24.01,21.84h-10.87,0ZM91.28,31.46h10.87c5.48,0,11.9-1.97,11.9-9.11s-6.42-9.11-11.9-9.11h-10.87v18.21h0Z"/>
                  <path d="M236.58,37.77l25.46,36.22h-15.21l-17.9-26.7-17.8,26.7h-15.21l25.46-36.22L195.91,1.55h15.21l17.8,26.39L246.83,1.55h15.21l-25.46,36.22h0Z"/>
                  <polygon points="33.12 0 0 73.99 12.11 73.99 33.12 27.84 54.12 73.99 66.23 73.99 33.12 0"/>
                  <polygon points="139.28 73.88 177.36 73.88 182.48 62.76 139.28 62.76 139.28 73.88"/>
                  <polygon points="139.28 43.34 172.24 43.34 177.36 32.21 139.28 32.21 139.28 43.34"/>
                  <polygon points="139.28 12.69 177.36 12.69 182.48 1.57 139.28 1.57 139.28 12.69"/>
                </g>
                <g className="e3-part">
                  <polygon points="405.28 .83 367.2 .83 362.08 11.96 405.28 11.96 405.28 .83"/>
                  <polygon points="405.28 31.43 372.31 31.43 367.2 42.56 405.28 42.56 405.28 31.43"/>
                  <polygon points="405.28 62.04 367.2 62.04 362.08 73.15 405.28 73.15 405.28 62.04"/>
                  <rect x="405.29" y="11.96" width="11.12" height="50.07"/>
                  <polygon points="312.45 73.15 350.53 73.15 355.65 62.04 312.45 62.04 312.45 73.15"/>
                  <polygon points="312.45 42.56 345.42 42.56 350.53 31.43 312.45 31.43 312.45 42.56"/>
                  <polygon points="312.45 11.96 350.53 11.96 355.65 .83 312.45 .83 312.45 11.96"/>
                  <rect x="301.32" y="11.96" width="11.12" height="50.07"/>
                  <rect x="276.12" y="11.96" width="11.12" height="11.12"/>
                  <rect x="276.12" y="50.92" width="11.12" height="11.12"/>
                </g>
              </svg>
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
              <ScheduleDemoDialog
                trigger={<Button size="sm">Schedule Demo</Button>}
              />
            </div>

            {/* Mobile Menu Button - visible between 394px and 799px */}
            <button
              className="hidden min-[394px]:flex min-[800px]:hidden p-2 text-content-secondary hover:text-content-primary transition-colors items-center justify-center"
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
                            <ChevronRight className={cn(
                              'w-4 h-4 transition-transform duration-200',
                              isExpanded && 'rotate-90'
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
                  <ScheduleDemoDialog
                    trigger={<Button className="w-full">Schedule Demo</Button>}
                  />
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
