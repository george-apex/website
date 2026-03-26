'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Code, Key, Database, Zap, Shield, Terminal, Book, Copy } from 'lucide-react'

const endpoints = [
  {
    method: 'POST',
    path: '/v1/agents/query',
    description: 'Send a query to your AI agent',
  },
  {
    method: 'GET',
    path: '/v1/agents/{id}',
    description: 'Retrieve agent configuration and status',
  },
  {
    method: 'POST',
    path: '/v1/agents/{id}/deploy',
    description: 'Deploy an agent to your infrastructure',
  },
  {
    method: 'GET',
    path: '/v1/data/query',
    description: 'Query data from connected sources',
  },
  {
    method: 'POST',
    path: '/v1/webhooks/register',
    description: 'Register a webhook for agent events',
  },
]

const features = [
  {
    icon: Key,
    title: 'Secure Authentication',
    description: 'API keys with fine-grained permissions and enterprise SSO support.',
  },
  {
    icon: Database,
    title: 'Data Connectors',
    description: 'Native integrations with databases, data lakes, and enterprise systems.',
  },
  {
    icon: Zap,
    title: 'Real-time Streaming',
    description: 'WebSocket support for real-time agent responses and events.',
  },
  {
    icon: Shield,
    title: 'Rate Limiting',
    description: 'Configurable rate limits with automatic retry and backoff.',
  },
]

const codeExample = `// Initialize the APEXE3 client
import { ApexE3 } from '@apexe3/sdk';

const client = new ApexE3({
  apiKey: process.env.APEXE3_API_KEY,
});

// Send a query to your AI agent
const response = await client.agents.query({
  agentId: 'agent_abc123',
  query: 'Analyze Q3 revenue trends',
  context: {
    department: 'finance',
    fiscalYear: 2024,
  },
});

console.log(response.result);`

export default function APIPage() {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-card border border-accent/30 bg-surface-800 flex items-center justify-center">
                <Code className="w-5 h-5 text-accent" />
              </div>
              <span className="text-label text-accent uppercase tracking-wider">API Reference</span>
            </div>
            
            <h1 className="text-display-lg font-bold text-content-primary mb-6">
              Build with the{' '}
              <span className="text-accent">APEXE3 API</span>
            </h1>
            
            <p className="text-body-lg text-content-secondary leading-relaxed max-w-3xl">
              A powerful, RESTful API for integrating APEXE3 AI agents into your applications, workflows, and enterprise systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 border-t border-border">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-card border border-border bg-surface-900/50"
              >
                <div className="w-10 h-10 rounded-card border border-accent/20 bg-surface-800 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-heading-sm font-semibold text-content-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-body-sm text-content-secondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-display-md font-bold text-content-primary mb-4">
              Quick Start
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl">
              Get started with the APEXE3 SDK in minutes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-card border border-border bg-surface-900 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-800/50">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="text-body-sm text-content-secondary">TypeScript</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1 rounded border border-border text-body-sm text-content-tertiary hover:text-accent hover:border-accent/30 transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-6 overflow-x-auto text-body-sm text-content-secondary font-mono leading-relaxed">
              <code>{codeExample}</code>
            </pre>
          </motion.div>

          <div className="flex gap-4 mt-6">
            <button className="flex items-center gap-2 px-6 py-3 rounded-card bg-accent text-surface-950 font-medium hover:bg-accent/90 transition-colors">
              <Book className="w-4 h-4" />
              Full Documentation
            </button>
            <button className="px-6 py-3 rounded-card border border-border text-content-primary hover:border-accent/30 transition-colors">
              API Reference
            </button>
          </div>
        </div>
      </section>

      {/* Endpoints Preview */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-display-md font-bold text-content-primary mb-4">
              API Endpoints
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl">
              Core endpoints for interacting with APEXE3.
            </p>
          </motion.div>

          <div className="space-y-3">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.path}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <span className={`px-2 py-1 rounded text-label font-mono font-medium ${
                  endpoint.method === 'GET' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-accent/20 text-accent'
                }`}>
                  {endpoint.method}
                </span>
                <code className="text-body font-mono text-content-primary">
                  {endpoint.path}
                </code>
                <span className="text-body-sm text-content-secondary ml-auto hidden sm:block">
                  {endpoint.description}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-display-md font-bold text-content-primary mb-4">
              Ready to Build?
            </h2>
            <p className="text-body-lg text-content-secondary mb-8">
              Get your API key and start integrating APEXE3 into your applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 rounded-card bg-accent text-surface-950 font-medium hover:bg-accent/90 transition-colors">
                Get API Key
              </button>
              <button className="px-6 py-3 rounded-card border border-border text-content-primary hover:border-accent/30 transition-colors">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
