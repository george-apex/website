'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Twitter, Linkedin, Github, Mail } from 'lucide-react'
import { SITE_CONFIG, FOOTER_LINKS } from '@/lib/constants'

const socialLinks = [
  { name: 'Twitter', href: SITE_CONFIG.links.twitter, icon: Twitter },
  { name: 'LinkedIn', href: SITE_CONFIG.links.linkedin, icon: Linkedin },
  { name: 'GitHub', href: SITE_CONFIG.links.github, icon: Github },
  { name: 'Email', href: `mailto:${SITE_CONFIG.contact.email}`, icon: Mail },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-surface-900 border-t border-border overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Top accent line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container-main relative z-10 py-8 max-[393px]:py-6 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-card border border-accent/30 bg-surface-800 flex items-center justify-center">
                  <span className="text-accent font-bold text-lg font-mono">A</span>
                </div>
                <div className="absolute inset-0 rounded-card bg-accent/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-lg font-medium text-content-primary">
                {SITE_CONFIG.name}
              </span>
            </Link>
            
            <p className="mt-4 text-body-sm text-content-secondary max-w-xs leading-relaxed">
              {SITE_CONFIG.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-card border border-border bg-surface-800 flex items-center justify-center text-content-tertiary hover:text-accent hover:border-accent/30 hover:bg-surface-700 transition-all duration-200"
                  aria-label={social.name}
                  whileHover={{ y: -2 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="max-[393px]:hidden">
            <h3 className="text-label font-medium text-accent mb-4 uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-content-secondary hover:text-content-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="max-[393px]:hidden">
            <h3 className="text-label font-medium text-accent mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-content-secondary hover:text-content-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="max-[393px]:hidden">
            <h3 className="text-label font-medium text-accent mb-4 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-content-secondary hover:text-content-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="max-[393px]:hidden">
            <h3 className="text-label font-medium text-accent mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  {link.label === 'Terms of Service' ? (
                    <Link
                      href="/terms"
                      className="text-body-sm text-content-secondary hover:text-content-primary transition-colors duration-200"
                    >
                      Terms of Service
                    </Link>
                  ) : link.label === 'Privacy Policy' ? (
                    <Link
                      href="/privacy"
                      className="text-body-sm text-content-secondary hover:text-content-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-body-sm text-content-secondary hover:text-content-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 max-[393px]:mt-6 pt-6 max-[393px]:pt-4 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-body-sm text-content-tertiary">
              © {currentYear} {SITE_CONFIG.legalName}. All rights reserved.
            </p>
            <p className="text-body-sm text-content-tertiary font-mono">
              Built for enterprises that demand more from AI.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
