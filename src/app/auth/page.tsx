"use client";

import Link from "next/link";
import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { ADMIN_EMAIL } from "@/lib/data";

function AuthInner() {
  const { t } = useLanguage();
  const { login, register, user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const initialMode = params.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const title = useMemo(
    () => (mode === "login" ? t("auth.loginTitle") : t("auth.registerTitle")),
    [mode, t]
  );

  useEffect(() => {
    if (user) {
      router.replace(user.role === "admin" ? "/admin" : "/");
    }
  }, [user, router]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const result =
      mode === "login"
        ? login(email.trim(), password)
        : register(name.trim(), email.trim(), password);
    if (!result.ok) {
      setError(t(result.error || "auth.error"));
      return;
    }
    router.push("/");
  };

  return (
    <div className="flex justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[rgba(15,26,48,0.8)] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-brand)] font-display text-lg font-black text-[#041018]">
            M
          </div>
          <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Admin demo: {ADMIN_EMAIL} / admin123
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "register" && (
            <label className="block text-sm">
              <span className="text-[var(--text-muted)]">{t("auth.name")}</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5 text-white"
              />
            </label>
          )}
          <label className="block text-sm">
            <span className="text-[var(--text-muted)]">{t("auth.email")}</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5 text-white"
            />
          </label>
          <label className="block text-sm">
            <span className="text-[var(--text-muted)]">{t("auth.password")}</span>
            <input
              required
              type="password"
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5 text-white"
            />
          </label>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary w-full rounded-xl py-3 text-sm">
            {mode === "login" ? t("auth.login") : t("auth.register")}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--text-muted)]">
          {mode === "login" ? t("auth.noAccount") : t("auth.hasAccount")}{" "}
          <button
            type="button"
            className="text-[var(--accent-cyan)] hover:underline"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError(null);
            }}
          >
            {mode === "login" ? t("nav.register") : t("nav.login")}
          </button>
        </p>
        <p className="mt-3 text-center">
          <Link href="/" className="text-xs text-[var(--text-muted)] hover:underline">
            {t("common.back")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  const { t } = useLanguage();
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-[var(--text-muted)]">
          {t("common.loading")}
        </div>
      }
    >
      <AuthInner />
    </Suspense>
  );
}