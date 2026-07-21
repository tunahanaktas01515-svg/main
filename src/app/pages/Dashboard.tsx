import { Link } from 'react-router-dom'
import { useI18n } from '../../context/I18nContext'
import { formatMoney, useAppStore } from '../store/AppStore'

export default function Dashboard() {
  const { t } = useI18n()
  const { credits, usedCredits, invoices, activity } = useAppStore()

  const pending = invoices.filter((i) => i.status === 'pending')
  const approved = invoices.filter((i) => i.status === 'approved')
  const totalVat = invoices.reduce((sum, i) => sum + i.vat, 0)
  const totalGross = invoices.reduce((sum, i) => sum + i.gross, 0)

  const stats = [
    { label: t('app.dash.credits'), value: credits.toLocaleString('tr-TR'), sub: `${usedCredits} ${t('app.dash.used')}` },
    { label: t('app.dash.pending'), value: String(pending.length), sub: t('app.nav.payments') },
    { label: t('app.dash.vat'), value: formatMoney(totalVat), sub: t('app.dash.period') },
    { label: t('app.dash.volume'), value: formatMoney(totalGross), sub: `${invoices.length} ${t('app.nav.einvoice')}` },
  ]

  const quick = [
    { to: '/uygulama/cenan', key: 'app.nav.assistant', desc: 'app.dash.qAssistant' },
    { to: '/uygulama/e-fatura', key: 'app.nav.einvoice', desc: 'app.dash.qInvoice' },
    { to: '/uygulama/odeme', key: 'app.nav.payments', desc: 'app.dash.qPayment' },
    { to: '/uygulama/vergi', key: 'app.nav.tax', desc: 'app.dash.qTax' },
  ]

  return (
    <div className="apage">
      <div className="apage__head">
        <h1>{t('app.dash.title')}</h1>
        <p>{t('app.dash.sub')}</p>
      </div>

      <div className="dash-stats">
        {stats.map((s) => (
          <div key={s.label} className="acard dash-stat">
            <span className="dash-stat__label">{s.label}</span>
            <span className="dash-stat__value">{s.value}</span>
            <span className="dash-stat__sub">{s.sub}</span>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div className="acard">
          <h2 className="dash-h2">{t('app.dash.quick')}</h2>
          <div className="dash-quick">
            {quick.map((q) => (
              <Link key={q.to} to={q.to} className="dash-quick__item">
                <strong>{t(q.key)}</strong>
                <span>{t(q.desc)}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="acard">
          <h2 className="dash-h2">{t('app.dash.activity')}</h2>
          <ul className="dash-activity">
            {activity.slice(0, 8).map((a) => (
              <li key={a.id}>
                <span className={`dash-dot dash-dot--${a.type}`} aria-hidden="true" />
                <span className="dash-activity__text">{a.text}</span>
                <span className="dash-activity__time">
                  {new Date(a.at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </li>
            ))}
            {activity.length === 0 && <li className="dash-activity__empty">{t('app.dash.noActivity')}</li>}
          </ul>
        </div>

        <div className="acard dash-approved">
          <h2 className="dash-h2">{t('app.dash.recentApproved')}</h2>
          <ul className="dash-list">
            {approved.slice(0, 5).map((i) => (
              <li key={i.id}>
                <span>{i.vendor}</span>
                <span>{formatMoney(i.gross)}</span>
              </li>
            ))}
            {approved.length === 0 && <li className="dash-activity__empty">—</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
