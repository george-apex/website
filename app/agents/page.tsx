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

import { ApexActivation, ApexActivationButton } from '@/components/effects/ApexActivation'

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
      '"Analyse the impact of Middle East tensions on European sovereign bonds."',
      '"What is the current sentiment score for UK gilts?"',
      '"Show geopolitical events affecting emerging market debt."'
    ],
    userBenefit: 'Quickly connects bond market movements with underlying geopolitical drivers, enabling faster reaction and better-informed trading decisions.',
    features: ['Country Map & Bond View', 'GDELT News View', 'Uncertainty Indexes', 'Sentiment Scoring'],
    demoResponse: `**Geopolitical Analysis: Middle East Tensions Impact on European Sovereigns**

**Market Impact Assessment:**
- **Sentiment Score:** Risk-Off (-0.58)
- **Relevance:** High (0.91)
- **Affected Markets:** German Bunds, French OATs, Italian BTPs, UK Gilts

**Key Developments:**
1. **Energy Markets:** Brent crude +8% on supply disruption fears, European natural gas +15%
2. **Flight to Quality:** German 10Y yields down 12bps to 2.38%, Bund futures rallying
3. **Peripheral Spreads:** Italy-Germany spread widened 8bps to 145bps on risk aversion

**European Sovereign Impact:**
| Country | 10Y Yield | 1D Change | Spread to Bund |
|---------|-----------|-----------|----------------|
| Germany | 2.38% | -12bps | — |
| France | 2.89% | -8bps | 51bps |
| Italy | 3.83% | -4bps | 145bps |
| UK Gilts | 4.12% | -6bps | 174bps |

**Recommended Actions:**
- Consider long duration positioning in core European bonds
- Monitor peripheral spread widening for opportunities
- Watch energy price transmission to inflation expectations`
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
      '"Summarise the key covenants for this bond prospectus."',
      '"Does this issuer have a change-of-control clause?"',
      '"Extract all bonds maturing after 2030 from these documents."'
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
      '"Show credit spread changes for investment grade issuers."',
      '"Which issuers had negative rating actions this month?"',
      '"Compare CDS spreads across the banking sector."'
    ],
    userBenefit: 'Delivers instant, explainable credit insights that improve portfolio monitoring and support proactive risk management.',
    features: ['Live Market Pricing', 'Spread Analysis', 'Credit Indicators', 'News Integration'],
    demoResponse: `**Credit Spread Analysis: Investment Grade Issuers**

**5-Year CDS Spread Movement (30-Day Change):**

| Issuer | Sector | CDS Spread | 30D Δ | Signal |
|--------|--------|------------|-------|--------|
| Microsoft | Technology | 42bps | -3bps | ✓ Tightening |
| Apple | Technology | 38bps | -2bps | ✓ Stable |
| Johnson & Johnson | Healthcare | 35bps | — | ✓ Stable |
| Procter & Gamble | Consumer | 48bps | +4bps | ⚠️ Watch |
| Verizon | Telecom | 85bps | +12bps | ⚠️ Widening |
| Pfizer | Healthcare | 62bps | +6bps | ⚠️ Widening |
| Goldman Sachs | Financial | 95bps | +8bps | ⚠️ Watch |
| Boeing | Industrials | 145bps | +22bps | ⚠️ Widening |

**Sector Summary:**
- **Technology:** Spreads tightening (-2bps avg) on strong earnings
- **Healthcare:** Mixed, with Pfizer widening on guidance concerns
- **Financials:** Slight widening (+5bps avg) on rate uncertainty
- **Industrials:** Boeing pressure from 737 MAX delivery delays

**Investment Grade Index:**
- CDX IG Index: 72bps (+4bps MoM)
- High Yield correlation: 0.42 (elevated)

**Recommended Actions:**
- Monitor Verizon spread widening for entry opportunity
- Consider short duration in sectors showing stability
- Watch Boeing for potential downgrade risk`
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
      '"Show the top 10 ETFs by assets under management."',
      '"List all funds with a Sharpe ratio above 1.5."',
      '"What is my total exposure to the technology sector?"'
    ],
    userBenefit: 'Transforms private data analysis into a secure, low-code workflow—enhancing productivity without compromising compliance.',
    features: ['Natural Language to SQL', 'Data Governance', 'Audit Trails', 'Secure Environments'],
    demoResponse: `**Query Results: Top 10 ETFs by Assets Under Management**

| Rank | ETF Name | Ticker | AUM (£B) | Asset Class | Expense Ratio |
|------|----------|--------|----------|-------------|---------------|
| 1 | iShares Core S&P 500 UCITS | CSSPX | £48.2 | Equity | 0.07% |
| 2 | Vanguard S&P 500 UCITS | VUSA | £42.8 | Equity | 0.07% |
| 3 | iShares Core MSCI World | SWDA | £38.5 | Equity | 0.20% |
| 4 | Vanguard FTSE All-World | VWRL | £31.2 | Equity | 0.22% |
| 5 | iShares Core UK Gilts | IGLT | £18.4 | Fixed Income | 0.10% |
| 6 | Vanguard US Equity | VUAE | £16.9 | Equity | 0.10% |
| 7 | iShares MSCI Emerging Markets | IEEM | £14.3 | Equity | 0.18% |
| 8 | SPDR S&P 500 UCITS | SPY5 | £12.7 | Equity | 0.05% |
| 9 | iShares Global Corp Bond | LQDE | £11.2 | Fixed Income | 0.20% |
| 10 | Vanguard UK Investment Grade | VUKG | £9.8 | Fixed Income | 0.15% |

**Generated SQL:**
SELECT etf_name, ticker, aum_gbp,
       asset_class, expense_ratio
FROM etf_universe
WHERE aum_gbp IS NOT NULL
ORDER BY aum_gbp DESC
LIMIT 10;

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
      '"Show me the S&P 500 for the last 12 months."',
      '"Compare Apple and Microsoft, normalised to 100."',
      '"Add the 10-year Treasury yield to my chart."'
    ],
    userBenefit: 'Removes the need for manual charting tools, instantly turning data into clear, presentation-ready visuals.',
    features: ['Multi-Asset Support', 'Custom Chart Types', 'Data Export', 'Time-Series Analysis'],
    demoResponse: `**Chart Generated: S&P 500 Index - 12 Month Performance**

