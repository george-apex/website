// ============================================
// SITE CONFIGURATION
// ============================================

export const SITE_CONFIG = {
  name: 'APEXE3',
  legalName: 'APEX:E3',
  description: 'Enterprise AI that respects your sovereignty, adapts to your workflows, and reaches the last mile of operational deployment.',
  url: 'https://apexe3.ai',
  ogImage: '/images/og-image.png',
  links: {
    twitter: 'https://twitter.com/apexe3',
    linkedin: 'https://linkedin.com/company/apexe3',
    github: 'https://github.com/apexe3',
  },
  contact: {
    email: 'contact@apexe3.ai',
    phone: '+1 (555) 123-4567',
  },
} as const

// ============================================
// NAVIGATION
// ============================================

export const NAV_LINKS = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Platform', href: '/platform' },
  { label: 'Security', href: '/security' },
  { label: 'Contact', href: '/contact' },
] as const

export const FOOTER_LINKS = {
  product: [
    { label: 'Platform', href: '/platform' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Security', href: '/security' },
    { label: 'Enterprise Agents', href: '/solutions#agents' },
    { label: 'Integrations', href: '/solutions#integrations' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Case Studies', href: '/solutions#case-studies' },
    { label: 'Whitepapers', href: '/resources' },
    { label: 'Webinars', href: '/webinars' },
    { label: 'API Reference', href: '/api' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security', href: '/security' },
    { label: 'Compliance', href: '/compliance' },
  ],
} as const

// ============================================
// HERO SECTION
// ============================================

export const HERO_CONTENT = {
  headline: 'Secure. Bespoke. Deployed.',
  subheadline: 'Enterprise AI that respects your sovereignty, adapts to your workflows, and reaches the last mile of operational deployment.',
  ctas: {
    primary: { label: 'Book a Demo', href: '#contact' },
    secondary: { label: 'Explore Platform', href: '#platform' },
  },
  trustBar: {
    label: 'Trusted by leading enterprises',
    logos: [
      { name: 'Enterprise Corp', id: 'enterprise-1' },
      { name: 'Global Finance', id: 'enterprise-2' },
      { name: 'HealthTech Inc', id: 'enterprise-3' },
      { name: 'Manufacturing Co', id: 'enterprise-4' },
      { name: 'TechForward', id: 'enterprise-5' },
    ],
  },
} as const

// ============================================
// VALUE PROPOSITION
// ============================================

export const VALUE_PROPOSITIONS = [
  {
    id: 'sovereignty',
    icon: 'Shield',
    title: 'AI Sovereignty',
    headline: 'Control the model. Control the workflow. Control the outcome.',
    description: 'Your AI operates within your infrastructure, follows your compliance requirements, and respects your data governance. Full ownership, full transparency, zero compromise.',
    features: [
      'Private deployment options',
      'Data residency control',
      'Compliance-ready architecture',
      'Full audit trails',
    ],
    color: 'blue',
  },
  {
    id: 'customisation',
    icon: 'Network',
    title: 'Bespoke Agent Customisation',
    headline: 'AI agents tailored to your business, not a template.',
    description: 'We build agents that understand your workflows, integrate with your systems, and adapt to your teams. Every agent is designed for your specific operational reality.',
    features: [
      'Custom workflow integration',
      'Domain-specific training',
      'Team-specific adaptation',
      'Process-aware agents',
    ],
    color: 'cyan',
  },
  {
    id: 'last-mile',
    icon: 'Rocket',
    title: 'The Last Mile',
    headline: 'From pilot to production at enterprise scale.',
    description: 'Most AI stops at the demo. We go further—deploying to real users, integrating with real systems, and delivering real operational impact across your organization.',
    features: [
      'End-user rollout',
      'System integration',
      'Change management',
      'Adoption metrics',
    ],
    color: 'purple',
  },
] as const

// ============================================
// WHY AI FAILS
// ============================================

export const AI_FAILURE_POINTS = [
  {
    title: 'Generic Workflows',
    description: "Off-the-shelf AI doesn't fit your unique business processes.",
    icon: 'XCircle',
  },
  {
    title: 'Black-Box Models',
    description: 'No visibility into how decisions are made or data is used.',
    icon: 'EyeOff',
  },
  {
    title: 'Integration Gaps',
    description: "AI that can't connect with your existing systems and data.",
    icon: 'Unlink',
  },
  {
    title: 'Scale Barriers',
    description: 'Pilots that work for 10 users fail at 10,000.',
    icon: 'Users',
  },
  {
    title: 'Compliance Concerns',
    description: 'Security and regulatory requirements make deployment impossible.',
    icon: 'ShieldAlert',
  },
] as const

// ============================================
// PLATFORM CAPABILITIES
// ============================================

export const PLATFORM_CAPABILITIES = [
  {
    id: 'agents',
    title: 'Enterprise AI Agents',
    description: 'Intelligent agents that understand context, execute complex workflows, and deliver outcomes—not just responses.',
    icon: 'Bot',
    features: ['Task automation', 'Decision support', 'Knowledge synthesis'],
  },
  {
    id: 'orchestration',
    title: 'Workflow Orchestration',
    description: 'Seamlessly coordinate multiple agents, systems, and human touchpoints across your enterprise workflows.',
    icon: 'GitBranch',
    features: ['Multi-agent coordination', 'Human-in-the-loop', 'Process automation'],
  },
  {
    id: 'deployment',
    title: 'Secure Deployment',
    description: 'Deploy AI where you need it—on-premise, private cloud, or hybrid—with enterprise-grade security.',
    icon: 'Server',
    features: ['Private infrastructure', 'Air-gapped options', 'Enterprise SSO'],
  },
  {
    id: 'integrations',
    title: 'Custom Integrations',
    description: 'Connect AI to your existing systems, databases, and applications without disrupting operations.',
    icon: 'Plug',
    features: ['API connectivity', 'Data pipelines', 'Legacy systems'],
  },
  {
    id: 'environments',
    title: 'Controlled Environments',
    description: 'Sandbox, test, and deploy with full control over versions, permissions, and access.',
    icon: 'Lock',
    features: ['Version control', 'Access management', 'Environment isolation'],
  },
  {
    id: 'adoption',
    title: 'Scalable Adoption',
    description: 'Roll out AI to thousands of users with training, support, and change management built in.',
    icon: 'TrendingUp',
    features: ['User onboarding', 'Training programs', 'Adoption analytics'],
  },
  {
    id: 'governance',
    title: 'Observability & Governance',
    description: 'Full visibility into AI operations with audit trails, monitoring, and compliance reporting.',
    icon: 'Activity',
    features: ['Real-time monitoring', 'Audit logging', 'Compliance reports'],
  },
] as const

// ============================================
// USE CASES
// ============================================

export const USE_CASES = [
  {
    id: 'operations',
    title: 'Operations & Workflow Automation',
    description: 'Streamline complex operational workflows with AI agents that handle routing, approvals, and exceptions.',
    metrics: { improvement: '40%', label: 'efficiency gain' },
    icon: 'Settings',
  },
  {
    id: 'support',
    title: 'Customer Support Intelligence',
    description: 'Resolve issues faster with AI that understands context, accesses knowledge bases, and escalates appropriately.',
    metrics: { improvement: '60%', label: 'faster resolution' },
    icon: 'Headphones',
  },
  {
    id: 'knowledge',
    title: 'Internal Knowledge Systems',
    description: 'Transform scattered documentation into an intelligent knowledge system that delivers answers, not search results.',
    metrics: { improvement: '75%', label: 'knowledge access' },
    icon: 'BookOpen',
  },
  {
    id: 'decisions',
    title: 'Decision Support & Analytics',
    description: 'Augment strategic decisions with AI that synthesizes data, identifies patterns, and surfaces insights.',
    metrics: { improvement: '3x', label: 'faster insights' },
    icon: 'BarChart',
  },
  {
    id: 'compliance',
    title: 'Compliance & Regulatory',
    description: 'Navigate complex regulatory environments with AI trained on your specific compliance requirements.',
    metrics: { improvement: '90%', label: 'audit readiness' },
    icon: 'ShieldCheck',
  },
  {
    id: 'productivity',
    title: 'Enterprise Productivity',
    description: 'Empower every employee with AI assistants that handle routine tasks and amplify human capabilities.',
    metrics: { improvement: '25%', label: 'productivity boost' },
    icon: 'Zap',
  },
] as const

// ============================================
// DEPLOYMENT JOURNEY
// ============================================

export const DEPLOYMENT_JOURNEY = [
  {
    step: 1,
    id: 'discover',
    title: 'Discover',
    description: 'We analyze your workflows, identify opportunities, and define success metrics together.',
    icon: 'Search',
  },
  {
    step: 2,
    id: 'design',
    title: 'Design',
    description: 'Architect the right solution—agents, integrations, and deployment strategy tailored to your needs.',
    icon: 'PenTool',
  },
  {
    step: 3,
    id: 'customise',
    title: 'Customise',
    description: 'Build and train agents specific to your business processes, data, and team requirements.',
    icon: 'Sliders',
  },
  {
    step: 4,
    id: 'integrate',
    title: 'Integrate',
    description: 'Connect to your systems, data sources, and workflows with minimal disruption to operations.',
    icon: 'Link',
  },
  {
    step: 5,
    id: 'deploy',
    title: 'Deploy',
    description: 'Roll out to production environments with security, compliance, and governance baked in.',
    icon: 'Upload',
  },
  {
    step: 6,
    id: 'scale',
    title: 'Scale',
    description: 'Expand across teams, departments, and use cases with ongoing support and optimization.',
    icon: 'Maximize',
  },
] as const

// ============================================
// TRUST & SECURITY
// ============================================

export const TRUST_PILLARS = [
  {
    id: 'architecture',
    title: 'Secure Architecture',
    description: 'Built from the ground up with enterprise security in mind. Zero-trust design, encrypted communications, and isolation by default.',
    icon: 'Shield',
  },
  {
    id: 'deployment-control',
    title: 'Controlled Deployment',
    description: 'Deploy where you want, how you want. On-premise, private cloud, hybrid, or air-gapped environments.',
    icon: 'Server',
  },
  {
    id: 'governance',
    title: 'Enterprise Governance',
    description: 'Role-based access, approval workflows, and full audit trails. AI that operates within your governance framework.',
    icon: 'Scale',
  },
  {
    id: 'sovereignty',
    title: 'Data Sovereignty',
    description: 'Your data stays yours. Control where it lives, who accesses it, and how it is used by AI systems.',
    icon: 'Flag',
  },
  {
    id: 'compliance',
    title: 'Compliance Ready',
    description: 'Built to meet SOC 2, HIPAA, GDPR, and industry-specific requirements. Audit-ready documentation.',
    icon: 'FileCheck',
  },
  {
    id: 'ownership',
    title: 'Full Ownership',
    description: 'Own your AI infrastructure, models, and configurations. No vendor lock-in, no hidden dependencies.',
    icon: 'Key',
  },
] as const

// ============================================
// CASE STUDIES
// ============================================

export const CASE_STUDIES = [
  {
    id: 'financial-services',
    company: 'Global Financial Services',
    industry: 'Financial Services',
    logo: '/images/case-studies/financial-logo.svg',
    challenge: 'Needed to automate compliance document review across 50+ regulatory frameworks while maintaining audit trails.',
    solution: 'Deployed custom compliance agents trained on regulatory frameworks with full audit logging.',
    results: [
      { metric: '85%', label: 'faster document review' },
      { metric: '99.9%', label: 'audit compliance' },
      { metric: '$2.5M', label: 'annual savings' },
    ],
    quote: {
      text: 'APEXE3 transformed our compliance operations. What used to take days now happens in hours, with complete confidence in the audit trail.',
      author: 'Chief Compliance Officer',
    },
  },
  {
    id: 'healthcare',
    company: 'Regional Healthcare System',
    industry: 'Healthcare',
    logo: '/images/case-studies/healthcare-logo.svg',
    challenge: 'Medical staff struggled to access scattered clinical knowledge, leading to inconsistent patient care.',
    solution: 'Built a clinical knowledge system with HIPAA-compliant AI agents that deliver instant, accurate answers.',
    results: [
      { metric: '70%', label: 'faster clinical decisions' },
      { metric: '40%', label: 'reduced errors' },
      { metric: '95%', label: 'staff adoption' },
    ],
    quote: {
      text: 'Our physicians now have instant access to institutional knowledge. Patient outcomes have improved measurably.',
      author: 'CMO',
    },
  },
  {
    id: 'manufacturing',
    company: 'Industrial Manufacturing Co',
    industry: 'Manufacturing',
    logo: '/images/case-studies/manufacturing-logo.svg',
    challenge: 'Production line issues required expert intervention, causing costly delays when experts were unavailable.',
    solution: 'Deployed operations agents that guide technicians through troubleshooting with expert-level accuracy.',
    results: [
      { metric: '60%', label: 'faster issue resolution' },
      { metric: '50%', label: 'less downtime' },
      { metric: '$4M', label: 'annual savings' },
    ],
    quote: {
      text: 'The AI handles 80% of troubleshooting scenarios. Our experts focus on the complex 20% that truly need their expertise.',
      author: 'VP of Operations',
    },
  },
] as const

// ============================================
// STATS
// ============================================

export const COMPANY_STATS = [
  { value: '150+', label: 'Enterprise Clients' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '500K+', label: 'Users Deployed' },
  { value: '40+', label: 'Countries' },
] as const

// ============================================
// FAQ
// ============================================

export const FAQ_ITEMS = [
  {
    question: 'How is APEXE3 different from other enterprise AI platforms?',
    answer: 'APEXE3 focuses on the full deployment lifecycle—from customization to last-mile adoption. We don\'t just provide AI models; we build agents tailored to your workflows, deploy them securely in your environment, and ensure they reach actual users at scale.',
  },
  {
    question: 'What deployment options do you support?',
    answer: 'We support on-premise, private cloud (AWS, Azure, GCP), hybrid, and air-gapped deployments. Your AI operates within your infrastructure with full sovereignty over data and models.',
  },
  {
    question: 'How do you ensure data security and compliance?',
    answer: 'Security is built into our architecture, not added on. We maintain SOC 2 Type II compliance, support HIPAA and GDPR requirements, and provide full audit trails. All data is encrypted at rest and in transit, with customer-controlled encryption keys available.',
  },
  {
    question: 'What does "bespoke agent customisation" mean?',
    answer: 'Every agent we build is tailored to your specific workflows, systems, and team needs. We don\'t use one-size-fits-all templates. Your agents understand your business context, integrate with your tools, and adapt to how your teams work.',
  },
  {
    question: 'How long does a typical deployment take?',
    answer: 'Timeline varies based on complexity, but most enterprise deployments go from discovery to initial rollout in 8-12 weeks. We prioritize early wins and scale iteratively based on measured outcomes.',
  },
  {
    question: 'Do you offer ongoing support after deployment?',
    answer: 'Absolutely. We provide dedicated customer success management, 24/7 technical support, continuous model optimization, and regular platform updates. Our goal is long-term partnership, not a one-time implementation.',
  },
] as const
