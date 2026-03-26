'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { FileText, Scale, Shield, Mail, ArrowRight, ChevronRight, AlertTriangle, Info, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// =============================================================================
// TABLE OF CONTENTS DATA
// =============================================================================

const SECTIONS = [
  { id: 'introduction', number: 1, title: 'Introduction' },
  { id: 'definitions', number: 2, title: 'Definitions' },
  { id: 'acceptance', number: 3, title: 'Acceptance of Terms' },
  { id: 'eligibility', number: 4, title: 'Eligibility and Authority' },
  { id: 'services', number: 5, title: 'Services Overview' },
  { id: 'restrictions', number: 6, title: 'Use Restrictions' },
  { id: 'obligations', number: 7, title: 'User Obligations' },
  { id: 'intellectual-property', number: 8, title: 'Intellectual Property Rights' },
  { id: 'confidentiality', number: 9, title: 'Confidentiality' },
  { id: 'data-protection', number: 10, title: 'Data Protection and Privacy' },
  { id: 'security', number: 11, title: 'Security and Infrastructure' },
  { id: 'third-party', number: 12, title: 'Third-Party Tools and Integrations' },
  { id: 'fees', number: 13, title: 'Fees and Payment' },
  { id: 'warranties', number: 14, title: 'Warranties and Disclaimers' },
  { id: 'liability', number: 15, title: 'Limitation of Liability' },
  { id: 'indemnification', number: 16, title: 'Indemnification' },
  { id: 'suspension', number: 17, title: 'Suspension and Termination' },
  { id: 'service-changes', number: 18, title: 'Changes to Services' },
  { id: 'terms-changes', number: 19, title: 'Changes to Terms' },
  { id: 'governing-law', number: 20, title: 'Governing Law and Jurisdiction' },
  { id: 'contact', number: 21, title: 'Contact Details' },
]

// =============================================================================
// STICKY TABLE OF CONTENTS
// =============================================================================

