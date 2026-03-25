'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'dark' | 'elevated'
  container?: boolean
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', container = true, children, ...props }, ref) => {
    const variants = {
      default: 'bg-surface-900',
      dark: 'bg-surface-900',
      elevated: 'bg-surface-800',
    }

    return (
      <section
        ref={ref}
        className={cn(
          'relative py-16 lg:py-24',
          variants[variant],
          className
        )}
        {...props}
      >
        {container ? (
          <div className="container-main">
            {children}
          </div>
        ) : (
          children
        )}
      </section>
    )
  }
)

Section.displayName = 'Section'

// Section Header
interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  label?: string
  title: React.ReactNode
  subtitle?: string
  align?: 'left' | 'center'
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ label, title, subtitle, align = 'left', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mb-12',
          align === 'center' && 'text-center mx-auto',
          align === 'left' && 'max-w-2xl',
          className
        )}
        {...props}
      >
        {label && (
          <span className="inline-block text-label font-medium text-accent mb-3">
            {label}
          </span>
        )}
        <h2 className="text-display-lg lg:text-display-xl text-content-primary font-medium mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-body-lg text-content-secondary max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    )
  }
)

SectionHeader.displayName = 'SectionHeader'

export { Section, SectionHeader }
export type { SectionProps, SectionHeaderProps }
