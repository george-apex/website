'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/ui/section'

// =============================================================================
// CAR DEFINITIONS
// =============================================================================

const cars = [
  {
    id: 'general-ai',
    name: 'General AI',
    color: '#10A37F',
    crashText: 'Spun out under production load',
  },
  {
    id: 'reasoning-ai',
    name: 'Reasoning AI',
    color: '#D97706',
    crashText: 'Hit the wall - no guardrails',
  },
  {
    id: 'search-ai',
    name: 'Search AI',
    color: '#1E88E5',
    crashText: 'Ran off track - no traction',
  },
  {
    id: 'apexe3',
    name: 'APEX:E3',
    color: '#306BFF',
    crashText: null,
  },
]

// =============================================================================
// LEGEND
// =============================================================================

function Legend() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
      {cars.map((car) => (
        <div
          key={car.id}
          className="p-3 rounded-lg"
          style={{
            background: car.id === 'apexe3' 
              ? 'rgba(48, 107, 255, 0.1)'
              : 'rgba(255,255,255,0.02)',
            border: `1px solid ${car.id === 'apexe3' ? 'rgba(48, 107, 255, 0.3)' : 'rgba(255,255,255,0.05)'}`,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-2.5 rounded-sm"
              style={{ background: car.color }}
            />
            <span className="text-body-sm font-medium text-white/90">{car.name}</span>
          </div>
          <div className={`text-label mt-1.5 ${car.crashText ? 'text-[#E74C3C]/70' : 'text-[#2ECC71]/70'}`}>
            {car.crashText || '✓ Championship winner'}
          </div>
        </div>
      ))}
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function LastMileVideo() {
  const ref = React.useRef<HTMLDivElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isPlaying, setIsPlaying] = React.useState(false)

  // Auto-play when in view
  React.useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [isInView])

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
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
            The <span className="text-content-tertiary">Apex</span> corner.
          </h2>
          <p className="text-body-lg text-content-secondary max-w-2xl mx-auto">
            Championship on the line. Final lap. Four cars enter The Apex. 
            Only one makes it through to claim the title.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="relative w-full rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 0 40px rgba(0,0,0,0.3)',
            }}
          >
            {/* Video */}
            <video
              ref={videoRef}
              className="w-full h-auto"
              style={{ aspectRatio: '16/9' }}
              muted
              playsInline
              onEnded={() => setIsPlaying(false)}
            >
              <source src="/last-mile-f1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay gradient at bottom */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
              }}
            />
          </div>

          {/* Replay Button */}
          <div className="flex items-center justify-center">
            <motion.button
              onClick={handleReplay}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-label font-medium text-white/50 hover:text-white/80 hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8C2 4.68629 4.68629 2 8 2C10.5 2 12.5 3.5 13.5 5.5M14 8C14 11.3137 11.3137 14 8 14C5.5 14 3.5 12.5 2.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M13 2V5.5H9.5M3 14V10.5H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Replay Video
            </motion.button>
          </div>

          <Legend />
        </motion.div>

        {/* Narration Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <blockquote className="text-body-lg text-white/70 italic max-w-2xl mx-auto">
            "Four cars enter The Apex—only ONE makes it to production. Championship decided."
          </blockquote>
        </motion.div>
      </div>
    </Section>
  )
}

export default LastMileVideo
