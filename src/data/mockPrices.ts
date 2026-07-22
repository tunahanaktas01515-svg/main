import { ALL_CURRENCIES } from './currencies'

export interface PriceData {
  code: string
  rate: number
  change: number
  changePercent: number
  high24h: number
  low24h: number
}

const BASE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  JPY: 149.5,
  GBP: 0.79,
  CNY: 7.24,
  CHF: 0.88,
  AUD: 1.53,
  CAD: 1.36,
  HKD: 7.82,
  SGD: 1.34,
  KRW: 1320.5,
  INR: 83.12,
  TWD: 31.45,
  THB: 35.2,
  IDR: 15680,
  MYR: 4.72,
  PHP: 55.8,
  VND: 24500,
  SEK: 10.45,
  NOK: 10.62,
  DKK: 6.87,
  PLN: 4.02,
  CZK: 22.85,
  HUF: 358.2,
  RON: 4.57,
  TRY: 32.15,
  MXN: 17.12,
  BRL: 4.95,
  CLP: 890.5,
  COP: 3950,
  ARS: 865.3,
  PEN: 3.72,
  AED: 3.67,
  SAR: 3.75,
  ILS: 3.65,
  ZAR: 18.45,
  EGP: 30.9,
  NGN: 1550,
  NZD: 1.62,
  RUB: 92.5,
  KZT: 450.2,
  UAH: 37.8,
  QAR: 3.64,
  KWD: 0.307,
  BHD: 0.377,
  OMR: 0.385,
  PKR: 278.5,
  BDT: 110.2,
  LKR: 325.8,
  MAD: 10.05,
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function generatePriceData(): PriceData[] {
  const now = Date.now()
  return ALL_CURRENCIES.map((currency, i) => {
    const base = BASE_RATES[currency.code] || 1
    const volatility = seededRandom(now / 1000 + i) * 0.02 - 0.01
    const changePercent = volatility * 100
    const change = base * volatility
    return {
      code: currency.code,
      rate: base + change,
      change,
      changePercent,
      high24h: base * (1 + Math.abs(volatility) + 0.005),
      low24h: base * (1 - Math.abs(volatility) - 0.005),
    }
  })
}

export interface ChartPoint {
  time: string
  value: number
}

export function generateChartData(
  code: string,
  period: string,
  points = 60
): ChartPoint[] {
  const base = BASE_RATES[code] || 1
  const data: ChartPoint[] = []
  const periodMs: Record<string, number> = {
    '1D': 24 * 60 * 60 * 1000,
    '7D': 7 * 24 * 60 * 60 * 1000,
    '1M': 30 * 24 * 60 * 60 * 1000,
    '3M': 90 * 24 * 60 * 60 * 1000,
    '6M': 180 * 24 * 60 * 60 * 1000,
    '1Y': 365 * 24 * 60 * 60 * 1000,
    ALL: 730 * 24 * 60 * 60 * 1000,
  }
  const totalMs = periodMs[period] || periodMs['1Y']
  const now = Date.now()

  let value = base * (0.95 + seededRandom(code.charCodeAt(0)) * 0.1)

  for (let i = 0; i < points; i++) {
    const timestamp = now - totalMs + (totalMs / points) * i
    const date = new Date(timestamp)
    const noise = (seededRandom(i * 7 + code.charCodeAt(0)) - 0.48) * base * 0.008
    value = Math.max(value + noise, base * 0.85)

    let timeLabel: string
    if (period === '1D') {
      timeLabel = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    } else if (period === '7D') {
      timeLabel = date.toLocaleDateString('tr-TR', { weekday: 'short' })
    } else {
      timeLabel = date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
    }

    data.push({ time: timeLabel, value: parseFloat(value.toFixed(4)) })
  }

  return data
}

export function formatRate(rate: number, code: string): string {
  if (code === 'JPY' || code === 'KRW' || code === 'IDR' || code === 'VND' || code === 'COP' || code === 'NGN') {
    return rate.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  if (code === 'KWD' || code === 'BHD' || code === 'OMR') {
    return rate.toLocaleString('tr-TR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
  }
  return rate.toLocaleString('tr-TR', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}
