"use client";

import { useLanguage } from "@/context/LanguageContext";

const gradients = [
  "linear-gradient(145deg, #2f8cff, #123a7a)",
  "linear-gradient(145deg, #ff7a1a, #a33a00)",
  "linear-gradient(145deg, #ff3b4e, #7a1020)",
  "linear-gradient(145deg, #22d3ee, #0e7490)",
  "linear-gradient(145deg, #6366f1, #1e1b4b)",
  "linear-gradient(145deg, #f59e0b, #7c2d12)",
];

export function SideBanner() {
  const { t } = useLanguage();
  const items = [
    t("banner.1"),
    t("banner.2"),
    t("banner.3"),
    t("banner.4"),
    t("banner.5"),
    t("banner.6"),
  ];
  const loop = [...items, ...items];

  return (
    <aside className="relative hidden w-[200px] shrink-0 overflow-hidden border-e border-[var(--border)] bg-[rgba(8,12,24,0.85)] xl:block">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[var(--bg-deep)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[var(--bg-deep)] to-transparent" />
      <div className="animate-banner px-3 py-4">
        {loop.map((label, i) => (
          <div
            key={`${label}-${i}`}
            className="side-banner-item"
            style={{ background: gradients[i % gradients.length] }}
          >
            <span className="font-display text-sm leading-snug">{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}