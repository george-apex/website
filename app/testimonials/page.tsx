'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// =============================================================================
// TESTIMONIALS DATA
// =============================================================================

const TESTIMONIALS = [
  {
    id: 1,
    quote: "An incredibly powerful tool for querying extensive documents, this application can handle files exceeding 1,000+ pages and delivers answers within seconds.",
    role: "Fixed Income Analyst (EMEA)",
    company: "Global Index Provider",
    rating: 5,
  },
  {
    id: 2,
    quote: "Ability to create and query collections of content using natural language is fantastic! We combined YouTube videos, web articles, PDFs and asked A.L.I.C.E to summarise everything — the results were amazing!",
    role: "Head of Marketing (UK)",
    company: "Business Intelligence Provider",
    rating: 5,
  },
  {
    id: 3,
    quote: "The Alice gen AI app, which compares responses from multiple LLMs, is extremely useful. It enables us to identify the LLMs best suited to meet our users needs.",
    role: "Senior Quant (USA)",
    company: "Global Asset Manager",
    rating: 5,
  },
  {
    id: 4,
    quote: "Summarising earnings calls by integrating the latest financial metrics with details from the call is a game-changer. This will save us a lot of time!",
    role: "Equity Analyst (USA)",
    company: "Global Asset Manager",
    rating: 5,
  },
  {
    id: 5,
    quote: "Your vector database offers a lot of valuable functionality and right up there with the best!",
    role: "Senior Data Scientist (USA)",
    company: "Global Asset Manager",
    rating: 5,
  },
  {
    id: 6,
    quote: "Reports that previously took me over an hour to summarise can now be summarised in minutes.",
    role: "Research Analyst (APAC)",
    company: "Global Asset Manager",
    rating: 5,
  },
]

// =============================================================================
// HERO SECTION
// =============================================================================

function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-800 border-b border-border">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container-main relative z-10 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Client Testimonials</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-content-primary mb-4">
            What Our Clients Say
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-content-secondary mb-8 max-w-2xl mx-auto">
            Trusted by leading financial institutions worldwide. Hear from the professionals 
            using APEXE3 to transform their workflows.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">$10T+</span>
              <span className="text-content-tertiary">Combined AUM</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">Global</span>
              <span className="text-content-tertiary">Institutions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent">EMEA</span>
              <span className="text-content-tertiary">APAC & USA</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-900 to-transparent" />
    </section>
  )
}

// =============================================================================
// TESTIMONIAL CARD COMPONENT
// =============================================================================

interface TestimonialCardProps {
  quote: string
  role: string
  company: string
  rating: number
  index: number
}

function TestimonialCard({ quote, role, company, rating, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-surface-800 border border-border rounded-lg p-6 hover:border-accent/30 transition-all duration-300"
    >
      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-8 h-8 text-accent" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-content-secondary leading-relaxed mb-6">
        "{quote}"
      </p>

      {/* Author */}
      <div className="border-t border-border pt-4">
        <p className="font-medium text-content-primary">{role}</p>
        <p className="text-sm text-content-tertiary">{company}</p>
      </div>
    </motion.div>
  )
}

// =============================================================================
// CTA SECTION
// =============================================================================

function CTASection() {
  return (
    <section className="relative bg-surface-800 border-t border-border">
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      <div className="container-main relative z-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl font-medium text-content-primary mb-4">
            Ready to Transform Your Workflow?
          </h2>
          
          <p className="text-content-secondary mb-8">
            Join leading financial institutions worldwide in leveraging AI for smarter, 
            faster decisions. Book a demo to see APEXE3 in action.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="group">
                Book a Demo
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/platform">
              <Button variant="secondary" size="lg">
                Explore Platform
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-surface-900">
      {/* Hero */}
      <Hero />

      {/* Testimonials Grid */}
      <div className="container-main py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              role={testimonial.role}
              company={testimonial.company}
              rating={testimonial.rating}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <CTASection />
    </div>
  )
}
