'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Target,
  Zap,
  AlertTriangle,
  MessageSquareQuote,
  ArrowRight,
  Flag
} from 'lucide-react'

interface SectionTab {
  id: string
  label: string
  shortLabel: string
  icon: React.ReactNode
}

const sections: SectionTab[] = [
  { 
    id: 'hero', 
    label: 'Chaos to Clarity', 
    shortLabel: 'Hero',
    icon: <Sparkles className="w-4 h-4" /> 
  },
  { 
    id: 'value', 
    label: 'Core Differentiators', 
    shortLabel: 'Value',
    icon: <Target className="w-4 h-4" /> 
  },
  { 
    id: 'apex', 
    label: 'The Apex Principle', 
    shortLabel: 'Apex',
    icon: <Zap className="w-4 h-4" /> 
  },
  { 
    id: 'lastmile', 
    label: 'The Last Mile', 
    shortLabel: 'Last Mile',
    icon: <Flag className="w-4 h-4" /> 
  },
  { 
    id: 'problem', 
    label: 'Why AI Fails', 
    shortLabel: 'Problem',
    icon: <AlertTriangle className="w-4 h-4" /> 
  },
  { 
    id: 'demo', 
    label: 'Interactive Demo', 
    shortLabel: 'Demo',
    icon: <MessageSquareQuote className="w-4 h-4" /> 
  },
  {
    id: 'cta',
    label: 'Get Started',
    shortLabel: 'CTA',
    icon: <ArrowRight className="w-4 h-4" />
  },
]

interface SectionTabsProps {
  activeSection: string
  onTabClick: (sectionId: string) => void
}

export function SectionTabs({ activeSection, onTabClick }: SectionTabsProps) {
  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-surface-950/95 backdrop-blur-xl border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-14">
          {/* Tabs */}
          <nav className="flex items-center gap-1">
            {sections.map((section) => {
              const isActive = activeSection === section.id
              const index = sections.findIndex(s => s.id === section.id)
              
              return (
                <button
                  key={section.id}
                  onClick={() => onTabClick(section.id)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200 whitespace-nowrap
                    ${isActive 
                      ? 'text-accent' 
                      : 'text-content-tertiary hover:text-content-secondary hover:bg-surface-800/50'
                    }
                  `}
                >
                  {/* Active indicator background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 rounded-lg bg-accent/10 border border-accent/30"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Icon */}
                  <span className={`relative z-10 ${isActive ? 'text-accent' : ''}`}>
                    {section.icon}
                  </span>
                  
                  {/* Tab label - show short label on mobile, full label on larger screens */}
                  <span className="relative z-10 hidden sm:inline">{section.label}</span>
                  <span className="relative z-10 sm:hidden">{section.shortLabel}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-0.5 bg-surface-800">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-data"
          initial={{ width: 0 }}
          animate={{ 
            width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` 
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export { sections }
