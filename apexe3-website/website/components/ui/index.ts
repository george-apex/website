// Core components
export { Button } from './button'
export type { ButtonProps } from './button'

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent, 
  CardFooter 
} from './card'
export type { CardProps } from './card'

export { Badge, StatusBadge } from './badge'
export type { BadgeProps, StatusBadgeProps } from './badge'

export { Input, TerminalInput } from './input'
export type { InputProps, TerminalInputProps } from './input'

// Layout components
export { Section, SectionHeader } from './section'
export type { SectionProps, SectionHeaderProps } from './section'

// Data display components
export { Metric, DataGrid, DataCell, LiveIndicator } from './data-display'
export type { 
  MetricProps, 
  DataGridProps, 
  DataCellProps, 
  LiveIndicatorProps 
} from './data-display'

// Terminal components
export { 
  TerminalWindow, 
  TerminalLine, 
  TypingText, 
  CommandBadge 
} from './terminal'
export type { 
  TerminalWindowProps, 
  TerminalLineProps, 
  TypingTextProps, 
  CommandBadgeProps 
} from './terminal'

// Interactive Terminal
export { InteractiveTerminal } from './interactive-terminal'
export type { InteractiveTerminalProps } from './interactive-terminal'

// Persona Switcher
export { PersonaSwitcher, PersonaSwitcherCompact, personas } from './persona-switcher'
export type { Persona } from './persona-switcher'

// Legacy exports for backwards compatibility
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'
