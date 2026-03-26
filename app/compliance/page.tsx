'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Shield, CheckCircle, Award, Mail, ArrowRight, ChevronRight, AlertTriangle, Info, Globe, Lock, FileCheck, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// =============================================================================
// TABLE OF CONTENTS DATA
// =============================================================================

const SECTIONS = [
  { id: 'overview', number: 1, title: 'Compliance Overview' },
  { id: 'gdpr', number: 2, title: 'GDPR Compliance' },
  { id: 'hipaa', number: 3, title: 'HIPAA Compliance' },
  { id: 'soc2', number: 4, title: 'SOC 2 Type II' },
  { id: 'iso27001', number: 5, title: 'ISO 27001' },
  { id: 'ccpa', number: 6, title: 'CCPA Compliance' },
  { id: 'data-residency', number: 7, title: 'Data Residency' },
  { id: 'encryption', number: 8, title: 'Encryption Standards' },
  { id: 'access-control', number: 9, title: 'Access Control' },
  { id: 'audit-logging', number: 10, title: 'Audit Logging' },
  { id: 'incident-response', number: 11, title: 'Incident Response' },
  { id: 'third-party', number: 12, title: 'Third-Party Assessments' },
  { id: 'certifications', number: 13, title: 'Additional Certifications' },
  { id: 'regulatory', number: 14, title: 'Regulatory Support' },
  { id: 'documentation', number: 15, title: 'Compliance Documentation' },
  { id: 'contact', number: 16, title: 'Contact Compliance Team' },
]

// =============================================================================
// STICKY TABLE OF CONTENTS
// =============================================================================

