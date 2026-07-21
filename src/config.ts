/** İletişim ve site ayarları — telefon numaranızı buradan güncelleyin */
export const CONTACT = {
  phone: '+905551234567',
  phoneDisplay: '+90 555 123 45 67',
  email: 'tunahanaktas01515@gmail.com',
  whatsapp: '905551234567',
}

export type PlanId = 'standart' | 'pro' | 'business' | 'unlimited' | 'havuz'

export interface Plan {
  id: PlanId
  name: string
  monthly: number | null
  yearly: number | null
  credits: number | null
  popular?: boolean
  badge?: string
  audience: string
  features: string[]
  note?: string
  companiesOnly?: boolean
  startingPrice?: number
}

export const PLANS: Plan[] = [
  {
    id: 'standart',
    name: 'Standart',
    monthly: 14.99,
    yearly: 144.99,
    credits: 1500,
    audience: 'Bireysel kullanıcılar için ideal',
    features: [
      '1.500 kredi / dönem',
      '1 kredi = 0.01 euro',
      'Cenan AI sohbet erişimi',
      'Temel e-fatura analizi',
      'KDV hesaplama',
      'Web + uygulama erişimi',
    ],
    note: '1 kredi = 0.01 euro',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 39.99,
    yearly: 399.99,
    credits: 4500,
    popular: true,
    badge: 'MOST POPULAR',
    audience: 'Küçük ekipler için ideal',
    features: [
      '4.500 kredi / dönem',
      '1 kredi = 0.01 euro',
      'Gelişmiş analiz raporları',
      'Otonom onaylı ödeme',
      'Öncelikli destek',
      'Web + uygulama erişimi',
    ],
    note: '1 kredi = 0.01 euro',
  },
  {
    id: 'business',
    name: 'Business',
    monthly: 79.99,
    yearly: 799.99,
    credits: 9000,
    audience: 'Şirketler ve ajanslar için en iyi seçim',
    features: [
      '9.000 kredi / dönem',
      '1 kredi = 0.01 euro',
      'Takım yönetimi',
      'Gelişmiş vergi & KDV',
      'Özel raporlar',
    ],
    note: '1 kredi = 0.01 euro',
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    monthly: null,
    yearly: null,
    credits: null,
    startingPrice: 20,
    audience: 'Yoğun kullanım ve esnek kredi için',
    features: [
      'Başlangıç 20 euro',
      'Kredi başına ücretlendirme',
      '1 kredi = 0.02 euro',
      'Sınırsız kullanım esnekliği',
      'Web + uygulama erişimi',
    ],
    note: '1 kredi = 0.02 euro',
  },
  {
    id: 'havuz',
    name: 'Havuz',
    monthly: null,
    yearly: null,
    credits: null,
    badge: '%20 daha uygun',
    companiesOnly: true,
    audience: '5+ kullanıcılı şirketler için',
    features: [
      '%20 daha uygun fiyat',
      '5+ kullanıcı desteği',
      'Sadece şirketler için',
      'Ortak kredi havuzu',
      'Kurumsal destek',
    ],
    note: '5 ten fazla kullanıcı için desteklenen paket. Sadece şirketler ulaşabilir.',
  },
]

export const SEARCH_TOPICS = [
  'Cenan AI güç ve analiz yeteneği',
  'Cenan AI analiz raporları',
  'Cenan AI hakkında bilgiler',
]

export const AI_FEATURES = [
  { title: 'E-Fatura Analizi', tone: 'mint' as const },
  { title: 'Otonom Onaylı Ödeme', tone: 'blue' as const },
  { title: 'KDV ve Vergi hesaplama', tone: 'violet' as const },
  { title: '10 dan fazla özellik', tone: 'amber' as const },
]

export const VIDEO_CLIPS = [
  {
    id: '1',
    title: 'Cenan AI Tanıtım',
    duration: '0:18',
    tag: 'Reklam',
  },
  {
    id: '2',
    title: 'Analiz Gücü',
    duration: '0:12',
    tag: 'Klip',
  },
  {
    id: '3',
    title: 'E-Fatura Anında',
    duration: '0:15',
    tag: 'Reklam',
  },
  {
    id: '4',
    title: 'Web & App',
    duration: '0:10',
    tag: 'Klip',
  },
]
