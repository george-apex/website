'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Mail, ArrowRight, ChevronRight, AlertTriangle, Info, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// =============================================================================
// TABLE OF CONTENTS DATA
// =============================================================================

const SECTIONS = [
  { id: 'introduction', number: 1, title: 'Introduction' },
  { id: 'controller', number: 2, title: 'Data Controller' },
  { id: 'data-collected', number: 3, title: 'Data We Collect' },
  { id: 'how-collected', number: 4, title: 'How We Collect Data' },
  { id: 'purposes', number: 5, title: 'Purposes of Processing' },
  { id: 'legal-basis', number: 6, title: 'Legal Basis for Processing' },
  { id: 'data-sharing', number: 7, title: 'Data Sharing & Disclosure' },
  { id: 'international', number: 8, title: 'International Transfers' },
  { id: 'retention', number: 9, title: 'Data Retention' },
  { id: 'rights', number: 10, title: 'Your Rights' },
  { id: 'security', number: 11, title: 'Data Security' },
  { id: 'cookies', number: 12, title: 'Cookies & Tracking' },
  { id: 'third-party', number: 13, title: 'Third-Party Services' },
  { id: 'children', number: 14, title: 'Children\'s Privacy' },
  { id: 'ai-processing', number: 15, title: 'AI & Machine Learning' },
  { id: 'changes', number: 16, title: 'Changes to This Policy' },
  { id: 'contact', number: 17, title: 'Contact Us' },
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
      style={{ maxHeight: 'calc(100vh - 140px)' }}
    >
      <div className="pr-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
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
// DATA TABLE COMPONENT
// =============================================================================

interface DataTableProps {
  headers: string[]
  rows: string[][]
}

function DataTable({ headers, rows }: DataTableProps) {
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
        <thead className="bg-surface-700/50">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-3 text-left text-content-primary font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-surface-700/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-content-secondary">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
            <Lock className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Privacy Commitment</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-content-primary mb-4">
            Privacy Policy
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-content-secondary mb-8 max-w-2xl">
            Your privacy matters to us. This policy explains how APEXE3 collects, uses, and protects 
            your personal data in compliance with global privacy regulations.
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
              <span className="text-content-secondary font-mono">2.4.0</span>
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
            Questions About Your Privacy?
          </h2>
          
          <p className="text-content-secondary mb-8">
            Our Data Protection Officer and privacy team are available to address any concerns 
            about how we handle your personal data. We're committed to transparency and your 
            right to privacy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="group">
                Contact Privacy Team
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="mailto:privacy@apexe3.ai">
              <Button variant="secondary" size="lg">
                privacy@apexe3.ai
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

export default function PrivacyPage() {
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
                  is committed to protecting your privacy and personal data. This Privacy Policy explains 
                  how we collect, use, disclose, and safeguard your information when you use our enterprise 
                  AI platform and services. We comply with the General Data Protection Regulation (GDPR), 
                  the UK GDPR, the California Consumer Privacy Act (CCPA), and other applicable privacy laws.
                </p>
              </div>

              {/* Sections */}
              <Section id="introduction" number={1} title="Introduction">
                <SubSection number="1.1">
                  This Privacy Policy applies to all users of APEXE3's services, including visitors to 
                  our website, customers of our enterprise AI platform, and individuals whose data is 
                  processed through our services on behalf of our customers.
                </SubSection>
                <SubSection number="1.2">
                  We believe in data minimization, purpose limitation, and transparency. We only collect 
                  data that is necessary for the services we provide, and we are committed to being clear 
                  about how we use your information.
                </SubSection>
                <SubSection number="1.3">
                  For customers using our enterprise AI services, we act as either a data controller or 
                  data processor depending on the context. Where we process data on behalf of customers, 
                  the terms of our Data Processing Agreement (DPA) apply.
                </SubSection>
                
                <Callout type="important" title="Your Trust Matters">
                  We understand that entrusting us with your data is a significant decision. We design 
                  our systems and processes with privacy-by-design principles, ensuring that data 
                  protection is embedded into everything we do.
                </Callout>
              </Section>

              <Section id="controller" number={2} title="Data Controller">
                <SubSection number="2.1">
                  APEXE3 Limited is the data controller for personal data collected through our website 
                  and for data we collect directly from individuals. Our registered office is:
                </SubSection>
                <div className="pl-6 mb-4 p-4 rounded-lg bg-surface-800 border border-border">
                  <p className="font-medium text-content-primary mb-2">APEXE3 Limited</p>
                  <p className="text-content-secondary">100 Liverpool Street</p>
                  <p className="text-content-secondary">London, EC2M 2RH</p>
                  <p className="text-content-secondary">United Kingdom</p>
                  <p className="mt-2 text-content-secondary">
                    Email: <a href="mailto:privacy@apexe3.ai" className="text-accent hover:underline">privacy@apexe3.ai</a>
                  </p>
                  <p className="text-content-secondary">
                    Phone: +44 (0) 20 1234 5678
                  </p>
                </div>
                <SubSection number="2.2">
                  Our Data Protection Officer (DPO) can be contacted at dpo@apexe3.ai for any 
                  privacy-related inquiries or to exercise your rights under applicable data 
                  protection laws.
                </SubSection>
              </Section>

              <Section id="data-collected" number={3} title="Data We Collect">
                <SubSection number="3.1">
                  We collect several categories of personal data, depending on how you interact 
                  with our services:
                </SubSection>
                
                <DataTable
                  headers={['Category', 'Examples', 'Source']}
                  rows={[
                    ['Identity Data', 'Name, job title, company name', 'You provide directly'],
                    ['Contact Data', 'Email, phone number, postal address', 'You provide directly'],
                    ['Account Data', 'Username, password, preferences', 'Account creation'],
                    ['Technical Data', 'IP address, device info, browser type', 'Automatically collected'],
                    ['Usage Data', 'Features used, time spent, interactions', 'Service usage'],
                    ['Communication Data', 'Support tickets, feedback, correspondence', 'Interactions with us'],
                    ['Payment Data', 'Billing address, payment method (tokenized)', 'Payment processing'],
                    ['Customer Data', 'Data you upload to our AI platform', 'You provide for processing'],
                  ]}
                />
                
                <SubSection number="3.2">
                  We do not collect special category data (sensitive personal data) unless explicitly 
                  required for a specific service feature and with your explicit consent.
                </SubSection>
              </Section>

              <Section id="how-collected" number={4} title="How We Collect Data">
                <SubSection number="4.1">
                  We collect personal data through various methods:
                </SubSection>
                <div className="pl-6 mb-4 space-y-3 text-content-secondary">
                  <p><strong className="text-content-primary">(a) Direct Collection:</strong> When you register for an account, contact us, subscribe to our newsletter, or interact with our services.</p>
                  <p><strong className="text-content-primary">(b) Automated Collection:</strong> Through cookies, web beacons, and similar technologies when you visit our website or use our platform.</p>
                  <p><strong className="text-content-primary">(c) Third-Party Sources:</strong> From business partners, publicly available sources, and third-party services you've authorized to share data with us.</p>
                  <p><strong className="text-content-primary">(d) Customer Upload:</strong> When our customers upload data to our AI platform for processing, which may include personal data about their employees, customers, or contacts.</p>
                </div>
                
                <Callout type="note" title="Customer Responsibility">
                  When customers use our AI services to process data about other individuals, the 
                  customer is typically the data controller and we act as a data processor. Customers 
                  are responsible for ensuring they have appropriate legal bases to share that data with us.
                </Callout>
              </Section>

              <Section id="purposes" number={5} title="Purposes of Processing">
                <SubSection number="5.1">
                  We process personal data for the following purposes:
                </SubSection>
                
                <DataTable
                  headers={['Purpose', 'Data Types', 'Legal Basis']}
                  rows={[
                    ['Providing services', 'Account, Identity, Customer Data', 'Contract performance'],
                    ['Account management', 'Identity, Contact, Account', 'Contract performance'],
                    ['Customer support', 'Communication, Account', 'Contract, Legitimate interest'],
                    ['Security & fraud prevention', 'Technical, Usage', 'Legitimate interest'],
                    ['Product improvement', 'Usage, Technical', 'Legitimate interest'],
                    ['Marketing (with consent)', 'Contact, Identity', 'Consent'],
                    ['Legal compliance', 'Various as required', 'Legal obligation'],
                    ['Analytics & research', 'Usage, Technical (aggregated)', 'Legitimate interest'],
                  ]}
                />
                
                <SubSection number="5.2">
                  For marketing communications, we only send promotional content when you have opted 
                  in. You can withdraw your consent at any time by clicking the unsubscribe link in 
                  our emails or contacting us directly.
                </SubSection>
              </Section>

              <Section id="legal-basis" number={6} title="Legal Basis for Processing">
                <SubSection number="6.1">
                  Under GDPR and UK GDPR, we rely on the following legal bases for processing:
                </SubSection>
                <div className="pl-6 mb-4 space-y-3 text-content-secondary">
                  <p><strong className="text-content-primary">(a) Contract Performance:</strong> Processing necessary to provide our services and fulfill our contractual obligations to you.</p>
                  <p><strong className="text-content-primary">(b) Legal Obligation:</strong> Processing required to comply with applicable laws, regulations, or legal processes.</p>
                  <p><strong className="text-content-primary">(c) Legitimate Interests:</strong> Processing for our legitimate business interests, such as security, fraud prevention, and product improvement, where these do not override your rights.</p>
                  <p><strong className="text-content-primary">(d) Consent:</strong> Processing based on your freely given, specific, informed, and unambiguous consent.</p>
                </div>
                <SubSection number="6.2">
                  For California residents under CCPA, we collect and use personal information for 
                  the business purposes disclosed in this policy, and we do not sell personal 
                  information as defined under the CCPA.
                </SubSection>
              </Section>

              <Section id="data-sharing" number={7} title="Data Sharing & Disclosure">
                <SubSection number="7.1">
                  We may share your personal data with:
                </SubSection>
                <div className="pl-6 mb-4 space-y-3 text-content-secondary">
                  <p><strong className="text-content-primary">(a) Service Providers:</strong> Third parties who perform services on our behalf, including cloud hosting, payment processing, email delivery, and analytics.</p>
                  <p><strong className="text-content-primary">(b) Business Partners:</strong> Authorized partners who provide complementary services, subject to your consent where required.</p>
                  <p><strong className="text-content-primary">(c) Professional Advisers:</strong> Lawyers, accountants, and auditors where necessary for professional services.</p>
                  <p><strong className="text-content-primary">(d) Legal Requirements:</strong> When required by law, regulation, court order, or government authority.</p>
                  <p><strong className="text-content-primary">(e) Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, with appropriate notice.</p>
                </div>
                
                <Callout type="important" title="We Never Sell Your Data">
                  We do not sell, rent, or trade your personal data to third parties for their 
                  marketing purposes. Your data is used solely for providing and improving our 
                  services as described in this policy.
                </Callout>
              </Section>

              <Section id="international" number={8} title="International Data Transfers">
                <SubSection number="8.1">
                  APEXE3 is a UK-based company, but we may transfer personal data outside the UK 
                  and European Economic Area (EEA) in certain circumstances:
                </SubSection>
                <div className="pl-6 mb-4 space-y-3 text-content-secondary">
                  <p><strong className="text-content-primary">(a) To countries with adequacy decisions:</strong> Countries recognized by the UK or EU as providing adequate data protection.</p>
                  <p><strong className="text-content-primary">(b) Under Standard Contractual Clauses:</strong> Using approved contractual safeguards for transfers to non-adequate countries.</p>
                  <p><strong className="text-content-primary">(c) With your explicit consent:</strong> When you have explicitly consented to the transfer after being informed of the risks.</p>
                </div>
                <SubSection number="8.2">
                  For US-based service providers, we rely on the UK Extension to the EU-US Data 
                  Privacy Framework or Standard Contractual Clauses as appropriate.
                </SubSection>
                <SubSection number="8.3">
                  For enterprise customers, we offer data residency options allowing you to specify 
                  where your Customer Data is processed and stored. Contact us for details on 
                  regional deployment options.
                </SubSection>
              </Section>

              <Section id="retention" number={9} title="Data Retention">
                <SubSection number="9.1">
                  We retain personal data only for as long as necessary to fulfill the purposes 
                  for which it was collected, including legal, accounting, or reporting requirements:
                </SubSection>
                
                <DataTable
                  headers={['Data Type', 'Retention Period', 'Basis']}
                  rows={[
                    ['Account data', 'Duration of account + 90 days', 'Service provision'],
                    ['Customer Data', 'Per customer agreement', 'Contract'],
                    ['Website visitor data', '2 years from last visit', 'Legitimate interest'],
                    ['Support communications', '7 years from resolution', 'Legal requirements'],
                    ['Marketing consent records', 'Until withdrawal + 3 years', 'Compliance'],
                    ['Security logs', '1-2 years', 'Security, legal claims'],
                    ['Payment records', '7 years', 'Legal requirements'],
                  ]}
                />
                
                <SubSection number="9.2">
                  When data is no longer needed, we securely delete or anonymize it. Anonymized 
                  data may be retained for statistical and research purposes.
                </SubSection>
              </Section>

              <Section id="rights" number={10} title="Your Rights">
                <SubSection number="10.1">
                  Depending on your location, you have various rights regarding your personal data:
                </SubSection>
                <div className="pl-6 mb-4 space-y-3 text-content-secondary">
                  <p><strong className="text-content-primary">(a) Access:</strong> Request a copy of your personal data we hold.</p>
                  <p><strong className="text-content-primary">(b) Rectification:</strong> Request correction of inaccurate or incomplete data.</p>
                  <p><strong className="text-content-primary">(c) Erasure:</strong> Request deletion of your personal data ("right to be forgotten").</p>
                  <p><strong className="text-content-primary">(d) Restriction:</strong> Request limitation of processing in certain circumstances.</p>
                  <p><strong className="text-content-primary">(e) Portability:</strong> Receive your data in a structured, machine-readable format.</p>
                  <p><strong className="text-content-primary">(f) Objection:</strong> Object to processing based on legitimate interests or for direct marketing.</p>
                  <p><strong className="text-content-primary">(g) Withdraw Consent:</strong> Withdraw consent where processing is based on consent.</p>
                </div>
                
                <Callout type="note" title="California Residents">
                  Under CCPA, you also have the right to know what personal information we collect, 
                  request deletion, opt-out of sales (though we don't sell data), and non-discrimination 
                  for exercising your rights.
                </Callout>
                
                <SubSection number="10.2">
                  To exercise any of these rights, contact us at privacy@apexe3.ai or through 
                  your account settings. We will respond within one month (extendable by two 
                  months for complex requests).
                </SubSection>
                <SubSection number="10.3">
                  If you are not satisfied with our response, you have the right to lodge a 
                  complaint with your local data protection authority. In the UK, this is the 
                  Information Commissioner's Office (ICO).
                </SubSection>
              </Section>

              <Section id="security" number={11} title="Data Security">
                <SubSection number="11.1">
                  We implement robust technical and organizational measures to protect your 
                  personal data:
                </SubSection>
                <div className="pl-6 mb-4 space-y-3 text-content-secondary">
                  <p><strong className="text-content-primary">(a) Encryption:</strong> All data is encrypted in transit (TLS 1.3) and at rest (AES-256).</p>
                  <p><strong className="text-content-primary">(b) Access Controls:</strong> Role-based access, multi-factor authentication, and principle of least privilege.</p>
                  <p><strong className="text-content-primary">(c) Infrastructure Security:</strong> SOC 2 Type II certified infrastructure with regular penetration testing.</p>
                  <p><strong className="text-content-primary">(d) Employee Training:</strong> Regular security awareness training and background checks for staff.</p>
                  <p><strong className="text-content-primary">(e) Incident Response:</strong> Documented procedures for detecting, responding to, and notifying about security incidents.</p>
                </div>
                <SubSection number="11.2">
                  In the event of a data breach affecting your personal data, we will notify 
                  you and the relevant supervisory authority within 72 hours of becoming aware, 
                  as required by law.
                </SubSection>
              </Section>

              <Section id="cookies" number={12} title="Cookies & Tracking Technologies">
                <SubSection number="12.1">
                  We use cookies and similar technologies on our website for:
                </SubSection>
                
                <DataTable
                  headers={['Cookie Type', 'Purpose', 'Duration']}
                  rows={[
                    ['Essential', 'Security, authentication, basic functionality', 'Session/30 days'],
                    ['Functional', 'Remember preferences, personalize experience', '1 year'],
                    ['Analytics', 'Understand website usage and performance', '2 years'],
                    ['Marketing', 'Deliver relevant advertisements (with consent)', '90 days'],
                  ]}
                />
                
                <SubSection number="12.2">
                  You can manage cookie preferences through your browser settings or our cookie 
                  consent banner. Note that disabling certain cookies may affect website functionality.
                </SubSection>
                
                <Callout type="note" title="Third-Party Cookies">
                  Some cookies are set by third-party services like analytics providers. We 
                  recommend reviewing their privacy policies for information about how they 
                  use cookies.
                </Callout>
              </Section>

              <Section id="third-party" number={13} title="Third-Party Services">
                <SubSection number="13.1">
                  We use various third-party services that may collect or process personal data:
                </SubSection>
                <div className="pl-6 mb-4 space-y-3 text-content-secondary">
                  <p><strong className="text-content-primary">(a) Cloud Infrastructure:</strong> AWS, Azure, or GCP for hosting and compute services.</p>
                  <p><strong className="text-content-primary">(b) Analytics:</strong> Google Analytics, Mixpanel, or similar for product analytics.</p>
                  <p><strong className="text-content-primary">(c) Communications:</strong> SendGrid, Mailchimp, or similar for email delivery.</p>
                  <p><strong className="text-content-primary">(d) Payment Processing:</strong> Stripe or similar for handling payments.</p>
                  <p><strong className="text-content-primary">(e) Customer Support:</strong> Intercom, Zendesk, or similar for support interactions.</p>
                </div>
                <SubSection number="13.2">
                  These third parties are contractually bound to protect your data and only 
                  process it according to our instructions. Links to their privacy policies 
                  are available upon request.
                </SubSection>
              </Section>

              <Section id="children" number={14} title="Children's Privacy">
                <SubSection number="14.1">
                  Our services are designed for enterprise use and are not intended for children 
                  under the age of 16. We do not knowingly collect personal data from children.
                </SubSection>
                <SubSection number="14.2">
                  If we become aware that we have collected personal data from a child without 
                  appropriate consent, we will take steps to delete that information promptly.
                </SubSection>
                <SubSection number="14.3">
                  If you believe we have collected data from a child, please contact us immediately 
                  at privacy@apexe3.ai.
                </SubSection>
              </Section>

              <Section id="ai-processing" number={15} title="AI & Machine Learning">
                <SubSection number="15.1">
                  As an AI company, we use machine learning and artificial intelligence in our 
                  services. Here's how this affects your privacy:
                </SubSection>
                <div className="pl-6 mb-4 space-y-3 text-content-secondary">
                  <p><strong className="text-content-primary">(a) Training Data:</strong> We do not use your Customer Data to train our general AI models without explicit consent. Your data remains yours.</p>
                  <p><strong className="text-content-primary">(b) Model Outputs:</strong> AI-generated outputs are processed based on our legitimate interests and contractual obligations.</p>
                  <p><strong className="text-content-primary">(c) Automated Decisions:</strong> We do not make solely automated decisions with legal or significant effects without human review and your ability to contest.</p>
                  <p><strong className="text-content-primary">(d) Anonymization:</strong> Where we use data for model improvement, we anonymize or aggregate it first.</p>
                </div>
                
                <Callout type="important" title="Your Data, Your Control">
                  Unlike some AI services, APEXE3 does not claim ownership of or rights to use 
                  your Customer Data beyond what's necessary to provide the services. Your 
                  proprietary data stays yours.
                </Callout>
              </Section>

              <Section id="changes" number={16} title="Changes to This Policy">
                <SubSection number="16.1">
                  We may update this Privacy Policy from time to time. The "Last Updated" date 
                  at the top indicates when the most recent changes were made.
                </SubSection>
                <SubSection number="16.2">
                  For significant changes that affect your rights, we will notify you via email, 
                  in-app notification, or prominent notice on our website at least 30 days before 
                  the changes take effect.
                </SubSection>
                <SubSection number="16.3">
                  We encourage you to review this policy periodically. Your continued use of our 
                  services after changes take effect constitutes acceptance of the updated policy.
                </SubSection>
              </Section>

              <Section id="contact" number={17} title="Contact Us">
                <SubSection number="17.1">
                  For any privacy-related inquiries, or to exercise your rights, please contact:
                </SubSection>
                <div className="pl-6 mb-4 space-y-3 text-content-secondary">
                  <div className="p-4 rounded-lg bg-surface-800 border border-border">
                    <p className="font-medium text-content-primary mb-2">APEXE3 Limited</p>
                    <p>Data Protection Officer</p>
                    <p>Email: privacy@apexe3.ai</p>
                    <p>Phone: +44 (0) 20 1234 5678</p>
                    <p className="mt-2">
                      Registered Office:<br />
                      100 Liverpool Street<br />
                      London, EC2M 2RH<br />
                      United Kingdom
                    </p>
                  </div>
                </div>
                <SubSection number="17.2">
                  For security concerns or vulnerability reports, please contact 
                  security@apexe3.ai. We maintain a responsible disclosure program.
                </SubSection>
                <SubSection number="17.3">
                  For GDPR-specific inquiries, our EU Representative (if applicable) can be 
                  contacted through our Data Protection Officer.
                </SubSection>
              </Section>

              {/* Final acknowledgment */}
              <div className="mt-16 p-6 rounded-lg bg-surface-800 border border-accent/20">
                <div className="flex items-start gap-4">
                  <Eye className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-content-primary mb-2">Our Commitment to You</h3>
                    <p className="text-content-secondary text-sm leading-relaxed">
                      At APEXE3, we believe that protecting your privacy is not just a legal 
                      obligation but a fundamental aspect of the trust you place in us. We are 
                      committed to being transparent about our data practices and responsive to 
                      your privacy needs. If you have any questions or concerns about how we 
                      handle your personal data, please don't hesitate to reach out.
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
