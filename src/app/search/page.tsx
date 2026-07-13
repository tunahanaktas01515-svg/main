"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, Search } from "lucide-react";
import { Suspense } from "react";
import { ModelCard } from "@/components/models/ModelCard";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORIES, MOCK_MODELS, SOURCES } from "@/lib/data";

function SearchInner() {
  const { t } = useLanguage();
  const params = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState("all");
  const [source, setSource] = useState("all");
  const [price, setPrice] = useState<"all" | "free" | "paid">("all");
  const [difficulty, setDifficulty] = useState("all");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return MOCK_MODELS.filter((m) => {
      const text = `${m.title} ${m.description} ${m.tags.join(" ")} ${m.category}`.toLowerCase();
      if (query && !text.includes(query)) return false;
      if (category !== "all" && m.category !== category) return false;
      if (source !== "all" && m.source.name !== source) return false;
      if (price === "free" && !m.isFree) return false;
      if (price === "paid" && m.isFree) return false;
      if (difficulty !== "all" && m.difficulty !== difficulty) return false;
      return true;
    });
  }, [q, category, source, price, difficulty]);

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {t("search.title")}
          </h1>
          <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
            {t("search.subtitle")}
          </p>
          <p className="mt-2 text-xs text-[var(--accent-orange)]">
            {t("search.redirectNote")}
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)] p-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-black/25 px-3">
            <Search size={18} className="text-[var(--accent-cyan)]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full bg-transparent py-3 text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)] p-4">
            <div className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-white">
              <Filter size={16} className="text-[var(--accent-orange)]" />
              {t("search.filters")}
            </div>

            <label className="mb-4 block text-xs text-[var(--text-muted)]">
              {t("search.category")}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-2 text-sm text-white"
              >
                <option value="all">{t("search.all")}</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="mb-4 block text-xs text-[var(--text-muted)]">
              {t("search.source")}
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-2 text-sm text-white"
              >
                <option value="all">{t("search.all")}</option>
                {SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="mb-4 block text-xs text-[var(--text-muted)]">
              {t("search.price")}
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value as "all" | "free" | "paid")}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-2 text-sm text-white"
              >
                <option value="all">{t("search.all")}</option>
                <option value="free">{t("search.freeOnly")}</option>
                <option value="paid">{t("search.paidOnly")}</option>
              </select>
            </label>

            <label className="block text-xs text-[var(--text-muted)]">
              {t("search.difficulty")}
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-2 text-sm text-white"
              >
                <option value="all">{t("search.all")}</option>
                <option value="easy">{t("model.easy")}</option>
                <option value="medium">{t("model.medium")}</option>
                <option value="hard">{t("model.hard")}</option>
              </select>
            </label>
          </aside>

          <div>
            <p className="mb-4 text-sm text-[var(--text-muted)]">
              {results.length} {t("search.results")}
            </p>
            {results.length === 0 ? (
              <div className="rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.5)] p-10 text-center text-[var(--text-muted)]">
                {t("search.noResults")}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((m) => (
                  <ModelCard key={m.id} model={m} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const { t } = useLanguage();
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-[var(--text-muted)]">
          {t("common.loading")}
        </div>
      }
    >
      <SearchInner />
    </Suspense>
  );
}