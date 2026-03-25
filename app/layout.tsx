import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import { Navbar, NavigationProvider } from '@/components/layout/Navbar'
import { SubNavigation } from '@/components/layout/SubNavigation'
import { MobileFloatingNav } from '@/components/layout/MobileFloatingNav'
import { Footer } from '@/components/layout/Footer'
import { MainContent } from '@/components/layout/MainContent'
import { ScrollProgressIndicator } from '@/components/effects/ScrollAnimations'

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
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
    <html lang="en" className={`${urbanist.variable} relative`}>
      <body className="relative min-h-screen bg-surface-900 text-white antialiased">
        <Suspense fallback={<div className="min-h-screen" />}>
          <NavigationProvider>
            {/* Scroll Progress Indicator */}
            <ScrollProgressIndicator />
            
            {/* Navigation */}
            <Navbar />
            
            {/* Sub Navigation */}
            <SubNavigation />
            
            {/* Main content */}
            <MainContent>
              {children}
            </MainContent>
            
            {/* Mobile Floating Navigation */}
            <MobileFloatingNav />
            
            {/* Footer */}
            <Footer />
          </NavigationProvider>
        </Suspense>
      </body>
    </html>
  )
}
