"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { PLANS } from "@/lib/data";
import type { PlanId } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function PricingPage() {
  const { t, locale } = useLanguage();
  const { user, setPlan } = useAuth();

  const labels: Record<PlanId, string> = {
    free: t("pricing.free"),
    basic: t("pricing.basic"),
    premium: t("pricing.premium"),
  };

  const onSelect = (id: PlanId) => {
    if (!user) return;
    setPlan(id);
  };

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {t("pricing.title")}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--text-muted)]">
          {t("pricing.subtitle")}
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => {
            const current = user?.plan === plan.id;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl border p-6 text-start ${
                  plan.highlighted
                    ? "border-[rgba(255,122,26,0.55)] bg-[rgba(40,20,10,0.55)] shadow-[0_0_40px_rgba(255,122,26,0.15)]"
                    : "border-[var(--border)] bg-[rgba(15,26,48,0.7)]"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 end-4 rounded-full bg-[image:var(--gradient-fire)] px-3 py-1 text-[10px] font-bold uppercase text-white">
                    Premium
                  </span>
                )}
                <h2 className="font-display text-xl font-bold text-white">
                  {labels[plan.id]}
                </h2>
                <p className="mt-3 font-display text-4xl font-extrabold text-white">
                  {plan.priceMonthly === 0
                    ? "₺0"
                    : formatPrice(plan.priceMonthly, "TRY", locale)}
                  <span className="text-sm font-normal text-[var(--text-muted)]">
                    {t("pricing.month")}
                  </span>
                </p>
                <p className="mt-2 text-sm text-[var(--accent-cyan)]">
                  {plan.aiCredits} {t("pricing.credits")}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-[var(--text-muted)]">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-[var(--accent-blue)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                {user ? (
                  <button
                    type="button"
                    disabled={current}
                    onClick={() => onSelect(plan.id)}
                    className={`mt-6 w-full rounded-xl py-3 text-sm font-bold ${
                      current
                        ? "cursor-default border border-[var(--border)] text-[var(--text-muted)]"
                        : plan.highlighted
                          ? "btn-danger"
                          : "btn-primary"
                    }`}
                  >
                    {current ? t("pricing.current") : t("pricing.select")}
                  </button>
                ) : (
                  <Link
                    href="/auth?mode=register"
                    className="btn-primary mt-6 block rounded-xl py-3 text-center text-sm"
                  >
                    {t("nav.register")}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}