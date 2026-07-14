"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { PLAN_LIMITS, PREMIUM_PRICE } from "@/lib/plans";
import type { PlanId, PlanLimits } from "@/lib/types";
import {
  CheckIcon,
  XIcon,
  SparkIcon,
  StarIcon,
  ChevronIcon,
} from "@/components/Icons";

type Billing = "monthly" | "yearly";

export default function PricingPage() {
  const { t } = useLanguage();
  const { plan, setPlan } = useSubscription();
  const [billing, setBilling] = useState<Billing>("monthly");

  const premiumPrice =
    billing === "monthly"
      ? PREMIUM_PRICE.monthly
      : Math.round(PREMIUM_PRICE.yearly / 12);

  const fmtLimit = (v: number | "unlimited") =>
    v === "unlimited" ? t.common.unlimited : String(v);

  const featureRows: {
    label: string;
    key?: keyof PlanLimits;
    render?: (limits: PlanLimits) => string;
    boolFree?: boolean;
  }[] = [
    { label: t.pricing.labels.aiMessages, key: "aiMessages" },
    { label: t.pricing.labels.chatImports, key: "chatImports" },
    { label: t.pricing.labels.modelAnalyses, key: "modelAnalyses" },
    { label: t.pricing.labels.chatHistory, key: "chatHistory" },
    {
      label: t.pricing.labels.storage,
      render: (l) => `${l.storageGb} GB`,
    },
    { label: t.pricing.labels.linkAnalysis, boolFree: true },
    { label: t.pricing.labels.printerTuning, boolFree: true },
    { label: t.pricing.labels.advanced, boolFree: false },
    { label: t.pricing.labels.priority, boolFree: false },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/* Header */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-3 py-1.5 text-xs font-medium text-orange-bright">
          <StarIcon className="h-4 w-4" />
          {t.meta.name}
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {t.pricing.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
          {t.pricing.subtitle}
        </p>
      </div>

      {/* Billing toggle */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="glass inline-flex items-center rounded-full p-1">
          {(["monthly", "yearly"] as Billing[]).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBilling(b)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                billing === b ? "text-white" : "text-ink-soft hover:text-ink"
              }`}
            >
              {billing === b && (
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue to-blue-bright" />
              )}
              <span className="relative">
                {b === "monthly" ? t.pricing.monthly : t.pricing.yearly}
              </span>
            </button>
          ))}
        </div>
        {billing === "yearly" && (
          <span className="rounded-full border border-orange/40 bg-orange/10 px-3 py-1 text-xs font-semibold text-orange-bright">
            {t.pricing.save}
          </span>
        )}
      </div>

      {/* Plan cards */}
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 lg:grid-cols-2">
        {/* Standard / Free */}
        <PlanCard
          id="free"
          name={t.pricing.freeName}
          desc={t.pricing.freeDesc}
          price={t.pricing.freePrice}
          current={plan === "free"}
          highlighted={false}
          ctaLabel={
            plan === "free" ? t.common.current : t.pricing.ctaFree
          }
          onSelect={() => setPlan("free")}
          limits={PLAN_LIMITS.free}
          rows={featureRows}
          fmtLimit={fmtLimit}
          t={t}
        />

        {/* Premium */}
        <PlanCard
          id="premium"
          name={t.pricing.premiumName}
          desc={t.pricing.premiumDesc}
          price={`${PREMIUM_PRICE.symbol}${premiumPrice}`}
          priceSuffix={t.common.perMonth}
          billingNote={billing === "yearly" ? t.pricing.billedYearly : undefined}
          current={plan === "premium"}
          highlighted
          badge={t.common.mostPopular}
          ctaLabel={
            plan === "premium" ? t.common.current : t.pricing.ctaPremium
          }
          onSelect={() => setPlan("premium")}
          limits={PLAN_LIMITS.premium}
          rows={featureRows}
          fmtLimit={fmtLimit}
          t={t}
        />
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          {t.pricing.faqTitle}
        </h2>
        <div className="mt-8 space-y-3">
          {t.pricing.faq.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlanCard({
  id,
  name,
  desc,
  price,
  priceSuffix,
  billingNote,
  current,
  highlighted,
  badge,
  ctaLabel,
  onSelect,
  limits,
  rows,
  fmtLimit,
  t,
}: {
  id: PlanId;
  name: string;
  desc: string;
  price: string;
  priceSuffix?: string;
  billingNote?: string;
  current: boolean;
  highlighted: boolean;
  badge?: string;
  ctaLabel: string;
  onSelect: () => void;
  limits: PlanLimits;
  rows: {
    label: string;
    key?: keyof PlanLimits;
    render?: (limits: PlanLimits) => string;
    boolFree?: boolean;
  }[];
  fmtLimit: (v: number | "unlimited") => string;
  t: ReturnType<typeof useLanguage>["t"];
}) {
  return (
    <div
      className={`glass relative flex flex-col rounded-3xl p-7 ${
        highlighted
          ? "border-orange/40 shadow-glow-orange"
          : "border-border"
      }`}
    >
      {highlighted && (
        <>
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange/20 blur-3xl" />
          {badge && (
            <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange to-red px-3 py-1 text-xs font-semibold text-white shadow-lg">
              <SparkIcon className="h-3.5 w-3.5" />
              {badge}
            </span>
          )}
        </>
      )}

      <div className="relative">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="mt-1.5 min-h-10 text-sm text-ink-soft">{desc}</p>

        <div className="mt-5 flex items-end gap-1.5">
          <span
            className={`text-4xl font-bold ${
              highlighted ? "text-gradient-fire" : "text-ink"
            }`}
          >
            {price}
          </span>
          {priceSuffix && (
            <span className="mb-1 text-sm text-ink-soft">{priceSuffix}</span>
          )}
        </div>
        <p className="mt-1 h-4 text-xs text-ink-dim">{billingNote}</p>

        <button
          type="button"
          onClick={onSelect}
          disabled={current}
          className={`mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
            current
              ? "cursor-default border border-border bg-surface-2 text-ink-soft"
              : highlighted
                ? "btn-fire"
                : "btn-primary"
          }`}
        >
          {current ? `✓ ${ctaLabel}` : ctaLabel}
        </button>
      </div>

      <div className="relative mt-7 border-t border-border pt-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-dim">
          {t.pricing.featuresHeading}
        </p>
        <ul className="space-y-3">
          {rows.map((row) => {
            let value: string | boolean;
            if (row.key) value = fmtLimit(limits[row.key] as number | "unlimited");
            else if (row.render) value = row.render(limits);
            else value = id === "premium" ? true : Boolean(row.boolFree);

            const isBool = typeof value === "boolean";
            const enabled = isBool ? (value as boolean) : true;

            return (
              <li key={row.label} className="flex items-center gap-3 text-sm">
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                    enabled
                      ? highlighted
                        ? "bg-orange/15 text-orange-bright"
                        : "bg-blue/15 text-blue-bright"
                      : "bg-surface-2 text-ink-dim"
                  }`}
                >
                  {enabled ? (
                    <CheckIcon className="h-3.5 w-3.5" />
                  ) : (
                    <XIcon className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className={enabled ? "text-ink-soft" : "text-ink-dim"}>
                  {row.label}
                </span>
                {!isBool && (
                  <span className="ml-auto font-semibold text-ink">
                    {value as string}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass overflow-hidden rounded-xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-medium text-ink">{q}</span>
        <ChevronIcon
          className={`h-5 w-5 shrink-0 text-ink-soft transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <p className="animate-fade-up border-t border-border px-5 py-4 text-sm leading-relaxed text-ink-soft">
          {a}
        </p>
      )}
    </div>
  );
}
