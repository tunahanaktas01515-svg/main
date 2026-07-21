import { useI18n } from '../../context/I18nContext'
import { formatMoney, useAppStore } from '../store/AppStore'

export default function Payments() {
  const { t } = useI18n()
  const { invoices, rules, setRules, setInvoiceStatus, pushActivity } = useAppStore()

  const pending = invoices.filter((i) => i.status === 'pending')

  const runAuto = () => {
    let approved = 0
    pending.forEach((i) => {
      const withinLimit = i.gross <= rules.maxAmount
      const clean = i.flags.length === 0
      if (rules.autoApprove && withinLimit && (!rules.trustedVendorsOnly || clean)) {
        setInvoiceStatus(i.id, 'approved')
        approved += 1
      }
    })
    pushActivity('payment', `${t('app.payments.autoRan')}: ${approved}`)
  }

  return (
    <div className="apage">
      <div className="apage__head">
        <h1>{t('app.nav.payments')}</h1>
        <p>{t('app.payments.sub')}</p>
      </div>

      <div className="pay-grid">
        <div className="acard pay-rules">
          <h2 className="dash-h2">{t('app.payments.rules')}</h2>

          <label className="pay-toggle">
            <input
              type="checkbox"
              checked={rules.autoApprove}
              onChange={(e) => setRules({ ...rules, autoApprove: e.target.checked })}
            />
            <span>{t('app.payments.autoApprove')}</span>
          </label>

          <label className="pay-field">
            <span>{t('app.payments.maxAmount')}</span>
            <input
              type="number"
              className="ainput"
              value={rules.maxAmount}
              onChange={(e) => setRules({ ...rules, maxAmount: Number(e.target.value) })}
            />
          </label>

          <label className="pay-toggle">
            <input
              type="checkbox"
              checked={rules.trustedVendorsOnly}
              onChange={(e) => setRules({ ...rules, trustedVendorsOnly: e.target.checked })}
            />
            <span>{t('app.payments.cleanOnly')}</span>
          </label>

          <button type="button" className="abtn" onClick={runAuto} disabled={pending.length === 0}>
            {t('app.payments.runAuto')}
          </button>
        </div>

        <div className="acard pay-queue">
          <h2 className="dash-h2">
            {t('app.payments.queue')} ({pending.length})
          </h2>
          {pending.length === 0 ? (
            <p className="einv-empty">{t('app.payments.empty')}</p>
          ) : (
            <ul className="pay-list">
              {pending.map((i) => (
                <li key={i.id}>
                  <div className="pay-list__main">
                    <strong>{i.vendor}</strong>
                    <span>{i.number}</span>
                    {i.flags.map((f) => (
                      <span key={f} className="pill pill--pending">⚠ {f}</span>
                    ))}
                  </div>
                  <div className="pay-list__amount">{formatMoney(i.gross)}</div>
                  <div className="pay-list__actions">
                    <button
                      type="button"
                      className="abtn abtn--sm"
                      onClick={() => {
                        setInvoiceStatus(i.id, 'approved')
                        pushActivity('payment', `${t('app.payments.approved')}: ${i.vendor}`)
                      }}
                    >
                      {t('app.payments.approve')}
                    </button>
                    <button
                      type="button"
                      className="abtn abtn--sm abtn--danger"
                      onClick={() => {
                        setInvoiceStatus(i.id, 'rejected')
                        pushActivity('payment', `${t('app.payments.rejected')}: ${i.vendor}`)
                      }}
                    >
                      {t('app.payments.reject')}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
