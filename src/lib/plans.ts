import type { PlanId, PlanLimits } from "./types";

export const PLAN_LIMITS: Record<PlanId, PlanLimits> = {
  free: {
    aiMessages: 10,
    chatImports: 2,
    modelAnalyses: 4,
    chatHistory: 15,
    storageGb: 2,
  },
  premium: {
    aiMessages: "unlimited",
    chatImports: "unlimited",
    modelAnalyses: "unlimited",
    chatHistory: "unlimited",
    storageGb: 250,
  },
};

export const PREMIUM_PRICE = {
  monthly: 12,
  yearly: 108, // ~$9/mo billed yearly
  currency: "USD",
  symbol: "$",
};
