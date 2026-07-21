import { useMemo, useState } from 'react'
import { useI18n } from '../../context/I18nContext'
import { formatMoney } from '../store/AppStore'

const RATES = [1, 10, 20]

export default function TaxCalc() {
  const { t } = useI18n()
  const [amount, setAmount] = useState('1000')
  const [rate, setRate] = useState(20)
  const [mode, setMode] = useState<'add' | 'extract'>('add')

  const result = useMemo(() => {
    const a = Number(amount) || 0
    if (mode === 'add') {
      const vat = a * (rate / 100)
      return { net: a, vat, gross: a + vat }
    }
    const net = a / (1 + rate / 100)
    return { net, vat: a - net, gross: a }
  }, [amount, rate, mode])

  return (
    <div className="apage">
      <div className="apage__head">
        <h1>{t('app.nav.tax')}</h1>
        <p>{t('app.tax.sub')}</p>
      </div>

      <div className="tax-grid">
        <div className="acard">
          <div className="tax-mode">
            <button
              type="button"
              className={mode === 'add' ? 'is-active' : ''}
              onClick={() => setMode('add')}
            >
              {t('app.tax.add')}
            </button>
            <button
              type="button"
              className={mode === 'extract' ? 'is-active' : ''}
              onClick={() => setMode('extract')}
            >
              {t('app.tax.extract')}
            </button>
          </div>

          <label className="tax-label">
            {mode === 'add' ? t('app.tax.netAmount') : t('app.tax.grossAmount')}
          </label>
          <input
            type="number"
            className="ainput"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label className="tax-label">{t('app.tax.rate')}</label>
          <div className="tax-rates">
            {RATES.map((r) => (
              <button
                key={r}
                type="button"
                className={rate === r ? 'is-active' : ''}
                onClick={() => setRate(r)}
              >
                %{r}
              </button>
            ))}
          </div>
        </div>

        <div className="acard tax-result">
          <h2 className="dash-h2">{t('app.tax.result')}</h2>
          <div className="tax-row">
            <span>{t('app.tax.net')}</span>
            <strong>{formatMoney(result.net)}</strong>
          </div>
          <div className="tax-row">
            <span>KDV %{rate}</span>
            <strong>{formatMoney(result.vat)}</strong>
          </div>
          <div className="tax-row tax-row--total">
            <span>{t('app.tax.gross')}</span>
            <strong>{formatMoney(result.gross)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
