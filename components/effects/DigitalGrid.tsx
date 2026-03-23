'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

interface DigitalGridProps {
  className?: string
  gridSize?: number
  lineColor?: string
  opacity?: number
  animated?: boolean
  showNodes?: boolean
}

export function DigitalGrid({
  className = '',
  gridSize = 60,
  lineColor = 'rgba(0, 212, 255, 0.04)',
  opacity = 1,
  animated = true,
  showNodes = true,
}: DigitalGridProps) {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 })

  React.useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: Math.max(document.documentElement.scrollWidth, window.innerWidth),
        height: Math.max(document.documentElement.scrollHeight, window.innerHeight),
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const horizontalLines = Math.ceil(dimensions.height / gridSize) + 2
  const verticalLines = Math.ceil(dimensions.width / gridSize) + 2

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 212, 255, 0.03) 0%, transparent 50%)',
        }}
      />

      {/* Grid SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ minWidth: dimensions.width, minHeight: dimensions.height }}
      >
        <defs>
          <pattern
            id="encom-grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            {/* Vertical line */}
            <line
              x1={gridSize}
              y1="0"
              x2={gridSize}
              y2={gridSize}
              stroke={lineColor}
              strokeWidth="0.5"
            />
            {/* Horizontal line */}
            <line
              x1="0"
              y1={gridSize}
              x2={gridSize}
              y2={gridSize}
              stroke={lineColor}
              strokeWidth="0.5"
            />
          </pattern>

          {/* Gradient for fade effect */}
          <linearGradient id="grid-fade-vertical" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="15%" stopColor="white" stopOpacity="0.6" />
            <stop offset="85%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="grid-fade-horizontal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="10%" stopColor="white" stopOpacity="0.8" />
            <stop offset="90%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <mask id="grid-mask">
            <rect
              width="100%"
              height="100%"
              fill="url(#grid-fade-vertical)"
            />
            <rect
              width="100%"
              height="100%"
              fill="url(#grid-fade-horizontal)"
            />
          </mask>
        </defs>

        {/* Grid pattern with mask */}
        <rect
          width="100%"
          height="100%"
          fill="url(#encom-grid)"
          mask="url(#grid-mask)"
        />
      </svg>

      {/* Animated luminous nodes at intersections */}
      {showNodes && animated && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${15 + (i * 12)}%`,
                top: `${20 + ((i * 7) % 60)}%`,
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, rgba(0, 212, 255, 0) 70%)',
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle scan line effect */}
      {animated && (
        <motion.div
          className="absolute left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.15), transparent)',
          }}
          animate={{
            y: [-100, dimensions.height + 100],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  )
}

// Neural network visualization for hero
interface NeuralNetworkProps {
  className?: string
  nodeCount?: number
}

export function NeuralNetwork({ className = '', nodeCount = 20 }: NeuralNetworkProps) {
  const nodes = React.useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: 10 + (Math.random() * 80),
      y: 10 + (Math.random() * 80),
      size: 2 + Math.random() * 4,
      delay: Math.random() * 2,
    }))
  }, [nodeCount])

  const connections = React.useMemo(() => {
    const conns: { from: number; to: number }[] = []
    for (let i = 0; i < nodes.length; i++) {
      const connectTo = (i + 1 + Math.floor(Math.random() * 3)) % nodes.length
      if (connectTo !== i) {
        conns.push({ from: i, to: connectTo })
      }
    }
    return conns
  }, [nodes])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 212, 255, 0)" />
            <stop offset="50%" stopColor="rgba(0, 212, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(0, 212, 255, 0)" />
          </linearGradient>
        </defs>

        {/* Connections */}
        {connections.map((conn, i) => {
          const from = nodes[conn.from]
          const to = nodes[conn.to]
          return (
            <motion.line
              key={i}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke="rgba(0, 212, 255, 0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.5, 0.3] }}
              transition={{
                duration: 3,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="rgba(0, 212, 255, 0.4)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              delay: node.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default DigitalGrid
