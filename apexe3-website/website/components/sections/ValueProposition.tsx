'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Section, SectionHeader } from '@/components/ui/section'
import { Shield, Rocket, Sparkles, ArrowRight } from 'lucide-react'

// =============================================================================
// PRIVACY ANIMATION - AI Sovereignty with Swords
// =============================================================================
function PrivacyAnimation({ isHovered }: { isHovered: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const swords = React.useMemo(() => [
    { id: 0, angle: 45, distance: 55, delay: 0 },
    { id: 1, angle: 135, distance: 55, delay: 0.5 },
    { id: 2, angle: 225, distance: 55, delay: 1 },
    { id: 3, angle: 315, distance: 55, delay: 1.5 },
  ], [])

  const getAttackAngle = (baseAngle: number, swordId: number) => {
    if (!isHovered) return baseAngle
    const attacks = [baseAngle - 30, baseAngle + 30, baseAngle - 20, baseAngle + 20]
    return attacks[swordId % 4]
  }

  return (
    <div ref={ref} className="relative w-32 h-32 mb-6">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#306BFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#306BFF" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="swordGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#306BFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6B9FFF" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Shield outline */}
        <motion.path
          d="M60 20 L90 32 L90 55 C90 75 72 92 60 100 C48 92 30 75 30 55 L30 32 Z"
          fill="url(#shieldGradient)"
          stroke="#306BFF"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { 
            pathLength: 1, 
            opacity: 1,
            scale: isHovered ? [1, 1.05, 1] : 1,
          } : {}}
          transition={{ 
            pathLength: { duration: 1.5, ease: "easeOut" },
            scale: { duration: 0.1, repeat: isHovered ? Infinity : 0 }
          }}
          style={{ transformOrigin: "60px 60px" }}
        />
        
        {/* Inner shield layers */}
        <motion.path
          d="M60 28 L82 38 L82 55 C82 70 68 84 60 90 C52 84 38 70 38 55 L38 38 Z"
          fill="none"
          stroke="#306BFF"
          strokeWidth="0.5"
          strokeOpacity="0.4"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Center lock icon */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { 
            scale: isHovered ? 1.2 : 1, 
            opacity: 1,
          } : {}}
          transition={{ delay: 1, duration: 0.3 }}
          style={{ transformOrigin: "60px 60px" }}
        >
          <rect x="52" y="52" width="16" height="12" rx="2" fill="none" stroke="#306BFF" strokeWidth="1.5" />
          <path d="M56 52 L56 47 C56 44 58 42 60 42 C62 42 64 44 64 47 L64 52" fill="none" stroke="#306BFF" strokeWidth="1.5" />
        </motion.g>
        
        {/* Floating Swords */}
        {swords.map((sword) => {
          const rad = (sword.angle * Math.PI) / 180
          const x = 60 + Math.cos(rad) * sword.distance
          const y = 60 + Math.sin(rad) * sword.distance
          const attackRad = (getAttackAngle(sword.angle, sword.id) * Math.PI) / 180
          const attackX = 60 + Math.cos(attackRad) * (sword.distance - 25)
          const attackY = 60 + Math.sin(attackRad) * (sword.distance - 25)
          
          return (
            <motion.g
              key={sword.id}
              initial={{ opacity: 0, x: x - 60, y: y - 60, rotate: sword.angle + 45 }}
              animate={isInView ? {
                opacity: 1,
                x: isHovered ? [x - 60, attackX - 60, x - 60] : x - 60,
                y: isHovered ? [y - 60, attackY - 60, y - 60] : y - 60,
                rotate: isHovered 
                  ? [sword.angle + 45, sword.angle + 90, sword.angle + 45]
                  : [sword.angle + 45, sword.angle + 55, sword.angle + 45],
              } : {}}
              transition={{
                x: { duration: isHovered ? 0.3 : 2, repeat: Infinity, repeatDelay: isHovered ? 0.5 : 0 },
                y: { duration: isHovered ? 0.3 : 2, repeat: Infinity, repeatDelay: isHovered ? 0.5 : 0 },
                rotate: { duration: isHovered ? 0.3 : 3, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.5 },
                delay: sword.delay,
              }}
              style={{ transformOrigin: "60px 60px" }}
            >
              {/* Sword blade */}
              <path
                d="M60 45 L62 55 L60 70 L58 55 Z"
                fill="url(#swordGradient)"
              />
              {/* Sword handle */}
              <rect x="58" y="70" width="4" height="6" fill="#306BFF" />
              {/* Sword guard */}
              <rect x="55" y="68" width="10" height="2" fill="#306BFF" />
            </motion.g>
          )
        })}
        
        {/* Deflection sparks on hover */}
        {isHovered && swords.map((sword, i) => {
          const rad = (sword.angle * Math.PI) / 180
          const sparkX = 60 + Math.cos(rad) * 35
          const sparkY = 60 + Math.sin(rad) * 35
          
          return (
            <motion.g key={`spark-${sword.id}`}>
              {[0, 1, 2].map((j) => (
                <motion.circle
                  key={j}
                  cx={sparkX}
                  cy={sparkY}
                  r={1.5}
                  fill="#6B9FFF"
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 20],
                    y: [0, (Math.random() - 0.5) * 20],
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1 + j * 0.05,
                    repeat: Infinity,
                    repeatDelay: 0.3,
                  }}
                />
              ))}
            </motion.g>
          )
        })}
        
        {/* Pulse rings */}
        <motion.circle
          cx={60}
          cy={60}
          r={25}
          fill="none"
          stroke="#306BFF"
          strokeWidth="0.5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { 
            scale: isHovered ? [0.8, 1.8] : [0.8, 1.3], 
            opacity: [0.5, 0] 
          } : {}}
          transition={{ 
            duration: isHovered ? 0.5 : 2, 
            repeat: Infinity, 
            delay: 1 
          }}
          style={{ transformOrigin: "60px 60px" }}
        />
      </svg>
    </div>
  )
}

