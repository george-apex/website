'use client'

import * as React from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Settings, Headphones, BookOpen, BarChart, ShieldCheck, Zap,
  ArrowRight, CheckCircle, Bot, GitBranch, TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// Solution node type
interface SolutionNode {
  id: string
  label: string
  icon: React.ElementType
  category: string
  description: string
  capabilities: string[]
  metrics: { value: string; label: string }
  status: 'active' | 'processing' | 'idle'
}

// Solution nodes data
const SOLUTION_NODES: SolutionNode[] = [
  {
    id: 'operations',
    label: 'Operations Automation',
    icon: Settings,
    category: 'Workflow',
    description: 'Streamline complex operational workflows with AI agents that handle routing, approvals, and exceptions autonomously.',
    capabilities: [
      'Intelligent task routing',
      'Automated approval workflows',
      'Exception handling & escalation',
      'Process optimization',
    ],
    metrics: { value: '40%', label: 'efficiency gain' },
    status: 'active',
  },
  {
    id: 'support',
    label: 'Customer Support',
    icon: Headphones,
    category: 'Intelligence',
    description: 'Resolve issues faster with AI that understands context, accesses knowledge bases, and escalates appropriately.',
    capabilities: [
      'Context-aware responses',
      'Knowledge base integration',
      'Smart escalation routing',
      'Sentiment analysis',
    ],
    metrics: { value: '60%', label: 'faster resolution' },
    status: 'active',
  },
  {
    id: 'knowledge',
    label: 'Knowledge Systems',
    icon: BookOpen,
    category: 'Intelligence',
    description: 'Transform scattered documentation into an intelligent knowledge system that delivers answers, not search results.',
    capabilities: [
      'Semantic search',
      'Document synthesis',
      'Context-aware Q&A',
      'Knowledge graphing',
    ],
    metrics: { value: '75%', label: 'knowledge access' },
    status: 'active',
  },
  {
    id: 'decisions',
    label: 'Decision Support',
    icon: BarChart,
    category: 'Analytics',
    description: 'Augment strategic decisions with AI that synthesizes data, identifies patterns, and surfaces actionable insights.',
    capabilities: [
      'Data synthesis & analysis',
      'Pattern recognition',
      'Predictive insights',
      'Scenario modeling',
    ],
    metrics: { value: '3x', label: 'faster insights' },
    status: 'processing',
  },
  {
    id: 'compliance',
    label: 'Compliance & Regulatory',
    icon: ShieldCheck,
    category: 'Governance',
    description: 'Navigate complex regulatory environments with AI trained on your specific compliance requirements and frameworks.',
    capabilities: [
      'Regulatory monitoring',
      'Compliance gap analysis',
      'Audit trail generation',
      'Risk assessment',
    ],
    metrics: { value: '90%', label: 'audit readiness' },
    status: 'active',
  },
  {
    id: 'productivity',
    label: 'Enterprise Productivity',
    icon: Zap,
    category: 'Workflow',
    description: 'Empower every employee with AI assistants that handle routine tasks and amplify human capabilities across teams.',
    capabilities: [
      'Task automation',
      'Meeting summarization',
      'Email drafting',
      'Calendar optimization',
    ],
    metrics: { value: '25%', label: 'productivity boost' },
    status: 'active',
  },
  {
    id: 'agents',
    label: 'Custom AI Agents',
    icon: Bot,
    category: 'Agents',
    description: 'Build bespoke AI agents tailored to your specific business processes, integrated with your existing systems.',
    capabilities: [
      'Domain-specific training',
      'Multi-step task execution',
      'Tool integration',
      'Continuous learning',
    ],
    metrics: { value: '80%', label: 'task automation' },
    status: 'processing',
  },
  {
    id: 'orchestration',
    label: 'Workflow Orchestration',
    icon: GitBranch,
    category: 'Platform',
    description: 'Coordinate multiple agents, systems, and human touchpoints across complex enterprise workflows seamlessly.',
    capabilities: [
      'Multi-agent coordination',
      'Human-in-the-loop workflows',
      'Process automation',
      'Real-time monitoring',
    ],
    metrics: { value: '50%', label: 'process efficiency' },
    status: 'idle',
  },
  {
    id: 'analytics',
    label: 'Predictive Analytics',
    icon: TrendingUp,
    category: 'Analytics',
    description: 'Leverage AI-driven analytics to predict trends, identify opportunities, and optimize business performance.',
    capabilities: [
      'Trend forecasting',
      'Anomaly detection',
      'Performance optimization',
      'Resource planning',
    ],
    metrics: { value: '35%', label: 'cost reduction' },
    status: 'idle',
  },
]

