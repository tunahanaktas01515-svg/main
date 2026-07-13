"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  FileBox,
  Loader2,
  Sparkles,
  Upload,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import type { AnalysisResult } from "@/lib/types";
import { formatNumber, simulateAnalysis } from "@/lib/utils";

const ACCEPTED = [".stl", ".step", ".stp", ".f3d"];

export default function AnalyzePage() {
  const { t, locale } = useLanguage();
  const { user, consumeCredit } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const acceptAttr = useMemo(() => ACCEPTED.join(","), []);

  const validate = (f: File) => {
    const lower = f.name.toLowerCase();
    return ACCEPTED.some((ext) => lower.endsWith(ext));
  };

  const runAnalysis = async (f: File) => {
    setError(null);
    if (!user) {
      setError(t("analyze.loginRequired"));
      return;
    }
    if (user.aiCredits <= 0) {
      setError(t("analyze.noCredits"));
      return;
    }
    if (!validate(f)) {
      setError(t("analyze.formats"));
      return;
    }
    setFile(f);
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 1600));
    const ok = consumeCredit();
    if (!ok) {
      setError(t("analyze.noCredits"));
      setLoading(false);
      return;
    }
    setResult(simulateAnalysis(f.name, f.size, locale));
    setLoading(false);
  };

  const onFile = (f: File | undefined | null) => {
    if (f) void runAnalysis(f);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {t("analyze.title")}
          </h1>
          <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
            {t("analyze.subtitle")}
          </p>
          <p className="mt-2 text-xs text-[var(--accent-cyan)]">
            {t("analyze.credits")}
            {user ? ` · ${t("nav.credits")}: ${user.aiCredits}` : ""}
          </p>
        </div>

        {!result && (
          <form
            onSubmit={onSubmit}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              onFile(e.dataTransfer.files?.[0]);
            }}
            className={`relative overflow-hidden rounded-3xl border-2 border-dashed p-10 text-center transition ${
              dragging
                ? "border-[var(--accent-cyan)] bg-cyan-500/10"
                : "border-[var(--border)] bg-[rgba(15,26,48,0.65)]"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,140,255,0.15),transparent_55%)]" />
            <div className="relative">
              <div className="mx-auto mb-4 inline-flex rounded-2xl bg-[image:var(--gradient-brand)] p-4 text-[#041018] animate-float">
                {loading ? <Loader2 className="animate-spin" size={28} /> : <Upload size={28} />}
              </div>
              <p className="font-display text-lg font-semibold text-white">
                {loading ? t("analyze.analyzing") : t("analyze.drop")}
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {t("analyze.formats")}
              </p>
              {file && !loading && (
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--accent-cyan)]">
                  <FileBox size={16} />
                  {file.name}
                </p>
              )}
              <input
                ref={inputRef}
                type="file"
                accept={acceptAttr}
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0])}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary mt-6 rounded-xl px-6 py-3 text-sm disabled:opacity-60"
              >
                {t("analyze.upload")}
              </button>
              {!user && (
                <p className="mt-4 text-sm text-[var(--accent-orange)]">
                  <Link href="/auth?mode=login" className="underline">
                    {t("analyze.loginRequired")}
                  </Link>
                </p>
              )}
            </div>
          </form>
        )}

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <div>
              {error}
              {error === t("analyze.noCredits") && (
                <div className="mt-2">
                  <Link href="/pricing" className="underline text-[var(--accent-orange)]">
                    {t("nav.pricing")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[var(--accent-cyan)]">
                <CheckCircle2 size={18} />
                <span className="font-display text-lg font-semibold text-white">
                  {result.fileName}
                </span>
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs">
                  {result.fileType}
                </span>
              </div>
              <button
                type="button"
                className="btn-secondary rounded-xl px-4 py-2 text-sm"
                onClick={() => {
                  setResult(null);
                  setFile(null);
                }}
              >
                {t("analyze.new")}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: t("analyze.dimensions"),
                  value: `${result.dimensions.x} × ${result.dimensions.y} × ${result.dimensions.z} ${result.dimensions.unit}`,
                },
                {
                  label: t("analyze.volume"),
                  value: `${result.volumeCm3} cm³`,
                },
                {
                  label: t("analyze.weight"),
                  value: `${formatNumber(result.estimatedWeightG, locale)} g`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)] p-4"
                >
                  <p className="text-xs text-[var(--text-muted)]">{item.label}</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)] p-5">
                <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-[var(--accent-orange)]">
                  <AlertTriangle size={16} />
                  {t("analyze.weakPoints")}
                </h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  {result.weakPoints.map((w) => (
                    <li key={w} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-red)]" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)] p-5">
                <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-[var(--accent-cyan)]">
                  <Sparkles size={16} />
                  {t("analyze.improvements")}
                </h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  {result.improvements.map((w) => (
                    <li key={w} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-blue)]" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)] p-5">
                <h3 className="mb-3 font-display text-base font-semibold text-white">
                  {t("analyze.printerSettings")}
                </h3>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  {Object.entries(result.printerSettings).map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-black/25 p-3">
                      <dt className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        {k}
                      </dt>
                      <dd className="mt-1 text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[rgba(15,26,48,0.7)] p-5">
                <h3 className="mb-3 font-display text-base font-semibold text-white">
                  {t("analyze.filamentCost")}
                </h3>
                <div className="rounded-2xl bg-[image:var(--gradient-brand)] p-[1px]">
                  <div className="rounded-2xl bg-[var(--bg-panel)] p-5">
                    <p className="text-sm text-[var(--text-muted)]">
                      {result.filamentCost.material} ·{" "}
                      {formatNumber(result.filamentCost.grams, locale)} g
                    </p>
                    <p className="mt-2 font-display text-3xl font-bold text-white">
                      ₺{result.filamentCost.costTry.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 rounded-xl border border-[var(--border)] bg-black/20 p-4">
                  <p className="mb-1 text-xs uppercase tracking-wider text-[var(--accent-cyan)]">
                    {t("analyze.summary")}
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                    {result.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}