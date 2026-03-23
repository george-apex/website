'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// Metric display for data values
interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number
  label?: string
  change?: {
    value: number
    type: 'positive' | 'negative' | 'neutral'
  }
  size?: 'sm' | 'md' | 'lg'
  prefix?: string
  suffix?: string
}

const Metric = React.forwardRef<HTMLDivElement, MetricProps>(
  ({ 
    value, 
    label, 
    change, 
    size = 'md', 
    prefix, 
    suffix, 
    className, 
    ...props 
  }, ref) => {
    const sizes = {
      sm: 'text-body-lg font-medium',
      md: 'text-display-sm font-medium',
      lg: 'text-display-lg font-medium',
    }

    const changeColors = {
      positive: 'text-positive',
      negative: 'text-negative',
      neutral: 'text-content-secondary',
    }

    const changeIcons = {
      positive: '↑',
      negative: '↓',
      neutral: '→',
    }

    return (
      <div ref={ref} className={cn('space-y-1', className)} {...props}>
        <div className={cn('font-mono tabular-nums text-content-primary', sizes[size])}>
          {prefix && <span className="text-content-secondary">{prefix}</span>}
          {value}
          {suffix && <span className="text-content-secondary text-body-sm ml-1">{suffix}</span>}
        </div>
        {label && (
          <p className="text-body-sm text-content-secondary">{label}</p>
        )}
        {change && (
          <span className={cn('text-terminal-sm font-mono', changeColors[change.type])}>
            {changeIcons[change.type]} {change.value > 0 ? '+' : ''}{change.value}%
          </span>
        )}
      </div>
    )
  }
)

Metric.displayName = 'Metric'

// Data grid for displaying multiple metrics
interface DataGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
}

const DataGrid = React.forwardRef<HTMLDivElement, DataGridProps>(
  ({ columns = 4, gap = 'md', className, children, ...props }, ref) => {
    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-2 lg:grid-cols-4',
    }

    const gapClasses = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          columnClasses[columns],
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

DataGrid.displayName = 'DataGrid'

// Data table cell
interface DataCellProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
}

const DataCell = React.forwardRef<HTMLDivElement, DataCellProps>(
  ({ label, value, trend, className, ...props }, ref) => {
    const trendColors = {
      up: 'text-positive',
      down: 'text-negative',
      neutral: 'text-content-secondary',
    }

    return (
      <div ref={ref} className={cn('py-3', className)} {...props}>
        <p className="text-body-sm text-content-tertiary mb-1">{label}</p>
        <p className={cn(
          'font-mono tabular-nums text-content-primary',
          trend && trendColors[trend]
        )}>
          {value}
        </p>
      </div>
    )
  }
)

DataCell.displayName = 'DataCell'

// Live indicator
interface LiveIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean
}

const LiveIndicator = React.forwardRef<HTMLSpanElement, LiveIndicatorProps>(
  ({ active = true, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 px-2.5 py-1 rounded bg-surface-700 border border-border',
          className
        )}
        {...props}
      >
        <span className="relative flex h-2 w-2">
          {active && (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-positive" />
            </>
          )}
          {!active && (
            <span className="inline-flex rounded-full h-2 w-2 bg-content-tertiary" />
          )}
        </span>
        <span className="text-terminal-sm font-mono text-content-secondary">
          {children || (active ? 'LIVE' : 'OFFLINE')}
        </span>
      </span>
    )
  }
)

LiveIndicator.displayName = 'LiveIndicator'

export { Metric, DataGrid, DataCell, LiveIndicator }
export type { MetricProps, DataGridProps, DataCellProps, LiveIndicatorProps }
