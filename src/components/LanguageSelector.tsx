"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LOCALES, LOCALE_META } from "@/lib/i18n";
import { ChevronIcon, GlobeIcon } from "./Icons";

export function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-surface/70 px-2.5 py-1.5 text-sm text-ink-soft transition-colors hover:border-blue/50 hover:text-ink"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <GlobeIcon className="h-4 w-4" />
        <span className="hidden sm:inline">{LOCALE_META[locale].flag}</span>
        <span className="uppercase">{locale}</span>
        <ChevronIcon
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          className="glass animate-fade-up absolute right-0 z-50 mt-2 max-h-80 w-48 overflow-auto rounded-xl p-1.5 shadow-2xl"
          role="listbox"
        >
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                  code === locale
                    ? "bg-blue/15 text-ink"
                    : "text-ink-soft hover:bg-surface-2 hover:text-ink"
                }`}
                role="option"
                aria-selected={code === locale}
              >
                <span className="text-base">{LOCALE_META[code].flag}</span>
                <span>{LOCALE_META[code].label}</span>
                {code === locale && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
