import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Crosshair,
  Image as ImageIcon,
  Languages,
  Loader2,
  MapPin,
  Moon,
  Palette,
  Plus,
  Settings as SettingsIcon,
  ShieldX,
  Sun,
  Trash2,
} from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { surfaceThemes } from '../../data/surfaceThemes';
import { languageLabels } from '../../i18n';
import { cn } from '../../lib/cn';
import { Modal } from '../ui/Modal';
import type { Language } from '../../types';
import type { TranslationKey } from '../../i18n/dictionary';

type Tab = 'appearance' | 'backgrounds' | 'language' | 'location';

const tabs: { id: Tab; labelKey: TranslationKey; icon: typeof Palette }[] = [
  { id: 'appearance', labelKey: 'settings.tab.appearance', icon: Palette },
  { id: 'backgrounds', labelKey: 'settings.tab.backgrounds', icon: ImageIcon },
  { id: 'language', labelKey: 'settings.tab.language', icon: Languages },
  { id: 'location', labelKey: 'settings.tab.location', icon: MapPin },
];

/**
 * Ayarlar penceresi — görünüm modu, yüzey teması, arka planlar,
 * arayüz dili ve opsiyonel konum izni tek noktada yönetilir.
 */
export function SettingsModal() {
  const {
    t,
    activeOverlay,
    closeOverlay,
    theme,
    setTheme,
    surfaceTheme,
    setSurfaceTheme,
    language,
    setLanguage,
    backgrounds,
    activeBackgroundId,
    setActiveBackgroundId,
    addCustomBackground,
    removeCustomBackground,
    locationStatus,
    location,
    requestLocation,
    rejectLocation,
  } = useAppContext();

  const [tab, setTab] = useState<Tab>('appearance');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        addCustomBackground(reader.result, file.name.replace(/\.[^.]+$/, ''));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal
      isOpen={activeOverlay === 'settings'}
      onClose={closeOverlay}
      title={t('settings.title')}
      subtitle={t('settings.subtitle')}
      icon={<SettingsIcon className="h-4.5 w-4.5" />}
      size="lg"
      closeLabel={t('common.close')}
    >
      {/* Sekmeler */}
      <div className="mb-5 flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
        {tabs.map((item) => {
          const isActive = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                'focus-ring relative flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[12.5px] font-medium transition-colors duration-300',
                isActive ? 'text-white' : 'text-white/50 hover:text-white/85'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="settings-tab"
                  className="absolute inset-0 -z-10 rounded-full border border-white/15 bg-white/[0.13] shadow-[0_6px_20px_-8px_rgba(99,102,241,0.9)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <item.icon className="h-3.5 w-3.5" />
              {t(item.labelKey)}
            </button>
          );
        })}
      </div>

      {/* --- Görünüm --- */}
      {tab === 'appearance' && (
        <div className="flex flex-col gap-6">
          <section>
            <SectionHeading title={t('settings.mode')} hint={t('settings.modeHint')} />
            <div className="grid grid-cols-2 gap-3">
              <ModeCard
                active={theme === 'dark'}
                onClick={() => setTheme('dark')}
                icon={<Moon className="h-4 w-4" />}
                label={t('settings.modeDark')}
                preview="bg-[linear-gradient(140deg,#0d0f1a,#05060b)] border-white/12"
              />
              <ModeCard
                active={theme === 'light'}
                onClick={() => setTheme('light')}
                icon={<Sun className="h-4 w-4" />}
                label={t('settings.modeLight')}
                preview="bg-[linear-gradient(140deg,#ffffff,#e6e9f2)] border-black/10"
              />
            </div>
          </section>

          <section>
            <SectionHeading title={t('settings.surfaceTitle')} hint={t('settings.surfaceHint')} />
            <div className="grid grid-cols-5 gap-2.5">
              {surfaceThemes.map((item) => {
                const isActive = surfaceTheme === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSurfaceTheme(item.id)}
                    className={cn(
                      'focus-ring group flex flex-col items-center gap-2 rounded-2xl border p-2.5 text-center transition-all duration-300',
                      isActive
                        ? 'border-indigo-400/50 bg-indigo-500/12 shadow-[0_0_24px_-10px_rgba(99,102,241,0.9)]'
                        : 'border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                    )}
                  >
                    <span className={cn('h-12 w-full rounded-xl border', item.preview)} />
                    <span className="text-[11.5px] font-semibold text-white/85">{t(item.nameKey)}</span>
                    <span className="text-[9.5px] leading-tight text-white/35">{t(item.descriptionKey)}</span>
                    {isActive && <Check className="h-3 w-3 text-indigo-300" />}
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* --- Arka planlar --- */}
      {tab === 'backgrounds' && (
        <section>
          <SectionHeading title={t('settings.backgroundTitle')} hint={t('settings.backgroundHint')} />

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              handleUpload(event.target.files?.[0]);
              event.target.value = '';
            }}
          />

          <div className="grid grid-cols-4 gap-3">
            {backgrounds.map((option) => {
              const isActive = activeBackgroundId === option.id;
              return (
                <div key={option.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveBackgroundId(option.id)}
                    className={cn(
                      'focus-ring group relative block h-24 w-full overflow-hidden rounded-2xl border transition-all duration-300',
                      isActive
                        ? 'border-indigo-400/70 shadow-[0_0_26px_-8px_rgba(99,102,241,1)]'
                        : 'border-white/12 hover:border-white/30'
                    )}
                  >
                    {option.kind === 'image' ? (
                      <img
                        src={option.thumb ?? option.src}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <span className={cn('block h-full w-full', option.className)} />
                    )}

                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-1.5 pt-4 text-left">
                      <span className="block truncate text-[10.5px] font-semibold text-white/90">
                        {option.name}
                      </span>
                    </span>

                    {isActive && (
                      <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 on-accent">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                    )}
                  </button>

                  {option.custom && (
                    <button
                      type="button"
                      onClick={() => removeCustomBackground(option.id)}
                      aria-label={t('settings.removeBackground')}
                      title={t('settings.removeBackground')}
                      className="focus-ring absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-black/60 text-red-300 transition-colors hover:bg-red-500/40 hover:text-white"
                    >
                      <Trash2 className="h-2.5 w-2.5" />
                    </button>
                  )}
                </div>
              );
            })}

            {/* Son karenin yanındaki ekleme kutusu */}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="focus-ring flex h-24 flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-white/25 bg-white/[0.03] text-white/50 transition-all duration-300 hover:border-indigo-400/60 hover:bg-indigo-500/10 hover:text-white"
            >
              <Plus className="h-5 w-5" strokeWidth={2.2} />
              <span className="text-[10.5px] font-semibold">{t('settings.addBackground')}</span>
            </button>
          </div>
        </section>
      )}

      {/* --- Dil --- */}
      {tab === 'language' && (
        <section>
          <SectionHeading title={t('settings.languageTitle')} hint={t('settings.languageHint')} />
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(languageLabels) as Language[]).map((code) => {
              const isActive = language === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code)}
                  className={cn(
                    'focus-ring flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300',
                    isActive
                      ? 'border-indigo-400/50 bg-indigo-500/12 shadow-[0_0_26px_-10px_rgba(99,102,241,0.9)]'
                      : 'border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                  )}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.06] text-[12px] font-bold tracking-wide text-white/80">
                    {languageLabels[code].flag}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] font-semibold text-white/90">
                      {languageLabels[code].native}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-white/40">{languageLabels[code].label}</span>
                  </span>
                  {isActive && <Check className="h-4 w-4 shrink-0 text-indigo-300" />}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* --- Konum --- */}
      {tab === 'location' && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-[13.5px] font-semibold text-white/90">{t('settings.locationTitle')}</h3>
            <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-white/40">
              {t('common.optional')}
            </span>
          </div>
          <p className="mb-4 text-[12px] leading-relaxed text-white/45">{t('settings.locationHint')}</p>

          <div className="glass rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border',
                  locationStatus === 'granted'
                    ? 'border-emerald-400/30 bg-emerald-500/12 text-emerald-300'
                    : locationStatus === 'denied' || locationStatus === 'error'
                      ? 'border-red-400/30 bg-red-500/12 text-red-300'
                      : 'border-white/12 bg-white/[0.06] text-white/60'
                )}
              >
                {locationStatus === 'asking' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : locationStatus === 'granted' ? (
                  <MapPin className="h-5 w-5" />
                ) : locationStatus === 'denied' || locationStatus === 'error' ? (
                  <ShieldX className="h-5 w-5" />
                ) : (
                  <Crosshair className="h-5 w-5" />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-white/90">
                  {locationStatus === 'granted'
                    ? t('settings.locationGranted')
                    : locationStatus === 'asking'
                      ? t('settings.locationDetecting')
                      : locationStatus === 'denied'
                        ? t('settings.locationDenied')
                        : locationStatus === 'error'
                          ? t('settings.locationUnsupported')
                          : t('settings.locationDetect')}
                </p>
                {location && locationStatus === 'granted' && (
                  <p className="mt-0.5 text-[11.5px] tabular-nums text-white/45">
                    {location.label} · {t('settings.locationAccuracy')} ±{location.accuracy} m
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={requestLocation}
                disabled={locationStatus === 'asking'}
                className="focus-ring flex-1 rounded-2xl border border-indigo-400/40 bg-indigo-500/20 px-4 py-2.5 text-[12.5px] font-semibold text-indigo-100 transition-all duration-300 hover:bg-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {locationStatus === 'granted' || locationStatus === 'denied' || locationStatus === 'error'
                  ? t('settings.locationRetry')
                  : t('settings.locationAccept')}
              </button>
              <button
                type="button"
                onClick={rejectLocation}
                className="focus-ring flex-1 rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-2.5 text-[12.5px] font-semibold text-white/65 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.1] hover:text-white"
              >
                {t('settings.locationReject')}
              </button>
            </div>
          </div>
        </section>
      )}
    </Modal>
  );
}

function SectionHeading({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="mb-3">
      <h3 className="text-[13.5px] font-semibold text-white/90">{title}</h3>
      <p className="mt-0.5 text-[11.5px] text-white/40">{hint}</p>
    </div>
  );
}

function ModeCard({
  active,
  onClick,
  icon,
  label,
  preview,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  preview: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'focus-ring flex items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300',
        active
          ? 'border-indigo-400/50 bg-indigo-500/12 shadow-[0_0_26px_-10px_rgba(99,102,241,0.9)]'
          : 'border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
      )}
    >
      <span className={cn('h-11 w-16 shrink-0 rounded-xl border', preview)} />
      <span className="flex min-w-0 flex-1 items-center gap-2 text-[13px] font-semibold text-white/88">
        {icon}
        {label}
      </span>
      {active && <Check className="h-4 w-4 shrink-0 text-indigo-300" />}
    </button>
  );
}
