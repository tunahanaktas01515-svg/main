/** İletişim ve site ayarları — telefon numaranızı buradan güncelleyin */
export const CONTACT = {
  phone: '+905333814319',
  phoneDisplay: '+90 533 381 43 19',
  email: 'tunahanaktas01515@gmail.com',
  whatsapp: '905333814319',
}

export type PlanId = 'standart' | 'pro' | 'business' | 'unlimited' | 'havuz'

export interface Plan {
  id: PlanId
  name: string
  monthly: number | null
  yearly: number | null
  credits: number | null
  popular?: boolean
  badgeKey?: string
  audienceKey: string
  featureKeys: string[]
  noteKey?: string
  companiesOnly?: boolean
  startingPrice?: number
  /** Hide on yearly billing */
  monthlyOnly?: boolean
}

export const PLANS: Plan[] = [
  {
    id: 'standart',
    name: 'Standart',
    monthly: 14.99,
    yearly: 144.99,
    credits: 1500,
    audienceKey: 'plan.standart.audience',
    featureKeys: [
      'plan.standart.f1',
      'plan.standart.f2',
      'plan.standart.f3',
      'plan.standart.f4',
      'plan.standart.f5',
    ],
    noteKey: 'plan.standart.f2',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 39.99,
    yearly: 399.99,
    credits: 4500,
    popular: true,
    badgeKey: 'plans.mostPopular',
    audienceKey: 'plan.pro.audience',
    featureKeys: [
      'plan.pro.f1',
      'plan.pro.f2',
      'plan.pro.f3',
      'plan.pro.f4',
      'plan.pro.f5',
    ],
    noteKey: 'plan.pro.f2',
  },
  {
    id: 'business',
    name: 'Business',
    monthly: 79.99,
    yearly: 799.99,
    credits: 9000,
    audienceKey: 'plan.business.audience',
    featureKeys: [
      'plan.business.f1',
      'plan.business.f2',
      'plan.business.f3',
      'plan.business.f4',
      'plan.business.f5',
    ],
    noteKey: 'plan.business.f2',
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    monthly: null,
    yearly: null,
    credits: null,
    startingPrice: 20,
    monthlyOnly: true,
    audienceKey: 'plan.unlimited.audience',
    featureKeys: [
      'plan.unlimited.f1',
      'plan.unlimited.f2',
      'plan.unlimited.f3',
      'plan.unlimited.f4',
    ],
    noteKey: 'plan.unlimited.f3',
  },
  {
    id: 'havuz',
    name: 'Havuz',
    monthly: null,
    yearly: null,
    credits: null,
    badgeKey: 'plans.havuzBadge',
    companiesOnly: true,
    monthlyOnly: true,
    audienceKey: 'plan.havuz.audience',
    featureKeys: [
      'plan.havuz.f1',
      'plan.havuz.f2',
      'plan.havuz.f3',
      'plan.havuz.f4',
      'plan.havuz.f5',
    ],
    noteKey: 'plan.havuz.note',
  },
]

export const VIDEO_CLIPS = [
  { id: '1', titleKey: 'home.clip1', duration: '0:18', tagKey: 'home.clipTagAd' },
  { id: '2', titleKey: 'home.clip2', duration: '0:12', tagKey: 'home.clipTagClip' },
  { id: '3', titleKey: 'home.clip3', duration: '0:15', tagKey: 'home.clipTagAd' },
  { id: '4', titleKey: 'home.clip4', duration: '0:10', tagKey: 'home.clipTagClip' },
]
