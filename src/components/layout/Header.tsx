"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  Boxes,
  GitCompare,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", key: "nav.home", icon: Sparkles },
  { href: "/search", key: "nav.search", icon: Search },
  { href: "/analyze", key: "nav.analyze", icon: Upload },
  { href: "/compare", key: "nav.compare", icon: GitCompare },
  { href: "/ai-chat", key: "nav.aiChat", icon: Bot },
  { href: "/pricing", key: "nav.pricing", icon: Boxes },
];

export function Header() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(5,7,15,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-[var(--border)] p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)] text-sm font-black text-[#041018] shadow-[0_0_24px_rgba(47,140,255,0.35)]">
              M
            </span>
            <span>
              <span className="font-display block text-sm font-bold tracking-wider text-white group-hover:text-[var(--accent-cyan)] sm:text-base">
                {t("brand.name")}
              </span>
              <span className="hidden text-[10px] text-[var(--text-muted)] sm:block">
                {t("brand.tagline")}
              </span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(({ href, key, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-[var(--text-muted)] transition hover:bg-white/5 hover:text-white",
                pathname === href && "bg-white/8 text-white"
              )}
            >
              <Icon size={15} />
              {t(key)}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-[var(--accent-orange)] transition hover:bg-orange-500/10",
                pathname.startsWith("/admin") && "bg-orange-500/15"
              )}
            >
              <LayoutDashboard size={15} />
              {t("nav.admin")}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector />
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden rounded-lg border border-[var(--border)] bg-[var(--bg-panel)] px-2.5 py-1.5 text-xs sm:block">
                <span className="text-[var(--text-muted)]">{t("nav.credits")}: </span>
                <span className="font-semibold text-[var(--accent-cyan)]">
                  {user.aiCredits}
                </span>
              </div>
              <span className="hidden max-w-[120px] truncate text-sm text-white md:inline">
                {user.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="btn-secondary inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">{t("nav.logout")}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth?mode=login"
                className="btn-secondary rounded-lg px-3 py-2 text-xs sm:text-sm"
              >
                {t("nav.login")}
              </Link>
              <Link
                href="/auth?mode=register"
                className="btn-primary rounded-lg px-3 py-2 text-xs sm:text-sm"
              >
                {t("nav.register")}
              </Link>
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-deep)] px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map(({ href, key, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--text-muted)] hover:bg-white/5 hover:text-white"
              >
                <Icon size={16} />
                {t(key)}
              </Link>
            ))}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--accent-orange)]"
              >
                <LayoutDashboard size={16} />
                {t("nav.admin")}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}