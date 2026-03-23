'use client'

import * as React from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { 
  Settings, Headphones, BookOpen, BarChart, ShieldCheck, Zap,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { USE_CASES } from '@/lib/constants'
import { cn } from '@/lib/utils'

// Icon map
const iconMap = {
  Settings: Settings,
  Headphones: Headphones,
  BookOpen: BookOpen,
  BarChart: BarChart,
  ShieldCheck: ShieldCheck,
  Zap: Zap,
}

// Animated counter component
function AnimatedCounter({ 
  value, 
  delay = 0 
}: { 
  value: string
  delay?: number 
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  // Parse the value to extract number and suffix
  const parsed = React.useMemo(() => {
    const match = value.match(/^([\d.]+)(.*)$/)
    if (match) {
      return { num: parseFloat(match[1]), suffix: match[2] }
    }
    return { num: 0, suffix: value }
  }, [value])
  
  const spring = useSpring(0, { 
    stiffness: 50, 
    damping: 20,
    mass: 1
  })
  
  const display = useTransform(spring, (latest) => {
    if (parsed.suffix === 'x') {
      return latest.toFixed(1) + parsed.suffix
    }
    if (parsed.suffix === '%') {
      return Math.round(latest) + parsed.suffix
    }
    return latest.toFixed(latest >= 10 ? 0 : 1) + parsed.suffix
  })
  
  React.useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        spring.set(parsed.num)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, parsed.num, spring, delay])
  
  return (
    <motion.div ref={ref} className="text-2xl font-bold text-content-primary font-mono tracking-tight data-mono">
      <motion.span>{display}</motion.span>
    </motion.div>
  )
}