// =============================================================================
// NOISE TO SIGNAL ANIMATION - Bespoke Customizable
// =============================================================================
function NoiseToSignalAnimation({ isHovered }: { isHovered: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const noisePoints = React.useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    startX: 10 + Math.random() * 100,
    startY: 10 + Math.random() * 100,
    targetX: 60 + (Math.random() - 0.5) * 15,
    targetY: 60 + (Math.random() - 0.5) * 15,
  })), [])

  return (
    <div ref={ref} className="relative w-32 h-32 mb-6">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#306BFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#306BFF" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Background noise cloud */}
        {noisePoints.map((point, i) => (
          <motion.circle
            key={point.id}
            cx={point.startX}
            cy={point.startY}
            r={isHovered ? 1.5 : 1}
            fill="#306BFF"
            initial={{ opacity: 0.3 }}
            animate={isInView ? {
              x: isHovered ? point.targetX - point.startX : [0, point.targetX - point.startX, 0],
              y: isHovered ? point.targetY - point.startY : [0, point.targetY - point.startY, 0],
              opacity: isHovered ? 1 : [0.3, 0.8, 0.3],
            } : {}}
            transition={{
              x: { duration: isHovered ? 0.4 : 3 + Math.random() * 2, ease: "easeOut" },
              y: { duration: isHovered ? 0.4 : 3 + Math.random() * 2, ease: "easeOut" },
              opacity: { duration: isHovered ? 0.3 : 3 + Math.random() * 2 },
              delay: isHovered ? i * 0.005 : i * 0.03,
              repeat: isHovered ? 0 : Infinity,
            }}
          />
        ))}
        
        {/* Central signal point - the "decision" */}
        <motion.circle
          cx={60}
          cy={60}
          r={6}
          fill="url(#signalGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { 
            scale: isHovered ? 1.8 : 1, 
            opacity: 1,
          } : {}}
          transition={{ delay: 0.5, duration: 0.3 }}
          style={{ transformOrigin: "60px 60px" }}
        />
        
        {/* Signal waves emanating from center */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={60}
            cy={60}
            r={10}
            fill="none"
            stroke="#306BFF"
            strokeWidth="0.75"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={isInView ? { 
              scale: isHovered ? 5 : 3.5, 
              opacity: 0 
            } : {}}
            transition={{
              duration: isHovered ? 0.6 : 2,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
            style={{ transformOrigin: "60px 60px" }}
          />
        ))}
        
        {/* Connecting lines to center - showing synthesis */}
        {noisePoints.slice(0, 12).map((point, i) => (
          <motion.line
            key={i}
            x1={point.startX}
            y1={point.startY}
            x2={60}
            y2={60}
            stroke="#306BFF"
            strokeWidth="0.3"
            strokeOpacity="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { 
              pathLength: isHovered ? 1 : [0, 1, 0], 
              opacity: isHovered ? 0.5 : [0, 0.3, 0] 
            } : {}}
            transition={{
              duration: isHovered ? 0.3 : 2,
              delay: isHovered ? i * 0.03 : 1 + i * 0.08,
              repeat: isHovered ? 0 : Infinity,
              repeatDelay: 1
            }}
          />
        ))}
        
        {/* Glow effect on hover */}
        {isHovered && (
          <motion.circle
            cx={60}
            cy={60}
            r={12}
            fill="#306BFF"
            fillOpacity={0.15}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2], opacity: [0.3, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ transformOrigin: "60px 60px" }}
          />
        )}
      </svg>
    </div>
  )
}

