import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, FileText, Loader2, Upload } from 'lucide-react';
import { cenanFeatures } from '../data/cenanFeatures';
import { useAppContext } from '../context/appContextCore';
import { DynamicIcon } from '../components/ui/DynamicIcon';
import { Badge } from '../components/ui/Badge';
import { GlassProgressBar } from '../components/ui/GlassProgressBar';
import { cn } from '../lib/cn';

/** Son işlenen belgeler tablosu için örnek veri */
const recentDocuments = [
  { id: 'd1', name: 'ARC-2024-8871.xml', module: 'Fatura Analizi', status: 'done', time: '12 dk önce' },
  { id: 'd2', name: 'Ziraat-Ekstre-Nisan.csv', module: 'Banka Mutabakatı', status: 'processing', time: '38 dk önce' },
  { id: 'd3', name: 'KDV-Beyan-Taslak.pdf', module: 'KDV Hesabı', status: 'done', time: '2 sa önce' },
  { id: 'd4', name: 'Ihracat-Faturalari-Q1.xlsx', module: 'Fatura Analizi', status: 'waiting', time: '1 gün önce' },
];

const statusMeta = {
  done: { label: 'Tamamlandı', tone: 'success' as const, icon: CheckCircle2 },
  processing: { label: 'İşleniyor', tone: 'indigo' as const, icon: Loader2 },
  waiting: { label: 'Bekliyor', tone: 'warning' as const, icon: Clock },
};

/**
 * Cenan sayfası — yapay zeka destekli muhasebe modülleri.
 * Modül kartına tıklandığında sohbet paneline ilgili sistem promptu enjekte edilir.
 */
export function CenanPage() {
  const { activeFeatureId, triggerCenanFeature } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-full overflow-y-auto px-5 py-5"
    >
      <header className="mb-5 flex items-end justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-white/95">Cenan Muhasebe Modülleri</h1>
          <p className="mt-1 text-[12.5px] text-white/45">
            Bir modül seç — sağdaki sohbet paneli o modülün uzman moduna geçsin
          </p>
        </div>
        <Badge tone="indigo">3 modül aktif</Badge>
      </header>

      {/* Modül kartları */}
      <div className="grid grid-cols-3 gap-4">
        {cenanFeatures.map((feature, index) => {
          const isActive = activeFeatureId === feature.id;

          return (
            <motion.button
              key={feature.id}
              type="button"
              onClick={() => triggerCenanFeature(feature.id)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07, duration: 0.4, ease: 'easeOut' }}
              whileHover={{ y: -5 }}
              className={cn(
                'glass focus-ring group relative flex flex-col overflow-hidden rounded-3xl p-5 text-left transition-all duration-300',
                isActive ? 'border-indigo-400/45 shadow-[0_0_38px_-10px_rgba(99,102,241,0.85)]' : 'hover:border-white/20'
              )}
            >
              <span
                className={cn(
                  'pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-45',
                  feature.accent
                )}
              />

              <span
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br text-white shadow-[0_10px_26px_-12px_rgba(99,102,241,0.9)]',
                  feature.accent
                )}
              >
                <DynamicIcon name={feature.icon} className="h-5 w-5" strokeWidth={1.8} />
              </span>

              <h3 className="mt-3.5 text-[15px] font-semibold tracking-tight text-white/95">{feature.title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/50">{feature.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {feature.stats.map((stat) => (
                  <span key={stat.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-2.5 py-2">
                    <span className="block text-[10px] uppercase tracking-wider text-white/35">{stat.label}</span>
                    <span className="mt-0.5 block text-[13px] font-semibold tabular-nums text-white/90">
                      {stat.value}
                    </span>
                  </span>
                ))}
              </div>

              <span className="mt-4 flex items-center gap-1.5 text-[12.5px] font-semibold text-indigo-300 transition-colors group-hover:text-indigo-200">
                {isActive ? 'Modül aktif · sohbete devam et' : 'Sohbeti başlat'}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Alt bölüm: akış + son belgeler */}
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-4">
        <section className="glass rounded-3xl p-5">
          <h2 className="text-[14px] font-semibold text-white/92">Nasıl çalışır?</h2>
          <ol className="mt-3.5 flex flex-col gap-3">
            {[
              { title: 'Modülü seç', text: 'Sistem promptu otomatik olarak sohbete yazılır.' },
              { title: 'Belgeyi yükle', text: 'PDF, e-fatura XML, görsel veya tablo dosyası ekle.' },
              { title: 'Analizi al', text: 'KDV, stopaj, tevkifat ve mutabakat kırılımı raporlanır.' },
            ].map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-500/15 text-[11px] font-bold text-indigo-200">
                  {index + 1}
                </span>
                <span>
                  <span className="block text-[12.5px] font-semibold text-white/88">{step.title}</span>
                  <span className="mt-0.5 block text-[11.5px] leading-relaxed text-white/45">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <Upload className="h-3.5 w-3.5 text-indigo-300" />
              <span className="text-[11.5px] font-semibold text-white/75">Aylık belge kotası</span>
              <span className="ml-auto text-[11px] font-semibold tabular-nums text-white/45">2.147 / 3.000</span>
            </div>
            <GlassProgressBar progress={72} />
          </div>
        </section>

        <section className="glass rounded-3xl p-5">
          <div className="mb-3.5 flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-white/92">Son İşlenen Belgeler</h2>
            <button
              type="button"
              className="focus-ring text-[11.5px] font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
            >
              Tümünü gör
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            {recentDocuments.map((doc) => {
              const meta = statusMeta[doc.status as keyof typeof statusMeta];
              const StatusIcon = meta.icon;

              return (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.06]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/60">
                    <FileText className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-medium text-white/88">{doc.name}</span>
                    <span className="block truncate text-[10.5px] text-white/35">
                      {doc.module} · {doc.time}
                    </span>
                  </span>
                  <Badge tone={meta.tone}>
                    <StatusIcon className={cn('h-2.5 w-2.5', doc.status === 'processing' && 'animate-spin')} />
                    {meta.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