// Data flow particle
function DataFlowParticle({ delay, duration }: { delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-accent/30"
      initial={{ x: -10, opacity: 0 }}
      animate={{ 
        x: ['0%', '100%'],
        opacity: [0, 0.6, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{ top: `${30 + Math.random() * 40}%` }}
    />
  )
}

// Industries data
const INDUSTRIES = [
  { name: 'Financial Services', icon: '◈' },
  { name: 'Healthcare', icon: '◆' },
  { name: 'Manufacturing', icon: '◇' },
  { name: 'Legal Services', icon: '▣' },
  { name: 'Government', icon: '▢' },
  { name: 'Energy', icon: '⚡' },
  { name: 'Telecommunications', icon: '◎' },
  { name: 'Insurance', icon: '◉' },
]

export function UseCases() {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null)

  return (
    <section id="use-cases" className="section-main relative overflow-hidden bg-surface-800">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-radial-accent opacity-30" />
      
      {/* Accent line */}
      <motion.div
        className="absolute left-0 right-0 h-px top-[10%]"
        style={{ 
          background: 'linear-gradient(90deg, transparent, rgba(74, 144, 217, 0.15) 30%, rgba(74, 144, 217, 0.2) 50%, rgba(74, 144, 217, 0.15) 70%, transparent)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className="container-main relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Use Cases</span>
          <h2 className="section-title">
            <span className="text-content-primary">Built for</span>{' '}
            <span className="gradient-accent">Enterprise Reality</span>
          </h2>
          <p className="section-subtitle mx-auto">
            See how APEXE3 transforms operations across different enterprise 
            environments with measurable, outcome-focused results.
          </p>
        </motion.div>

        {/* Use cases grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {USE_CASES.map((useCase, index) => {
            const Icon = iconMap[useCase.icon as keyof typeof iconMap]
            const isHovered = hoveredCard === useCase.id
            
            return (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                onMouseEnter={() => setHoveredCard(useCase.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative"
              >
                {/* Trajectory entrance line */}
                <motion.div
                  className="absolute -left-8 top-1/2 w-6 h-px bg-gradient-to-r from-accent/40 to-transparent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1 + 0.3,
                    ease: "easeOut"
                  }}
                />
                
                {/* Card */}
                <Card 
                  variant="interactive" 
                  className={cn(
                    'h-full p-6 lg:p-7 overflow-hidden relative',
                    isHovered && 'border-accent/30'
                  )}
                >
                  {/* Shimmer sweep on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: '-100%' }}
                    animate={{ x: isHovered ? '100%' : '-100%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(74, 144, 217, 0.05), transparent)',
                      width: '50%'
                    }}
                  />
                  
                  {/* Data flow particles */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      {[...Array(3)].map((_, i) => (
                        <DataFlowParticle 
                          key={i} 
                          delay={i * 0.3} 
                          duration={2 + i * 0.5} 
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Top accent line */}
                  <motion.div 
                    className="absolute top-0 left-6 right-6 h-px rounded-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ 
                      scaleX: isHovered ? 1 : 0, 
                      opacity: isHovered ? 1 : 0 
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(74, 144, 217, 0.4), transparent)',
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon and metric row */}
                    <div className="flex items-start justify-between mb-6">
                      {/* Icon container with pulse */}
                      <div className="relative">
                        {/* Pulse ring */}
                        <motion.div
                          className={cn(
                            'absolute inset-0 rounded border border-accent/20',
                          )}
                          animate={isHovered ? {
                            scale: [1, 1.3, 1.3],
                            opacity: [0.5, 0, 0]
                          } : {}}
                          transition={{ 
                            duration: 1.5, 
                            repeat: isHovered ? Infinity : 0,
                            ease: "easeOut"
                          }}
                        />
                        <div className={cn(
                          'w-12 h-12 rounded border border-border bg-accent/5',
                          'flex items-center justify-center transition-all duration-300',
                          'group-hover:border-accent/30 group-hover:bg-accent/10',
                          isHovered && 'border-accent/30 bg-accent/10'
                        )}>
                          <motion.div
                            animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon className="w-5 h-5 text-accent" />
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Metric badge with counter */}
                      <div className="text-right">
                        <AnimatedCounter 
                          value={useCase.metrics.improvement} 
                          delay={index * 0.1 + 0.3} 
                        />
                        <div className="text-xs text-content-tertiary uppercase tracking-wider">
                          {useCase.metrics.label}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <motion.h3 
                      className={cn(
                        'text-lg font-medium text-content-primary mb-3 transition-colors duration-300',
                        isHovered && 'text-accent'
                      )}
                      animate={isHovered ? { x: 4 } : { x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {useCase.title}
                    </motion.h3>

                    {/* Description */}
                    <p className="text-sm text-content-secondary mb-6 leading-relaxed">
                      {useCase.description}
                    </p>

                    {/* Action link */}
                    <div className="pt-4 border-t border-border">
                      <a
                        href={`#${useCase.id}`}
                        className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-accent transition-colors group/link"
                      >
                        <span>View case study</span>
                        <motion.div
                          animate={isHovered ? { x: 4 } : { x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </a>
                    </div>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 overflow-hidden rounded-br-card">
                    <motion.div 
                      className="absolute bottom-0 right-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        background: 'linear-gradient(to top left, rgba(74, 144, 217, 0.08), transparent)',
                      }}
                    />
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Industries section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative"
        >
          {/* Decorative trajectory line */}
          <motion.div
            className="absolute left-0 right-0 -top-4 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(74, 144, 217, 0.1) 20%, rgba(74, 144, 217, 0.15) 50%, rgba(74, 144, 217, 0.1) 80%, transparent)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
          />
          
          {/* Panel */}
          <Card variant="panel" className="p-8 lg:p-10 relative overflow-hidden">
            {/* Subtle background grid animation */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(74, 144, 217, 0.15) 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <motion.h3 
                className="text-xl font-medium text-content-primary mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Industries We Serve
              </motion.h3>
              <motion.p 
                className="text-sm text-content-secondary"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Tailored AI solutions for regulated, complex, and demanding environments
              </motion.p>
            </div>

            {/* Industries grid */}
            <div className="flex flex-wrap justify-center gap-3 relative z-10">
              {INDUSTRIES.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: [0.21, 0.47, 0.32, 0.98]
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded border border-border bg-surface-700 hover:border-data/30 hover:bg-data/5 transition-colors duration-200 cursor-default group relative overflow-hidden"
                >
                  {/* Hover shimmer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(48, 158, 186, 0.1), transparent)',
                      width: '50%'
                    }}
                  />
                  <motion.span 
                    className="text-data text-sm font-mono relative z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {industry.icon}
                  </motion.span>
                  <span className="text-sm text-content-secondary group-hover:text-content-primary transition-colors relative z-10">
                    {industry.name}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 pt-6 border-t border-border text-center relative z-10">
              <motion.p 
                className="text-content-tertiary text-sm mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Don&apos;t see your industry? Let&apos;s discuss how APEXE3 can work for your specific needs.
              </motion.p>
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-light transition-colors group relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ x: 4 }}
              >
                <span>Talk to an AI specialist</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.a>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default UseCases
