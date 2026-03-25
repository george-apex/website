'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring, useInView, AnimatePresence } from 'framer-motion'
import { Shield, Server, Scale, Flag, FileCheck, Key, CheckCircle, ArrowRight, Lock, Fingerprint, Eye, ChevronRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// =============================================================================
// TRUST ARCHITECTURE NODES DATA
// =============================================================================

interface TrustNode {
  id: string
  label: string
  shortLabel: string
  icon: React.ElementType
  category: 'architecture' | 'governance' | 'compliance' | 'sovereignty'
  description: string
  capabilities: string[]
  status?: 'active' | 'processing' | 'idle'
}

const trustNodes: TrustNode[] = [
  {
    id: 'zero-trust',
    label: 'Zero-Trust Architecture',
    shortLabel: 'Zero-Trust',
    icon: Shield,
    category: 'architecture',
    description: 'Every request is verified, every access is logged, every action is governed.',
    capabilities: ['Identity verification', 'Continuous validation', 'Least privilege access'],
    status: 'active'
  },
  {
    id: 'encryption',
    label: 'End-to-End Encryption',
    shortLabel: 'Encryption',
    icon: Lock,
    category: 'architecture',
    description: 'Military-grade encryption protecting your data at rest and in transit.',
    capabilities: ['AES-256 encryption', 'TLS 1.3', 'Key management'],
    status: 'active'
  },
  {
    id: 'deployment',
    label: 'Controlled Deployment',
    shortLabel: 'Deployment',
    icon: Server,
    category: 'architecture',
    description: 'Deploy where you want, how you want. On-premise, private cloud, or hybrid.',
    capabilities: ['On-premise option', 'Private cloud', 'Air-gapped deployment'],
    status: 'active'
  },
  {
    id: 'access-control',
    label: 'Access Control',
    shortLabel: 'Access',
    icon: Fingerprint,
    category: 'governance',
    description: 'Granular role-based access control across all platform capabilities.',
    capabilities: ['RBAC & ABAC', 'SSO integration', 'API key management'],
    status: 'active'
  },
  {
    id: 'governance',
    label: 'Enterprise Governance',
    shortLabel: 'Governance',
    icon: Scale,
    category: 'governance',
    description: 'Role-based access, approval workflows, and full audit trails.',
    capabilities: ['Approval workflows', 'Policy enforcement', 'Audit trails'],
    status: 'processing'
  },
  {
    id: 'audit',
    label: 'Audit & Logging',
    shortLabel: 'Audit',
    icon: Eye,
    category: 'governance',
    description: 'Complete visibility and audit trails for every AI decision and action.',
    capabilities: ['Decision logging', 'Compliance reporting', 'Version control'],
    status: 'active'
  },
  {
    id: 'sovereignty',
    label: 'Data Sovereignty',
    shortLabel: 'Sovereignty',
    icon: Flag,
    category: 'sovereignty',
    description: 'Your data stays yours. Control where it lives and who accesses it.',
    capabilities: ['Data residency control', 'Geographic restrictions', 'Data portability'],
    status: 'active'
  },
  {
    id: 'compliance',
    label: 'Compliance Ready',
    shortLabel: 'Compliance',
    icon: FileCheck,
    category: 'compliance',
    description: 'Built to meet SOC 2, HIPAA, GDPR, and industry-specific requirements.',
    capabilities: ['SOC 2 Type II', 'HIPAA ready', 'GDPR compliant'],
    status: 'active'
  },
  {
    id: 'ownership',
    label: 'Full Ownership',
    shortLabel: 'Ownership',
    icon: Key,
    category: 'sovereignty',
    description: 'Own your AI infrastructure, models, and configurations. No vendor lock-in.',
    capabilities: ['No vendor lock-in', 'Model ownership', 'Configuration export'],
    status: 'idle'
  }
]

// =============================================================================
// DETAIL PANEL COMPONENT
// =============================================================================

interface DetailPanelProps {
  node: TrustNode | null
  onClose: () => void
}

function DetailPanel({ node, onClose }: DetailPanelProps) {
  if (!node) return null
  
  const Icon = node.icon
  
  const categoryLabels = {
    architecture: 'Security Architecture',
    governance: 'Governance Layer',
    compliance: 'Compliance Layer',
    sovereignty: 'Sovereignty Layer'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-surface-800/95 backdrop-blur-xl border border-accent/30 rounded-2xl p-5 shadow-2xl shadow-accent/10"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent/20">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-content-primary">{node.label}</h3>
            <span className="text-xs text-accent uppercase tracking-wider">{categoryLabels[node.category]}</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-surface-700 transition-colors text-content-tertiary hover:text-content-primary"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Description */}
      <p className="text-sm text-content-secondary mb-4 leading-relaxed">
        {node.description}
      </p>
      
      {/* Capabilities */}
      <div className="space-y-2">
        <span className="text-xs text-content-tertiary uppercase tracking-wider">Key Capabilities</span>
        <div className="grid gap-1.5">
          {node.capabilities.map((cap, i) => (
            <motion.div
              key={cap}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 text-sm text-content-primary"
            >
              <ChevronRight className="w-3 h-3 text-accent" />
              {cap}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Status indicator */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-2 h-2 rounded-full',
            node.status === 'active' && 'bg-positive',
            node.status === 'processing' && 'bg-accent animate-pulse',
            node.status === 'idle' && 'bg-content-tertiary'
          )} />
          <span className="text-xs text-content-tertiary capitalize">{node.status || 'Idle'}</span>
        </div>
        <button className="flex items-center gap-1 text-xs text-accent hover:text-accent-light transition-colors">
          Learn more
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  )
}

// =============================================================================
// NODE CARD COMPONENT
// =============================================================================

interface NodeCardProps {
  node: TrustNode
  isActive: boolean
  onClick: () => void
  delay: number
}

function NodeCard({ node, isActive, onClick, delay }: NodeCardProps) {
  const Icon = node.icon
  
  const statusColors = {
    active: 'bg-positive',
    processing: 'bg-accent animate-pulse',
    idle: 'bg-content-tertiary'
  }

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'group relative w-full p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 text-left',
        isActive 
          ? 'bg-surface-800 border-accent shadow-lg shadow-accent/20' 
          : 'bg-surface-800/50 border-border hover:border-accent/30 hover:bg-surface-800/80'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Status indicator */}
      <div className={cn(
        'absolute top-3 right-3 w-2 h-2 rounded-full',
        statusColors[node.status || 'idle']
      )} />
      
      {/* Icon */}
      <div className={cn(
        'inline-flex p-2 rounded-lg mb-3 transition-colors',
        isActive ? 'bg-accent/20 text-accent' : 'bg-surface-700 text-content-secondary group-hover:text-accent'
      )}>
        <Icon className="w-5 h-5" />
      </div>
      
      {/* Label */}
      <h3 className={cn(
        'font-medium text-sm transition-colors',
        isActive ? 'text-accent' : 'text-content-primary'
      )}>
        {node.label}
      </h3>
      
      {/* Category */}
      <p className="text-xs text-content-tertiary mt-1">
        Click to explore
      </p>
    </motion.button>
  )
}

