'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Landmark, 
  FileSearch, 
  ShieldAlert, 
  Lock, 
  LineChart, 
  Building2, 
  Mic,
  ArrowRight,
  Sparkles,
  X,
  Send,
  Loader2,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SubNavigation } from '@/components/layout/SubNavigation'

const agents = [
  {
    id: 'government-bond',
    title: 'Fixed Income Government Bond Agent',
    shortTitle: 'Government Bond',
    icon: Landmark,
    category: 'Fixed Income',
    overview: 'Provides sovereign bond traders with a real-time overview of geopolitical, economic, and market events that may influence government bond performance. Using proprietary IP and sentiment scoring models, it analyses and quantifies the potential market impact of geopolitical and macroeconomic developments.',
    whenToUse: 'Use for overnight or intra-day analysis of how news and macro factors may affect sovereign yields, spreads, and volatility.',
    howToUse: 'Select the countries or regions of interest and the agent will summarise the most relevant news items, weighted by sentiment and market impact. Visual maps and tables highlight trends and event intensity.',
    examplePrompts: [
      '"Russia conflict."',
      '"Pakistan"'
    ],
    userBenefit: 'Quickly connects bond market movements with underlying geopolitical drivers, enabling faster reaction and better-informed trading decisions.',
    features: ['Country Map & Bond View', 'GDELT News View', 'Uncertainty Indexes', 'Sentiment Scoring'],
    demoResponse: `**Geopolitical Analysis: Russia Conflict**

**Market Impact Assessment:**
- **Sentiment Score:** Negative (-0.72)
- **Relevance:** High (0.89)
- **Affected Markets:** EUR Bonds, USD Treasuries, Emerging Market Debt

**Key Developments:**
1. **Energy Sector:** Continued pressure on European gas prices, +12% MoM
2. **Sanctions Impact:** Secondary sanctions affecting EUR 2.3B in trade flows
3. **Risk Premium:** Russian bond spreads widened by 45bps

**Recommended Actions:**
- Monitor EUR sovereign spreads for widening
- Review EM exposure to Russia-adjacent economies
- Consider flight-to-quality positioning in US Treasuries`
  },
  {
    id: 'prospectus-analyser',
    title: 'Fixed Income Prospectus Analyser Agent',
    shortTitle: 'Prospectus Analyser',
    icon: FileSearch,
    category: 'Fixed Income',
    overview: 'Enables users to analyse bond prospectuses at scale using natural language, transforming traditionally manual legal review into a fast, automated workflow. It processes structured and unstructured data from bond documentation, extracting key terms such as covenants, coupon structures, maturities, ranking, and redemption features.',
    whenToUse: 'Use when reviewing new issues, secondary offerings, or for comparing bond terms across issuers.',
    howToUse: 'Upload prospectus documents or query existing ones. The agent returns structured key details such as issuer, ranking, coupon type, maturity, and events of default.',
    examplePrompts: [
      '"Summarise the key covenants for Comcast Corp."',
      '"Does L\'Oréal 2025 have a change-of-control clause?"',
      '"List all EUR bonds maturing after 2030."'
    ],
    userBenefit: 'Removes manual review of long legal documents by extracting critical details in seconds, allowing faster due diligence and covenant comparison.',
    features: ['Covenant Analysis', 'Coupon Structures', 'Maturity Tracking', 'Redemption Features'],
    demoResponse: `**Prospectus Analysis: Comcast Corp.**

**Key Covenants Identified:**

| Covenant | Status | Details |
|----------|--------|---------|
| Debt/EBITDA | Active | Max 4.5x (current: 3.2x) |
| Interest Coverage | Active | Min 3.0x (current: 5.8x) |
| Restricted Payments | Active | 50% of Cumulative Credit |
| Asset Sales | Active | Proceeds must be used for debt reduction |

**Change of Control:** ✓ Present (101% put option)

**Maturity Schedule:**
- 2026: $1.2B (4.25% Notes)
- 2028: $2.0B (4.75% Notes)
- 2033: $1.5B (5.15% Notes)

**Redemption Features:** Callable at par + 50bps make-whole`
  },
  {
    id: 'credit-risk-analyser',
    title: 'Fixed Income Credit Risk Analyser Agent',
    shortTitle: 'Credit Risk Analyser',
    icon: ShieldAlert,
    category: 'Fixed Income',
    overview: 'Enables users to analyse and monitor real-time bond data. It ingests live market pricing, spreads, and credit indicators, displaying them in a structured and interactive format that can be queried using natural language. Live market news is automatically surfaced alongside each bond.',
    whenToUse: 'Ideal for risk teams and portfolio managers assessing credit quality, spread movement, or counterparty exposure.',
    howToUse: 'Input an issuer, bond, or portfolio and receive a detailed breakdown of risk metrics, spread history, and sentiment indicators derived from market and fundamental data.',
    examplePrompts: [
      '"Show credit spread changes for Vodafone."',
      '"Highlight issuers with increased downgrade probability."',
      '"Compare CDS spreads for Barclays and HSBC."'
    ],
    userBenefit: 'Delivers instant, explainable credit insights that improve portfolio monitoring and support proactive risk management.',
    features: ['Live Market Pricing', 'Spread Analysis', 'Credit Indicators', 'News Integration'],
    demoResponse: `**Credit Analysis: Vodafone**

**Credit Metrics Summary:**

| Metric | Current | 30D Change | Signal |
|--------|---------|------------|--------|
| CDS Spread | 85bps | +12bps | ⚠️ Widening |
| OAS | 92bps | +8bps | ⚠️ Watch |
| Liquidity Score | 8.2/10 | -0.3 | ✓ Stable |
| Recovery Rate | 42% | - | Benchmark |

**Rating Outlook:**
- **S&P:** BBB+ (Stable)
- **Moody's:** Baa1 (Negative Watch)
- **Fitch:** BBB+ (Stable)

**Recent News:**
1. Q3 earnings beat expectations (+3.2%)
2. Spectrum auction costs higher than guided
3. Leverage ratio trending toward covenant threshold

**Risk Assessment:** MODERATE - Monitor leverage metrics`
  },
  {
    id: 'private-data-analyser',
    title: 'Private Data Analyser Agent',
    shortTitle: 'Private Data Analyser',
    icon: Lock,
    category: 'Data Analytics',
    overview: 'Enables users to securely investigate and query large datasets at scale using natural language, without compromising privacy or compliance. It translates user queries into safe, auditable SQL, executes them against approved databases, and returns structured results in readable tables.',
    whenToUse: 'Use when analysing proprietary data within a controlled environment where privacy and governance are essential.',
    howToUse: 'Upload or connect to your database. Query using natural language and review results in structured tables, with optional SQL visibility.',
    examplePrompts: [
      '"List the top 5 ETFs by 1-year total return."',
      '"What is Vanguard\'s net cash flow for Q1 2025?"',
      '"Show all funds with AUM above £1bn."'
    ],
    userBenefit: 'Transforms private data analysis into a secure, low-code workflow—enhancing productivity without compromising compliance.',
    features: ['Natural Language to SQL', 'Data Governance', 'Audit Trails', 'Secure Environments'],
    demoResponse: `**Query Results: Top 5 ETFs by 1-Year Return**

| Rank | ETF Name | Ticker | 1Y Return | AUM (£M) |
|------|----------|--------|-----------|----------|
| 1 | iShares Tech Growth | ITEC | +42.3% | 2,450 |
| 2 | Vanguard US Growth | VUGL | +38.7% | 1,890 |
| 3 | Invesco AI & Robotics | AIRO | +35.2% | 890 |
| 4 | HSBC Emerging Tech | HMET | +31.8% | 567 |
| 5 | BlackRock Clean Energy | IBCL | +28.4% | 1,234 |

**Generated SQL:**
\`\`\`sql
SELECT etf_name, ticker, 
       return_1y, aum_gbp
FROM etf_performance
WHERE return_1y IS NOT NULL
ORDER BY return_1y DESC
LIMIT 5;
\`\`\`

**Governance:** ✓ Query logged | ✓ User verified | ✓ Data scope approved`
  },
  {
    id: 'chart-builder',
    title: 'Multi-Asset Chart Builder Agent',
    shortTitle: 'Chart Builder',
    icon: LineChart,
    category: 'Visualization',
    overview: 'Allows users to create visual representations of datasets and comparative data through natural language interactions. The agent retrieves data from secure and approved sources, and automatically generates charts or graphs with full transparency of data used.',
    whenToUse: 'Use for market analysis, performance comparison, or quick visualisation of time-series data.',
    howToUse: 'Type a query and the agent fetches and visualises the data. Users can customise chart type, date range, and export results.',
    examplePrompts: [
      '"Show the S&P 500 and add Nvidia and Tesla."',
      '"Add the 10-year Treasury yield and normalise to 100."',
      '"Plot UK GDP growth against inflation."'
    ],
    userBenefit: 'Removes the need for manual charting tools, instantly turning data into clear, presentation-ready visuals.',
    features: ['Multi-Asset Support', 'Custom Chart Types', 'Data Export', 'Time-Series Analysis'],
    demoResponse: `**Chart Generated: S&P 500, Nvidia, Tesla (Normalized)**

\`\`\`
                    Performance Comparison (Rebased to 100)
    ┌────────────────────────────────────────────────────────────────┐
240 │                                          ▲ Nvidia              │
    │                                        ╱                       │
200 │                                      ╱                         │
    │                                    ╱    ◆ Tesla               │
160 │                                  ╱   ╱                        │
    │                                ╱   ╱                          │
120 │             ─── S&P 500 ───╱───╱                             │
    │           ╱──────────────╱                                   │
 80 │         ╱                                                   │
    │───────╱─────────────────────────────────────────────────────│
    └────────────────────────────────────────────────────────────────┘
      Jan   Feb   Mar   Apr   May   Jun   Jul   Aug   Sep   Oct
\`\`\`

**Performance Metrics:**
- S&P 500: +12.4%
- Nvidia: +142.8%
- Tesla: +68.3%

**Export Options:** PNG | SVG | CSV | Excel`
  },
  {
    id: 'company-fundamentals',
    title: 'Company Fundamentals Agent',
    shortTitle: 'Company Fundamentals',
    icon: Building2,
    category: 'Equity Research',
    overview: 'Allows users to access and analyse a company\'s financial data in depth using natural language. Traders, quants, and portfolio managers can query and find key fundamental metrics in plain language, instantly retrieving the latest company data to support faster, more informed investment decisions.',
    whenToUse: 'Use for researching company performance, peer comparison, or pre-trade analysis.',
    howToUse: 'Query company names or metrics such as revenue, profit, or valuation. Results appear in tables and can be exported or visualised as charts.',
    examplePrompts: [
      '"Show Apple\'s quarterly revenue and net income."',
      '"List technology companies with >10% revenue growth."',
      '"Compare balance sheets for BP and Shell."'
    ],
    userBenefit: 'Delivers instant, accurate financial metrics and standardised data, reducing research time and improving consistency across teams.',
    features: ['Financial Statements', 'Valuation Metrics', 'Peer Comparison', 'Chart Generation'],
    demoResponse: `**Apple Inc. (AAPL) - Quarterly Financials**

**Income Statement (USD Billions):**

| Metric | Q4 2024 | Q3 2024 | Q4 2023 | YoY Δ |
|--------|---------|---------|---------|-------|
| Revenue | $94.3B | $81.8B | $89.5B | +5.4% |
| Gross Profit | $42.1B | $36.0B | $39.8B | +5.8% |
| Net Income | $22.9B | $19.9B | $22.9B | — |
| EPS | $1.46 | $1.26 | $1.46 | — |

**Key Metrics:**
- **Gross Margin:** 44.6%
- **Operating Margin:** 29.8%
- **P/E Ratio:** 28.4x
- **Market Cap:** $2.89T

**Segment Revenue:**
- iPhone: $46.2B (49%)
- Services: $22.3B (24%)
- Mac: $11.5B (12%)
- iPad: $8.4B (9%)
- Wearables: $5.9B (6%)`
  },
  {
    id: 'earnings-calls-analyser',
    title: 'Earnings Calls Analyser Agent',
    shortTitle: 'Earnings Calls Analyser',
    icon: Mic,
    category: 'Equity Research',
    overview: 'Streamlines the analysis, extraction and summary of earnings call transcripts and financial disclosures. Using natural language alongside various AI models, it converts lengthy, unstructured transcripts into concise, actionable insights and structured data.',
    whenToUse: 'Use during reporting seasons to analyse large volumes of earnings transcripts quickly.',
    howToUse: 'Select a company and quarter, then ask questions. The agent links commentary with financial data and highlights sentiment.',
    examplePrompts: [
      '"Summarise management commentary for Apple\'s Q1 2025 earnings call."',
      '"Extract mentions of inflation from top 10 holdings\' earnings calls."',
      '"Compare tone and sentiment between Microsoft and Google."'
    ],
    userBenefit: 'Reduces manual transcript review, identifies key insights instantly, and supports faster reporting and investment analysis.',
    features: ['Transcript Parsing', 'Sentiment Analysis', 'Quarterly Filtering', 'Management Commentary'],
    demoResponse: `**Apple Q1 2025 Earnings Call Summary**

**Overall Sentiment:** Positive (0.72)

**Key Themes Identified:**

1. **AI Integration** (↑ Positive)
   - "Excited about Apple Intelligence rollout"
   - "Seeing strong adoption across devices"
   - 23 mentions of AI/ML capabilities

2. **China Market** (↓ Cautious)
   - "Headwinds in Greater China region"
   - Revenue down 8% YoY
   - Competition intensifying

3. **Services Growth** (↑ Positive)
   - Services revenue up 14% to $24.2B
   - 900M+ paid subscriptions
   - Strong App Store momentum

**Management Tone Analysis:**
| Speaker | Sentiment | Key Words |
|---------|-----------|-----------|
| Tim Cook | 0.78 | opportunity, excited, innovation |
| Luca Maestri | 0.65 | growth, margin, confidence |

**Q&A Highlights:**
- AI monetization timeline addressed
- Capital allocation strategy affirmed
- No major guidance changes`
  }
]

