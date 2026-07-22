import type { Currency } from '../data/currencies'
import type { PriceData } from '../data/mockPrices'
import { formatRate } from '../data/mockPrices'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

interface CurrencyCardProps {
  currency: Currency
  price: PriceData
  isSelected?: boolean
  onClick?: () => void
  compact?: boolean
}

export default function CurrencyCard({ currency, price, isSelected, onClick, compact }: CurrencyCardProps) {
  const isPositive = price.changePercent >= 0
  const color = isPositive ? '#00e676' : '#ff5252'
  const miniData = Array.from({ length: 12 }, (_, i) => ({
    v: price.rate * (1 + Math.sin(i * 0.8 + currency.code.charCodeAt(0)) * 0.003),
  }))

  const baseClass = isSelected
    ? 'bg-bg-card-hover border-accent/40 shadow-[0_0_12px_rgba(0,230,118,0.1)]'
    : 'bg-bg-card border-border hover:border-border/80 hover:bg-bg-card-hover'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border transition-all cursor-pointer text-left ${compact ? 'flex-shrink-0 w-[140px] p-3' : 'p-4 w-full'} ${baseClass}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{currency.flag}</span>
        <CurrencyInfo currency={currency} />
      </div>

      <div className={compact ? 'mt-2' : 'mt-3 flex items-end justify-between'}>
        <PriceDisplay currency={currency} price={price} isPositive={isPositive} compact={compact} />
        {!compact && <MiniSparkline currency={currency} data={miniData} color={color} />}
      </div>
    </button>
  )
}

function CurrencyInfo({ currency }: { currency: Currency }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{currency.code}</p>
      <p className="text-[10px] text-text-muted leading-tight">{currency.name}</p>
    </div>
  )
}

function PriceDisplay({
  currency,
  price,
  isPositive,
  compact,
}: {
  currency: Currency
  price: PriceData
  isPositive: boolean
  compact?: boolean
}) {
  return (
    <div>
      <p className={`font-bold text-white ${compact ? 'text-sm' : 'text-base'}`}>
        {formatRate(price.rate, currency.code)}
      </p>
      <p className={`text-xs font-medium mt-0.5 ${isPositive ? 'text-positive' : 'text-negative'}`}>
        {isPositive ? '+' : ''}
        {price.changePercent.toFixed(2)}%
        {!compact && <span className="text-text-muted ml-1">bugün</span>}
      </p>
    </div>
  )
}

function MiniSparkline({
  currency,
  data,
  color,
}: {
  currency: Currency
  data: { v: number }[]
  color: string
}) {
  return (
    <div className="w-16 h-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${currency.code}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#grad-${currency.code})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
