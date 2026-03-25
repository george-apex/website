'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  GitBranch, 
  Activity, 
  BarChart3, 
  Network, 
  Zap,
  Shield,
  LineChart as LineChartIcon,
  Building2,
  TestTube,
  FlaskConical,
  Settings,
  AlertTriangle,
  Layers,
  Sparkles,
  X,
  Play,
  ChevronRight,
  Terminal,
  Database,
  ArrowRight,
  Check,
  TrendingDown,
  Minus,
  AlertCircle,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'


// Types
interface MetricCard {
  label: string
  value: string | number
  change?: number
  status?: 'positive' | 'negative' | 'neutral' | 'warning'
  sublabel?: string
}

interface TableRow {
  cells: (string | number)[]
  highlight?: boolean
}

interface DataTable {
  headers: string[]
  rows: TableRow[]
}

interface ChartDataPoint {
  label: string
  value: number
  color?: string
}

interface ForecastPoint {
  day: number
  forecast: number
  lower: number
  upper: number
}

interface StructuredResponse {
  title: string
  summary: string
  metrics: MetricCard[]
  tables: { title: string; data: DataTable }[]
  charts: {
    type: 'bar' | 'line' | 'forecast' | 'spillover'
    title: string
    data: ChartDataPoint[] | ForecastPoint[] | number[][]
    labels?: string[]
  }[]
  insights: string[]
  recommendation?: {
    action: string
    confidence: 'high' | 'medium' | 'low'
    details: string
  }
}

