'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// =============================================================================
// NEURAL SOVEREIGNTY BACKGROUND
// Abstract AI-themed animated background representing data flow, neural networks,
// and AI sovereignty - designed for financial professionals
// =============================================================================

interface NeuralNode {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  layer: number
}

interface Connection {
  from: number
  to: number
  opacity: number
}

// Seeded random for consistent SSR
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }
}

const SEED = 12345

function generateNodes(count: number): NeuralNode[] {
  const rand = seededRandom(SEED)
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    y: rand() * 100,
    size: 2 + rand() * 4,
    delay: rand() * 3,
    duration: 3 + rand() * 4,
    layer: Math.floor(rand() * 3),
  }))
}

function generateConnections(nodes: NeuralNode[]): Connection[] {
  const rand = seededRandom(SEED + 1)
  const connections: Connection[] = []
  const maxDistance = 25

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance && rand() > 0.5) {
        connections.push({
          from: i,
          to: j,
          opacity: 1 - distance / maxDistance,
        })
      }
    }
  }

  return connections
}

// Data stream particles flowing upward
interface DataParticle {
  id: number
  x: number
  delay: number
  duration: number
  height: number
  opacity: number
}

function generateDataParticles(count: number): DataParticle[] {
  const rand = seededRandom(SEED + 2)
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    delay: rand() * 8,
    duration: 6 + rand() * 8,
    height: 50 + rand() * 150,
    opacity: 0.1 + rand() * 0.3,
  }))
}

// Encryption ring component
function EncryptionRing({ 
  size, 
  delay, 
  duration 
}: { 
  size: number
  delay: number
  duration: number 
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full border border-accent/10"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0, 0.3, 0.1, 0],
        scale: [0.8, 1, 1.05, 1.1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

// Main background component
interface NeuralSovereigntyBgProps {
  className?: string
  nodeCount?: number
  particleCount?: number
  showRings?: boolean
}

export function NeuralSovereigntyBg({
  className = '',
  nodeCount = 25,
  particleCount = 8,
  showRings = true,
}: NeuralSovereigntyBgProps) {
  const [nodes] = React.useState(() => generateNodes(nodeCount))
  const [connections] = React.useState(() => generateConnections(nodes))
  const [particles] = React.useState(() => generateDataParticles(particleCount))

  return (
    <div 
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        className
      )}
      aria-hidden="true"
    >
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-800 via-surface-900 to-surface-900" />
      
      {/* Subtle radial glow from center */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(48, 107, 255, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* Encryption rings - symbolizing sovereignty */}
      {showRings && (
        <div className="absolute inset-0">
          {[200, 350, 500, 700, 900].map((size, i) => (
            <EncryptionRing
              key={size}
              size={size}
              delay={i * 2}
              duration={8 + i * 2}
            />
          ))}
        </div>
      )}

      {/* Data stream particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-px"
            style={{
              left: `${particle.x}%`,
              height: particle.height,
              background: `linear-gradient(to top, transparent, rgba(48, 107, 255, ${particle.opacity}), transparent)`,
            }}
            initial={{ y: '100vh' }}
            animate={{ y: '-200px' }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Neural network SVG */}
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      >
        <defs>
          <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(48, 107, 255, 0)" />
            <stop offset="50%" stopColor="rgba(48, 107, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(48, 107, 255, 0)" />
          </linearGradient>
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
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
              stroke="rgba(48, 107, 255, 0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0, conn.opacity * 0.5, conn.opacity * 0.3] 
              }}
              transition={{
                duration: 2,
                delay: 0.5 + i * 0.02,
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
            fill={node.layer === 0 ? 'rgba(48, 107, 255, 0.4)' : 'rgba(48, 107, 255, 0.3)'}
            filter="url(#glow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: node.duration,
              delay: node.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(48, 107, 255, 0.2), transparent)',
        }}
        animate={{
          y: ['-10vh', '110vh'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Vertical scan line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(48, 107, 255, 0.15), transparent)',
        }}
        animate={{
          x: ['-10vw', '110vw'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
          delay: 5,
        }}
      />

      {/* Corner accents - subtle framing */}
      <div className="absolute top-0 left-0 w-64 h-64">
        <div className="absolute top-8 left-8 w-16 h-px bg-gradient-to-r from-accent/40 to-transparent" />
        <div className="absolute top-8 left-8 w-px h-16 bg-gradient-to-b from-accent/40 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-64 h-64">
        <div className="absolute top-8 right-8 w-16 h-px bg-gradient-to-l from-accent/40 to-transparent" />
        <div className="absolute top-8 right-8 w-px h-16 bg-gradient-to-b from-accent/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64">
        <div className="absolute bottom-8 left-8 w-16 h-px bg-gradient-to-r from-accent/40 to-transparent" />
        <div className="absolute bottom-8 left-8 w-px h-16 bg-gradient-to-t from-accent/40 to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64">
        <div className="absolute bottom-8 right-8 w-16 h-px bg-gradient-to-l from-accent/40 to-transparent" />
        <div className="absolute bottom-8 right-8 w-px h-16 bg-gradient-to-t from-accent/40 to-transparent" />
      </div>

      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

export default NeuralSovereigntyBg
