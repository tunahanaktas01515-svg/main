import { motion } from 'framer-motion';
import { AlertTriangle, BellRing, Info, ShieldAlert } from 'lucide-react';
import { alerts } from '../../data/market';
import { cn } from '../../lib/cn';

const severityStyles = {
  critical: { icon: ShieldAlert, color: 'text-red-300', ring: 'bg-red-500/12 border-red-400/25' },
  warning: { icon: AlertTriangle, color: 'text-amber-300', ring: 'bg-amber-500/12 border-amber-400/25' },
  info: { icon: Info, color: 'text-indigo-300', ring: 'bg-indigo-500/12 border-indigo-400/25' },
};

/**
 * "Son Uyarılar" akışı — analiz motorunun ürettiği risk ve bilgi bildirimleri.
 */
export function AlertsPanel({ className }: { className?: string }) {
  return (
    <section className={cn('glass rounded-3xl p-4', className)}>
      <header className="mb-3 flex items-center gap-2 px-1">
        <BellRing className="h-3.5 w-3.5 text-white/50" />
        <h2 className="text-sm font-semibold text-white/90">Son Uyarılar</h2>
        <button
          type="button"
          className="focus-ring ml-auto text-[11px] font-medium text-indigo-300 transition-colors hover:text-indigo-200"
        >
          Tümü
        </button>
      </header>

      <div className="flex flex-col gap-1.5">
        {alerts.map((alert, index) => {
          const meta = severityStyles[alert.severity];
          const Icon = meta.icon;

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-start gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.06]"
            >
              <span
                className={cn(
                  'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                  meta.ring
                )}
              >
                <Icon className={cn('h-3 w-3', meta.color)} />
              </span>
              <span className="min-w-0">
                <span className="block text-[12px] font-medium leading-snug text-white/85">{alert.title}</span>
                <span className="mt-0.5 block text-[10.5px] text-white/35">{alert.meta}</span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