// Node Card Component
function SolutionNodeCard({ 
  node, 
  isSelected, 
  onClick 
}: { 
  node: SolutionNode
  isSelected: boolean
  onClick: () => void
}) {
  const Icon = node.icon
  
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative w-full h-[160px] p-5 rounded-lg border text-left transition-all duration-300",
        "hover:border-accent/50 hover:bg-accent/5",
        "focus:outline-none focus:ring-2 focus:ring-accent/50",
        "flex flex-col",
        isSelected 
          ? "border-accent/50 bg-accent/10" 
          : "border-border bg-surface-800/50"
      )}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Status indicator */}
      <div className={cn(
        "absolute top-3 right-3 w-2 h-2 rounded-full",
        node.status === 'active' && "bg-green-500",
        node.status === 'processing' && "bg-blue-500 animate-pulse",
        node.status === 'idle' && "bg-slate-500"
      )} />
      
      {/* Icon */}
      <div className={cn(
        "w-10 h-10 rounded border flex items-center justify-center mb-3 transition-colors flex-shrink-0",
        isSelected 
          ? "border-accent/50 bg-accent/10" 
          : "border-border bg-surface-700"
      )}>
        <Icon className={cn(
          "w-5 h-5",
          isSelected ? "text-accent" : "text-content-secondary"
        )} />
      </div>
      
      {/* Label - wraps to multiple lines if needed */}
      <h3 className={cn(
        "text-sm font-medium mb-1 transition-colors leading-tight",
        isSelected ? "text-accent" : "text-content-primary"
      )}>
        {node.label}
      </h3>
      
      {/* Category - pushed to bottom */}
      <span className="text-xs text-content-tertiary uppercase tracking-wider mt-auto">
        {node.category}
      </span>
    </motion.button>
  )
}

