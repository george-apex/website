'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// Terminal window container
interface TerminalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  variant?: 'default' | 'compact'
}

const TerminalWindow = React.forwardRef<HTMLDivElement, TerminalWindowProps>(
  ({ title, variant = 'default', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-surface-900 border border-border rounded-panel overflow-hidden',
          className
        )}
        {...props}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-800">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-negative/80" />
            <span className="w-3 h-3 rounded-full bg-warning/80" />
            <span className="w-3 h-3 rounded-full bg-positive/80" />
          </div>
          {title && (
            <span className="text-terminal-sm font-mono text-content-tertiary ml-2">
              {title}
            </span>
          )}
        </div>
        {/* Terminal content */}
        <div className={cn(
          'font-mono',
          variant === 'default' && 'p-4',
          variant === 'compact' && 'p-2'
        )}>
          {children}
        </div>
      </div>
    )
  }
)

TerminalWindow.displayName = 'TerminalWindow'

// Terminal line
interface TerminalLineProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'input' | 'output' | 'system' | 'error'
  prompt?: string
  showCursor?: boolean
}

const TerminalLine = React.forwardRef<HTMLDivElement, TerminalLineProps>(
  ({ type = 'output', prompt, showCursor = false, className, children, ...props }, ref) => {
    const typeStyles = {
      input: 'text-accent',
      output: 'text-content-primary',
      system: 'text-content-tertiary',
      error: 'text-negative',
    }

    const defaultPrompts = {
      input: '❯',
      output: '',
      system: '●',
      error: '✕',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start gap-2 text-terminal',
          typeStyles[type],
          className
        )}
        {...props}
      >
        <span className="text-content-tertiary flex-shrink-0">
          {prompt || defaultPrompts[type]}
        </span>
        <span className="flex-1">
          {children}
          {showCursor && (
            <span className="inline-block w-2 h-4 bg-accent ml-0.5 animate-pulse" />
          )}
        </span>
      </div>
    )
  }
)

TerminalLine.displayName = 'TerminalLine'

// Terminal typing animation
interface TypingTextProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  speed = 50,
  className,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = React.useState('')
  const [isComplete, setIsComplete] = React.useState(false)

  React.useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, onComplete])

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-2 h-4 bg-accent ml-0.5 animate-pulse" />
      )}
    </span>
  )
}

// Command badge for terminal
interface CommandBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  command: string
}

const CommandBadge = React.forwardRef<HTMLSpanElement, CommandBadgeProps>(
  ({ command, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-700',
          'font-mono text-terminal-sm text-content-secondary',
          'border border-border cursor-pointer',
          'hover:border-accent hover:text-accent transition-colors',
          className
        )}
        {...props}
      >
        <span className="text-accent">$</span>
        {command}
      </span>
    )
  }
)

CommandBadge.displayName = 'CommandBadge'

export { 
  TerminalWindow, 
  TerminalLine, 
  TypingText, 
  CommandBadge 
}
export type { 
  TerminalWindowProps, 
  TerminalLineProps, 
  TypingTextProps, 
  CommandBadgeProps 
}
