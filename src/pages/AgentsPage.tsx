import { motion } from 'framer-motion';
import { ArrowRight, Bot, Clock3, Info, Plus, Workflow, Zap } from 'lucide-react';
import { useAppContext } from '../context/appContextCore';
import { agentTemplates } from '../data/agents';
import { DynamicIcon } from '../components/ui/DynamicIcon';
import { cn } from '../lib/cn';
import type { AgentTemplate } from '../types';

/**
 * Ajanlar sayfası.
 * Solda n8n motoruyla çalışan hazır ajan şablonlarının kart ızgarası,
 * sağda yeni ajan oluşturma butonu ve altında ajanlar hakkında bilgi kartı.
 */
export function AgentsPage() {
  const { t } = useAppContext();

  const activeCount = agentTemplates.filter((agent) => agent.status === 'active').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-full overflow-y-auto px-5 py-5"
    >
      <div className="flex gap-4">
        {/* --- Kart ızgarası --- */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="flex items-end justify-between gap-4">
            <div>
              <h1 className="flex items-center gap-2.5 text-[22px] font-semibold tracking-tight text-white/95">
                <Bot className="h-5 w-5 text-indigo-300" />
                {t('agents.title')}
              </h1>
              <p className="mt-1 text-[12.5px] text-white/45">{t('agents.subtitle')}</p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full border border-emerald-400/25 bg-emerald-500/12 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
                {activeCount} {t('agents.activeCount')}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/50">
                {agentTemplates.length} {t('agents.templateCount')}
              </span>
            </div>
          </header>

          <div className="grid grid-cols-3 gap-3.5 2xl:grid-cols-4">
            {agentTemplates.map((agent, index) => (
              <AgentCard key={agent.id} agent={agent} index={index} />
            ))}
          </div>
        </div>

        {/* --- Sağ kolon: ekleme butonu + bilgi kartı --- */}
        <div className="flex w-[288px] shrink-0 flex-col gap-3.5 2xl:w-[312px]">
          <motion.button
            type="button"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="focus-ring group relative overflow-hidden rounded-3xl border border-indigo-400/35 bg-gradient-to-br from-indigo-500/25 via-violet-500/18 to-blue-500/20 p-5 text-left shadow-[0_18px_44px_-20px_rgba(99,102,241,0.9)]"
          >
            <span className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-indigo-400/25 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
            <span className="streak pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-shimmer opacity-40" />

            <span className="relative flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-white/[0.14] on-accent shadow-[0_0_22px_-6px_rgba(255,255,255,0.7)]">
                <Plus className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <span className="min-w-0">
                <span className="block text-[14.5px] font-semibold text-white/95">{t('agents.new')}</span>
                <span className="mt-0.5 block text-[11.5px] text-white/55">{t('agents.newHint')}</span>
              </span>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-white/60 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </motion.button>

          {/* Ajanlar hakkında bilgi */}
          <section className="glass relative overflow-hidden rounded-3xl p-5">
            <span className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/12 bg-white/[0.06] text-white/70">
                <Info className="h-4 w-4" />
              </span>
              <h2 className="text-[14px] font-semibold text-white/92">{t('agents.aboutTitle')}</h2>
            </div>

            <p className="relative mt-3 text-[12px] leading-relaxed text-white/50">{t('agents.aboutBody')}</p>

            <dl className="relative mt-4 flex flex-col gap-2">
              <AboutRow
                icon={<Workflow className="h-3.5 w-3.5 text-indigo-300" />}
                label={t('agents.aboutEngine')}
                value={t('agents.aboutEngineValue')}
              />
              <AboutRow
                icon={<Clock3 className="h-3.5 w-3.5 text-sky-300" />}
                label={t('agents.aboutTrigger')}
                value={t('agents.aboutTriggerValue')}
              />
              <AboutRow
                icon={<Zap className="h-3.5 w-3.5 text-amber-300" />}
                label={t('agents.aboutCredit')}
                value={t('agents.aboutCreditValue')}
              />
            </dl>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

function AboutRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
      <span className="shrink-0">{icon}</span>
      <dt className="text-[11px] uppercase tracking-wider text-white/35">{label}</dt>
      <dd className="ml-auto truncate text-[11.5px] font-semibold text-white/75">{value}</dd>
    </div>
  );
}

/** Tek ajan kartı — üstte motor rozeti (n8n), altta durum butonu */
function AgentCard({ agent, index }: { agent: AgentTemplate; index: number }) {
  const { t, tl } = useAppContext();
  const isSoon = agent.status === 'soon';

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.025, 0.3), duration: 0.32, ease: 'easeOut' }}
      className={cn(
        'glass group relative flex min-h-[196px] flex-col overflow-hidden rounded-3xl p-4 transition-all duration-300',
        isSoon ? 'opacity-80 hover:opacity-100' : 'hover:border-white/22'
      )}
    >
      <span
        className={cn(
          'pointer-events-none absolute -right-12 -top-14 h-32 w-32 rounded-full bg-gradient-to-br opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-45',
          agent.accent
        )}
      />

      <header className="relative flex items-start gap-2">
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-gradient-to-br on-accent',
            agent.accent
          )}
        >
          <DynamicIcon name={agent.icon} className="h-4 w-4" strokeWidth={2} />
        </span>

        {/* Motor rozeti — tüm ajanlar n8n üzerinde çalışır */}
        <span className="ml-auto rounded-full border border-white/12 bg-white/[0.07] px-2 py-0.5 font-mono text-[10px] font-bold lowercase tracking-tight text-white/70">
          {agent.engine}
        </span>
      </header>

      <h3 className="relative mt-3 text-[13.5px] font-semibold leading-snug text-white/92">{tl(agent.title)}</h3>
      <p className="relative mt-1.5 line-clamp-3 text-[11.5px] leading-relaxed text-white/45">
        {tl(agent.description)}
      </p>

      <footer className="relative mt-auto pt-3.5">
        {isSoon ? (
          <span className="flex w-full items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[11.5px] font-semibold text-white/35">
            {t('agents.status.soon')}
          </span>
        ) : (
          <button
            type="button"
            className="focus-ring flex w-full items-center justify-center gap-1.5 rounded-2xl border border-white/12 bg-white/[0.07] px-3 py-2 text-[11.5px] font-semibold text-white/80 transition-all duration-300 hover:border-indigo-400/40 hover:bg-indigo-500/18 hover:text-white"
          >
            {t('agents.learnMore')}
            <ArrowRight className="h-3 w-3" />
          </button>
        )}

        {agent.status === 'active' && agent.runs && (
          <span className="absolute -top-0.5 right-0 flex items-center gap-1 text-[10px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_1px_rgba(52,211,153,0.8)]" />
            {agent.runs} {t('agents.runs')}
          </span>
        )}
      </footer>
    </motion.article>
  );
}
