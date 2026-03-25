'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { AnimatedGrid } from '@/components/effects/AnimatedGrid'
import { GlowOrb } from '@/components/effects/GlowOrb'
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock,
  Send,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@apexe3.ai',
    href: 'mailto:contact@apexe3.ai',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'San Francisco, CA',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Fri 9AM-6PM PST',
    href: '#',
  },
]

const inquiryTypes = [
  'General Inquiry',
  'Enterprise Solutions',
  'Partnership',
  'Press & Media',
  'Careers',
  'Other',
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="relative min-h-screen">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatedGrid />
        <GlowOrb className="top-1/4 -right-32 w-96 h-96" color="cyan" opacity={0.1} />
        <GlowOrb className="bottom-1/4 -left-32 w-80 h-80" color="blue" opacity={0.08} />
      </div>

      {/* Hero */}
      <section className="relative pt-8 pb-16 min-[393px]:pt-32">
        <Container>
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6">
                Get in Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">Let's Build</span>
                <br />
                Something Remarkable
              </h1>
              <p className="text-xl text-apex-slate-400 max-w-2xl mx-auto">
                Ready to transform your enterprise with bespoke AI solutions? 
                Our team is here to help you navigate the last mile of AI deployment.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="relative py-16">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Contact Info */}
            <ScrollReveal>
              <div className="space-y-8 text-center">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                  <p className="text-apex-slate-400">
                    Have a question or want to discuss your AI project? 
                    Reach out through any of these channels.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {contactInfo.map((item) => {
                    const Icon = item.icon
                    return (
                      <Card key={item.label} variant="glass" className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-apex-slate-400 mb-1">{item.label}</p>
                            <a 
                              href={item.href}
                              className="text-white hover:text-blue-400 transition-colors"
                            >
                              {item.value}
                            </a>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>

                {/* Map placeholder */}
                <Card variant="glass" className="p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-apex-slate-500 mx-auto mb-2" />
                    <p className="text-apex-slate-400">
                      San Francisco, California
                    </p>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </div>
  )
}
