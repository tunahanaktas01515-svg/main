"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";
import { ArrowIcon, StarIcon, XIcon } from "./Icons";

export function Header() {
  const { t } = useLanguage();
  const { plan } = useSubscription();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/analyze", label: t.nav.analyze },
    { href: "/pricing", label: t.nav.pricing },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "glass border-b" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-ink"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-blue to-orange" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          {plan === "premium" && (
            <span className="hidden items-center gap-1 rounded-full border border-orange/40 bg-orange/10 px-2.5 py-1 text-xs font-semibold text-orange-bright sm:inline-flex">
              <StarIcon className="h-3.5 w-3.5" />
              {t.common.premium}
            </span>
          )}
          <LanguageSelector />
          <Link
            href="/pricing"
            className="btn-primary hidden items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold sm:inline-flex"
          >
            {t.nav.getStarted}
            <ArrowIcon className="h-4 w-4" />
          </Link>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink-soft md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <span className="flex flex-col gap-1">
                <span className="h-0.5 w-5 bg-current" />
                <span className="h-0.5 w-5 bg-current" />
                <span className="h-0.5 w-5 bg-current" />
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="glass animate-fade-up border-t md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-blue/15 text-ink"
                    : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/pricing"
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-1 rounded-lg px-3 py-2.5 text-center text-sm font-semibold"
            >
              {t.nav.getStarted}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
