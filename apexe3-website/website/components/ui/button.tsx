'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    icon, 
    iconPosition = 'right', 
    loading = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 
      font-medium transition-all duration-200 
      relative overflow-hidden
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-900
      disabled:opacity-50 disabled:pointer-events-none
    `

    const variants = {
      primary: `
        bg-accent text-black font-medium
        hover:bg-accent-light
        active:bg-accent-dark
        shadow-sm
      `,
      secondary: `
        bg-transparent
        border border-border-accent
        text-accent
        hover:bg-accent/8
        hover:border-accent
      `,
      outline: `
        bg-transparent
        border border-border
        text-content-secondary
        hover:text-content-primary
        hover:border-border-hover
        hover:bg-surface-700
      `,
      ghost: `
        bg-transparent
        text-content-secondary
        hover:text-content-primary
        hover:bg-surface-700
      `,
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-label rounded',
      md: 'px-5 py-2.5 text-body-sm rounded-card',
      lg: 'px-6 py-3 text-body-md rounded-card',
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg 
            className="animate-spin h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }
