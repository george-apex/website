'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { AnimatedGrid } from '@/components/effects/AnimatedGrid'
import { GlowOrb } from '@/components/effects/GlowOrb'
import { ScheduleDemoDialog } from '@/components/ui/ScheduleDemoDialog'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Lock, 
  Rocket, 
  Target, 
  Server, 
  Cpu,
  Building2,
  Users,
  Award,
  ArrowRight
} from 'lucide-react'

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
}

// =============================================================================
// HERO SECTION
// =============================================================================

function HeroSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-surface-900" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-900 via-transparent to-surface-900" />
      
      {/* Accent glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(48, 107, 255, 0.12) 0%, transparent 70%)',
        }}
      />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(48, 107, 255, 0.03) 50%, transparent 100%)',
        }}
      />

      <Container className="relative z-10 py-20 lg:py-32">
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent tracking-wide uppercase">About Us</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight mb-6"
          >
            <span className="text-content-primary">Built for the realities of</span>
            <br />
            <span className="gradient-accent">enterprise AI</span>
          </motion.h1>

          {/* Divider line */}
          <motion.div
            variants={fadeUp}
            className="w-24 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent mx-auto mb-8"
          />

          {/* Supporting copy */}
          <motion.div
            variants={fadeUp}
            className="text-lg lg:text-xl text-content-secondary max-w-3xl mx-auto space-y-6 leading-relaxed"
          >
            <p>
              ApexE3 exists to solve a problem that sits at the centre of enterprise AI adoption: 
              <span className="text-content-primary font-medium"> most systems are easy to demo and difficult to deploy.</span>
            </p>
            <p>
              In highly trusted environments, AI cannot be treated as a novelty layer or a standalone productivity tool. 
              It must operate within real organisational constraints — security requirements, infrastructure decisions, 
              governance standards, regulatory expectations, and the practical demands of day-to-day use.
            </p>
            <p className="text-content-primary">
              That is where we focus.
            </p>
          </motion.div>

          {/* Bottom accent */}
          <motion.div
            variants={fadeUp}
            className="mt-12 flex items-center justify-center gap-3 text-content-tertiary text-sm"
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-border" />
            <span>Private. Enterprise-grade. Deployable.</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-border" />
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-900 to-transparent" />
    </section>
  )
}

// =============================================================================
// WHY APEXE3 WAS BUILT
// =============================================================================

function WhyBuiltSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const questions = [
    "How should AI be deployed without compromising data control?",
    "How should it integrate into existing workflows and systems?",
    "How should it be governed, audited, and operated over time?",
    "How should institutions adopt AI without creating new forms of operational risk?",
  ]

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Accent glow */}
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 100% 50%, rgba(48, 107, 255, 0.08) 0%, transparent 70%)',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Left column - Title and intro */}
          <motion.div variants={fadeUp} className="space-y-6">
            <span className="text-label font-semibold text-accent tracking-[0.2em] uppercase">
              Our Purpose
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary leading-tight">
              Why ApexE3 was built
            </h2>
            <div className="w-16 h-px bg-accent/50" />
            <p className="text-lg text-content-secondary leading-relaxed">
              The current AI market is crowded with tools that optimise for speed, visibility, and short-term excitement. 
              Many perform well in controlled demonstrations but fail to meet the standards required for serious deployment.
            </p>
            <p className="text-content-primary font-medium text-lg">
              For enterprises, the challenge is rarely access to models. The challenge is implementation.
            </p>
          </motion.div>

          {/* Right column - Questions */}
          <motion.div variants={fadeUp} className="space-y-4">
            {questions.map((question, index) => (
              <motion.div
                key={index}
                className="group relative p-5 rounded-xl bg-surface-800/50 border border-border hover:border-accent/30 transition-all duration-300"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent/50 rounded-r opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-content-secondary group-hover:text-content-primary transition-colors pl-2">
                  {question}
                </p>
              </motion.div>
            ))}
            
            {/* Answer box */}
            <motion.div
              className="mt-8 p-6 rounded-xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <p className="text-white/90 font-medium">
                ApexE3 was built to answer those questions properly.
              </p>
              <p className="text-content-secondary mt-2">
                We work on the last mile of AI adoption: the point at which ambition meets operational reality.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// =============================================================================
