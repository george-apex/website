'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'terminal'
  error?: boolean
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', error = false, icon, type = 'text', ...props }, ref) => {
    const variants = {
      default: `
        bg-surface-900
        border border-border
        text-content-primary
        placeholder:text-content-tertiary
        focus:border-accent
        focus:ring-1 focus:ring-accent/20
      `,
      terminal: `
        bg-surface-900
        border border-border
        font-mono text-terminal
        text-content-primary
        placeholder:text-content-tertiary
        focus:border-accent
        focus:ring-1 focus:ring-accent/20
      `,
    }

    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-content-tertiary">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'w-full px-3 py-2 rounded-card outline-none transition-all duration-200',
            variants[variant],
            error && 'border-negative focus:border-negative focus:ring-negative/20',
            icon && 'pl-10',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'

// Terminal-style input with prompt
interface TerminalInputProps extends Omit<InputProps, 'variant'> {
  prompt?: string
}

const TerminalInput = React.forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ prompt = '>', className, ...props }, ref) => {
    return (
      <div className="relative flex items-center bg-surface-900 border border-border rounded-card overflow-hidden focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/20 transition-all duration-200">
        <span className="text-accent font-mono text-terminal pl-3 select-none">
          {prompt}
        </span>
        <input
          type="text"
          className={cn(
            'flex-1 bg-transparent font-mono text-terminal text-content-primary',
            'placeholder:text-content-tertiary outline-none',
            'py-2 pr-3 pl-1',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

TerminalInput.displayName = 'TerminalInput'

export { Input, TerminalInput }
export type { InputProps, TerminalInputProps }
