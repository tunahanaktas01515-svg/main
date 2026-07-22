import { useEffect, useMemo, useRef, useState } from 'react'
import { AD_CONVOS } from '../data/features'
import './ChatDemo.css'

interface Line {
  role: 'user' | 'ai'
  text: string
  typed: string
  done: boolean
}

/** Animated conversation that types itself out, like a Cenan AI ad reel. */
export default function ChatDemo() {
  const convos = useMemo(() => AD_CONVOS, [])
  const [lines, setLines] = useState<Line[]>([])
  const idxRef = useRef(0)
  const timers = useRef<number[]>([])

  useEffect(() => {
    let cancelled = false

    const clearTimers = () => {
      timers.current.forEach((t) => window.clearTimeout(t))
      timers.current = []
    }

    const typeText = (role: 'user' | 'ai', text: string, after: () => void) => {
      setLines((prev) => [...prev.slice(-5), { role, text, typed: '', done: false }])
      let i = 0
      const step = () => {
        if (cancelled) return
        i += 1
        setLines((prev) => {
          const next = [...prev]
          const last = next[next.length - 1]
          if (last && !last.done) {
            last.typed = text.slice(0, i)
            if (i >= text.length) last.done = true
          }
          return next
        })
        if (i < text.length) {
          timers.current.push(window.setTimeout(step, 26 + Math.random() * 34))
        } else {
          timers.current.push(window.setTimeout(after, 900))
        }
      }
      timers.current.push(window.setTimeout(step, 220))
    }

    const runNext = () => {
      if (cancelled) return
      const convo = convos[idxRef.current % convos.length]
      idxRef.current += 1
      typeText('user', convo.q, () => {
        typeText('ai', convo.a, () => {
          timers.current.push(window.setTimeout(runNext, 1400))
        })
      })
    }

    runNext()
    return () => {
      cancelled = true
      clearTimers()
    }
  }, [convos])

  return (
    <div className="chatdemo" aria-hidden="true">
      <div className="chatdemo__bar">
        <span className="chatdemo__dot" />
        <span className="chatdemo__dot" />
        <span className="chatdemo__dot" />
        <span className="chatdemo__title">Cenan AI · canlı</span>
        <span className="chatdemo__live">
          <span className="chatdemo__live-dot" /> 7/24
        </span>
      </div>

      <div className="chatdemo__body">
        {lines.map((l, i) => (
          <div key={i} className={`chatdemo__row chatdemo__row--${l.role}`}>
            {l.role === 'ai' && <span className="chatdemo__ai-mark">✦</span>}
            <div className={`chatdemo__bubble chatdemo__bubble--${l.role}`}>
              {l.typed}
              {!l.done && <span className="chatdemo__caret" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