**Key Statistics:**
- **Starting Price:** 4,321 (Jan)
- **Current Price:** 5,214 (Dec)
- **YTD Return:** +20.7%
- **52-Week High:** 5,321 (Mar)
- **52-Week Low:** 4,118 (Jan)
- **Volatility:** 14.2% annualized

**Technical Indicators:**
- 50-Day SMA: 5,089 (above current)
- 200-Day SMA: 4,812 (above current)
- RSI: 58.3 (neutral)

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
      '"Show Tesla\'s revenue and net income for the last 4 quarters."',
      '"Compare P/E ratios across the Magnificent Seven."',
      '"What is Nvidia\'s gross margin trend?"'
    ],
    userBenefit: 'Delivers instant, accurate financial metrics and standardised data, reducing research time and improving consistency across teams.',
    features: ['Financial Statements', 'Valuation Metrics', 'Peer Comparison', 'Chart Generation'],
    demoResponse: `**Tesla, Inc. (TSLA) - Quarterly Financials**

**Income Statement (USD Billions):**

| Metric | Q4 2024 | Q3 2024 | Q4 2023 | YoY Δ |
|--------|---------|---------|---------|-------|
| Revenue | $25.2B | $23.4B | $24.3B | +3.7% |
| Gross Profit | $4.3B | $3.9B | $4.2B | +2.4% |
| Net Income | $2.1B | $1.9B | $2.5B | -16.0% |
| EPS | $0.66 | $0.58 | $0.71 | -7.0% |

**Key Metrics:**
- **Gross Margin:** 17.1%
- **Operating Margin:** 8.2%
- **P/E Ratio:** 45.2x
- **Market Cap:** $812B

**Quarterly Revenue Trend:**
- Q1 2024: $21.3B
- Q2 2024: $24.9B
- Q3 2024: $23.4B
- Q4 2024: $25.2B

**Segment Revenue:**
- Automotive: $20.8B (82%)
- Energy Generation: $3.1B (12%)
- Services: $1.3B (6%)

**Key Highlights:**
- Vehicle deliveries: 495K in Q4
- Energy storage deployments: 6.9 GWh (+52% YoY)
- Supercharger network: 58,000+ stalls globally`
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
      '"Summarise management commentary from Apple\'s latest earnings call."',
      '"What was the overall sentiment in Tesla\'s Q4 call?"',
      '"Extract all mentions of AI from recent tech earnings."'
    ],
    userBenefit: 'Reduces manual transcript review, identifies key insights instantly, and supports faster reporting and investment analysis.',
    features: ['Transcript Parsing', 'Sentiment Analysis', 'Quarterly Filtering', 'Management Commentary'],
    demoResponse: `**Apple Q1 2025 Earnings Call - Management Commentary Summary**

**Overall Sentiment:** Cautiously Optimistic (0.68)

**Executive Commentary Highlights:**

**Tim Cook (CEO):**
> "We're seeing strong momentum in Services, reaching an all-time revenue record of $24.2 billion. Apple Intelligence is now available on all our latest devices, and we're excited about the developer response."

*Key themes mentioned:* Innovation (12x), Opportunity (8x), Customers (15x), AI (9x)

**Luca Maestri (CFO):**
> "Gross margin came in at 44.6%, reflecting a favorable mix despite currency headwinds. We returned $32 billion to shareholders during the quarter through dividends and buybacks."

*Key themes mentioned:* Margin (6x), Capital return (4x), Efficiency (5x)

**Strategic Focus Areas:**
1. **AI/ML Investment:** R&D spend up 18% YoY, focused on on-device AI
2. **China Recovery:** "Stabilizing" - down only 2% vs 8% prior quarter
3. **Services Expansion:** 900M+ paid subscriptions, double-digit growth expected
4. **Capital Allocation:** $90B buyback authorization renewed

**Q&A Key Takeaways:**
- No pricing commentary despite inflation concerns
- Vision Pro adoption "exceeding expectations"
- India identified as major growth market
- AI monetization remains "long-term opportunity"

**Risk Flags Mentioned:**
- Foreign exchange headwinds persist
- Supply chain costs slightly elevated
- Regulatory scrutiny in EU and UK`
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
          "absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 pointer-events-none",
          isHovered && "opacity-100"
        )}
      />
      
      {/* Animated border */}
      <div className={cn(
        "absolute -inset-px rounded-2xl transition-all duration-300 pointer-events-none",
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
          "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent transition-opacity duration-300 pointer-events-none",
          isHovered ? "opacity-100" : "opacity-0"
        )} />

        {/* Icon glow */}
        <div className={cn(
          "absolute top-6 left-6 w-12 h-12 rounded-xl transition-all duration-300 pointer-events-none",
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
            <ApexActivationButton
              onClick={onTryAgent}
              isHovered={isHovered}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2",
                isHovered 
                  ? "bg-accent text-black" 
                  : "bg-accent/10 text-accent border border-accent/30"
              )}
            >
              <Play className="w-4 h-4" />
              Try Agent
            </ApexActivationButton>
          </div>
        </div>

        {/* Bottom gradient on hover */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-accent/5 to-transparent transition-opacity duration-300 pointer-events-none",
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

  // Reset state when agent changes
  React.useEffect(() => {
    setResponse('')
    setPrompt('')
    setIsLoading(false)
  }, [agent?.id])

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

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-8 pb-12 min-[393px]:pt-28 burger-range:pt-[120px] desktop:pt-48 lg:pb-16">
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
