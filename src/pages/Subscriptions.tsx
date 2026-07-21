import { useMemo, useState } from 'react'
import { PLANS } from '../config'
import ContactSection from '../components/ContactSection'
import './Subscriptions.css'

type Billing = 'monthly' | 'yearly'

function formatPrice(value: number | null | undefined, suffix: string) {
  if (value == null) return null
  return `€${value.toFixed(2)}${suffix}`
}

export default function Subscriptions() {
  const [billing, setBilling] = useState<Billing>('monthly')

  const comparison = useMemo(
    () => [
      {
        label: 'Kredi',
        values: ['1.500', '4.500', '9.000', 'Kullanıma göre', 'Havuz'],
      },
      {
        label: 'Cenan AI sohbet',
        values: ['✓', '✓', '✓', '✓', '✓'],
      },
      {
        label: 'E-Fatura Analizi',
        values: ['Temel', 'Gelişmiş', 'Gelişmiş', 'Gelişmiş', 'Gelişmiş'],
      },
      {
        label: 'Otonom Onaylı Ödeme',
        values: ['—', '✓', '✓', '✓', '✓'],
      },
      {
        label: 'KDV ve Vergi',
        values: ['✓', '✓', '✓', '✓', '✓'],
      },
      {
        label: 'Çoklu kullanıcı',
        values: ['1', '3', '10', 'Esnek', '5+'],
      },
      {
        label: 'Kredi birim fiyatı',
        values: ['—', '—', '0.018 €', '0.01 €', '%20 indirim'],
      },
      {
        label: 'Şirketlere özel',
        values: ['—', '—', '—', '—', '✓'],
      },
    ],
    [],
  )

  return (
    <div className="plans">
      <div className="plans__hero">
        <h1>Cenan Plans</h1>
        <p>İhtiyacınıza göre Standart, Pro, Business, Unlimited veya Havuz paketini seçin.</p>

        <div className="plans__toggle" role="group" aria-label="Fatura dönemi">
          <button
            type="button"
            className={billing === 'yearly' ? 'is-active' : ''}
            onClick={() => setBilling('yearly')}
          >
            Yearly
            <span className="plans__badge">-20%</span>
          </button>
          <button
            type="button"
            className={billing === 'monthly' ? 'is-active' : ''}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="plans__grid">
        {PLANS.map((plan) => {
          const price =
            plan.id === 'unlimited'
              ? 'Başlangıç €20'
              : plan.id === 'havuz'
                ? '%20 daha uygun'
                : billing === 'monthly'
                  ? formatPrice(plan.monthly, '/mo')
                  : formatPrice(plan.yearly, '/yr')

          return (
            <article
              key={plan.id}
              className={`plan-card ${plan.highlight ? `plan-card--${plan.highlight}` : ''}`}
            >
              <div className="plan-card__top">
                <div className="plan-card__name-row">
                  <h2>{plan.name}</h2>
                  {plan.badge && <span className="plan-card__pill">{plan.badge}</span>}
                </div>
                <p className="plan-card__price">{price}</p>
                {plan.credits != null && (
                  <p className="plan-card__credits">{plan.credits.toLocaleString('tr-TR')} kredi</p>
                )}
                {plan.note && <p className="plan-card__note">{plan.note}</p>}
                {plan.companiesOnly && (
                  <p className="plan-card__note">Sadece şirketler ulaşabilir · 5+ kullanıcı</p>
                )}
              </div>

              <ul>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <button type="button" className="btn btn--white plan-card__cta">
                Select Plan
              </button>
            </article>
          )
        })}
      </div>

      <section className="plans__compare">
        <h2>Özellik karşılaştırması</h2>
        <div className="plans__table-wrap">
          <table>
            <thead>
              <tr>
                <th>Features</th>
                {PLANS.map((p) => (
                  <th key={p.id}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={`${row.label}-${i}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
