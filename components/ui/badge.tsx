'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'data' | 'positive' | 'warning' | 'negative' | 'outline'
  size?: 'sm' | 'md'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variants = {
      default: `
        bg-accent/10 
        text-accent 
        border border-accent/20
      `,
      data: `
        bg-data/10 
        text-data 
        border border-data/20
      `,
      positive: `
        bg-positive/10 
        text-positive 
        border border-positive/20
      `,
      warning: `
        bg-warning/10 
        text-warning 
        border border-warning/20
      `,
      negative: `
        bg-negative/10 
        text-negative 
        border border-negative/20
      `,
      outline: `
        bg-transparent 
        text-content-secondary 
        border border-border
      `,
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-terminal-sm',
      md: 'px-2.5 py-1 text-label',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

// Status indicator with dot
interface StatusBadgeProps extends BadgeProps {
  status?: 'active' | 'inactive' | 'pending'
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status = 'active', children, className, ...props }, ref) => {
    const statusStyles = {
      active: 'text-positive',
      inactive: 'text-content-tertiary',
      pending: 'text-warning',
    }

    const dotColors = {
      active: 'bg-positive',
      inactive: 'bg-content-tertiary',
      pending: 'bg-warning',
    }

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center gap-1.5', statusStyles[status], className)}
        {...props}
      >
        <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[status])} />
        {children}
      </span>
    )
  }
)

StatusBadge.displayName = 'StatusBadge'

export { Badge, StatusBadge }
export type { BadgeProps, StatusBadgeProps }
