'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Shield, Users, Briefcase, Zap, Database, ChevronRight } from 'lucide-react'
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
  description?: string
}

export interface NavLink {
  label: string
  href?: string
  subTabs?: SubTab[]
}

export const NAV_LINKS: NavLink[] = [
  { label: 'A.L.I.C.E.', href: '/alice' },
  { 
    label: 'Solutions',
    href: '/solutions',
    subTabs: [
      { id: 'product', label: 'Product', href: '/data-platform', icon: <Database className="w-4 h-4" />, description: 'Data platform features' },
      { id: 'agents', label: 'Agents', href: '/agents', icon: <Zap className="w-4 h-4" />, description: 'AI agents suite' },
      { id: 'security', label: 'Security', href: '/security', icon: <Shield className="w-4 h-4" />, description: 'Enterprise security' },
    ]
  },
  { label: 'Insights', href: '/insights' },
  { 
    label: 'Company',
    href: '/about',
    subTabs: [
      { id: 'about', label: 'About Us', href: '/about', icon: <Users className="w-4 h-4" />, description: 'Our story' },
      { id: 'careers', label: 'Careers', href: '/careers', icon: <Briefcase className="w-4 h-4" />, description: 'Join the team' },
      { id: 'contact', label: 'Contact', href: '/contact', icon: <ArrowRight className="w-4 h-4" />, description: 'Get in touch' },
    ]
  },
]

interface HoverContextType {}

