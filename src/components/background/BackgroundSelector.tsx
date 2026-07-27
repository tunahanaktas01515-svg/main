import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Image as ImageIcon, MessageSquare, Moon, Plus, Ruler, Sun, Trash2, X } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { OrbIcon } from '../ui/Orb';
import { cn } from '../../lib/cn';
import type { UiSize } from '../../types';

/**
 * Kalem ikonuna tıklandığında açılan arka plan seçici modal.
 * Görsel, gradient ve kullanıcının yüklediği arka planlar ayrı gruplarda listelenir;
 * son karenin yanındaki ekleme kutusundan bilgisayardan yeni fotoğraf yüklenebilir.
 */
export function BackgroundSelector() {
  const {
    t,
    activeOverlay,
    closeOverlay,
    backgrounds,
    activeBackgroundId,
    setActiveBackgroundId,
    addCustomBackground,
    removeCustomBackground,
    theme,
    toggleTheme,
    composerSize,
    setComposerSize,
    bubbleSize,
    setBubbleSize,
  } = useAppContext();

  const fileRef = useRef<HTMLInputElement>(null);

  const imageOptions = backgrounds.filter((bg) => bg.kind === 'image' && !bg.custom);
  const gradientOptions = backgrounds.filter((bg) => bg.kind === 'gradient');
  const customOptions = backgrounds.filter((bg) => bg.custom);

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
    <AnimatePresence>
      {activeOverlay === 'background' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeOverlay}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-8 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 290, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
            className="glass-strong max-h-[86vh] w-[720px] overflow-y-auto rounded-3xl p-6"
          >
            <header className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-[17px] font-semibold tracking-tight text-white/95">{t('bg.title')}</h2>
                <p className="mt-0.5 text-[12.5px] text-white/45">{t('bg.subtitle')}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="focus-ring flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white"
                >
                  {theme === 'dark' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                  {theme === 'dark' ? t('settings.modeDark') : t('settings.modeLight')}
                </button>
                <button
                  type="button"
                  onClick={closeOverlay}
                  aria-label={t('common.close')}
                  className="icon-btn focus-ring h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

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

            <GroupLabel icon={<ImageIcon className="h-3 w-3" />} label={t('bg.images')} count={imageOptions.length} />
            <div className="mb-5 mt-2.5 grid grid-cols-3 gap-3">
              {imageOptions.map((bg, index) => (
                <BackgroundTile
                  key={bg.id}
                  name={bg.name}
                  isActive={bg.id === activeBackgroundId}
                  onSelect={() => setActiveBackgroundId(bg.id)}
                  index={index}
                  preview={
                    <img
                      src={bg.thumb}
                      alt={bg.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  }
                />
              ))}
            </div>

            <GroupLabel label={t('bg.gradients')} count={gradientOptions.length} />
            <div className="mb-5 mt-2.5 grid grid-cols-3 gap-3">
              {gradientOptions.map((bg, index) => (
                <BackgroundTile
                  key={bg.id}
                  name={bg.name}
                  isActive={bg.id === activeBackgroundId}
                  onSelect={() => setActiveBackgroundId(bg.id)}
                  index={index}
                  preview={
                    <span
                      className={cn(
                        'block h-full w-full transition-transform duration-500 group-hover:scale-[1.06]',
                        bg.className
                      )}
                    />
                  }
                />
              ))}
            </div>

            <GroupLabel label={t('settings.customBackgrounds')} count={customOptions.length} />
            <div className="mt-2.5 grid grid-cols-3 gap-3">
              {customOptions.map((bg, index) => (
                <BackgroundTile
                  key={bg.id}
                  name={bg.name}
                  isActive={bg.id === activeBackgroundId}
                  onSelect={() => setActiveBackgroundId(bg.id)}
                  onRemove={() => removeCustomBackground(bg.id)}
                  removeLabel={t('settings.removeBackground')}
                  index={index}
                  preview={
                    <img
                      src={bg.thumb}
                      alt={bg.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  }
                />
              ))}

              {/* Son karenin yanındaki ekleme kutusu */}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="focus-ring flex h-[104px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-white/25 bg-white/[0.03] text-white/50 transition-all duration-300 hover:border-indigo-400/60 hover:bg-indigo-500/10 hover:text-white"
              >
                <Plus className="h-5 w-5" strokeWidth={2.2} />
                <span className="text-[11px] font-semibold">{t('settings.addBackground')}</span>
              </button>
            </div>

            {/* --- Boyut ayarı --- */}
            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="mb-3 flex items-center gap-2">
                <Ruler className="h-3.5 w-3.5 text-white/45" />
                <h3 className="text-[13.5px] font-semibold text-white/90">{t('size.title')}</h3>
                <span className="ml-auto text-[11px] text-white/35">{t('size.subtitle')}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SizeGroup
                  icon={<OrbIcon size={20} />}
                  title={t('size.composer')}
                  hint={t('size.composerHint')}
                  value={composerSize}
                  onChange={setComposerSize}
                  smallLabel={t('size.small')}
                  largeLabel={t('size.large')}
                  smallHint={t('size.smallComposerHint')}
                  largeHint={t('size.largeComposerHint')}
                  preview="composer"
                />
                <SizeGroup
                  icon={<MessageSquare className="h-4 w-4 text-white/60" />}
                  title={t('size.bubble')}
                  hint={t('size.bubbleHint')}
                  value={bubbleSize}
                  onChange={setBubbleSize}
                  smallLabel={t('size.small')}
                  largeLabel={t('size.large')}
                  smallHint={t('size.smallBubbleHint')}
                  largeHint={t('size.largeBubbleHint')}
                  preview="bubble"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Tek bir boyut tercihi (konuşma motoru ya da mesaj balonu).
 * Küçük ve büyük seçenekleri, o boyutun nasıl görüneceğini anlatan
 * minik bir önizleme ile birlikte sunulur.
 */
function SizeGroup({
  icon,
  title,
  hint,
  value,
  onChange,
  smallLabel,
  largeLabel,
  smallHint,
  largeHint,
  preview,
}: {
  icon: React.ReactNode;
  title: string;
  hint: string;
  value: UiSize;
  onChange: (size: UiSize) => void;
  smallLabel: string;
  largeLabel: string;
  smallHint: string;
  largeHint: string;
  preview: 'composer' | 'bubble';
}) {
  const options: { id: UiSize; label: string; hint: string }[] = [
    { id: 'small', label: smallLabel, hint: smallHint },
    { id: 'large', label: largeLabel, hint: largeHint },
  ];

  return (
    <section className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-3.5">
      <header className="mb-2.5 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[12.5px] font-semibold text-white/88">{title}</span>
          <span className="block truncate text-[10px] text-white/35">{hint}</span>
        </span>
      </header>

      <div className="flex flex-col gap-1.5">
        {options.map((option) => {
          const isActive = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                'focus-ring flex items-center gap-2.5 rounded-2xl border px-2.5 py-2 text-left transition-all duration-300',
                isActive
                  ? 'border-indigo-400/50 bg-indigo-500/12 shadow-[0_0_22px_-10px_rgba(99,102,241,0.9)]'
                  : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.06]'
              )}
            >
              <SizePreview kind={preview} size={option.id} />
              <span className="min-w-0 flex-1">
                <span className="block text-[12px] font-semibold text-white/85">{option.label}</span>
                <span className="block truncate text-[9.5px] text-white/35">{option.hint}</span>
              </span>
              {isActive && <Check className="h-3.5 w-3.5 shrink-0 text-indigo-300" />}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/** Seçeneğin sonucunu anlatan minik şematik önizleme */
function SizePreview({ kind, size }: { kind: 'composer' | 'bubble'; size: UiSize }) {
  if (kind === 'composer') {
    return (
      <span className="flex h-10 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/25">
        <span
          className={cn(
            'w-9 rounded-full border border-white/20 bg-white/[0.12]',
            size === 'small' ? 'h-2' : 'h-6 rounded-lg'
          )}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        'flex h-10 w-12 shrink-0 flex-col items-end justify-center rounded-xl border border-white/10 bg-black/25 px-1.5',
        size === 'small' ? 'gap-0.5' : 'gap-1.5'
      )}
    >
      <span className={cn('w-7 rounded-full bg-indigo-400/70', size === 'small' ? 'h-1.5' : 'h-2.5')} />
      <span className={cn('w-9 self-start rounded-full bg-white/20', size === 'small' ? 'h-1.5' : 'h-2.5')} />
    </span>
  );
}

function GroupLabel({ icon, label, count }: { icon?: React.ReactNode; label: string; count: number }) {
  return (
    <div className="flex items-center gap-1.5 px-0.5">
      {icon && <span className="text-white/35">{icon}</span>}
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">{label}</span>
      <span className="text-[10px] font-semibold text-white/20">{count}</span>
    </div>
  );
}

function BackgroundTile({
  name,
  isActive,
  onSelect,
  onRemove,
  removeLabel,
  preview,
  index,
}: {
  name: string;
  isActive: boolean;
  onSelect: () => void;
  onRemove?: () => void;
  removeLabel?: string;
  preview: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className="relative"
    >
      <motion.button
        type="button"
        onClick={onSelect}
        whileHover={{ y: -3 }}
        className={cn(
          'focus-ring group relative block h-[104px] w-full overflow-hidden rounded-2xl border transition-all duration-300',
          isActive
            ? 'border-indigo-400/60 shadow-[0_0_28px_-6px_rgba(99,102,241,0.85)]'
            : 'border-white/10 hover:border-white/30'
        )}
      >
        <span className="absolute inset-0 overflow-hidden">{preview}</span>

        {isActive && (
          <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 on-accent shadow-[0_0_12px_2px_rgba(99,102,241,0.85)]">
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        )}

        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/75 to-transparent px-2.5 pb-2 pt-6">
          <span className="truncate text-[11px] font-semibold text-white/85">{name}</span>
        </span>
      </motion.button>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          title={removeLabel}
          className="focus-ring absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-black/60 text-red-300 transition-colors hover:bg-red-500/40 hover:text-white"
        >
          <Trash2 className="h-2.5 w-2.5" />
        </button>
      )}
    </motion.div>
  );
}
