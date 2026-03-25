'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  TrendingUp,
  Building2,
  LineChart,
  ChevronRight,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Download,
  Copy,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Zap,
  Shield,
  ExternalLink,
  Sparkles,
  Loader2,
} from 'lucide-react'

// =============================================================================
// TYPES
// =============================================================================

type Persona = 'portfolio_manager' | 'trader' | 'private_equity' | 'investment_banking'

interface Prompt {
  id: string
  text: string
  category: string
}

interface Evidence {
  id: string
  source: string
  title: string
  date: string
  snippet: string
  relevance: number
}

interface Finding {
  id: string
  title: string
  description: string
  impact: 'positive' | 'negative' | 'neutral'
  confidence: number
}

interface RiskFlag {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  probability: number
}

interface StructuredResponse {
  executiveSummary: string
  keyFindings: Finding[]
  citedEvidence: Evidence[]
  riskFlags: RiskFlag[]
  convictionScore: number
  confidenceLevel: 'High' | 'Medium' | 'Low'
  timeToInsight: string
  dataSources: number
  charts: {
    type: 'bar' | 'line' | 'pie'
    title: string
    data: { label: string; value: number; color?: string }[]
  }[]
  memoContent: {
    title: string
    sections: { heading: string; content: string }[]
  }
}

// =============================================================================
// PERSONA DATA
// =============================================================================

const personas: { id: Persona; label: string; icon: React.ElementType; description: string }[] = [
  { id: 'portfolio_manager', label: 'Portfolio Manager', icon: PieChart, description: 'Long-term conviction & allocation' },
  { id: 'trader', label: 'Trader', icon: TrendingUp, description: 'Tactical entry & exit signals' },
  { id: 'private_equity', label: 'Private Equity', icon: Building2, description: 'Due diligence & value creation' },
  { id: 'investment_banking', label: 'Investment Banking', icon: Briefcase, description: 'Deal context & market positioning' },
]

const personaPrompts: Record<Persona, Prompt[]> = {
  portfolio_manager: [
    { id: 'pm1', text: 'Should I increase my NVDA position ahead of earnings?', category: 'Position Sizing' },
    { id: 'pm2', text: 'What\'s the relative value case for semiconductor exposure vs. software?', category: 'Sector Allocation' },
    { id: 'pm3', text: 'How sustainable is the AI infrastructure capex cycle?', category: 'Thematic Conviction' },
    { id: 'pm4', text: 'What are the key risks to my Magnificent Seven concentration?', category: 'Risk Management' },
  ],
  trader: [
    { id: 't1', text: 'What\'s the technical setup for NVDA ahead of the 50-day test?', category: 'Technical Analysis' },
    { id: 't2', text: 'How are options markets pricing NVDA earnings volatility?', category: 'Volatility' },
    { id: 't3', text: 'What catalysts could move the stock in the next 48 hours?', category: 'Catalyst Watch' },
    { id: 't4', text: 'Where are the key support/resistance levels for the AI basket?', category: 'Levels' },
  ],
  private_equity: [
    { id: 'pe1', text: 'What\'s the competitive moat for the target company in the AI value chain?', category: 'Due Diligence' },
    { id: 'pe2', text: 'How defensible is their revenue model against hyperscaler vertical integration?', category: 'Value Creation' },
    { id: 'pe3', text: 'What multiple expansion opportunities exist in this market segment?', category: 'Exit Planning' },
    { id: 'pe4', text: 'Who are the likely strategic acquirers for this asset?', category: 'Buyer Universe' },
  ],
  investment_banking: [
    { id: 'ib1', text: 'What\'s the current market appetite for AI infrastructure IPOs?', category: 'Capital Markets' },
    { id: 'ib2', text: 'Which strategics are most likely to pursue M&A in this space?', category: 'M&A Advisory' },
    { id: 'ib3', text: 'How should we position this company\'s equity story for the roadshow?', category: 'Positioning' },
    { id: 'ib4', text: 'What are the key comps and precedent transactions for this deal?', category: 'Valuation' },
  ],
}

// =============================================================================
// MOCK RESPONSES - Realistic structured outputs
// =============================================================================

