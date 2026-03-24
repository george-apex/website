import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Institutional dark palette - Bloomberg/Palantir inspired
        'surface': {
          '900': '#0A0B0D',  // Darkest - main background
          '800': '#0F1012',  // Card backgrounds
          '700': '#141517',  // Elevated surfaces
          '600': '#1A1B1E',  // Hover states
          '500': '#222428',  // Borders
        },
        
        // Primary accent - blue
        'accent': {
          'DEFAULT': '#306BFF',    // Primary blue
          'light': '#6B9FFF',      // Lighter blue
          'dark': '#1E4DB3',       // Darker blue
          'glow': 'rgba(48, 107, 255, 0.15)',
        },
        
        // Success/positive
        'positive': {
          DEFAULT: '#2ECC71',
          light: '#58D68D',
          glow: 'rgba(46, 204, 113, 0.12)',
        },
        
        // Warning/caution
        'warning': {
          DEFAULT: '#F39C12',
          light: '#F5B041',
          glow: 'rgba(243, 156, 18, 0.12)',
        },
        
        // Negative/risk
        'negative': {
          DEFAULT: '#E74C3C',
          light: '#EC7063',
          glow: 'rgba(231, 76, 60, 0.12)',
        },
        
        // Text hierarchy - refined
        'content': {
          'primary': '#FFFFFF',
          'secondary': '#A0A4A8',    // Muted but readable
          'tertiary': '#6B7075',     // Subtle text
          'disabled': '#3D4148',
        },
        
        // Borders
        'border': {
          'DEFAULT': 'rgba(255, 255, 255, 0.08)',
          'hover': 'rgba(255, 255, 255, 0.12)',
          'active': 'rgba(255, 255, 255, 0.16)',
          'accent': 'rgba(48, 107, 255, 0.3)',
        },
        
        // Glass effects
        'glass': {
          'light': 'rgba(255, 255, 255, 0.02)',
          'medium': 'rgba(255, 255, 255, 0.04)',
          'strong': 'rgba(255, 255, 255, 0.06)',
        },
      },
      
      fontFamily: {
        sans: ['var(--font-roboto-mono)', 'system-ui', '-apple-system', 'monospace'],
        mono: ['var(--font-roboto-mono)', '"SF Mono"', '"Fira Code"', 'monospace'],
        display: ['var(--font-roboto-mono)', 'system-ui', 'monospace'],
      },
      
      fontSize: {
        // Headings
        'display-2xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'display-xl': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '500' }],
        'display-lg': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '500' }],
        'display-md': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '500' }],
        'display-sm': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        
        // Body
        'body-xl': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
        
        // Labels
        'label': ['0.75rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.02em' }],
        'label-lg': ['0.875rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.015em' }],
        
        // Terminal/mono
        'terminal': ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
        'terminal-sm': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-down': 'fadeDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-up': 'slideInUp 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'typing': 'typing 1s steps(3) infinite',
        'blink': 'blink 1s step-end infinite',
        'scroll-x': 'scrollX 20s linear infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(48, 107, 255, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(48, 107, 255, 0.35)' },
        },
        typing: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scrollX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        'grid-dense': `
          linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        'radial-accent': 'radial-gradient(ellipse at center, rgba(48, 107, 255, 0.08) 0%, transparent 70%)',
        'gradient-fade-b': 'linear-gradient(to bottom, transparent 0%, rgba(10, 11, 13, 0.8) 100%)',
        'gradient-fade-t': 'linear-gradient(to top, transparent 0%, rgba(10, 11, 13, 0.8) 100%)',
      },
      
      backgroundSize: {
        'grid-sm': '24px 24px',
        'grid-md': '40px 40px',
        'grid-lg': '64px 64px',
      },
      
      boxShadow: {
        'card': `
          0 1px 3px rgba(0, 0, 0, 0.2),
          0 0 0 1px rgba(255, 255, 255, 0.04)
        `,
        'card-hover': `
          0 4px 12px rgba(0, 0, 0, 0.25),
          0 0 0 1px rgba(255, 255, 255, 0.08)
        `,
        'elevated': `
          0 8px 32px rgba(0, 0, 0, 0.3),
          0 0 0 1px rgba(255, 255, 255, 0.06)
        `,
        'glow-accent': '0 0 40px rgba(48, 107, 255, 0.15)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
      },
      
      borderColor: {
        'card': 'rgba(255, 255, 255, 0.06)',
        'divider': 'rgba(255, 255, 255, 0.08)',
      },
      
      borderRadius: {
        'card': '8px',
        'panel': '12px',
      },
      
      transitionTimingFunction: {
        'out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
}

export default config
