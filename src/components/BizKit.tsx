import type { ReactNode } from 'react';
import { useLang } from '../i18n';

export function BizPage({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="page biz">
      <header className="page__head biz__head">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {actions && <div className="biz__actions">{actions}</div>}
      </header>
      {children}
    </div>
  );
}

export function StatStrip({
  items,
}: {
  items: { label: string; value: string; hint?: string; tone?: 'up' | 'down' | 'neutral' | 'warn' }[];
}) {
  return (
    <div className="biz-stats">
      {items.map((it) => (
        <div key={it.label} className={`glass-card biz-stat ${it.tone ? `is-${it.tone}` : ''}`}>
          <span className="biz-stat__label">{it.label}</span>
          <strong className="biz-stat__value">{it.value}</strong>
          {it.hint && <span className="biz-stat__hint">{it.hint}</span>}
        </div>
      ))}
    </div>
  );
}

export function GlassPanel({
  title,
  right,
  children,
  className = '',
}: {
  title: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`glass-card biz-panel ${className}`}>
      <div className="biz-panel__head">
        <h3>{title}</h3>
        {right}
      </div>
      {children}
    </section>
  );
}

export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: (string | ReactNode)[][];
}) {
  return (
    <div className="biz-table-wrap">
      <table className="biz-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'up' | 'down' | 'warn' | 'neutral' | 'info' }) {
  return <span className={`biz-pill is-${tone}`}>{children}</span>;
}

export function PrimaryBtn({ children }: { children: ReactNode }) {
  return <button type="button" className="biz-btn biz-btn--primary">{children}</button>;
}

export function GhostBtn({ children }: { children: ReactNode }) {
  return <button type="button" className="biz-btn">{children}</button>;
}

export function useT() {
  const { lang } = useLang();
  return (tr: string, en: string) => (lang === 'tr' ? tr : en);
}

export function money(n: number, currency = '₺') {
  return `${currency}${n.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}`;
}

export function BarList({ items }: { items: { label: string; value: number; max?: number }[] }) {
  const max = Math.max(...items.map((i) => i.max ?? i.value), 1);
  return (
    <div className="biz-bars">
      {items.map((it) => (
        <div key={it.label} className="biz-bar-row">
          <span>{it.label}</span>
          <div className="biz-bar-track"><i style={{ width: `${(it.value / max) * 100}%` }} /></div>
          <b>{it.value > 999 ? money(it.value) : String(it.value)}</b>
        </div>
      ))}
    </div>
  );
}
