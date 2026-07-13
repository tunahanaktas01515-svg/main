"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Check,
  LayoutDashboard,
  Settings,
  ShieldAlert,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { DEFAULT_STATS, PENDING_CONTENT } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import type { User } from "@/lib/types";

type Tab = "dashboard" | "users" | "content" | "reports" | "site";

export default function AdminPage() {
  const { t, locale } = useLanguage();
  const { user, users, ready, updateUser } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [pending, setPending] = useState(PENDING_CONTENT);
  const [maintenance, setMaintenance] = useState(false);
  const [bannerText, setBannerText] = useState("MakerAI Hub — AI STL Analysis");
  const [saved, setSaved] = useState(false);

  const stats = useMemo(() => {
    const premiumUsers = users.filter((u) => u.plan === "premium").length;
    return {
      ...DEFAULT_STATS,
      totalUsers: users.length,
      premiumUsers,
    };
  }, [users]);

  if (!ready) {
    return (
      <div className="p-10 text-center text-[var(--text-muted)]">
        {t("common.loading")}
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <ShieldAlert className="mb-4 text-[var(--accent-red)]" size={48} />
        <h1 className="font-display text-2xl font-bold text-white">
          {t("admin.title")}
        </h1>
        <p className="mt-3 text-[var(--text-muted)]">{t("admin.accessDenied")}</p>
        <Link href="/" className="btn-primary mt-6 rounded-xl px-5 py-3 text-sm">
          {t("common.back")}
        </Link>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
    { id: "dashboard", label: t("admin.dashboard"), icon: LayoutDashboard },
    { id: "users", label: t("admin.users"), icon: Users },
    { id: "content", label: t("admin.content"), icon: Check },
    { id: "reports", label: t("admin.reports"), icon: BarChart3 },
    { id: "site", label: t("admin.site"), icon: Settings },
  ];

  const cards = [
    { label: t("admin.visitorsToday"), value: stats.visitorsToday },
    { label: t("admin.visitorsWeek"), value: stats.visitorsWeek },
    { label: t("admin.totalUsers"), value: stats.totalUsers },
    { label: t("admin.analyses"), value: stats.totalAnalyses },
    { label: t("admin.searches"), value: stats.totalSearches },
    { label: t("admin.premiumUsers"), value: stats.premiumUsers },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white">
            {t("admin.title")}
          </h1>
          <p className="mt-1 text-[var(--text-muted)]">{t("admin.subtitle")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="h-fit rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.75)] p-3">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`mb-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  tab === id
                    ? "bg-[rgba(47,140,255,0.18)] text-white"
                    : "text-[var(--text-muted)] hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </aside>

          <section className="min-w-0">
            {(tab === "dashboard" || tab === "reports") && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {cards.map((c) => (
                  <div
                    key={c.label}
                    className="rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)] p-5"
                  >
                    <p className="text-xs text-[var(--text-muted)]">{c.label}</p>
                    <p className="mt-2 font-display text-3xl font-bold text-white">
                      {formatNumber(c.value, locale)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {tab === "users" && (
              <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)]">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-[var(--border)] text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    <tr>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">{t("admin.role")}</th>
                      <th className="px-4 py-3">{t("admin.plan")}</th>
                      <th className="px-4 py-3">{t("admin.credits")}</th>
                      <th className="px-4 py-3">{t("admin.status")}</th>
                      <th className="px-4 py-3">{t("admin.actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u: User) => (
                      <tr key={u.id} className="border-b border-[var(--border)]/60">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{u.name}</div>
                          <div className="text-xs text-[var(--text-muted)]">
                            {u.email}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-md px-2 py-1 text-xs ${
                              u.role === "admin"
                                ? "bg-orange-500/20 text-[var(--accent-orange)]"
                                : "bg-white/10 text-[var(--text-muted)]"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 capitalize">{u.plan}</td>
                        <td className="px-4 py-3 text-[var(--accent-cyan)]">
                          {u.aiCredits}
                        </td>
                        <td className="px-4 py-3 capitalize">{u.status}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            {u.role !== "admin" && (
                              <button
                                type="button"
                                className="rounded-lg border border-[var(--border)] px-2 py-1 text-xs hover:border-[var(--accent-orange)]"
                                onClick={() =>
                                  updateUser(u.id, { role: "admin" })
                                }
                              >
                                {t("admin.makeAdmin")}
                              </button>
                            )}
                            {u.status === "active" ? (
                              <button
                                type="button"
                                className="rounded-lg border border-red-500/30 px-2 py-1 text-xs text-red-300"
                                onClick={() =>
                                  updateUser(u.id, { status: "banned" })
                                }
                              >
                                {t("admin.ban")}
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="rounded-lg border border-emerald-500/30 px-2 py-1 text-xs text-emerald-300"
                                onClick={() =>
                                  updateUser(u.id, { status: "active" })
                                }
                              >
                                {t("admin.activate")}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "content" && (
              <div className="space-y-3">
                <h2 className="font-display text-lg font-semibold text-white">
                  {t("admin.pendingContent")}
                </h2>
                {pending.length === 0 ? (
                  <p className="text-[var(--text-muted)]">—</p>
                ) : (
                  pending.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)] p-4"
                    >
                      <div>
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {item.author} · {item.submittedAt}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/20 px-3 py-2 text-xs text-emerald-300"
                          onClick={() =>
                            setPending((p) => p.filter((x) => x.id !== item.id))
                          }
                        >
                          <Check size={14} />
                          {t("admin.approve")}
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg bg-red-500/20 px-3 py-2 text-xs text-red-300"
                          onClick={() =>
                            setPending((p) => p.filter((x) => x.id !== item.id))
                          }
                        >
                          <X size={14} />
                          {t("admin.reject")}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === "site" && (
              <div className="max-w-xl space-y-5 rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)] p-6">
                <h2 className="font-display text-lg font-semibold text-white">
                  {t("admin.siteSettings")}
                </h2>
                <label className="flex items-center justify-between gap-4 text-sm">
                  <span>{t("admin.maintenance")}</span>
                  <input
                    type="checkbox"
                    checked={maintenance}
                    onChange={(e) => setMaintenance(e.target.checked)}
                    className="h-4 w-4 accent-[var(--accent-blue)]"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-[var(--text-muted)]">
                    {t("admin.featuredBanner")}
                  </span>
                  <input
                    value={bannerText}
                    onChange={(e) => setBannerText(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5 text-white"
                  />
                </label>
                <button
                  type="button"
                  className="btn-primary rounded-xl px-5 py-2.5 text-sm"
                  onClick={() => {
                    setSaved(true);
                    setTimeout(() => setSaved(false), 1500);
                  }}
                >
                  {t("admin.save")}
                </button>
                {saved && (
                  <p className="text-sm text-emerald-300">✓</p>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}