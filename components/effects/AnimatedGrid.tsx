'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

interface AnimatedGridProps {
  className?: string
  lineColor?: string
  fadeDistance?: number
  pattern?: 'grid' | 'dots' | 'lines'
  animated?: boolean
}

export function AnimatedGrid({
  className = '',
  lineColor = 'rgba(59, 130, 246, 0.1)',
  fadeDistance = 200,
  pattern = 'grid',
  animated = true,
}: AnimatedGridProps) {
  const gridSize = 50
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { scrollWidth, scrollHeight } = document.documentElement
        setDimensions({
          width: Math.max(scrollWidth, window.innerWidth),
          height: Math.max(scrollHeight, window.innerHeight),
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const horizontalLines = Math.ceil(dimensions.height / gridSize) + 1
  const verticalLines = Math.ceil(dimensions.width / gridSize) + 1

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Gradient overlays for fade effect */}
      <div
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-apex-dark to-transparent z-10"
        style={{ height: fadeDistance }}
      />
      <div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-apex-dark to-transparent z-10"
        style={{ height: fadeDistance }}
      />

      {/* Grid pattern */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <defs>
          <pattern
            id="grid-pattern"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            {pattern === 'grid' && (
              <>
                <path
                  d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                  fill="none"
                  stroke={lineColor}
                  strokeWidth="0.5"
                />
              </>
            )}
            {pattern === 'dots' && (
              <circle
                cx={gridSize / 2}
                cy={gridSize / 2}
                r="1"
                fill={lineColor}
              />
            )}
            {pattern === 'lines' && (
              <line
                x1="0"
                y1={gridSize}
                x2={gridSize}
                y2={gridSize}
                stroke={lineColor}
                strokeWidth="0.5"
              />
            )}
          </pattern>
          
          {/* Gradient mask for fade */}
          <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="20%" stopColor="white" stopOpacity="1" />
            <stop offset="80%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#grid-pattern)"
          mask="url(#grid-fade)"
        />
      </motion.svg>

      {/* Animated glow lines */}
      {animated && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {/* Horizontal glow line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-apex-blue/30 to-transparent"
            animate={{
              y: [-100, dimensions.height + 100],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Vertical glow line */}
          <motion.div
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-apex-cyan/20 to-transparent"
            animate={{
              x: [-100, dimensions.width + 100],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      )}

      {/* Intersection points glow */}
      {animated && (
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-apex-blue/20 blur-sm"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
