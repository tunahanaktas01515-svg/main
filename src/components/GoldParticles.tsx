import { useEffect, useRef } from 'react'
import './GoldParticles.css'

interface P {
  x: number
  y: number
  z: number
  r: number
  tw: number
}

/** Animated golden particle sphere that gently drifts and rotates. */
export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Fibonacci sphere of points + a few scattered halo points
    const COUNT = 460
    const pts: P[] = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < COUNT; i++) {
      const halo = i > COUNT * 0.78
      const y = 1 - (i / (COUNT - 1)) * 2
      const rad = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = golden * i
      const spread = halo ? 1.35 + Math.random() * 0.5 : 1
      pts.push({
        x: Math.cos(theta) * rad * spread,
        y: y * spread,
        z: Math.sin(theta) * rad * spread,
        r: halo ? Math.random() * 1.1 + 0.3 : Math.random() * 1.6 + 0.6,
        tw: Math.random() * Math.PI * 2,
      })
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let t = 0
    const render = () => {
      t += 0.006
      ctx.clearRect(0, 0, w, h)

      const cx = w / 2 + Math.sin(t * 0.9) * w * 0.09 // side-to-side drift
      const cy = h / 2 + Math.sin(t * 0.7) * h * 0.03
      const baseR = Math.min(w, h) * 0.34 * (1 + Math.sin(t * 1.1) * 0.05) // breathe
      const ay = t * 0.5 // rotate around Y
      const cosY = Math.cos(ay)
      const sinY = Math.sin(ay)
      const tilt = 0.35

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        // rotate around Y
        const rx = p.x * cosY - p.z * sinY
        const rz = p.x * sinY + p.z * cosY
        // slight tilt around X
        const ry = p.y * Math.cos(tilt) - rz * Math.sin(tilt)
        const rzz = p.y * Math.sin(tilt) + rz * Math.cos(tilt)

        const depth = (rzz + 1.6) / 3.2 // 0..1
        const sx = cx + rx * baseR
        const sy = cy + ry * baseR
        const size = p.r * (0.5 + depth * 1.1)
        const twinkle = 0.55 + Math.sin(t * 3 + p.tw) * 0.25
        const alpha = Math.max(0, Math.min(1, (0.25 + depth * 0.75) * twinkle))

        // gold tone shifts a touch with depth
        const g = Math.floor(180 + depth * 60)
        ctx.beginPath()
        ctx.fillStyle = `rgba(${245}, ${g + 15}, ${90 + depth * 40}, ${alpha})`
        ctx.shadowBlur = 6 * depth
        ctx.shadowColor = 'rgba(245, 196, 81, 0.7)'
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0

      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="goldp">
      <div className="goldp__halo" aria-hidden="true" />
      <canvas ref={canvasRef} className="goldp__canvas" aria-hidden="true" />
    </div>
  )
}
