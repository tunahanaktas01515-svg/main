import { useState, type FormEvent } from 'react'
import ContactSection from '../components/ContactSection'
import { AskBar } from '../components/AttachMenu'
import { useI18n } from '../context/I18nContext'
import './CenanAI.css'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

function replyFor(query: string, t: (k: string) => string): string {
  const q = query.toLowerCase()
  if (q.includes('güç') || q.includes('analiz') || q.includes('power') || q.includes('analysis') || q.includes('e-fatura') || q.includes('invoice')) {
    return t('ai.topic1') + ' — Cenan AI.'
  }
  if (q.includes('rapor') || q.includes('report')) {
    return t('ai.topic2') + ' — Cenan AI.'
  }
  if (q.includes('ödeme') || q.includes('payment') || q.includes('otonom')) {
    return t('ai.feat2') + ' — Cenan AI.'
  }
  if (q.includes('kdv') || q.includes('vergi') || q.includes('tax') || q.includes('vat')) {
    return t('ai.feat3') + ' — Cenan AI.'
  }
  if (q.includes('hakkında') || q.includes('about') || q.includes('nedir') || q.includes('bilgi')) {
    return t('ai.topic3') + ' — Cenan AI.'
  }
  return `“${query}” · Cenan AI`
}

export default function CenanAI() {
  const { t } = useI18n()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [busy, setBusy] = useState(false)
  const [attachedName, setAttachedName] = useState<string | null>(null)

  const send = (text: string) => {
    const trimmed = text.trim()
    const fileName = attachedName
    if ((!trimmed && !fileName) || busy) return
    const payload = fileName
      ? `${trimmed || fileName} [${fileName}]`
      : trimmed
    setMessages((m) => [...m, { role: 'user', text: payload }])
    setInput('')
    setAttachedName(null)
    setBusy(true)
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          text: fileName
            ? `${fileName} · ${replyFor(trimmed || 'e-fatura', t)}`
            : replyFor(trimmed, t),
        },
      ])
      setBusy(false)
    }, 650)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    send(input)
  }

  const onAttachAction = (id: string) => {
    const key =
      id === 'recents'
        ? 'ai.attach.recents'
        : id === 'skills'
          ? 'ai.attach.skills'
          : 'ai.attach.connector'
    setMessages((m) => [...m, { role: 'assistant', text: t(key) }])
  }

  const started = messages.length > 0
  const topics = ['ai.topic1', 'ai.topic2', 'ai.topic3'] as const
  const feats = [
    { key: 'ai.feat1', tone: 'mint' },
    { key: 'ai.feat2', tone: 'blue' },
    { key: 'ai.feat3', tone: 'violet' },
    { key: 'ai.feat4', tone: 'amber' },
  ] as const

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

            <AskBar
              value={input}
              busy={busy}
              onChange={setInput}
              onSubmit={onSubmit}
              onFileSelected={(file) => setAttachedName(file.name)}
              onAttachAction={onAttachAction}
            />

            {attachedName && (
              <p className="cenan-attach-chip">
                {t('ai.attached')}: <strong>{attachedName}</strong>
                <button type="button" onClick={() => setAttachedName(null)} aria-label="×">
                  ×
                </button>
              </p>
            )}

            <div className="cenan-stage__topics">
              {topics.map((key) => (
                <button key={key} type="button" onClick={() => send(t(key))}>
                  {t(key)}
                </button>
              ))}
            </div>

            <div className="cenan-stage__features">
              {feats.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className={`cenan-chip cenan-chip--${f.tone}`}
                  onClick={() => send(t(f.key))}
                >
                  {t(f.key)}
                </button>
              ))}
            </div>

            <p className="cenan-stage__blurb">{t('ai.blurb')}</p>
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
              {busy && <p className="cenan-chat__typing">{t('ai.thinking')}</p>}
            </div>

            {attachedName && (
              <p className="cenan-attach-chip cenan-attach-chip--dock">
                {t('ai.attached')}: <strong>{attachedName}</strong>
                <button type="button" onClick={() => setAttachedName(null)} aria-label="×">
                  ×
                </button>
              </p>
            )}

            <AskBar
              value={input}
              busy={busy}
              dock
              onChange={setInput}
              onSubmit={onSubmit}
              onFileSelected={(file) => setAttachedName(file.name)}
              onAttachAction={onAttachAction}
            />
          </div>
        )}
      </section>

      <ContactSection />
    </div>
  )
}
