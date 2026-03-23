'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LuminousLinesProps {
  className?: string
  lineCount?: number
  color?: string
}

export function LuminousLines({
  className = '',
  lineCount = 3,
  color = 'rgba(0, 212, 255, 0.3)',
}: LuminousLinesProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)} aria-hidden="true">
      {/* Horizontal luminous lines */}
      {Array.from({ length: lineCount }).map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px"
          style={{
            top: `${25 + i * 25}%`,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 0.5, 0.5, 0] }}
          transition={{
            duration: 8,
            delay: i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Vertical luminous lines */}
      {Array.from({ length: lineCount }).map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: `${30 + i * 20}%`,
            background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 0.4, 0.4, 0] }}
          transition={{
            duration: 10,
            delay: i * 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Animated border frame for panels
interface LuminousFrameProps {
  children: React.ReactNode
  className?: string
  cornerSize?: number
  color?: string
}

export function LuminousFrame({
  children,
  className = '',
  cornerSize = 20,
  color = 'rgba(0, 212, 255, 0.4)',
}: LuminousFrameProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      
      {/* Corner accents */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        {/* Top-left corner */}
        <motion.path
          d={`M 0 ${cornerSize} L 0 0 L ${cornerSize} 0`}
          fill="none"
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        
        {/* Top-right corner */}
        <motion.path
          d={`M ${`100% - ${cornerSize}`} 0 L 100% 0 L 100% ${cornerSize}`}
          fill="none"
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          style={{ transform: 'translateX(calc(-100% + 20px))' }}
        />
        
        {/* Bottom-left corner */}
        <motion.path
          d={`M 0 ${`100% - ${cornerSize}`} L 0 100% L ${cornerSize} 100%`}
          fill="none"
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          style={{ transform: 'translateY(calc(-100% + 20px))' }}
        />
        
        {/* Bottom-right corner */}
        <motion.path
          d={`M 100% ${`100% - ${cornerSize}`} L 100% 100% L ${`100% - ${cornerSize}`} 100%`}
          fill="none"
          stroke={color}
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          style={{ transform: 'translate(calc(-100% + 20px), calc(-100% + 20px))' }}
        />
      </svg>
    </div>
  )
}

// Data stream visualization
interface DataStreamProps {
  className?: string
  streamCount?: number
}

export function DataStream({ className = '', streamCount = 5 }: DataStreamProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)} aria-hidden="true">
      {Array.from({ length: streamCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px"
          style={{
            left: `${15 + i * 18}%`,
            height: `${30 + Math.random() * 40}%`,
            top: '100%',
            background: `linear-gradient(180deg, transparent, rgba(0, 212, 255, 0.3), transparent)`,
          }}
          animate={{
            y: ['0%', '-200%'],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            delay: i * 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export default LuminousLines
