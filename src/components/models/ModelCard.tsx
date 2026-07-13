"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GitCompare, Heart, PlayCircle, Download } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { useLanguage } from "@/context/LanguageContext";
import type { MakerModel } from "@/lib/types";
import { cn, formatNumber, formatPrice } from "@/lib/utils";

export function ModelCard({ model }: { model: MakerModel }) {
  const { t, locale } = useLanguage();
  const { toggle, isSelected } = useCompare();
  const selected = isSelected(model.id);

  const difficultyLabel =
    model.difficulty === "easy"
      ? t("model.easy")
      : model.difficulty === "medium"
        ? t("model.medium")
        : t("model.hard");

  return (
    <article className="model-card group overflow-hidden rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)] transition hover:border-[rgba(47,140,255,0.45)] hover:shadow-[0_12px_40px_rgba(47,140,255,0.12)]">
      <div className="model-card-media">
        <Image
          src={model.thumbnail}
          alt={model.title}
          width={640}
          height={400}
          className="h-full w-full object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent opacity-80" />
        <div className="absolute start-3 top-3 flex gap-2">
          <span
            className={cn(
              "rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide",
              model.isFree
                ? "bg-emerald-500/90 text-white"
                : "bg-[image:var(--gradient-fire)] text-white"
            )}
          >
            {model.isFree
              ? t("model.free")
              : model.price
                ? formatPrice(model.price, model.currency || "USD", locale)
                : t("model.paid")}
          </span>
          {model.hasVideo && (
            <span className="inline-flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[10px] text-white">
              <PlayCircle size={12} />
              {t("model.hasVideo")}
            </span>
          )}
        </div>
        <span className="absolute bottom-3 end-3 rounded-md bg-black/55 px-2 py-1 text-[10px] text-[var(--text-muted)]">
          {model.source.name}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="font-display text-base font-semibold text-white">
            {model.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-[var(--text-muted)]">
            {model.description}
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[rgba(8,14,28,0.65)] p-2.5">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-cyan)]">
            {t("model.aiEnhanced")}
          </p>
          <p className="line-clamp-2 text-xs leading-relaxed text-[var(--text-muted)]">
            {model.aiDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1">
            <Heart size={12} className="text-[var(--accent-red)]" />
            {formatNumber(model.likes, locale)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Download size={12} />
            {formatNumber(model.downloads, locale)}
          </span>
          <span>
            {t("model.difficulty")}: {difficultyLabel}
          </span>
        </div>

        <div className="flex gap-2">
          <a
            href={model.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs"
          >
            <ExternalLink size={14} />
            {t("model.download")}
          </a>
          <button
            type="button"
            onClick={() => toggle(model.id)}
            className={cn(
              "inline-flex items-center justify-center rounded-xl border px-3 py-2.5 text-xs transition",
              selected
                ? "border-[var(--accent-orange)] bg-orange-500/15 text-[var(--accent-orange)]"
                : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent-blue)] hover:text-white"
            )}
            title={t("compare.add")}
          >
            <GitCompare size={14} />
          </button>
        </div>
        {!model.isFree && (
          <p className="text-[10px] text-[var(--text-muted)]">
            {t("search.redirectNote")}
          </p>
        )}
        <Link
          href="/compare"
          className="block text-center text-[10px] text-[var(--accent-blue)] hover:underline"
        >
          {t("nav.compare")}
        </Link>
      </div>
    </article>
  );
}