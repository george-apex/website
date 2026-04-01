'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const CLIENTS = [
  { 
    name: 'Vanguard', 
    logo: '/client-logos/Vanguard-logo.png', 
    height: 40,
    aspectRatio: 3.2,
    invert: false
  },
  { 
    name: 'DWS', 
    logo: '/client-logos/DWS_Group_202x_logo.svg', 
    height: 40,
    aspectRatio: 2.8,
    invert: true
  },
  { 
    name: 'DeusX', 
    logo: '/client-logos/DeusX_temp_logo.svg', 
    height: 40,
    aspectRatio: 2.2,
    invert: true
  },
  { 
    name: 'CorPrime', 
    logo: '/client-logos/CorPrime-Logo.png', 
    height: 40,
    aspectRatio: 2.5,
    invert: true
  },
  { 
    name: 'University of Oxford', 
    logo: '/client-logos/university-of-oxford-badge-logo.svg', 
    height: 40,
    aspectRatio: 1.1,
    invert: true
  },
]

const DISPLAY_CLIENTS = [...CLIENTS, ...CLIENTS, ...CLIENTS]

export function ClientRibbon() {
  return (
    <section className="relative py-8 bg-surface-950 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-surface-950 via-transparent to-surface-950 z-10 pointer-events-none" />
      
      <div className="flex items-center">
        <motion.div
          className="flex items-center gap-24 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 25,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {DISPLAY_CLIENTS.map((client, i) => (
            <div
              key={i}
              className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
              style={{ 
                width: client.height * client.aspectRatio,
                height: client.height 
              }}
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={client.height * client.aspectRatio}
                height={client.height}
                className={`object-contain ${client.invert ? 'brightness-0 invert' : ''}`}
              />
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
