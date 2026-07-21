import { useState, type FormEvent } from 'react'
import { useI18n } from '../../context/I18nContext'
import { useAppStore } from '../store/AppStore'

interface Msg {
  role: 'user' | 'assistant'
  text: string
}

export default function AssistantApp() {
  const { t } = useI18n()
  const { spend, pushActivity } = useAppStore()
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'assistant', text: t('app.assistant.greeting') },
  ])
  const [busy, setBusy] = useState(false)

  const reply = (q: string) => {
    const s = q.toLowerCase()
    if (s.includes('fatura') || s.includes('invoice')) return t('app.assistant.rInvoice')
    if (s.includes('kdv') || s.includes('vergi') || s.includes('tax') || s.includes('vat'))
      return t('app.assistant.rTax')
    if (s.includes('ödeme') || s.includes('payment')) return t('app.assistant.rPayment')
    if (s.includes('rapor') || s.includes('report')) return t('app.assistant.rReport')
    return t('app.assistant.rDefault')
  }

  const send = (text: string) => {
    const q = text.trim()
    if (!q || busy) return
    setMsgs((m) => [...m, { role: 'user', text: q }])
    setInput('')
    setBusy(true)
    spend(1, 'Cenan AI')
    window.setTimeout(() => {
      setMsgs((m) => [...m, { role: 'assistant', text: reply(q) }])
      setBusy(false)
      pushActivity('ai', `${t('app.nav.assistant')}: ${q.slice(0, 40)}`)
    }, 600)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    send(input)
  }

  const suggestions = ['app.assistant.s1', 'app.assistant.s2', 'app.assistant.s3']

  return (
    <div className="apage assistant">
      <div className="apage__head">
        <h1>{t('app.nav.assistant')}</h1>
        <p>{t('app.assistant.sub')}</p>
      </div>

      <div className="acard assistant__panel">
        <div className="assistant__thread">
          {msgs.map((m, i) => (
            <div key={i} className={`abubble abubble--${m.role}`}>
              {m.role === 'assistant' && <span className="abubble__label">Cenan AI</span>}
              <p>{m.text}</p>
            </div>
          ))}
          {busy && <p className="assistant__typing">{t('ai.thinking')}</p>}
        </div>

        <div className="assistant__suggest">
          {suggestions.map((k) => (
            <button key={k} type="button" onClick={() => send(t(k))}>
              {t(k)}
            </button>
          ))}
        </div>

        <form className="assistant__composer" onSubmit={onSubmit}>
          <input
            className="ainput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('ai.askPlaceholder')}
          />
          <button type="submit" className="abtn" disabled={!input.trim() || busy}>
            {t('app.assistant.send')}
          </button>
        </form>
      </div>
    </div>
  )
}
