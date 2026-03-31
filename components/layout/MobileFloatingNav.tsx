'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { NAV_LINKS } from './Navbar'

const GOLDEN_RATIO = 1.618
const BUTTON_HEIGHT = 48
const BUTTON_WIDTH = Math.round(BUTTON_HEIGHT * GOLDEN_RATIO)

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05 }
  }),
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } }
}

export function MobileFloatingNav() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const pathname = usePathname()
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const resetTimeout = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const startTimeout = React.useCallback(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false)
    }, 6000)
  }, [resetTimeout])

  React.useEffect(() => {
    return () => resetTimeout()
  }, [resetTimeout])

  React.useEffect(() => {
    const checkWidth = () => {
      setIsVisible(window.innerWidth <= 400)
    }
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  React.useEffect(() => {
    resetTimeout()
    setIsExpanded(false)
  }, [pathname, resetTimeout])

  const handleFabClick = () => {
    if (isExpanded) {
      resetTimeout()
      setIsExpanded(false)
    } else {
      setIsExpanded(true)
      startTimeout()
    }
  }

  const handleInteraction = () => {
    if (isExpanded) {
      startTimeout()
    }
  }

  if (!isVisible) return null

  const allLinks = NAV_LINKS.flatMap(link => {
    if (link.subTabs) {
      return link.subTabs.map(sub => ({
        label: sub.label,
        href: sub.href || '#'
      }))
    }
    return { label: link.label, href: link.href || '#' }
  }).slice(0, 5)

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 right-0 z-40 w-[400px] h-[500px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at bottom right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.2) 50%, transparent 70%)',
              transformOrigin: 'bottom right'
            }}
          />
        )}
      </AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="grid grid-cols-2 gap-2">
        <AnimatePresence mode="wait">
          {isExpanded && (
            <React.Fragment key="main">
              {allLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={handleInteraction}
                  className="bg-surface-800/95 backdrop-blur-xl border border-blue-500/50 rounded-xl flex items-center justify-center text-content-primary font-bold text-xs"
                  style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
                >
                  <Link href={link.href} className="w-full h-full flex items-center justify-center">
                    {link.label}
                  </Link>
                </motion.button>
              ))}
            </React.Fragment>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleFabClick}
          className="bg-accent flex items-center justify-center shadow-lg shadow-accent/20 rounded-xl relative"
          style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT, gridColumn: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          {!isExpanded && (
            <>
              <motion.div
                className="absolute rounded-xl border-4 border-surface-900/60"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 0.5, opacity: [0, 0.6, 0.6, 0] }}
                transition={{
                  duration: 2,
                  times: [0, 0.1, 0.8, 1],
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
              />
              <motion.div
                className="absolute rounded-xl border-4 border-surface-900/60"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 0.5, opacity: [0, 0.6, 0.6, 0] }}
                transition={{
                  duration: 2,
                  times: [0, 0.1, 0.8, 1],
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
              />
            </>
          )}
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-surface-900 relative z-10" />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="w-6 h-6 text-surface-900 relative z-10" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      </div>
    </>
  )
}

export default MobileFloatingNav
