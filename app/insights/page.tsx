'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FileText, 
  ArrowRight, 
  Clock,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TesseractToLightbulbIcon } from '@/components/animations/TesseractToLightbulbIcon'

const featuredInsights = [
  {
    id: 'last-mile-ai',
    title: 'The Last Mile of AI: Why 80% of Enterprise Pilots Never Reach Production',
    excerpt: 'Our research reveals the critical gap between AI prototypes and operational deployment. Learn what separates successful deployments from stalled pilots.',
    category: 'Research',
    readTime: '12 min read',
    date: 'March 2026',
    featured: true,
  },
  {
    id: 'ai-sovereignty',
    title: 'AI Sovereignty: The Competitive Advantage of Owning Your Intelligence Layer',
    excerpt: 'Why enterprises are moving from vendor-dependent AI to sovereign AI infrastructure—and the strategic benefits they\'re realizing.',
    category: 'Strategy',
    readTime: '8 min read',
    date: 'March 2026',
    featured: true,
  },
]

const insights = [
  {
    id: 'bespoke-agents',
    title: 'Bespoke vs. Generic AI Agents: The ROI Difference',
    excerpt: 'Customized AI agents deliver 3x the business impact compared to off-the-shelf solutions. Here\'s why.',
    category: 'Analysis',
    readTime: '6 min read',
    date: 'February 2026',
  },
  {
    id: 'deployment-framework',
    title: 'From Pilot to Production: A Deployment Framework',
    excerpt: 'A step-by-step methodology for scaling AI from proof-of-concept to enterprise-wide deployment.',
    category: 'Guide',
    readTime: '10 min read',
    date: 'February 2026',
  },
  {
    id: 'compliance-ready-ai',
    title: 'Building Compliance-Ready AI Systems',
    excerpt: 'How to design AI architecture that meets regulatory requirements from day one.',
    category: 'Technical',
    readTime: '7 min read',
    date: 'January 2026',
  },
  {
    id: 'measuring-ai-roi',
    title: 'Measuring AI ROI: Beyond Cost Savings',
    excerpt: 'A framework for capturing the full value of enterprise AI—including productivity, quality, and strategic benefits.',
    category: 'Analysis',
    readTime: '9 min read',
    date: 'January 2026',
  },
  {
    id: 'ai-governance',
    title: 'Enterprise AI Governance: A Practical Guide',
    excerpt: 'Implementing oversight, audit trails, and control mechanisms for AI systems at scale.',
    category: 'Guide',
    readTime: '11 min read',
    date: 'December 2025',
  },
  {
    id: 'data-sovereignty',
    title: 'Data Sovereignty in the Age of AI',
    excerpt: 'Understanding where your data lives, who controls it, and why it matters for AI deployment.',
    category: 'Strategy',
    readTime: '5 min read',
    date: 'December 2025',
  },
]

const platformMetrics = [
  { label: 'Deployment Success Rate', value: '94%', trend: '+12% YoY' },
  { label: 'Avg. Time to Production', value: '8 weeks', trend: '-35% YoY' },
  { label: 'User Adoption Rate', value: '87%', trend: '+8% YoY' },
  { label: 'Enterprise Clients Scaled', value: '150+', trend: '+40 YoY' },
]

const categories = [
  { name: 'All', count: insights.length + featuredInsights.length },
  { name: 'Research', count: 1 },
  { name: 'Strategy', count: 2 },
  { name: 'Analysis', count: 2 },
  { name: 'Guide', count: 2 },
  { name: 'Technical', count: 1 },
]

