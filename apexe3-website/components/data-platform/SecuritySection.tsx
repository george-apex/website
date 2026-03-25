'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Shield,
  Lock,
  Eye,
  Key,
  FileLock,
  Server,
  Fingerprint,
  Bell,
  CheckCircle2
} from 'lucide-react'

const securityFeatures = [
  {
    icon: Lock,
    title: 'Data Isolation',
    description: 'Your data is logically and physically isolated from other clients',
  },
  {
    icon: Eye,
    title: 'Private by Design',
    description: 'No cross-client data exposure—your insights stay yours',
  },
  {
    icon: Fingerprint,
    title: 'No Model Training',
    description: 'Your proprietary data is never used to train shared models',
  },
  {
    icon: Key,
    title: 'Encryption',
    description: 'End-to-end encryption for data at rest and in transit',
  },
  {
    icon: Server,
    title: 'Access Controls',
    description: 'Role-based access with granular permissions',
  },
  {
    icon: Bell,
    title: 'Audit Logging',
    description: 'Complete audit trail for compliance and monitoring',
  },
]

const complianceBadges = [
  'SOC 2 Type II',
  'ISO 27001',
  'GDPR Ready',
  'FINRA Aligned',
]

// Animated shield visualization
function SecurityShield() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-accent/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Middle ring */}
      <motion.div
        className="absolute inset-4 rounded-full border border-accent/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Inner ring with nodes */}
      <motion.div
        className="absolute inset-8 rounded-full border border-accent/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        {/* Security nodes */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-accent/50"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 60}deg) translateY(-88px) translateX(-50%)`,
            }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </motion.div>
      
      {/* Core shield */}
      <motion.div
        className="absolute inset-16 rounded-full bg-gradient-to-br from-accent/20 to-transparent 
                   border border-accent/30 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Shield className="w-16 h-16 text-accent" />
        </motion.div>
      </motion.div>
      
      {/* Floating checkmarks */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${20 + i * 30}%`,
            left: `${-10 + i * 20}%`,
          }}
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
        >
          <CheckCircle2 className="w-5 h-5 text-green-500/70" />
        </motion.div>
      ))}
    </div>
  )
}

// Lock animation
function AnimatedLock() {
  return (
    <motion.div
      className="relative w-16 h-16 mx-auto"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent to-accent flex items-center justify-center">
        <Lock className="w-8 h-8 text-white" />
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg bg-accent/50 blur-xl opacity-50" />
    </motion.div>
  )
}

export function SecuritySection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredFeature, setHoveredFeature] = React.useState<number | null>(null)

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-900 via-surface-800/50 to-surface-900" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="container-main relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 
                         border border-green-500/30 mb-6">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-400 font-medium">Enterprise Security</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-content-primary mb-4">
            Your Data, Your Control
          </h2>
          <p className="text-lg text-content-secondary max-w-2xl mx-auto">
            Built for institutional investors, asset managers, and regulated environments. 
            Your proprietary data stays private and protected.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <SecurityShield />
          </motion.div>

          {/* Right - Features */}
          <div className="space-y-4">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-300
                           ${hoveredFeature === index 
                             ? 'border-accent/50 bg-accent/5' 
                             : 'border-border/50 bg-surface-800/30'}`}
              >
                <motion.div
                  className={`p-2 rounded-lg ${hoveredFeature === index ? 'bg-accent/20' : 'bg-surface-700'}`}
                  animate={{ rotate: hoveredFeature === index ? [0, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <feature.icon className="w-5 h-5 text-accent" />
                </motion.div>
                <div>
                  <h3 className="text-sm font-semibold text-content-primary mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-content-secondary">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Compliance badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {complianceBadges.map((badge, index) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
              className="px-4 py-2 rounded-full bg-surface-800/50 border border-border/50
                         flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm text-content-secondary">{badge}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
