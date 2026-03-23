'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'panel' | 'elevated' | 'interactive' | 'terminal' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const variants = {
      default: `
        relative
        bg-surface-800
        border border-border
        rounded-card
      `,
      panel: `
        relative
        bg-surface-800
        border border-border
        rounded-panel
        before:absolute before:inset-x-0 before:top-0 before:h-px
        before:bg-gradient-to-r before:from-transparent before:via-accent/30 before:to-transparent
      `,
      elevated: `
        relative
        bg-surface-700
        border border-border
        rounded-card
        shadow-elevated
      `,
      interactive: `
        relative
        bg-surface-800
        border border-border
        rounded-card
        transition-all duration-200 ease-out
        hover:border-border-hover
        hover:shadow-card-hover
        hover:-translate-y-0.5
        cursor-pointer
      `,
      terminal: `
        relative
        bg-surface-900
        border border-border
        rounded-panel
        font-mono
      `,
      glass: `
        relative
        bg-glass-medium
        backdrop-blur-md
        border border-border
        rounded-card
      `,
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={cn(
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card Header
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props} />
  )
)

CardHeader.displayName = 'CardHeader'

// Card Title
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 
      ref={ref} 
      className={cn('text-display-sm text-content-primary font-medium', className)} 
      {...props} 
    />
  )
)

CardTitle.displayName = 'CardTitle'

// Card Description
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p 
      ref={ref} 
      className={cn('text-body-sm text-content-secondary mt-1', className)} 
      {...props} 
    />
  )
)

CardDescription.displayName = 'CardDescription'

// Card Content
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
)

CardContent.displayName = 'CardContent'

// Card Footer
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn('pt-4 mt-4 border-t border-border', className)} 
      {...props} 
    />
  )
)

CardFooter.displayName = 'CardFooter'

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent, 
  CardFooter 
}
export type { CardProps }