// WHAT WE BELIEVE
// =============================================================================

function BeliefsSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const beliefs = [
    {
      title: "Enterprise AI must be governable",
      description: "If a system cannot be controlled, audited, and understood, it is not ready for serious use.",
      icon: Shield
    },
    {
      title: "Data control is not optional",
      description: "Organisations should be able to deploy advanced AI without surrendering ownership of their infrastructure, workflows, or sensitive information.",
      icon: Lock
    },
    {
      title: "Deployment matters more than demonstration",
      description: "A good prototype proves possibility. A production-ready system proves value.",
      icon: Rocket
    },
    {
      title: "Precision beats hype",
      description: "The most effective AI systems are not the loudest. They are the ones designed around real operational needs, real constraints, and real users.",
      icon: Target
    }
  ]

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-label font-semibold text-accent tracking-[0.2em] uppercase">
              Our Principles
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary mt-4">
              What we believe
            </h2>
            <div className="w-16 h-px bg-accent/50 mx-auto mt-6" />
          </motion.div>

          {/* Beliefs grid */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {beliefs.map((belief, index) => {
              const Icon = belief.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="group relative p-8 rounded-2xl bg-surface-800/30 border border-border hover:border-accent/30 transition-all duration-500"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/15 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-content-primary mb-3">
                      {belief.title}
                    </h3>
                    <p className="text-content-secondary leading-relaxed">
                      {belief.description}
                    </p>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// =============================================================================
// WHAT WE DO
// =============================================================================

function WhatWeDoSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      title: "Private AI Deployment",
      description: "Across cloud, hybrid, and on-premise environments",
      icon: Server
    },
    {
      title: "AI Agents & Workflows",
      description: "For research, operations, and decision support",
      icon: Cpu
    },
    {
      title: "Data Infrastructure",
      description: "Supporting governed AI usage at scale",
      icon: Building2
    },
    {
      title: "Enterprise Controls",
      description: "For security, auditability, and operational oversight",
      icon: Lock
    },
    {
      title: "Sector-Specific Solutions",
      description: "Tailored to the demands of high-trust sectors",
      icon: Award
    }
  ]

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Left glow */}
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 0% 50%, rgba(48, 107, 255, 0.06) 0%, transparent 70%)',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-16">
            <span className="text-label font-semibold text-accent tracking-[0.2em] uppercase">
              Our Services
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary mt-4">
              What we do
            </h2>
            <div className="w-16 h-px bg-accent/50 mt-6" />
            <p className="text-lg text-content-secondary mt-6 max-w-2xl leading-relaxed">
              ApexE3 designs and deploys AI systems built for enterprise use.
            </p>
          </motion.div>

          {/* Services grid */}
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
          >
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="group relative p-6 rounded-xl bg-surface-800/40 border border-border hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/15 transition-colors">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-content-primary mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-content-tertiary">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom statement */}
          <motion.div
            variants={fadeUp}
            className="mt-12 p-6 rounded-xl bg-surface-800/30 border border-border"
          >
            <p className="text-content-secondary leading-relaxed">
              We do not view AI as an isolated tool. We treat it as part of a wider operational architecture — 
              something that must be <span className="text-content-primary font-medium">secure, reliable, and aligned</span> with 
              the standards of the organisation using it.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// =============================================================================
// WHO WE BUILD FOR
// =============================================================================

function WhoWeBuildForSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Center glow */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(48, 107, 255, 0.08) 0%, transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span 
            variants={fadeUp}
            className="text-label font-semibold text-accent tracking-[0.2em] uppercase"
          >
            Our Clients
          </motion.span>
          
          <motion.h2 
            variants={fadeUp}
            className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary mt-4"
          >
            Who we build for
          </motion.h2>
          
          <motion.div variants={fadeUp} className="w-16 h-px bg-accent/50 mx-auto mt-6" />
          
          <motion.div variants={fadeUp} className="mt-10 space-y-6 text-lg text-content-secondary leading-relaxed">
            <p>
              We build for organisations operating in environments where <span className="text-content-primary font-medium">failure carries real consequences.</span>
            </p>
            <p>
              These are institutions that cannot rely on black-box systems, weak controls, or generic deployments. 
              They need AI that works inside established governance structures, fits existing infrastructure, 
              and stands up to scrutiny from technical, operational, and compliance stakeholders.
            </p>
          </motion.div>
          
          <motion.div
            variants={fadeUp}
            className="mt-10 inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-surface-800/50 border border-accent/20"
          >
            <div className="w-2 h-2 rounded-full bg-accent" />
            <p className="text-content-primary font-medium">
              That is the level at which we work.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// =============================================================================
// WHY ORGANISATIONS CHOOSE APEXE3
// =============================================================================

function WhyChooseSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const reasons = [
    "Greater control over data and infrastructure",
    "AI systems aligned with enterprise governance requirements",
    "Deployment paths that go beyond pilots and proofs of concept",
    "Technology that integrates with real workflows",
    "Solutions that remain credible under operational and security scrutiny"
  ]

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Left column */}
          <motion.div variants={fadeUp} className="space-y-6">
            <span className="text-label font-semibold text-accent tracking-[0.2em] uppercase">
              Why Us
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary leading-tight">
              Why organisations choose ApexE3
            </h2>
            <div className="w-16 h-px bg-accent/50" />
            <p className="text-lg text-content-secondary leading-relaxed">
              Our clients do not come to us for AI theatre.
            </p>
            <p className="text-content-primary font-medium text-lg">
              They come to us because they need systems that can be deployed responsibly and used with confidence.
            </p>
          </motion.div>

          {/* Right column - Reasons list */}
          <motion.div variants={fadeUp} className="space-y-3">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                className="group flex items-start gap-4 p-4 rounded-lg hover:bg-surface-800/30 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <p className="text-content-secondary group-hover:text-content-primary transition-colors">
                  {reason}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// =============================================================================
// OUR APPROACH
// =============================================================================

function ApproachSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-900" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-label font-semibold text-accent tracking-[0.2em] uppercase">
              Methodology
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary mt-4">
              Our approach
            </h2>
            <div className="w-16 h-px bg-accent/50 mx-auto mt-6" />
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-8">
            <div className="p-8 rounded-2xl bg-surface-800/30 border border-border">
              <p className="text-lg text-content-secondary leading-relaxed">
                We begin with the realities of the organisation, not the abstractions of the market.
              </p>
              <p className="text-content-primary mt-4">
                That means understanding the operating environment, the risk profile, the data landscape, 
                the workflow bottlenecks, and the standards the system must meet from day one.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
              <p className="text-lg text-content-secondary leading-relaxed">
                From there, we design AI systems that are not only capable, but usable — 
                <span className="text-content-primary font-medium"> technically sound, operationally practical, and built for long-term deployment</span> rather than short-term attention.
              </p>
            </div>

            <div className="text-center">
              <p className="text-xl text-content-primary font-medium">
                Our view is straightforward: enterprise AI should not merely appear advanced. 
              </p>
              <p className="text-2xl gradient-accent font-semibold mt-2">
                It should be dependable under pressure.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// =============================================================================
// THE STANDARD WE ARE BUILDING TOWARDS
// =============================================================================

function StandardSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Dramatic glow */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(48, 107, 255, 0.1) 0%, transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span 
            variants={fadeUp}
            className="text-label font-semibold text-accent tracking-[0.2em] uppercase"
          >
            Our Vision
          </motion.span>
          
          <motion.h2 
            variants={fadeUp}
            className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary mt-4 leading-tight"
          >
            The standard we are building towards
          </motion.h2>
          
          <motion.div variants={fadeUp} className="w-16 h-px bg-accent/50 mx-auto mt-6" />
          
          <motion.div variants={fadeUp} className="mt-10 space-y-6 text-lg text-content-secondary leading-relaxed">
            <p>
              We believe the next generation of AI companies will be defined less by what they promise 
              and more by <span className="text-content-primary font-medium">what they can deploy.</span>
            </p>
            <p>
              The future will belong to systems that organisations can trust with real work, 
              real data, and real operational responsibility.
            </p>
          </motion.div>
          
          <motion.div
            variants={fadeUp}
            className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-accent/15 to-transparent border border-accent/30 inline-block"
          >
            <p className="text-2xl lg:text-3xl font-semibold text-content-primary">
              That is the standard ApexE3 is built to meet.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// =============================================================================