function TableOfContents() {
  const [activeSection, setActiveSection] = React.useState('introduction')

  React.useEffect(() => {
    const handleScroll = () => {
      // Find active section
      const sections = SECTIONS.map(s => document.getElementById(s.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 120
      const elementPosition = element.offsetTop - offset
      window.scrollTo({ top: elementPosition, behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="hidden lg:block w-72 shrink-0 sticky top-28 self-start"
    >
      <div className="pr-6 max-h-[calc(100vh-140px)] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-content-secondary uppercase tracking-wider">Contents</span>
        </div>
        <div className="space-y-1">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 group ${
                activeSection === section.id
                  ? 'bg-accent/10 text-accent border-l-2 border-accent'
                  : 'text-content-tertiary hover:text-content-secondary hover:bg-surface-700/50'
              }`}
            >
              <span className={`font-mono text-xs ${activeSection === section.id ? 'text-accent' : 'text-content-disabled'}`}>
                {String(section.number).padStart(2, '0')}
              </span>
              <span className="truncate">{section.title}</span>
              {activeSection === section.id && (
                <ChevronRight className="w-3 h-3 ml-auto text-accent" />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

// =============================================================================
// CALLOUT BOX COMPONENT
// =============================================================================

interface CalloutProps {
  type: 'important' | 'note' | 'warning'
  title: string
  children: React.ReactNode
}

function Callout({ type, title, children }: CalloutProps) {
  const styles = {
    important: {
      bg: 'bg-accent/5',
      border: 'border-accent/30',
      icon: Info,
      iconColor: 'text-accent',
    },
    note: {
      bg: 'bg-surface-700/30',
      border: 'border-border',
      icon: CheckCircle,
      iconColor: 'text-positive',
    },
    warning: {
      bg: 'bg-warning/5',
      border: 'border-warning/30',
      icon: AlertTriangle,
      iconColor: 'text-warning',
    },
  }

  const style = styles[type]
  const Icon = style.icon

  return (
    <div className={`my-6 p-4 rounded-lg ${style.bg} border ${style.border}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 ${style.iconColor}`} />
        <div>
          <h4 className="font-medium text-content-primary mb-1">{title}</h4>
          <div className="text-sm text-content-secondary leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// SECTION COMPONENT
// =============================================================================

interface SectionProps {
  id: string
  number: number
  title: string
  children: React.ReactNode
}

function Section({ id, number, title, children }: SectionProps) {
  return (
    <section id={id} className="mb-12 scroll-mt-28">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-sm text-accent/60">{String(number).padStart(2, '0')}</span>
        <h2 className="text-xl font-medium text-content-primary">{title}</h2>
      </div>
      <div className="pl-8 border-l border-border/50">
        {children}
      </div>
    </section>
  )
}

// =============================================================================
// SUBSECTION COMPONENT
// =============================================================================

interface SubSectionProps {
  number: string
  title?: string
  children: React.ReactNode
}

function SubSection({ number, title, children }: SubSectionProps) {
  return (
    <div className="mb-4">
      <p className="text-content-secondary leading-relaxed">
        <span className="font-mono text-content-tertiary mr-2">{number}</span>
        {title && <strong className="text-content-primary">{title}.</strong>} {children}
      </p>
    </div>
  )
}

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
          className="max-w-3xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Scale className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Legal Agreement</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-content-primary mb-4">
            Terms & Conditions
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-content-secondary mb-8 max-w-2xl">
            These terms govern your use of APEXE3's enterprise AI platform and services. 
            Please read them carefully before accessing or using our services.
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-content-tertiary">Effective Date:</span>
              <span className="text-content-secondary font-medium">January 1, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-content-tertiary">Last Updated:</span>
              <span className="text-content-secondary font-medium">March 15, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-content-tertiary">Version:</span>
              <span className="text-content-secondary font-mono">3.2.1</span>
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
// CONTACT CTA SECTION
// =============================================================================

function ContactCTA() {
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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Mail className="w-5 h-5 text-accent" />
          </div>
          
          <h2 className="text-2xl font-medium text-content-primary mb-4">
            Questions About These Terms?
          </h2>
          
          <p className="text-content-secondary mb-8">
            Our legal team is available to clarify any provisions or discuss specific requirements 
            for your organization. We're committed to transparency and building trust with our partners.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="group">
                Contact Legal Team
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="mailto:legal@apexe3.ai">
              <Button variant="secondary" size="lg">
                legal@apexe3.ai
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-900">
      {/* Hero */}
      <Hero />

      {/* Main Content */}
      <div className="container-main py-12 lg:py-16">
        <div className="flex gap-12">
          {/* Table of Contents - Desktop */}
          <TableOfContents />

          {/* Content */}
          <main className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl"
            >
              {/* Introduction text */}
              <div className="mb-12 p-6 rounded-lg bg-surface-800 border border-border">
                <p className="text-content-secondary leading-relaxed">
                  <strong className="text-content-primary">APEXE3 Limited</strong> ("APEXE3", "we", "us", or "our") 
                  provides enterprise artificial intelligence solutions, including but not limited to AI agents, 
                  workflow orchestration platforms, and related professional services. These Terms and Conditions 
                  ("Terms") constitute a legally binding agreement between you ("Customer", "you", or "your") 
                  and APEXE3 governing your access to and use of our services.
                </p>
              </div>

              {/* Sections */}
              <Section id="introduction" number={1} title="Introduction">
                <SubSection number="1.1">
                  These Terms establish the legal framework for your use of APEXE3's enterprise AI platform, 
                  services, and related resources. By accessing or using any APEXE3 services, you acknowledge 
                  that you have read, understood, and agree to be bound by these Terms.
                </SubSection>
                <SubSection number="1.2">
                  APEXE3 provides sophisticated AI solutions designed for enterprise deployment, including 
                  custom AI agents, workflow automation systems, knowledge management platforms, and 
                  professional services for implementation and optimization.
                </SubSection>
                <SubSection number="1.3">
                  These Terms apply to all users of our services, including authorized representatives of 
                  customer organizations, individual users, and any third parties accessing our platform 
                  through authorized integrations.
                </SubSection>
                
                <Callout type="important" title="Binding Agreement">
                  By using our services, you enter into a binding legal agreement. If you are accessing 
                  these services on behalf of an organization, you represent and warrant that you have 
                  the authority to bind that organization to these Terms.
                </Callout>
              </Section>

              <Section id="definitions" number={2} title="Definitions">
                <SubSection number="2.1" title='"Affiliate"'>
                  means any entity that directly or indirectly controls, is controlled by, or is under 
                  common control with a party, where "control" means ownership of more than 50% of the 
                  voting securities or equivalent governing authority.
                </SubSection>
                <SubSection number="2.2" title='"AI Agent"'>
                  means any artificial intelligence system, model, or agent provided by APEXE3 as part 
                  of the Services, including pre-configured agents and custom-developed agents.
                </SubSection>
                <SubSection number="2.3" title='"Confidential Information"'>
                  means all non-public information disclosed by either party, including but not limited 
                  to technical data, business strategies, customer information, pricing, and any information 
                  designated as confidential or that would reasonably be understood as confidential.
                </SubSection>
                <SubSection number="2.4" title='"Customer Data"'>
                  means all data, information, and content that you or your Authorized Users upload, 
                  submit, or otherwise provide to the Services, including training data, prompts, and outputs.
                </SubSection>
                <SubSection number="2.5" title='"Documentation"'>
                  means the user guides, technical specifications, API references, and other materials 
                  provided by APEXE3 to assist in the use of the Services.
                </SubSection>
                <SubSection number="2.6" title='"Services"'>
                  means APEXE3's enterprise AI platform, AI agents, workflow orchestration tools, 
                  professional services, and any related software, applications, or functionality 
                  provided under these Terms.
                </SubSection>
                <SubSection number="2.7" title='"Subscription"'>
                  means your subscription to the Services as described in your Order Form, including 
                  the applicable subscription plan, term, and fees.
                </SubSection>
              </Section>

              <Section id="acceptance" number={3} title="Acceptance of Terms">
                <SubSection number="3.1">
                  By accessing or using the Services, you confirm that you have read, understood, and 
                  agree to be bound by these Terms. If you do not agree to these Terms, you must not 
                  access or use the Services.
                </SubSection>
                <SubSection number="3.2">
                  APEXE3 reserves the right to update or modify these Terms at any time. Any changes 
                  will be effective upon posting to our website or upon notification to you. Your 
                  continued use of the Services after any changes constitutes acceptance of the 
                  modified Terms.
                </SubSection>
                <SubSection number="3.3">
                  Additional terms and conditions may apply to specific features, services, or 
                  promotions. Such additional terms will be provided to you and become part of 
                  your agreement with APEXE3 when you use those features or services.
                </SubSection>
                
                <Callout type="note" title="Review Regularly">
                  We encourage you to review these Terms periodically. We will notify you of material 
                  changes via email or through our platform. The "Last Updated" date at the top 
                  indicates when these Terms were most recently revised.
                </Callout>
              </Section>

              <Section id="eligibility" number={4} title="Eligibility and Authority">
                <SubSection number="4.1">
                  You represent and warrant that you are at least 18 years of age and have the legal 
                  capacity to enter into a binding agreement.
                </SubSection>
                <SubSection number="4.2">
                  If you are accessing the Services on behalf of an organization, you represent and 
                  warrant that you have the authority to bind that organization to these Terms and 
                  that you are authorized to act on its behalf.
                </SubSection>
                <SubSection number="4.3">
                  You represent and warrant that your use of the Services will comply with all 
                  applicable laws, regulations, and industry standards, including but not limited 
                  to data protection laws, export control regulations, and industry-specific compliance 
                  requirements.
                </SubSection>
                <SubSection number="4.4">
                  The Services are not intended for use by individuals or entities located in jurisdictions 
                  where such use would be prohibited by applicable law. You represent that you are not 
                  located in, and will not use the Services from, any jurisdiction subject to comprehensive 
                  sanctions or embargoes.
                </SubSection>
              </Section>

              <Section id="services" number={5} title="Services Overview">
                <SubSection number="5.1">
                  APEXE3 provides enterprise-grade AI solutions including, but not limited to:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) AI Agents: Customizable artificial intelligence agents designed for specific business workflows;</p>
                  <p>(b) Workflow Orchestration: Tools for coordinating multiple agents, systems, and human touchpoints;</p>
                  <p>(c) Knowledge Systems: Intelligent knowledge management and retrieval systems;</p>
                  <p>(d) Professional Services: Implementation, customization, training, and ongoing support;</p>
                  <p>(e) Infrastructure: Deployment options including on-premise, private cloud, and hybrid configurations.</p>
                </div>
                <SubSection number="5.2">
                  The specific Services provided to you will be detailed in your Order Form or 
                  subscription agreement. APEXE3 reserves the right to modify, suspend, or 
                  discontinue any feature or aspect of the Services with reasonable notice.
                </SubSection>
                <SubSection number="5.3">
                  We strive to maintain high availability of our Services. Our Service Level Agreement 
                  (SLA) commitments, if applicable to your subscription, are detailed in your 
                  Order Form or a separate SLA document.
                </SubSection>
              </Section>

              <Section id="restrictions" number={6} title="Use Restrictions">
                <SubSection number="6.1">
                  You agree not to use the Services:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) For any unlawful purpose or in violation of any applicable laws or regulations;</p>
                  <p>(b) To generate, distribute, or facilitate harmful, illegal, or malicious content;</p>
                  <p>(c) To infringe upon the intellectual property rights or privacy of others;</p>
                  <p>(d) To attempt to reverse engineer, decompile, or extract source code from the Services;</p>
                  <p>(e) To interfere with or disrupt the integrity or performance of the Services;</p>
                  <p>(f) To gain unauthorized access to any systems, networks, or data;</p>
                  <p>(g) For any purpose that could damage APEXE3's reputation or operations.</p>
                </div>
                
                <Callout type="warning" title="Prohibited Activities">
                  Violation of these use restrictions may result in immediate suspension or termination 
                  of your access to the Services, without refund, and may expose you to legal liability.
                </Callout>
              </Section>

              <Section id="obligations" number={7} title="User Obligations">
                <SubSection number="7.1">
                  You are responsible for maintaining the confidentiality of your account credentials 
                  and for all activities that occur under your account.
                </SubSection>
                <SubSection number="7.2">
                  You must promptly notify APEXE3 of any unauthorized access, security breach, or 
                  suspected misuse of your account or the Services.
                </SubSection>
                <SubSection number="7.3">
                  You are responsible for ensuring that all Authorized Users comply with these Terms 
                  and for any actions or omissions of Authorized Users.
                </SubSection>
                <SubSection number="7.4">
                  You must use reasonable security measures to protect Customer Data and must not 
                  transmit any malicious code, viruses, or harmful content through the Services.
                </SubSection>
                <SubSection number="7.5">
                  You will provide accurate and complete information when requested by APEXE3 and 
                  will update such information as necessary to keep it current.
                </SubSection>
              </Section>

              <Section id="intellectual-property" number={8} title="Intellectual Property Rights">
                <SubSection number="8.1">
                  APEXE3 retains all right, title, and interest in and to the Services, including 
                  all software, algorithms, models, documentation, and related intellectual property. 
                  No ownership rights are transferred to you under these Terms.
                </SubSection>
                <SubSection number="8.2">
                  Subject to your compliance with these Terms, APEXE3 grants you a limited, 
                  non-exclusive, non-transferable, non-sublicensable license to access and use 
                  the Services for your internal business purposes during the Subscription term.
                </SubSection>
                <SubSection number="8.3">
                  You retain all right, title, and interest in and to your Customer Data. APEXE3 
                  will not access, use, or process your Customer Data except as necessary to provide 
                  the Services or as authorized by you.
                </SubSection>
                <SubSection number="8.4">
                  Custom developments, including bespoke AI agents created specifically for your 
                  organization, are governed by the intellectual property terms specified in your 
                  Order Form or a separate development agreement.
                </SubSection>
                
                <Callout type="important" title="Ownership Clarity">
                  For custom AI solutions developed specifically for your organization, we recommend 
                  explicit intellectual property provisions in your Order Form to ensure clarity 
                  regarding ownership and licensing of custom components.
                </Callout>
              </Section>

              <Section id="confidentiality" number={9} title="Confidentiality">
                <SubSection number="9.1">
                  Each party agrees to maintain the confidentiality of the other party's Confidential 
                  Information and to use such information only for the purposes contemplated by these Terms.
                </SubSection>
                <SubSection number="9.2">
                  Confidential Information may be disclosed to employees, contractors, and advisors 
                  who have a need to know and are bound by confidentiality obligations at least as 
                  restrictive as those in these Terms.
                </SubSection>
                <SubSection number="9.3">
                  Confidentiality obligations do not apply to information that: (a) is or becomes 
                  publicly available through no fault of the receiving party; (b) was already known 
                  to the receiving party without restriction; (c) is independently developed by the 
                  receiving party; or (d) is required to be disclosed by law or court order.
                </SubSection>
                <SubSection number="9.4">
                  The confidentiality obligations in this Section survive for a period of five (5) 
                  years after termination of these Terms, or longer if required for trade secrets.
                </SubSection>
              </Section>

              <Section id="data-protection" number={10} title="Data Protection and Privacy">
                <SubSection number="10.1">
                  APEXE3 processes Customer Data in accordance with our Privacy Policy and any 
                  applicable Data Processing Agreement. You are responsible for ensuring that you 
                  have appropriate legal bases for transferring data to APEXE3.
                </SubSection>
                <SubSection number="10.2">
                  We implement appropriate technical and organizational measures to protect Customer 
                  Data against unauthorized access, loss, destruction, or disclosure. Our security 
                  measures include encryption at rest and in transit, access controls, and regular 
                  security assessments.
                </SubSection>
                <SubSection number="10.3">
                  Depending on your deployment configuration, Customer Data may be processed in 
                  your own infrastructure, in APEXE3's cloud infrastructure, or in a hybrid 
                  environment. Data residency and sovereignty requirements will be addressed in 
                  your Order Form.
                </SubSection>
                <SubSection number="10.4">
                  Upon termination, APEXE3 will delete or return all Customer Data in accordance 
                  with your instructions and our data retention policies, subject to any legal 
                  requirements to retain certain data.
                </SubSection>
                
                <Callout type="note" title="Compliance Support">
                  APEXE3 maintains SOC 2 Type II certification and can support compliance with 
                  GDPR, HIPAA, and other regulatory frameworks. Contact our team for specific 
                  compliance documentation and BAA requirements.
                </Callout>
              </Section>

              <Section id="security" number={11} title="Security and Infrastructure">
                <SubSection number="11.1">
                  APEXE3 maintains comprehensive security programs aligned with industry best 
                  practices and regulatory requirements. Our security measures include:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) End-to-end encryption for data in transit and at rest;</p>
                  <p>(b) Multi-factor authentication and single sign-on (SSO) integration;</p>
                  <p>(c) Role-based access control and granular permission management;</p>
                  <p>(d) Regular penetration testing and vulnerability assessments;</p>
                  <p>(e) Comprehensive audit logging and monitoring;</p>
                  <p>(f) Incident response procedures and breach notification protocols.</p>
                </div>
                <SubSection number="11.2">
                  For private deployments, you are responsible for securing your own infrastructure 
                  and network. APEXE3 will provide reasonable assistance and documentation to 
                  support your security implementation.
                </SubSection>
                <SubSection number="11.3">
                  You must report any suspected security vulnerabilities or incidents to APEXE3 
                  immediately via security@apexe3.ai. We will investigate and respond to all 
                  legitimate reports in accordance with our security incident response procedures.
                </SubSection>
              </Section>

              <Section id="third-party" number={12} title="Third-Party Tools and Integrations">
                <SubSection number="12.1">
                  The Services may integrate with third-party applications, services, or platforms. 
                  Your use of such integrations is subject to the terms and conditions of the 
                  applicable third-party provider.
                </SubSection>
                <SubSection number="12.2">
                  APEXE3 is not responsible for the availability, security, or functionality of 
                  third-party services. We do not endorse or guarantee any third-party content, 
                  products, or services.
                </SubSection>
                <SubSection number="12.3">
                  When you authorize an integration, you grant APEXE3 permission to access and 
                  exchange data with that third-party service on your behalf. You may revoke 
                  such authorization at any time through your account settings or by contacting support.
                </SubSection>
              </Section>

              <Section id="fees" number={13} title="Fees and Payment">
                <SubSection number="13.1">
                  Fees for the Services will be specified in your Order Form. Unless otherwise 
                  stated, fees are quoted in USD, exclusive of applicable taxes, and payable in advance.
                </SubSection>
                <SubSection number="13.2">
                  You agree to pay all fees within thirty (30) days of the invoice date. Overdue 
                  payments may incur interest at the rate of 1.5% per month or the maximum rate 
                  permitted by law, whichever is lower.
                </SubSection>
                <SubSection number="13.3">
                  APEXE3 may increase subscription fees upon renewal by providing at least sixty (60) 
                  days' advance notice. If you do not wish to renew at the new rate, you may 
                  terminate your subscription before the renewal date.
                </SubSection>
                <SubSection number="13.4">
                  All fees are non-refundable except as expressly provided in these Terms or your 
                  Order Form. No refunds or credits will be provided for partial subscription 
                  periods or unused features.
                </SubSection>
                
                <Callout type="important" title="Enterprise Pricing">
                  Enterprise customers may have customized pricing, payment terms, and invoicing 
                  arrangements specified in their Order Form. Those terms will supersede the 
                  general provisions in this Section.
                </Callout>
              </Section>

              <Section id="warranties" number={14} title="Warranties and Disclaimers">
                <SubSection number="14.1">
                  APEXE3 warrants that: (a) the Services will perform substantially in accordance 
                  with the Documentation; (b) we will perform professional services with reasonable 
                  skill and care; and (c) we will not introduce malicious code into the Services.
                </SubSection>
                <SubSection number="14.2">
                  EXCEPT AS EXPRESSLY SET FORTH IN THESE TERMS, APEXE3 PROVIDES THE SERVICES 
                  "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, 
                  IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO WARRANTIES OF 
                  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </SubSection>
                <SubSection number="14.3">
                  APEXE3 does not warrant that the Services will be uninterrupted, error-free, 
                  or secure. We do not guarantee the accuracy, completeness, or usefulness of 
                  any AI-generated outputs or recommendations.
                </SubSection>
                <SubSection number="14.4">
                  You are solely responsible for evaluating the suitability of the Services for 
                  your intended use and for any decisions made based on AI-generated outputs.
                </SubSection>
              </Section>

              <Section id="liability" number={15} title="Limitation of Liability">
                <SubSection number="15.1">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL APEXE3'S TOTAL 
                  AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS EXCEED THE 
                  TOTAL FEES PAID BY YOU IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                </SubSection>
                <SubSection number="15.2">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, APEXE3 WILL NOT BE LIABLE FOR ANY 
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING 
                  BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, REGARDLESS 
                  OF THE THEORY OF LIABILITY.
                </SubSection>
                <SubSection number="15.3">
                  The limitations in this Section apply regardless of whether a claim is based 
                  on contract, tort, strict liability, or any other theory, and will apply even 
                  if APEXE3 has been advised of the possibility of such damages.
                </SubSection>
                
                <Callout type="warning" title="Liability Caps">
                  Certain jurisdictions do not allow the exclusion of certain warranties or the 
                  limitation of liability for certain types of damages. In such jurisdictions, 
                  our liability will be limited to the maximum extent permitted by law.
                </Callout>
              </Section>

              <Section id="indemnification" number={16} title="Indemnification">
                <SubSection number="16.1">
                  You agree to indemnify, defend, and hold harmless APEXE3, its affiliates, and 
                  their respective officers, directors, employees, and agents from any claims, 
                  damages, losses, and expenses arising from: (a) your use of the Services; 
                  (b) your violation of these Terms; (c) your infringement of any third-party 
                  rights; or (d) your Customer Data.
                </SubSection>
                <SubSection number="16.2">
                  APEXE3 will indemnify you against claims that the Services, as provided by 
                  APEXE3, infringe any patent, copyright, or trademark of a third party. This 
                  indemnification is conditioned upon: (a) prompt notice of the claim; (b) 
                  reasonable cooperation; and (c) sole control of defense and settlement.
                </SubSection>
                <SubSection number="16.3">
                  If the Services become or are likely to become the subject of an infringement 
                  claim, APEXE3 may, at its option: (a) procure a license; (b) replace or modify 
                  the Services; or (c) terminate your subscription and refund any prepaid fees.
                </SubSection>
              </Section>

              <Section id="suspension" number={17} title="Suspension and Termination">
                <SubSection number="17.1">
                  Either party may terminate these Terms for convenience upon thirty (30) days' 
                  written notice before the end of the current subscription term.
                </SubSection>
                <SubSection number="17.2">
                  Either party may terminate for cause if the other party: (a) materially breaches 
                  these Terms and fails to cure within thirty (30) days of notice; or (b) becomes 
                  insolvent, files for bankruptcy, or ceases operations.
                </SubSection>
                <SubSection number="17.3">
                  APEXE3 may immediately suspend your access to the Services if: (a) you violate 
                  these Terms; (b) we detect security threats or suspicious activity; or (c) 
                  required to comply with law or protect our rights.
                </SubSection>
                <SubSection number="17.4">
                  Upon termination: (a) all licenses granted under these Terms will terminate; 
                  (b) you must cease using the Services and delete all APEXE3 software; and 
                  (c) APEXE3 will delete or return your Customer Data as directed.
                </SubSection>
                <SubSection number="17.5">
                  Sections that by their nature should survive termination will remain in effect, 
                  including confidentiality, intellectual property, warranties, disclaimers, 
                  liability limitations, and indemnification.
                </SubSection>
              </Section>

              <Section id="service-changes" number={18} title="Changes to Services">
                <SubSection number="18.1">
                  APEXE3 may update, modify, or discontinue features of the Services at any time. 
                  We will provide reasonable advance notice of material changes that negatively 
                  affect your use of the Services.
                </SubSection>
                <SubSection number="18.2">
                  If a change materially reduces the functionality of the Services you have 
                  purchased, you may terminate your subscription and receive a pro-rated refund 
                  of prepaid fees for the remaining subscription period.
                </SubSection>
                <SubSection number="18.3">
                  We will not be liable for any modification, suspension, or discontinuation of 
                  the Services, except as provided in this Section.
                </SubSection>
              </Section>

              <Section id="terms-changes" number={19} title="Changes to Terms">
                <SubSection number="19.1">
                  APEXE3 may update these Terms from time to time. The "Last Updated" date at 
                  the top of this document indicates when changes were most recently made.
                </SubSection>
                <SubSection number="19.2">
                  We will provide notice of material changes via email, in-product notification, 
                  or other reasonable means at least thirty (30) days before such changes take effect.
                </SubSection>
                <SubSection number="19.3">
                  Your continued use of the Services after the effective date of any changes 
                  constitutes acceptance of the modified Terms. If you do not agree to the 
                  changes, you must terminate your subscription before the effective date.
                </SubSection>
              </Section>

              <Section id="governing-law" number={20} title="Governing Law and Jurisdiction">
                <SubSection number="20.1">
                  These Terms are governed by and construed in accordance with the laws of 
                  England and Wales, without regard to conflicts of law principles.
                </SubSection>
                <SubSection number="20.2">
                  Any dispute arising out of or relating to these Terms will be subject to the 
                  exclusive jurisdiction of the courts of England and Wales. Each party waives 
                  any objection to venue in such courts.
                </SubSection>
                <SubSection number="20.3">
                  Nothing in these Terms will limit either party's ability to seek injunctive 
                  or other equitable relief in any jurisdiction for actual or threatened 
                  infringement of intellectual property rights or breach of confidentiality obligations.
                </SubSection>
                <SubSection number="20.4">
                  The United Nations Convention on Contracts for the International Sale of Goods 
                  (CISG) does not apply to these Terms.
                </SubSection>
              </Section>

              <Section id="contact" number={21} title="Contact Details">
                <SubSection number="21.1">
                  For questions about these Terms, please contact:
                </SubSection>
                <div className="pl-6 mb-4 space-y-3 text-content-secondary">
                  <div className="p-4 rounded-lg bg-surface-800 border border-border">
                    <p className="font-medium text-content-primary mb-2">APEXE3 Limited</p>
                    <p>Legal Department</p>
                    <p>Email: legal@apexe3.ai</p>
                    <p>Phone: +44 (0) 20 1234 5678</p>
                    <p className="mt-2">
                      Registered Office:<br />
                      100 Liverpool Street<br />
                      London, EC2M 2RH<br />
                      United Kingdom
                    </p>
                  </div>
                </div>
                <SubSection number="21.2">
                  For technical support inquiries, please contact support@apexe3.ai or use the 
                  in-app support portal.
                </SubSection>
                <SubSection number="21.3">
                  For security concerns or vulnerability reports, please contact 
                  security@apexe3.ai. We maintain a responsible disclosure program and 
                  appreciate the contributions of security researchers.
                </SubSection>
              </Section>

              {/* Final acknowledgment */}
              <div className="mt-16 p-6 rounded-lg bg-surface-800 border border-accent/20">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-content-primary mb-2">Acknowledgment</h3>
                    <p className="text-content-secondary text-sm leading-relaxed">
                      By using APEXE3's services, you acknowledge that you have read these Terms 
                      in full, understand their implications, and agree to be bound by them. These 
                      Terms represent the entire agreement between you and APEXE3 regarding your 
                      use of the Services and supersede all prior agreements and understandings.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </main>
        </div>
      </div>

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  )
}
