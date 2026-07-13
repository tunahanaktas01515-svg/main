"use client";

import { LOCALES } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/lib/types";

export function LanguageSelector() {
  const { locale, setLocale } = useLanguage();

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="appearance-none rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] py-2 pe-7 ps-2.5 text-xs text-white sm:text-sm"
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.native}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute end-2 text-[10px] text-[var(--text-muted)]">
        ▾
      </span>
    </label>
  );
}