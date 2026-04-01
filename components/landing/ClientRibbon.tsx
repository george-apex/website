'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const CLIENTS = [
  { name: 'Vanguard', logo: '/client-logos/Vanguard-logo.png', color: 'original', width: 180 },
  { name: 'DWS', logo: '/client-logos/DWS_Group_202x_logo.svg', color: 'white', width: 180 },
  { name: 'DeusX', logo: '/client-logos/DeusX_temp_logo.svg', color: 'white', width: 180 },
  { name: 'Example 3', logo: 'EXAMPLE 3' },
  { name: 'Example 4', logo: 'EXAMPLE 4' },
  { name: 'Example 5', logo: 'EXAMPLE 5' },
  { name: 'Example 6', logo: 'EXAMPLE 6' },
  { name: 'Example 7', logo: 'EXAMPLE 7' },
  { name: 'Example 8', logo: 'EXAMPLE 8' },
  { name: 'Example 9', logo: 'EXAMPLE 9' },
  { name: 'Example 10', logo: 'EXAMPLE 10' },
  { name: 'Example 11', logo: 'EXAMPLE 11' },
]

export function ClientRibbon() {
  return (
    <section className="relative py-6 bg-surface-950 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-surface-950 via-transparent to-surface-950 z-10 pointer-events-none" />
      
      <div className="flex items-center">
        <motion.div
          className="flex items-center gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 40,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...CLIENTS, ...CLIENTS].map((client, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-white/20 hover:text-white/40 transition-colors duration-300"
            >
              {client.logo.startsWith('/') ? (
                <div style={{ width: client.width || 128 }} className={`relative h-10 opacity-80 hover:opacity-100 transition-all duration-300 ${client.color === 'white' ? 'brightness-0 invert' : ''}`}>
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <>
                  <div className="w-8 h-8 rounded border border-white/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                  </div>
                  <span className="text-sm font-medium tracking-wider">{client.logo}</span>
                </>
              )}
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute left-0 bottom-1 z-20 pointer-events-none pl-12 desktop:pl-16">
        <div className="text-[10px] text-white/30 uppercase tracking-widest">
          Trusted by Global Institutions
        </div>
      </div>
    </section>
  )
}

export default ClientRibbon
