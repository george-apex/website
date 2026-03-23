'use client'

import * as React from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Database,
  Server,
  Cloud,
  Layers,
  ArrowRight,
  ArrowDown,
  Workflow,
  Cpu,
  HardDrive
} from 'lucide-react'

const infrastructureLayers = [
  {
    id: 'pipeline',
    icon: Workflow,
    title: 'Data Pipelines',
    subtitle: 'Continuous Data Flow',
    description: 'Automated pipelines for continuously refreshed financial datasets from 50+ sources',
    features: ['Real-time Ingestion', 'Data Validation', 'Schema Management', 'Quality Checks'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 'mcp',
    icon: Server,
    title: 'MCP Servers',
    subtitle: 'AI Data Layer',
    description: 'Structured delivery to AI agents and models via standardized protocols',
    features: ['AI-Ready Format', 'Context Injection', 'Tool Integration', 'Streaming Support'],
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: 'bdaas',
    icon: Layers,
    title: 'BDAaS',
    subtitle: 'Big Data as a Service',
    description: 'Unified data layer powering agents, models, and products at scale',
    features: ['API Access', 'SDK Libraries', 'Query Engine', 'Data Lake'],
    color: 'from-accent to-data',
    bgColor: 'bg-accent/10',
  },
]

// Animated data flow visualization
function DataFlowDiagram() {
  return (
    <div className="relative py-8">
      {/* Source nodes */}
      <div className="flex justify-center gap-4 mb-8">
        {['Market', 'Fund', 'Macro', 'Alt'].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-700 border border-border flex items-center justify-center">
              <Database className="w-5 h-5 text-content-tertiary" />
            </div>
            <span className="text-xs text-content-tertiary mt-2">{label}</span>
          </motion.div>
        ))}
      </div>

      {/* Animated arrows down */}
      <div className="flex justify-center mb-4">
        <motion.div
          animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-accent" />
        </motion.div>
      </div>

      {/* Processing box */}
      <motion.div
        className="max-w-md mx-auto p-4 rounded-2xl bg-gradient-to-r from-accent/10 to-data/10 
                   border border-accent/30 mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-center gap-4">
          <Cpu className="w-8 h-8 text-accent" />
          <div className="text-center">
            <p className="text-sm font-medium text-content-primary">Processing Layer</p>
            <p className="text-xs text-content-tertiary">Normalization • Validation • Enrichment</p>
          </div>
          <HardDrive className="w-8 h-8 text-data" />
        </div>
      </motion.div>

      {/* Animated arrows down */}
      <div className="flex justify-center mb-4">
        <motion.div
          animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          <ArrowDown className="w-6 h-6 text-data" />
        </motion.div>
      </div>

      {/* Output nodes */}
      <div className="flex justify-center gap-6">
        {[
          { icon: Cloud, label: 'API' },
          { icon: Server, label: 'MCP' },
          { icon: Layers, label: 'SDK' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-data/20 
                           border border-accent/30 flex items-center justify-center">
              <item.icon className="w-6 h-6 text-accent" />
            </div>
            <span className="text-xs text-content-tertiary mt-2">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function InfrastructureSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeLayer, setActiveLayer] = React.useState<string | null>(null)

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-800/30 via-surface-900 to-surface-800/30" />
      
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
          <h2 className="text-3xl sm:text-4xl font-bold text-content-primary mb-4">
            Infrastructure Built for Scale
          </h2>
          <p className="text-lg text-content-secondary max-w-2xl mx-auto">
            Three layers working together to deliver clean, reliable data to your AI systems
          </p>
        </motion.div>

        {/* Visual diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-16"
        >
          <DataFlowDiagram />
        </motion.div>

        {/* Layer cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {infrastructureLayers.map((layer, index) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setActiveLayer(layer.id)}
              onMouseLeave={() => setActiveLayer(null)}
              className={`relative group rounded-2xl border transition-all duration-300 overflow-hidden
                         ${activeLayer === layer.id 
                           ? 'border-accent/50 scale-[1.02]' 
                           : 'border-border/50'}`}
            >
              {/* Background glow */}
              <div className={`absolute inset-0 ${layer.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative p-6">
                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center mb-4`}
                  animate={{ rotate: activeLayer === layer.id ? [0, -5, 5, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <layer.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <p className="text-xs text-accent font-medium mb-1">{layer.subtitle}</p>
                <h3 className="text-xl font-semibold text-content-primary mb-2">
                  {layer.title}
                </h3>
                <p className="text-sm text-content-secondary mb-4">
                  {layer.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {layer.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: activeLayer === layer.id ? 1 : 0.5, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${layer.color}`} />
                      <span className="text-xs text-content-tertiary">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
