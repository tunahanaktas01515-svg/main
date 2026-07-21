import { useState, type FormEvent } from 'react'
import { AI_FEATURES, SEARCH_TOPICS } from '../config'
import ContactSection from '../components/ContactSection'
import './CenanAI.css'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

function replyFor(query: string): string {
  const q = query.toLowerCase()
  if (q.includes('güç') || q.includes('analiz')) {
    return 'Cenan AI güç ve analiz yeteneğiyle e-faturaları, ödemeleri ve vergi hesaplarını hızla işler. Raporlarınızı özetler, anomalileri işaretler ve karar desteği sunar.'
  }
  if (q.includes('rapor')) {
    return 'Cenan AI analiz raporları; dönemsel özetler, KDV görünümü ve ödeme onay geçmişini tek ekranda birleştirir. Daha derin raporlar için Pro veya Business paketini seçebilirsiniz.'
  }
  if (q.includes('hakkında') || q.includes('nedir') || q.includes('bilgi')) {
    return 'Cenan AI, hem web hem uygulamada çalışan yapay zeka asistanımızdır. E-fatura analizi, otonom onaylı ödeme, KDV/vergi hesaplama ve 10’dan fazla özellikle yanınızda.'
  }
  return `“${query}” hakkında Cenan AI bilgileri tarandı. Cenan AI güç ve analiz yeteneği, raporlar ve ürün özellikleri üzerinden size yardımcı olabilirim. Daha spesifik bir başlık seçin veya sorunuzu netleştirin.`
}

export default function CenanAI() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [busy, setBusy] = useState(false)

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || busy) return
    setMessages((m) => [...m, { role: 'user', text: trimmed }])
    setInput('')
    setBusy(true)
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: replyFor(trimmed) }])
      setBusy(false)
    }, 650)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    send(input)
  }

  const started = messages.length > 0

  return (
    <div className="cenan-ai">
      <div className="cenan-ai__shell">
        {!started ? (
          <div className="cenan-ai__intro">
            <div className="cenan-ai__brand">
              <span className="cenan-ai__name">Cenan AI</span>
              <span className="cenan-ai__mark" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M8 24 L16 6 L24 24"
                    stroke="url(#cenanGrad)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="16" cy="20" r="3.2" fill="url(#cenanGrad)" />
                  <defs>
                    <linearGradient id="cenanGrad" x1="8" y1="6" x2="24" y2="24">
                      <stop stopColor="#f2f2f2" />
                      <stop offset="0.5" stopColor="#7ec8ff" />
                      <stop offset="1" stopColor="#ff7eb6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </div>
            <p className="cenan-ai__hint">
              Yüklenen bilgiler üzerinden araştırın — güç, analiz, raporlar ve Cenan AI hakkında.
            </p>

            <div className="cenan-ai__topics">
              {SEARCH_TOPICS.map((topic) => (
                <button key={topic} type="button" onClick={() => send(topic)}>
                  {topic}
                </button>
              ))}
            </div>

            <div className="cenan-ai__features">
              {AI_FEATURES.map((f) => (
                <button
                  key={f.title}
                  type="button"
                  className={`feature-chip feature-chip--${f.tone}`}
                  onClick={() => send(f.title)}
                >
                  {f.title}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="cenan-ai__thread">
            {messages.map((m, i) => (
              <div key={i} className={`bubble bubble--${m.role}`}>
                {m.role === 'assistant' && (
                  <div className="bubble__label">
                    Cenan AI
                    <span className="cenan-ai__mark cenan-ai__mark--sm" aria-hidden="true">
                      ✦
                    </span>
                  </div>
                )}
                <p>{m.text}</p>
              </div>
            ))}
            {busy && <p className="cenan-ai__typing">Cenan AI düşünüyor…</p>}
          </div>
        )}

        <form className="cenan-ai__composer" onSubmit={onSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cenan AI’ya sorun…"
            aria-label="Mesaj"
          />
          <button type="submit" className="cenan-ai__send" disabled={!input.trim() || busy}>
            Gönder
          </button>
        </form>
      </div>

      <ContactSection />
    </div>
  )
}