// =============================================================================
// LAST-MILE DEPLOYMENT ANIMATION - Loading Bar
// =============================================================================
function DeploymentAnimation({ isHovered }: { isHovered: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    if (!isInView) return
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 75) {
          return 75
        }
        return prev + 0.5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isInView])

  React.useEffect(() => {
    if (isHovered) {
      const timeout = setTimeout(() => {
        setProgress(100)
      }, 50)
      return () => clearTimeout(timeout)
    } else {
      setProgress(75)
    }
  }, [isHovered])

  const segments = 10

  return (
    <div ref={ref} className="relative w-32 h-32 mb-6">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#306BFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#6B9FFF" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="barGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#306BFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6B9FFF" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background bar track */}
        <rect
          x="15"
          y="50"
          width="90"
          height="20"
          rx="4"
          fill="none"
          stroke="#306BFF"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        
        {/* Segment dividers */}
        {Array.from({ length: segments - 1 }).map((_, i) => (
          <line
            key={i}
            x1={15 + (90 / segments) * (i + 1)}
            y1="52"
            x2={15 + (90 / segments) * (i + 1)}
            y2="68"
            stroke="#306BFF"
            strokeWidth="0.5"
            strokeOpacity="0.2"
          />
        ))}
        
        {/* Progress fill segments */}
        {Array.from({ length: segments }).map((_, i) => {
          const segmentWidth = 90 / segments - 2
          const segmentStart = 16 + (90 / segments) * i
          const segmentProgress = (progress / 100) * segments
          const isActive = i < Math.floor(segmentProgress)
          const isPartial = i === Math.floor(segmentProgress)
          const partialFill = isPartial ? (segmentProgress % 1) : 0
          
          return (
            <motion.rect
              key={i}
              x={segmentStart}
              y="52"
              width={segmentWidth}
              height="16"
              rx="2"
              fill={isActive || isPartial ? "url(#barGradient)" : "transparent"}
              fillOpacity={isActive ? 1 : isPartial ? partialFill : 0}
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: isActive ? 1 : isPartial ? partialFill : 0,
                opacity: isActive ? 1 : isPartial ? partialFill : 0,
              }}
              transition={{
                duration: isHovered && isActive ? 0.1 : 0.3,
                delay: isHovered ? i * 0.03 : 0,
                ease: "easeOut",
              }}
              style={{ transformOrigin: `${segmentStart}px 60px` }}
            />
          )
        })}
        
        {/* Glow effect on fill */}
        <motion.rect
          x="16"
          y="52"
          width={(progress / 100) * 88}
          height="16"
          rx="2"
          fill="url(#barGlow)"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.8 : 0.4 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Scanning line effect on hover */}
        {isHovered && (
          <motion.line
            x1={15 + (progress / 100) * 90}
            y1="48"
            x2={15 + (progress / 100) * 90}
            y2="72"
            stroke="#6B9FFF"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
        
        {/* Percentage text */}
        <motion.text
          x="60"
          y="62"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#306BFF"
          fontSize="10"
          fontWeight="600"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.text>
        
        {/* Status indicator dots */}
        <g>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={30 + i * 30}
              cy="85"
              r={3}
              fill="#306BFF"
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: progress > 25 + i * 25 ? 1 : 0.3,
                scale: progress > 25 + i * 25 ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: `${30 + i * 30}px 85px` }}
            />
          ))}
        </g>
        
        {/* Status labels */}
        <text x="30" y="98" textAnchor="middle" fill="#306BFF" fontSize="6" opacity="0.6">BUILD</text>
        <text x="60" y="98" textAnchor="middle" fill="#306BFF" fontSize="6" opacity="0.6">TEST</text>
        <text x="90" y="98" textAnchor="middle" fill="#306BFF" fontSize="6" opacity="0.6">DEPLOY</text>
        
        {/* Completion burst effect */}
        {progress === 100 && (
          <>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2
              return (
                <motion.line
                  key={i}
                  x1="60"
                  y1="60"
                  x2={60 + Math.cos(angle) * 50}
                  y2={60 + Math.sin(angle) * 50}
                  stroke="#306BFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                />
              )
            })}
            <motion.circle
              cx="60"
              cy="60"
              r={30}
              fill="none"
              stroke="#306BFF"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: "60px 60px" }}
            />
          </>
        )}
        
        {/* Idle pulse at stuck point */}
        {!isHovered && progress >= 75 && (
          <motion.circle
            cx={82.5}
            cy="60"
            r={4}
            fill="#306BFF"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ transformOrigin: "82.5px 60px" }}
          />
        )}
      </svg>
    </div>
  )
}

