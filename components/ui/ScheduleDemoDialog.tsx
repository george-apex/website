'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Sparkles, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface ScheduleDemoDialogProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ScheduleDemoDialog({ trigger, open, onOpenChange }: ScheduleDemoDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = isControlled ? onOpenChange! : setInternalOpen

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-4xl bg-surface-800 border-border p-0 overflow-hidden">
        <div className="relative">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 bg-radial-accent opacity-30" />
          
          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-5 h-5 text-accent" />
                </motion.div>
                <span className="text-sm text-content-secondary">
                  Start Your AI Journey
                </span>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-bold">
                <span className="text-content-primary">Ready to Deploy</span>
                <br />
                <span className="gradient-accent">AI at Scale?</span>
              </DialogTitle>
            </DialogHeader>

            <motion.p
              className="text-content-secondary mb-8 max-w-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Speak with our AI strategy team and discover how APEXE3 can help 
              you achieve sovereign, bespoke, and deployable AI solutions.
            </motion.p>

            {/* Two column layout */}
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Form */}
              <div>
                <form className="space-y-4">
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
                  <Button type="submit" className="w-full group">
                    <Calendar className="w-4 h-4" />
                    <span>Book a Demo</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-content-tertiary text-center">
                    By submitting, you agree to our{' '}
                    <Link href="/privacy" className="text-accent hover:text-accent-light transition-colors">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/terms" className="text-accent hover:text-accent-light transition-colors">
                      Terms of Service
                    </Link>.
                  </p>
                </form>
              </div>

              {/* Stats & Trust */}
              <div className="space-y-6">
                {/* Trust indicators */}
                <div className="space-y-3">
                  {[
                    { text: 'Free consultation', icon: '✓' },
                    { text: 'No commitment required', icon: '✓' },
                    { text: 'Response within 24 hours', icon: '✓' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.text}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-positive"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                      <span className="text-content-secondary text-sm">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: '150+', label: 'Enterprise Clients', icon: Target },
                    { value: '99.9%', label: 'Uptime SLA', icon: Zap },
                    { value: '500K+', label: 'Users Deployed', icon: null },
                    { value: '40+', label: 'Countries', icon: null },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded bg-surface-700/50 border border-border hover:border-accent/20 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="text-xl font-bold text-content-primary font-mono mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-content-tertiary uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ScheduleDemoDialog
