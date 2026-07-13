"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getDirection, t as translate } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const LANG_KEY = "makerai_locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener("makerai-locale", cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener("makerai-locale", cb);
  };
}

function getSnapshot(): Locale {
  return (localStorage.getItem(LANG_KEY) as Locale) || "tr";
}

function getServerSnapshot(): Locale {
  return "tr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(LANG_KEY, next);
    document.documentElement.lang = next;
    document.documentElement.dir = getDirection(next);
    window.dispatchEvent(new Event("makerai-locale"));
  }, []);

  const t = useCallback((key: string) => translate(locale, key), [locale]);
  const dir = getDirection(locale);

  if (typeof document !== "undefined") {
    if (document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
    if (document.documentElement.dir !== dir) {
      document.documentElement.dir = dir;
    }
  }

  const value = useMemo(
    () => ({ locale, setLocale, t, dir }),
    [locale, setLocale, t, dir]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}