// WHY NOW STRIP
// =============================================================================

function WhyNowSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const blocks = [
    {
      title: "Governance is now a board-level issue",
      description: "AI adoption without control creates risk faster than value."
    },
    {
      title: "Private deployment is becoming a requirement",
      description: "Serious organisations need AI that fits their infrastructure, not the other way around."
    },
    {
      title: "The gap is no longer access — it is implementation",
      description: "The challenge is not whether enterprises can use AI, but whether they can operationalise it responsibly."
    }
  ]

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-900" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />
      
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {blocks.map((block, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="relative text-center p-8"
            >
              {/* Divider for desktop */}
              {index > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-border to-transparent" />
              )}
              
              <h3 className="text-lg font-semibold text-content-primary mb-4">
                {block.title}
              </h3>
              <p className="text-content-tertiary">
                {block.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

// =============================================================================
// LEADERSHIP SECTION
// =============================================================================

function LeadershipSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const team = [
    {
      name: "Leadership",
      role: "Founder & CEO",
      expertise: ["Enterprise AI", "Infrastructure", "Strategy"]
    },
    {
      name: "Leadership",
      role: "Chief Technology Officer",
      expertise: ["AI Systems", "Security", "Architecture"]
    },
    {
      name: "Leadership",
      role: "Head of Engineering",
      expertise: ["Data Infrastructure", "Cloud", "Operations"]
    }
  ]

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-label font-semibold text-accent tracking-[0.2em] uppercase">
              Team
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary mt-4">
              Leadership
            </h2>
            <div className="w-16 h-px bg-accent/50 mx-auto mt-6" />
            <p className="text-content-secondary mt-6 max-w-2xl mx-auto">
              Built by experts in AI, enterprise systems, finance, security, and infrastructure.
            </p>
          </motion.div>

          {/* Team grid */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="group relative p-8 rounded-2xl bg-surface-800/30 border border-border hover:border-accent/30 transition-all duration-500"
              >
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-8 h-8 text-accent/60" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-content-primary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent text-sm mb-4">
                    {member.role}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs bg-surface-700/50 text-content-tertiary border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// =============================================================================
// BOTTOM CTA
// =============================================================================

function BottomCTA() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-900" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Dramatic glow */}
      <div 
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(48, 107, 255, 0.15) 0%, transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          ref={ref}
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">Get Started</span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-content-primary mb-6"
          >
            Deploy AI on your terms
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-content-secondary mb-10 max-w-2xl mx-auto"
          >
            Speak with ApexE3 about building AI systems that fit your infrastructure, 
            governance, and operational needs.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <ScheduleDemoDialog
              trigger={
                <Button size="lg" className="group min-w-[200px]">
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              }
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

// =============================================================================
// MAIN EXPORT
// =============================================================================

export function AboutSection() {
  return (
    <div className="relative bg-surface-900">
      {/* Fixed background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatedGrid />
        <GlowOrb className="top-1/4 -right-32 w-96 h-96" color="cyan" opacity={0.08} />
        <GlowOrb className="bottom-1/4 -left-32 w-80 h-80" color="blue" opacity={0.06} />
      </div>

      {/* Page sections */}
      <HeroSection />
      <WhyBuiltSection />
      <BeliefsSection />
      <WhatWeDoSection />
      <WhoWeBuildForSection />
      <WhyChooseSection />
      <ApproachSection />
      <StandardSection />
      <WhyNowSection />
      <LeadershipSection />
      <BottomCTA />
    </div>
  )
}

export default AboutSection
