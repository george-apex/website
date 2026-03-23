import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgressIndicator } from '@/components/effects/ScrollAnimations'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://apexe3.ai'),
  title: {
    default: 'APEXE3 | Enterprise AI Solutions - The Last Mile of AI',
    template: '%s | APEXE3',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  description:
    'APEXE3 delivers bespoke enterprise AI solutions with sovereignty, security, and scalability. Transform your AI pilots into production-ready systems with our expert customization.',
  keywords: [
    'enterprise AI',
    'AI solutions',
    'AI sovereignty',
    'bespoke AI',
    'AI deployment',
    'artificial intelligence',
    'machine learning',
    'AI agents',
    'custom AI',
    'enterprise automation',
  ],
  authors: [{ name: 'APEXE3' }],
  creator: 'APEXE3',
  publisher: 'APEXE3',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://apexe3.ai',
    siteName: 'APEXE3',
    title: 'APEXE3 | Enterprise AI Solutions - The Last Mile of AI',
    description:
      'Transform your AI pilots into production-ready systems with bespoke enterprise AI solutions. AI sovereignty, security, and scalability.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'APEXE3 - Enterprise AI Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APEXE3 | Enterprise AI Solutions',
    description: 'The Last Mile of AI - Bespoke enterprise AI solutions with sovereignty and security.',
    images: ['/og-image.png'],
    creator: '@apexe3',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://apexe3.ai',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${robotoMono.variable} relative`}>
      <body className="relative min-h-screen bg-bg-primary text-white antialiased">
        {/* Scroll Progress Indicator */}
        <ScrollProgressIndicator />
        
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main content */}
        <main id="main-content" className="relative">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  )
}
