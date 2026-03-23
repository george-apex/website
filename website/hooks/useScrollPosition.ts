'use client'

import { useState, useEffect, useCallback } from 'react'

interface ScrollPosition {
  x: number
  y: number
  direction: 'up' | 'down' | null
  progress: number
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
    progress: 0,
  })

  const [lastY, setLastY] = useState(0)

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY
    const currentX = window.scrollX
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = documentHeight > 0 ? currentY / documentHeight : 0

    setScrollPosition({
      x: currentX,
      y: currentY,
      direction: currentY > lastY ? 'down' : currentY < lastY ? 'up' : null,
      progress,
    })

    setLastY(currentY)
  }, [lastY])

  useEffect(() => {
    // Initial call
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return scrollPosition
}