const differentiators = [
  {
    icon: Shield,
    title: 'AI Sovereignty',
    tagline: 'Your data. Your rules. Your AI.',
    accent: 'accent',
    Animation: PrivacyAnimation,
  },
  {
    icon: Sparkles,
    title: 'Noise to Conviction',
    tagline: 'From 47 tabs to one decision.',
    accent: 'accent',
    Animation: NoiseToSignalAnimation,
  },
  {
    icon: Rocket,
    title: 'Last-Mile Deployment',
    tagline: 'From demo to deployed.',
    accent: 'accent',
    Animation: DeploymentAnimation,
  },
]

export function ValueProposition() {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  return (
    <Section variant="elevated" className="relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <SectionHeader
        label="Core Differentiators"
        title={<>From Noise <span className="text-content-tertiary">to</span> <span className="gradient-accent">Conviction</span></>}
        align="center"
        className="text-center mx-auto"
      />

      {/* USP Grid - Visual Focus */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {differentiators.map((item, index) => {
          const Icon = item.icon
          const isAccent = item.accent === 'accent'
          const AnimationComponent = item.Animation
          
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative p-8 rounded-2xl border border-border bg-surface-800/50 hover:bg-surface-800 hover:border-accent/20 transition-all duration-300 h-full">
                {/* Custom Animation */}
                <AnimationComponent isHovered={hoveredIndex === index} />

                {/* Title */}
                <h3 className="text-display-sm text-content-primary font-medium mb-3">
                  {item.title}
                </h3>

                {/* Tagline */}
                <p className={`text-body-lg font-medium ${isAccent ? 'text-accent' : 'text-accent'}`}>
                  {item.tagline}
                </p>

                {/* Hover Arrow */}
                <div className={`absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isAccent ? 'text-accent' : 'text-accent'
                }`}>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

export default ValueProposition
