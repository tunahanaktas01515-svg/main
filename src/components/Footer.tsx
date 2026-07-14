"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            {t.footer.tagline}
          </p>
          <div className="mt-5 flex gap-2">
            <span className="h-2 w-8 rounded-full bg-blue" />
            <span className="h-2 w-8 rounded-full bg-orange" />
            <span className="h-2 w-8 rounded-full bg-red" />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">{t.footer.product}</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            <li>
              <Link href="/analyze" className="transition-colors hover:text-ink">
                {t.nav.analyze}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="transition-colors hover:text-ink">
                {t.nav.pricing}
              </Link>
            </li>
            <li>
              <Link href="/#features" className="transition-colors hover:text-ink">
                {t.nav.features}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-ink">{t.footer.company}</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="transition-colors hover:text-ink">
                {t.common.premium}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-ink-dim sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {t.meta.name}. {t.footer.rights}
          </p>
          <p>{t.footer.demo}</p>
        </div>
      </div>
    </footer>
  );
}
