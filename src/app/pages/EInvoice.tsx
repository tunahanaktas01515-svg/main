import { useState } from 'react'
import { useI18n } from '../../context/I18nContext'
import { formatMoney, useAppStore } from '../store/AppStore'

interface Parsed {
  vendor: string
  number: string
  net: number
  vatRate: number
  vat: number
  gross: number
  flags: string[]
}

const SAMPLE = `Satıcı: Yıldız Yazılım A.Ş.
Fatura No: YZL2026-0512
Tarih: 2026-07-21
Ara Toplam: 8000
KDV %20: 1600
Genel Toplam: 9600`

function num(v: string): number {
  return Number(v.replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.')) || 0
}

function analyze(text: string): Parsed {
  const get = (labels: string[]) => {
    for (const line of text.split('\n')) {
      for (const label of labels) {
        const re = new RegExp(`${label}\\s*[:\\-]?\\s*(.+)`, 'i')
        const m = line.match(re)
        if (m) return m[1].trim()
      }
    }
    return ''
  }

  const vendor = get(['satıcı', 'satici', 'vendor', 'firma', 'tedarikçi']) || 'Bilinmeyen Satıcı'
  const number = get(['fatura no', 'fatura', 'invoice', 'belge no']) || '—'
  const net = num(get(['ara toplam', 'net', 'matrah', 'subtotal']))
  const vatLine = get(['kdv', 'vat', 'vergi'])
  const rateMatch = vatLine.match(/%\s*(\d{1,2})/) || text.match(/%\s*(\d{1,2})/)
  const vatRate = rateMatch ? Number(rateMatch[1]) : 20
  let vat = num(vatLine)
  let gross = num(get(['genel toplam', 'toplam', 'total', 'ödenecek']))

  if (!vat && net) vat = Math.round(net * (vatRate / 100) * 100) / 100
  if (!gross && net) gross = net + vat

  const flags: string[] = []
  const expectedVat = Math.round(net * (vatRate / 100) * 100) / 100
  if (net && Math.abs(expectedVat - vat) > 1) flags.push('KDV tutarı beklenenden farklı')
  if (net && gross && Math.abs(net + vat - gross) > 1) flags.push('Toplam tutar uyuşmuyor')
  if (!net) flags.push('Ara toplam okunamadı')
  if (gross > 10000) flags.push('Yüksek tutar — ek onay önerilir')

  return { vendor, number, net, vatRate, vat, gross, flags }
}

export default function EInvoice() {
  const { t } = useI18n()
  const { addInvoice, spend, pushActivity } = useAppStore()
  const [text, setText] = useState(SAMPLE)
  const [result, setResult] = useState<Parsed | null>(null)
  const [saved, setSaved] = useState(false)

  const run = () => {
    const parsed = analyze(text)
    setResult(parsed)
    setSaved(false)
    spend(3, t('app.nav.einvoice'))
    pushActivity('invoice', `${t('app.einvoice.analyzed')}: ${parsed.vendor}`)
  }

  const save = () => {
    if (!result) return
    addInvoice({
      vendor: result.vendor,
      number: result.number,
      date: new Date().toISOString().slice(0, 10),
      net: result.net,
      vatRate: result.vatRate,
      vat: result.vat,
      gross: result.gross,
      flags: result.flags,
      source: 'analyzed',
    })
    setSaved(true)
    pushActivity('invoice', `${t('app.einvoice.saved')}: ${result.vendor}`)
  }

  return (
    <div className="apage">
      <div className="apage__head">
        <h1>{t('app.nav.einvoice')}</h1>
        <p>{t('app.einvoice.sub')}</p>
      </div>

      <div className="einv-grid">
        <div className="acard">
          <label className="einv-label">{t('app.einvoice.paste')}</label>
          <textarea
            className="ainput einv-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
          />
          <div className="einv-actions">
            <button type="button" className="abtn" onClick={run}>
              {t('app.einvoice.analyze')}
            </button>
            <button type="button" className="abtn abtn--ghost" onClick={() => setText(SAMPLE)}>
              {t('app.einvoice.sample')}
            </button>
          </div>
        </div>

        <div className="acard">
          <h2 className="dash-h2">{t('app.einvoice.result')}</h2>
          {!result ? (
            <p className="einv-empty">{t('app.einvoice.empty')}</p>
          ) : (
            <>
              <dl className="einv-fields">
                <div><dt>{t('app.einvoice.vendor')}</dt><dd>{result.vendor}</dd></div>
                <div><dt>{t('app.einvoice.number')}</dt><dd>{result.number}</dd></div>
                <div><dt>{t('app.einvoice.net')}</dt><dd>{formatMoney(result.net)}</dd></div>
                <div><dt>KDV %{result.vatRate}</dt><dd>{formatMoney(result.vat)}</dd></div>
                <div><dt>{t('app.einvoice.gross')}</dt><dd>{formatMoney(result.gross)}</dd></div>
              </dl>

              <div className="einv-flags">
                {result.flags.length === 0 ? (
                  <span className="pill pill--approved">{t('app.einvoice.clean')}</span>
                ) : (
                  result.flags.map((f) => (
                    <span key={f} className="pill pill--pending">⚠ {f}</span>
                  ))
                )}
              </div>

              <button type="button" className="abtn abtn--sm" onClick={save} disabled={saved}>
                {saved ? t('app.einvoice.saved') : t('app.einvoice.save')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