export const HoverContext = React.createContext<HoverContextType>({})

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  return (
    <HoverContext.Provider value={{}}>
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
  const [hoveredSubTab, setHoveredSubTab] = React.useState<string | null>(null)
  const [windowWidth, setWindowWidth] = React.useState(800)
  const scrollPosition = useScrollPosition()

  const activeParent = getParentTab(pathname)

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const showBurgerMenu = windowWidth > 400 && windowWidth < 800
  const showHeader = true

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
      {showHeader && (
      <motion.header
        className={cn(
          'main-header fixed top-0 left-0 right-0 z-[60] transition-all duration-300',
          isScrolled
            ? 'bg-surface-900/80 backdrop-blur-xl border-b border-border/50'
            : 'bg-transparent'
        )}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {isScrolled && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        )}
        
        <nav className="container-main">
          <div className="flex items-center justify-between h-20">
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
                  <polygon points="405.28 62.04 367.2 62.04 362.08 73.15 405.28 73.15 405.28 62.04"/>
                  <polygon points="405.29 11.96 405.29 31.43 372.85 31.43 367.2 42.57 405.29 42.57 405.29 62.03 416.41 62.03 416.41 11.96 405.29 11.96"/>
                  <polygon points="312.45 73.15 350.53 73.15 355.65 62.04 312.45 62.04 312.45 73.15"/>
                  <polygon points="312.45 11.96 350.53 11.96 355.65 .83 312.45 .83 312.45 11.96"/>
                  <polygon points="350.53 31.43 312.44 31.43 312.44 11.96 301.32 11.96 301.32 62.03 312.44 62.03 312.44 42.57 345 42.57 350.53 31.43"/>
                  <rect x="276.12" y="11.96" width="11.12" height="11.12"/>
                  <rect x="276.12" y="50.92" width="11.12" height="11.12"/>
                </g>
              </svg>
            </Link>

            <div className="hidden desktop:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const hasSubTabs = link.subTabs && link.subTabs.length > 0
                const isActive = activeParent === link.label
                const isOpen = openDropdown === link.label

                return (
                  <div 
                    key={link.label}
                    className="relative"
                    onMouseLeave={() => {
                      setOpenDropdown(null)
                      setHoveredSubTab(null)
                    }}
                  >
                    {hasSubTabs ? (
                      <button
                        onClick={() => {
                          router.push(link.href || '/')
                        }}
                        onMouseEnter={() => setOpenDropdown(link.label)}
                        className={cn(
                          'flex items-center gap-1.5 px-4 py-2 text-body-sm rounded-lg transition-all',
                          isActive 
                            ? 'text-accent font-semibold' 
                            : 'text-content-secondary hover:text-content-primary hover:bg-surface-800/50'
                        )}
                      >
                        {link.label}
                        <ChevronRight className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200',
                          isOpen && 'rotate-90'
                        )} />
                      </button>
                    ) : (
                      <Link
                        href={link.href || '#'}
                        className={cn(
                          'px-4 py-2 text-body-sm rounded-lg transition-all',
                          isActive 
                            ? 'text-accent font-semibold' 
                            : 'text-content-secondary hover:text-content-primary hover:bg-surface-800/50'
                        )}
                      >
                        {link.label}
                      </Link>
                    )}

                    <AnimatePresence>
                      {hasSubTabs && isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-0 w-64"
                        >
                          <div className="relative bg-surface-800/95 backdrop-blur-xl rounded-xl border border-border/50 shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                            
                            <div className="relative p-2">
                              {link.subTabs!.map((sub, index) => {
                                const subIsActive = sub.href ? pathname === sub.href : false
                                const isHovered = hoveredSubTab === sub.id

                                const content = (
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onMouseEnter={() => setHoveredSubTab(sub.id)}
                                    onMouseLeave={() => setHoveredSubTab(null)}
                                    className={cn(
                                      'relative flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer group',
                                      subIsActive 
                                        ? 'bg-accent/10' 
                                        : isHovered ? 'bg-surface-700/50' : ''
                                    )}
                                  >
                                    {isHovered && !subIsActive && (
                                      <motion.div
                                        layoutId="dropdownHover"
                                        className="absolute inset-0 rounded-lg bg-surface-700/30"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                      />
                                    )}
                                    {subIsActive && (
                                      <motion.div
                                        layoutId="dropdownActive"
                                        className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/20"
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                      />
                                    )}
                                    <div className={cn(
                                      'relative z-10 p-2 rounded-lg',
                                      subIsActive ? 'bg-accent/20 text-accent' : 'bg-surface-700/50 text-content-secondary group-hover:text-accent'
                                    )}>
                                      {sub.icon}
                                    </div>
                                    <div className="relative z-10 flex-1 min-w-0">
                                      <div className={cn(
                                        'text-sm font-medium',
                                        subIsActive ? 'text-accent' : 'text-content-primary'
                                      )}>
                                        {sub.label}
                                      </div>
                                      {sub.description && (
                                        <div className="text-xs text-content-tertiary mt-0.5">
                                          {sub.description}
                                        </div>
                                      )}
                                    </div>
                                    <ChevronRight className={cn(
                                      'relative z-10 w-4 h-4 text-content-tertiary transition-transform',
                                      isHovered && 'translate-x-0.5 text-accent'
                                    )} />
                                  </motion.div>
                                )

                                if (sub.href) {
                                  return (
                                    <Link key={sub.id} href={sub.href}>
                                      {content}
                                    </Link>
                                  )
                                }

                                return (
                                  <div key={sub.id}>
                                    {content}
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <div className="hidden desktop:flex items-center gap-3">
              <ScheduleDemoDialog
                trigger={<Button size="sm">Schedule Demo</Button>}
              />
            </div>

            <button
              className="burger-menu-btn flex p-2 text-content-secondary hover:text-content-primary transition-colors items-center justify-center"
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
      )}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-container fixed inset-0 z-50 bg-surface-900/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-surface-900/95 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.nav
              className="absolute top-20 left-0 right-0 bg-surface-800 border-b border-border p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, index) => {
                  const hasSubTabs = link.subTabs && link.subTabs.length > 0
                  const isActive = activeParent === link.label
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
                              setOpenDropdown(isExpanded ? null : link.label)
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
                                sub.href ? (
                                  <Link
                                    key={sub.id}
                                    href={sub.href}
                                    className={cn(
                                      'flex items-center gap-3 py-2.5 px-4 text-body rounded-card transition-colors',
                                      pathname === sub.href 
                                        ? 'text-accent bg-accent/5' 
                                        : 'text-content-tertiary hover:text-accent hover:bg-surface-700'
                                    )}
                                    onClick={() => {
                                      setOpenDropdown(null)
                                      setIsMobileMenuOpen(false)
                                    }}
                                  >
                                    {sub.icon}
                                    {sub.label}
                                  </Link>
                                ) : (
                                  <button
                                    key={sub.id}
                                    className="flex items-center gap-3 w-full text-left py-2.5 px-4 text-body rounded-card transition-colors text-content-tertiary hover:text-accent hover:bg-surface-700"
                                    onClick={() => {
                                      setOpenDropdown(null)
                                      setIsMobileMenuOpen(false)
                                    }}
                                  >
                                    {sub.icon}
                                    {sub.label}
                                  </button>
                                )
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
