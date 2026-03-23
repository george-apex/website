'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, GitBranch, Settings2, Database, Lock, FileCheck, 
  Users, Activity, Rocket, ChevronRight, Zap, ArrowRight, ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

// =============================================================================
// INFRASTRUCTURE COMPONENTS DATA
// =============================================================================

interface InfrastructureNode {
  id: string
  label: string
  shortLabel: string
  icon: React.ElementType
  category: 'sovereignty' | 'intelligence' | 'integration' | 'security' | 'delivery'
  description: string
  capabilities: string[]
  status?: 'active' | 'processing' | 'idle'
}

const infrastructureNodes: InfrastructureNode[] = [
  {
    id: 'sovereignty',
    label: 'AI Sovereignty',
    shortLabel: 'Sovereignty',
    icon: Shield,
    category: 'sovereignty',
    description: 'Complete control over your AI infrastructure, data, and decisions.',
    capabilities: ['On-premise deployment', 'Data residency control', 'Vendor independence'],
    status: 'active'
  },
  {
    id: 'orchestration',
    label: 'Model Orchestration',
    shortLabel: 'Orchestration',
    icon: GitBranch,
    category: 'intelligence',
    description: 'Intelligent routing and coordination across multiple AI models.',
    capabilities: ['Multi-model routing', 'Load balancing', 'Fallback chains'],
    status: 'processing'
  },
  {
    id: 'agents',
    label: 'Agent Customisation',
    shortLabel: 'Agents',
    icon: Settings2,
    category: 'intelligence',
    description: 'Tailored AI agents built for your specific workflows and use cases.',
    capabilities: ['Custom personas', 'Workflow integration', 'Domain expertise'],
    status: 'active'
  },
  {
    id: 'connectors',
    label: 'Data Connectors',
    shortLabel: 'Connectors',
    icon: Database,
    category: 'integration',
    description: 'Secure bidirectional connections to your enterprise data sources.',
    capabilities: ['50+ integrations', 'Real-time sync', 'Schema mapping'],
    status: 'active'
  },
  {
    id: 'security',
    label: 'Security Controls',
    shortLabel: 'Security',
    icon: Lock,
    category: 'security',
    description: 'Enterprise-grade security with encryption, isolation, and compliance.',
    capabilities: ['End-to-end encryption', 'SOC 2 Type II', 'Zero-trust architecture'],
    status: 'active'
  },
  {
    id: 'governance',
    label: 'Governance & Audit',
    shortLabel: 'Governance',
    icon: FileCheck,
    category: 'security',
    description: 'Complete visibility and audit trails for every AI decision.',
    capabilities: ['Decision logging', 'Compliance reporting', 'Version control'],
    status: 'active'
  },
  {
    id: 'permissions',
    label: 'Access Control',
    shortLabel: 'Permissions',
    icon: Users,
    category: 'security',
    description: 'Granular role-based access control across all platform capabilities.',
    capabilities: ['RBAC & ABAC', 'SSO integration', 'API key management'],
    status: 'idle'
  },
  {
    id: 'observability',
    label: 'Observability',
    shortLabel: 'Monitoring',
    icon: Activity,
    category: 'integration',
    description: 'Real-time monitoring, alerting, and performance analytics.',
    capabilities: ['Latency tracking', 'Cost attribution', 'Anomaly detection'],
    status: 'processing'
  },
  {
    id: 'delivery',
    label: 'Last-Mile Delivery',
    shortLabel: 'Delivery',
    icon: Rocket,
    category: 'delivery',
    description: 'From pilot to production with proven deployment methodology.',
    capabilities: ['Pilot programs', 'User adoption', 'Scale strategy'],
    status: 'active'
  }
]

// =============================================================================
// DETAIL PANEL COMPONENT
// =============================================================================

interface DetailPanelProps {
  node: InfrastructureNode | null
  onClose: () => void
}

function DetailPanel({ node, onClose }: DetailPanelProps) {
  if (!node) return null
  
  const Icon = node.icon
  
  const categoryLabels = {
    sovereignty: 'Foundation',
    intelligence: 'Intelligence Layer',
    integration: 'Integration Layer',
    security: 'Security Layer',
    delivery: 'Deployment Layer'
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
  node: InfrastructureNode
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
// MAIN INTERACTIVE INFRASTRUCTURE COMPONENT
// =============================================================================

interface InteractiveInfrastructureProps {
  className?: string
}

export function InteractiveInfrastructure({ className }: InteractiveInfrastructureProps) {
  const [activeNode, setActiveNode] = React.useState<string | null>(null)
  
  const activeNodeData = React.useMemo(() => 
    infrastructureNodes.find(n => n.id === activeNode) || null
  , [activeNode])

  const handleNodeClick = React.useCallback((nodeId: string) => {
    setActiveNode(current => current === nodeId ? null : nodeId)
  }, [])

  return (
    <section className={cn('py-12 lg:py-16', className)}>
      <div className="container-main">
        {/* Instruction text */}
        <p className="text-center text-sm text-content-tertiary mb-8">
          Click any component to explore its capabilities
        </p>

        {/* Infrastructure Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-4 max-w-4xl mx-auto">
          {infrastructureNodes.map((node, index) => (
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

        {/* CTA */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 border border-accent/30 rounded-xl text-accent hover:bg-accent/20 hover:border-accent/50 transition-all duration-200">
            <span className="font-medium">View Technical Documentation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default InteractiveInfrastructure
