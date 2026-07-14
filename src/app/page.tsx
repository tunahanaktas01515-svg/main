"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { HeroVisual } from "@/components/HeroVisual";
import {
  ArrowIcon,
  BoltIcon,
  ChatIcon,
  CubeIcon,
  FilamentIcon,
  LinkIcon,
  PaletteIcon,
  SlidersIcon,
  SparkIcon,
} from "@/components/Icons";

const FEATURE_ICONS = [
  CubeIcon,
  FilamentIcon,
  PaletteIcon,
  LinkIcon,
  ChatIcon,
  SlidersIcon,
];

const FEATURE_ACCENTS = [
  "from-blue/20 to-blue/5 text-blue-bright",
  "from-orange/20 to-orange/5 text-orange-bright",
  "from-red/20 to-red/5 text-red",
  "from-cyan/20 to-cyan/5 text-cyan",
  "from-blue/20 to-orange/5 text-blue-bright",
  "from-orange/20 to-red/5 text-orange-bright",
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:pb-24 lg:pt-20 lg:px-8">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-3 py-1.5 text-xs font-medium text-blue-bright">
              <SparkIcon className="h-4 w-4" />
              {t.home.heroBadge}
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t.home.heroTitleTop}
              <br />
              <span className="text-gradient-hero">
                {t.home.heroTitleHighlight}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {t.home.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/analyze"
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
              >
                {t.home.heroCtaPrimary}
                <ArrowIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/60 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-blue/50"
              >
                {t.home.heroCtaSecondary}
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {t.home.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-2xl font-bold text-gradient-blue">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs text-ink-dim">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.home.featuresTitle}
          </h2>
          <p className="mt-4 text-ink-soft">{t.home.featuresSubtitle}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.home.features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i] ?? CubeIcon;
            return (
              <article
                key={feature.title}
                className="card-hover glass group rounded-2xl p-6"
              >
                <div
                  className={`mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${FEATURE_ACCENTS[i]}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {feature.desc}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t.home.howTitle}
          </h2>
          <p className="mt-4 text-ink-soft">{t.home.howSubtitle}</p>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div className="absolute inset-x-[16%] top-8 hidden h-px bg-gradient-to-r from-blue via-orange to-red md:block" />
          {t.home.steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-border bg-surface text-2xl font-bold text-gradient-blue shadow-glow-blue">
                {i + 1}
              </div>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="glass relative overflow-hidden rounded-3xl border-blue/25 px-6 py-14 text-center sm:px-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />
          <div className="relative">
            <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue to-red shadow-glow-blue">
              <BoltIcon className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t.home.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              {t.home.ctaSubtitle}
            </p>
            <Link
              href="/analyze"
              className="btn-fire mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
            >
              {t.home.ctaButton}
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
