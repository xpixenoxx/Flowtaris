'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  start?: number
  enabled?: boolean
}

/**
 * Hook for animating number counting up.
 * Used for statistics/metrics sections.
 */
export function useCountUp({
  end,
  duration = 1500,
  start = 0,
  enabled = true,
}: UseCountUpOptions): number {
  const [count, setCount] = useState(start)
  const rafRef = useRef<number | null>(null)

  const animate = useCallback(() => {
    let startTimestamp: number | null = null

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)

      // Ease-out cubic for natural deceleration
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easedProgress * (end - start) + start))

      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(step)
      }
    }

    rafRef.current = window.requestAnimationFrame(step)
  }, [end, duration, start])

  useEffect(() => {
    if (!enabled) {
      return
    }

    animate()

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [enabled, animate])

  return count
}
