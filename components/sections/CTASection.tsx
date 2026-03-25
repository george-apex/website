'use client'

import * as React from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Calendar, MessageSquare, Sparkles, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

// =============================================================================
// TRAJECTORY ACCELERATION LINE - Shows precision/acceleration motion
// =============================================================================

function TrajectoryAccelerationLine() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  return (
    <div ref={ref} className="absolute inset-0 top-36 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ctaTrajectory" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#306BFF" stopOpacity="0" />
            <stop offset="30%" stopColor="#306BFF" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#306BFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#306BFF" stopOpacity="0.2" />
          </linearGradient>
          <filter id="ctaGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Main trajectory line */}
        <motion.path
          d="M 0,50 Q 25,50 40,35 T 60,25 T 100,10"
          fill="none"
          stroke="url(#ctaTrajectory)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#ctaGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          vectorEffect="non-scaling-stroke"
          transform="scale(1, 4) translate(0, 20)"
        />
        
        {/* Acceleration markers */}
        {[0.3, 0.5, 0.7, 0.9].map((pos, i) => (
          <motion.circle
            key={`marker-${i}`}
            cx={`${pos * 100}%`}
            cy={`${50 - pos * 35}%`}
            r="3"
            fill="#306BFF"
            fillOpacity="0.4"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.6 } : {}}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.3 }}
            transform={`translate(0, ${pos * -15})`}
          />
        ))}
        
        {/* Moving particle along trajectory */}
        <motion.circle
          r="4"
          fill="#306BFF"
          filter="url(#ctaGlow)"
          initial={{ 
            cx: '0%', 
            cy: '50%',
            opacity: 0 
          }}
          animate={isInView ? {
            cx: ['0%', '100%'],
            cy: ['50%', '10%'],
            opacity: [0, 1, 1, 0],
          } : {}}
          transition={{
            duration: 3,
            delay: 1.5,
            repeat: Infinity,
            repeatDelay: 4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          transform="translate(0, 0)"
        />
      </svg>
    </div>
  )
}

export function CTASection() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  return (
    <section id="contact" className="relative overflow-hidden bg-surface-800 pt-28 min-[800px]:mt-36 min-[800px]:pt-16">
      {/* Background grid */}
      <div className="absolute inset-0 top-36 bg-grid opacity-30" />
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 top-36 bg-radial-accent opacity-40" />
      
      {/* Trajectory acceleration line */}
      <TrajectoryAccelerationLine />
      
      {/* Accent lines */}
      <motion.div
        className="absolute left-0 right-0 h-px top-[15%]"
        style={{ 
          background: 'linear-gradient(90deg, transparent, rgba(48, 107, 255, 0.2) 30%, rgba(48, 107, 255, 0.3) 50%, rgba(48, 107, 255, 0.2) 70%, transparent)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px bottom-[15%]"
        style={{ 
          background: 'linear-gradient(90deg, transparent, rgba(48, 107, 255, 0.15) 30%, rgba(48, 107, 255, 0.2) 50%, rgba(48, 107, 255, 0.15) 70%, transparent)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />

      <div className="container-main relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge with pulse animation */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-accent/20 bg-accent/5 mb-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-sm text-content-secondary relative z-10">
              Start Your AI Journey
            </span>
          </motion.div>

          {/* Headline with staggered reveal */}
          <div className="overflow-hidden mb-6">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-content-primary">Ready to Deploy</span>
              <br />
              <span className="gradient-accent">AI at Scale?</span>
            </motion.h2>
          </div>

          {/* Subheadline */}
          <motion.p
            className="section-subtitle mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Speak with our AI strategy team and discover how APEXE3 can help 
            you achieve sovereign, bespoke, and deployable AI solutions.
          </motion.p>

          {/* CTA buttons with hover acceleration */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="group min-w-[200px] relative overflow-hidden">
                  {/* Animated background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent via-accent-light to-accent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                  <Calendar className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Book a Demo</span>
                  <motion.div
                    className="relative z-10"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg bg-surface-800 border-border">
                <DialogHeader>
                  <DialogTitle className="text-content-primary">Book Your Demo</DialogTitle>
                </DialogHeader>
                <form className="space-y-4 mt-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-content-tertiary mb-1.5 block">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="input-base"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-content-tertiary mb-1.5 block">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="input-base"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-content-tertiary mb-1.5 block">
                      Work Email
                    </label>
                    <input
                      type="email"
                      className="input-base"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-content-tertiary mb-1.5 block">
                      Company
                    </label>
                    <input
                      type="text"
                      className="input-base"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-content-tertiary mb-1.5 block">
                      What are you looking to achieve?
                    </label>
                    <textarea
                      rows={3}
                      className="input-base resize-none"
                      placeholder="Tell us about your AI goals..."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Request Demo
                  </Button>
                  <p className="text-xs text-content-tertiary text-center">
                    By submitting, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="secondary" size="lg" className="group min-w-[200px] relative overflow-hidden">
              {/* Subtle hover effect */}
              <motion.div
                className="absolute inset-0 bg-surface-600"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.2 }}
              />
              <MessageSquare className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Talk to Sales</span>
            </Button>
          </motion.div>

          {/* Trust indicators with staggered reveal */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-6 text-content-tertiary text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { text: 'Free consultation', icon: '✓' },
              { text: 'No commitment required', icon: '✓' },
              { text: 'Response within 24 hours', icon: '✓' },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-positive"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats bar with counter animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 max-[393px]:mt-0"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '150+', label: 'Enterprise Clients', icon: Target },
              { value: '99.9%', label: 'Uptime SLA', icon: Zap },
              { value: '500K+', label: 'Users Deployed', icon: null },
              { value: '40+', label: 'Countries', icon: null },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded bg-surface-700 border border-border relative overflow-hidden group hover:border-accent/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Subtle hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(48, 107, 255, 0.05) 0%, transparent 70%)',
                  }}
                />
                <div className="relative z-10">
                  <div className="text-2xl font-bold text-content-primary font-mono mb-1 data-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs text-content-tertiary uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
