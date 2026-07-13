"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { useLanguage } from "@/context/LanguageContext";
import { MOCK_MODELS } from "@/lib/data";
import { formatNumber, formatPrice } from "@/lib/utils";

export default function ComparePage() {
  const { t, locale } = useLanguage();
  const { selectedIds, clear } = useCompare();
  const models = MOCK_MODELS.filter((m) => selectedIds.includes(m.id));

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">
              {t("compare.title")}
            </h1>
            <p className="mt-2 text-[var(--text-muted)]">{t("compare.subtitle")}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/search" className="btn-secondary rounded-xl px-4 py-2 text-sm">
              {t("nav.search")}
            </Link>
            {models.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="btn-secondary rounded-xl px-4 py-2 text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {models.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.5)] p-12 text-center text-[var(--text-muted)]">
            {t("compare.empty")}
          </div>
        ) : (
          <div className={`grid gap-4 ${models.length === 1 ? "md:grid-cols-1" : models.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {models.map((m) => (
              <div
                key={m.id}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)]"
              >
                <div className="relative aspect-video">
                  <Image
                    src={m.thumbnail}
                    alt={m.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="space-y-3 p-4 text-sm">
                  <h2 className="font-display text-lg font-semibold text-white">
                    {m.title}
                  </h2>
                  <p className="text-[var(--text-muted)]">{m.aiDescription}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-black/25 p-2">
                      <div className="text-[var(--text-muted)]">{t("search.source")}</div>
                      <div>{m.source.name}</div>
                    </div>
                    <div className="rounded-lg bg-black/25 p-2">
                      <div className="text-[var(--text-muted)]">{t("search.price")}</div>
                      <div>
                        {m.isFree
                          ? t("model.free")
                          : formatPrice(m.price || 0, m.currency || "USD", locale)}
                      </div>
                    </div>
                    <div className="rounded-lg bg-black/25 p-2">
                      <div className="text-[var(--text-muted)]">{t("model.likes")}</div>
                      <div>{formatNumber(m.likes, locale)}</div>
                    </div>
                    <div className="rounded-lg bg-black/25 p-2">
                      <div className="text-[var(--text-muted)]">{t("model.difficulty")}</div>
                      <div>{t(`model.${m.difficulty}`)}</div>
                    </div>
                    <div className="rounded-lg bg-black/25 p-2">
                      <div className="text-[var(--text-muted)]">Filament</div>
                      <div>{m.filamentGrams ?? "—"} g</div>
                    </div>
                    <div className="rounded-lg bg-black/25 p-2">
                      <div className="text-[var(--text-muted)]">Print</div>
                      <div>{m.printTime ?? "—"}</div>
                    </div>
                  </div>
                  <a
                    href={m.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs"
                  >
                    <ExternalLink size={14} />
                    {t("model.download")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}