// Demo Response Data
const demoResponsesData: Record<string, StructuredResponse> = {
  'sarimax': {
    title: 'SARIMAX Forecast: XOM with Crude Oil Exogenous Variable',
    summary: 'Energy stock forecast using oil prices as external regressor. Model confirms strong energy-equity linkage.',
    metrics: [
      { label: 'ARIMA Order', value: '(2,1,2)', status: 'neutral' },
      { label: 'Seasonal Order', value: '(1,1,1,5)', status: 'neutral' },
      { label: 'AIC Score', value: '1,245.67', status: 'neutral' },
      { label: 'Oil Coefficient', value: '0.342', change: 0.342, status: 'positive', sublabel: 'Highly significant (p<0.001)' },
    ],
    tables: [
      {
        title: 'Model Coefficients',
        data: {
          headers: ['Variable', 'Coefficient', 'Std Error', 'p-value', 'Significance'],
          rows: [
            { cells: ['CL (Oil)', '0.342', '0.089', '0.0001', '***'] },
            { cells: ['AR(1)', '0.456', '0.112', '0.0001', '***'] },
            { cells: ['AR(2)', '0.234', '0.098', '0.017', '*'] },
            { cells: ['MA(1)', '-0.234', '0.098', '0.017', '*'] },
            { cells: ['MA(2)', '-0.156', '0.087', '0.072', '†'] },
          ]
        }
      },
      {
        title: '10-Day Price Forecast',
        data: {
          headers: ['Day', 'Forecast', '95% CI Lower', '95% CI Upper', 'Change'],
          rows: [
            { cells: ['1', '$102.45', '$99.23', '$105.67', '+0.8%'] },
            { cells: ['2', '$103.12', '$98.89', '$107.35', '+0.7%'] },
            { cells: ['3', '$104.56', '$99.12', '$110.00', '+1.4%'] },
            { cells: ['5', '$106.78', '$99.45', '$114.11', '+2.1%'] },
            { cells: ['10', '$111.23', '$101.23', '$121.23', '+4.2%'], highlight: true },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'forecast',
        title: 'Price Forecast with Confidence Intervals',
        data: [
          { day: 0, forecast: 101.65, lower: 101.65, upper: 101.65 },
          { day: 1, forecast: 102.45, lower: 99.23, upper: 105.67 },
          { day: 2, forecast: 103.12, lower: 98.89, upper: 107.35 },
          { day: 3, forecast: 104.56, lower: 99.12, upper: 110.00 },
          { day: 4, forecast: 105.34, lower: 99.34, upper: 111.34 },
          { day: 5, forecast: 106.78, lower: 99.45, upper: 114.11 },
          { day: 6, forecast: 107.45, lower: 99.89, upper: 115.01 },
          { day: 7, forecast: 108.23, lower: 100.23, upper: 116.23 },
          { day: 8, forecast: 109.56, lower: 100.67, upper: 118.45 },
          { day: 9, forecast: 110.34, lower: 100.89, upper: 119.79 },
          { day: 10, forecast: 111.23, lower: 101.23, upper: 121.23 },
        ] as ForecastPoint[]
      }
    ],
    insights: [
      'Oil price coefficient of 0.342 confirms energy-equity linkage: 1% oil move → 0.34% XOM move',
      'Model diagnostics pass all tests (Ljung-Box p=0.34, Jarque-Bera p=0.12)',
      'Confidence intervals widen appropriately over forecast horizon',
      'Seasonal component captures weekly trading patterns',
    ],
    recommendation: {
      action: 'BULLISH',
      confidence: 'high',
      details: 'Model predicts +4.2% move over 10 days with strong statistical significance. Consider long positions with stops below $99.'
    }
  },

  'vecm': {
    title: 'VECM Cointegration Analysis: KO vs PEP',
    summary: 'Pairs trading analysis reveals cointegration relationship with KO adjusting faster to equilibrium.',
    metrics: [
      { label: 'Trace Statistic', value: '24.56', status: 'positive', sublabel: 'p < 0.05' },
      { label: 'Cointegration Rank', value: '1', status: 'positive', sublabel: 'Cointegrated ✓' },
      { label: 'KO Half-Life', value: '15.4 days', status: 'neutral' },
      { label: 'PEP Half-Life', value: '21.7 days', status: 'neutral' },
    ],
    tables: [
      {
        title: 'Adjustment Speeds',
        data: {
          headers: ['Asset', 'Adjustment α', 'Speed', 'Half-Life', 't-statistic'],
          rows: [
            { cells: ['KO', '-0.045', '4.5%', '15.4 days', '-3.24***'] },
            { cells: ['PEP', '-0.032', '3.2%', '21.7 days', '-2.18*'] },
          ]
        }
      },
      {
        title: 'Long-Run Equilibrium',
        data: {
          headers: ['Relationship', 'Coefficient', 'Std Error', 'Interpretation'],
          rows: [
            { cells: ['KO → PEP', '0.89', '0.12', '1 KO ≈ 0.89 PEP'] },
            { cells: ['Intercept', '2.34', '0.45', 'Base relationship'] },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'line',
        title: 'Spread from Equilibrium (σ)',
        data: [
          { label: '-20d', value: -0.8 },
          { label: '-15d', value: -0.3 },
          { label: '-10d', value: 0.4 },
          { label: '-5d', value: 0.9 },
          { label: 'Today', value: 1.2 },
        ] as ChartDataPoint[]
      },
      {
        type: 'bar',
        title: 'Half-Life Comparison (days)',
        data: [
          { label: 'KO', value: 15.4, color: '#10b981' },
          { label: 'PEP', value: 21.7, color: '#6366f1' },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'Assets are cointegrated - suitable for pairs trading',
      'KO adjusts 40% faster than PEP to equilibrium deviations',
      'Current spread: +1.2σ (KO relatively expensive vs PEP)',
      'Optimal hedge ratio: Long 1 KO / Short 0.89 PEP',
    ],
    recommendation: {
      action: 'WAIT',
      confidence: 'medium',
      details: 'Spread at +1.2σ. Wait for spread > 2σ before entry for optimal risk/reward. Target entry: Long PEP / Short KO when spread exceeds 2 standard deviations.'
    }
  },

  'gjr-garch': {
    title: 'GJR-GARCH Volatility Analysis: TSLA',
    summary: 'Asymmetric volatility modeling reveals significant leverage effect in Tesla stock.',
    metrics: [
      { label: 'Asymmetry Ratio', value: '1.51', status: 'warning', sublabel: 'Strong leverage effect' },
      { label: 'Current Vol', value: '37.2%', status: 'warning', sublabel: '78th percentile' },
      { label: 'Vol Regime', value: 'HIGH', status: 'warning', sublabel: 'Elevated' },
      { label: 'Persistence', value: '0.945', status: 'neutral' },
    ],
    tables: [
      {
        title: 'Model Parameters',
        data: {
          headers: ['Parameter', 'Estimate', 'Std Error', 'Interpretation'],
          rows: [
            { cells: ['ω (constant)', '0.00012', '0.00003', 'Base variance'] },
            { cells: ['α (ARCH)', '0.089', '0.021', 'Short-term vol'] },
            { cells: ['β (GARCH)', '0.856', '0.034', 'Vol clustering'] },
            { cells: ['γ (Asymmetry)', '0.134', '0.028', 'Leverage effect***'] },
          ]
        }
      },
      {
        title: '5-Day Volatility Forecast',
        data: {
          headers: ['Day', 'Vol Forecast', 'Annualized', 'Regime'],
          rows: [
            { cells: ['1', '2.34%', '37.2%', 'High'] },
            { cells: ['2', '2.41%', '38.3%', 'High'] },
            { cells: ['3', '2.52%', '40.1%', 'High'] },
            { cells: ['5', '2.67%', '42.4%', 'Very High'], highlight: true },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'bar',
        title: 'Shock Impact on Volatility',
        data: [
          { label: '+2% Shock', value: 12.1, color: '#10b981' },
          { label: '-2% Shock', value: 18.3, color: '#ef4444' },
        ] as ChartDataPoint[]
      },
      {
        type: 'line',
        title: 'Volatility Forecast (Annualized %)',
        data: [
          { label: 'Today', value: 37.2 },
          { label: 'Day 2', value: 38.3 },
          { label: 'Day 3', value: 40.1 },
          { label: 'Day 4', value: 41.2 },
          { label: 'Day 5', value: 42.4 },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'Negative shocks have 51% more impact on volatility than positive shocks',
      'Current volatility in 78th percentile - elevated regime',
      'Volatility expected to increase to 42.4% annualized over 5 days',
      'Leverage effect statistically significant (p < 0.001)',
    ],
    recommendation: {
      action: 'CAUTION',
      confidence: 'high',
      details: 'High volatility regime with significant leverage effect. Consider reduced position sizes and wider stops. Option sellers should be cautious.'
    }
  },

  'spillover': {
    title: 'Diebold-Yilmaz Spillover Index: US Banking Sector',
    summary: 'Systemic risk analysis showing high connectedness among major US banks.',
    metrics: [
      { label: 'Total Spillover', value: '67.3%', status: 'warning', sublabel: 'High connectedness' },
      { label: 'Top Transmitter', value: 'JPM', status: 'warning', sublabel: '+6.1% net' },
      { label: 'Top Receiver', value: 'WFC', status: 'negative', sublabel: '-3.6% net' },
      { label: 'Systemic Risk', value: 'ELEVATED', status: 'warning' },
    ],
    tables: [
      {
        title: 'Directional Spillovers',
        data: {
          headers: ['Bank', 'To Others', 'From Others', 'Net Position', 'Role'],
          rows: [
            { cells: ['JPM', '18.2%', '12.1%', '+6.1%', 'TRANSMITTER'] },
            { cells: ['GS', '12.6%', '11.9%', '+0.7%', 'Transmitter'] },
            { cells: ['BAC', '14.5%', '15.3%', '-0.8%', 'Receiver'] },
            { cells: ['C', '10.8%', '13.2%', '-2.4%', 'Receiver'] },
            { cells: ['WFC', '11.2%', '14.8%', '-3.6%', 'RECEIVER'], highlight: true },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'spillover',
        title: 'Spillover Network',
        data: [
          [0, 5.1, 4.8, 3.9, 4.2],
          [4.2, 0, 5.2, 4.1, 3.1],
          [3.8, 4.5, 0, 3.5, 2.9],
          [2.9, 3.2, 3.8, 0, 2.2],
          [3.5, 2.8, 2.6, 2.4, 0],
        ],
        labels: ['JPM', 'BAC', 'WFC', 'C', 'GS']
      },
      {
        type: 'bar',
        title: 'Net Spillover Position (%)',
        data: [
          { label: 'JPM', value: 6.1, color: '#10b981' },
          { label: 'GS', value: 0.7, color: '#10b981' },
          { label: 'BAC', value: -0.8, color: '#ef4444' },
          { label: 'C', value: -2.4, color: '#ef4444' },
          { label: 'WFC', value: -3.6, color: '#ef4444' },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'Total spillover of 67.3% indicates high systemic risk',
      'JPM is the primary shock transmitter - monitor for early warning signals',
      'WFC most vulnerable to receiving spillovers from other banks',
      'Network highly connected - contagion risk is elevated',
    ],
    recommendation: {
      action: 'MONITOR',
      confidence: 'high',
      details: 'JPM identified as systemically important node. Any distress at JPM likely to transmit to sector. Consider hedging bank exposure during JPM volatility.'
    }
  },

  'backtest': {
    title: 'Backtest Results: MA Crossover on SPY',
    summary: 'Strategy performance analysis with realistic transaction costs.',
    metrics: [
      { label: 'Gross Return', value: '+78.4%', status: 'positive', sublabel: '5 years' },
      { label: 'Net Return', value: '+71.2%', status: 'positive', sublabel: 'After costs' },
      { label: 'Sharpe Ratio', value: '1.08', status: 'positive', sublabel: 'Net' },
      { label: 'Max Drawdown', value: '-19.1%', status: 'negative' },
    ],
    tables: [
      {
        title: 'Performance Comparison',
        data: {
          headers: ['Metric', 'Gross', 'Net', 'Drag'],
          rows: [
            { cells: ['Total Return', '+78.4%', '+71.2%', '-7.2%'] },
            { cells: ['Annual Return', '12.3%', '11.2%', '-1.1%'] },
            { cells: ['Sharpe Ratio', '1.24', '1.08', '-0.16'] },
            { cells: ['Win Rate', '54.2%', '52.8%', '-1.4%'] },
            { cells: ['Max Drawdown', '-18.3%', '-19.1%', '-0.8%'] },
          ]
        }
      },
      {
        title: 'Transaction Cost Breakdown',
        data: {
          headers: ['Cost Type', 'Amount', 'Impact'],
          rows: [
            { cells: ['Base Costs (10 bps)', '$4,700', '4.7%'] },
            { cells: ['Slippage (Square Root)', '$2,340', '2.3%'] },
            { cells: ['Opportunity Cost', '$260', '0.2%'] },
            { cells: ['Total Cost Drag', '$7,300', '7.2%'], highlight: true },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'bar',
        title: 'Return Breakdown',
        data: [
          { label: 'Gross Return', value: 78.4, color: '#10b981' },
          { label: 'Net Return', value: 71.2, color: '#6366f1' },
          { label: 'Cost Drag', value: -7.2, color: '#ef4444' },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'Transaction costs reduce returns by 7.2% over 5 years',
      '47 trades executed with 52.8% win rate after costs',
      'Square root slippage model accounts for 2.3% of drag',
      'Strategy remains profitable after realistic cost modeling',
    ],
    recommendation: {
      action: 'VIABLE',
      confidence: 'medium',
      details: 'Strategy remains viable after costs with 1.08 Sharpe ratio. Consider optimizing trade frequency to reduce cost drag. Break-even win rate: 51.3%.'
    }
  },

  'har': {
    title: 'HAR Model: SPY Realized Volatility Decomposition',
    summary: 'Multi-horizon volatility analysis revealing long-memory effects in S&P 500.',
    metrics: [
      { label: 'Daily Component', value: '0.342', status: 'positive', sublabel: 'β_d: Short-term' },
      { label: 'Weekly Component', value: '0.412', status: 'positive', sublabel: 'β_w: Medium-term' },
      { label: 'Monthly Component', value: '0.289', status: 'neutral', sublabel: 'β_m: Long-term' },
      { label: 'R²', value: '0.68', status: 'positive', sublabel: 'Model fit' },
    ],
    tables: [
      {
        title: 'HAR Regression Results',
        data: {
          headers: ['Component', 'Coefficient', 'Std Error', 't-stat', 'p-value'],
          rows: [
            { cells: ['RV_daily', '0.342', '0.056', '6.11', '0.0001***'] },
            { cells: ['RV_weekly', '0.412', '0.078', '5.28', '0.0001***'] },
            { cells: ['RV_monthly', '0.289', '0.092', '3.14', '0.0017**'] },
            { cells: ['Constant', '-0.456', '0.234', '-1.95', '0.0512†'] },
          ]
        }
      },
      {
        title: '5-Day Volatility Forecast',
        data: {
          headers: ['Day', 'RV Forecast', 'Annualized', 'Percentile'],
          rows: [
            { cells: ['1', '1.24%', '19.7%', '72nd'] },
            { cells: ['2', '1.31%', '20.8%', '75th'] },
            { cells: ['3', '1.38%', '21.9%', '78th'] },
            { cells: ['5', '1.45%', '23.0%', '81st'], highlight: true },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'bar',
        title: 'Volatility Component Contribution',
        data: [
          { label: 'Daily', value: 34.2, color: '#10b981' },
          { label: 'Weekly', value: 41.2, color: '#6366f1' },
          { label: 'Monthly', value: 28.9, color: '#f59e0b' },
        ] as ChartDataPoint[]
      },
      {
        type: 'line',
        title: 'Realized Volatility Forecast (Annualized %)',
        data: [
          { label: 'Today', value: 19.7 },
          { label: 'Day 2', value: 20.8 },
          { label: 'Day 3', value: 21.9 },
          { label: 'Day 4', value: 22.5 },
          { label: 'Day 5', value: 23.0 },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'Weekly component dominates at 41.2%, indicating medium-term volatility clustering',
      'Strong long-memory effect confirmed by significant monthly coefficient',
      'Volatility expected to rise from 72nd to 81st percentile over 5 days',
      'Model captures 68% of variance - good fit for forecasting',
    ],
    recommendation: {
      action: 'MONITOR',
      confidence: 'high',
      details: 'Volatility trending higher. Consider reducing leverage and tightening risk limits. Option premiums likely to increase - favorable for volatility selling strategies.'
    }
  },

  'impulse': {
    title: 'Impulse Response: TLT Shock to SPY',
    summary: 'Tracing the transmission of Treasury yield shocks through equity markets.',
    metrics: [
      { label: 'Peak Response', value: '-2.4%', status: 'negative', sublabel: 'Day 3' },
      { label: 'Decay Period', value: '12 days', status: 'neutral', sublabel: 'Full absorption' },
      { label: 'Cumulative Impact', value: '-4.8%', status: 'negative', sublabel: '30-day total' },
      { label: 'Significance', value: 'p < 0.01', status: 'positive', sublabel: 'Highly significant' },
    ],
    tables: [
      {
        title: 'Impulse Response Timeline',
        data: {
          headers: ['Day', 'SPY Response', 'Cumulative', 't-stat', 'Significance'],
          rows: [
            { cells: ['0', '-0.8%', '-0.8%', '-2.14', '*'] },
            { cells: ['1', '-1.6%', '-2.4%', '-3.45', '***'] },
            { cells: ['2', '-2.1%', '-4.5%', '-4.12', '***'] },
            { cells: ['3', '-2.4%', '-6.9%', '-4.56', '***'], highlight: true },
            { cells: ['5', '-1.8%', '-9.2%', '-3.89', '***'] },
            { cells: ['10', '-0.4%', '-11.8%', '-1.23', 'ns'] },
          ]
        }
      },
      {
        title: 'Transmission Channels',
        data: {
          headers: ['Channel', 'Effect', 'Lag', 'Strength'],
          rows: [
            { cells: ['Discount Rate', '-1.2%', 'Immediate', 'Strong'] },
            { cells: ['Risk Premium', '-0.8%', '1-2 days', 'Moderate'] },
            { cells: ['Sector Rotation', '-0.4%', '2-3 days', 'Weak'] },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'line',
        title: 'Impulse Response Function (%)',
        data: [
          { label: 'Day 0', value: -0.8 },
          { label: 'Day 1', value: -1.6 },
          { label: 'Day 2', value: -2.1 },
          { label: 'Day 3', value: -2.4 },
          { label: 'Day 5', value: -1.8 },
          { label: 'Day 7', value: -1.1 },
          { label: 'Day 10', value: -0.4 },
          { label: 'Day 14', value: -0.1 },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      '1% rise in Treasury yields leads to 2.4% SPY decline at peak (Day 3)',
      'Shock fully absorbed within 12 trading days',
      'Immediate discount rate effect dominates transmission',
      'Cumulative 30-day impact of -4.8% highly significant',
    ],
    recommendation: {
      action: 'CAUTION',
      confidence: 'high',
      details: 'Rising rate environment poses headwind for equities. Consider hedging with duration or rotating to rate-insensitive sectors. Monitor Fed communications closely.'
    }
  },

  'combined': {
    title: 'Multi-Tool Analysis: AAPL Volatility Pipeline',
    summary: 'Comprehensive volatility analysis combining GJR-GARCH and HAR models.',
    metrics: [
      { label: 'GJR-GARCH Vol', value: '28.4%', status: 'warning', sublabel: 'Current' },
      { label: 'HAR Forecast', value: '31.2%', status: 'warning', sublabel: '5-day ahead' },
      { label: 'Leverage Effect', value: '1.23', status: 'warning', sublabel: 'Significant' },
      { label: 'Regime', value: 'ELEVATED', status: 'warning', sublabel: 'Above median' },
    ],
    tables: [
      {
        title: 'Model Comparison',
        data: {
          headers: ['Metric', 'GJR-GARCH', 'HAR', 'Combined'],
          rows: [
            { cells: ['Current Vol', '28.4%', '27.8%', '28.1%'] },
            { cells: ['5-Day Forecast', '29.5%', '31.2%', '30.4%'] },
            { cells: ['Model Fit (R²)', '0.72', '0.68', '0.75'] },
            { cells: ['RMSE', '0.0124', '0.0131', '0.0118'] },
          ]
        }
      },
      {
        title: 'Volatility Regime Analysis',
        data: {
          headers: ['Regime', 'Probability', 'Expected Vol', 'Duration'],
          rows: [
            { cells: ['Low', '15%', '18%', '45 days'] },
            { cells: ['Normal', '35%', '24%', '30 days'] },
            { cells: ['Elevated', '40%', '32%', '15 days'] },
            { cells: ['High', '10%', '45%', '8 days'], highlight: true },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'bar',
        title: 'Model Forecasts Comparison (Annualized %)',
        data: [
          { label: 'GJR-GARCH', value: 29.5, color: '#10b981' },
          { label: 'HAR', value: 31.2, color: '#6366f1' },
          { label: 'Combined', value: 30.4, color: '#f59e0b' },
        ] as ChartDataPoint[]
      },
      {
        type: 'line',
        title: 'Volatility Forecast Convergence',
        data: [
          { label: 'Day 1', value: 28.4 },
          { label: 'Day 2', value: 29.1 },
          { label: 'Day 3', value: 29.8 },
          { label: 'Day 4', value: 30.1 },
          { label: 'Day 5', value: 30.4 },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'Both models agree on upward volatility trajectory',
      'Combined forecast of 30.4% represents 8% increase from current',
      'Leverage effect of 1.23 indicates asymmetric response to negative shocks',
      '40% probability of elevated regime - highest likelihood state',
    ],
    recommendation: {
      action: 'CAUTION',
      confidence: 'high',
      details: 'Volatility expected to rise. Consider: 1) Reduce position size by 15-20%, 2) Wider stop losses, 3) Option strategies benefit from elevated vol - consider selling premium.'
    }
  },

  'risk': {
    title: 'Risk Management Report: QQQ Tail Risk Analysis',
    summary: 'Comprehensive tail risk metrics and volatility regime assessment for Nasdaq-100.',
    metrics: [
      { label: 'VaR (95%)', value: '-3.2%', status: 'warning', sublabel: '1-day' },
      { label: 'CVaR (95%)', value: '-5.1%', status: 'negative', sublabel: 'Expected shortfall' },
      { label: 'Skewness', value: '-0.45', status: 'negative', sublabel: 'Left-tail heavy' },
      { label: 'Kurtosis', value: '4.8', status: 'warning', sublabel: 'Fat tails present' },
    ],
    tables: [
      {
        title: 'Tail Risk Metrics',
        data: {
          headers: ['Metric', 'Value', 'Percentile', 'Assessment'],
          rows: [
            { cells: ['VaR (90%)', '-2.4%', '65th', 'Moderate'] },
            { cells: ['VaR (95%)', '-3.2%', '72nd', 'Elevated'] },
            { cells: ['VaR (99%)', '-5.8%', '78th', 'High'] },
            { cells: ['CVaR (95%)', '-5.1%', '75th', 'Elevated'], highlight: true },
            { cells: ['Max Drawdown', '-22.4%', '82nd', 'High'] },
          ]
        }
      },
      {
        title: 'GJR-GARCH Volatility',
        data: {
          headers: ['Parameter', 'Estimate', 'Interpretation', 'Status'],
          rows: [
            { cells: ['Current Vol', '26.8%', 'Annualized', 'Elevated'] },
            { cells: ['Leverage (γ)', '0.156', 'Asymmetric vol', 'Significant***'] },
            { cells: ['Persistence', '0.923', 'Vol clustering', 'High'] },
            { cells: ['5-Day Forecast', '28.4%', 'Rising regime', 'Warning'] },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'bar',
        title: 'Value at Risk by Confidence Level',
        data: [
          { label: 'VaR 90%', value: -2.4, color: '#10b981' },
          { label: 'VaR 95%', value: -3.2, color: '#f59e0b' },
          { label: 'VaR 99%', value: -5.8, color: '#ef4444' },
          { label: 'CVaR 95%', value: -5.1, color: '#dc2626' },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'CVaR of -5.1% indicates expected loss when VaR is breached',
      'Negative skewness (-0.45) confirms left-tail risk',
      'Kurtosis of 4.8 indicates fat tails - extreme moves more likely',
      'Leverage effect significant - negative shocks amplify volatility',
    ],
    recommendation: {
      action: 'HEDGE',
      confidence: 'high',
      details: 'Elevated tail risk detected. Consider: 1) Protective puts 5% OTM, 2) Reduce gross exposure by 10-15%, 3) Add tail risk hedge via VIX calls. Estimated hedge cost: 0.8% monthly.'
    }
  },

  'strategy': {
    title: 'Mean-Reversion Strategy: GLD Analysis',
    summary: 'Quantitative assessment of mean-reverting properties for gold ETF trading.',
    metrics: [
      { label: 'Hurst Exponent', value: '0.42', status: 'positive', sublabel: 'Mean-reverting' },
      { label: 'Half-Life', value: '8.3 days', status: 'positive', sublabel: 'Fast mean-reversion' },
      { label: 'ADF p-value', value: '0.0023', status: 'positive', sublabel: 'Stationary***' },
      { label: 'Trade Frequency', value: '2-3/week', status: 'neutral', sublabel: 'Optimal' },
    ],
    tables: [
      {
        title: 'Mean-Reversion Tests',
        data: {
          headers: ['Test', 'Statistic', 'Critical Value', 'Result'],
          rows: [
            { cells: ['ADF', '-3.45', '-2.87', 'Stationary***'] },
            { cells: ['KPSS', '0.234', '0.463', 'Stationary'] },
            { cells: ['Phillips-Perron', '-3.12', '-2.87', 'Stationary**'] },
            { cells: ['Variance Ratio', '0.87', '0.92', 'Mean-reverting'] },
          ]
        }
      },
      {
        title: 'Strategy Parameters',
        data: {
          headers: ['Parameter', 'Optimal', 'Range Tested', 'Robustness'],
          rows: [
            { cells: ['Entry Z-Score', '±2.0', '1.5 - 2.5', 'High'] },
            { cells: ['Exit Z-Score', '±0.5', '0.0 - 1.0', 'High'] },
            { cells: ['Stop Loss', '4%', '3% - 6%', 'Medium'] },
            { cells: ['Holding Period', '5 days', '3 - 10 days', 'High'], highlight: true },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'bar',
        title: 'Hurst Exponent Distribution',
        data: [
          { label: 'GLD (0.42)', value: 0.42, color: '#10b981' },
          { label: 'Random Walk', value: 0.50, color: '#6b7280' },
          { label: 'Trending', value: 0.60, color: '#ef4444' },
        ] as ChartDataPoint[]
      },
      {
        type: 'line',
        title: 'Z-Score Mean-Reversion Pattern',
        data: [
          { label: 'Day 0', value: 2.1 },
          { label: 'Day 2', value: 1.4 },
          { label: 'Day 4', value: 0.8 },
          { label: 'Day 6', value: 0.3 },
          { label: 'Day 8', value: -0.1 },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'Hurst exponent of 0.42 confirms strong mean-reverting behavior (H < 0.5)',
      'Half-life of 8.3 days indicates trades should target 1-week horizon',
      'ADF test confirms stationarity - suitable for mean-reversion strategies',
      'Entry at ±2σ with exit at ±0.5σ provides optimal risk/reward',
    ],
    recommendation: {
      action: 'VIABLE',
      confidence: 'high',
      details: 'Strategy viable. Backtested Sharpe: 1.35. Max drawdown: -8.2%. Win rate: 58%. Recommended allocation: 15-20% of portfolio. Monitor half-life stability monthly.'
    }
  },

  'macro': {
    title: 'Macro-Financial Analysis: Interest Rate Sensitivity',
    summary: 'Cross-sector spillover analysis of rate transmission mechanisms.',
    metrics: [
      { label: 'Total Spillover', value: '58.4%', status: 'warning', sublabel: 'From TLT' },
      { label: 'Most Sensitive', value: 'XLRE', status: 'negative', sublabel: 'Real Estate' },
      { label: 'Least Sensitive', value: 'XLK', status: 'positive', sublabel: 'Technology' },
      { label: 'Fed Impact', value: 'HIGH', status: 'warning', sublabel: 'Policy dependent' },
    ],
    tables: [
      {
        title: 'Sector Rate Sensitivity',
        data: {
          headers: ['Sector', 'From TLT', 'Net Position', 'Beta to Rates', 'Sensitivity'],
          rows: [
            { cells: ['XLRE', '14.2%', '+4.1%', '-1.45', 'VERY HIGH'] },
            { cells: ['XLU', '11.8%', '+2.3%', '-1.12', 'HIGH'] },
            { cells: ['XLF', '9.4%', '-1.2%', '+0.34', 'LOW'] },
            { cells: ['XLK', '6.2%', '-3.4%', '-0.23', 'VERY LOW'] },
            { cells: ['XLE', '5.8%', '-2.8%', '-0.18', 'VERY LOW'], highlight: true },
          ]
        }
      },
      {
        title: 'VECM Cointegration: Inflation Hedges',
        data: {
          headers: ['Asset', 'Adjustment α', 'Half-Life', 'Role'],
          rows: [
            { cells: ['TIP', '-0.056', '12.4 days', 'Primary hedge'] },
            { cells: ['GLD', '-0.034', '20.4 days', 'Secondary hedge'] },
            { cells: ['IEF', '-0.028', '24.8 days', 'Diversifier'] },
            { cells: ['VNQ', '-0.021', '33.0 days', 'Weak hedge'] },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'bar',
        title: 'Sector Sensitivity to Rate Changes (Beta)',
        data: [
          { label: 'XLRE', value: -1.45, color: '#ef4444' },
          { label: 'XLU', value: -1.12, color: '#f87171' },
          { label: 'XLF', value: 0.34, color: '#10b981' },
          { label: 'XLK', value: -0.23, color: '#34d399' },
          { label: 'XLE', value: -0.18, color: '#6ee7b7' },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'Real Estate (XLRE) most sensitive to rate changes with beta of -1.45',
      'Technology (XLK) shows lowest rate sensitivity - defensive positioning',
      'TIP adjusts fastest to inflation shocks - optimal primary hedge',
      'Gold provides secondary inflation protection with 20-day half-life',
    ],
    recommendation: {
      action: 'ROTATE',
      confidence: 'medium',
      details: 'In rising rate environment: Underweight XLRE/XLU, Overweight XLK/XLE. Allocate 15% to TIP, 10% to GLD for inflation protection. Hedge duration risk via TLT puts.'
    }
  },

  'purged-cv': {
    title: 'Purged Cross-Validation: XGBoost on SPY',
    summary: 'ML model validation with leakage prevention for 5-day return prediction.',
    metrics: [
      { label: 'IC (Information Coef)', value: '0.082', status: 'positive', sublabel: 'Out-of-sample' },
      { label: 'IC Decay', value: '-12%', status: 'warning', sublabel: 'Train to Test' },
      { label: 'Leakage Detected', value: 'NONE', status: 'positive', sublabel: 'Purge valid' },
      { label: 'Optimal Features', value: '23', status: 'neutral', sublabel: 'Of 45 tested' },
    ],
    tables: [
      {
        title: 'Cross-Validation Results',
        data: {
          headers: ['Fold', 'Train IC', 'Test IC', 'Decay', 'Samples'],
          rows: [
            { cells: ['1', '0.095', '0.084', '-11.6%', '245'] },
            { cells: ['2', '0.092', '0.078', '-15.2%', '238'] },
            { cells: ['3', '0.088', '0.081', '-8.0%', '251'] },
            { cells: ['4', '0.094', '0.086', '-8.5%', '242'] },
            { cells: ['Average', '0.092', '0.082', '-10.8%', '244'], highlight: true },
          ]
        }
      },
      {
        title: 'Model Comparison',
        data: {
          headers: ['Model', 'IC', 'IC Std', 'Sharpe', 'Rank'],
          rows: [
            { cells: ['XGBoost', '0.082', '0.012', '1.24', '1st'] },
            { cells: ['Random Forest', '0.068', '0.015', '0.98', '2nd'] },
            { cells: ['Logistic Reg', '0.051', '0.018', '0.72', '3rd'] },
            { cells: ['Linear Reg', '0.048', '0.019', '0.68', '4th'] },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'bar',
        title: 'Information Coefficient by Model',
        data: [
          { label: 'XGBoost', value: 0.082, color: '#10b981' },
          { label: 'Random Forest', value: 0.068, color: '#6366f1' },
          { label: 'Logistic', value: 0.051, color: '#f59e0b' },
          { label: 'Linear', value: 0.048, color: '#6b7280' },
        ] as ChartDataPoint[]
      },
      {
        type: 'line',
        title: 'IC Across Folds',
        data: [
          { label: 'Fold 1', value: 0.084 },
          { label: 'Fold 2', value: 0.078 },
          { label: 'Fold 3', value: 0.081 },
          { label: 'Fold 4', value: 0.086 },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'XGBoost outperforms other models with IC of 0.082 (Sharpe 1.24)',
      'IC decay of 12% from train to test - acceptable generalization',
      'Purge window of 10 days effectively prevents lookahead leakage',
      '23 optimal features identified through recursive feature elimination',
    ],
    recommendation: {
      action: 'DEPLOY',
      confidence: 'medium',
      details: 'Model passes validation with acceptable IC decay. Deploy with paper trading for 2 weeks. Monitor live IC - trigger retraining if IC drops below 0.05.'
    }
  },

  'sensitivity': {
    title: 'Parameter Sensitivity: MA Crossover on SPY',
    summary: 'Robustness analysis across parameter ranges for moving average strategy.',
    metrics: [
      { label: 'Optimal Short MA', value: '10 days', status: 'positive', sublabel: 'Stable' },
      { label: 'Optimal Long MA', value: '50 days', status: 'positive', sublabel: 'Stable' },
      { label: 'Stability Score', value: '0.78', status: 'positive', sublabel: 'High robustness' },
      { label: 'Parameter Range', value: '8-12 / 45-55', status: 'neutral', sublabel: 'Robust zone' },
    ],
    tables: [
      {
        title: 'Parameter Grid Results',
        data: {
          headers: ['Short MA', 'Long MA', 'Return', 'Sharpe', 'Max DD'],
          rows: [
            { cells: ['5', '20', '+42.3%', '0.82', '-24.1%'] },
            { cells: ['10', '50', '+71.2%', '1.08', '-19.1%'], highlight: true },
            { cells: ['15', '50', '+65.4%', '0.96', '-21.3%'] },
            { cells: ['10', '100', '+58.7%', '0.89', '-17.8%'] },
            { cells: ['20', '100', '+52.1%', '0.78', '-15.2%'] },
          ]
        }
      },
      {
        title: 'Robustness Metrics',
        data: {
          headers: ['Metric', 'Value', 'Interpretation', 'Assessment'],
          rows: [
            { cells: ['Param Stability', '0.78', 'High', 'Robust'] },
            { cells: ['Return Std Dev', '8.4%', 'Low variance', 'Stable'] },
            { cells: ['Sharpe Range', '0.78 - 1.12', 'Narrow', 'Consistent'] },
            { cells: ['Overfitting Risk', 'Low', 'PBO: 0.28', 'Acceptable'] },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'bar',
        title: 'Sharpe Ratio by Parameter Combination',
        data: [
          { label: '5/20', value: 0.82, color: '#6b7280' },
          { label: '10/50', value: 1.08, color: '#10b981' },
          { label: '15/50', value: 0.96, color: '#6366f1' },
          { label: '10/100', value: 0.89, color: '#f59e0b' },
          { label: '20/100', value: 0.78, color: '#6b7280' },
        ] as ChartDataPoint[]
      },
      {
        type: 'line',
        title: 'Return Surface (Short MA = 10)',
        data: [
          { label: 'Long 20', value: 52.3 },
          { label: 'Long 35', value: 64.8 },
          { label: 'Long 50', value: 71.2 },
          { label: 'Long 75', value: 65.1 },
          { label: 'Long 100', value: 58.7 },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'Optimal parameters (10/50) show highest Sharpe of 1.08',
      'Stability score of 0.78 indicates robust parameter choice',
      'Performance degrades gracefully when moving away from optimum',
      'Short MA between 8-12 and Long MA between 45-55 all perform well',
    ],
    recommendation: {
      action: 'OPTIMAL',
      confidence: 'high',
      details: 'Parameters 10/50 MA are optimal and robust. Implement with standard position sizing. Consider adaptive adjustment if volatility regime shifts significantly.'
    }
  },

  'overfitting': {
    title: 'CSCV Overfitting Detection: MA Crossover Strategy',
    summary: 'Combinatorially Symmetric Cross-Validation to assess backtest reliability.',
    metrics: [
      { label: 'PBO', value: '0.28', status: 'positive', sublabel: 'Prob. of Overfitting' },
      { label: 'Degradation', value: '-8.2%', status: 'warning', sublabel: 'Expected OOS' },
      { label: 'Best IS Return', value: '+82.4%', status: 'neutral', sublabel: 'In-sample' },
      { label: 'Expected OOS', value: '+65.3%', status: 'positive', sublabel: 'Out-of-sample' },
    ],
    tables: [
      {
        title: 'CSCV Analysis Results',
        data: {
          headers: ['Metric', 'Value', 'Threshold', 'Assessment'],
          rows: [
            { cells: ['PBO', '0.28', '< 0.3', 'Low Risk ✓'] },
            { cells: ['Logit(PBO)', '-0.94', '< 0', 'Validated ✓'] },
            { cells: ['Performance Deg.', '-8.2%', '< 15%', 'Acceptable'] },
            { cells: ['IS Best', '+82.4%', 'N/A', 'Reference'] },
            { cells: ['Expected OOS', '+65.3%', 'N/A', 'Realistic'], highlight: true },
          ]
        }
      },
      {
        title: 'Strategy Trials Summary',
        data: {
          headers: ['Trial', 'IS Return', 'OOS Return', 'Rank Change'],
          rows: [
            { cells: ['Trial 1', '+78.2%', '+61.4%', '-2'] },
            { cells: ['Trial 2', '+82.4%', '+58.9%', '-3'] },
            { cells: ['Trial 3', '+75.6%', '+65.3%', '+1'] },
            { cells: ['Trial 4', '+79.8%', '+62.1%', '-1'] },
            { cells: ['Trial 5', '+81.2%', '+59.7%', '-2'] },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'bar',
        title: 'In-Sample vs Out-of-Sample Returns',
        data: [
          { label: 'IS Best', value: 82.4, color: '#10b981' },
          { label: 'Expected OOS', value: 65.3, color: '#6366f1' },
          { label: 'Degradation', value: -8.2, color: '#f59e0b' },
        ] as ChartDataPoint[]
      },
      {
        type: 'bar',
        title: 'PBO Distribution (Lower = Better)',
        data: [
          { label: 'This Strategy', value: 0.28, color: '#10b981' },
          { label: 'Warning (0.3-0.5)', value: 0.4, color: '#f59e0b' },
          { label: 'Danger (> 0.5)', value: 0.6, color: '#ef4444' },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'PBO of 0.28 indicates low probability of backtest overfitting',
      'Expected performance degradation of 8.2% is within acceptable range',
      'Strategy likely to generalize well to unseen data',
      'IS-to-OOS rank correlation positive - consistent performance',
    ],
    recommendation: {
      action: 'VALIDATED',
      confidence: 'high',
      details: 'Strategy passes CSCV overfitting test. PBO < 0.3 confirms robustness. Expected live performance: ~65% return vs 82% backtest. Safe to deploy with standard risk controls.'
    }
  },

  'workflows': {
    title: 'Full Workflow: SPY Strategy Development Pipeline',
    summary: 'End-to-end strategy validation combining multiple analytical tools.',
    metrics: [
      { label: 'Strategy Sharpe', value: '1.24', status: 'positive', sublabel: 'Risk-adjusted' },
      { label: 'Overfit Risk', value: 'LOW', status: 'positive', sublabel: 'PBO: 0.24' },
      { label: 'Live Expected', value: '+68.4%', status: 'positive', sublabel: 'After degradation' },
      { label: 'Recommendation', value: 'APPROVED', status: 'positive', sublabel: 'Deploy ready' },
    ],
    tables: [
      {
        title: 'Pipeline Stages',
        data: {
          headers: ['Stage', 'Tool', 'Result', 'Status'],
          rows: [
            { cells: ['1. Idea Gen', 'Hurst Exp', 'H=0.48, Mean-reverting', 'PASS ✓'] },
            { cells: ['2. Backtest', 'MA Crossover', 'IS Return: +74.2%', 'PASS ✓'] },
            { cells: ['3. Cost Analysis', 'TX Costs', 'Net Return: +68.4%', 'PASS ✓'] },
            { cells: ['4. Overfit Test', 'CSCV', 'PBO: 0.24', 'PASS ✓'], highlight: true },
            { cells: ['5. CV Validate', 'Purged CV', 'IC: 0.072', 'PASS ✓'] },
          ]
        }
      },
      {
        title: 'Final Performance Summary',
        data: {
          headers: ['Metric', 'Gross', 'Net (Costs)', 'Expected Live'],
          rows: [
            { cells: ['Total Return', '+74.2%', '+68.4%', '+65.1%'] },
            { cells: ['Sharpe Ratio', '1.38', '1.24', '1.18'] },
            { cells: ['Max Drawdown', '-17.2%', '-18.4%', '-20.0%'] },
            { cells: ['Win Rate', '56.2%', '54.8%', '53.0%'] },
          ]
        }
      }
    ],
    charts: [
      {
        type: 'bar',
        title: 'Pipeline Performance at Each Stage',
        data: [
          { label: 'Gross', value: 74.2, color: '#10b981' },
          { label: 'Net Costs', value: 68.4, color: '#6366f1' },
          { label: 'Expected Live', value: 65.1, color: '#f59e0b' },
        ] as ChartDataPoint[]
      },
      {
        type: 'bar',
        title: 'Risk-Adjusted Metrics',
        data: [
          { label: 'Sharpe', value: 1.24, color: '#10b981' },
          { label: 'Sortino', value: 1.56, color: '#6366f1' },
          { label: 'Calmar', value: 0.89, color: '#f59e0b' },
        ] as ChartDataPoint[]
      }
    ],
    insights: [
      'Strategy passes all 5 validation stages with acceptable margins',
      'Expected live return of 65.1% after all adjustments',
      'PBO of 0.24 indicates low overfitting risk - high confidence in results',
      'Transaction costs reduce returns by 5.8% - optimize trade frequency',
    ],
    recommendation: {
      action: 'DEPLOY',
      confidence: 'high',
      details: 'Strategy approved for deployment. Recommended position size: 15% of portfolio. Implement with paper trading for 2 weeks, then gradual capital allocation. Review performance monthly.'
    }
  }
}

// Tool Categories Data
const toolCategories = [
  {
    id: 'sarimax',
    title: 'SARIMAX',
    subtitle: 'Seasonal Forecasting with Exogenous Variables',
    icon: TrendingUp,
    color: 'from-emerald-500 to-teal-500',
    description: 'Forecast asset prices with seasonal patterns and external factors like oil prices, sector ETFs, and macro indicators.',
    queries: [
      { title: 'Energy Sector Forecast', prompt: 'Use SARIMAX to forecast XOM (ExxonMobil) stock price for the next 10 trading days, including CL (Crude Oil WTI) as an exogenous variable.' },
      { title: 'Tech Sector with Semiconductor Input', prompt: 'Fit a SARIMAX model forecasting NVDA using SOXL (semiconductor ETF) as an exogenous regressor. Use 2 years of daily data.' }
    ]
  },
  {
    id: 'vecm',
    title: 'VECM',
    subtitle: 'Cointegration & Pairs Trading',
    icon: GitBranch,
    color: 'from-blue-500 to-indigo-500',
    description: 'Identify long-run equilibrium relationships between assets for pairs trading and mean-reverting strategies.',
    queries: [
      { title: 'Coca-Cola vs Pepsi Pairs Trading', prompt: 'Fit a VECM model for KO and PEP to identify their cointegration relationship for a pairs trading strategy.' },
      { title: 'Energy Sector Cointegration', prompt: 'Run a VECM analysis on XOM, CVX, and COP (major energy stocks) for a mean-reverting portfolio strategy.' },
      { title: 'Gold Miners Cointegration', prompt: 'Analyze the cointegration between GDX, GLD, and GDXJ using VECM.' }
    ]
  },
  {
    id: 'gjr-garch',
    title: 'GJR-GARCH',
    subtitle: 'Asymmetric Volatility Modeling',
    icon: Activity,
    color: 'from-red-500 to-orange-500',
    description: 'Model the leverage effect where negative shocks impact volatility more than positive shocks of equal magnitude.',
    queries: [
      { title: 'Leverage Effect in Tech Stocks', prompt: 'Fit a GJR-GARCH model to TSLA to quantify the leverage effect.' },
      { title: 'Volatility Asymmetry Comparison', prompt: 'Compare the leverage effect between SPY and QQQ using GJR-GARCH.' },
      { title: 'Financial Sector Volatility', prompt: 'Model the asymmetric volatility of JPM using GJR-GARCH for risk management.' }
    ]
  },
  {
    id: 'har',
    title: 'HAR Model',
    subtitle: 'Realized Volatility',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    description: 'Decompose realized volatility into daily, weekly, and monthly components to understand long-memory effects.',
    queries: [
      { title: 'Multi-Horizon Volatility Decomposition', prompt: 'Fit a HAR model to SPY to decompose realized volatility into daily, weekly, and monthly components.' },
      { title: 'Cross-Asset Volatility Comparison', prompt: 'Compare HAR model forecasts for BTC-USD vs GLD.' }
    ]
  },
  {
    id: 'spillover',
    title: 'Spillover Index',
    subtitle: 'Diebold-Yilmaz Connectedness',
    icon: Network,
    color: 'from-cyan-500 to-blue-500',
    description: 'Analyze systemic risk and shock transmission between assets using network analysis.',
    queries: [
      { title: 'Banking Sector Systemic Risk', prompt: 'Calculate the Diebold-Yilmaz spillover index for JPM, BAC, WFC, C, and GS (major US banks).' },
      { title: 'Cross-Asset Contagion', prompt: 'Analyze spillovers between SPY, TLT, GLD, and BTC-USD.' },
      { title: 'Sector Rotation Spillovers', prompt: 'Calculate spillover indices for XLF, XLK, XLE, XLV, and XLY.' }
    ]
  },
  {
    id: 'impulse',
    title: 'Impulse Response',
    subtitle: 'Shock Transmission Analysis',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
    description: 'Trace how shocks to one asset propagate through the system over time.',
    queries: [
      { title: 'Fed Policy Transmission', prompt: 'Analyze the impulse response of SPY to a shock in TLT (Treasury yields proxy).' },
      { title: 'Oil-to-Energy Transmission', prompt: 'Run an impulse response analysis showing how a shock to USO affects XOM.' },
      { title: 'Crypto-to-Tech Transmission', prompt: 'Analyze the impulse response of QQQ to a shock in BTC-USD.' }
    ]
  },
  {
    id: 'combined',
    title: 'Multi-Tool Analysis',
    subtitle: 'Combined Workflows',
    icon: Layers,
    color: 'from-indigo-500 to-violet-500',
    description: 'Complex analysis pipelines combining multiple econometric tools for comprehensive insights.',
    queries: [
      { title: 'Full Volatility Pipeline', prompt: 'For AAPL, run GJR-GARCH and HAR model analysis with volatility forecasts.' },
      { title: 'Pairs Trading Research', prompt: 'For a pairs trading strategy between CVX and XOM: test cointegration and calculate hedge ratios.' },
      { title: 'Systemic Risk Dashboard', prompt: 'Build a systemic risk dashboard for the financial sector.' }
    ]
  },
  {
    id: 'risk',
    title: 'Risk Management',
    subtitle: 'Advanced Risk Analytics',
    icon: Shield,
    color: 'from-rose-500 to-red-500',
    description: 'Comprehensive risk assessment including tail risk, volatility regimes, and market connectedness.',
    queries: [
      { title: 'Tail Risk & Volatility Integration', prompt: 'For a risk report on QQQ: calculate tail risk metrics and fit GJR-GARCH.' },
      { title: 'Volatility Regime Detection', prompt: 'For SPY: detect Markov regimes and analyze current volatility regime.' }
    ]
  },
  {
    id: 'strategy',
    title: 'Strategy Development',
    subtitle: 'Quantitative Trading Strategies',
    icon: LineChartIcon,
    color: 'from-green-500 to-emerald-500',
    description: 'Research and validate mean-reversion and volatility trading strategies.',
    queries: [
      { title: 'Mean-Reversion Strategy Research', prompt: 'For a mean-reversion strategy on GLD: calculate Hurst exponent and half-life.' },
      { title: 'Volatility Trading Strategy', prompt: 'For a volatility trading strategy on VIX-related products.' }
    ]
  },
  {
    id: 'macro',
    title: 'Macro-Financial',
    subtitle: 'Interest Rate & Inflation Analysis',
    icon: Building2,
    color: 'from-slate-500 to-zinc-500',
    description: 'Analyze interest rate sensitivity and inflation hedging across asset classes.',
    queries: [
      { title: 'Interest Rate Sensitivity', prompt: 'Analyze interest rate sensitivity across sectors using spillover index.' },
      { title: 'Inflation Hedge Analysis', prompt: 'For inflation hedging research: fit VECM for TIP, GLD, IEF, and VNQ.' }
    ]
  },
  {
    id: 'backtest',
    title: 'Backtesting',
    subtitle: 'Transaction Cost Analysis',
    icon: TestTube,
    color: 'from-teal-500 to-cyan-500',
    description: 'Realistic backtesting with transaction costs, slippage models, and execution analysis.',
    queries: [
      { title: 'Transaction Cost Impact', prompt: 'Backtest a moving average crossover strategy on SPY with realistic transaction costs.' },
      { title: 'Strategy Comparison with Costs', prompt: 'Compare three strategies on QQQ with transaction costs and slippage.' },
      { title: 'HFT Cost Analysis', prompt: 'Analyze transaction costs for a high-turnover RSI mean reversion strategy.' }
    ]
  },
  {
    id: 'purged-cv',
    title: 'Purged Cross-Validation',
    subtitle: 'ML Model Validation',
    icon: FlaskConical,
    color: 'from-violet-500 to-purple-500',
    description: 'Prevent data leakage in time-series cross-validation for machine learning models.',
    queries: [
      { title: 'ML Model Validation', prompt: 'Run purged cross-validation on SPY using XGBoost to predict 5-day forward returns.' },
      { title: 'Model Comparison', prompt: 'Compare XGBoost, Random Forest, and Linear Regression using purged cross-validation.' }
    ]
  },
  {
    id: 'sensitivity',
    title: 'Parameter Sensitivity',
    subtitle: 'Optimization & Robustness',
    icon: Settings,
    color: 'from-orange-500 to-yellow-500',
    description: 'Analyze strategy performance across parameter ranges to identify optimal settings.',
    queries: [
      { title: 'MA Crossover Optimization', prompt: 'Run parameter sensitivity analysis for MA crossover on SPY.' },
      { title: 'Strategy Robustness Check', prompt: 'Analyze parameter sensitivity of RSI mean reversion on GLD.' }
    ]
  },
  {
    id: 'overfitting',
    title: 'Overfitting Detection',
    subtitle: 'CSCV Framework',
    icon: AlertTriangle,
    color: 'from-red-600 to-rose-500',
    description: 'Detect backtest overfitting using Combinatorially Symmetric Cross-Validation.',
    queries: [
      { title: 'Overfitting Risk Assessment', prompt: 'Detect backtest overfitting for MA crossover on SPY using CSCV.' },
      { title: 'Performance Degradation', prompt: 'Estimate expected performance degradation using CSCV.' }
    ]
  },
  {
    id: 'workflows',
    title: 'Full Workflows',
    subtitle: 'End-to-End Analysis',
    icon: Database,
    color: 'from-sky-500 to-blue-500',
    description: 'Complete analytical workflows combining multiple tools for comprehensive strategy validation.',
    queries: [
      { title: 'Full Strategy Development', prompt: 'Develop and validate a trading strategy for SPY with full analysis pipeline.' },
      { title: 'Multi-Strategy Portfolio', prompt: 'Compare three strategies for portfolio allocation.' },
      { title: 'Sector Rotation Strategy', prompt: 'Backtest a sector rotation strategy using MA crossover.' }
    ]
  }
]

// Tool Reference Table Data
const toolReference = [
  { tool: 'fit_sarimax', bestFor: 'Seasonal forecasting with external factors', keyOutput: 'Price forecasts, model diagnostics' },
  { tool: 'fit_vecm', bestFor: 'Pairs trading, cointegration', keyOutput: 'Hedge ratio, adjustment speeds' },
  { tool: 'fit_gjr_garch', bestFor: 'Asymmetric volatility, leverage effect', keyOutput: 'Volatility forecast, asymmetry ratio' },
  { tool: 'fit_har_model', bestFor: 'Realized volatility, long memory', keyOutput: 'Horizon decomposition, vol forecast' },
  { tool: 'calculate_spillover_index', bestFor: 'Systemic risk, connectedness', keyOutput: 'Total/directional spillovers' },
  { tool: 'analyze_impulse_response', bestFor: 'Transmission mechanisms', keyOutput: 'Peak response, decay period' },
  { tool: 'backtest_with_costs', bestFor: 'Realistic cost analysis', keyOutput: 'Net/gross returns, cost breakdown' },
  { tool: 'purged_cross_validation', bestFor: 'ML model validation', keyOutput: 'IC, leakage detection' },
  { tool: 'parameter_sensitivity_analysis', bestFor: 'Parameter optimization', keyOutput: 'Optimal params, stability scores' },
  { tool: 'detect_backtest_overfitting', bestFor: 'Strategy robustness', keyOutput: 'PBO, degradation estimate' },
]

// Chart Components
function BarChart({ data, title }: { data: ChartDataPoint[]; title: string }) {
  const maxValue = Math.max(...data.map(d => Math.abs(d.value)))
  
  return (
    <div className="bg-surface-800 rounded-xl p-4 border border-border">
      <h4 className="text-sm font-medium text-content-tertiary mb-4">{title}</h4>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-content-secondary">{item.label}</span>
              <span className={cn(
                "font-medium",
                item.value >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {item.value >= 0 ? '+' : ''}{item.value.toFixed(1)}{title.includes('%') ? '%' : ''}
              </span>
            </div>
            <div className="h-2 bg-surface-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color || (item.value >= 0 ? '#10b981' : '#ef4444') }}
                initial={{ width: 0 }}
                animate={{ width: `${(Math.abs(item.value) / maxValue) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LineChart({ data, title }: { data: ChartDataPoint[]; title: string }) {
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue
  const height = 120
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = height - ((d.value - minValue) / range) * (height - 20) - 10
    return `${x},${y}`
  }).join(' ')
  
  const areaPoints = `0,${height} ${points} 100,${height}`

  return (
    <div className="bg-surface-800 rounded-xl p-4 border border-border">
      <h4 className="text-sm font-medium text-content-tertiary mb-4">{title}</h4>
      <div className="relative h-32">
        <svg viewBox="0 0 100 120" className="w-full h-full" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="0" y1={y * 1.2} x2="100" y2={y * 1.2} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          ))}
          
          {/* Area fill */}
          <motion.polygon
            points={areaPoints}
            fill="url(#gradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Line */}
          <motion.polyline
            points={points}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Data points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100
          const y = height - ((d.value - minValue) / range) * (height - 20) - 10
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full"
              style={{ left: `${x}%`, top: `${(y / height) * 100}%`, transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          )
        })}
      </div>
      
      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs text-content-tertiary">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  )
}

function ForecastChart({ data, title }: { data: ForecastPoint[]; title: string }) {
  const maxPrice = Math.max(...data.map(d => d.upper))
  const minPrice = Math.min(...data.map(d => d.lower))
  const range = maxPrice - minPrice
  const height = 150

  const getY = (value: number) => height - ((value - minPrice) / range) * (height - 30) - 15

  return (
    <div className="bg-surface-800 rounded-xl p-4 border border-border">
      <h4 className="text-sm font-medium text-content-tertiary mb-4">{title}</h4>
      <div className="relative h-40">
        <svg viewBox={`0 0 ${data.length * 10} ${height}`} className="w-full h-full" preserveAspectRatio="none">
          {/* Confidence interval area */}
          <motion.path
            d={`M${data[0].day * 10},${getY(data[0].upper)} ${data.map(d => `L${d.day * 10},${getY(d.upper)}`).join(' ')} ${data.slice().reverse().map(d => `L${d.day * 10},${getY(d.lower)}`).join(' ')} Z`}
            fill="rgba(99, 102, 241, 0.2)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Upper bound */}
          <motion.polyline
            points={data.map(d => `${d.day * 10},${getY(d.upper)}`).join(' ')}
            fill="none"
            stroke="rgba(99, 102, 241, 0.5)"
            strokeWidth="1"
            strokeDasharray="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Lower bound */}
          <motion.polyline
            points={data.map(d => `${d.day * 10},${getY(d.lower)}`).join(' ')}
            fill="none"
            stroke="rgba(99, 102, 241, 0.5)"
            strokeWidth="1"
            strokeDasharray="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Forecast line */}
          <motion.polyline
            points={data.map(d => `${d.day * 10},${getY(d.forecast)}`).join(' ')}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          
          {/* Current price marker */}
          <circle cx="0" cy={getY(data[0].forecast)} r="4" fill="#fff" />
        </svg>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-3 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-emerald-500 rounded" />
          <span className="text-content-tertiary">Forecast</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-indigo-500/20 rounded border border-indigo-500/50" />
          <span className="text-content-tertiary">95% CI</span>
        </div>
      </div>
    </div>
  )
}

function SpilloverMatrix({ data, labels, title }: { data: number[][]; labels: string[]; title: string }) {
  const maxVal = Math.max(...data.flat().filter(v => v > 0))
  
  return (
    <div className="bg-surface-800 rounded-xl p-4 border border-border">
      <h4 className="text-sm font-medium text-content-tertiary mb-4">{title}</h4>
      <div className="overflow-x-auto">
        <div className="min-w-[280px]">
          {/* Header row */}
          <div className="flex">
            <div className="w-12" />
            {labels.map((label, i) => (
              <div key={i} className="flex-1 text-center text-xs font-medium text-content-secondary py-1">
                {label}
              </div>
            ))}
          </div>
          
          {/* Matrix rows */}
          {data.map((row, i) => (
            <div key={i} className="flex items-center">
              <div className="w-12 text-xs font-medium text-content-secondary text-right pr-2">
                {labels[i]}
              </div>
              <div className="flex-1 flex">
                {row.map((val, j) => (
                  <motion.div
                    key={j}
                    className="flex-1 h-10 flex items-center justify-center text-xs font-medium border border-surface-700"
                    style={{
                      backgroundColor: i === j ? 'transparent' : `rgba(99, 102, 241, ${val / maxVal * 0.8})`,
                      color: val > maxVal * 0.5 ? '#fff' : 'rgba(255,255,255,0.7)'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (i * 5 + j) * 0.02 }}
                  >
                    {i === j ? '—' : `${val.toFixed(1)}%`}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-2 mt-3 text-xs text-content-tertiary">
        <span>Low</span>
        <div className="w-20 h-2 rounded bg-gradient-to-r from-surface-700 to-indigo-500" />
        <span>High</span>
      </div>
    </div>
  )
}

// Metric Card Component
function MetricCard({ metric }: { metric: MetricCard }) {
  return (
    <motion.div
      className="bg-surface-800 rounded-xl p-4 border border-border"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-xs text-content-tertiary mb-1">{metric.label}</div>
      <div className={cn(
        "text-xl font-bold",
        metric.status === 'positive' && "text-green-400",
        metric.status === 'negative' && "text-red-400",
        metric.status === 'warning' && "text-amber-400",
        metric.status === 'neutral' && "text-content-primary"
      )}>
        {metric.value}
      </div>
      {metric.sublabel && (
        <div className="text-xs text-content-tertiary mt-1">{metric.sublabel}</div>
      )}
    </motion.div>
  )
}

// Data Table Component
function DataTable({ table }: { table: { title: string; data: DataTable } }) {
  return (
    <div className="bg-surface-800 rounded-xl border border-border overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h4 className="text-sm font-medium text-content-primary">{table.title}</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-900/50">
              {table.data.headers.map((header, i) => (
                <th key={i} className="text-left text-xs font-medium text-content-tertiary px-4 py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {table.data.rows.map((row, i) => (
              <motion.tr
                key={i}
                className={cn(
                  "hover:bg-surface-700/30 transition-colors",
                  row.highlight && "bg-accent/10"
                )}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {row.cells.map((cell, j) => (
                  <td key={j} className="px-4 py-2.5 text-sm text-content-secondary">
                    {j === 0 ? (
                      <span className="font-medium text-content-primary">{cell}</span>
                    ) : (
                      <>
                        {typeof cell === 'string' && cell.includes('***') ? (
                          <span className="text-green-400">{cell}</span>
                        ) : typeof cell === 'string' && cell.includes('*') ? (
                          <span className="text-emerald-400">{cell}</span>
                        ) : typeof cell === 'string' && cell.startsWith('+') ? (
                          <span className="text-green-400">{cell}</span>
                        ) : typeof cell === 'string' && cell.startsWith('-') && !cell.includes('%') ? (
                          <span className="text-amber-400">{cell}</span>
                        ) : typeof cell === 'string' && cell.includes('TRANSMITTER') ? (
                          <span className="text-green-400 font-medium">{cell}</span>
                        ) : typeof cell === 'string' && cell.includes('RECEIVER') ? (
                          <span className="text-red-400 font-medium">{cell}</span>
                        ) : typeof cell === 'string' && cell.includes('High') ? (
                          <span className="text-amber-400">{cell}</span>
                        ) : (
                          cell
                        )}
                      </>
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Insight Card Component
function InsightCard({ insight, index }: { insight: string; index: number }) {
  return (
    <motion.div
      className="flex items-start gap-3 p-3 bg-surface-800/50 rounded-lg border border-border"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Check className="w-3 h-3 text-accent" />
      </div>
      <p className="text-sm text-content-secondary">{insight}</p>
    </motion.div>
  )
}

// Recommendation Banner Component
function RecommendationBanner({ recommendation }: { recommendation: { action: string; confidence: string; details: string } }) {
  const getActionStyle = (action: string) => {
    switch (action.toUpperCase()) {
      case 'BULLISH':
      case 'BUY':
      case 'VIABLE':
        return { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400', icon: TrendingUp }
      case 'BEARISH':
      case 'SELL':
        return { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-400', icon: TrendingDown }
      case 'WAIT':
      case 'HOLD':
        return { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-400', icon: Minus }
      case 'CAUTION':
      case 'MONITOR':
        return { bg: 'bg-orange-500/20', border: 'border-orange-500/30', text: 'text-orange-400', icon: AlertCircle }
      default:
        return { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-400', icon: Info }
    }
  }

  const style = getActionStyle(recommendation.action)
  const Icon = style.icon

  return (
    <motion.div
      className={cn("rounded-xl p-4 border", style.bg, style.border)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", style.bg)}>
          <Icon className={cn("w-4 h-4", style.text)} />
        </div>
        <div>
          <span className={cn("text-lg font-bold", style.text)}>{recommendation.action}</span>
          <span className="text-xs text-content-tertiary ml-2">
            {recommendation.confidence.toUpperCase()} CONFIDENCE
          </span>
        </div>
      </div>
      <p className="text-sm text-content-secondary">{recommendation.details}</p>
    </motion.div>
  )
}

// Structured Response Renderer Component
function StructuredResponseRenderer({ response }: { response: StructuredResponse }) {
  return (
    <div className="space-y-6">
      {/* Title & Summary */}
      <div>
        <h3 className="text-lg font-semibold text-content-primary mb-2">{response.title}</h3>
        <p className="text-sm text-content-secondary">{response.summary}</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {response.metrics.map((metric, i) => (
          <MetricCard key={i} metric={metric} />
        ))}
      </div>

      {/* Charts */}
      {response.charts.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {response.charts.map((chart, i) => {
            switch (chart.type) {
              case 'bar':
                return <BarChart key={i} data={chart.data as ChartDataPoint[]} title={chart.title} />
              case 'line':
                return <LineChart key={i} data={chart.data as ChartDataPoint[]} title={chart.title} />
              case 'forecast':
                return <ForecastChart key={i} data={chart.data as ForecastPoint[]} title={chart.title} />
              case 'spillover':
                return <SpilloverMatrix key={i} data={chart.data as number[][]} labels={chart.labels || []} title={chart.title} />
              default:
                return null
            }
          })}
        </div>
      )}

      {/* Tables */}
      <div className="grid md:grid-cols-2 gap-4">
        {response.tables.map((table, i) => (
          <DataTable key={i} table={{ title: table.title, data: table.data }} />
        ))}
      </div>

      {/* Insights */}
      <div>
        <h4 className="text-sm font-medium text-content-tertiary mb-3 uppercase tracking-wider">Key Insights</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {response.insights.map((insight, i) => (
            <InsightCard key={i} insight={insight} index={i} />
          ))}
        </div>
      </div>

      {/* Recommendation */}
      {response.recommendation && (
        <RecommendationBanner recommendation={response.recommendation} />
      )}
    </div>
  )
}

// Category Card Component
function CategoryCard({ 
  category, 
  index, 
  onSelect 
}: { 
  category: typeof toolCategories[0]
  index: number
  onSelect: () => void
}) {
  const [isHovered, setIsHovered] = React.useState(false)
  const Icon = category.icon

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onSelect}
    >
      {/* Glow effect */}
      <div 
        className={cn(
          "absolute -inset-0.5 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500",
          category.color
        )}
        style={{ opacity: isHovered ? 0.3 : 0 }}
      />
      
      {/* Animated border */}
      <div className={cn(
        "absolute -inset-px rounded-2xl transition-all duration-300",
        isHovered 
          ? `bg-gradient-to-r ${category.color} opacity-100` 
          : "bg-transparent"
      )}>
        <div className="absolute inset-0 rounded-2xl bg-surface-800" />
      </div>

      {/* Card content */}
      <div className="relative h-full bg-surface-800 rounded-2xl p-6 overflow-hidden">
        {/* Background gradient */}
        <div className={cn(
          "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl transition-opacity duration-500",
          `bg-gradient-to-br ${category.color}`,
          isHovered ? "opacity-20" : "opacity-10"
        )} />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
            `bg-gradient-to-br ${category.color}`,
            isHovered && "scale-110 shadow-lg"
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-content-tertiary">
            {category.queries.length} queries
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-content-primary mb-1">
          {category.title}
        </h3>
        <p className="text-sm text-accent mb-3">{category.subtitle}</p>

        {/* Description */}
        <p className="text-sm text-content-secondary line-clamp-2 mb-4">
          {category.description}
        </p>

        {/* Query Preview */}
        <div className="space-y-1.5">
          {category.queries.slice(0, 2).map((query, i) => (
            <div 
              key={i}
              className="text-xs text-content-tertiary truncate flex items-center gap-1.5"
            >
              <ChevronRight className="w-3 h-3 text-accent flex-shrink-0" />
              <span>{query.title}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <button className={cn(
            "w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2",
            isHovered 
              ? `bg-gradient-to-r ${category.color} text-white` 
              : "bg-surface-700 text-content-secondary"
          )}>
            <Play className="w-4 h-4" />
            Explore Queries
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Query Modal Component
function QueryModal({
  category,
  isOpen,
  onClose
}: {
  category: typeof toolCategories[0] | null
  isOpen: boolean
  onClose: () => void
}) {
  const [selectedQuery, setSelectedQuery] = React.useState<{ title: string; prompt: string } | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [response, setResponse] = React.useState<StructuredResponse | null>(null)

  React.useEffect(() => {
    if (category && category.queries.length > 0) {
      setSelectedQuery(category.queries[0])
    }
    setResponse(null)
  }, [category])

  const handleRunQuery = () => {
    if (!category) return
    
    setIsLoading(true)
    setResponse(null)

    // Simulate loading
    setTimeout(() => {
      const responseData = demoResponsesData[category.id]
      if (responseData) {
        setResponse(responseData)
      } else {
        // Generic response for categories without specific demo
        setResponse({
          title: `${category.title} Analysis Complete`,
          summary: category.description,
          metrics: [
            { label: 'Status', value: 'Complete', status: 'positive' },
            { label: 'Confidence', value: 'High', status: 'positive' },
          ],
          tables: [],
          charts: [],
          insights: [
            'Analysis completed successfully',
            'Results are statistically significant',
            'Consider consulting with risk management team',
          ],
          recommendation: {
            action: 'ANALYZE',
            confidence: 'medium',
            details: 'Full analysis available in production environment. Contact us for complete results.'
          }
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  if (!category) return null

  const Icon = category.icon

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
            className="fixed inset-4 md:inset-6 lg:inset-8 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-surface-900 rounded-2xl border border-border overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-border bg-surface-900/80 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center",
                    `bg-gradient-to-br ${category.color}`
                  )}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-content-primary">{category.title}</h2>
                    <p className="text-sm text-accent">{category.subtitle}</p>
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
              <div className="flex-1 flex overflow-hidden">
                {/* Query List */}
                <div className="w-full md:w-72 border-r border-border overflow-y-auto p-4 bg-surface-800/50">
                  <h3 className="text-xs font-medium text-content-tertiary mb-3 uppercase tracking-wider">
                    Demo Queries ({category.queries.length})
                  </h3>
                  <div className="space-y-2">
                    {category.queries.map((query, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedQuery(query)
                          setResponse(null)
                        }}
                        className={cn(
                          "w-full text-left p-3 rounded-lg transition-all duration-200",
                          selectedQuery === query
                            ? "bg-accent/20 border border-accent/30"
                            : "bg-surface-700/50 hover:bg-surface-700 border border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Terminal className={cn(
                            "w-4 h-4",
                            selectedQuery === query ? "text-accent" : "text-content-tertiary"
                          )} />
                          <span className={cn(
                            "text-sm font-medium",
                            selectedQuery === query ? "text-accent" : "text-content-primary"
                          )}>
                            {query.title}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Query Detail & Response */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Query Display */}
                  {selectedQuery && (
                    <div className="p-4 border-b border-border bg-surface-800/30">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xs font-medium text-content-tertiary mb-2 uppercase tracking-wider">Query Prompt</h3>
                          <p className="text-sm text-content-primary bg-surface-800 p-3 rounded-lg border border-border">
                            {selectedQuery.prompt}
                          </p>
                        </div>
                        <button
                          onClick={handleRunQuery}
                          disabled={isLoading}
                          className={cn(
                            "px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 flex-shrink-0",
                            `bg-gradient-to-r ${category.color} text-white hover:opacity-90`,
                            isLoading && "opacity-70 cursor-not-allowed"
                          )}
                        >
                          {isLoading ? (
                            <>
                              <motion.div
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              Run Analysis
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Response Area */}
                  <div className="flex-1 overflow-y-auto p-4 md:p-5">
                    {isLoading ? (
                      <div className="h-full flex flex-col items-center justify-center">
                        <motion.div
                          className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center mb-4",
                            `bg-gradient-to-br ${category.color} opacity-20`
                          )}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Icon className="w-8 h-8 text-white opacity-50" />
                        </motion.div>
                        <motion.p 
                          className="text-content-tertiary"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          Running {category.title} analysis...
                        </motion.p>
                      </div>
                    ) : response ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <StructuredResponseRenderer response={response} />
                      </motion.div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-center">
                        <div>
                          <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
                            `bg-gradient-to-br ${category.color} opacity-20`
                          )}>
                            <Icon className="w-8 h-8 text-white opacity-50" />
                          </div>
                          <p className="text-content-tertiary">Select a query and click "Run Analysis" to see results</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Floating Stats Component
function FloatingStats() {
  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {[
        { label: 'Econometric Tools', value: '79', suffix: '' },
        { label: 'Tool Categories', value: '15', suffix: '' },
        { label: 'Demo Queries', value: '46', suffix: '' },
        { label: 'Production Grade', value: '100', suffix: '%' },
      ].map((stat, i) => (
        <motion.div
          key={i}
          className="relative group"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-surface-800/50 border border-border rounded-xl p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold gradient-accent">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-xs text-content-tertiary mt-1">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Tool Reference Table Component
function ToolReferenceTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-surface-800/50 border border-border rounded-2xl overflow-hidden"
    >
      <div className="p-4 md:p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-content-primary">Tool Reference</h3>
        <p className="text-sm text-content-tertiary">Quick guide to available econometric tools</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-900/50">
              <th className="text-left text-xs font-medium text-content-tertiary uppercase tracking-wider px-4 md:px-6 py-3">Tool</th>
              <th className="text-left text-xs font-medium text-content-tertiary uppercase tracking-wider px-4 md:px-6 py-3">Best For</th>
              <th className="text-left text-xs font-medium text-content-tertiary uppercase tracking-wider px-4 md:px-6 py-3">Key Output</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {toolReference.map((tool, i) => (
              <motion.tr 
                key={i}
                className="hover:bg-surface-700/30 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <td className="px-4 md:px-6 py-3">
                  <code className="text-sm text-accent font-mono">{tool.tool}</code>
                </td>
                <td className="px-4 md:px-6 py-3 text-sm text-content-secondary">{tool.bestFor}</td>
                <td className="px-4 md:px-6 py-3 text-sm text-content-secondary">{tool.keyOutput}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

// Best Practices Section
function BestPractices() {
  const practices = [
    {
      title: 'Transaction Costs',
      icon: Settings,
      items: [
        { label: 'Linear slippage', desc: 'Simple, good for small trades' },
        { label: 'Square root slippage', desc: 'Market impact model, realistic for institutional' },
        { label: 'Almgren-Chriss', desc: 'Optimal execution, best for large orders' },
      ]
    },
    {
      title: 'Cross-Validation',
      icon: FlaskConical,
      items: [
        { label: 'Purge window', desc: 'Should be ≥ 2x prediction horizon' },
        { label: 'Embargo period', desc: '1-2% of test set size recommended' },
        { label: 'Leakage detection', desc: 'Critical for ML-based strategies' },
      ]
    },
    {
      title: 'Overfitting Detection',
      icon: AlertTriangle,
      items: [
        { label: 'PBO < 0.3', desc: 'Low risk, strategy likely robust' },
        { label: 'PBO 0.3-0.5', desc: 'Moderate risk, consider simplification' },
        { label: 'PBO > 0.5', desc: 'High risk, likely won\'t generalize' },
      ]
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-3 gap-6"
    >
      {practices.map((practice, i) => {
        const Icon = practice.icon
        return (
          <motion.div
            key={i}
            className="bg-surface-800/50 border border-border rounded-xl p-5"
            whileHover={{ borderColor: 'rgba(var(--accent-rgb), 0.3)' }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <h4 className="font-medium text-content-primary">{practice.title}</h4>
            </div>
            <div className="space-y-3">
              {practice.items.map((item, j) => (
                <div key={j} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-content-primary">{item.label}:</span>
                    <span className="text-sm text-content-secondary ml-1">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default function E3QuantHubPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<typeof toolCategories[0] | null>(null)

  return (
    <div className="relative bg-surface-900 min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0" />
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-radial-accent opacity-10 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-radial-data opacity-10 pointer-events-none z-0" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-r from-accent/20 to-accent/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-gradient-to-r from-accent/20 to-accent/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-28 pb-12 min-[800px]:pt-48 lg:pb-16">
          <div className="container-main">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-accent/10 border border-accent/20 mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-xs uppercase tracking-wider text-accent font-medium">Advanced Econometrics</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold text-content-primary mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                E3 Quant Hub
                <span className="block text-2xl lg:text-3xl font-medium text-content-secondary mt-2">
                  Production-Grade Econometrics & Backtesting
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-content-secondary text-base lg:text-lg max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                79 tools across 8 categories designed for BlackRock & Vanguard institutional clients. 
                From SARIMAX forecasting to CSCV overfitting detection, explore demo queries that showcase 
                institutional-grade quantitative analysis.
              </motion.p>

              <FloatingStats />
            </motion.div>
          </div>
        </section>

        {/* Tool Categories Grid */}
        <section className="py-12 lg:py-16">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl lg:text-3xl font-semibold text-content-primary mb-3">
                Tool Categories
              </h2>
              <p className="text-content-secondary max-w-xl mx-auto">
                Click any category to explore demo queries and see visualized analysis results
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolCategories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={index}
                  onSelect={() => setSelectedCategory(category)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tool Reference Table */}
        <section className="py-12 lg:py-16 border-t border-border">
          <div className="container-main">
            <ToolReferenceTable />
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-12 lg:py-16 border-t border-border">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl lg:text-3xl font-semibold text-content-primary mb-3">
                Best Practices
              </h2>
              <p className="text-content-secondary max-w-xl mx-auto">
                Guidelines for robust quantitative analysis
              </p>
            </motion.div>
            <BestPractices />
          </div>
        </section>

        {/* Target Clients Section */}
        <section className="py-12 lg:py-16 border-t border-border">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl lg:text-3xl font-semibold text-content-primary mb-3">
                Built for Institutional Clients
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: 'BlackRock',
                  subtitle: 'Aladdin Platform Users',
                  tools: ['Spillover Index - Systemic risk monitoring', 'VECM - Pairs trading & stat arb', 'Impulse Response - Factor transmission'],
                },
                {
                  name: 'Vanguard',
                  subtitle: 'Index Fund Managers',
                  tools: ['HAR Model - Volatility forecasting for index tracking', 'GJR-GARCH - Risk management for index funds', 'SARIMAX - Seasonal patterns in index flows'],
                }
              ].map((client, i) => (
                <motion.div
                  key={i}
                  className="bg-surface-800/50 border border-border rounded-xl p-6"
                  initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ borderColor: 'rgba(var(--accent-rgb), 0.3)' }}
                >
                  <h3 className="text-xl font-semibold text-content-primary mb-1">{client.name}</h3>
                  <p className="text-sm text-accent mb-4">{client.subtitle}</p>
                  <div className="space-y-2">
                    {client.tools.map((tool, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-content-secondary">{tool}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
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
              <h2 className="text-2xl lg:text-3xl font-semibold text-content-primary mb-4">
                Ready to Transform Your Quantitative Workflow?
              </h2>
              <p className="text-content-secondary mb-8">
                Access 79 production-grade econometric tools with natural language queries. 
                Schedule a consultation to deploy E3 Quant Hub in your infrastructure.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Schedule Consultation
                </Button>
                <Button variant="secondary" size="lg">
                  View Documentation
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Query Modal */}
      <QueryModal
        category={selectedCategory}
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </div>
  )
}
