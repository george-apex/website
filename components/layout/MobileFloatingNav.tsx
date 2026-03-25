'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, ArrowLeft, ChevronRight } from 'lucide-react'
import { NAV_LINKS, HoverContext } from './Navbar'

const GOLDEN_RATIO = 1.618
const BUTTON_HEIGHT = 48
const BUTTON_WIDTH = Math.round(BUTTON_HEIGHT * GOLDEN_RATIO)

type MenuView = 'main' | 'home' | 'products'

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
  const [currentView, setCurrentView] = React.useState<MenuView>('main')
  const pathname = usePathname()
  const router = useRouter()
  const { setActiveHomeSection } = React.useContext(HoverContext)
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
      setIsVisible(window.innerWidth <= 393)
    }
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  React.useEffect(() => {
    const productsPaths = ['/data-platform', '/agents', '/e3-quant-hub']
    
    if (productsPaths.includes(pathname)) {
      setCurrentView('products')
    } else {
      setCurrentView('main')
    }
    
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

  const handleMainItemClick = (label: string) => {
    if (label === 'Home') {
      setCurrentView('home')
    } else if (label === 'Products') {
      setCurrentView('products')
    }
  }

  const handleBackClick = () => {
    setCurrentView('main')
  }

  if (!isVisible) return null

  const homeLink = NAV_LINKS.find(l => l.label === 'Home')
  const productsLink = NAV_LINKS.find(l => l.label === 'Products')
  const homeSubTabs = homeLink?.subTabs || []
  const productsSubTabs = productsLink?.subTabs || []

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
          {currentView === 'main' && isExpanded && (
            <React.Fragment key="main">
              <motion.button
                custom={0}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => { handleInteraction(); handleMainItemClick('Home') }}
                className="bg-surface-800/95 backdrop-blur-xl border border-blue-500/50 rounded-xl flex items-center justify-center text-content-primary font-bold text-xs"
                style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
              >
                <span className="w-full h-full flex items-center justify-center gap-0.5">Home<ChevronRight className="w-3 h-3" /></span>
              </motion.button>
              <motion.button
                custom={1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => { handleInteraction(); handleMainItemClick('Products') }}
                className="bg-surface-800/95 backdrop-blur-xl border border-blue-500/50 rounded-xl flex items-center justify-center text-content-primary font-bold text-xs"
                style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
              >
                <span className="w-full h-full flex items-center justify-center gap-0.5">Products<ChevronRight className="w-3 h-3" /></span>
              </motion.button>
              <motion.button
                custom={2}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={handleInteraction}
                className="bg-surface-800/95 backdrop-blur-xl border border-blue-500/50 rounded-xl flex items-center justify-center text-content-primary font-bold text-xs"
                style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
              >
                <Link href="/solutions" className="w-full h-full flex items-center justify-center">
                  Solutions
                </Link>
              </motion.button>
              <motion.button
                custom={3}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={handleInteraction}
                className="bg-surface-800/95 backdrop-blur-xl border border-blue-500/50 rounded-xl flex items-center justify-center text-content-primary font-bold text-xs"
                style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
              >
                <Link href="/security" className="w-full h-full flex items-center justify-center">
                  Security
                </Link>
              </motion.button>
              <motion.button
                custom={4}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={handleInteraction}
                className="bg-surface-800/95 backdrop-blur-xl border border-blue-500/50 rounded-xl flex items-center justify-center text-content-primary font-bold text-xs"
                style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
              >
                <Link href="/contact" className="w-full h-full flex items-center justify-center">
                  Contact
                </Link>
              </motion.button>
            </React.Fragment>
          )}

          {currentView === 'home' && isExpanded && (
            <React.Fragment key="home">
              <motion.button
                custom={0}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => { handleInteraction(); handleBackClick() }}
                className="bg-surface-800/95 backdrop-blur-xl border border-blue-500/50 rounded-xl flex items-center justify-center text-content-primary font-bold text-xs"
                style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
              {homeSubTabs.slice(0, 5).map((tab, i) => (
                <motion.button
                  key={tab.id}
                  custom={i + 1}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={handleInteraction}
                  className="bg-surface-800/95 backdrop-blur-xl border border-blue-500/50 rounded-xl flex items-center justify-center text-content-primary font-bold text-xs"
                  style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
                >
                  {tab.href ? (
                    <Link href={tab.href} className="w-full h-full flex items-center justify-center">
                      {tab.shortLabel || tab.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        if (pathname !== '/') {
                          router.push('/')
                        }
                        setActiveHomeSection(tab.id)
                      }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      {tab.shortLabel || tab.label}
                    </button>
                  )}
                </motion.button>
              ))}
            </React.Fragment>
          )}

          {currentView === 'products' && isExpanded && (
            <React.Fragment key="products">
              <motion.button
                custom={0}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => { handleInteraction(); handleBackClick() }}
                className="bg-surface-800/95 backdrop-blur-xl border border-blue-500/50 rounded-xl flex items-center justify-center text-content-primary font-bold text-xs"
                style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
              {productsSubTabs.slice(0, 5).map((tab, i) => (
                <motion.button
                  key={tab.id}
                  custom={i + 1}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={handleInteraction}
                  className="bg-surface-800/95 backdrop-blur-xl border border-blue-500/50 rounded-xl flex items-center justify-center text-content-primary font-bold text-xs"
                  style={{ width: BUTTON_WIDTH, height: BUTTON_HEIGHT }}
                >
                  <Link href={tab.href || '#'} className="w-full h-full flex items-center justify-center text-center leading-tight">
                    {tab.id === 'e3-quant-hub' ? (
                      <span className="whitespace-normal">E3 Quant<br/>Hub</span>
                    ) : (
                      tab.shortLabel || tab.label
                    )}
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
