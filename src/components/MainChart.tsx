import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { Currency } from '../data/currencies'
import type { PriceData } from '../data/mockPrices'
import { formatRate, generateChartData } from '../data/mockPrices'

const PERIODS = ['1D', '7D', '1M', '3M', '6M', '1Y', 'ALL'] as const

interface MainChartProps {
  currency: Currency
  price: PriceData
  period: string
  onPeriodChange: (period: string) => void
}

export default function MainChart({ currency, price, period, onPeriodChange }: MainChartProps) {
  const chartData = useMemo(() => generateChartData(currency.code, period), [currency.code, period])
  const isPositive = price.changePercent >= 0

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5 flex-1">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span>{currency.flag}</span>
            {currency.code}/USD
          </h2>
          <p className="text-text-muted text-sm">{currency.name}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{formatRate(price.rate, currency.code)}</p>
          <p className={`text-sm font-medium ${isPositive ? 'text-positive' : 'text-negative'}`}>
            {isPositive ? '+' : ''}
            {price.changePercent.toFixed(2)}% bugün
          </p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {PERIODS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPeriodChange(p)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              period === p
                ? 'bg-accent text-black'
                : 'text-text-secondary hover:text-white hover:bg-white/5'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="mainChartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00e676" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#00e676" stopOpacity={0} />
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
              width={60}
              tickFormatter={(v: number) => formatRate(v, currency.code)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e1e1e',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: '#9ca3af' }}
              formatter={(value) => [formatRate(Number(value), currency.code), 'Kur']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00e676"
              strokeWidth={2}
              fill="url(#mainChartGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#00e676', stroke: '#0d0d0d', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-6 mt-4 pt-4 border-t border-border">
        <Stat label="24s Yüksek" value={formatRate(price.high24h, currency.code)} />
        <Stat label="24s Düşük" value={formatRate(price.low24h, currency.code)} />
        <Stat label="Değişim" value={`${isPositive ? '+' : ''}${price.changePercent.toFixed(2)}%`} positive={isPositive} />
      </div>
    </div>
  )
}

function Stat({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div>
      <p className="text-text-muted text-xs">{label}</p>
      <p className={`text-sm font-semibold ${positive === undefined ? 'text-white' : positive ? 'text-positive' : 'text-negative'}`}>
        {value}
      </p>
    </div>
  )
}