function TableOfContents() {
  const [activeSection, setActiveSection] = React.useState('overview')

  React.useEffect(() => {
    const handleScroll = () => {
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
          <Shield className="w-4 h-4 text-accent" />
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
  type: 'important' | 'note' | 'warning' | 'success'
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
      icon: FileCheck,
      iconColor: 'text-positive',
    },
    warning: {
      bg: 'bg-warning/5',
      border: 'border-warning/30',
      icon: AlertTriangle,
      iconColor: 'text-warning',
    },
    success: {
      bg: 'bg-positive/5',
      border: 'border-positive/30',
      icon: CheckCircle,
      iconColor: 'text-positive',
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
// COMPLIANCE BADGE COMPONENT
// =============================================================================

interface ComplianceBadgeProps {
  icon: React.ElementType
  title: string
  status: 'certified' | 'compliant' | 'in-progress'
  description: string
}

function ComplianceBadge({ icon: Icon, title, status, description }: ComplianceBadgeProps) {
  const statusStyles = {
    certified: {
      bg: 'bg-positive/10',
      border: 'border-positive/30',
      text: 'text-positive',
      label: 'Certified',
    },
    compliant: {
      bg: 'bg-accent/10',
      border: 'border-accent/30',
      text: 'text-accent',
      label: 'Compliant',
    },
    'in-progress': {
      bg: 'bg-warning/10',
      border: 'border-warning/30',
      text: 'text-warning',
      label: 'In Progress',
    },
  }

  const style = statusStyles[status]

  return (
    <div className={`p-4 rounded-lg ${style.bg} border ${style.border}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 ${style.text}`} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-content-primary">{title}</h4>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
              {style.label}
            </span>
          </div>
          <p className="text-sm text-content-secondary">{description}</p>
        </div>
      </div>
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
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Enterprise Security</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-content-primary mb-4">
            Compliance & Certifications
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-content-secondary mb-8 max-w-2xl">
            APEXE3 maintains rigorous compliance with global security standards and regulatory frameworks. 
            Our enterprise-grade infrastructure is designed to meet the most demanding security requirements.
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-positive" />
              <span className="text-content-secondary">SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-positive" />
              <span className="text-content-secondary">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-positive" />
              <span className="text-content-secondary">HIPAA Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-positive" />
              <span className="text-content-secondary">ISO 27001 Aligned</span>
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
            Need Compliance Documentation?
          </h2>
          
          <p className="text-content-secondary mb-8">
            Our compliance team can provide detailed documentation, answer questions about specific 
            regulatory requirements, and support your organization's compliance assessments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="group">
                Contact Compliance Team
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="mailto:compliance@apexe3.ai">
              <Button variant="secondary" size="lg">
                compliance@apexe3.ai
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

export default function CompliancePage() {
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
              {/* Introduction */}
              <div className="mb-12 p-6 rounded-lg bg-surface-800 border border-border">
                <p className="text-content-secondary leading-relaxed">
                  <strong className="text-content-primary">Security and compliance</strong> are foundational 
                  to everything we build at APEXE3. Our platform is designed from the ground up to meet 
                  the rigorous security and privacy requirements of enterprise organizations across 
                  regulated industries including financial services, healthcare, and government.
                </p>
              </div>

              {/* Compliance Badges Grid */}
              <div className="mb-12 grid gap-4 sm:grid-cols-2">
                <ComplianceBadge
                  icon={Shield}
                  title="SOC 2 Type II"
                  status="certified"
                  description="Annual audits covering security, availability, and confidentiality"
                />
                <ComplianceBadge
                  icon={Globe}
                  title="GDPR"
                  status="compliant"
                  description="Full compliance with EU data protection regulations"
                />
                <ComplianceBadge
                  icon={Users}
                  title="HIPAA"
                  status="compliant"
                  description="Healthcare data protection with BAA available"
                />
                <ComplianceBadge
                  icon={Lock}
                  title="ISO 27001"
                  status="in-progress"
                  description="Expected certification Q3 2025"
                />
              </div>

              {/* Sections */}
              <Section id="overview" number={1} title="Compliance Overview">
                <SubSection number="1.1">
                  APEXE3 operates a comprehensive security and compliance program designed to protect 
                  customer data and meet the requirements of regulated industries. Our approach combines 
                  robust technical controls with documented policies and procedures.
                </SubSection>
                <SubSection number="1.2">
                  We maintain a dedicated compliance team responsible for monitoring regulatory changes, 
                  managing certifications, and ensuring our controls remain effective and current. This 
                  team works closely with external auditors and assessors.
                </SubSection>
                <SubSection number="1.3">
                  Our compliance program is built on the following pillars:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) <strong>Technical Controls:</strong> Encryption, access management, network security;</p>
                  <p>(b) <strong>Administrative Controls:</strong> Policies, training, incident response;</p>
                  <p>(c) <strong>Physical Controls:</strong> Data center security, environmental protections;</p>
                  <p>(d) <strong>Ongoing Monitoring:</strong> Continuous assessment, vulnerability management;</p>
                  <p>(e) <strong>Third-Party Validation:</strong> Independent audits and certifications.</p>
                </div>
                
                <Callout type="success" title="Enterprise-Grade Security">
                  Our security controls are designed to meet the requirements of the most regulated 
                  industries, including financial services, healthcare, and government organizations.
                </Callout>
              </Section>

              <Section id="gdpr" number={2} title="GDPR Compliance">
                <SubSection number="2.1">
                  APEXE3 is fully compliant with the European Union's General Data Protection Regulation 
                  (GDPR). We act as a Data Processor for customer data and have implemented comprehensive 
                  measures to support our customers' compliance obligations as Data Controllers.
                </SubSection>
                <SubSection number="2.2">
                  Key GDPR compliance measures include:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) Data Processing Agreements (DPA) available for all customers;</p>
                  <p>(b) Clear data subject rights procedures and support;</p>
                  <p>(c) Data portability in standard, machine-readable formats;</p>
                  <p>(d) Right to erasure (deletion) within defined timeframes;</p>
                  <p>(e) Lawful basis documentation and consent management support;</p>
                  <p>(f) Cross-border transfer mechanisms including Standard Contractual Clauses.</p>
                </div>
                <SubSection number="2.3">
                  We have appointed a dedicated Data Protection Officer (DPO) who can be contacted at 
                  dpo@apexe3.ai for questions related to data protection and GDPR compliance.
                </SubSection>
                <SubSection number="2.4">
                  Our subprocessors are carefully vetted and bound by equivalent data protection 
                  obligations. A current list of subprocessors is available upon request.
                </SubSection>
                
                <Callout type="important" title="Data Subject Requests">
                  We provide tools and processes to help customers respond to data subject requests 
                  within the 30-day timeframe required by GDPR. Our support team is trained to 
                  assist with access, rectification, erasure, and portability requests.
                </Callout>
              </Section>

              <Section id="hipaa" number={3} title="HIPAA Compliance">
                <SubSection number="3.1">
                  APEXE3 supports healthcare organizations subject to the Health Insurance Portability 
                  and Accountability Act (HIPAA). Our platform can be configured to meet HIPAA 
                  requirements, and we offer Business Associate Agreements (BAA) to covered entities 
                  and business associates.
                </SubSection>
                <SubSection number="3.2">
                  HIPAA-related safeguards include:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) Encryption of PHI at rest and in transit;</p>
                  <p>(b) Access controls with unique user identification;</p>
                  <p>(c) Audit controls and activity logging;</p>
                  <p>(d) Integrity controls to prevent unauthorized alterations;</p>
                  <p>(e) Transmission security with TLS encryption;</p>
                  <p>(f) Business Associate Agreement (BAA) execution;</p>
                  <p>(g) Workforce training on PHI handling procedures.</p>
                </div>
                <SubSection number="3.3">
                  Customers intending to process Protected Health Information (PHI) must notify us 
                  during onboarding and execute a BAA before processing any PHI through our services.
                </SubSection>
                <SubSection number="3.4">
                  We conduct regular risk assessments and maintain documented policies and procedures 
                  specifically addressing HIPAA Security Rule requirements.
                </SubSection>
                
                <Callout type="note" title="BAA Available">
                  Business Associate Agreements are available for all HIPAA-covered customers. 
                  Contact our compliance team at compliance@apexe3.ai to initiate the BAA process.
                </Callout>
              </Section>

              <Section id="soc2" number={4} title="SOC 2 Type II">
                <SubSection number="4.1">
                  APEXE3 maintains SOC 2 Type II certification, demonstrating our commitment to 
                  security, availability, and confidentiality. Our annual audits are conducted by 
                  independent, accredited auditors following AICPA standards.
                </SubSection>
                <SubSection number="4.2">
                  Our SOC 2 report covers the following Trust Service Criteria:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) <strong>Security (Common Criteria):</strong> Protection against unauthorized access;</p>
                  <p>(b) <strong>Availability:</strong> System availability as committed or agreed;</p>
                  <p>(c) <strong>Confidentiality:</strong> Protection of confidential information.</p>
                </div>
                <SubSection number="4.3">
                  Key controls examined in our SOC 2 audit include:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>• Access control and user authentication;</p>
                  <p>• Encryption and key management;</p>
                  <p>• Network security and segmentation;</p>
                  <p>• Vulnerability management and penetration testing;</p>
                  <p>• Change management and software development lifecycle;</p>
                  <p>• Incident response and business continuity;</p>
                  <p>• Vendor management and third-party oversight.</p>
                </div>
                <SubSection number="4.4">
                  Current and prospective customers can request a copy of our SOC 2 Type II report 
                  through our compliance portal or by contacting compliance@apexe3.ai. The report 
                  is provided under NDA.
                </SubSection>
                
                <Callout type="success" title="Annual Certification">
                  Our SOC 2 Type II certification is renewed annually. Our current certification 
                  period runs through December 2025, with the next audit scheduled for Q1 2026.
                </Callout>
              </Section>

              <Section id="iso27001" number={5} title="ISO 27001">
                <SubSection number="5.1">
                  APEXE3 is aligned with ISO/IEC 27001:2022, the international standard for information 
                  security management systems (ISMS). We are currently pursuing formal ISO 27001 
                  certification, with expected completion in Q3 2025.
                </SubSection>
                <SubSection number="5.2">
                  Our ISMS implementation includes:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) Comprehensive information security policies aligned with ISO 27001 Annex A;</p>
                  <p>(b) Risk assessment and treatment methodology;</p>
                  <p>(c) Security awareness training program;</p>
                  <p>(d) Internal audit program for continuous improvement;</p>
                  <p>(e) Management review and continuous improvement processes.</p>
                </div>
                <SubSection number="5.3">
                  Even without formal certification, our security controls are designed to meet or 
                  exceed ISO 27001 requirements. We can provide detailed control mapping upon request.
                </SubSection>
                
                <Callout type="important" title="Certification Timeline">
                  ISO 27001 certification is expected in Q3 2025. We have completed the gap analysis 
                  and remediation phase and are currently in the certification audit phase.
                </Callout>
              </Section>

              <Section id="ccpa" number={6} title="CCPA Compliance">
                <SubSection number="6.1">
                  APEXE3 complies with the California Consumer Privacy Act (CCPA) and California Privacy 
                  Rights Act (CPRA). We provide tools and processes to help our customers respond to 
                  California consumer privacy requests.
                </SubSection>
                <SubSection number="6.2">
                  CCPA/CPRA compliance measures include:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) Clear disclosure of data collection and use practices;</p>
                  <p>(b) Processes for responding to "Do Not Sell" requests;</p>
                  <p>(c) Consumer request verification procedures;</p>
                  <p>(d) Data deletion capabilities;</p>
                  <p>(e) Non-discrimination for exercising privacy rights.</p>
                </div>
                <SubSection number="6.3">
                  We do not sell personal information as defined under CCPA and have implemented 
                  controls to prevent unauthorized sharing of personal data.
                </SubSection>
              </Section>

              <Section id="data-residency" number={7} title="Data Residency">
                <SubSection number="7.1">
                  APEXE3 offers flexible data residency options to meet the requirements of organizations 
                  subject to data localization laws or with specific data sovereignty requirements.
                </SubSection>
                <SubSection number="7.2">
                  Available data residency options include:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) <strong>European Union:</strong> Data stored and processed exclusively in EU data centers;</p>
                  <p>(b) <strong>United States:</strong> Data stored and processed in US-based infrastructure;</p>
                  <p>(c) <strong>United Kingdom:</strong> Post-Brexit UK data residency available;</p>
                  <p>(d) <strong>Private Deployment:</strong> On-premise or private cloud for maximum control.</p>
                </div>
                <SubSection number="7.3">
                  Customer data is not transferred across regions without explicit authorization. 
                  Cross-region replication, if required for disaster recovery, is discussed and 
                  agreed upon during implementation planning.
                </SubSection>
                
                <Callout type="note" title="Custom Regions">
                  For enterprise customers with specific regional requirements, we can evaluate 
                  additional data residency options. Contact our solutions team to discuss your needs.
                </Callout>
              </Section>

              <Section id="encryption" number={8} title="Encryption Standards">
                <SubSection number="8.1">
                  All customer data is encrypted both at rest and in transit using industry-standard 
                  encryption algorithms. Our encryption practices follow NIST guidelines and are 
                  regularly reviewed by our security team.
                </SubSection>
                <SubSection number="8.2">
                  Encryption specifications:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) <strong>Data at Rest:</strong> AES-256 encryption for all stored data;</p>
                  <p>(b) <strong>Data in Transit:</strong> TLS 1.2+ for all network communications;</p>
                  <p>(c) <strong>Key Management:</strong> AWS KMS or customer-managed keys (CMK);</p>
                  <p>(d) <strong>Key Rotation:</strong> Automatic key rotation with configurable periods;</p>
                  <p>(e) <strong>Backup Encryption:</strong> All backups encrypted with separate keys.</p>
                </div>
                <SubSection number="8.3">
                  For customers requiring enhanced security, we support Bring Your Own Key (BYOK) 
                  and Hardware Security Module (HSM) integration for key management.
                </SubSection>
              </Section>

              <Section id="access-control" number={9} title="Access Control">
                <SubSection number="9.1">
                  APEXE3 implements comprehensive access controls based on the principle of least 
                  privilege. Access to customer data is strictly limited to authorized personnel 
                  with a legitimate business need.
                </SubSection>
                <SubSection number="9.2">
                  Access control measures include:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) <strong>Role-Based Access Control (RBAC):</strong> Granular permissions by role;</p>
                  <p>(b) <strong>Multi-Factor Authentication (MFA):</strong> Required for all admin access;</p>
                  <p>(c) <strong>Single Sign-On (SSO):</strong> SAML 2.0 and OIDC integration;</p>
                  <p>(d) <strong>Session Management:</strong> Configurable session timeouts;</p>
                  <p>(e) <strong>Password Policies:</strong> Configurable complexity and rotation requirements;</p>
                  <p>(f) <strong>IP Allowlisting:</strong> Restrict access by IP address ranges.</p>
                </div>
                <SubSection number="9.3">
                  Internal APEXE3 personnel access to production systems requires approval, is logged, 
                  and is subject to regular review. Background checks are performed on all employees 
                  with access to customer data.
                </SubSection>
              </Section>

              <Section id="audit-logging" number={10} title="Audit Logging">
                <SubSection number="10.1">
                  Comprehensive audit logging captures all significant events across the platform. 
                  Logs are immutable, time-synchronized, and retained for compliance and forensic purposes.
                </SubSection>
                <SubSection number="10.2">
                  Logged events include:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) Authentication attempts (success and failure);</p>
                  <p>(b) Authorization and access control decisions;</p>
                  <p>(c) Administrative actions and configuration changes;</p>
                  <p>(d) Data access, modification, and deletion;</p>
                  <p>(e) API calls and integration activity;</p>
                  <p>(f) System events and errors;</p>
                  <p>(g) Security events and alerts.</p>
                </div>
                <SubSection number="10.3">
                  Logs are retained for a minimum of 12 months and can be exported to customer-managed 
                  SIEM systems for integration with existing security operations.
                </SubSection>
              </Section>

              <Section id="incident-response" number={11} title="Incident Response">
                <SubSection number="11.1">
                  APEXE3 maintains a documented incident response plan aligned with NIST Special 
                  Publication 800-61. Our security team is available 24/7 to respond to security 
                  incidents.
                </SubSection>
                <SubSection number="11.2">
                  Incident response phases:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) <strong>Preparation:</strong> Tools, training, and playbooks;</p>
                  <p>(b) <strong>Detection:</strong> Automated monitoring and alerting;</p>
                  <p>(c) <strong>Containment:</strong> Isolate affected systems;</p>
                  <p>(d) <strong>Eradication:</strong> Remove threat and vulnerabilities;</p>
                  <p>(e) <strong>Recovery:</strong> Restore services and validate security;</p>
                  <p>(f) <strong>Lessons Learned:</strong> Post-incident review and improvements.</p>
                </div>
                <SubSection number="11.3">
                  We notify affected customers of security incidents in accordance with contractual 
                  obligations and regulatory requirements. For incidents involving personal data, 
                  we support customers' breach notification obligations.
                </SubSection>
                
                <Callout type="warning" title="Report Security Incidents">
                  If you suspect a security incident involving APEXE3 services, please report it 
                  immediately to security@apexe3.ai. We maintain a responsible disclosure program 
                  for security researchers.
                </Callout>
              </Section>

              <Section id="third-party" number={12} title="Third-Party Assessments">
                <SubSection number="12.1">
                  APEXE3 conducts regular third-party security assessments including penetration 
                  tests and vulnerability assessments. Testing is performed by independent, 
                  qualified security firms.
                </SubSection>
                <SubSection number="12.2">
                  Assessment activities include:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) Annual external penetration testing;</p>
                  <p>(b) Quarterly vulnerability scanning;</p>
                  <p>(c) Continuous automated security scanning;</p>
                  <p>(d) Code reviews and static analysis;</p>
                  <p>(e) Infrastructure configuration reviews.</p>
                </div>
                <SubSection number="12.3">
                  Critical and high-severity findings are remediated within defined SLAs. Summary 
                  reports of third-party assessments are available to customers under NDA.
                </SubSection>
              </Section>

              <Section id="certifications" number={13} title="Additional Certifications">
                <SubSection number="13.1">
                  In addition to SOC 2 and GDPR compliance, APEXE3 maintains the following 
                  certifications and attestations:
                </SubSection>
                <div className="pl-6 mb-4 space-y-3 text-content-secondary">
                  <div className="p-4 rounded-lg bg-surface-800 border border-border">
                    <p className="font-medium text-content-primary mb-1">PCI DSS</p>
                    <p>Payment Card Industry Data Security Standard compliance for payment processing systems.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-surface-800 border border-border">
                    <p className="font-medium text-content-primary mb-1">CSA STAR</p>
                    <p>Cloud Security Alliance Security, Trust, Assurance, and Risk program alignment.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-surface-800 border border-border">
                    <p className="font-medium text-content-primary mb-1">NIST Framework</p>
                    <p>Alignment with NIST Cybersecurity Framework and NIST 800-53 controls.</p>
                  </div>
                </div>
                <SubSection number="13.2">
                  For customers in regulated industries such as financial services, healthcare, 
                  or government, we can provide additional documentation and support for specific 
                  regulatory requirements.
                </SubSection>
              </Section>

              <Section id="regulatory" number={14} title="Regulatory Support">
                <SubSection number="14.1">
                  APEXE3 provides comprehensive support for customers in regulated industries. Our 
                  compliance team works with customers to address specific regulatory requirements 
                  and provide necessary documentation.
                </SubSection>
                <SubSection number="14.2">
                  Industries we support:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>(a) <strong>Financial Services:</strong> SEC, FINRA, FCA, MiFID II support;</p>
                  <p>(b) <strong>Healthcare:</strong> HIPAA, HITECH, FDA 21 CFR Part 11;</p>
                  <p>(c) <strong>Government:</strong> FedRAMP alignment, stateRAMP, government contracts;</p>
                  <p>(d) <strong>Insurance:</strong> NAIC model law support;</p>
                  <p>(e) <strong>Legal:</strong> Legal hold, e-discovery support;</p>
                  <p>(f) <strong>Energy:</strong> NERC CIP alignment.</p>
                </div>
                <SubSection number="14.3">
                  We can participate in customer compliance audits, provide documentation, and 
                  implement specific controls as required by regulatory frameworks.
                </SubSection>
              </Section>

              <Section id="documentation" number={15} title="Compliance Documentation">
                <SubSection number="15.1">
                  The following compliance documentation is available upon request:
                </SubSection>
                <div className="pl-6 mb-4 space-y-2 text-content-secondary">
                  <p>• SOC 2 Type II Report (under NDA);</p>
                  <p>• Data Processing Agreement (DPA);</p>
                  <p>• Business Associate Agreement (BAA);</p>
                  <p>• Standard Contractual Clauses (EU SCCs);</p>
                  <p>• Penetration Test Summary (under NDA);</p>
                  <p>• Subprocessor List;</p>
                  <p>• Security Whitepaper;</p>
                  <p>• Incident Response Plan Summary;</p>
                  <p>• Business Continuity Plan Summary;</p>
                  <p>• Insurance Certificates.</p>
                </div>
                <SubSection number="15.2">
                  To request compliance documentation, please contact our compliance team at 
                  compliance@apexe3.ai or through your account manager. Some documents require 
                  execution of a confidentiality agreement.
                </SubSection>
              </Section>

              <Section id="contact" number={16} title="Contact Compliance Team">
                <SubSection number="16.1">
                  For questions about our compliance program or to request documentation, please contact:
                </SubSection>
                <div className="pl-6 mb-4 space-y-3 text-content-secondary">
                  <div className="p-4 rounded-lg bg-surface-800 border border-border">
                    <p className="font-medium text-content-primary mb-2">APEXE3 Compliance Team</p>
                    <p>Email: compliance@apexe3.ai</p>
                    <p>Data Protection Officer: dpo@apexe3.ai</p>
                    <p>Security Team: security@apexe3.ai</p>
                    <p className="mt-2">
                      For vendor security questionnaires and risk assessments:<br />
                      security-assessments@apexe3.ai
                    </p>
                  </div>
                </div>
                <SubSection number="16.2">
                  We typically respond to compliance inquiries within 2 business days. For urgent 
                  security matters, please contact our 24/7 security hotline.
                </SubSection>
              </Section>

              {/* Final commitment */}
              <div className="mt-16 p-6 rounded-lg bg-surface-800 border border-accent/20">
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-content-primary mb-2">Our Compliance Commitment</h3>
                    <p className="text-content-secondary text-sm leading-relaxed">
                      APEXE3 is committed to maintaining the highest standards of security and compliance. 
                      We continuously invest in our security program, monitor regulatory developments, 
                      and work closely with customers to meet their compliance requirements. Your trust 
                      is fundamental to our business, and we take that responsibility seriously.
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
