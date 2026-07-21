import { useState } from 'react'
import { PLANS } from '../config'
import ContactSection from '../components/ContactSection'
import './Subscriptions.css'

type Billing = 'monthly' | 'yearly'

function CheckIcon() {
  return (
    <span className="plan-card__check" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6.2L4.8 8.5L9.5 3.5"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export default function Subscriptions() {
  const [billing, setBilling] = useState<Billing>('monthly')

  return (
    <div className="plans">
      <div className="plans__hero">
        <h1>Choose your Plan</h1>
        <p>Discover the perfect plan tailored just for you.</p>

        <div className="plans__toggle" role="group" aria-label="Fatura dönemi">
          <button
            type="button"
            className={billing === 'monthly' ? 'is-active' : ''}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={billing === 'yearly' ? 'is-active' : ''}
            onClick={() => setBilling('yearly')}
          >
            Yearly
            <span className="plans__save">-20%</span>
          </button>
        </div>
      </div>

      <div className="plans__grid">
        {PLANS.map((plan) => {
          const billedLabel = billing === 'monthly' ? 'Billed monthly' : 'Billed yearly'
          let priceMain = ''
          let priceSuffix = billing === 'monthly' ? '/ month' : '/ year'

          if (plan.id === 'unlimited') {
            priceMain = '€20'
            priceSuffix = 'başlangıç'
          } else if (plan.id === 'havuz') {
            priceMain = '%20'
            priceSuffix = 'daha uygun'
          } else {
            const value = billing === 'monthly' ? plan.monthly : plan.yearly
            priceMain = `€${value?.toFixed(2)}`
          }

          return (
            <article
              key={plan.id}
              className={`plan-card ${plan.popular ? 'plan-card--popular' : ''}`}
            >
              {plan.badge && (
                <span className={`plan-card__badge ${plan.popular ? 'plan-card__badge--hot' : ''}`}>
                  {plan.badge}
                </span>
              )}

              <div className="plan-card__header">
                <h2>{plan.name}</h2>
                <p className="plan-card__billed">
                  {plan.id === 'unlimited' || plan.id === 'havuz' ? 'Özel fiyatlandırma' : billedLabel}
                </p>
              </div>

              <div className="plan-card__price-row">
                <span className="plan-card__amount">{priceMain}</span>
                <span className="plan-card__period">{priceSuffix}</span>
              </div>

              <p className="plan-card__audience">{plan.audience}</p>

              {plan.credits != null && (
                <p className="plan-card__credits">{plan.credits.toLocaleString('tr-TR')} kredi</p>
              )}
              {plan.note && <p className="plan-card__note">{plan.note}</p>}

              <ul>
                {plan.features.map((f) => (
                  <li key={f}>
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`plan-card__cta ${plan.popular ? 'plan-card__cta--hot' : ''}`}
              >
                Get it now
              </button>
            </article>
          )
        })}
      </div>

      <ContactSection />
    </div>
  )
}