const mockResponses: Record<string, StructuredResponse> = {
  pm1: {
    executiveSummary: 'NVDA presents a compelling risk-reward at current levels with 25% upside to our $950 PT. However, position sizing should account for elevated expectations and potential volatility around earnings. A measured increase of 2-3% portfolio weight is justified for high-conviction holders.',
    keyFindings: [
      { id: 'f1', title: 'AI Capex Momentum Intact', description: 'Microsoft, Google, and Meta all reaffirmed AI infrastructure spend on recent calls. Combined capex guidance of $150B+ for 2024 provides strong revenue visibility.', impact: 'positive', confidence: 92 },
      { id: 'f2', title: 'Blackwell Ramp On Track', description: 'Supply chain checks indicate Blackwell is on schedule for volume production in Q4. This de-risks the product transition narrative.', impact: 'positive', confidence: 85 },
      { id: 'f3', title: 'Valuation Stretched vs. History', description: 'Trading at 35x forward P/E vs. 5-year average of 25x. Premium is justified by growth profile but limits upside surprise potential.', impact: 'neutral', confidence: 78 },
      { id: 'f4', title: 'China Risk Underappreciated', description: 'Export restrictions could impact 8-10% of revenue. Market seems to be pricing in minimal disruption.', impact: 'negative', confidence: 65 },
    ],
    citedEvidence: [
      { id: 'e1', source: 'Microsoft Q3 2024 Earnings', title: 'AI Infrastructure Investment Update', date: 'Apr 25, 2024', snippet: 'We expect capital expenditures to increase materially on a sequential basis...', relevance: 95 },
      { id: 'e2', source: 'NVIDIA 10-K', title: 'Geographic Revenue Breakdown', date: 'Feb 21, 2024', snippet: 'China contributed 17% of total revenue, down from 26% prior year...', relevance: 88 },
      { id: 'e3', source: 'Goldman Sachs Research', title: 'AI Infrastructure Capex Model', date: 'May 1, 2024', snippet: 'Hyperscaler AI capex expected to reach $158B in 2024, up 63% YoY...', relevance: 91 },
      { id: 'e4', source: 'Supply Chain Check - TSMC', title: 'CoWoS Capacity Expansion Update', date: 'May 8, 2024', snippet: 'Advanced packaging capacity on track to double by year-end...', relevance: 82 },
    ],
    riskFlags: [
      { id: 'r1', severity: 'high', title: 'Earnings Volatility', description: 'Options market pricing 8% move on earnings. Historical average is 6%. Elevated expectations increase binary risk.', probability: 72 },
      { id: 'r2', severity: 'medium', title: 'Competitive Pressure', description: 'AMD MI300X wins at Microsoft and Meta suggest share stabilization. Monitor DC GPU share data closely.', probability: 45 },
      { id: 'r3', severity: 'medium', title: 'Regulatory Headwinds', description: 'Additional export controls under consideration. DOJ antitrust inquiry could create overhang.', probability: 38 },
    ],
    convictionScore: 78,
    confidenceLevel: 'High',
    timeToInsight: '4.2s',
    dataSources: 47,
    charts: [
      {
        type: 'bar',
        title: 'Hyperscaler AI Capex ($B)',
        data: [
          { label: 'Microsoft', value: 45, color: '#306BFF' },
          { label: 'Google', value: 42, color: '#306BFF' },
          { label: 'Meta', value: 38, color: '#6B8E4E' },
          { label: 'Amazon', value: 33, color: '#8B7355' },
        ],
      },
      {
        type: 'pie',
        title: 'Revenue Exposure',
        data: [
          { label: 'Data Center', value: 83, color: '#306BFF' },
          { label: 'Gaming', value: 10, color: '#306BFF' },
          { label: 'Auto', value: 4, color: '#6B8E4E' },
          { label: 'Other', value: 3, color: '#666666' },
        ],
      },
    ],
    memoContent: {
      title: 'NVDA Position Sizing Recommendation',
      sections: [
        { heading: 'Investment Thesis', content: 'NVDA remains the primary beneficiary of the AI infrastructure buildout, with visibility into sustained double-digit growth through FY26. The company\'s dominant position in AI compute, combined with expanding software moat through CUDA ecosystem lock-in, supports premium valuation.' },
        { heading: 'Position Recommendation', content: 'For concentrated portfolios with high risk tolerance: Increase position by 2-3% to target weight of 8-10%. For diversified portfolios: Maintain current weight, add on 10%+ pullbacks.' },
        { heading: 'Key Catalysts', content: '1) Blackwell volume production (Q4), 2) Hyperscaler earnings reaffirming capex, 3) Potential software recurring revenue announcement.' },
        { heading: 'Risk Monitoring', content: 'Track: 1) DC GPU share data quarterly, 2) China revenue trends, 3) Competitive product announcements from AMD/Intel.' },
      ],
    },
  },
  t1: {
    executiveSummary: 'NVDA is testing critical support at the 50-day SMA ($820) with mixed technical signals. RSI at 42 suggests room to downside, but institutional accumulation patterns remain intact. Key inflection point: a break below $815 triggers swing long liquidation.',
    keyFindings: [
      { id: 'f1', title: '50-Day Test in Progress', description: 'Stock has touched 50-day SMA 3 times in past month, each time finding buyers. This is the 4th test - weakening support signals possible.', impact: 'neutral', confidence: 78 },
      { id: 'f2', title: 'Volume Profile Support', description: 'Highest volume node between $800-830. Strong institutional support zone with multiple VWAP levels coinciding.', impact: 'positive', confidence: 85 },
      { id: 'f3', title: 'Options Flow Bullish', description: 'Unusual call activity in $900 strikes expiring post-earnings. Institutional positioning for upside scenario.', impact: 'positive', confidence: 72 },
      { id: 'f4', title: 'Relative Strength Weakening', description: 'Underperforming SMH by 3% over past 5 days. Sector rotation pressure visible.', impact: 'negative', confidence: 68 },
    ],
    citedEvidence: [
      { id: 'e1', source: 'Bloomberg Terminal', title: 'NVDA Volume Profile Analysis', date: 'May 15, 2024', snippet: 'POC at $825, HVN spanning $800-860 with 2.3M contracts...', relevance: 94 },
      { id: 'e2', source: 'Options Flow Data', title: 'Block Trade Activity', date: 'May 15, 2024', snippet: 'Large call sweeps in Jun $900 strikes, 15K+ contracts traded...', relevance: 89 },
      { id: 'e3', source: 'Technical Analysis Report', title: 'RSI & MACD Indicators', date: 'May 15, 2024', snippet: 'Daily RSI at 42.3, approaching oversold territory. MACD histogram showing divergence...', relevance: 82 },
    ],
    riskFlags: [
      { id: 'r1', severity: 'high', title: 'Breakdown Risk', description: 'Close below $815 triggers stop losses and could cascade to $760 HVN support.', probability: 35 },
      { id: 'r2', severity: 'medium', title: 'Volatility Expansion', description: 'IV rank at 68th percentile. Gamma exposure elevated ahead of earnings.', probability: 65 },
    ],
    convictionScore: 68,
    confidenceLevel: 'Medium',
    timeToInsight: '3.8s',
    dataSources: 23,
    charts: [
      {
        type: 'line',
        title: 'Price vs. Moving Averages',
        data: [
          { label: 'Price', value: 822 },
          { label: '50-Day', value: 820 },
          { label: '200-Day', value: 685 },
        ],
      },
    ],
    memoContent: {
      title: 'NVDA Technical Setup Note',
      sections: [
        { heading: 'Current Setup', content: 'Testing 50-day support with mixed signals. Institutional buyers present but momentum weakening. Watch $815 as key breakdown level.' },
        { heading: 'Trade Idea', content: 'Long at $820 with stop at $810. Target $880-900 into earnings. Risk/reward 1:3.' },
        { heading: 'Key Levels', content: 'Support: $820 (50-day), $800 (HVN), $760 (200-day extension). Resistance: $850, $880, $900.' },
      ],
    },
  },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ALICEResponseDemo() {
  const [selectedPersona, setSelectedPersona] = React.useState<Persona>('portfolio_manager')
  const [selectedPrompt, setSelectedPrompt] = React.useState<Prompt | null>(null)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [showResponse, setShowResponse] = React.useState(false)
  const [response, setResponse] = React.useState<StructuredResponse | null>(null)
  const [activeTab, setActiveTab] = React.useState<'summary' | 'memo'>('summary')

  const prompts = personaPrompts[selectedPersona]

  const handlePromptSelect = React.useCallback((prompt: Prompt) => {
    setSelectedPrompt(prompt)
    setIsProcessing(true)
    setShowResponse(false)
    setResponse(null)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      setResponse(mockResponses[prompt.id] || mockResponses['pm1'])
      setShowResponse(true)
    }, 2500)
  }, [])

  const handleReset = React.useCallback(() => {
    setSelectedPrompt(null)
    setShowResponse(false)
    setResponse(null)
    setIsProcessing(false)
  }, [])

  return (
    <section className="relative pt-8 pb-24 min-[393px]:pt-32 md:pt-40 lg:pt-44 md:pb-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-950" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-900/50 via-transparent to-surface-900/50" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(48,107,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(48,107,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Interactive Demo</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-content-primary mb-4">
            From Question to Conviction
          </h2>
          <p className="text-lg md:text-xl text-content-secondary max-w-3xl mx-auto">
            See how ALICE transforms complex professional questions into structured, decision-ready intelligence.
          </p>
        </motion.div>

        {/* Main Demo Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="bg-surface-900/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-surface-800/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-negative/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-positive/60" />
                </div>
                <span className="text-sm text-content-tertiary">ALICE Intelligence Interface</span>
              </div>
              {showResponse && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 text-xs text-content-tertiary"
                >
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {response?.timeToInsight}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    {response?.dataSources} sources
                  </span>
                </motion.div>
              )}
            </div>

            <div className="grid lg:grid-cols-[380px,1fr] min-h-[600px]">
              {/* Left Panel - Input Selection */}
              <div className="border-r border-border/50 bg-surface-800/30">
                {/* Persona Selector */}
                <div className="p-4 border-b border-border/50">
                  <label className="text-xs font-medium text-content-tertiary uppercase tracking-wider mb-3 block">
                    Select Your Role
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {personas.map((persona) => {
                      const Icon = persona.icon
                      const isActive = selectedPersona === persona.id
                      return (
                        <button
                          key={persona.id}
                          onClick={() => {
                            setSelectedPersona(persona.id)
                            handleReset()
                          }}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border transition-all text-left ${
                            isActive
                              ? 'bg-accent/10 border-accent/40 text-accent'
                              : 'bg-surface-800/50 border-border/50 text-content-secondary hover:border-border hover:text-content-primary'
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="text-xs font-medium truncate">{persona.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Prompts */}
                <div className="p-4">
                  <label className="text-xs font-medium text-content-tertiary uppercase tracking-wider mb-3 block">
                    Select a Question
                  </label>
                  <div className="space-y-2">
                    {prompts.map((prompt) => {
                      const isActive = selectedPrompt?.id === prompt.id
                      return (
                        <motion.button
                          key={prompt.id}
                          onClick={() => handlePromptSelect(prompt)}
                          disabled={isProcessing}
                          className={`w-full text-left p-3 rounded-lg border transition-all group ${
                            isActive
                              ? 'bg-accent/10 border-accent/40'
                              : 'bg-surface-800/30 border-border/30 hover:border-border/60 hover:bg-surface-800/50'
                          } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                          whileHover={!isProcessing ? { x: 4 } : {}}
                          whileTap={!isProcessing ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <span className="text-xs text-accent/80 font-medium">{prompt.category}</span>
                              <p className={`text-sm mt-0.5 ${isActive ? 'text-accent' : 'text-content-primary'}`}>
                                {prompt.text}
                              </p>
                            </div>
                            <ChevronRight className={`w-4 h-4 mt-1 flex-shrink-0 transition-transform ${
                              isActive ? 'text-accent rotate-90' : 'text-content-tertiary group-hover:translate-x-0.5'
                            }`} />
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Persona Description */}
                <div className="p-4 mt-auto border-t border-border/50 bg-surface-800/20">
                  <p className="text-xs text-content-tertiary">
                    <span className="text-content-secondary font-medium">
                      {personas.find(p => p.id === selectedPersona)?.label}:
                    </span>{' '}
                    {personas.find(p => p.id === selectedPersona)?.description}
                  </p>
                </div>
              </div>

              {/* Right Panel - Output */}
              <div className="relative bg-surface-900/50">
                <AnimatePresence mode="wait">
                  {!selectedPrompt && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="text-center max-w-md px-6">
                        <div className="w-16 h-16 rounded-2xl bg-surface-800 border border-border/50 flex items-center justify-center mx-auto mb-4">
                          <Target className="w-8 h-8 text-content-tertiary" />
                        </div>
                        <h3 className="text-lg font-medium text-content-primary mb-2">
                          Select a Question
                        </h3>
                        <p className="text-sm text-content-tertiary">
                          Choose a question from the left panel to see how ALICE transforms it into structured intelligence.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {isProcessing && (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <motion.div
                          className="relative w-24 h-24 mx-auto mb-6"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        >
                          <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/30" />
                          <div className="absolute inset-2 rounded-full border-2 border-dashed border-accent/30" style={{ animationDirection: 'reverse' }} />
                          <div className="absolute inset-4 rounded-full bg-surface-800 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-accent animate-pulse" />
                          </div>
                        </motion.div>
                        <h3 className="text-lg font-medium text-content-primary mb-2">
                          ALICE is analyzing...
                        </h3>
                        <div className="flex items-center justify-center gap-4 text-xs text-content-tertiary">
                          <span className="flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Gathering evidence
                          </span>
                          <span className="flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" style={{ animationDelay: '0.2s' }} />
                            Cross-referencing
                          </span>
                          <span className="flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" style={{ animationDelay: '0.4s' }} />
                            Structuring output
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {showResponse && response && (
                    <motion.div
                      key="response"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full overflow-y-auto"
                    >
                      {/* Response Header */}
                      <div className="sticky top-0 z-10 bg-surface-900/95 backdrop-blur-sm border-b border-border/50 px-6 py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <span className="text-xs text-accent font-medium">{selectedPrompt?.category}</span>
                            <h3 className="text-lg font-medium text-content-primary mt-0.5">
                              {selectedPrompt?.text}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg bg-surface-800 border border-border/50 text-content-tertiary hover:text-content-primary hover:border-border transition-colors"
                              title="Copy to clipboard"
                            >
                              <Copy className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 rounded-lg bg-surface-800 border border-border/50 text-content-tertiary hover:text-content-primary hover:border-border transition-colors"
                              title="Export memo"
                            >
                              <Download className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              onClick={handleReset}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-3 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm font-medium hover:bg-accent/20 transition-colors"
                            >
                              New Question
                            </motion.button>
                          </div>
                        </div>

                        {/* Conviction Indicator */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center gap-6 mt-4 pt-4 border-t border-border/30"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <svg className="w-14 h-14 -rotate-90">
                                <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(48,107,255,0.2)" strokeWidth="4" />
                                <motion.circle
                                  cx="28" cy="28" r="24" fill="none" stroke="#306BFF" strokeWidth="4"
                                  strokeLinecap="round"
                                  strokeDasharray={`${response.convictionScore * 1.51} 151`}
                                  initial={{ strokeDasharray: '0 151' }}
                                  animate={{ strokeDasharray: `${response.convictionScore * 1.51} 151` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                />
                              </svg>
                              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-accent">
                                {response.convictionScore}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-content-tertiary">Conviction Score</span>
                              <p className="text-sm font-medium text-content-primary">{response.confidenceLevel} Confidence</p>
                            </div>
                          </div>
                          <div className="h-10 w-px bg-border/50" />
                          <div className="flex items-center gap-2">
                            {response.riskFlags.map((risk) => (
                              <span
                                key={risk.id}
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                                  risk.severity === 'high' ? 'bg-negative/20 text-negative' :
                                  risk.severity === 'medium' ? 'bg-warning/20 text-warning' :
                                  'bg-content-tertiary/20 text-content-tertiary'
                                }`}
                              >
                                <AlertTriangle className="w-3 h-3" />
                                {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)} Risk
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      {/* Tab Navigation */}
                      <div className="px-6 pt-4 border-b border-border/50">
                        <div className="flex gap-1">
                          {[
                            { id: 'summary', label: 'Intelligence Brief' },
                            { id: 'memo', label: 'Export Memo' },
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id as typeof activeTab)}
                              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                                activeTab === tab.id
                                  ? 'bg-surface-800 text-content-primary border-b-2 border-accent'
                                  : 'text-content-tertiary hover:text-content-secondary'
                              }`}
                            >
                              {tab.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <AnimatePresence mode="wait">
                          {activeTab === 'summary' ? (
                            <motion.div
                              key="summary"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-6"
                            >
                              {/* Executive Summary */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="p-5 rounded-xl bg-surface-800/50 border border-border/50"
                              >
                                <h4 className="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-3">
                                  Executive Summary
                                </h4>
                                <p className="text-content-primary leading-relaxed">
                                  {response.executiveSummary}
                                </p>
                              </motion.div>

                              {/* Key Findings */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <h4 className="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-4">
                                  Key Findings
                                </h4>
                                <div className="grid gap-3">
                                  {response.keyFindings.map((finding, i) => (
                                    <motion.div
                                      key={finding.id}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.3 + i * 0.1 }}
                                      className="flex gap-4 p-4 rounded-lg bg-surface-800/30 border border-border/30 hover:border-border/50 transition-colors"
                                    >
                                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                        finding.impact === 'positive' ? 'bg-positive/20 text-positive' :
                                        finding.impact === 'negative' ? 'bg-negative/20 text-negative' :
                                        'bg-content-tertiary/20 text-content-tertiary'
                                      }`}>
                                        {finding.impact === 'positive' ? <ArrowUpRight className="w-4 h-4" /> :
                                         finding.impact === 'negative' ? <ArrowUpRight className="w-4 h-4 rotate-90" /> :
                                         <span className="text-xs font-bold">—</span>}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                          <h5 className="font-medium text-content-primary">{finding.title}</h5>
                                          <span className="text-xs text-content-tertiary whitespace-nowrap">
                                            {finding.confidence}% confidence
                                          </span>
                                        </div>
                                        <p className="text-sm text-content-secondary mt-1">{finding.description}</p>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>

                              {/* Charts Row */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="grid md:grid-cols-2 gap-4"
                              >
                                {response.charts.map((chart, i) => (
                                  <div key={i} className="p-4 rounded-xl bg-surface-800/30 border border-border/30">
                                    <h5 className="text-sm font-medium text-content-primary mb-4">{chart.title}</h5>
                                    {/* Simple Bar Chart */}
                                    {chart.type === 'bar' && (
                                      <div className="space-y-3">
                                        {chart.data.map((item, j) => (
                                          <div key={j} className="flex items-center gap-3">
                                            <span className="text-xs text-content-tertiary w-20 truncate">{item.label}</span>
                                            <div className="flex-1 h-4 bg-surface-700/50 rounded overflow-hidden">
                                              <motion.div
                                                className="h-full rounded"
                                                style={{ backgroundColor: item.color }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(item.value / 50) * 100}%` }}
                                                transition={{ duration: 0.8, delay: 0.5 + j * 0.1 }}
                                              />
                                            </div>
                                            <span className="text-xs font-medium text-content-primary w-10 text-right">${item.value}B</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    {/* Simple Pie Chart */}
                                    {chart.type === 'pie' && (
                                      <div className="flex items-center gap-6">
                                        <div className="relative w-24 h-24">
                                          <svg className="w-full h-full -rotate-90">
                                            {chart.data.reduce((acc, item, j) => {
                                              const prevOffset = acc.offset
                                              const dashArray = (item.value / 100) * 251.2
                                              acc.elements.push(
                                                <motion.circle
                                                  key={j}
                                                  cx="48"
                                                  cy="48"
                                                  r="40"
                                                  fill="none"
                                                  stroke={item.color}
                                                  strokeWidth="16"
                                                  strokeDasharray={`${dashArray} 251.2`}
                                                  strokeDashoffset={-prevOffset}
                                                  initial={{ strokeDasharray: `0 251.2` }}
                                                  animate={{ strokeDasharray: `${dashArray} 251.2` }}
                                                  transition={{ duration: 0.8, delay: 0.5 + j * 0.1 }}
                                                />
                                              )
                                              acc.offset += dashArray
                                              return acc
                                            }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
                                          </svg>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                          {chart.data.map((item, j) => (
                                            <div key={j} className="flex items-center gap-2">
                                              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                                              <span className="text-xs text-content-secondary">{item.label}</span>
                                              <span className="text-xs font-medium text-content-primary ml-auto">{item.value}%</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </motion.div>

                              {/* Cited Evidence */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                              >
                                <h4 className="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-4">
                                  Cited Evidence
                                </h4>
                                <div className="grid gap-2">
                                  {response.citedEvidence.map((evidence, i) => (
                                    <motion.div
                                      key={evidence.id}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: 0.6 + i * 0.05 }}
                                      className="flex items-start gap-3 p-3 rounded-lg bg-surface-800/20 hover:bg-surface-800/40 border border-transparent hover:border-border/30 transition-all cursor-pointer group"
                                    >
                                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-accent" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                          <div>
                                            <span className="text-xs text-content-tertiary">{evidence.source}</span>
                                            <h5 className="text-sm font-medium text-content-primary group-hover:text-accent transition-colors">
                                              {evidence.title}
                                            </h5>
                                          </div>
                                          <span className="text-xs text-content-tertiary whitespace-nowrap">{evidence.date}</span>
                                        </div>
                                        <p className="text-xs text-content-secondary mt-1 line-clamp-1">
                                          "{evidence.snippet}"
                                        </p>
                                      </div>
                                      <ExternalLink className="w-4 h-4 text-content-tertiary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>

                              {/* Risk Flags */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                              >
                                <h4 className="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-4">
                                  Risk Flags
                                </h4>
                                <div className="grid gap-2">
                                  {response.riskFlags.map((risk, i) => (
                                    <motion.div
                                      key={risk.id}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.75 + i * 0.1 }}
                                      className={`flex items-start gap-3 p-4 rounded-lg border ${
                                        risk.severity === 'critical' ? 'bg-negative/10 border-negative/30' :
                                        risk.severity === 'high' ? 'bg-negative/5 border-negative/20' :
                                        risk.severity === 'medium' ? 'bg-warning/5 border-warning/20' :
                                        'bg-surface-800/30 border-border/30'
                                      }`}
                                    >
                                      <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                        risk.severity === 'critical' || risk.severity === 'high' ? 'text-negative' :
                                        risk.severity === 'medium' ? 'text-warning' :
                                        'text-content-tertiary'
                                      }`} />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                          <h5 className="font-medium text-content-primary">{risk.title}</h5>
                                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                                            risk.severity === 'critical' || risk.severity === 'high' ? 'bg-negative/20 text-negative' :
                                            risk.severity === 'medium' ? 'bg-warning/20 text-warning' :
                                            'bg-content-tertiary/20 text-content-tertiary'
                                          }`}>
                                            {risk.probability}% probability
                                          </span>
                                        </div>
                                        <p className="text-sm text-content-secondary mt-1">{risk.description}</p>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="memo"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              {/* Export Memo Format */}
                              <div className="bg-white text-slate-900 rounded-lg p-8 shadow-lg">
                                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                                  <div>
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Investment Memo</span>
                                    <h3 className="text-xl font-bold text-slate-900 mt-1">{response.memoContent.title}</h3>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-500">
                                      Generated by ALICE • {new Date().toLocaleDateString()}
                                    </span>
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-sm font-medium text-slate-700 transition-colors">
                                      <Download className="w-4 h-4" />
                                      Export PDF
                                    </button>
                                  </div>
                                </div>

                                <div className="space-y-6">
                                  {response.memoContent.sections.map((section, i) => (
                                    <div key={i}>
                                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                                        {section.heading}
                                      </h4>
                                      <p className="text-slate-700 leading-relaxed">
                                        {section.content}
                                      </p>
                                    </div>
                                  ))}
                                </div>

                                <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                                  <span>Confidential • For institutional use only</span>
                                  <span>Conviction Score: {response.convictionScore}/100</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-content-secondary mb-4">
            Experience ALICE with your own questions
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-surface-900 font-medium rounded-lg hover:bg-accent-light transition-colors"
          >
            Schedule a Demo
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default ALICEResponseDemo
