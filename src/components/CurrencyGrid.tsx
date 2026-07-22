import type { Currency } from '../data/currencies'
import type { PriceData } from '../data/mockPrices'
import { formatRate } from '../data/mockPrices'

interface CurrencyGridProps {
  currencies: Currency[]
  prices: PriceData[]
  selectedCode: string
  onSelect: (code: string) => void
}

export default function CurrencyGrid({ currencies, prices, selectedCode, onSelect }: CurrencyGridProps) {
  const priceMap = Object.fromEntries(prices.map((p) => [p.code, p]))

  return (
    <div className="bg-bg-card border border-border rounded-xl p-5">
      <h3 className="text-base font-semibold text-white mb-4">Diğer Dövizler</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {currencies.map((currency) => {
          const price = priceMap[currency.code]
          if (!price) return null
          const isPositive = price.changePercent >= 0
          const isSelected = currency.code === selectedCode

          return (
            <button
              key={currency.code}
              type="button"
              onClick={() => onSelect(currency.code)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-accent/10 border-accent/40'
                  : 'bg-bg-primary border-border hover:border-border/80 hover:bg-bg-card-hover'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm">{currency.flag}</span>
                <span className="text-xs font-semibold text-white">{currency.code}</span>
              </div>
              <p className="text-xs text-text-muted truncate mb-1">{currency.name}</p>
              <p className="text-sm font-medium text-white">{formatRate(price.rate, currency.code)}</p>
              <p className={`text-[10px] font-medium ${isPositive ? 'text-positive' : 'text-negative'}`}>
                {isPositive ? '+' : ''}
                {price.changePercent.toFixed(2)}%
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
