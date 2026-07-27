import type { PlanId, PlanOption } from '../types';

/**
 * Web sitesinde seçilen pakete göre profil kartında otomatik gösterilen
 * abonelik seviyeleri.
 */
export const planOptions: PlanOption[] = [
  {
    id: 'standart',
    name: 'Standart',
    taglineKey: 'plan.standart.tagline',
    badge: 'border-white/20 bg-white/[0.08] text-white/75',
    credits: '1.000',
  },
  {
    id: 'pro',
    name: 'Pro',
    taglineKey: 'plan.pro.tagline',
    badge: 'border-indigo-400/35 bg-indigo-500/18 text-indigo-100',
    credits: '4.000',
  },
  {
    id: 'business',
    name: 'Business',
    taglineKey: 'plan.business.tagline',
    badge: 'border-violet-400/35 bg-violet-500/18 text-violet-100',
    credits: '12.000',
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    taglineKey: 'plan.unlimited.tagline',
    badge: 'border-amber-400/35 bg-amber-500/18 text-amber-100',
    credits: '∞',
  },
];

export function findPlan(id: PlanId) {
  return planOptions.find((plan) => plan.id === id) ?? planOptions[0];
}