// Detail Panel Component
function SolutionDetailPanel({ node }: { node: SolutionNode | null }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  if (!node) return null
  
  const Icon = node.icon
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      <Card variant="panel" className="p-6 lg:p-8 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded border border-accent/30 bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-medium text-content-primary">
                  {node.label}
                </h3>
                <span className={cn(
                  "px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider",
                  node.status === 'active' && "bg-green-500/20 text-green-400",
                  node.status === 'processing' && "bg-blue-500/20 text-blue-400",
                  node.status === 'idle' && "bg-slate-500/20 text-slate-400"
                )}>
                  {node.status}
                </span>
              </div>
              <span className="text-sm text-content-tertiary uppercase tracking-wider">
                {node.category}
              </span>
            </div>
            {/* Metric */}
            <div className="text-right">
              <div className="text-2xl font-bold text-accent font-mono">
                {node.metrics.value}
              </div>
              <div className="text-xs text-content-tertiary uppercase tracking-wider">
                {node.metrics.label}
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-content-secondary mb-6 leading-relaxed">
            {node.description}
          </p>
          
          {/* Capabilities */}
          <div>
            <h4 className="text-sm font-medium text-content-primary mb-3 uppercase tracking-wider">
              Capabilities
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {node.capabilities.map((capability, index) => (
                <motion.div
                  key={capability}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-content-secondary"
                >
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>{capability}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Action */}
          <div className="mt-6 pt-6 border-t border-border">
            <a
              href={`#${node.id}`}
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              <span>View detailed case study</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// Legend Component
function SolutionLegend() {
  return (
    <div className="flex items-center gap-6 mb-8">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs text-content-tertiary uppercase tracking-wider">Active</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="text-xs text-content-tertiary uppercase tracking-wider">Processing</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-slate-500" />
        <span className="text-xs text-content-tertiary uppercase tracking-wider">Idle</span>
      </div>
    </div>
  )
}

// Solutions Grid Component
function SolutionsGrid() {
  const [selectedNode, setSelectedNode] = React.useState<SolutionNode | null>(null)
  
  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-stretch">
        {SOLUTION_NODES.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.05,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
          >
            <SolutionNodeCard
              node={node}
              isSelected={selectedNode?.id === node.id}
              onClick={() => setSelectedNode(
                selectedNode?.id === node.id ? null : node
              )}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        {selectedNode && (
          <SolutionDetailPanel node={selectedNode} />
        )}
      </AnimatePresence>
      
      {/* Click hint */}
      {!selectedNode && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-content-tertiary mt-6"
        >
          Click any solution to explore details
        </motion.p>
      )}
    </>
  )
}

// Industries data
const INDUSTRIES = [
  { name: 'Financial Services', icon: '◈', description: 'Regulatory compliance, risk analysis, trading intelligence' },
  { name: 'Healthcare', icon: '◆', description: 'Clinical knowledge, patient care, HIPAA-compliant workflows' },
  { name: 'Manufacturing', icon: '◇', description: 'Production optimization, predictive maintenance, quality control' },
  { name: 'Legal Services', icon: '▣', description: 'Contract analysis, legal research, document automation' },
  { name: 'Government', icon: '▢', description: 'Citizen services, compliance, secure deployments' },
  { name: 'Energy', icon: '⚡', description: 'Grid optimization, asset management, safety compliance' },
  { name: 'Telecommunications', icon: '◎', description: 'Network operations, customer support, fraud detection' },
  { name: 'Insurance', icon: '◉', description: 'Claims processing, underwriting, risk assessment' },
]

export default function SolutionsPage() {
  return (
    <div className="relative bg-surface-900">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none z-0" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-radial-accent opacity-20 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-radial-data opacity-15 pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="container-main">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Solutions</span>
              <h1 className="section-title">
                <span className="text-content-primary">Built for</span>{' '}
                <span className="gradient-accent">Enterprise Reality</span>
              </h1>
              <p className="section-subtitle mx-auto">
                See how APEXE3 transforms operations across different enterprise 
                environments with measurable, outcome-focused results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Interactive Solutions Grid */}
        <section className="py-16 lg:py-24">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Legend */}
              <SolutionLegend />
              
              {/* Solutions Grid */}
              <SolutionsGrid />
            </motion.div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 lg:py-24 bg-surface-800">
          <div className="container-main">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Industries</span>
              <h2 className="section-title">
                <span className="text-content-primary">Tailored for</span>{' '}
                <span className="gradient-accent">Your Industry</span>
              </h2>
              <p className="section-subtitle mx-auto">
                AI solutions designed for regulated, complex, and demanding environments.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
              {INDUSTRIES.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05,
                    ease: [0.21, 0.47, 0.32, 0.98]
                  }}
                >
                  <Card variant="interactive" className="p-5 h-[140px] group flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-accent text-lg font-mono flex-shrink-0">{industry.icon}</span>
                      <h3 className="font-medium text-content-primary group-hover:text-accent transition-colors leading-tight">
                        {industry.name}
                      </h3>
                    </div>
                    <p className="text-sm text-content-tertiary mt-auto leading-relaxed">
                      {industry.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card variant="panel" className="p-10 lg:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                
                <div className="relative z-10">
                  <h2 className="text-2xl lg:text-3xl font-medium text-content-primary mb-4">
                    Don&apos;t see your use case?
                  </h2>
                  <p className="text-content-secondary mb-8 max-w-2xl mx-auto">
                    Every enterprise is unique. Let&apos;s discuss how APEXE3 can be tailored 
                    to your specific operational challenges and requirements.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                      Talk to an AI Specialist
                    </Button>
                    <Button variant="secondary" size="lg">
                      View Platform
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
