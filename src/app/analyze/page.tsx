"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { analyzeModel } from "@/lib/analyze";
import type { AnalysisResult } from "@/lib/types";
import {
  ArrowIcon,
  BoltIcon,
  ClockIcon,
  FilamentIcon,
  LinkIcon,
  PaletteIcon,
  ScaleIcon,
  SlidersIcon,
  SparkIcon,
  UploadIcon,
  CheckIcon,
} from "@/components/Icons";

type Stage = "idle" | "analyzing" | "done";

export default function AnalyzePage() {
  const { t } = useLanguage();
  const { plan, remaining, consume } = useSubscription();

  const [stage, setStage] = useState<Stage>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | undefined>(undefined);
  const [link, setLink] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const analysesLeft = remaining("modelAnalyses");
  const isUnlimited = analysesLeft === Infinity;
  const exhausted = analysesLeft <= 0;

  const runAnalysis = useCallback(
    (source: string, size?: number) => {
      if (!consume("modelAnalyses")) return;
      setStage("analyzing");
      setResult(null);
      window.setTimeout(() => {
        setResult(analyzeModel(source, size));
        setStage("done");
      }, 1600);
    },
    [consume],
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;
      setFileName(file.name);
      setFileSize(file.size);
      setLink("");
      runAnalysis(file.name, file.size);
    },
    [runAnalysis],
  );

  const reset = () => {
    setStage("idle");
    setResult(null);
    setFileName(null);
    setFileSize(undefined);
    setLink("");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue/30 bg-blue/10 px-3 py-1.5 text-xs font-medium text-blue-bright">
          <SparkIcon className="h-4 w-4" />
          {t.analyze.demoNote}
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
          {t.analyze.title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-ink-soft">
          {t.analyze.subtitle}
        </p>
      </div>

      {/* Quota bar */}
      <QuotaBar
        label={t.analyze.quotaTitle}
        remainingLabel={t.analyze.quotaRemaining}
        remaining={analysesLeft}
        isUnlimited={isUnlimited}
        plan={plan}
        upgradeText={t.analyze.quotaUpgrade}
      />

      {stage === "done" && result ? (
        <ResultView result={result} onReset={reset} />
      ) : (
        <div className="mt-8">
          {/* Upload zone */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => !exhausted && inputRef.current?.click()}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !exhausted) {
                inputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              if (!exhausted) setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              if (!exhausted) handleFiles(e.dataTransfer.files);
            }}
            className={`glass relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-16 text-center transition-all ${
              exhausted
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:border-blue/60"
            } ${dragging ? "border-blue bg-blue/5" : "border-border"}`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".stl,.step,.stp,.f3d"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            {stage === "analyzing" ? (
              <Analyzing text={t.analyze.analyzing} fileName={fileName} />
            ) : (
              <>
                <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue to-red text-white shadow-glow-blue">
                  <UploadIcon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold">
                  {t.analyze.uploadTitle}
                </h3>
                <p className="mt-1.5 text-sm text-ink-soft">
                  {t.analyze.dropHere}
                </p>
                <span className="btn-primary mt-5 rounded-lg px-5 py-2.5 text-sm font-semibold">
                  {t.analyze.browse}
                </span>
                <p className="mt-4 text-xs text-ink-dim">
                  {t.analyze.formatsNote}
                </p>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4 text-xs uppercase tracking-wider text-ink-dim">
            <span className="h-px flex-1 bg-border" />
            {t.analyze.orDivider}
            <span className="h-px flex-1 bg-border" />
          </div>

          {/* Link input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (link.trim() && !exhausted && stage !== "analyzing") {
                setFileName(null);
                runAnalysis(link.trim());
              }
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <LinkIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-dim" />
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                disabled={exhausted || stage === "analyzing"}
                placeholder={t.analyze.linkPlaceholder}
                className="w-full rounded-xl border border-border bg-surface/70 py-3.5 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-dim focus:border-blue/60 disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={!link.trim() || exhausted || stage === "analyzing"}
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t.analyze.linkAnalyze}
              <ArrowIcon className="h-4 w-4" />
            </button>
          </form>

          {exhausted && (
            <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-xl border border-orange/40 bg-orange/10 px-5 py-4 text-sm sm:flex-row">
              <p className="text-orange-bright">{t.analyze.quotaExhausted}</p>
              <Link
                href="/pricing"
                className="btn-fire inline-flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold"
              >
                {t.analyze.quotaUpgrade}
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function QuotaBar({
  label,
  remainingLabel,
  remaining,
  isUnlimited,
  plan,
  upgradeText,
}: {
  label: string;
  remainingLabel: string;
  remaining: number;
  isUnlimited: boolean;
  plan: string;
  upgradeText: string;
}) {
  return (
    <div className="glass mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue/15 text-blue-bright">
          <BoltIcon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-ink-dim">
            {label}
          </p>
          <p className="text-sm font-semibold">
            {isUnlimited ? (
              <span className="text-gradient-fire">∞ Premium</span>
            ) : (
              <>
                <span
                  className={
                    remaining <= 0 ? "text-red" : "text-ink"
                  }
                >
                  {remaining}
                </span>{" "}
                <span className="text-ink-soft">{remainingLabel}</span>
              </>
            )}
          </p>
        </div>
      </div>
      {!isUnlimited && (
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 rounded-lg border border-orange/40 bg-orange/10 px-3.5 py-2 text-xs font-semibold text-orange-bright transition-colors hover:bg-orange/20"
        >
          {upgradeText}
        </Link>
      )}
      {isUnlimited && (
        <span className="rounded-lg border border-orange/40 bg-orange/10 px-3 py-1.5 text-xs font-semibold uppercase text-orange-bright">
          {plan}
        </span>
      )}
    </div>
  );
}

function Analyzing({
  text,
  fileName,
}: {
  text: string;
  fileName: string | null;
}) {
  return (
    <div className="flex flex-col items-center py-2">
      <div className="relative grid h-20 w-20 place-items-center">
        <span className="absolute inset-0 rounded-full border-2 border-blue/20" />
        <span
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue"
          style={{ animation: "spin-slow 1s linear infinite" }}
        />
        <SparkIcon className="h-8 w-8 animate-pulse text-blue-bright" />
      </div>
      <p className="mt-5 text-sm font-medium text-ink">{text}</p>
      {fileName && (
        <p className="mt-1 max-w-xs truncate text-xs text-ink-dim">{fileName}</p>
      )}
      <div className="mt-4 h-1.5 w-56 overflow-hidden rounded-full bg-surface-2">
        <div className="skeleton h-full w-full rounded-full" />
      </div>
    </div>
  );
}

function ResultView({
  result,
  onReset,
}: {
  result: AnalysisResult;
  onReset: () => void;
}) {
  const { t } = useLanguage();
  const r = t.analyze.r;

  return (
    <div className="animate-fade-up mt-8">
      {/* Report header */}
      <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue to-red text-white">
            <CheckIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-dim">
              {t.analyze.resultTitle}
            </p>
            <p className="max-w-[16rem] truncate text-sm font-semibold sm:max-w-md">
              {result.fileName}
            </p>
          </div>
          <span className="rounded-md border border-blue/40 bg-blue/10 px-2 py-0.5 text-xs font-semibold text-blue-bright">
            {result.format}
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-blue/50 hover:text-ink"
        >
          {t.analyze.reset}
        </button>
      </div>

      {/* Key metrics */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={<FilamentIcon className="h-5 w-5" />}
          accent="blue"
          label={r.filamentWeight}
          value={`${result.filamentGrams} ${r.grams}`}
        />
        <MetricCard
          icon={<ClockIcon className="h-5 w-5" />}
          accent="orange"
          label={r.printTime}
          value={`${result.printTimeHours} ${r.hours}`}
        />
        <MetricCard
          icon={<ScaleIcon className="h-5 w-5" />}
          accent="cyan"
          label={r.dimensions}
          value={`${result.dimensions.x}×${result.dimensions.y}×${result.dimensions.z} mm`}
          small
        />
        <MetricCard
          icon={<BoltIcon className="h-5 w-5" />}
          accent="red"
          label={r.complexity}
          value={`${result.complexity}%`}
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* Filament */}
        <Panel title={r.filamentType} icon={<FilamentIcon className="h-5 w-5" />}>
          <p className="text-2xl font-bold text-gradient-blue">
            {result.filamentType}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {result.filamentReason}
          </p>
        </Panel>

        {/* Suitability */}
        <Panel title={r.suitability} icon={<CheckIcon className="h-5 w-5" />}>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-gradient-fire">
              {result.suitability}%
            </span>
            <span className="text-sm font-medium text-ink-soft">
              {result.suitabilityLabel}
            </span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue via-orange to-red"
              style={{ width: `${result.suitability}%` }}
            />
          </div>
        </Panel>

        {/* Appearance */}
        <Panel title={r.appearance} icon={<SparkIcon className="h-5 w-5" />}>
          <p className="text-sm leading-relaxed text-ink-soft">
            {result.appearance}
          </p>
        </Panel>

        {/* Colors */}
        <Panel title={r.colorSuggestion} icon={<PaletteIcon className="h-5 w-5" />}>
          <div className="flex flex-wrap gap-3">
            {result.colorSuggestion.map((c) => (
              <div key={c.hex} className="flex items-center gap-2">
                <span
                  className="h-9 w-9 rounded-lg border border-white/10 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="text-xs">
                  <p className="font-medium text-ink">{c.name}</p>
                  <p className="text-ink-dim">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Print settings */}
      <Panel
        className="mt-5"
        title={r.printSettings}
        icon={<SlidersIcon className="h-5 w-5" />}
      >
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Setting label={r.layerHeight} value={result.printSettings.layerHeight} />
          <Setting label={r.infill} value={result.printSettings.infill} />
          <Setting label={r.supports} value={result.printSettings.supports} />
          <Setting label={r.nozzleTemp} value={result.printSettings.nozzleTemp} />
          <Setting label={r.bedTemp} value={result.printSettings.bedTemp} />
          <Setting label={r.speed} value={result.printSettings.speed} />
        </dl>
      </Panel>

      {/* Improvements */}
      <Panel
        className="mt-5"
        title={r.improvements}
        icon={<BoltIcon className="h-5 w-5" />}
      >
        <ul className="space-y-3">
          {result.improvements.map((tip) => (
            <li key={tip} className="flex gap-3 text-sm text-ink-soft">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange/15 text-orange-bright">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

const ACCENTS: Record<string, string> = {
  blue: "bg-blue/15 text-blue-bright",
  orange: "bg-orange/15 text-orange-bright",
  red: "bg-red/15 text-red",
  cyan: "bg-cyan/15 text-cyan",
};

function MetricCard({
  icon,
  label,
  value,
  accent,
  small,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
  small?: boolean;
}) {
  return (
    <div className="glass card-hover rounded-2xl p-5">
      <div
        className={`grid h-10 w-10 place-items-center rounded-xl ${ACCENTS[accent]}`}
      >
        {icon}
      </div>
      <p className="mt-3 text-xs uppercase tracking-wide text-ink-dim">
        {label}
      </p>
      <p className={`mt-1 font-bold ${small ? "text-base" : "text-xl"}`}>
        {value}
      </p>
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`glass rounded-2xl p-6 ${className}`}>
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ink-soft">
        <span className="text-blue-bright">{icon}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface/50 p-3">
      <dt className="text-xs text-ink-dim">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}
