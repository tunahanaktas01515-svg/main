import { useI18n } from '../../context/I18nContext'
import { formatMoney, useAppStore } from '../store/AppStore'

export default function Reports() {
  const { t } = useI18n()
  const { invoices } = useAppStore()

  const byStatus = {
    pending: invoices.filter((i) => i.status === 'pending'),
    approved: invoices.filter((i) => i.status === 'approved'),
    rejected: invoices.filter((i) => i.status === 'rejected'),
  }

  const totalNet = invoices.reduce((s, i) => s + i.net, 0)
  const totalVat = invoices.reduce((s, i) => s + i.vat, 0)
  const totalGross = invoices.reduce((s, i) => s + i.gross, 0)

  const rateBreakdown = [1, 10, 20].map((rate) => {
    const items = invoices.filter((i) => i.vatRate === rate)
    return { rate, count: items.length, vat: items.reduce((s, i) => s + i.vat, 0) }
  })
  const maxVat = Math.max(1, ...rateBreakdown.map((r) => r.vat))

  return (
    <div className="apage">
      <div className="apage__head">
        <h1>{t('app.nav.reports')}</h1>
        <p>{t('app.reports.sub')}</p>
      </div>

      <div className="rep-stats">
        <div className="acard"><span>{t('app.reports.net')}</span><strong>{formatMoney(totalNet)}</strong></div>
        <div className="acard"><span>{t('app.reports.vat')}</span><strong>{formatMoney(totalVat)}</strong></div>
        <div className="acard"><span>{t('app.reports.gross')}</span><strong>{formatMoney(totalGross)}</strong></div>
      </div>

      <div className="rep-grid">
        <div className="acard">
          <h2 className="dash-h2">{t('app.reports.status')}</h2>
          <div className="rep-status">
            <div><span className="pill pill--pending">{t('app.payments.approve')}</span> {byStatus.pending.length}</div>
            <div><span className="pill pill--approved">{t('app.payments.approved')}</span> {byStatus.approved.length}</div>
            <div><span className="pill pill--rejected">{t('app.payments.rejected')}</span> {byStatus.rejected.length}</div>
          </div>
        </div>

        <div className="acard">
          <h2 className="dash-h2">{t('app.reports.byRate')}</h2>
          <div className="rep-bars">
            {rateBreakdown.map((r) => (
              <div key={r.rate} className="rep-bar">
                <span className="rep-bar__label">%{r.rate}</span>
                <div className="rep-bar__track">
                  <div className="rep-bar__fill" style={{ width: `${(r.vat / maxVat) * 100}%` }} />
                </div>
                <span className="rep-bar__value">{formatMoney(r.vat)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="acard">
        <h2 className="dash-h2">{t('app.reports.allInvoices')}</h2>
        <div className="rep-table-wrap">
          <table className="rep-table">
            <thead>
              <tr>
                <th>{t('app.einvoice.vendor')}</th>
                <th>{t('app.einvoice.number')}</th>
                <th>{t('app.einvoice.net')}</th>
                <th>KDV</th>
                <th>{t('app.einvoice.gross')}</th>
                <th>{t('app.reports.statusCol')}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id}>
                  <td>{i.vendor}</td>
                  <td>{i.number}</td>
                  <td>{formatMoney(i.net)}</td>
                  <td>{formatMoney(i.vat)}</td>
                  <td>{formatMoney(i.gross)}</td>
                  <td><span className={`pill pill--${i.status}`}>{t(`app.status.${i.status}`)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
