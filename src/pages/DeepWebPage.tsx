import { motion } from 'framer-motion';
import { Eye, Fingerprint, Radar, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { GlassProgressBar } from '../components/ui/GlassProgressBar';
import { cn } from '../lib/cn';

/** İzlenen anahtar kelimeler (mock) */
const watchlist = [
  { id: 'w1', term: 'firma unvanı', hits: 4, risk: 'low' },
  { id: 'w2', term: 'VKN / vergi numarası', hits: 0, risk: 'low' },
  { id: 'w3', term: 'marka adı + replika', hits: 7, risk: 'high' },
  { id: 'w4', term: 'ihracat konşimento no', hits: 2, risk: 'medium' },
];

/** Tespit edilen bulgular (mock) */
const findings = [
  {
    id: 'f1',
    title: 'Marka adınızla sahte ürün listesi tespit edildi',
    source: 'Kapalı pazar yeri · TOR',
    severity: 'critical' as const,
    time: '18 dk önce',
  },
  {
    id: 'f2',
    title: 'Kurumsal e-posta adresi sızıntı veri setinde görüldü',
    source: 'Sızıntı arşivi · 2,4 GB dump',
    severity: 'warning' as const,
    time: '3 sa önce',
  },
  {
    id: 'f3',
    title: 'Konşimento numarası forum gönderisinde paylaşılmış',
    source: 'Lojistik forumu · onion',
    severity: 'warning' as const,
    time: '1 gün önce',
  },
];

const riskTone = {
  low: 'text-emerald-300',
  medium: 'text-amber-300',
  high: 'text-red-300',
};

/**
 * Deep Web sayfası — ihracat ve marka güvenliği için karanlık ağ istihbarat paneli.
 */
export function DeepWebPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-full overflow-y-auto px-5 py-5"
    >
      <header className="mb-5 flex items-end justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-[22px] font-semibold tracking-tight text-white/95">
            <Radar className="h-5 w-5 text-indigo-300" />
            Deep Web İstihbarat
          </h1>
          <p className="mt-1 text-[12.5px] text-white/45">
            Marka, evrak ve kurumsal kimlik sızıntıları için kapalı ağ taraması
          </p>
        </div>
        <Badge tone="warning">Beta</Badge>
      </header>

      <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-4">
        {/* Sol: aktif tarama + bulgular */}
        <div className="flex flex-col gap-4">
          <section className="glass relative overflow-hidden rounded-3xl p-5">
            <span className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative flex items-center gap-3">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-500/15">
                <Eye className="h-5 w-5 text-indigo-200" />
                <span className="absolute inset-0 animate-pulse-glow rounded-full bg-indigo-500/25 blur-md" />
              </span>
              <div className="flex-1">
                <h2 className="text-[14px] font-semibold text-white/92">Aktif tarama sürüyor</h2>
                <p className="text-[11.5px] text-white/40">1.284 kaynak · 46 pazar yeri · 12 sızıntı arşivi</p>
              </div>
              <span className="text-[13px] font-semibold tabular-nums text-white/70">64%</span>
            </div>

            <GlassProgressBar progress={64} size="md" className="mt-4" />

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {[
                { label: 'Taranan kaynak', value: '824' },
                { label: 'Bulgu', value: '13' },
                { label: 'Kritik', value: '1' },
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

          <section className="glass rounded-3xl p-5">
            <h2 className="mb-3.5 text-[14px] font-semibold text-white/92">Tespit Edilen Bulgular</h2>
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
                    <span className="block text-[12.5px] font-medium leading-snug text-white/88">{finding.title}</span>
                    <span className="mt-0.5 block text-[10.5px] text-white/35">
                      {finding.source} · {finding.time}
                    </span>
                  </span>
                  <Badge tone={finding.severity === 'critical' ? 'danger' : 'warning'}>
                    {finding.severity === 'critical' ? 'Kritik' : 'Uyarı'}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Sağ: izleme listesi + koruma durumu */}
        <div className="flex flex-col gap-4">
          <section className="glass rounded-3xl p-5">
            <div className="mb-3.5 flex items-center gap-2">
              <Fingerprint className="h-3.5 w-3.5 text-white/50" />
              <h2 className="text-[14px] font-semibold text-white/92">İzleme Listesi</h2>
              <button
                type="button"
                className="focus-ring ml-auto text-[11.5px] font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
              >
                Terim ekle
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {watchlist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[12.5px] font-medium text-white/85">{item.term}</span>
                    <span className="block text-[10.5px] text-white/35">{item.hits} eşleşme</span>
                  </span>
                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-wider',
                      riskTone[item.risk as keyof typeof riskTone]
                    )}
                  >
                    {item.risk === 'low' ? 'düşük' : item.risk === 'medium' ? 'orta' : 'yüksek'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="glass relative overflow-hidden rounded-3xl p-5">
            <span className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />
            <div className="relative flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-500/12 text-emerald-300">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-[14px] font-semibold text-white/92">Koruma Durumu</h2>
                <p className="mt-1 text-[12px] leading-relaxed text-white/45">
                  Kimlik ve evrak izleme aktif. Yeni bulgular anlık olarak sohbet paneline uyarı düşer;
                  kritik bulgular ayrıca e-posta ile bildirilir.
                </p>
              </div>
            </div>

            <div className="relative mt-4 flex items-center gap-2">
              <Badge tone="success">7/24 izleme</Badge>
              <Badge tone="indigo">TOR + I2P</Badge>
              <Badge tone="neutral">KVKK uyumlu</Badge>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
