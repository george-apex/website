'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// =============================================================================
// PREMIUM HERO EFFECT - Enterprise Architecture Intelligence Reveal
// =============================================================================
// A sophisticated light-based cursor interaction that reveals hidden 
// enterprise AI infrastructure. Symbolizes revealing signal from darkness,
// bringing clarity to complexity, exposing the system beneath the surface.
// =============================================================================

interface PremiumHeroEffectProps {
  className?: string
  lightRadius?: number
  debug?: boolean // Shows full architecture without light interaction
}

export function PremiumHeroEffect({
  className = '',
  lightRadius = 220,
  debug = false,
}: PremiumHeroEffectProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const animationRef = React.useRef<number>(0)
  
  // Light state - click to toggle
  const [isLightActive, setIsLightActive] = React.useState(false)
  const lightActiveRef = React.useRef(false)
  const lightOpacityRef = React.useRef(0)
  
  // Mouse position with smooth interpolation
  const mouseRef = React.useRef({ x: 0.5, y: 0.5 })
  const targetMouseRef = React.useRef({ x: 0.5, y: 0.5 })
  
  // Pre-rendered hidden visual (cached)
  const hiddenVisualRef = React.useRef<HTMLCanvasElement | null>(null)
  const dimensionsRef = React.useRef({ width: 0, height: 0, dpr: 1 })

  // =============================================================================
  // HIDDEN VISUAL GENERATION - Enterprise AI Architecture Blueprint
  // =============================================================================
  const generateHiddenVisual = React.useCallback((width: number, height: number) => {
    console.log('[PremiumHeroEffect] Generating hidden visual:', width, 'x', height)
    const canvas = document.createElement('canvas')
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    
    ctx.scale(dpr, dpr)
    
    // Pure black background - completely hidden
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)
    
    // ==========================================================================
    // HELPER: Create radial gradient with rgba
    // ==========================================================================
    const createGlow = (x: number, y: number, innerR: number, outerR: number, color: string, alpha: number) => {
      const gradient = ctx.createRadialGradient(x, y, innerR, x, y, outerR)
      gradient.addColorStop(0, `rgba(${color}, ${alpha})`)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      return gradient
    }
    
    // ==========================================================================
    // COLORS - Premium enterprise palette (RGB values for gradients)
    // ==========================================================================
    const colors = {
      blue: '59, 130, 246',
      indigo: '99, 102, 241',
      cyan: '6, 182, 212',
      violet: '167, 139, 250',
      white: '255, 255, 255',
      slate: '100, 116, 139',
    }
    
    const centerX = width / 2
    const centerY = height / 2
    
    // ==========================================================================
    // LAYER 1: Subtle background grid
    // ==========================================================================
    ctx.save()
    ctx.globalAlpha = 0.25
    ctx.strokeStyle = `rgba(${colors.blue}, 1)`
    ctx.lineWidth = 0.5
    
    const gridSize = 100
    for (let x = gridSize; x < width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = gridSize; y < height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }
    ctx.restore()
    
    // ==========================================================================
    // LAYER 2: Enterprise Architecture Layers
    // ==========================================================================
    interface Layer {
      name: string
      y: number
      color: string
      nodes: string[]
    }
    
    const layers: Layer[] = [
      { name: 'INGEST', y: 0.08, color: colors.cyan, nodes: ['Raw Data', 'Streams', 'Feeds'] },
      { name: 'PROCESS', y: 0.28, color: colors.blue, nodes: ['Transform', 'Index', 'Query'] },
      { name: 'ANALYZE', y: 0.48, color: colors.indigo, nodes: ['Join', 'Scale', 'Secure'] },
      { name: 'STORAGE', y: 0.68, color: colors.violet, nodes: ['Data Lake', 'Cache', 'Archive'] },
      { name: 'CLIENTS', y: 0.85, color: colors.slate, nodes: ['APIs', 'Dashboards', 'Models'] },
    ]
    
    // Draw layer bands
    layers.forEach((layer) => {
      const layerY = layer.y * height
      const layerHeight = height * 0.15
      
      // Layer background band
      ctx.save()
      ctx.globalAlpha = 0.12
      const bandGradient = ctx.createLinearGradient(0, layerY, width, layerY)
      bandGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      bandGradient.addColorStop(0.3, `rgba(${layer.color}, 1)`)
      bandGradient.addColorStop(0.7, `rgba(${layer.color}, 1)`)
      bandGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = bandGradient
      ctx.fillRect(0, layerY, width, layerHeight)
      ctx.restore()
      
      // Layer separator line
      ctx.save()
      ctx.globalAlpha = 0.5
      ctx.strokeStyle = `rgba(${layer.color}, 1)`
      ctx.lineWidth = 1.5
      ctx.setLineDash([4, 8])
      ctx.beginPath()
      ctx.moveTo(0, layerY)
      ctx.lineTo(width, layerY)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.restore()
      
      // Layer label
      ctx.save()
      ctx.globalAlpha = 0.85
      ctx.font = '600 12px ui-monospace, SFMono-Regular, monospace'
      ctx.fillStyle = `rgba(${layer.color}, 1)`
      ctx.textAlign = 'left'
      ctx.fillText(layer.name, 24, layerY + 20)
      ctx.restore()
      
      // Draw nodes
      const nodeCount = layer.nodes.length
      const nodeSpacing = width / (nodeCount + 1)
      
      layer.nodes.forEach((nodeName, nodeIdx) => {
        const nodeX = nodeSpacing * (nodeIdx + 1)
        const nodeY = layerY + layerHeight / 2 + 15
        
        // Node glow
        ctx.save()
        ctx.fillStyle = createGlow(nodeX, nodeY, 0, 80, layer.color, 0.4)
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, 80, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        
        // Node container (rounded rectangle effect with circle)
        ctx.save()
        ctx.globalAlpha = 1
        
        // Node core
        ctx.fillStyle = `rgba(${layer.color}, 1)`
        ctx.beginPath()
        ctx.arc(nodeX, nodeY, 12, 0, Math.PI * 2)
        ctx.fill()
        
        // Node border
        ctx.strokeStyle = `rgba(${colors.white}, 0.7)`
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.restore()
        
        // Node label
        ctx.save()
        ctx.globalAlpha = 0.95
        ctx.font = '500 11px ui-monospace, SFMono-Regular, monospace'
        ctx.fillStyle = `rgba(${colors.white}, 1)`
        ctx.textAlign = 'center'
        ctx.fillText(nodeName, nodeX, nodeY + 30)
        ctx.restore()
      })
    })
    
    // ==========================================================================
    // LAYER 3: Data Flow Lines (vertical connections)
    // ==========================================================================
    ctx.save()
    ctx.globalAlpha = 0.5
    ctx.strokeStyle = `rgba(${colors.cyan}, 1)`
    ctx.lineWidth = 2
    ctx.setLineDash([6, 4])
    
    const flowColumns = [0.25, 0.5, 0.75]
    flowColumns.forEach(colX => {
      const x = colX * width
      
      ctx.beginPath()
      for (let i = 0; i < layers.length - 1; i++) {
        const startY = (layers[i].y + 0.08) * height
        const endY = layers[i + 1].y * height
        
        ctx.moveTo(x, startY)
        ctx.lineTo(x, endY)
      }
      ctx.stroke()
    })
    ctx.setLineDash([])
    ctx.restore()
    
    // ==========================================================================
    // LAYER 4: Central Intelligence Core
    // ==========================================================================
    
    // Outer ambient glow
    ctx.save()
    ctx.fillStyle = createGlow(centerX, centerY, 0, 250, colors.indigo, 0.25)
    ctx.beginPath()
    ctx.arc(centerX, centerY, 250, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    
    // Orbital rings
    ctx.save()
    for (let i = 3; i >= 0; i--) {
      const radius = 50 + i * 20
      ctx.globalAlpha = 0.25 - i * 0.04
      ctx.strokeStyle = `rgba(${colors.indigo}, 1)`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.restore()
    
    // Core hexagon
    ctx.save()
    ctx.globalAlpha = 1
    ctx.strokeStyle = `rgba(${colors.blue}, 1)`
    ctx.lineWidth = 2.5
    
    const hexRadius = 40
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 2
      const x = centerX + Math.cos(angle) * hexRadius
      const y = centerY + Math.sin(angle) * hexRadius
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()
    
    // Inner hexagon
    const innerHexRadius = 25
    ctx.strokeStyle = `rgba(${colors.cyan}, 1)`
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3
      const x = centerX + Math.cos(angle) * innerHexRadius
      const y = centerY + Math.sin(angle) * innerHexRadius
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
    
    // Core center glow
    ctx.save()
    const coreGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 20)
    coreGlow.addColorStop(0, `rgba(${colors.white}, 1)`)
    coreGlow.addColorStop(0.4, `rgba(${colors.cyan}, 0.9)`)
    coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = coreGlow
    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
    
    // Core label
    ctx.save()
    ctx.globalAlpha = 0.95
    ctx.font = '600 10px ui-monospace, SFMono-Regular, monospace'
    ctx.fillStyle = `rgba(${colors.white}, 1)`
    ctx.textAlign = 'center'
    ctx.fillText('CORE', centerX, centerY + 60)
    ctx.restore()
    
    // ==========================================================================
    // LAYER 5: Intelligence Nodes (distributed processing points)
    // ==========================================================================
    const intelNodes = [
      { x: 0.1, y: 0.18, label: 'SIGNAL' },
      { x: 0.9, y: 0.18, label: 'ALPHA' },
      { x: 0.08, y: 0.62, label: 'DATA' },
      { x: 0.92, y: 0.62, label: 'INSIGHT' },
      { x: 0.15, y: 0.82, label: 'RISK' },
      { x: 0.85, y: 0.82, label: 'QUANT' },
    ]
    
    intelNodes.forEach(node => {
      const nx = node.x * width
      const ny = node.y * height
      
      // Node glow
      ctx.save()
      ctx.fillStyle = createGlow(nx, ny, 0, 50, colors.indigo, 0.5)
      ctx.beginPath()
      ctx.arc(nx, ny, 50, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
      
      // Node point
      ctx.save()
      ctx.globalAlpha = 1
      ctx.fillStyle = `rgba(${colors.cyan}, 1)`
      ctx.beginPath()
      ctx.arc(nx, ny, 8, 0, Math.PI * 2)
      ctx.fill()
      
      // Node border
      ctx.strokeStyle = `rgba(${colors.white}, 0.6)`
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.restore()
      
      // Label
      ctx.save()
      ctx.globalAlpha = 0.85
      ctx.font = '600 10px ui-monospace, SFMono-Regular, monospace'
      ctx.fillStyle = `rgba(${colors.white}, 1)`
      ctx.textAlign = 'center'
      ctx.fillText(node.label, nx, ny + 26)
      ctx.restore()
    })
    
    // ==========================================================================
    // LAYER 6: Connection lines to core
    // ==========================================================================
    ctx.save()
    ctx.globalAlpha = 0.3
    ctx.strokeStyle = `rgba(${colors.indigo}, 1)`
    ctx.lineWidth = 1.5
    ctx.setLineDash([3, 6])
    
    intelNodes.forEach(node => {
      const nx = node.x * width
      const ny = node.y * height
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(nx, ny)
      ctx.stroke()
    })
    
    ctx.setLineDash([])
    ctx.restore()
    
    // ==========================================================================
    // LAYER 7: Ambient particles
    // ==========================================================================
    ctx.save()
    const particleCount = 50
    for (let i = 0; i < particleCount; i++) {
      const px = Math.random() * width
      const py = Math.random() * height
      const psize = Math.random() * 2.5 + 0.5
      const palpha = Math.random() * 0.4 + 0.15
      
      ctx.globalAlpha = palpha
      ctx.fillStyle = `rgba(${colors.cyan}, 1)`
      ctx.beginPath()
      ctx.arc(px, py, psize, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
    
    // ==========================================================================
    // LAYER 8: Subtle vignette
    // ==========================================================================
    const vignette = ctx.createRadialGradient(
      centerX, centerY, height * 0.3,
      centerX, centerY, height
    )
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)')
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.5)')
    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, width, height)
    
    return canvas
  }, [])

  // =============================================================================
  // CANVAS SETUP
  // =============================================================================
  React.useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const setupCanvas = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const width = Math.max(Math.floor(rect.width), 100)
      const height = Math.max(Math.floor(rect.height), 100)
      
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      
      dimensionsRef.current = { width, height, dpr }
      hiddenVisualRef.current = generateHiddenVisual(width, height)
    }

    setupCanvas()
    
    const timers = [50, 100, 200, 500, 1000].map(delay => 
      setTimeout(setupCanvas, delay)
    )

    const resizeObserver = new ResizeObserver(setupCanvas)
    resizeObserver.observe(container)
    window.addEventListener('resize', setupCanvas)

    return () => {
      timers.forEach(t => clearTimeout(t))
      resizeObserver.disconnect()
      window.removeEventListener('resize', setupCanvas)
    }
  }, [generateHiddenVisual])

  // =============================================================================
  // ANIMATION LOOP
  // =============================================================================
  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    let running = true

    const animate = () => {
      if (!running) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const { width, height, dpr } = dimensionsRef.current
      
      if (width <= 100 || height <= 100) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Smooth opacity transition
      const targetOpacity = lightActiveRef.current ? 1 : 0
      lightOpacityRef.current += (targetOpacity - lightOpacityRef.current) * 0.08
      const lightOpacity = lightOpacityRef.current

      // Smooth mouse interpolation
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.12
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.12

      // Reset and scale
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      // Pure black background
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, width, height)
      
      // DEBUG MODE: Show full architecture without light interaction
      if (debug && hiddenVisualRef.current) {
        ctx.globalAlpha = 1
        ctx.drawImage(hiddenVisualRef.current, 0, 0, width, height)
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Light position
      const lightX = mouseRef.current.x * width
      const lightY = mouseRef.current.y * height
      const effectiveRadius = lightRadius * 1.3

      // Light reveal effect
      if (lightOpacity > 0.01 && hiddenVisualRef.current) {
        ctx.save()
        
        // Circular clip for reveal
        ctx.beginPath()
        ctx.arc(lightX, lightY, effectiveRadius, 0, Math.PI * 2)
        ctx.clip()
        
        // Draw hidden visual
        ctx.globalAlpha = lightOpacity * 0.95
        ctx.drawImage(hiddenVisualRef.current, 0, 0, width, height)
        
        ctx.restore()
        
        // Soft edge fade
        ctx.save()
        ctx.globalCompositeOperation = 'destination-out'
        
        const fadeGradient = ctx.createRadialGradient(
          lightX, lightY, lightRadius * 0.4,
          lightX, lightY, effectiveRadius
        )
        fadeGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
        fadeGradient.addColorStop(0.6, 'rgba(0, 0, 0, 0)')
        fadeGradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.4)')
        fadeGradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
        
        ctx.fillStyle = fadeGradient
        ctx.beginPath()
        ctx.arc(lightX, lightY, effectiveRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        
        // Ambient glow
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        
        const outerGlow = ctx.createRadialGradient(
          lightX, lightY, lightRadius * 0.5,
          lightX, lightY, effectiveRadius * 1.2
        )
        outerGlow.addColorStop(0, 'rgba(6, 182, 212, 0)')
        outerGlow.addColorStop(0.5, `rgba(59, 130, 246, ${0.05 * lightOpacity})`)
        outerGlow.addColorStop(1, 'rgba(99, 102, 241, 0)')
        ctx.fillStyle = outerGlow
        ctx.fillRect(0, 0, width, height)
        
        // Inner bright point
        const innerGlow = ctx.createRadialGradient(
          lightX, lightY, 0,
          lightX, lightY, lightRadius * 0.25
        )
        innerGlow.addColorStop(0, `rgba(255, 255, 255, ${0.1 * lightOpacity})`)
        innerGlow.addColorStop(0.5, `rgba(147, 197, 253, ${0.05 * lightOpacity})`)
        innerGlow.addColorStop(1, 'rgba(99, 102, 241, 0)')
        ctx.fillStyle = innerGlow
        ctx.fillRect(0, 0, width, height)
        
        ctx.restore()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      running = false
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [lightRadius, debug])

  // =============================================================================
  // MOUSE TRACKING
  // =============================================================================
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      targetMouseRef.current = {
        x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !e.touches[0]) return
      const rect = containerRef.current.getBoundingClientRect()
      targetMouseRef.current = {
        x: Math.max(0, Math.min(1, (e.touches[0].clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (e.touches[0].clientY - rect.top) / rect.height)),
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // =============================================================================
  // CLICK TO ACTIVATE
  // =============================================================================
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"]')
      
      if (!isInteractive) {
        lightActiveRef.current = !lightActiveRef.current
        setIsLightActive(lightActiveRef.current)
      }
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 w-full h-full cursor-crosshair', className)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Hint when inactive */}
      {!isLightActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-white/20 text-xs font-medium tracking-[0.15em] uppercase animate-pulse">
            Click to reveal architecture
          </div>
        </div>
      )}
    </div>
  )
}

// =============================================================================
// PREMIUM HERO BACKGROUND - Wrapper
// =============================================================================
interface PremiumHeroBackgroundProps {
  className?: string
  debug?: boolean
}

export function PremiumHeroBackground({
  className = '',
  debug = false,
}: PremiumHeroBackgroundProps) {
  return (
    <PremiumHeroEffect
      className={className}
      lightRadius={240}
      debug={debug}
    />
  )
}

export default PremiumHeroEffect
