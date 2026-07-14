"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PLAN_LIMITS } from "@/lib/plans";
import type { PlanId, QuotaKey, UsageState } from "@/lib/types";

interface SubscriptionContextValue {
  plan: PlanId;
  usage: UsageState;
  setPlan: (plan: PlanId) => void;
  /** Remaining quota for a given key (Infinity when unlimited). */
  remaining: (key: QuotaKey) => number;
  /** True if the user can still consume a unit of the given quota. */
  canUse: (key: QuotaKey) => boolean;
  /** Consume one unit; returns false when blocked by the quota. */
  consume: (key: QuotaKey) => boolean;
  resetUsage: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

const PLAN_KEY = "makerai.plan";
const USAGE_KEY = "makerai.usage";

const EMPTY_USAGE: UsageState = {
  aiMessages: 0,
  chatImports: 0,
  modelAnalyses: 0,
  chatHistory: 0,
};

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlanState] = useState<PlanId>("free");
  const [usage, setUsage] = useState<UsageState>(EMPTY_USAGE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedPlan = window.localStorage.getItem(PLAN_KEY) as PlanId | null;
    if (storedPlan === "free" || storedPlan === "premium") {
      setPlanState(storedPlan);
    }
    const storedUsage = window.localStorage.getItem(USAGE_KEY);
    if (storedUsage) {
      try {
        setUsage({ ...EMPTY_USAGE, ...JSON.parse(storedUsage) });
      } catch {
        /* ignore malformed usage */
      }
    }
  }, []);

  const persistUsage = useCallback((next: UsageState) => {
    setUsage(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(USAGE_KEY, JSON.stringify(next));
    }
  }, []);

  const setPlan = useCallback((next: PlanId) => {
    setPlanState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PLAN_KEY, next);
    }
  }, []);

  const remaining = useCallback(
    (key: QuotaKey) => {
      const limit = PLAN_LIMITS[plan][key];
      if (limit === "unlimited") return Infinity;
      return Math.max(0, (limit as number) - usage[key]);
    },
    [plan, usage],
  );

  const canUse = useCallback((key: QuotaKey) => remaining(key) > 0, [remaining]);

  const consume = useCallback(
    (key: QuotaKey) => {
      const limit = PLAN_LIMITS[plan][key];
      if (limit === "unlimited") return true;
      if (usage[key] >= (limit as number)) return false;
      persistUsage({ ...usage, [key]: usage[key] + 1 });
      return true;
    },
    [plan, usage, persistUsage],
  );

  const resetUsage = useCallback(() => persistUsage(EMPTY_USAGE), [persistUsage]);

  const value = useMemo<SubscriptionContextValue>(
    () => ({ plan, usage, setPlan, remaining, canUse, consume, resetUsage }),
    [plan, usage, setPlan, remaining, canUse, consume, resetUsage],
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider",
    );
  }
  return ctx;
}
