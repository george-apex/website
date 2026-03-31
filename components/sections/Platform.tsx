'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Bot, GitBranch, Server, Plug, Lock, TrendingUp, Activity, 
  ArrowRight, Network, Layers, Cpu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { PLATFORM_CAPABILITIES } from '@/lib/constants'
import { cn } from '@/lib/utils'

// =============================================================================
// SELF-ASSEMBLING NETWORK VISUALIZATION
// =============================================================================

function SelfAssemblingNetwork() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const nodes = [
    { id: 'core', x: 50, y: 50, label: 'A.L.I.C.E.', size: 'lg' },
    { id: 'n1', x: 20, y: 30, label: 'Agent 1', size: 'sm' },
    { id: 'n2', x: 80, y: 30, label: 'Agent 2', size: 'sm' },
    { id: 'n3', x: 20, y: 70, label: 'Data', size: 'sm' },
    { id: 'n4', x: 80, y: 70, label: 'API', size: 'sm' },
    { id: 'n5', x: 35, y: 15, label: 'LLM', size: 'xs' },
    { id: 'n6', x: 65, y: 85, label: 'Output', size: 'xs' },
  ]
  
  const edges = [
    ['core', 'n1'], ['core', 'n2'], ['core', 'n3'], ['core', 'n4'],
    ['n1', 'n5'], ['n2', 'n4'], ['n3', 'n6'], ['n4', 'n6'],
    ['n5', 'core'], ['core', 'n6'],
  ]
  
  return (
    <div ref={ref} className="relative h-64 w-full">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#306BFF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#306BFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#306BFF" stopOpacity="0.2" />
          </linearGradient>
          <filter id="nodeBlur">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Edges */}
        {edges.map(([from, to], i) => {
          const fromNode = nodes.find(n => n.id === from)
          const toNode = nodes.find(n => n.id === to)
          if (!fromNode || !toNode) return null
          
          return (
            <motion.line
              key={`edge-${i}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="url(#edgeGrad)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: 'easeOut' }}
            />
          )
        })}
        
        {/* Data flow particles */}
        {edges.slice(0, 4).map(([from, to], i) => {
          const fromNode = nodes.find(n => n.id === from)
          const toNode = nodes.find(n => n.id === to)
          if (!fromNode || !toNode) return null
          
          return (
            <motion.circle
              key={`particle-${i}`}
              r="2"
              fill="#306BFF"
              initial={{ 
                cx: `${fromNode.x}%`, 
                cy: `${fromNode.y}%`,
                opacity: 0 
              }}
              animate={isInView ? {
                cx: [`${fromNode.x}%`, `${toNode.x}%`],
                cy: [`${fromNode.y}%`, `${toNode.y}%`],
                opacity: [0, 1, 1, 0],
              } : {}}
              transition={{
                duration: 2,
                delay: 1 + i * 0.3,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </svg>
      
      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ 
            delay: 0.1 + i * 0.08, 
            type: 'spring', 
            stiffness: 200, 
            damping: 15 
          }}
        >
          <div
            className={`
              -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center
              ${node.size === 'lg' 
                ? 'w-16 h-16' 
                : node.size === 'sm' 
                ? 'w-10 h-10 bg-surface-800 border border-accent/40'
                : 'w-7 h-7 bg-surface-800 border border-border'}
            `}
            style={node.size === 'lg' ? {
              background: 'linear-gradient(135deg, #306BFF, #306BFF)',
              boxShadow: '0 0 24px rgba(48, 107, 255, 0.3)',
            } : {}}
          >
            <span className={`
              font-medium
              ${node.size === 'lg' ? 'text-xs text-surface-900' : 'text-[10px] text-content-secondary'}
            `}>
              {node.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Icon map
const iconMap = {
  Bot: Bot,
  GitBranch: GitBranch,
  Server: Server,
  Plug: Plug,
  Lock: Lock,
  TrendingUp: TrendingUp,
  Activity: Activity,
}

const tabs = [
  { id: 'agents', label: 'Agents' },
  { id: 'orchestration', label: 'Orchestration' },
  { id: 'deployment', label: 'Deployment' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'governance', label: 'Governance' },
]

export function Platform() {
  const [activeTab, setActiveTab] = React.useState('agents')

  return (
    <section id="platform" className="section-main relative overflow-hidden bg-surface-900">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-radial-data opacity-50" />

      {/* Accent line */}
      <motion.div
        className="absolute left-0 right-0 h-px top-[15%]"
        style={{ 
          background: 'linear-gradient(90deg, transparent, rgba(48, 107, 255, 0.15) 30%, rgba(48, 107, 255, 0.3) 50%, rgba(48, 107, 255, 0.15) 70%, transparent)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />

      <div className="container-main relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Platform</span>
          <h2 className="section-title">
            <span className="gradient-accent">Enterprise-Grade</span>
            <br />
            <span className="text-content-primary">AI Infrastructure</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A comprehensive platform designed for secure, scalable, and 
            sovereign AI deployment across your enterprise.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-5 py-2.5 rounded text-sm font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-accent/10 text-accent border border-accent/30'
                    : 'text-content-tertiary hover:text-content-primary hover:bg-surface-700 border border-transparent'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Capabilities grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLATFORM_CAPABILITIES.map((capability, index) => {
            const Icon = iconMap[capability.icon as keyof typeof iconMap]
            
            return (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="interactive" className="h-full p-6 group">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded border border-border bg-accent/5 flex items-center justify-center mb-4 group-hover:border-accent/30 group-hover:bg-accent/10 transition-all duration-200">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-medium text-content-primary mb-2">
                    {capability.title}
                  </h3>

                  {/* Description */}
                  <p className="text-content-tertiary text-sm mb-4 leading-relaxed">
                    {capability.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {capability.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs text-content-secondary"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn more */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <a
                      href={`#${capability.id}`}
                      className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-light transition-colors"
                    >
                      Learn more
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Architecture visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 max-[393px]:mt-0"
        >
          <Card variant="panel" className="p-8 lg:p-12 relative overflow-hidden">
            {/* Subtle animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(48, 107, 255, 0.1) 0%, transparent 60%)',
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-xl font-medium text-content-primary mb-2">
                  Enterprise AI Architecture
                </h3>
                <p className="text-content-tertiary text-sm">
                  A layered approach to secure, scalable AI deployment
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Architecture layers */}
                <div className="space-y-3">
                  {[
                    { name: 'AI Agents & Workflows', color: 'accent', layer: 'Application', icon: Bot },
                    { name: 'Orchestration & Governance', color: 'data', layer: 'Control', icon: GitBranch },
                    { name: 'Integration Layer', color: 'accent-dark', layer: 'Integration', icon: Plug },
                    { name: 'Secure Infrastructure', color: 'positive', layer: 'Foundation', icon: Lock },
                  ].map((layer, index) => {
                    const LayerIcon = layer.icon
                    return (
                      <motion.div
                        key={layer.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded bg-surface-800 border border-border group hover:border-accent/20 transition-colors"
                      >
                        <motion.div
                          className={cn(
                            'w-3 h-12 rounded-full relative overflow-hidden',
                            layer.color === 'accent' && 'bg-accent',
                            layer.color === 'data' && 'bg-accent',
                            layer.color === 'accent-dark' && 'bg-accent-dark',
                            layer.color === 'positive' && 'bg-positive'
                          )}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                          style={{ transformOrigin: 'bottom' }}
                        >
                          {/* Animated shimmer */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent"
                            animate={{ y: ['100%', '-100%'] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                          />
                        </motion.div>
                        <div className="flex-1 flex items-center gap-3">
                          <LayerIcon className="w-4 h-4 text-content-tertiary group-hover:text-accent transition-colors" />
                          <div>
                            <div className="text-content-primary font-medium">{layer.name}</div>
                            <div className="text-xs text-content-tertiary uppercase tracking-wider">{layer.layer}</div>
                          </div>
                        </div>
                        <div className="text-xs text-content-tertiary uppercase tracking-wider font-mono">
                          Layer {index + 1}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Self-assembling network visualization */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-xl" />
                  <SelfAssemblingNetwork />
                  <div className="text-center mt-4">
                    <span className="text-xs text-content-tertiary">Real-time agent orchestration</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center mt-8">
                <Button variant="secondary">
                  View Technical Documentation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default Platform
