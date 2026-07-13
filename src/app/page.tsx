"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  Bot,
  GitCompare,
  Search,
  Sparkles,
  Upload,
} from "lucide-react";
import { ModelCard } from "@/components/models/ModelCard";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_MODELS } from "@/lib/data";

export default function HomePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [q, setQ] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const features = [
    {
      href: "/analyze",
      icon: Upload,
      title: t("features.analyze.title"),
      desc: t("features.analyze.desc"),
      accent: "from-blue-500/20 to-cyan-500/5",
    },
    {
      href: "/search",
      icon: Search,
      title: t("features.search.title"),
      desc: t("features.search.desc"),
      accent: "from-orange-500/20 to-red-500/5",
    },
    {
      href: "/compare",
      icon: GitCompare,
      title: t("features.compare.title"),
      desc: t("features.compare.desc"),
      accent: "from-cyan-500/20 to-blue-500/5",
    },
    {
      href: "/ai-chat",
      icon: Bot,
      title: t("features.chat.title"),
      desc: t("features.chat.desc"),
      accent: "from-red-500/15 to-orange-500/5",
    },
  ];

  return (
    <div className="relative">
      <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute -end-20 top-10 h-72 w-72 rounded-full bg-[rgba(47,140,255,0.2)] blur-3xl animate-pulse-soft" />
        <div className="pointer-events-none absolute -start-10 bottom-0 h-64 w-64 rounded-full bg-[rgba(255,122,26,0.15)] blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/5 px-4 py-1.5 text-xs text-[var(--accent-cyan)]">
            <Sparkles size={14} className="animate-float" />
            {t("hero.badge")}
          </div>

          <h1 className="font-display text-4xl font-extrabold tracking-wide text-white sm:text-6xl md:text-7xl">
            <span className="text-gradient">{t("hero.title")}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--text-muted)] sm:text-lg">
            {t("hero.subtitle")}
          </p>

          <form onSubmit={onSearch} className="mx-auto mt-10 max-w-3xl">
            <div className="hero-search flex items-center gap-2 rounded-2xl border border-[rgba(47,140,255,0.35)] p-2 shadow-[0_0_40px_rgba(47,140,255,0.18)]">
              <Search className="ms-3 shrink-0 text-[var(--accent-cyan)]" size={22} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("hero.searchPlaceholder")}
                className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-[var(--text-muted)] sm:text-base"
              />
              <button
                type="submit"
                className="btn-primary shrink-0 rounded-xl px-4 py-3 text-sm sm:px-6"
              >
                {t("hero.ctaSearch")}
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/analyze"
              className="btn-secondary rounded-xl px-5 py-3 text-sm"
            >
              {t("hero.ctaAnalyze")}
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl bg-[image:var(--gradient-fire)] px-5 py-3 text-sm font-bold text-white"
            >
              {t("nav.pricing")}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display mb-6 text-2xl font-bold text-white">
            {t("features.title")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ href, icon: Icon, title, desc, accent }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-2xl border border-[var(--border)] bg-gradient-to-br ${accent} p-5 transition hover:-translate-y-1 hover:border-[rgba(47,140,255,0.4)]`}
              >
                <div className="mb-4 inline-flex rounded-xl bg-white/8 p-3 text-[var(--accent-cyan)]">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-base font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                  {desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-white">
              {t("featured.title")}
            </h2>
            <Link
              href="/search"
              className="text-sm text-[var(--accent-blue)] hover:underline"
            >
              {t("featured.viewAll")}
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {MOCK_MODELS.slice(0, 4).map((m) => (
              <ModelCard key={m.id} model={m} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}