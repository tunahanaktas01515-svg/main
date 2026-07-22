import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TOP_CURRENCIES, OTHER_CURRENCIES, type Currency } from '../data/currencies'
import {
  formatRate,
  generateChartData,
  generatePriceData,
  type PriceData,
} from '../data/mockPrices'
import { useI18n } from '../context/I18nContext'
import './Borsa.css'

const PERIODS = ['1D', '7D', '1M', '3M', '6M', '1Y', 'ALL'] as const

function HoverScrollRow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const speedRef = useRef(0)
  const rafRef = useRef(0)
  const hoveringRef = useRef(false)

  useEffect(() => {
    const tick = () => {
      const el = ref.current
      if (el && hoveringRef.current && Math.abs(speedRef.current) > 0.05) {
        el.scrollLeft += speedRef.current
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    hoveringRef.current = true
    const rect = el.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    const dead = 0.28
    const leftEdge = 0.5 - dead / 2
    const rightEdge = 0.5 + dead / 2
    const maxSpeed = 14
    if (ratio < leftEdge) {
      speedRef.current = -maxSpeed * Math.pow((leftEdge - ratio) / leftEdge, 1.4)
    } else if (ratio > rightEdge) {
      speedRef.current = maxSpeed * Math.pow((ratio - rightEdge) / (1 - rightEdge), 1.4)
    } else {
      speedRef.current = 0
    }
  }, [])

  const onMouseLeave = useCallback(() => {
    hoveringRef.current = false
    speedRef.current = 0
  }, [])

  return (
    <div ref={ref} className="bt-row" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </div>
  )
}

function TopCard({
  currency,
  price,
  selected,
  onClick,
}: {
  currency: Currency
  price: PriceData
  selected: boolean
  onClick: () => void
}) {
  const positive = price.changePercent >= 0
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bt-card bt-card--compact ${selected ? 'is-selected' : ''}`}
    >
      <div className="bt-card__head">
        <span className="bt-flag">{currency.flag}</span>
        <div>
          <p className="bt-card__code">{currency.code}</p>
          <p className="bt-card__name">{currency.name}</p>
        </div>
      </div>
      <div className="bt-card__price">
        <p className="bt-card__rate">{formatRate(price.rate, currency.code)}</p>
        <p className={`bt-change ${positive ? 'is-up' : 'is-down'}`}>
          {positive ? '+' : ''}
          {price.changePercent.toFixed(2)}%
        </p>
      </div>
    </button>
  )
}

function MainChart({
  currency,
  price,
  period,
  onPeriodChange,
  labels,
}: {
  currency: Currency
  price: PriceData
  period: string
  onPeriodChange: (p: string) => void
  labels: { high: string; low: string; change: string; rate: string }
}) {
  const chartData = useMemo(() => generateChartData(currency.code, period), [currency.code, period])
  const positive = price.changePercent >= 0
  const color = positive ? '#00e676' : '#ff5252'

  return (
    <div className="bt-chart">
      <div className="bt-chart__head">
        <div>
          <h2 className="bt-chart__title">
            <span>{currency.flag}</span> {currency.code}/USD
          </h2>
          <p className="bt-chart__sub">{currency.name}</p>
        </div>
        <div className="bt-chart__price">
          <p className="bt-chart__rate">{formatRate(price.rate, currency.code)}</p>
          <p className={`bt-change ${positive ? 'is-up' : 'is-down'}`}>
            {positive ? '+' : ''}
            {price.changePercent.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="bt-periods">
        {PERIODS.map((p) => (
          <button
            key={p}
            type="button"
            className={period === p ? 'is-active' : ''}
            onClick={() => onPeriodChange(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="bt-chart__canvas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="btGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={['auto', 'auto']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              width={62}
              tickFormatter={(v: number) => formatRate(v, currency.code)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#141416',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#9ca3af' }}
              formatter={(value) => [formatRate(Number(value), currency.code), labels.rate]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill="url(#btGrad)"
              dot={false}
              activeDot={{ r: 4, fill: color, stroke: '#0d0d0d', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bt-chart__stats">
        <div>
          <p className="bt-stat__label">{labels.high}</p>
          <p className="bt-stat__value">{formatRate(price.high24h, currency.code)}</p>
        </div>
        <div>
          <p className="bt-stat__label">{labels.low}</p>
          <p className="bt-stat__value">{formatRate(price.low24h, currency.code)}</p>
        </div>
        <div>
          <p className="bt-stat__label">{labels.change}</p>
          <p className={`bt-stat__value ${positive ? 'is-up' : 'is-down'}`}>
            {positive ? '+' : ''}
            {price.changePercent.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  )
}

const SLOT_COUNT = 5
const ROTATE_MS = 1500

function CurrencyGrid({
  currencies,
  priceMap,
  selectedCode,
  onSelect,
  title,
}: {
  currencies: Currency[]
  priceMap: Record<string, PriceData>
  selectedCode: string
  onSelect: (code: string) => void
  title: string
}) {
  const currencyMap = useMemo(
    () => Object.fromEntries(currencies.map((c) => [c.code, c])),
    [currencies],
  )
  const [slots, setSlots] = useState<string[]>(() =>
    currencies.slice(0, SLOT_COUNT).map((c) => c.code),
  )
  const [frozen, setFrozen] = useState<Set<number>>(() => new Set())
  const frozenRef = useRef<Set<number>>(new Set())
  const cursorRef = useRef(SLOT_COUNT)

  useEffect(() => {
    if (currencies.length === 0) return
    const id = window.setInterval(() => {
      setSlots((prev) => {
        const next = [...prev]
        for (let i = 0; i < SLOT_COUNT; i++) {
          if (frozenRef.current.has(i)) continue
          for (let n = 0; n < currencies.length; n++) {
            const code = currencies[cursorRef.current % currencies.length].code
            cursorRef.current++
            if (!next.filter((_, idx) => idx !== i).includes(code)) {
              next[i] = code
              break
            }
          }
        }
        return next
      })
    }, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [currencies])

  const enter = (i: number) => {
    frozenRef.current.add(i)
    setFrozen(new Set(frozenRef.current))
  }
  const leave = (i: number) => {
    frozenRef.current.delete(i)
    setFrozen(new Set(frozenRef.current))
  }

  return (
    <div className="bt-grid-wrap">
      <h3 className="bt-grid__title">{title}</h3>
      <div className="bt-grid">
        {slots.map((code, index) => {
          const currency = currencyMap[code]
          const price = priceMap[code]
          if (!currency || !price) return null
          const positive = price.changePercent >= 0
          return (
            <button
              key={`slot-${index}`}
              type="button"
              onClick={() => onSelect(code)}
              onMouseEnter={() => enter(index)}
              onMouseLeave={() => leave(index)}
              className={`bt-slot ${code === selectedCode ? 'is-selected' : ''} ${
                frozen.has(index) ? 'is-frozen' : ''
              }`}
            >
              <div className="bt-slot__head">
                <span className="bt-flag">{currency.flag}</span>
                <span className="bt-slot__code">{currency.code}</span>
              </div>
              <p className="bt-slot__name">{currency.name}</p>
              <p className="bt-slot__rate">{formatRate(price.rate, currency.code)}</p>
              <p className={`bt-change ${positive ? 'is-up' : 'is-down'}`}>
                {positive ? '+' : ''}
                {price.changePercent.toFixed(2)}%
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TickerBar({ prices, statusLabel }: { prices: PriceData[]; statusLabel: string }) {
  const items = TOP_CURRENCIES.map((c) => {
    const p = prices.find((pr) => pr.code === c.code)
    return p ? { ...c, ...p } : null
  }).filter(Boolean) as (PriceData & Currency)[]
  const loop = [...items, ...items]

  return (
    <div className="bt-ticker">
      <div className="bt-ticker__status">
        <span className="bt-ticker__dot" />
        <span>{statusLabel}</span>
      </div>
      <div className="bt-ticker__track-wrap">
        <div className="bt-ticker__track">
          {loop.map((item, i) => {
            const positive = item.changePercent >= 0
            return (
              <span key={`${item.code}-${i}`} className="bt-ticker__item">
                <span className="bt-ticker__code">{item.code}-USD</span>
                <span className="bt-ticker__rate">{formatRate(item.rate, item.code)}</span>
                <span className={positive ? 'is-up' : 'is-down'}>
                  {positive ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </span>
            )
          })}
        </div>
      </div>
      <div className="bt-ticker__copy">© 2026 Cenan AI</div>
    </div>
  )
}

export default function Borsa() {
  const { t } = useI18n()
  const [selectedCode, setSelectedCode] = useState('USD')
  const [period, setPeriod] = useState('1Y')

  const prices = useMemo(() => generatePriceData(), [])
  const priceMap = useMemo(() => Object.fromEntries(prices.map((p) => [p.code, p])), [prices])

  const selectedCurrency = useMemo(
    () =>
      [...TOP_CURRENCIES, ...OTHER_CURRENCIES].find((c) => c.code === selectedCode) ??
      TOP_CURRENCIES[0],
    [selectedCode],
  )
  const selectedPrice = priceMap[selectedCode] ?? prices[0]

  const totalChange = useMemo(
    () => TOP_CURRENCIES.reduce((sum, c) => sum + (priceMap[c.code]?.changePercent ?? 0), 0) / 10,
    [priceMap],
  )

  return (
    <div className="borsa">
      <div className="borsa__inner">
        <div className="borsa__head">
          <h1>{t('borsa.title')}</h1>
          <p>{t('borsa.sub')}</p>
        </div>

        <HoverScrollRow>
          <div className="bt-index">
            <p className="bt-index__label">{t('borsa.index')}</p>
            <p className="bt-index__value">{t('borsa.count')}</p>
            <div className="bt-index__bar">
              {['#f7931a', '#627eea', '#26a17b', '#00e676', '#6b7280'].map((c, i) => (
                <span key={i} style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className={`bt-change ${totalChange >= 0 ? 'is-up' : 'is-down'}`}>
              {totalChange >= 0 ? '+' : ''}
              {totalChange.toFixed(2)}% {t('borsa.avgToday')}
            </p>
          </div>

          {TOP_CURRENCIES.map((c) => (
            <TopCard
              key={c.code}
              currency={c}
              price={priceMap[c.code]}
              selected={c.code === selectedCode}
              onClick={() => setSelectedCode(c.code)}
            />
          ))}
        </HoverScrollRow>

        <MainChart
          currency={selectedCurrency}
          price={selectedPrice}
          period={period}
          onPeriodChange={setPeriod}
          labels={{
            high: t('borsa.high'),
            low: t('borsa.low'),
            change: t('borsa.changeLabel'),
            rate: t('borsa.rate'),
          }}
        />

        <CurrencyGrid
          currencies={OTHER_CURRENCIES}
          priceMap={priceMap}
          selectedCode={selectedCode}
          onSelect={setSelectedCode}
          title={t('borsa.others')}
        />
      </div>

      <TickerBar prices={prices} statusLabel={t('borsa.stable')} />
    </div>
  )
}
