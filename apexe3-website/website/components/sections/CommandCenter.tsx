'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  FileText, 
  BarChart3,
  Zap,
  Building2,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Layers,
  Brain,
  Download,
  Sparkles,
  ExternalLink,
  Play,
  Pause,
  RefreshCw,
  X,
  Copy,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// =============================================================================
// SPARKLINE COMPONENT - SVG-based mini chart
// =============================================================================

interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  gradient?: boolean
  showDots?: boolean
  animated?: boolean
}

function Sparkline({ 
  data, 
  width = 80, 
  height = 24, 
  color = '#306BFF',
  gradient = true,
  showDots = true,
  animated = true
}: SparklineProps) {
  if (!data || data.length < 2) return null
  
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return { x, y }
  })
  
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`
  
  const isPositive = data[data.length - 1] >= data[0]
  const strokeColor = isPositive ? color : '#EF4444'
  
  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`sparkline-gradient-${strokeColor.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity={gradient ? 0.3 : 0} />
          <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      
      {/* Area fill */}
      {gradient && (
        <motion.path
          d={areaD}
          fill={`url(#sparkline-gradient-${strokeColor.replace('#', '')})`}
          initial={animated ? { opacity: 0 } : {}}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      
      {/* Line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animated ? { pathLength: 0 } : {}}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      
      {/* Dots */}
      {showDots && (
        <>
          <motion.circle
            cx={points[0].x}
            cy={points[0].y}
            r={2}
            fill={strokeColor}
            initial={animated ? { opacity: 0, scale: 0 } : {}}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          />
          <motion.circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r={2.5}
            fill={strokeColor}
            initial={animated ? { opacity: 0, scale: 0 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          />
        </>
      )}
    </svg>
  )
}

// =============================================================================
// DOCUMENT GENERATION FUNCTIONS
// =============================================================================

function generateICMemo(data: TickerData, ticker: string): string {
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const bullScenario = data.scenarios.find(s => s.name === 'Bull Case')!
  const baseScenario = data.scenarios.find(s => s.name === 'Base Case')!
  const bearScenario = data.scenarios.find(s => s.name === 'Bear Case')!
  
  return `INVESTMENT COMMITTEE MEMO
${'═'.repeat(50)}

DATE: ${today}
TICKER: ${ticker}
COMPANY: ${data.name}
SECTOR: ${data.sector}

${'─'.repeat(50)}
EXECUTIVE SUMMARY
${'─'.repeat(50)}

${data.summary}

${'─'.repeat(50)}
INVESTMENT THESIS
${'─'.repeat(50)}

RECOMMENDATION: ${data.change >= 0 ? 'BUY' : 'HOLD'}
CURRENT PRICE: $${data.price.toLocaleString()}
TARGET PRICE: $${baseScenario.target} (Base Case)
UPSIDE/DOWNSIDE: ${((baseScenario.target - data.price) / data.price * 100).toFixed(1)}% to base case

${'─'.repeat(50)}
KEY INVESTMENT DRIVERS
${'─'.repeat(50)}

${data.kpis.map(kpi => `• ${kpi.label}: ${kpi.current} (${kpi.trend === 'up' ? '↑ improving' : kpi.trend === 'down' ? '↓ declining' : '→ flat'})`).join('\n')}

${'─'.repeat(50)}
RISK FACTORS
${'─'.repeat(50)}

${data.riskFlags.map(risk => `[${risk.severity.toUpperCase()}] ${risk.label}: ${risk.description}`).join('\n\n')}

${'─'.repeat(50)}
SCENARIO ANALYSIS
${'─'.repeat(50)}

BULL CASE (${bullScenario.probability}%): $${bullScenario.target}
  Drivers: ${bullScenario.drivers}

BASE CASE (${baseScenario.probability}%): $${baseScenario.target}
  Drivers: ${baseScenario.drivers}

BEAR CASE (${bearScenario.probability}%): $${bearScenario.target}
  Drivers: ${bearScenario.drivers}

${'─'.repeat(50)}
KEY CATALYSTS
${'─'.repeat(50)}

${data.catalysts.filter(c => c.status === 'upcoming').map(c => `• ${c.date} - ${c.event} [${c.type}, ${c.impact.toUpperCase()} IMPACT]`).join('\n')}

${'─'.repeat(50)}
VALUATION
${'─'.repeat(50)}

Market Cap: ${data.marketCap}
P/E Ratio: ${data.pe}

Peer Comparison:
${data.peers.map(p => `  ${p.ticker}: $${p.price} | P/E: ${p.pe} | Mkt Cap: ${p.marketCap}`).join('\n')}

${'─'.repeat(50)}
SOURCES
${'─'.repeat(50)}

${data.citations.map(c => `• ${c.source} (${c.date}): "${c.snippet}"`).join('\n')}

${'═'.repeat(50)}
Generated by ALICE Research Platform
This memo is for informational purposes only.
${'═'.repeat(50)}`
}

function generateDiligencePack(data: TickerData, ticker: string): string {
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  
  return `DUE DILIGENCE CHECKLIST
${'═'.repeat(50)}

TICKER: ${ticker} | ${data.name}
PREPARED: ${today}

${'─'.repeat(50)}
1. FINANCIAL ANALYSIS
${'─'.repeat(50)}

☐ Revenue Trends
  Current: Analyzing ${data.kpis.find(k => k.label.includes('Revenue') || k.label.includes('Growth'))?.label || 'N/A'}
  Status: ${data.kpis.find(k => k.label.includes('Revenue') || k.label.includes('Growth'))?.trend === 'up' ? '✓ Positive trajectory' : '⚠ Needs review'}

☐ Profitability Metrics
  Gross Margin: ${data.kpis.find(k => k.label.includes('Margin'))?.current || 'See KPI section'}
  Operating Efficiency: ${data.pe > 0 ? 'Positive earnings' : 'Negative/loss-making'}

☐ Balance Sheet Health
  Market Cap: ${data.marketCap}
  P/E Ratio: ${data.pe}
  Sector: ${data.sector}

${'─'.repeat(50)}
2. COMPETITIVE POSITION
${'─'.repeat(50)}

Direct Competitors:
${data.peers.map(p => `  ☐ ${p.name} (${p.ticker})
     Price: $${p.price} | Mkt Cap: ${p.marketCap} | P/E: ${p.pe}`).join('\n\n')}

${'─'.repeat(50)}
3. RISK ASSESSMENT
${'─'.repeat(50)}

${data.riskFlags.map((r, i) => `[${i + 1}] ${r.label.toUpperCase()}
    Severity: ${r.severity.toUpperCase()}
    Description: ${r.description}
    Impact: ${r.impact}
    Mitigation: ☐ To be determined`).join('\n\n')}

${'─'.repeat(50)}
4. CATALYST TRACKING
${'─'.repeat(50)}

${data.catalysts.map(c => `☐ ${c.date}: ${c.event}
    Type: ${c.type}
    Impact: ${c.impact.toUpperCase()}
    Status: ${c.status.toUpperCase()}`).join('\n\n')}

${'─'.repeat(50)}
5. SCENARIO MODELING
${'─'.repeat(50)}

${data.scenarios.map(s => `☐ ${s.name.toUpperCase()} (${s.probability}% probability)
    Price Target: $${s.target}
    Key Drivers: ${s.drivers}`).join('\n\n')}

${'─'.repeat(50)}
6. DATA SOURCES VERIFICATION
${'─'.repeat(50)}

${data.citations.map((c, i) => `☐ [${i + 1}] ${c.source}
    Date: ${c.date}
    Verified: ☐
    Key Data: "${c.snippet}"`).join('\n')}

${'─'.repeat(50)}
7. ACTION ITEMS
${'─'.repeat(50)}

☐ Management call scheduled
☐ Site visit arranged (if applicable)
☐ Customer reference checks
☐ Supplier due diligence
☐ Regulatory review
☐ Legal/compliance sign-off
☐ Model stress testing
☐ Investment thesis documentation

${'═'.repeat(50)}
ALICE Research Platform | Due Diligence Module v2.4
${'═'.repeat(50)}`
}

function generatePMBrief(data: TickerData, ticker: string): string {
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const bullScenario = data.scenarios.find(s => s.name === 'Bull Case')!
  const baseScenario = data.scenarios.find(s => s.name === 'Base Case')!
  const bearScenario = data.scenarios.find(s => s.name === 'Bear Case')!
  
  return `PORTFOLIO MANAGER BRIEF
${'═'.repeat(40)}

${ticker} | ${data.name}
${today}

┌${'─'.repeat(38)}┐
│ QUICK STATS                           │
├${'─'.repeat(38)}┤
│ Price:    $${data.price.toLocaleString().padEnd(20)}│
│ Change:   ${data.change >= 0 ? '+' : ''}${data.change}% (${data.changePercent >= 0 ? '+' : ''}${data.changePercent}%)${' '.repeat(Math.max(0, 20 - (`${data.change >= 0 ? '+' : ''}${data.change}% (${data.changePercent >= 0 ? '+' : ''}${data.changePercent}%)`).length))}│
│ Mkt Cap:  ${data.marketCap.padEnd(27)}│
│ P/E:      ${String(data.pe).padEnd(28)}│
│ Sector:   ${data.sector.padEnd(27)}│
└${'─'.repeat(38)}┘

╔════════════════════════════════════════╗
║ THESIS                                 ║
╚════════════════════════════════════════╝

${data.summary.slice(0, 300)}...

╔════════════════════════════════════════╗
║ SCENARIOS                              ║
╚════════════════════════════════════════╝

  BULL (${bullScenario.probability}%):  $${bullScenario.target}
  BASE (${baseScenario.probability}%):  $${baseScenario.target}
  BEAR (${bearScenario.probability}%):  $${bearScenario.target}

  Expected Value: $${(
    (bullScenario.probability / 100 * bullScenario.target) +
    (baseScenario.probability / 100 * baseScenario.target) +
    (bearScenario.probability / 100 * bearScenario.target)
  ).toFixed(0)}

╔════════════════════════════════════════╗
║ KEY METRICS                            ║
╚════════════════════════════════════════╝

${data.kpis.map(kpi => {
  const icon = kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'
  return `  ${icon} ${kpi.label.padEnd(18)} ${kpi.current.padEnd(10)}`
}).join('\n')}

╔════════════════════════════════════════╗
║ RISKS                                  ║
╚════════════════════════════════════════╝

${data.riskFlags.map(r => `  [${r.severity === 'high' ? '!' : r.severity === 'medium' ? '?' : 'i'}] ${r.label}`).join('\n')}

╔════════════════════════════════════════╗
║ CATALYSTS                              ║
╚════════════════════════════════════════╝

${data.catalysts.filter(c => c.status === 'upcoming').slice(0, 3).map(c => `  → ${c.date}: ${c.event}`).join('\n')}

╔════════════════════════════════════════╗
║ ACTION                                 ║
╚════════════════════════════════════════╝

  Recommendation: ${data.change >= 0 ? 'BUY on weakness' : 'WAIT for catalyst'}
  Position Size:  ${data.riskFlags.some(r => r.severity === 'high') ? '2-3% max' : '3-5% standard'}
  Stop Loss:      $${(data.price * 0.85).toFixed(2)}
  Target:         $${baseScenario.target}

${'═'.repeat(40)}
ALICE | PM Brief v2.4
${'═'.repeat(40)}`
}

// =============================================================================
// MOCK DATA - Simulating real institutional research data
// =============================================================================

interface TickerData {
  name: string
  price: number
  change: number
  changePercent: number
  marketCap: string
  pe: number
  sector: string
  summary: string
  citations: Array<{ source: string; date: string; snippet: string }>
  riskFlags: Array<{ severity: string; label: string; description: string; impact: string }>
  kpis: Array<{ label: string; current: string; previous: string; trend: string; sparkline: number[] }>
  peers: Array<{ ticker: string; name: string; price: number; change: number; marketCap: string; pe: number }>
  catalysts: Array<{ date: string; event: string; type: string; impact: string; status: string }>
  scenarios: Array<{ name: string; probability: number; target: number; drivers: string }>
  priceHistory: number[]
}

const TICKER_DATA: Record<string, TickerData> = {
  NVDA: {
    name: 'NVIDIA Corporation',
    price: 892.45,
    change: 2.34,
    changePercent: 0.26,
    marketCap: '2.19T',
    pe: 64.2,
    sector: 'Semiconductors',
    summary: `NVIDIA maintains dominant positioning in AI accelerator market with 90%+ share in data center GPUs. Blackwell architecture ramp remains on track with major hyperscaler commitments. Near-term risks include export controls to China and potential demand normalization post-capex surge. Our conviction remains HIGH based on: (1) durable AI infrastructure spend, (2) software moat via CUDA ecosystem, (3) expanding TAM to $300B+ by 2027.`,
    citations: [
      { source: 'Q4 FY24 Earnings Call', date: 'Feb 2024', snippet: 'Data center revenue up 409% YoY' },
      { source: 'Morgan Stanley Research', date: 'Mar 2024', snippet: 'Supply constraints easing, demand remains robust' },
      { source: 'Goldman Sachs TMT Note', date: 'Mar 2024', snippet: 'H100 pricing stable despite competition concerns' },
    ],
    riskFlags: [
      { severity: 'high', label: 'China Export Controls', description: 'New restrictions on A800/H800 could impact $5B+ revenue', impact: 'Revenue at Risk' },
      { severity: 'medium', label: 'Competitive Threat', description: 'AMD MI300X gaining traction in some hyperscalers', impact: 'Market Share Risk' },
      { severity: 'low', label: 'Valuation Premium', description: 'Trading at 64x P/E vs historical avg 35x', impact: 'Downside Risk' },
    ],
    kpis: [
      { label: 'Revenue Growth', current: '265%', previous: '206%', trend: 'up', sparkline: [206, 218, 235, 242, 255, 265] },
      { label: 'Gross Margin', current: '76.7%', previous: '75.3%', trend: 'up', sparkline: [75.3, 75.5, 75.8, 76.1, 76.4, 76.7] },
      { label: 'FCF Margin', current: '49.2%', previous: '42.1%', trend: 'up', sparkline: [42.1, 44.3, 45.8, 47.2, 48.1, 49.2] },
      { label: 'R&D as % Rev', current: '13.2%', previous: '18.5%', trend: 'down', sparkline: [18.5, 17.2, 16.1, 15.0, 14.1, 13.2] },
    ],
    peers: [
      { ticker: 'AMD', name: 'AMD', price: 178.23, change: -1.2, marketCap: '287B', pe: 312 },
      { ticker: 'AVGO', name: 'Broadcom', price: 1342.56, change: 0.8, marketCap: '623B', pe: 28.4 },
      { ticker: 'INTC', name: 'Intel', price: 31.45, change: -2.1, marketCap: '134B', pe: -8.2 },
      { ticker: 'QCOM', name: 'Qualcomm', price: 168.92, change: 0.4, marketCap: '188B', pe: 21.3 },
    ],
    catalysts: [
      { date: 'Mar 18', event: 'GTC Conference', type: 'Product', impact: 'high', status: 'upcoming' },
      { date: 'May 22', event: 'Q1 FY25 Earnings', type: 'Earnings', impact: 'high', status: 'upcoming' },
      { date: 'Q2 2024', event: 'Blackwell Volume Shipments', type: 'Product', impact: 'high', status: 'upcoming' },
      { date: 'Feb 28', event: 'HSBC Downgrade', type: 'Rating', impact: 'low', status: 'past' },
    ],
    scenarios: [
      { name: 'Bull Case', probability: 35, target: 1200, drivers: 'Blackwell exceeds expectations, China resolution' },
      { name: 'Base Case', probability: 50, target: 950, drivers: 'Sustained AI demand, stable margins' },
      { name: 'Bear Case', probability: 15, target: 650, drivers: 'Export ban impact, demand collapse' },
    ],
    priceHistory: [780, 795, 812, 825, 843, 856, 862, 871, 878, 885, 892],
  },
  AAPL: {
    name: 'Apple Inc.',
    price: 178.72,
    change: -0.84,
    changePercent: -0.47,
    marketCap: '2.78T',
    pe: 28.9,
    sector: 'Consumer Technology',
    summary: `Apple's AI strategy materializes with iOS 18 and on-device AI features. China weakness remains overhang with 12% YoY decline. Services growth decelerating to 11%. Vision Pro launch underwhelming with <500K units sold. iPhone 16 cycle critical for reigniting growth. Capital return program $90B annually provides support.`,
    citations: [
      { source: 'Q1 FY24 Earnings', date: 'Feb 2024', snippet: 'China revenue down 12% YoY' },
      { source: 'Counterpoint Research', date: 'Mar 2024', snippet: 'iPhone market share stable at 23%' },
    ],
    riskFlags: [
      { severity: 'high', label: 'China Exposure', description: '30% of revenue from Greater China', impact: 'Revenue Risk' },
      { severity: 'medium', label: 'AI Positioning', description: 'Behind peers in generative AI capabilities', impact: 'Competitive Risk' },
    ],
    kpis: [
      { label: 'Revenue Growth', current: '2.1%', previous: '8.2%', trend: 'down', sparkline: [8.2, 6.5, 5.1, 4.2, 3.1, 2.1] },
      { label: 'Gross Margin', current: '45.9%', previous: '43.3%', trend: 'up', sparkline: [43.3, 43.8, 44.4, 45.0, 45.5, 45.9] },
      { label: 'Services Growth', current: '11.2%', previous: '14.2%', trend: 'down', sparkline: [14.2, 13.5, 12.8, 12.2, 11.8, 11.2] },
      { label: 'iPhone Share', current: '23%', previous: '24%', trend: 'down', sparkline: [24, 24.2, 23.8, 23.5, 23.2, 23] },
    ],
    peers: [
      { ticker: 'MSFT', name: 'Microsoft', price: 415.23, change: 1.2, marketCap: '3.08T', pe: 36.2 },
      { ticker: 'GOOGL', name: 'Alphabet', price: 156.34, change: 0.5, marketCap: '1.94T', pe: 24.1 },
    ],
    catalysts: [
      { date: 'Jun 10', event: 'WWDC 2024', type: 'Product', impact: 'high', status: 'upcoming' },
      { date: 'Sep 2024', event: 'iPhone 16 Launch', type: 'Product', impact: 'high', status: 'upcoming' },
    ],
    scenarios: [
      { name: 'Bull Case', probability: 30, target: 220, drivers: 'AI features drive upgrade cycle' },
      { name: 'Base Case', probability: 55, target: 185, drivers: 'Steady services growth, China stabilization' },
      { name: 'Bear Case', probability: 15, target: 140, drivers: 'China deterioration, weak iPhone cycle' },
    ],
    priceHistory: [182, 181, 179, 180, 178, 176, 175, 177, 179, 178, 179],
  },
  MSFT: {
    name: 'Microsoft Corporation',
    price: 415.23,
    change: 4.92,
    changePercent: 1.20,
    marketCap: '3.08T',
    pe: 36.2,
    sector: 'Enterprise Software',
    summary: `Microsoft's AI monetization accelerating with Copilot adoption across 365 suite. Azure AI services driving 29% cloud growth. OpenAI partnership providing competitive moat in enterprise AI. Gaming segment stabilizing post-Activision integration. LinkedIn revenue growth steady at 8%. Windows OEM recovery underway with PC refresh cycle.`,
    citations: [
      { source: 'Q2 FY24 Earnings', date: 'Jan 2024', snippet: 'Azure AI revenue up 76% YoY' },
      { source: 'Wedbush Research', date: 'Feb 2024', snippet: 'Copilot monetization ahead of expectations' },
      { source: 'BofA Securities', date: 'Mar 2024', snippet: 'Enterprise AI adoption accelerating' },
    ],
    riskFlags: [
      { severity: 'medium', label: 'Valuation', description: 'Trading at 36x P/E vs sector average 25x', impact: 'Valuation Risk' },
      { severity: 'low', label: 'OpenAI Dependency', description: 'Heavy reliance on OpenAI partnership', impact: 'Partnership Risk' },
    ],
    kpis: [
      { label: 'Cloud Growth', current: '29%', previous: '26%', trend: 'up', sparkline: [26, 26.5, 27, 27.8, 28.4, 29] },
      { label: 'Copilot Adoption', current: '37%', previous: '18%', trend: 'up', sparkline: [18, 22, 26, 30, 34, 37] },
      { label: 'Gaming Revenue', current: '49%', previous: '36%', trend: 'up', sparkline: [36, 39, 42, 45, 47, 49] },
      { label: 'Operating Margin', current: '44.5%', previous: '42.1%', trend: 'up', sparkline: [42.1, 42.8, 43.4, 43.9, 44.2, 44.5] },
    ],
    peers: [
      { ticker: 'GOOGL', name: 'Alphabet', price: 156.34, change: 0.5, marketCap: '1.94T', pe: 24.1 },
      { ticker: 'AMZN', name: 'Amazon', price: 178.45, change: 0.8, marketCap: '1.86T', pe: 62.3 },
      { ticker: 'ORCL', name: 'Oracle', price: 125.67, change: 1.5, marketCap: '345B', pe: 32.1 },
    ],
    catalysts: [
      { date: 'Mar 31', event: 'Microsoft Inspire', type: 'Product', impact: 'medium', status: 'upcoming' },
      { date: 'Apr 25', event: 'Q3 FY24 Earnings', type: 'Earnings', impact: 'high', status: 'upcoming' },
      { date: 'May 21', event: 'Build Conference', type: 'Product', impact: 'high', status: 'upcoming' },
    ],
    scenarios: [
      { name: 'Bull Case', probability: 40, target: 500, drivers: 'Copilot accelerates revenue, Azure maintains lead' },
      { name: 'Base Case', probability: 45, target: 440, drivers: 'Steady AI growth, cloud competition intensifies' },
      { name: 'Bear Case', probability: 15, target: 350, drivers: 'AI monetization stalls, cloud share loss' },
    ],
    priceHistory: [380, 388, 392, 398, 402, 405, 408, 410, 412, 413, 415],
  },
  GOOGL: {
    name: 'Alphabet Inc.',
    price: 156.34,
    change: 0.78,
    changePercent: 0.50,
    marketCap: '1.94T',
    pe: 24.1,
    sector: 'Internet & Search',
    summary: `Google's Gemini model family positions it competitively in AI race, though early stumbles on bias concerns. Search revenue stable despite AI competition concerns. YouTube Shorts monetization improving with 40%+ revenue growth. Cloud platform gaining share with 26% growth. Antitrust overhang from DOJ case remains key risk.`,
    citations: [
      { source: 'Q4 FY23 Earnings', date: 'Feb 2024', snippet: 'YouTube ads revenue $9.2B' },
      { source: 'Piper Sandler', date: 'Mar 2024', snippet: 'Gemini Enterprise adoption accelerating' },
    ],
    riskFlags: [
      { severity: 'high', label: 'DOJ Antitrust', description: 'Monopoly ruling could force business model changes', impact: 'Structural Risk' },
      { severity: 'medium', label: 'AI Competition', description: 'Perplexity, ChatGPT threatening search dominance', impact: 'Market Share Risk' },
      { severity: 'low', label: 'Cloud Margin', description: 'GCP operating at lower margins than peers', impact: 'Profitability Risk' },
    ],
    kpis: [
      { label: 'Search Revenue', current: '12.4%', previous: '11.8%', trend: 'up', sparkline: [11.8, 11.9, 12.1, 12.2, 12.3, 12.4] },
      { label: 'YouTube Growth', current: '40%', previous: '32%', trend: 'up', sparkline: [32, 34, 36, 38, 39, 40] },
      { label: 'Cloud Growth', current: '26%', previous: '28%', trend: 'down', sparkline: [28, 27.5, 27, 26.8, 26.4, 26] },
      { label: 'Op. Margin', current: '27.2%', previous: '25.4%', trend: 'up', sparkline: [25.4, 25.8, 26.2, 26.7, 27.0, 27.2] },
    ],
    peers: [
      { ticker: 'META', name: 'Meta', price: 502.45, change: 1.8, marketCap: '1.28T', pe: 28.4 },
      { ticker: 'AMZN', name: 'Amazon', price: 178.45, change: 0.8, marketCap: '1.86T', pe: 62.3 },
      { ticker: 'MSFT', name: 'Microsoft', price: 415.23, change: 1.2, marketCap: '3.08T', pe: 36.2 },
    ],
    catalysts: [
      { date: 'Apr 25', event: 'Q1 FY24 Earnings', type: 'Earnings', impact: 'high', status: 'upcoming' },
      { date: 'May 14', event: 'Google I/O', type: 'Product', impact: 'high', status: 'upcoming' },
      { date: 'Q3 2024', event: 'DOJ Ruling Expected', type: 'Regulatory', impact: 'high', status: 'upcoming' },
    ],
    scenarios: [
      { name: 'Bull Case', probability: 35, target: 190, drivers: 'AI enhances search, antitrust settled favorably' },
      { name: 'Base Case', probability: 45, target: 165, drivers: 'Steady growth, regulatory overhang persists' },
      { name: 'Bear Case', probability: 20, target: 120, drivers: 'Antitrust breakup, search share loss' },
    ],
    priceHistory: [142, 145, 148, 150, 152, 153, 154, 155, 155, 156, 156],
  },
  AMZN: {
    name: 'Amazon.com Inc.',
    price: 178.45,
    change: 1.42,
    changePercent: 0.80,
    marketCap: '1.86T',
    pe: 62.3,
    sector: 'E-Commerce & Cloud',
    summary: `Amazon's AWS stabilization underway with AI workloads driving reacceleration. Retail margins improving with regionalization strategy. Advertising business growing 27% and approaching $50B run rate. Prime membership growth steady. Rufus AI assistant enhancing shopping experience. FTC antitrust case ongoing but unlikely to materially impact near-term.`,
    citations: [
      { source: 'Q4 FY23 Earnings', date: 'Feb 2024', snippet: 'AWS revenue $24.2B, +13% YoY' },
      { source: 'JPMorgan', date: 'Mar 2024', snippet: 'Retail margin expansion sustainable' },
      { source: 'Bernstein Research', date: 'Mar 2024', snippet: 'Advertising becoming profit driver' },
    ],
    riskFlags: [
      { severity: 'medium', label: 'FTC Antitrust', description: 'Ongoing lawsuit could force business changes', impact: 'Regulatory Risk' },
      { severity: 'medium', label: 'AWS Competition', description: 'Azure and GCP gaining share in AI workloads', impact: 'Competitive Risk' },
      { severity: 'low', label: 'Valuation', description: 'P/E elevated at 62x vs historical 45x', impact: 'Valuation Risk' },
    ],
    kpis: [
      { label: 'AWS Growth', current: '13%', previous: '12%', trend: 'up', sparkline: [12, 12.2, 12.4, 12.6, 12.8, 13] },
      { label: 'Ad Revenue Growth', current: '27%', previous: '24%', trend: 'up', sparkline: [24, 24.8, 25.5, 26.2, 26.8, 27] },
      { label: 'Retail Margin', current: '4.2%', previous: '2.8%', trend: 'up', sparkline: [2.8, 3.1, 3.4, 3.7, 4.0, 4.2] },
      { label: 'Prime Members', current: '180M', previous: '168M', trend: 'up', sparkline: [168, 170, 172, 175, 177, 180] },
    ],
    peers: [
      { ticker: 'MSFT', name: 'Microsoft', price: 415.23, change: 1.2, marketCap: '3.08T', pe: 36.2 },
      { ticker: 'GOOGL', name: 'Alphabet', price: 156.34, change: 0.5, marketCap: '1.94T', pe: 24.1 },
      { ticker: 'WMT', name: 'Walmart', price: 168.23, change: 0.3, marketCap: '452B', pe: 28.2 },
    ],
    catalysts: [
      { date: 'Apr 25', event: 'Q1 FY24 Earnings', type: 'Earnings', impact: 'high', status: 'upcoming' },
      { date: 'Jun 25', event: 'Prime Day', type: 'Event', impact: 'medium', status: 'upcoming' },
      { date: 'Q4 2024', event: 'Rufus AI Expansion', type: 'Product', impact: 'medium', status: 'upcoming' },
    ],
    scenarios: [
      { name: 'Bull Case', probability: 35, target: 220, drivers: 'AWS reaccelerates, retail margins expand' },
      { name: 'Base Case', probability: 50, target: 190, drivers: 'Steady growth, AI investments weigh on margins' },
      { name: 'Bear Case', probability: 15, target: 140, drivers: 'AWS share loss, FTC ruling impacts' },
    ],
    priceHistory: [155, 158, 162, 165, 168, 170, 172, 174, 176, 177, 178],
  },
  META: {
    name: 'Meta Platforms Inc.',
    price: 502.45,
    change: 8.94,
    changePercent: 1.81,
    marketCap: '1.28T',
    pe: 28.4,
    sector: 'Social Media & VR',
    summary: `Meta's "Year of Efficiency" delivering remarkable margin expansion. Reels monetization catching up to TikTok. Reality Labs losses stabilizing at $4B/quarter. Llama open-source models establishing AI credibility. WhatsApp Business monetization accelerating. Family of Apps revenue growing 24% with strong ad pricing power.`,
    citations: [
      { source: 'Q4 FY23 Earnings', date: 'Feb 2024', snippet: 'Operating margin 41%, up from 20% YoY' },
      { source: 'MoffettNathanson', date: 'Mar 2024', snippet: 'Reels monetization reaching parity with TikTok' },
      { source: 'Deutsche Bank', date: 'Mar 2024', snippet: 'AI investments positioning Meta as infrastructure player' },
    ],
    riskFlags: [
      { severity: 'medium', label: 'Reality Labs', description: 'Cumulative losses exceeding $50B', impact: 'Cash Burn' },
      { severity: 'low', label: 'Regulatory', description: 'EU and US privacy regulations', impact: 'Regulatory Risk' },
    ],
    kpis: [
      { label: 'Ad Revenue Growth', current: '24%', previous: '21%', trend: 'up', sparkline: [21, 21.8, 22.4, 23.0, 23.5, 24] },
      { label: 'Operating Margin', current: '41%', previous: '20%', trend: 'up', sparkline: [20, 26, 32, 36, 39, 41] },
      { label: 'Reels Monetization', current: '85%', previous: '67%', trend: 'up', sparkline: [67, 72, 76, 80, 83, 85] },
      { label: 'Reality Labs Loss', current: '$4.0B', previous: '$4.6B', trend: 'up', sparkline: [4.6, 4.5, 4.4, 4.3, 4.1, 4.0] },
    ],
    peers: [
      { ticker: 'GOOGL', name: 'Alphabet', price: 156.34, change: 0.5, marketCap: '1.94T', pe: 24.1 },
      { ticker: 'SNAP', name: 'Snap', price: 12.45, change: 2.1, marketCap: '21B', pe: -15.2 },
      { ticker: 'PINS', name: 'Pinterest', price: 35.67, change: 1.2, marketCap: '24B', pe: 125.4 },
    ],
    catalysts: [
      { date: 'Apr 24', event: 'Q1 FY24 Earnings', type: 'Earnings', impact: 'high', status: 'upcoming' },
      { date: 'Sep 2024', event: 'Connect Conference', type: 'Product', impact: 'high', status: 'upcoming' },
      { date: 'Q2 2024', event: 'Llama 3 Release', type: 'Product', impact: 'medium', status: 'upcoming' },
    ],
    scenarios: [
      { name: 'Bull Case', probability: 40, target: 600, drivers: 'AI leadership, Reality Labs turns corner' },
      { name: 'Base Case', probability: 45, target: 520, drivers: 'Core business strength, RL losses contained' },
      { name: 'Bear Case', probability: 15, target: 380, drivers: 'Ad slowdown, Reality Labs losses accelerate' },
    ],
    priceHistory: [340, 380, 410, 440, 460, 475, 485, 490, 495, 498, 502],
  },
  TSLA: {
    name: 'Tesla Inc.',
    price: 245.67,
    change: -8.92,
    changePercent: -3.51,
    marketCap: '780B',
    pe: 45.2,
    sector: 'Electric Vehicles',
    summary: `Tesla facing demand pressure with price cuts impacting margins. Model Y refresh and Cybertruck ramp key for growth. FSD v12 showing promise but regulatory approval uncertain. Energy storage business growing 80%+ but still small. Robotaxi narrative driving retail sentiment. China EV competition intensifying with BYD and Xiaomi.`,
    citations: [
      { source: 'Q4 FY23 Earnings', date: 'Jan 2024', snippet: 'Auto gross margin 17.6%, down from 25.9%' },
      { source: 'CNBC', date: 'Feb 2024', snippet: 'Cybertruck production reaching 1,000/week' },
      { source: 'Bernstein', date: 'Mar 2024', snippet: 'Price war unsustainable without volume recovery' },
    ],
    riskFlags: [
      { severity: 'high', label: 'Margin Pressure', description: 'Auto gross margin declining from 26% to 17.6%', impact: 'Profitability Risk' },
      { severity: 'high', label: 'China Competition', description: 'BYD, Xiaomi gaining share in key market', impact: 'Market Share Risk' },
      { severity: 'medium', label: 'Key Man Risk', description: 'Elon Musk distraction with other ventures', impact: 'Execution Risk' },
    ],
    kpis: [
      { label: 'Auto Gross Margin', current: '17.6%', previous: '25.9%', trend: 'down', sparkline: [25.9, 24.2, 22.5, 20.8, 19.2, 17.6] },
      { label: 'Deliveries', current: '485K', previous: '452K', trend: 'up', sparkline: [452, 461, 468, 475, 480, 485] },
      { label: 'Energy Storage', current: '84%', previous: '62%', trend: 'up', sparkline: [62, 68, 72, 76, 80, 84] },
      { label: 'FSD Miles', current: '1.2B', previous: '0.8B', trend: 'up', sparkline: [0.8, 0.9, 1.0, 1.05, 1.12, 1.2] },
    ],
    peers: [
      { ticker: 'F', name: 'Ford', price: 12.34, change: -0.5, marketCap: '49B', pe: 8.2 },
      { ticker: 'RIVN', name: 'Rivian', price: 11.23, change: 2.1, marketCap: '11B', pe: -4.5 },
      { ticker: 'NIO', name: 'NIO', price: 5.67, change: -1.8, marketCap: '10B', pe: -3.2 },
      { ticker: 'BYDDY', name: 'BYD', price: 28.45, change: 0.8, marketCap: '88B', pe: 18.5 },
    ],
    catalysts: [
      { date: 'Apr 15', event: 'Q1 Deliveries', type: 'Earnings', impact: 'high', status: 'upcoming' },
      { date: 'Apr 23', event: 'Q1 Earnings', type: 'Earnings', impact: 'high', status: 'upcoming' },
      { date: 'Aug 8', event: 'Robotaxi Reveal', type: 'Product', impact: 'high', status: 'upcoming' },
    ],
    scenarios: [
      { name: 'Bull Case', probability: 25, target: 350, drivers: 'FSD approval, Robotaxi success, margin recovery' },
      { name: 'Base Case', probability: 50, target: 240, drivers: 'Moderate growth, margins stabilize at 18%' },
      { name: 'Bear Case', probability: 25, target: 150, drivers: 'Margin compression, competition intensifies' },
    ],
    priceHistory: [280, 275, 268, 262, 255, 250, 252, 248, 246, 244, 246],
  },
}

const RECENT_SEARCHES = ['NVDA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META']
const POPULAR_TICKERS = ['NVDA', 'MSFT', 'META', 'AAPL', 'AMZN', 'GOOGL', 'TSLA']

// =============================================================================
// COMPONENT
// =============================================================================

export function CommandCenter() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedTicker, setSelectedTicker] = React.useState('NVDA')
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const [activeDocument, setActiveDocument] = React.useState<string | null>(null)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [generatedContent, setGeneratedContent] = React.useState('')
  const [copied, setCopied] = React.useState(false)
  
  const data = TICKER_DATA[selectedTicker]

  // Filter suggestions based on search
  const suggestions = searchQuery 
    ? Object.keys(TICKER_DATA).filter(t => 
        t.toLowerCase().includes(searchQuery.toLowerCase()) ||
        TICKER_DATA[t]?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : POPULAR_TICKERS

  // Handle ticker selection
  const handleSelectTicker = (ticker: string) => {
    setSelectedTicker(ticker)
    setSearchQuery('')
    setShowSuggestions(false)
  }

  // Handle document generation
  const handleGenerateDocument = (docType: string) => {
    setIsGenerating(true)
    setActiveDocument(docType)
    
    // Simulate generation delay
    setTimeout(() => {
      let content = ''
      switch (docType) {
        case 'ic-memo':
          content = generateICMemo(data, selectedTicker)
          break
        case 'diligence':
          content = generateDiligencePack(data, selectedTicker)
          break
        case 'pm-brief':
          content = generatePMBrief(data, selectedTicker)
          break
      }
      setGeneratedContent(content)
      setIsGenerating(false)
      setShowModal(true)
    }, 1500)
  }

  // Copy to clipboard
  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="command-center" className="relative min-h-screen bg-surface-900 py-20">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(48,107,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(48,107,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-radial-accent opacity-30" />

      <div className="container-main relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 mb-6">
            <Zap className="w-4 h-4" />
            Live Demo
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-content-primary">Intelligence </span>
            <span className="gradient-accent">Command Center</span>
          </h2>
          <p className="text-lg text-content-secondary max-w-2xl mx-auto">
            One glance. Complete conviction. See how ALICE transforms raw data into 
            decision-ready intelligence for institutional investors.
          </p>
        </motion.div>

        {/* Terminal Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          {/* Terminal Frame */}
          <div className="relative bg-surface-800 rounded-xl border border-border overflow-hidden shadow-elevated">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-surface-700 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-negative/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-positive/60" />
                </div>
                <span className="text-sm font-mono text-content-tertiary">
                  ALICE Research Terminal v2.4.1
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-content-tertiary">
                <Clock className="w-3 h-3" />
                <span className="font-mono">Last sync: 2 min ago</span>
                <RefreshCw className="w-3 h-3 ml-2 cursor-pointer hover:text-accent transition-colors" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="p-4 bg-surface-800 border-b border-border">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-content-tertiary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => {
                    setIsSearchFocused(true)
                    setShowSuggestions(true)
                  }}
                  onBlur={() => {
                    setIsSearchFocused(false)
                    setTimeout(() => setShowSuggestions(false), 200)
                  }}
                  placeholder="Search ticker or company (e.g., NVDA, Microsoft)"
                  className="w-full pl-12 pr-4 py-3 bg-surface-900 border border-border rounded-lg text-content-primary placeholder:text-content-tertiary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all font-mono"
                />
                
                {/* Search Suggestions */}
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-surface-900 border border-border rounded-lg overflow-hidden shadow-elevated z-50 max-h-80 overflow-y-auto"
                    >
                      {suggestions.map((ticker) => {
                        const tickerData = TICKER_DATA[ticker]
                        return (
                          <button
                            key={ticker}
                            onClick={() => handleSelectTicker(ticker)}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-700 transition-colors text-left"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-accent w-12">{ticker}</span>
                              <span className="text-sm text-content-secondary">{tickerData?.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              {tickerData && (
                                <Sparkline 
                                  data={tickerData.priceHistory.slice(-6)} 
                                  width={60} 
                                  height={20}
                                  showDots={false}
                                  animated={false}
                                />
                              )}
                              {tickerData && (
                                <span className={cn(
                                  'text-sm font-mono w-16 text-right',
                                  tickerData.change >= 0 ? 'text-positive' : 'text-negative'
                                )}>
                                  {tickerData.change >= 0 ? '+' : ''}{tickerData.changePercent.toFixed(2)}%
                                </span>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Main Terminal Grid */}
            <div className="grid lg:grid-cols-12 gap-0 divide-x divide-border">
              
              {/* Left Sidebar - Quick Stats */}
              <div className="lg:col-span-3 p-4 space-y-4">
                {/* Ticker Header */}
                <div className="p-4 bg-surface-900 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold font-mono text-accent">{selectedTicker}</span>
                    <span className={cn(
                      'px-2 py-0.5 rounded text-xs font-medium',
                      data.change >= 0 ? 'bg-positive/10 text-positive' : 'bg-negative/10 text-negative'
                    )}>
                      {data.change >= 0 ? 'LONG' : 'WATCH'}
                    </span>
                  </div>
                  <div className="text-3xl font-bold font-mono text-content-primary">
                    ${data.price.toLocaleString()}
                  </div>
                  <div className={cn(
                    'flex items-center gap-1 text-sm font-mono',
                    data.change >= 0 ? 'text-positive' : 'text-negative'
                  )}>
                    {data.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {data.change >= 0 ? '+' : ''}{data.change} ({data.changePercent >= 0 ? '+' : ''}{data.changePercent}%)
                  </div>
                  
                  {/* Price Sparkline */}
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-content-tertiary">30D Trend</span>
                      <span className="text-xs text-content-tertiary">{data.priceHistory.length} sessions</span>
                    </div>
                    <Sparkline 
                      data={data.priceHistory} 
                      width={180} 
                      height={40}
                      showDots={true}
                      animated={true}
                    />
                  </div>
                </div>

                {/* Quick Metrics */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 bg-surface-900 rounded-lg border border-border">
                    <div className="text-xs text-content-tertiary mb-1">Market Cap</div>
                    <div className="font-mono font-medium text-content-primary">{data.marketCap}</div>
                  </div>
                  <div className="p-3 bg-surface-900 rounded-lg border border-border">
                    <div className="text-xs text-content-tertiary mb-1">P/E Ratio</div>
                    <div className="font-mono font-medium text-content-primary">{data.pe}</div>
                  </div>
                  <div className="p-3 bg-surface-900 rounded-lg border border-border col-span-2">
                    <div className="text-xs text-content-tertiary mb-1">Sector</div>
                    <div className="text-sm text-content-secondary">{data.sector}</div>
                  </div>
                </div>

                {/* Scenario Outputs */}
                <div className="p-4 bg-surface-900 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-content-primary">Scenario Analysis</span>
                  </div>
                  <div className="space-y-3">
                    {data.scenarios.map((scenario, i) => (
                      <div key={scenario.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className={cn(
                            'font-medium',
                            scenario.name === 'Bull Case' ? 'text-positive' :
                            scenario.name === 'Bear Case' ? 'text-negative' : 'text-content-secondary'
                          )}>
                            {scenario.name}
                          </span>
                          <span className="text-content-tertiary">${scenario.target}</span>
                        </div>
                        <div className="h-1.5 bg-surface-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${scenario.probability}%` }}
                            transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
                            className={cn(
                              'h-full rounded-full',
                              scenario.name === 'Bull Case' ? 'bg-positive' :
                              scenario.name === 'Bear Case' ? 'bg-negative' : 'bg-accent'
                            )}
                          />
                        </div>
                        <div className="text-xs text-content-tertiary">{scenario.probability}% probability</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-6 p-4 space-y-4">
                {/* AI Summary with Citations */}
                <div className="p-4 bg-surface-900 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-content-primary">AI Investment Summary</span>
                    </div>
                    <span className="text-xs text-content-tertiary">{data.citations.length} sources cited</span>
                  </div>
                  
                  <p className="text-sm text-content-secondary leading-relaxed mb-4">
                    {data.summary}
                  </p>

                  {/* Citations */}
                  <div className="space-y-2 pt-3 border-t border-border">
                    <div className="text-xs text-content-tertiary uppercase tracking-wider mb-2">Sources</div>
                    {data.citations.map((citation, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2 text-xs group cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3 text-content-tertiary mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div>
                          <span className="text-accent font-medium">{citation.source}</span>
                          <span className="text-content-tertiary"> · {citation.date}</span>
                          <span className="text-content-tertiary hidden md:inline"> — "{citation.snippet}"</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* KPI Trends with Sparklines */}
                <div className="p-4 bg-surface-900 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-content-primary">KPI Trend Shifts</span>
                    </div>
                    <span className="text-xs text-content-tertiary">QoQ Change</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {data.kpis.map((kpi, i) => (
                      <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-3 bg-surface-800 rounded-lg border border-border group hover:border-accent/30 transition-colors"
                      >
                        <div className="text-xs text-content-tertiary mb-2">{kpi.label}</div>
                        
                        {/* Sparkline */}
                        <div className="mb-2">
                          <Sparkline 
                            data={kpi.sparkline} 
                            width={100} 
                            height={28}
                            color={kpi.trend === 'up' ? '#10B981' : '#EF4444'}
                            showDots={true}
                            animated={true}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-medium text-content-primary">{kpi.current}</span>
                          {kpi.trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4 text-positive" />
                          ) : kpi.trend === 'down' ? (
                            <ArrowDownRight className="w-4 h-4 text-negative" />
                          ) : (
                            <Minus className="w-4 h-4 text-content-tertiary" />
                          )}
                        </div>
                        <div className={cn(
                          'text-xs mt-1',
                          kpi.trend === 'up' ? 'text-positive' : kpi.trend === 'down' ? 'text-negative' : 'text-content-tertiary'
                        )}>
                          prev: {kpi.previous}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Peer Comparison */}
                <div className="p-4 bg-surface-900 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-content-primary">Peer Comparison</span>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-xs text-content-tertiary border-b border-border">
                          <th className="text-left py-2 font-medium">Ticker</th>
                          <th className="text-right py-2 font-medium">Price</th>
                          <th className="text-right py-2 font-medium">Chg%</th>
                          <th className="text-right py-2 font-medium">Mkt Cap</th>
                          <th className="text-right py-2 font-medium">P/E</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.peers.map((peer, i) => (
                          <motion.tr
                            key={peer.ticker}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="border-b border-border/50 hover:bg-surface-800 transition-colors cursor-pointer"
                          >
                            <td className="py-2.5 font-mono font-medium text-accent">{peer.ticker}</td>
                            <td className="text-right font-mono">${peer.price.toLocaleString()}</td>
                            <td className={cn(
                              'text-right font-mono',
                              peer.change >= 0 ? 'text-positive' : 'text-negative'
                            )}>
                              {peer.change >= 0 ? '+' : ''}{peer.change}%
                            </td>
                            <td className="text-right text-content-secondary">{peer.marketCap}</td>
                            <td className="text-right font-mono">{peer.pe}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-3 p-4 space-y-4">
                {/* Risk Flags */}
                <div className="p-4 bg-surface-900 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="text-sm font-medium text-content-primary">Risk Flags</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-warning/10 text-warning text-xs font-medium">
                      {data.riskFlags.length} Active
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {data.riskFlags.map((risk, i) => (
                      <motion.div
                        key={risk.label}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-3 bg-surface-800 rounded-lg border border-border"
                      >
                        <div className="flex items-start gap-2">
                          {risk.severity === 'high' ? (
                            <XCircle className="w-4 h-4 text-negative mt-0.5 flex-shrink-0" />
                          ) : risk.severity === 'medium' ? (
                            <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-content-tertiary mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-content-primary">{risk.label}</span>
                              <span className={cn(
                                'text-xs px-1.5 py-0.5 rounded',
                                risk.severity === 'high' ? 'bg-negative/10 text-negative' :
                                risk.severity === 'medium' ? 'bg-warning/10 text-warning' :
                                'bg-surface-700 text-content-tertiary'
                              )}>
                                {risk.severity.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-xs text-content-tertiary mt-1">{risk.description}</p>
                            <span className="text-xs text-warning mt-1 block">{risk.impact}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Catalyst Detection */}
                <div className="p-4 bg-surface-900 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-content-primary">Catalyst Feed</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {data.catalysts.map((catalyst, i) => (
                      <motion.div
                        key={catalyst.event}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                          'p-3 rounded-lg border',
                          catalyst.status === 'upcoming' 
                            ? 'bg-surface-800 border-accent/20' 
                            : 'bg-surface-800/50 border-border'
                        )}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={cn(
                            'text-xs font-mono',
                            catalyst.status === 'upcoming' ? 'text-accent' : 'text-content-tertiary'
                          )}>
                            {catalyst.date}
                          </span>
                          <span className={cn(
                            'text-xs px-1.5 py-0.5 rounded',
                            catalyst.type === 'Earnings' ? 'bg-accent/10 text-accent' :
                            catalyst.type === 'Product' ? 'bg-accent/10 text-accent' :
                            'bg-surface-700 text-content-tertiary'
                          )}>
                            {catalyst.type}
                          </span>
                        </div>
                        <div className={cn(
                          'text-sm',
                          catalyst.status === 'upcoming' ? 'text-content-primary' : 'text-content-tertiary'
                        )}>
                          {catalyst.event}
                        </div>
                        {catalyst.status === 'upcoming' && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className={cn(
                              'text-xs',
                              catalyst.impact === 'high' ? 'text-positive' : 'text-content-tertiary'
                            )}>
                              {catalyst.impact.toUpperCase()} IMPACT
                            </span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Document Generation */}
                <div className="p-4 bg-surface-900 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-content-primary">Generate Output</span>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { id: 'ic-memo', label: 'IC Memo', desc: 'Investment committee brief' },
                      { id: 'diligence', label: 'Diligence Pack', desc: 'Full DD checklist' },
                      { id: 'pm-brief', label: 'PM Brief', desc: 'Portfolio manager summary' },
                    ].map((doc) => (
                      <motion.button
                        key={doc.id}
                        onClick={() => handleGenerateDocument(doc.id)}
                        disabled={isGenerating}
                        className={cn(
                          'w-full flex items-center justify-between p-3 rounded-lg border transition-all',
                          activeDocument === doc.id
                            ? 'bg-accent/10 border-accent/30'
                            : 'bg-surface-800 border-border hover:border-accent/30'
                        )}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-content-primary">{doc.label}</span>
                            {activeDocument === doc.id && isGenerating && (
                              <RefreshCw className="w-3 h-3 text-accent animate-spin" />
                            )}
                            {activeDocument === doc.id && !isGenerating && (
                              <CheckCircle2 className="w-3 h-3 text-positive" />
                            )}
                          </div>
                          <span className="text-xs text-content-tertiary">{doc.desc}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-content-tertiary" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-content-secondary mb-4">
            This is a live demo with sample data. Your instance connects to your data sources.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-surface-900 font-medium hover:bg-accent-light transition-colors">
              <Sparkles className="w-4 h-4" />
              Schedule Live Demo
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-surface-800 text-content-primary font-medium hover:border-accent/30 transition-colors">
              <Layers className="w-4 h-4" />
              See All Features
            </button>
          </div>
        </motion.div>
      </div>

      {/* Document Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-surface-800 rounded-xl border border-border shadow-elevated overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-700">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-accent" />
                  <div>
                    <h3 className="font-semibold text-content-primary">
                      {activeDocument === 'ic-memo' && 'Investment Committee Memo'}
                      {activeDocument === 'diligence' && 'Due Diligence Pack'}
                      {activeDocument === 'pm-brief' && 'Portfolio Manager Brief'}
                    </h3>
                    <p className="text-sm text-content-tertiary">
                      {selectedTicker} • Generated by ALICE
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-600 hover:bg-surface-500 text-sm font-medium text-content-secondary transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-positive" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 rounded-lg hover:bg-surface-600 text-content-tertiary hover:text-content-primary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
                <pre className="font-mono text-sm text-content-secondary whitespace-pre-wrap leading-relaxed">
                  {generatedContent}
                </pre>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-surface-700">
                <p className="text-xs text-content-tertiary">
                  This document was generated using AI. Please verify all data before making investment decisions.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-surface-900 font-medium hover:bg-accent-light transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default CommandCenter
