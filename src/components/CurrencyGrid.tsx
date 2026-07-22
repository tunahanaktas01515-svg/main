import { useState, useEffect, useRef, useMemo } from 'react'
import type { Currency } from '../data/currencies'
import type { PriceData } from '../data/mockPrices'
import { formatRate } from '../data/mockPrices'

const SLOT_COUNT = 5
const ROTATE_MS = 1500

interface CurrencyGridProps {
  currencies: Currency[]
  prices: PriceData[]
  selectedCode: string
  onSelect: (code: string) => void
}

export default function CurrencyGrid({ currencies, prices, selectedCode, onSelect }: CurrencyGridProps) {
  const priceMap = useMemo(() => Object.fromEntries(prices.map((p) => [p.code, p])), [prices])
  const currencyMap = useMemo(() => Object.fromEntries(currencies.map((c) => [c.code, c])), [currencies])

  const [slots, setSlots] = useState<string[]>(() =>
    currencies.slice(0, SLOT_COUNT).map((c) => c.code)
  )
  const [frozenSlots, setFrozenSlots] = useState<Set<number>>(() => new Set())
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
            const occupiedByOthers = next.filter((_, idx) => idx !== i)
            if (!occupiedByOthers.includes(code)) {
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

  const handleEnter = (index: number) => {
    frozenRef.current.add(index)
    setFrozenSlots(new Set(frozenRef.current))
  }

  const handleLeave = (index: number) => {
    frozenRef.current.delete(index)
    setFrozenSlots(new Set(frozenRef.current))
  }

  return (
    <div className="bg-bg-card border border-border rounded-2xl p-5 sm:p-6">
      <h3 className="text-base font-semibold text-white mb-4 px-0.5">Diğer Dövizler</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {slots.map((code, index) => {
          const currency = currencyMap[code]
          const price = priceMap[code]
          if (!currency || !price) return null

          const isPositive = price.changePercent >= 0
          const isSelected = code === selectedCode
          const isFrozen = frozenSlots.has(index)

          return (
            <button
              key={`slot-${index}`}
              type="button"
              onClick={() => onSelect(code)}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={() => handleLeave(index)}
              className={`px-4 py-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer min-h-[108px] ${
                isSelected
                  ? 'bg-accent/10 border-accent/40'
                  : isFrozen
                    ? 'bg-bg-card-hover border-border/90'
                    : 'bg-bg-primary border-border hover:border-border/80 hover:bg-bg-card-hover'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-base leading-none">{currency.flag}</span>
                <span className="text-sm font-semibold text-white tracking-wide">{currency.code}</span>
              </div>
              <p className="text-xs text-text-muted truncate mb-2.5 leading-snug">{currency.name}</p>
              <p className="text-sm font-medium text-white tabular-nums mb-1">
                {formatRate(price.rate, currency.code)}
              </p>
              <p className={`text-xs font-medium tabular-nums ${isPositive ? 'text-positive' : 'text-negative'}`}>
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