// =============================================================================
// COMPLIANCE CERTIFICATIONS
// =============================================================================

const COMPLIANCE_CERTS = [
  { name: 'SOC 2 Type II', description: 'Security & availability' },
  { name: 'HIPAA', description: 'Healthcare data' },
  { name: 'GDPR', description: 'EU data protection' },
  { name: 'ISO 27001', description: 'Info security' },
  { name: 'FedRAMP', description: 'Government ready' },
]

// =============================================================================
// SECURITY FEATURES
// =============================================================================

const SECURITY_FEATURES = [
  { title: 'End-to-end encryption', description: 'AES-256 encryption for all data at rest and in transit', icon: Lock },
  { title: 'Role-based access control', description: 'Granular permissions with enterprise SSO integration', icon: Shield },
  { title: 'Full audit trails', description: 'Complete logging of all AI actions and decisions', icon: FileCheck },
  { title: 'Data residency guarantees', description: 'Control where your data lives and who accesses it', icon: Flag },
  { title: 'Air-gapped deployment', description: 'Complete isolation for the highest security requirements', icon: Server },
  { title: 'Private infrastructure', description: 'Deploy on your own infrastructure, your rules', icon: Server },
]

// Shield pulse ring animation
function ShieldPulseRing({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-48 h-48 rounded-full border border-accent/20"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [0.8, 1.1, 0.8], 
        opacity: [0.2, 0.1, 0.2]
      }}
      transition={{ 
        duration: 4, 
        delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    />
  )
}

