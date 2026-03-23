'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'full'
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = 'div', size = 'default', children, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      default: 'max-w-7xl',
      lg: 'max-w-[1400px]',
      xl: 'max-w-[1600px]',
      full: 'max-w-full',
    }

    return (
      <Component
        ref={ref}
        className={cn('w-full mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Container.displayName = 'Container'

export { Container }
