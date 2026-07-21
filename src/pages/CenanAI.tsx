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
  if (q.includes('güç') || q.includes('analiz') || q.includes('e-fatura')) {
    return 'Cenan AI güç ve analiz yeteneğiyle e-faturaları, ödemeleri ve vergi hesaplarını hızla işler. Raporlarınızı özetler, anomalileri işaretler ve karar desteği sunar.'
  }
  if (q.includes('rapor')) {
    return 'Cenan AI analiz raporları; dönemsel özetler, KDV görünümü ve ödeme onay geçmişini tek ekranda birleştirir. Daha derin raporlar için Pro veya Business paketini seçebilirsiniz.'
  }
  if (q.includes('ödeme') || q.includes('otonom')) {
    return 'Otonom Onaylı Ödeme ile Cenan AI, uygun faturaları kurallarınıza göre onaylar ve ödeme akışını hızlandırır.'
  }
  if (q.includes('kdv') || q.includes('vergi')) {
    return 'KDV ve vergi hesaplamada Cenan AI dönemsel oranları, istisnaları ve rapor özetlerini birlikte sunar.'
  }
  if (q.includes('hakkında') || q.includes('nedir') || q.includes('bilgi')) {
    return 'Cenan AI, hem web hem uygulamada çalışan yapay zeka asistanımızdır. E-fatura analizi, otonom onaylı ödeme, KDV/vergi hesaplama ve 10’dan fazla özellikle yanınızda.'
  }
  return `“${query}” hakkında Cenan AI bilgileri tarandı. Güç ve analiz yeteneği, raporlar ve ürün özellikleri üzerinden size yardımcı olabilirim.`
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
      <section className={`cenan-stage ${started ? 'cenan-stage--chat' : ''}`}>
        <div className="cenan-stage__glow" aria-hidden="true" />
        <div className="cenan-stage__disk" aria-hidden="true" />
        <div className="cenan-stage__haze" aria-hidden="true" />

        {!started ? (
          <>
            <h1 className="cenan-stage__title" aria-label="CENAN">
              <span>C</span>
              <span>E</span>
              <span>N</span>
              <span>A</span>
              <span>N</span>
            </h1>

            <form className="cenan-ask" onSubmit={onSubmit}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Cenan anything..."
                aria-label="Cenan AI mesaj"
              />
              <button type="submit" className="cenan-ask__send" disabled={!input.trim() || busy} aria-label="Gönder">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h12M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            <div className="cenan-stage__topics">
              {SEARCH_TOPICS.map((topic) => (
                <button key={topic} type="button" onClick={() => send(topic)}>
                  {topic}
                </button>
              ))}
            </div>

            <div className="cenan-stage__features">
              {AI_FEATURES.map((f) => (
                <button
                  key={f.title}
                  type="button"
                  className={`cenan-chip cenan-chip--${f.tone}`}
                  onClick={() => send(f.title)}
                >
                  {f.title}
                </button>
              ))}
            </div>

            <p className="cenan-stage__blurb">
              Cenan AI — güç ve analiz yeteneğiyle e-fatura, vergi ve onaylı ödeme süreçlerini bir araya getiren
              yapay zeka.
            </p>
          </>
        ) : (
          <div className="cenan-chat">
            <div className="cenan-chat__thread">
              {messages.map((m, i) => (
                <div key={i} className={`bubble bubble--${m.role}`}>
                  {m.role === 'assistant' && <div className="bubble__label">Cenan AI</div>}
                  <p>{m.text}</p>
                </div>
              ))}
              {busy && <p className="cenan-chat__typing">Cenan AI düşünüyor…</p>}
            </div>

            <form className="cenan-ask cenan-ask--dock" onSubmit={onSubmit}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Cenan anything..."
                aria-label="Cenan AI mesaj"
              />
              <button type="submit" className="cenan-ask__send" disabled={!input.trim() || busy} aria-label="Gönder">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h12M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </div>
        )}
      </section>

      <ContactSection />
    </div>
  )
}
