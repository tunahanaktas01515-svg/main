import { useMemo, useState } from 'react'
import { PLANS, type Plan } from '../config'
import ContactSection from '../components/ContactSection'
import { useI18n } from '../context/I18nContext'
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

function formatPriceParts(plan: Plan, billing: Billing, t: (k: string) => string) {
  if (plan.id === 'unlimited') {
    return { currency: '€', value: '20', suffix: t('plans.start') }
  }
  if (plan.id === 'havuz') {
    return { currency: '', value: '%20', suffix: t('plans.cheaper') }
  }
  const amount = billing === 'monthly' ? plan.monthly : plan.yearly
  const [whole, fraction] = (amount ?? 0).toFixed(2).split('.')
  return {
    currency: '€',
    value: fraction === '00' ? whole : `${whole}.${fraction}`,
    suffix: billing === 'monthly' ? t('plans.perMonth') : t('plans.perYear'),
  }
}

export default function Subscriptions() {
  const { t } = useI18n()
  const [billing, setBilling] = useState<Billing>('monthly')

  const visiblePlans = useMemo(
    () =>
      PLANS.filter((plan) => {
        if (billing === 'yearly' && plan.monthlyOnly) return false
        return true
      }),
    [billing],
  )

  return (
    <div className="plans">
      <div className="plans__bg" aria-hidden="true">
        <div className="plans__glow plans__glow--left" />
        <div className="plans__glow plans__glow--right" />
        <div className="plans__glow plans__glow--bottom" />
        <div className="plans__noise" />
      </div>

      <div className="plans__hero">
        <h1>{t('plans.title')}</h1>
        <p>{t('plans.sub')}</p>

        <div className="plans__toggle" role="group" aria-label="Billing">
          <button
            type="button"
            className={billing === 'monthly' ? 'is-active' : ''}
            onClick={() => setBilling('monthly')}
          >
            {t('plans.monthly')}
          </button>
          <button
            type="button"
            className={billing === 'yearly' ? 'is-active' : ''}
            onClick={() => setBilling('yearly')}
          >
            {t('plans.yearly')}
            <span className="plans__save">-20%</span>
          </button>
        </div>
      </div>

      <div className={`plans__grid ${billing === 'yearly' ? 'plans__grid--3' : ''}`}>
        {visiblePlans.map((plan) => {
          const billedLabel =
            billing === 'monthly' ? t('plans.billedMonthly') : t('plans.billedYearly')
          const price = formatPriceParts(plan, billing, t)

          return (
            <article
              key={plan.id}
              className={`plan-card ${plan.popular ? 'plan-card--popular' : ''}`}
            >
              {plan.badgeKey && (
                <span className={`plan-card__badge ${plan.popular ? 'plan-card__badge--hot' : ''}`}>
                  {t(plan.badgeKey)}
                </span>
              )}

              <div className="plan-card__header">
                <h2 className="plan-card__name">{plan.name}</h2>
                <p className="plan-card__billed">
                  {plan.id === 'unlimited' || plan.id === 'havuz'
                    ? t('plans.specialPricing')
                    : billedLabel}
                </p>
              </div>

              <div
                className="plan-card__price-row"
                aria-label={`${price.currency}${price.value} ${price.suffix}`}
              >
                {price.currency && <span className="plan-card__currency">{price.currency}</span>}
                <span className="plan-card__amount">{price.value}</span>
                <span className="plan-card__period">{price.suffix}</span>
              </div>

              <p className="plan-card__audience">{t(plan.audienceKey)}</p>

              {plan.credits != null && (
                <p className="plan-card__credits">
                  {plan.credits.toLocaleString()} {t('plans.credits')}
                </p>
              )}
              {plan.noteKey && <p className="plan-card__note">{t(plan.noteKey)}</p>}

              <ul>
                {plan.featureKeys.map((key) => (
                  <li key={key}>
                    <CheckIcon />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`plan-card__cta ${plan.popular ? 'plan-card__cta--hot' : ''}`}
              >
                {t('plans.getItNow')}
              </button>
            </article>
          )
        })}
      </div>

      <ContactSection />
    </div>
  )
}