const whitepapers = [
  {
    title: 'The Last Mile Problem in AI',
    description: 'Comprehensive analysis of deployment barriers and how to overcome them.',
    pages: 18,
  },
  {
    title: 'Enterprise AI Sovereignty',
    description: 'Why owning your AI infrastructure matters for regulated industries.',
    pages: 24,
  },
  {
    title: 'Security-First AI Architecture',
    description: 'Building AI systems that meet enterprise security requirements.',
    pages: 12,
  },
]

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = React.useState('All')

  const filteredInsights = activeCategory === 'All' 
    ? insights 
    : insights.filter(i => i.category === activeCategory)

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
        
        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-card border border-accent/30 bg-surface-800 flex items-center justify-center overflow-hidden">
                <TesseractToLightbulbIcon size={48} lightbulbScale={1.56} lightbulbYOffset={0.1} />
              </div>
              <span className="text-label text-accent uppercase tracking-wider">Insights</span>
            </div>
            
            <h1 className="text-display-lg font-bold text-content-primary mb-6">
              Thought Leadership for{' '}
              <span className="text-accent">Enterprise AI</span>
            </h1>
            
            <p className="text-body-lg text-content-secondary leading-relaxed max-w-3xl">
              Research, analysis, and practical guidance for leaders navigating the complexities of enterprise AI deployment and scaling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platform Metrics Bar */}
      <section className="border-t border-border bg-surface-900/30">
        <div className="container-main py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platformMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-heading-lg font-bold text-content-primary mb-1">
                  {metric.value}
                </div>
                <div className="text-body-sm text-content-secondary mb-1">
                  {metric.label}
                </div>
                <div className="text-label text-accent">
                  {metric.trend}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Insights */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-display-md font-bold text-content-primary mb-4">
              Featured Research
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl">
              Our latest in-depth analysis on the most pressing topics in enterprise AI.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {featuredInsights.map((insight, index) => (
              <motion.article
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-label uppercase tracking-wider">
                    {insight.category}
                  </span>
                  <span className="text-body-sm text-content-tertiary">
                    {insight.date}
                  </span>
                </div>
                
                <h3 className="text-heading-md font-semibold text-content-primary mb-3 group-hover:text-accent transition-colors">
                  {insight.title}
                </h3>
                
                <p className="text-body text-content-secondary mb-6 leading-relaxed">
                  {insight.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-content-tertiary">
                    <Clock className="w-4 h-4" />
                    <span className="text-body-sm">{insight.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
                    <span className="text-body-sm font-medium">Read article</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Insights with Categories */}
      <section className="py-20 border-t border-border">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar - Categories */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:w-64 shrink-0"
            >
              <h3 className="text-heading-sm font-semibold text-content-primary mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-card text-body-sm transition-all ${
                      activeCategory === category.name
                        ? 'bg-accent/10 text-accent border border-accent/30'
                        : 'text-content-secondary hover:text-content-primary hover:bg-surface-800'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-content-tertiary">{category.count}</span>
                  </button>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="mt-8 p-6 rounded-card border border-border bg-surface-800/50">
                <h4 className="text-heading-xs font-semibold text-content-primary mb-2">
                  Get Insights Weekly
                </h4>
                <p className="text-body-sm text-content-secondary mb-4">
                  The latest enterprise AI research delivered to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-card border border-border bg-surface-900 text-content-primary text-body-sm placeholder:text-content-tertiary focus:border-accent/50 focus:outline-none mb-3"
                />
                <Button size="sm" className="w-full">
                  Subscribe
                </Button>
              </div>
            </motion.aside>

            {/* Main Content - Insights Grid */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-display-md font-bold text-content-primary mb-4">
                  All Insights
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredInsights.map((insight, index) => (
                  <motion.article
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group p-6 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-800 text-content-secondary text-label uppercase tracking-wider">
                        {insight.category}
                      </span>
                      <span className="text-body-sm text-content-tertiary">
                        {insight.date}
                      </span>
                    </div>
                    
                    <h3 className="text-heading-sm font-semibold text-content-primary mb-2 group-hover:text-accent transition-colors">
                      {insight.title}
                    </h3>
                    
                    <p className="text-body-sm text-content-secondary mb-4 line-clamp-2">
                      {insight.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-content-tertiary">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-label">{insight.readTime}</span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Whitepapers Section */}
      <section className="py-20 border-t border-border bg-surface-900/20">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-display-md font-bold text-content-primary mb-4">
              Whitepapers & Reports
            </h2>
            <p className="text-body-lg text-content-secondary max-w-2xl">
              In-depth research and analysis for enterprise AI leaders.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {whitepapers.map((paper, index) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-card border border-border bg-surface-900/50 hover:border-accent/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-card border border-accent/20 bg-surface-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-body-sm text-content-tertiary">{paper.pages} pages</span>
                </div>
                <h3 className="text-heading-sm font-semibold text-content-primary mb-2">
                  {paper.title}
                </h3>
                <p className="text-body-sm text-content-secondary mb-4">
                  {paper.description}
                </p>
                <div className="flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
                  <span className="text-body-sm font-medium">Download PDF</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/resources">
              <Button variant="outline">
                View All Resources
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
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
              Ready to Go the Last Mile?
            </h2>
            <p className="text-body-lg text-content-secondary mb-8">
              Transform your AI pilots into production-ready systems with APEXE3.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button>
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline">
                  Explore Solutions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
