'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/ui/section'

// =============================================================================
// VEHICLE DEFINITIONS
// =============================================================================

const vehicles = [
  {
    id: 'general-ai',
    name: 'General AI',
    color: '#000000',
    accentColor: '#10A37F',
    lane: 0,
    failure: 'detour',
    failureText: 'Fragmented under production load',
  },
  {
    id: 'reasoning-ai',
    name: 'Reasoning AI',
    color: '#D97706',
    accentColor: '#F97316',
    lane: 1,
    failure: 'stopped',
    failureText: 'No domain-specific guardrails',
  },
  {
    id: 'search-ai',
    name: 'Search AI',
    color: '#1E88E5',
    accentColor: '#64B5F6',
    lane: 2,
    failure: 'uturn',
    failureText: 'Search ≠ Action',
  },
  {
    id: 'apexe3',
    name: 'APEX:E3',
    color: '#306BFF',
    accentColor: '#6B9FFF',
    lane: 3,
    failure: null,
    failureText: null,
  },
]

// =============================================================================
// VEHICLE COMPONENT
// =============================================================================

interface VehicleProps {
  vehicle: typeof vehicles[0]
  progress: number
}

function Vehicle({ vehicle, progress }: VehicleProps) {
  const isApexE3 = vehicle.id === 'apexe3'
  
  // Calculate position
  const xPos = Math.min(progress * 100, 100)
  const hasFailed = !isApexE3 && progress >= 0.68
  const hasCompleted = isApexE3 && progress >= 1
  
  // Failure animation states
  const getFailureTransform = () => {
    if (!hasFailed || isApexE3) return { x: 0, y: 0, rotate: 0, scale: 1 }
    
    switch (vehicle.failure) {
      case 'detour':
        return { x: 30, y: -20, rotate: -20, scale: 0.85 }
      case 'stopped':
        return { x: 0, y: 0, rotate: 0, scale: 1 }
      case 'uturn':
        return { x: -20, y: 0, rotate: 180, scale: 0.9 }
      default:
        return { x: 0, y: 0, rotate: 0, scale: 1 }
    }
  }
  
  const failureState = getFailureTransform()
  
  return (
    <motion.div
      className="absolute flex items-center gap-3 z-10"
      initial={{ left: '3%', opacity: 0 }}
      animate={{
        left: hasFailed ? '68%' : `${xPos}%`,
        opacity: hasFailed ? 0.5 : 1,
        x: failureState.x,
        y: failureState.y,
        rotate: failureState.rotate,
        scale: failureState.scale,
      }}
      transition={{
        duration: 0.1,
        ease: 'linear',
      }}
      style={{ top: `${vehicle.lane * 60 + 30}px` }}
    >
      {/* Vehicle - simple rectangle */}
      <div
        className="w-16 h-8 rounded-md relative"
        style={{
          background: vehicle.color,
          boxShadow: isApexE3
            ? `0 0 20px ${vehicle.color}50`
            : '0 2px 10px rgba(0,0,0,0.3)',
          border: `2px solid ${vehicle.accentColor}`,
        }}
      >
        {/* Headlight */}
        <div
          className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            background: isApexE3 ? '#fff' : vehicle.accentColor,
            boxShadow: isApexE3 ? '0 0 6px #fff' : `0 0 4px ${vehicle.accentColor}`,
          }}
        />
      </div>
      
      {/* Label */}
      <motion.div
        className="absolute left-full ml-2 whitespace-nowrap"
        animate={{ opacity: hasFailed ? 0.6 : 1 }}
      >
        <div
          className="text-body-sm font-semibold"
          style={{ color: isApexE3 ? vehicle.accentColor : 'rgba(255,255,255,0.9)' }}
        >
          {vehicle.name}
        </div>
        {hasFailed && (
          <div className="text-label text-[#E74C3C] mt-0.5">
            {vehicle.failureText}
          </div>
        )}
        {hasCompleted && (
          <div className="text-label text-[#2ECC71] mt-0.5">
            ✓ Deployed to Production
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// =============================================================================
// HIGHWAY COMPONENT
// =============================================================================

function Highway({ progress }: { progress: number }) {
  return (
    <div className="relative w-full h-[280px] rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(20,21,23,0.95) 0%, rgba(12,13,15,0.98) 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Lane markings */}
      <div className="absolute inset-0">
        {[0, 1, 2, 3].map((lane) => (
          <div
            key={lane}
            className="absolute left-0 right-0 h-[60px]"
            style={{ top: `${lane * 60}px` }}
          >
            {/* Lane divider (dashed line) */}
            {lane < 3 && (
              <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                <div className="absolute inset-0 flex">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 mx-4 h-px rounded-full"
                      style={{ background: 'rgba(255,255,255,0.15)' }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Zone labels */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Start */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <div className="text-label text-white/40 tracking-wider">START</div>
        </div>
        
        {/* Last Mile zone */}
        <div 
          className="absolute left-[60%] top-0 bottom-0 w-[40%]"
          style={{
            background: progress >= 0.6 
              ? 'linear-gradient(90deg, transparent, rgba(231, 76, 60, 0.05))'
              : 'transparent',
          }}
        >
          <div className="absolute top-3 left-1/2 -translate-x-1/2">
            <div className="text-label text-[#E74C3C] tracking-wider">
              {progress >= 0.6 ? '⚠ LAST MILE' : 'LAST MILE'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Vehicles */}
      {vehicles.map((vehicle) => (
        <Vehicle
          key={vehicle.id}
          vehicle={vehicle}
          progress={progress}
        />
      ))}
      
      {/* Finish line */}
      <motion.div
        className="absolute right-12 top-0 bottom-0 w-1 rounded-full"
        style={{
          background: progress >= 0.95 
            ? 'linear-gradient(180deg, transparent, #2ECC71, transparent)'
            : 'rgba(255,255,255,0.1)',
          boxShadow: progress >= 0.95 ? '0 0 15px #2ECC71' : 'none',
        }}
      />
      
      {/* Production label */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div 
          className="text-label font-semibold tracking-wider"
          style={{ color: progress >= 1 ? '#2ECC71' : 'rgba(255,255,255,0.5)' }}
        >
          PRODUCTION
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// LEGEND
// =============================================================================

function Legend() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="p-3 rounded-lg"
          style={{
            background: vehicle.id === 'apexe3' 
              ? 'rgba(48, 107, 255, 0.1)'
              : 'rgba(255,255,255,0.02)',
            border: `1px solid ${vehicle.id === 'apexe3' ? 'rgba(48, 107, 255, 0.3)' : 'rgba(255,255,255,0.05)'}`,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-3 rounded"
              style={{
                background: vehicle.color,
                border: `1px solid ${vehicle.accentColor}`,
              }}
            />
            <span className="text-body-sm font-medium text-white/90">{vehicle.name}</span>
          </div>
          <div className={`text-label mt-1.5 ${vehicle.failure ? 'text-[#E74C3C]/70' : 'text-[#2ECC71]/70'}`}>
            {vehicle.failure ? vehicle.failureText : '✓ Production ready'}
          </div>
        </div>
      ))}
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function LastMileTraffic() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [progress, setProgress] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [hasPlayed, setHasPlayed] = React.useState(false)

  // Auto-play when in view
  React.useEffect(() => {
    if (isInView && !hasPlayed) {
      setIsPlaying(true)
      setHasPlayed(true)
    }
  }, [isInView, hasPlayed])

  // Animation loop
  React.useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          setIsPlaying(false)
          return 1
        }
        return prev + 0.003
      })
    }, 16)

    return () => clearInterval(interval)
  }, [isPlaying])

  const handleReplay = () => {
    setProgress(0)
    setIsPlaying(true)
  }

  return (
    <Section variant="default" className="relative overflow-hidden" container={false}>
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-radial-accent opacity-[0.08]" />
      </div>

      <div ref={ref} className="container-main relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block text-label font-medium text-accent mb-3 tracking-wider">
            THE LAST MILE
          </span>
          <h2 className="text-display-lg lg:text-display-xl text-content-primary font-medium max-w-3xl mx-auto mb-4">
            The highway to <span className="text-content-tertiary">production.</span>
          </h2>
          <p className="text-body-lg text-content-secondary max-w-2xl mx-auto">
            Everyone starts the journey. Most get stuck in the last mile. 
            See who actually makes it to production.
          </p>
        </motion.div>

        {/* Highway Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <Highway progress={progress} />
          
          {/* Progress & Replay */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-label text-white/40">Progress</span>
              <div className="w-32 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-label text-white/70 font-medium">
                {Math.round(progress * 100)}%
              </span>
            </div>
            
            <motion.button
              onClick={handleReplay}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-label text-white/50 hover:text-white/80 hover:bg-white/5 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 8C2 4.68629 4.68629 2 8 2C10.5 2 12.5 3.5 13.5 5.5M14 8C14 11.3137 11.3137 14 8 14C5.5 14 3.5 12.5 2.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M13 2V5.5H9.5M3 14V10.5H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Replay
            </motion.button>
          </div>

          <Legend />
        </motion.div>
      </div>
    </Section>
  )
}

export default LastMileTraffic