const categories = ['All', 'Fixed Income', 'Data Analytics', 'Visualization', 'Equity Research']

// Agent Card Component with Hover Effects
function AgentCard({ agent, onTryAgent }: { agent: typeof agents[0]; onTryAgent: () => void }) {
  const [isHovered, setIsHovered] = React.useState(false)
  const Icon = agent.icon

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Glow effect */}
      <div 
        className={cn(
          "absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500",
          isHovered && "opacity-100"
        )}
      />
      
      {/* Animated border */}
      <div className={cn(
        "absolute -inset-px rounded-2xl transition-all duration-300",
        isHovered 
          ? "bg-gradient-to-r from-accent via-accent/50 to-accent opacity-100" 
          : "bg-transparent"
      )}>
        <div className="absolute inset-0 rounded-2xl bg-surface-800" />
      </div>

      {/* Card content */}
      <div className={cn(
        "relative h-full bg-surface-800 rounded-2xl overflow-hidden transition-all duration-300",
        isHovered && "bg-surface-800/95"
      )}>
        {/* Top accent line */}
        <div className={cn(
          "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )} />

        {/* Icon glow */}
        <div className={cn(
          "absolute top-6 left-6 w-12 h-12 rounded-xl transition-all duration-300",
          isHovered && "bg-accent/20"
        )}>
          <div className={cn(
            "absolute inset-0 rounded-xl bg-accent/20 blur-xl transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )} />
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={cn(
              "w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center transition-all duration-300",
              isHovered && "bg-accent/20 scale-110"
            )}>
              <Icon className={cn(
                "w-6 h-6 text-accent transition-all duration-300",
                isHovered && "scale-110"
              )} />
            </div>
            <span className="text-xs font-medium text-content-tertiary px-2 py-1 bg-surface-700 rounded">
              {agent.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium text-content-primary mb-2">
            {agent.shortTitle}
          </h3>

          {/* Description */}
          <p className="text-sm text-content-secondary line-clamp-2 mb-4">
            {agent.overview.split('.')[0]}.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {agent.features.slice(0, 3).map((feature, i) => (
              <span 
                key={i} 
                className="text-xs px-2 py-1 rounded bg-surface-700 text-content-secondary"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={onTryAgent}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2",
                isHovered 
                  ? "bg-accent text-black" 
                  : "bg-accent/10 text-accent border border-accent/30"
              )}
            >
              <Play className="w-4 h-4" />
              Try Agent
            </button>
          </div>
        </div>

        {/* Bottom gradient on hover */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-accent/5 to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )} />
      </div>
    </motion.div>
  )
}

// Agent Demo Modal
function AgentDemoModal({ 
  agent, 
  isOpen, 
  onClose 
}: { 
  agent: typeof agents[0] | null
  isOpen: boolean
  onClose: () => void
}) {
  const [prompt, setPrompt] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [response, setResponse] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || !agent) return

    setIsLoading(true)
    setResponse('')

    // Simulate typing effect
    const fullResponse = agent.demoResponse
    let currentIndex = 0
    
    const typeInterval = setInterval(() => {
      if (currentIndex < fullResponse.length) {
        setResponse(fullResponse.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typeInterval)
        setIsLoading(false)
      }
    }, 10)
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example.replace(/"/g, ''))
  }

  if (!agent) return null

  const Icon = agent.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full max-w-4xl h-full max-h-[80vh] bg-surface-800 rounded-2xl border border-border overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-content-primary">{agent.shortTitle}</h2>
                    <p className="text-xs text-content-tertiary">{agent.category}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-content-secondary hover:text-content-primary hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                {/* Agent Info */}
                <div className="mb-6 p-4 bg-surface-900 rounded-xl border border-border">
                  <h3 className="text-sm font-medium text-content-primary mb-2">About this Agent</h3>
                  <p className="text-sm text-content-secondary">{agent.overview}</p>
                </div>

                {/* Example Prompts */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-content-tertiary mb-3">Try an example prompt:</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.examplePrompts.map((example, i) => (
                      <button
                        key={i}
                        onClick={() => handleExampleClick(example)}
                        className="text-sm px-3 py-1.5 rounded-lg bg-surface-700 text-accent hover:bg-surface-600 transition-colors font-mono"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Response Area */}
                {response && (
                  <motion.div 
                    className="mb-6 p-4 bg-surface-900 rounded-xl border border-accent/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-accent">Agent Response</span>
                    </div>
                    <pre className="text-sm text-content-secondary whitespace-pre-wrap font-mono">
                      {response}
                      {isLoading && <span className="animate-pulse">▌</span>}
                    </pre>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 md:p-6 border-t border-border bg-surface-900/50">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt..."
                    className="flex-1 px-4 py-3 bg-surface-800 border border-border rounded-xl text-content-primary placeholder:text-content-tertiary focus:outline-none focus:border-accent transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="px-6 py-3 bg-accent text-black rounded-xl font-medium hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send
                      </>
                    )}
                  </button>
                </form>
                <p className="text-xs text-content-tertiary mt-2 text-center">
                  This is a demo simulation. Contact us to access the full agent.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function AgentsPage() {
  const [activeCategory, setActiveCategory] = React.useState('All')
  const [selectedAgent, setSelectedAgent] = React.useState<typeof agents[0] | null>(null)

  const filteredAgents = activeCategory === 'All' 
    ? agents 
    : agents.filter(agent => agent.category === activeCategory)

  return (
    <div className="relative bg-surface-900 min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0" />
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-radial-accent opacity-10 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-radial-data opacity-10 pointer-events-none z-0" />

      {/* Sub Navigation */}
      <SubNavigation />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-28 pb-12 lg:pt-36 lg:pb-16">
          <div className="container-main">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-xs uppercase tracking-wider text-accent font-medium">AI Agent Suite</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-medium text-content-primary mb-4">
                Specialised AI Agents for<br />
                <span className="gradient-accent">Capital Markets</span>
              </h1>
              <p className="text-content-secondary text-base lg:text-lg max-w-2xl mx-auto">
                Enterprise-grade AI agents designed to transform complex financial workflows into simple natural language interactions. Built for security, scalability, and sovereign deployment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="pb-8">
          <div className="container-main">
            <motion.div 
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    activeCategory === category
                      ? "bg-accent text-black"
                      : "bg-surface-800 text-content-secondary hover:text-content-primary hover:bg-surface-700 border border-border"
                  )}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="pb-16 lg:pb-24">
          <div className="container-main">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {filteredAgents.map((agent, index) => (
                <AgentCard 
                  key={agent.id}
                  agent={agent}
                  onTryAgent={() => setSelectedAgent(agent)}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 border-t border-border">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-2xl lg:text-3xl font-medium text-content-primary mb-4">
                Ready to deploy these agents?
              </h2>
              <p className="text-content-secondary mb-8">
                Schedule a consultation to discuss how our AI agents can be customised for your specific workflows and integrated into your existing infrastructure.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Schedule Consultation
                </Button>
                <Button variant="secondary" size="lg">
                  View Platform
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Demo Modal */}
      <AgentDemoModal
        agent={selectedAgent}
        isOpen={!!selectedAgent}
        onClose={() => setSelectedAgent(null)}
      />
    </div>
  )
}