// Animated counter
function AnimatedStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-3xl lg:text-4xl font-bold text-content-primary font-mono">{value}</div>
      <div className="text-sm text-content-tertiary mt-1">{label}</div>
    </motion.div>
  )
}

export default function SecurityPage() {
  const [activeNode, setActiveNode] = React.useState<string | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const activeNodeData = React.useMemo(() => 
    trustNodes.find(n => n.id === activeNode) || null
  , [activeNode])

  const handleNodeClick = React.useCallback((nodeId: string) => {
    setActiveNode(current => current === nodeId ? null : nodeId)
  }, [])
  
  // Mouse position for reactive glow
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const x = useSpring(mouseX, { stiffness: 100, damping: 25 })
  const y = useSpring(mouseY, { stiffness: 100, damping: 25 })
  
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  return (
    <div 
      ref={containerRef}
      className="relative bg-surface-900"
      onMouseMove={handleMouseMove}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-radial-accent opacity-20 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-radial-data opacity-15 pointer-events-none z-0" />
      
      {/* Mouse-following ambient glow */}
      <motion.div
        className="pointer-events-none absolute z-10"
        style={{
          x: x,
          y: y,
          translateX: '-50%',
          translateY: '-50%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(48, 158, 186, 0.05) 0%, rgba(48, 158, 186, 0.02) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-20">
        {/* Hero Section */}
        <section className="pt-8 pb-16 min-[393px]:pt-32 lg:pt-40 lg:pb-24">
          <div className="container-main">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-xl border border-accent/30 bg-accent/5 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <span className="section-label">Security & Compliance</span>
              <h1 className="section-title">
                <span className="text-content-primary">Enterprise-Grade</span>
                <br />
                <span className="gradient-accent">Security & Governance</span>
              </h1>
              <p className="section-subtitle mx-auto">
                Your AI operates within your security perimeter, following your 
                governance framework, with full auditability and control.
              </p>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatedStat value="99.9%" label="Uptime SLA" delay={0} />
              <AnimatedStat value="SOC 2" label="Type II Certified" delay={0.1} />
              <AnimatedStat value="0" label="Data shared externally" delay={0.2} />
              <AnimatedStat value="24/7" label="Security monitoring" delay={0.3} />
            </motion.div>
          </div>
        </section>

        {/* Trust Architecture Interactive Grid */}
        <section className="py-16 lg:py-24">
          <div className="container-main">
            {/* Instruction text */}
            <p className="text-center text-sm text-content-tertiary mb-8">
              Click any component to explore its capabilities
            </p>

            {/* Trust Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-4 max-w-4xl mx-auto">
              {trustNodes.map((node, index) => (
                <NodeCard
                  key={node.id}
                  node={node}
                  isActive={activeNode === node.id}
                  onClick={() => handleNodeClick(node.id)}
                  delay={index * 0.05}
                />
              ))}
            </div>

            {/* Detail Panel */}
            <AnimatePresence mode="wait">
              {activeNodeData && (
                <motion.div
                  className="max-w-lg mx-auto mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <DetailPanel 
                    node={activeNodeData} 
                    onClose={() => setActiveNode(null)} 
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-positive" />
                <span className="text-xs text-content-tertiary">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-content-tertiary">Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-content-tertiary" />
                <span className="text-xs text-content-tertiary">Idle</span>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance badges */}
        <section className="py-16 lg:py-24 bg-surface-800">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Header */}
              <div className="text-center mb-12">
                <span className="section-label">Compliance</span>
                <h2 className="text-2xl lg:text-3xl font-medium text-content-primary mb-4">
                  Compliance Ready
                </h2>
                <p className="text-content-tertiary max-w-2xl mx-auto">
                  Built to meet the most demanding regulatory requirements across industries.
                </p>
              </div>

              {/* Certifications grid */}
              <div className="flex flex-wrap justify-center gap-4">
                {COMPLIANCE_CERTS.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.05,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    whileHover={{ 
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                    className="flex flex-col items-center p-6 rounded bg-surface-700 border border-border hover:border-accent/30 transition-colors min-w-[160px] relative overflow-hidden group"
                  >
                    {/* Hover shimmer */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(48, 107, 255, 0.08), transparent)',
                        width: '50%'
                      }}
                    />
                    <motion.div 
                      className="w-12 h-12 rounded-full border border-accent/20 bg-accent/5 flex items-center justify-center mb-4 relative z-10"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle className="w-6 h-6 text-accent" />
                    </motion.div>
                    <div className="text-content-primary font-medium relative z-10">{cert.name}</div>
                    <div className="text-sm text-content-tertiary relative z-10">{cert.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Zero-Trust Architecture panel */}
        <section className="py-16 lg:py-24">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Card variant="panel" className="p-8 lg:p-12 relative overflow-hidden">
                {/* Subtle animated grid */}
                <motion.div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(48, 158, 186, 0.3) 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }}
                  animate={{
                    opacity: [0.1, 0.15, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                  {/* Left - Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded border border-accent/30 bg-accent/5 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-accent" />
                      </div>
                      <h2 className="text-2xl font-medium text-content-primary">
                        Zero-Trust Architecture
                      </h2>
                    </div>
                    
                    <p className="text-content-secondary mb-8 leading-relaxed text-lg">
                      Every request is verified, every access is logged, every action 
                      is governed. Your AI operates with the same security posture 
                      as your most critical systems.
                    </p>
                    
                    <ul className="space-y-4">
                      {SECURITY_FEATURES.map((feature, index) => {
                        const FeatureIcon = feature.icon
                        return (
                          <motion.li 
                            key={index} 
                            className="flex items-start gap-4"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <div className="w-6 h-6 rounded-full border border-accent/30 bg-accent/5 flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle className="w-3 h-3 text-accent" />
                            </div>
                            <div>
                              <span className="text-content-primary font-medium">{feature.title}</span>
                              <p className="text-sm text-content-tertiary">{feature.description}</p>
                            </div>
                          </motion.li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* Right - Visual representation */}
                  <div className="relative h-80 flex items-center justify-center">
                    {/* Animated pulse rings */}
                    <ShieldPulseRing delay={0} />
                    <ShieldPulseRing delay={1.5} />
                    
                    {/* Concentric circles */}
                    <motion.div 
                      className="absolute w-56 h-56 rounded-full border border-accent/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="absolute w-44 h-44 rounded-full border border-accent/30"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="absolute w-32 h-32 rounded-full border border-accent/40"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Center shield */}
                    <motion.div 
                      className="w-18 h-18 rounded border border-accent/30 bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center"
                      style={{ width: '72px', height: '72px' }}
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(48, 107, 255, 0.2)',
                          '0 0 30px rgba(48, 107, 255, 0.3)',
                          '0 0 20px rgba(48, 107, 255, 0.2)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Shield className="w-8 h-8 text-accent" />
                    </motion.div>
                    
                    {/* Floating labels */}
                    {[
                      { x: '-90px', y: '-60px', label: 'Auth' },
                      { x: '90px', y: '-50px', label: 'Encrypt' },
                      { x: '-80px', y: '70px', label: 'Audit' },
                      { x: '80px', y: '60px', label: 'Control' },
                    ].map((el, i) => (
                      <motion.div
                        key={i}
                        className="absolute px-3 py-1.5 text-xs rounded border border-border bg-surface-700 text-content-secondary font-mono"
                        style={{ left: el.x, top: el.y }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                      >
                        {el.label}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-surface-800">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-2xl lg:text-3xl font-medium text-content-primary mb-4">
                Have security questions?
              </h2>
              <p className="text-content-secondary mb-8">
                Our security team is available to discuss your specific requirements, 
                compliance needs, and deployment options.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Talk to Security Team
                </Button>
                <Button variant="secondary" size="lg">
                  View Documentation
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
