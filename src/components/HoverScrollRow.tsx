import { useRef, useEffect, useCallback, type ReactNode, type MouseEvent } from 'react'

interface HoverScrollRowProps {
  children: ReactNode
  className?: string
}

/** Horizontal row that scrolls by mouse X position while hovered (no visible scrollbar). */
export default function HoverScrollRow({ children, className = '' }: HoverScrollRowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const speedRef = useRef(0)
  const rafRef = useRef(0)
  const hoveringRef = useRef(false)

  useEffect(() => {
    const tick = () => {
      const el = ref.current
      if (el && hoveringRef.current && Math.abs(speedRef.current) > 0.05) {
        el.scrollLeft += speedRef.current
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    hoveringRef.current = true
    const rect = el.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width

    // Center dead zone; right edge = ileri (sağa), left edge = geri (sola)
    const dead = 0.28
    const leftEdge = 0.5 - dead / 2
    const rightEdge = 0.5 + dead / 2
    const maxSpeed = 14

    if (ratio < leftEdge) {
      const t = (leftEdge - ratio) / leftEdge
      speedRef.current = -maxSpeed * Math.pow(t, 1.4)
    } else if (ratio > rightEdge) {
      const t = (ratio - rightEdge) / (1 - rightEdge)
      speedRef.current = maxSpeed * Math.pow(t, 1.4)
    } else {
      speedRef.current = 0
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    hoveringRef.current = false
    speedRef.current = 0
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`flex gap-3 overflow-x-auto hide-scrollbar ${className}`}
    >
      {children}
    </div>
  )
}
