'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Activity, 
  TrendingUp, 
  Database, 
  Brain, 
  Zap, 
  Shield,
  ArrowRight,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Animated data stream visualization
function DataStream() {
  const particles = React.useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 2 + Math.random() * 4
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [-20, '100vh'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

// Animated metrics cards
function MetricCard({ value, label, trend, delay }: { 
  value: string
  label: string
  trend?: 'up' | 'down'
  delay: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="relative bg-surface-800/60 backdrop-blur-xl border border-border/50 rounded-xl p-4 
                 hover:border-accent/30 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-mono font-bold text-content-primary">{value}</span>
        {trend && (
          <TrendingUp className={`w-4 h-4 ${trend === 'up' ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
        )}
      </div>
      <p className="text-sm text-content-tertiary">{label}</p>
      <div className="absolute inset-0 rounded-xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}

// Central orb visualization
function CentralOrb() {
  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-accent/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Middle ring */}
      <motion.div
        className="absolute inset-4 rounded-full border border-accent/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Inner ring */}
      <motion.div
        className="absolute inset-8 rounded-full border border-accent/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Core */}
      <motion.div
        className="absolute inset-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/20 backdrop-blur-xl
                   flex items-center justify-center border border-accent/30"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Brain className="w-16 h-16 text-accent" />
      </motion.div>
      
      {/* Orbiting dots */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-accent"
          style={{
            top: '50%',
            left: '50%',
            marginTop: -6,
            marginLeft: -6,
          }}
          animate={{
            x: [0, Math.cos((i * Math.PI) / 2) * 130, 0, Math.cos((i * Math.PI) / 2 + Math.PI) * 130, 0],
            y: [0, Math.sin((i * Math.PI) / 2) * 130, 0, Math.sin((i * Math.PI) / 2 + Math.PI) * 130, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 2.5,
          }}
        />
      ))}
    </div>
  )
}

// Data type icons orbiting
const dataTypes = [
  { icon: Activity, label: 'Market Data', color: 'text-green-500' },
  { icon: Database, label: 'Fundamentals', color: 'text-blue-500' },
  { icon: TrendingUp, label: 'Macro', color: 'text-purple-500' },
  { icon: Shield, label: 'ESG', color: 'text-teal-500' },
  { icon: Zap, label: 'Sentiment', color: 'text-yellow-500' },
  { icon: Brain, label: 'AI Signals', color: 'text-accent' },
]

export function DataPlatformHero() {
  const [activeType, setActiveType] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveType((prev) => (prev + 1) % dataTypes.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 max-[393px]:pt-0">
      <DataStream />
      
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-accent font-medium">Real-Time Infrastructure</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-content-primary mb-6 leading-tight">
              Data Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent">
                Faster Decisions
              </span>
            </h1>

            <p className="text-lg text-content-secondary mb-8 max-w-xl">
              Real-time, point-in-time financial data infrastructure powering AI agents, 
              trading signals, and portfolio decisions—keeping your data private.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="group">
                Request Demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                <Play className="w-4 h-4 mr-2" />
                Watch Video
              </Button>
            </div>

            {/* Live metrics */}
            <div className="grid grid-cols-3 gap-4">
              <MetricCard value="50+" label="Data Sources" delay={0.3} />
              <MetricCard value="<100ms" label="Latency" trend="up" delay={0.4} />
              <MetricCard value="99.9%" label="Uptime" trend="up" delay={0.5} />
            </div>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <CentralOrb />
            
            {/* Floating data type badges */}
            <div className="absolute inset-0">
              {dataTypes.map((type, i) => {
                const angle = (i * 60 - 90) * (Math.PI / 180)
                const radius = 180
                const x = Math.cos(angle) * radius + 144
                const y = Math.sin(angle) * radius + 144
                
                return (
                  <motion.div
                    key={type.label}
                    className={`absolute px-3 py-1.5 rounded-full bg-surface-800/80 backdrop-blur border border-border/50
                               flex items-center gap-2 cursor-pointer transition-all duration-300
                               ${activeType === i ? 'border-accent/50 scale-110' : ''}`}
                    style={{ left: x, top: y }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    onClick={() => setActiveType(i)}
                  >
                    <type.icon className={`w-4 h-4 ${type.color}`} />
                    <span className="text-sm text-content-secondary whitespace-nowrap">{type.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-content-tertiary flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-accent"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
