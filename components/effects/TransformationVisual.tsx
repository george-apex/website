'use client'

import * as React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface TransformationVisualProps {
  variant?: 'hero' | 'inline'
}

export function TransformationVisual({ variant = 'inline' }: TransformationVisualProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Transform values based on scroll
  const chaosOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const clarityOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
  const chaosScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const clarityScale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1])
  const chaosRotate = useTransform(scrollYProgress, [0, 0.3], [0, -10])
  const progress = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  // Scattered chaos elements
  const chaosItems = [
    { x: 10, y: 15, rotate: -15, color: '#4A90D9', type: 'doc' },
    { x: 70, y: 10, rotate: 12, color: '#E74C3C', type: 'chart' },
    { x: 25, y: 50, rotate: -8, color: '#F39C12', type: 'note' },
    { x: 80, y: 45, rotate: 20, color: '#4A90D9', type: 'doc' },
    { x: 45, y: 25, rotate: 5, color: '#306BFF', type: 'alert' },
    { x: 15, y: 75, rotate: -12, color: '#E74C3C', type: 'chart' },
    { x: 60, y: 70, rotate: 8, color: '#F39C12', type: 'note' },
    { x: 35, y: 80, rotate: -5, color: '#4A90D9', type: 'doc' },
  ]

  // Structured clarity elements
  const clarityItems = [
    { x: 50, y: 50, size: 60, primary: true },
    { x: 20, y: 30, size: 35 },
    { x: 80, y: 30, size: 35 },
    { x: 20, y: 70, size: 35 },
    { x: 80, y: 70, size: 35 },
  ]

  if (variant === 'hero') {
    return (
      <div ref={containerRef} className="relative w-full h-[60vh] min-h-[400px]">
        {/* Chaos Layer */}
        <motion.div
          style={{ opacity: chaosOpacity, scale: chaosScale, rotate: chaosRotate }}
          className="absolute inset-0"
        >
          {chaosItems.map((item, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ 
                left: `${item.x}%`, 
                top: `${item.y}%`,
              }}
              animate={{
                x: [0, 5, -3, 0],
                y: [0, -3, 5, 0],
                rotate: [item.rotate, item.rotate + 5, item.rotate - 3, item.rotate],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              <div 
                className="w-16 h-20 rounded-lg border bg-surface-800/80 backdrop-blur-sm flex flex-col items-center justify-center"
                style={{ borderColor: `${item.color}40` }}
              >
                {item.type === 'doc' && (
                  <div className="w-10 h-12 rounded border border-current opacity-40" style={{ borderColor: item.color }} />
                )}
                {item.type === 'chart' && (
                  <div className="flex gap-0.5 items-end h-10">
                    <div className="w-1.5 h-4 rounded-sm" style={{ backgroundColor: item.color, opacity: 0.4 }} />
                    <div className="w-1.5 h-6 rounded-sm" style={{ backgroundColor: item.color, opacity: 0.6 }} />
                    <div className="w-1.5 h-3 rounded-sm" style={{ backgroundColor: item.color, opacity: 0.3 }} />
                    <div className="w-1.5 h-8 rounded-sm" style={{ backgroundColor: item.color, opacity: 0.5 }} />
                  </div>
                )}
                {item.type === 'note' && (
                  <div className="w-10 h-10 rounded-sm" style={{ backgroundColor: item.color, opacity: 0.2 }} />
                )}
                {item.type === 'alert' && (
                  <div className="w-8 h-8 rounded-full" style={{ border: `2px solid ${item.color}`, opacity: 0.6 }} />
                )}
              </div>
            </motion.div>
          ))}
          
          {/* Noise indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-700/50 border border-border">
            <div className="w-2 h-2 rounded-full bg-negative animate-pulse" />
            <span className="text-xs text-content-tertiary">High noise level</span>
          </div>
        </motion.div>

        {/* Clarity Layer */}
        <motion.div
          style={{ opacity: clarityOpacity, scale: clarityScale }}
          className="absolute inset-0"
        >
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#306BFF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4A90D9" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Center to corners */}
            <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1.5" />
            <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="url(#lineGradient)" strokeWidth="1.5" />
            <line x1="50%" y1="50%" x2="20%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1.5" />
            <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1.5" />
          </svg>

          {/* Nodes */}
          {clarityItems.map((item, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ 
                left: `${item.x}%`, 
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring' }}
            >
              <div 
                className={`rounded-full flex items-center justify-center ${
                  item.primary 
                    ? 'bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/50' 
                    : 'bg-surface-800 border border-data/40'
                }`}
                style={{ 
                  width: item.size, 
                  height: item.size,
                }}
              >
                {item.primary && (
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(48, 107, 255, 0.3)',
                        '0 0 40px rgba(48, 107, 255, 0.5)',
                        '0 0 20px rgba(48, 107, 255, 0.3)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-accent"
                  />
                )}
                {!item.primary && (
                  <div className="w-2 h-2 rounded-full bg-data/60" />
                )}
              </div>
            </motion.div>
          ))}

          {/* Signal indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30">
            <div className="w-2 h-2 rounded-full bg-positive animate-pulse" />
            <span className="text-xs text-accent">Signal optimized</span>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          style={{ opacity: progress }}
        >
          <div className="flex items-center gap-4">
            <span className="text-xs text-content-tertiary">Chaos</span>
            <div className="w-32 h-1 rounded-full bg-surface-700 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-data to-accent rounded-full"
                style={{ width: useTransform(progress, v => `${v * 100}%`) }}
              />
            </div>
            <span className="text-xs text-accent">Clarity</span>
          </div>
        </motion.div>
      </div>
    )
  }

  // Inline variant - simpler, for section use
  return (
    <div ref={containerRef} className="relative w-full aspect-video max-w-2xl mx-auto">
      {/* Chaos Layer */}
      <motion.div
        style={{ opacity: chaosOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-48 h-48">
          {chaosItems.slice(0, 6).map((item, i) => (
            <motion.div
              key={i}
              className="absolute w-12 h-14 rounded border bg-surface-800/60"
              style={{ 
                borderColor: `${item.color}40`,
                left: `${(i % 3) * 35 + 10}%`,
                top: `${Math.floor(i / 3) * 50 + 10}%`,
                transform: `rotate(${item.rotate}deg)`,
              }}
              animate={{
                x: [0, 3, -2, 0],
                y: [0, -2, 3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Clarity Layer */}
      <motion.div
        style={{ opacity: clarityOpacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-48 h-48">
          {/* Center node */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-accent/20 border-2 border-accent/50 flex items-center justify-center"
          >
            <div className="w-3 h-3 rounded-full bg-accent" />
          </motion.div>
          
          {/* Orbit nodes */}
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 rounded-full bg-data/20 border border-data/40 flex items-center justify-center"
              style={{
                left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 60}px - 16px)`,
                top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 60}px - 16px)`,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-data/60" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default TransformationVisual
