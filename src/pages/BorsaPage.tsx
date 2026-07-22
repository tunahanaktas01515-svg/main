import { useState, useMemo, useCallback } from 'react'
import { TOP_CURRENCIES, OTHER_CURRENCIES } from '../data/currencies'
import { generatePriceData } from '../data/mockPrices'
import BubbleOrb from '../components/BubbleOrb'
import CenanLogo from '../components/CenanLogo'
import PartnershipMenu from '../components/PartnershipMenu'
import CurrencyCard from '../components/CurrencyCard'
import MainChart from '../components/MainChart'
import CurrencyGrid from '../components/CurrencyGrid'
import TickerBar from '../components/TickerBar'

export default function BorsaPage() {
  const [selectedCode, setSelectedCode] = useState('USD')
  const [period, setPeriod] = useState('1Y')

  const prices = useMemo(() => generatePriceData(), [])
  const priceMap = useMemo(() => Object.fromEntries(prices.map((p) => [p.code, p])), [prices])

  const selectedCurrency = useMemo(
    () => [...TOP_CURRENCIES, ...OTHER_CURRENCIES].find((c) => c.code === selectedCode) ?? TOP_CURRENCIES[0],
    [selectedCode]
  )
  const selectedPrice = priceMap[selectedCode] ?? prices[0]

  const handleSelect = useCallback((code: string) => setSelectedCode(code), [])

  const totalChange = useMemo(() => {
    const avg = TOP_CURRENCIES.reduce((sum, c) => sum + (priceMap[c.code]?.changePercent ?? 0), 0) / 10
    return avg
  }, [priceMap])

  return (
    <div className="min-h-screen bg-bg-primary pb-10">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-primary/90 backdrop-blur-md border-b border-border">
        <div className="max-w-[1440px] mx-auto pl-10 pr-5 sm:pl-14 sm:pr-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8 min-w-0">
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <BubbleOrb />
              <CenanLogo />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {['Sohbet', 'Portföy', 'Borsa', 'Cüzdan', 'Ortaklık'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    item === 'Borsa'
                      ? 'text-white border-b-2 border-accent pb-0.5'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
              <PartnershipMenu />
            </nav>
          </div>

          {/* Mobile: partnership menu on the right */}
          <div className="md:hidden">
            <PartnershipMenu />
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto pl-10 pr-5 sm:pl-14 sm:pr-8 py-5 space-y-5">
        {/* Top Summary + Top 10 Currency Cards */}
        <section>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            <div className="flex-shrink-0 w-[220px] p-4 bg-bg-card border border-border rounded-xl">
              <p className="text-text-muted text-xs mb-1">Döviz Endeksi</p>
              <p className="text-xl font-bold text-white">50 Para Birimi</p>
              <div className="flex gap-0.5 mt-3 h-1.5 rounded-full overflow-hidden">
                {['#f7931a', '#627eea', '#26a17b', '#00e676', '#6b7280'].map((color, i) => (
                  <div key={i} className="flex-1 rounded-full" style={{ backgroundColor: color }} />
                ))}
              </div>
              <p className={`text-xs font-medium mt-2 ${totalChange >= 0 ? 'text-positive' : 'text-negative'}`}>
                {totalChange >= 0 ? '+' : ''}
                {totalChange.toFixed(2)}% ortalama bugün
              </p>
            </div>

            {TOP_CURRENCIES.map((currency) => (
              <CurrencyCard
                key={currency.code}
                currency={currency}
                price={priceMap[currency.code]}
                isSelected={currency.code === selectedCode}
                onClick={() => handleSelect(currency.code)}
                compact
              />
            ))}
          </div>
        </section>

        <section>
          <MainChart
            currency={selectedCurrency}
            price={selectedPrice}
            period={period}
            onPeriodChange={setPeriod}
          />
        </section>

        <section>
          <CurrencyGrid
            currencies={OTHER_CURRENCIES}
            prices={prices}
            selectedCode={selectedCode}
            onSelect={handleSelect}
          />
        </section>
      </main>

      <TickerBar prices={prices} />
    </div>
  )
}
