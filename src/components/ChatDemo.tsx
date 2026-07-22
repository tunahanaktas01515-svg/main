import { useEffect, useRef, useState } from 'react'
import { AD_CONVOS } from '../data/features'
import './ChatDemo.css'

interface Line {
  id: number
  role: 'user' | 'ai'
  text: string
  typed: string
  done: boolean
}

const MAX_VISIBLE = 4

export default function ChatDemo() {
  const [lines, setLines] = useState<Line[]>([])
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    const timers: number[] = []
    let convoIdx = 0
    let uid = 0

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms)
        timers.push(id)
      })

    const addLine = (role: 'user' | 'ai', text: string) => {
      const id = ++uid
      setLines((prev) => [...prev, { id, role, text, typed: '', done: false }].slice(-MAX_VISIBLE))
      return id
    }

    const typeInto = (id: number, text: string) =>
      new Promise<void>((resolve) => {
        let i = 0
        const step = () => {
          if (cancelled) return resolve()
          i += 1
          setLines((prev) =>
            prev.map((l) => (l.id === id ? { ...l, typed: text.slice(0, i) } : l)),
          )
          if (i >= text.length) {
            setLines((prev) => prev.map((l) => (l.id === id ? { ...l, done: true } : l)))
            resolve()
          } else {
            timers.push(window.setTimeout(step, 24 + Math.random() * 30))
          }
        }
        timers.push(window.setTimeout(step, 120))
      })

    const run = async () => {
      while (!cancelled) {
        const convo = AD_CONVOS[convoIdx % AD_CONVOS.length]
        convoIdx += 1

        // user message
        const uidLine = addLine('user', convo.q)
        await typeInto(uidLine, convo.q)
        if (cancelled) break
        await wait(500)

        // AI typing indicator, then answer
        setTyping(true)
        await wait(900)
        if (cancelled) break
        setTyping(false)
        const aidLine = addLine('ai', convo.a)
        await typeInto(aidLine, convo.a)
        if (cancelled) break
        await wait(1900)
      }
    }

    run()
    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [lines, typing])

  return (
    <div className="chatdemo" aria-hidden="true">
      <div className="chatdemo__bar">
        <span className="chatdemo__dots">
          <span className="chatdemo__dot" />
          <span className="chatdemo__dot" />
          <span className="chatdemo__dot" />
        </span>
        <span className="chatdemo__title">Cenan AI · canlı</span>
        <span className="chatdemo__live">
          <span className="chatdemo__live-dot" /> 7/24
        </span>
      </div>

      <div className="chatdemo__body" ref={bodyRef}>
        {lines.map((l) => (
          <div key={l.id} className={`chatdemo__row chatdemo__row--${l.role}`}>
            {l.role === 'ai' && <span className="chatdemo__ai-mark">✦</span>}
            <div className={`chatdemo__bubble chatdemo__bubble--${l.role}`}>
              <span className="chatdemo__text">{l.typed}</span>
              {!l.done && <span className="chatdemo__caret" />}
            </div>
          </div>
        ))}

        {typing && (
          <div className="chatdemo__row chatdemo__row--ai">
            <span className="chatdemo__ai-mark">✦</span>
            <div className="chatdemo__bubble chatdemo__bubble--ai chatdemo__bubble--typing">
              <span className="chatdemo__typing-dot" />
              <span className="chatdemo__typing-dot" />
              <span className="chatdemo__typing-dot" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
