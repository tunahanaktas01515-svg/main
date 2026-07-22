import { TOP_CURRENCIES } from '../data/currencies'
import type { PriceData } from '../data/mockPrices'
import { formatRate } from '../data/mockPrices'

interface TickerBarProps {
  prices: PriceData[]
}

export default function TickerBar({ prices }: TickerBarProps) {
  const topPrices = TOP_CURRENCIES.map((c) => {
    const p = prices.find((pr) => pr.code === c.code)
    return p ? { ...c, ...p } : null
  }).filter(Boolean) as (PriceData & { flag: string; name: string })[]

  const items = [...topPrices, ...topPrices]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-card border-t border-border z-50">
      <div className="flex items-center h-8 overflow-hidden">
        <div className="flex items-center gap-1 px-4 border-r border-border flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-positive pulse-dot" />
          <span className="text-[10px] text-text-secondary whitespace-nowrap">Bağlantı Stabil (23ms)</span>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex ticker-animate whitespace-nowrap">
            {items.map((item, i) => {
              const isPositive = item.changePercent >= 0
              return (
                <span key={`${item.code}-${i}`} className="inline-flex items-center gap-2 px-4 text-xs">
                  <span className="text-text-secondary">{item.code}-USD</span>
                  <span className="text-white font-medium">{formatRate(item.rate, item.code)}</span>
                  <span className={isPositive ? 'text-positive' : 'text-negative'}>
                    {isPositive ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </span>
                </span>
              )
            })}
          </div>
        </div>

        <div className="px-4 border-l border-border flex-shrink-0">
          <span className="text-[10px] text-text-muted whitespace-nowrap">© 2026 Cenan AI</span>
        </div>
      </div>
    </div>
  )
}