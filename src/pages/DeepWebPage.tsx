import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  Eye,
  Fingerprint,
  Loader2,
  Plus,
  Radar,
  Search,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import { useAppContext } from '../context/appContextCore';
import { findings } from '../data/deepweb';
import { Badge } from '../components/ui/Badge';
import { GlassProgressBar } from '../components/ui/GlassProgressBar';
import { DeepSearchBar } from '../components/deepweb/DeepSearchBar';
import { SearchModeChips } from '../components/deepweb/SearchModeChips';
import { cn } from '../lib/cn';

const riskTone = {
  low: 'text-emerald-300',
  medium: 'text-amber-300',
  high: 'text-red-300',
};

/**
 * Deep Web sayfası.
 * Üst orta bölümde arama motoru ve tür eklentileri, altında borsa takip bloğu,
 * en altta araştırma geçmişi, bulgular ve izleme listesi panelleri yer alır.
 */
export function DeepWebPage() {
  const {
    t,
    tl,
    researchHistory,
    addResearch,
    clearResearch,
    watchTerms,
    addWatchTerm,
    removeWatchTerm,
    searchWatchTerm,
  } = useAppContext();

  const [activeModes, setActiveModes] = useState<string[]>(['web', 'bilgi']);
  const [sourcesTab, setSourcesTab] = useState<'history' | 'findings'>('history');
  const [isAddingTerm, setAddingTerm] = useState(false);
  const [termDraft, setTermDraft] = useState('');

  const toggleMode = (id: string) => {
    setActiveModes((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const lastRecord = researchHistory[0];
  const runningCount = useMemo(
    () => researchHistory.filter((item) => item.status === 'running').length,
    [researchHistory]
  );

  const submitTerm = () => {
    const value = termDraft.trim();
    if (!value) return;
    addWatchTerm(value);
    setTermDraft('');
    setAddingTerm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-full overflow-y-auto px-6 pb-8"
    >
      {/* --- Arama motoru: sayfanın tam üstü değil, üst-orta bölge --- */}
      <section className="mx-auto w-full max-w-[820px] pt-[9vh]">
        <div className="mb-6 text-center">
          <h1 className="flex items-center justify-center gap-2.5 text-[30px] font-semibold tracking-tight text-white/95">
            <Radar className="h-6 w-6 text-indigo-300" />
            {t('deepweb.title')}
          </h1>
          <p className="mt-1.5 text-[13px] text-white/45">{t('deepweb.subtitle')}</p>
        </div>

        <DeepSearchBar onSearch={(query) => addResearch(query, activeModes)} />

        <div className="mt-4">
          <SearchModeChips activeIds={activeModes} onToggle={toggleMode} />
        </div>

        <AnimatePresence>
          {lastRecord && (
            <motion.p
              key={lastRecord.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-center text-[12px] text-white/40"
            >
              <span className="font-semibold text-white/70">“{lastRecord.query}”</span>{' '}
              {lastRecord.modes.length || 1} {t('deepweb.sourceTypes')} {t('deepweb.queued')}
            </motion.p>
          )}
        </AnimatePresence>
      </section>

      {/* --- Karanlık ağ istihbarat panelleri --- */}
      <div className="mx-auto mt-[7vh] grid w-full max-w-[1180px] grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-4">
        <div className="flex flex-col gap-4">
          <section className="glass relative overflow-hidden rounded-3xl p-5">
            <span className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative flex items-center gap-3">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-500/15">
                <Eye className="h-5 w-5 text-indigo-200" />
                <span className="absolute inset-0 animate-pulse-glow rounded-full bg-indigo-500/25 blur-md" />
              </span>
              <div className="flex-1">
                <h2 className="text-[14px] font-semibold text-white/92">{t('deepweb.scanTitle')}</h2>
                <p className="text-[11.5px] text-white/40">{t('deepweb.scanMeta')}</p>
              </div>
              <span className="text-[13px] font-semibold tabular-nums text-white/70">64%</span>
            </div>

            <GlassProgressBar progress={64} size="md" className="mt-4" />

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {[
                { label: t('deepweb.scanned'), value: '824' },
                { label: t('deepweb.findings'), value: String(findings.length + researchHistory.length) },
                { label: t('deepweb.critical'), value: '1' },
              ].map((stat) => (
                <span key={stat.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
                  <span className="block text-[10px] uppercase tracking-wider text-white/35">{stat.label}</span>
                  <span className="mt-0.5 block text-[16px] font-semibold tabular-nums text-white/92">
                    {stat.value}
                  </span>
                </span>
              ))}
            </div>
          </section>

          {/* Kaynaklar / Sonuçlar — araştırma geçmişi ve bulgular */}
          <section className="glass rounded-3xl p-5">
            <div className="mb-3.5 flex items-center gap-2">
              <h2 className="text-[14px] font-semibold text-white/92">{t('deepweb.sourcesTitle')}</h2>

              <div className="ml-auto flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
                {(['history', 'findings'] as const).map((id) => {
                  const isActive = sourcesTab === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSourcesTab(id)}
                      className={cn(
                        'focus-ring relative rounded-full px-3 py-1 text-[11px] font-medium transition-colors duration-300',
                        isActive ? 'text-white' : 'text-white/50 hover:text-white/85'
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="sources-tab"
                          className="absolute inset-0 -z-10 rounded-full border border-white/15 bg-white/[0.14]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {id === 'history' ? t('deepweb.historyTab') : t('deepweb.findingsTab')}
                    </button>
                  );
                })}
              </div>
            </div>

            {sourcesTab === 'history' ? (
              researchHistory.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/12 px-4 py-8 text-center">
                  <p className="text-[13px] font-medium text-white/60">{t('deepweb.historyEmpty')}</p>
                  <p className="mt-1 text-[11.5px] text-white/32">{t('deepweb.historyEmptyHint')}</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <AnimatePresence initial={false}>
                      {researchHistory.map((record) => (
                        <motion.div
                          key={record.id}
                          layout
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.06]"
                        >
                          <span
                            className={cn(
                              'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border',
                              record.status === 'running'
                                ? 'border-indigo-400/30 bg-indigo-500/12 text-indigo-300'
                                : 'border-emerald-400/30 bg-emerald-500/12 text-emerald-300'
                            )}
                          >
                            {record.status === 'running' ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Check className="h-3.5 w-3.5" />
                            )}
                          </span>

                          <span className="min-w-0 flex-1">
                            {/* İçeriğe göre otomatik atanan başlık */}
                            <span className="block truncate text-[12.5px] font-semibold leading-snug text-white/88">
                              {record.title}
                            </span>
                            <span className="mt-0.5 block truncate text-[10.5px] text-white/35">
                              {record.createdAt}
                              {record.status === 'done' && ` · ${record.sourceCount} ${t('deepweb.historySources')}`}
                              {record.modes.length > 0 && ` · ${record.modes.join(', ')}`}
                            </span>
                          </span>

                          <Badge tone={record.status === 'running' ? 'indigo' : 'success'}>
                            {record.status === 'running' ? t('deepweb.historyRunning') : t('deepweb.historyDone')}
                          </Badge>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-3">
                    <span className="text-[10.5px] text-white/30">
                      {researchHistory.length} · {runningCount} {t('deepweb.historyRunning').toLocaleLowerCase()}
                    </span>
                    <button
                      type="button"
                      onClick={clearResearch}
                      className="focus-ring flex items-center gap-1.5 text-[11px] font-semibold text-white/45 transition-colors hover:text-red-300"
                    >
                      <Trash2 className="h-3 w-3" />
                      {t('deepweb.clearHistory')}
                    </button>
                  </div>
                </>
              )
            ) : (
              <div className="flex flex-col gap-2">
                {findings.map((finding, index) => (
                  <motion.div
                    key={finding.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.32 }}
                    className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.06]"
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border',
                        finding.severity === 'critical'
                          ? 'border-red-400/30 bg-red-500/12 text-red-300'
                          : 'border-amber-400/30 bg-amber-500/12 text-amber-300'
                      )}
                    >
                      <ShieldAlert className="h-3.5 w-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12.5px] font-medium leading-snug text-white/88">
                        {tl(finding.title)}
                      </span>
                      <span className="mt-0.5 block text-[10.5px] text-white/35">
                        {tl(finding.source)} · {tl(finding.time)}
                      </span>
                    </span>
                    <Badge tone={finding.severity === 'critical' ? 'danger' : 'warning'}>
                      {finding.severity === 'critical' ? t('deepweb.critical') : t('deepweb.warning')}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="flex flex-col gap-4">
          {/* İzleme listesi — terim ekleme ve tekil arama */}
          <section className="glass rounded-3xl p-5">
            <div className="mb-3.5 flex items-center gap-2">
              <Fingerprint className="h-3.5 w-3.5 text-white/50" />
              <h2 className="text-[14px] font-semibold text-white/92">{t('deepweb.watchlistTitle')}</h2>
              <button
                type="button"
                onClick={() => setAddingTerm((prev) => !prev)}
                aria-expanded={isAddingTerm}
                className="focus-ring ml-auto flex items-center gap-1 text-[11.5px] font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
              >
                {isAddingTerm ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                {isAddingTerm ? t('common.cancel') : t('deepweb.addTerm')}
              </button>
            </div>

            <AnimatePresence initial={false}>
              {isAddingTerm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mb-2.5 flex items-center gap-2">
                    <input
                      autoFocus
                      value={termDraft}
                      onChange={(event) => setTermDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') submitTerm();
                        if (event.key === 'Escape') setAddingTerm(false);
                      }}
                      placeholder={t('deepweb.addTermPlaceholder')}
                      className="focus-ring h-9 min-w-0 flex-1 rounded-2xl border border-white/12 bg-white/[0.05] px-3 text-[12.5px] text-white/90 placeholder:text-white/30 transition-colors focus:border-indigo-400/50"
                    />
                    <button
                      type="button"
                      onClick={submitTerm}
                      className="focus-ring h-9 shrink-0 rounded-2xl border border-indigo-400/40 bg-indigo-500/20 px-3 text-[11.5px] font-semibold text-indigo-100 transition-all duration-300 hover:bg-indigo-500/30"
                    >
                      {t('deepweb.addTermSubmit')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-1.5">
              <AnimatePresence initial={false}>
                {watchTerms.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="group flex items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.05]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12.5px] font-medium text-white/85">{item.term}</span>
                      <span className="block text-[10.5px] text-white/35">
                        {item.status === 'searching' ? (
                          <span className="flex items-center gap-1 text-indigo-300">
                            <Loader2 className="h-2.5 w-2.5 animate-spin" />
                            {t('deepweb.searchingTerm')}
                          </span>
                        ) : (
                          `${item.hits} ${t('deepweb.matches')}`
                        )}
                      </span>
                    </span>

                    <span
                      className={cn(
                        'shrink-0 text-[10px] font-bold uppercase tracking-wider',
                        riskTone[item.risk]
                      )}
                    >
                      {t(`deepweb.risk.${item.risk}`)}
                    </span>

                    {/* Arat ikonu — basıldığında satır "aranıyor" durumuna geçer */}
                    <button
                      type="button"
                      onClick={() => searchWatchTerm(item.id)}
                      disabled={item.status === 'searching'}
                      aria-label={t('deepweb.searchTerm')}
                      title={t('deepweb.searchTerm')}
                      className="focus-ring flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/55 transition-all duration-300 hover:border-indigo-400/40 hover:bg-indigo-500/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {item.status === 'searching' ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Search className="h-3 w-3" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => removeWatchTerm(item.id)}
                      aria-label={t('deepweb.removeTerm')}
                      title={t('deepweb.removeTerm')}
                      className="focus-ring flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/25 opacity-0 transition-all duration-300 hover:bg-red-500/15 hover:text-red-300 group-hover:opacity-100"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          <section className="glass relative overflow-hidden rounded-3xl p-5">
            <span className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />
            <div className="relative flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/12 text-emerald-300">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-[14px] font-semibold text-white/92">{t('deepweb.protectionTitle')}</h2>
                <p className="mt-1 text-[12px] leading-relaxed text-white/45">{t('deepweb.protectionBody')}</p>
              </div>
            </div>

            <div className="relative mt-4 flex items-center gap-2">
              <Badge tone="success">{t('deepweb.protection247')}</Badge>
              <Badge tone="indigo">TOR + I2P</Badge>
              <Badge tone="neutral">{t('deepweb.protectionKvkk')}</Badge>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
