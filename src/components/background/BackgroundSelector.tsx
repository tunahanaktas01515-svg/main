import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Image as ImageIcon, Moon, Plus, Sun, Trash2, X } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { cn } from '../../lib/cn';

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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
