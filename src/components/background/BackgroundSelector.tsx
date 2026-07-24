import { AnimatePresence, motion } from 'framer-motion';
import { Check, Image as ImageIcon, Moon, Sun, X } from 'lucide-react';
import { backgroundOptions } from '../../data/backgrounds';
import { useAppContext } from '../../context/appContextCore';
import { cn } from '../../lib/cn';

/**
 * Kalem ikonuna tıklandığında açılan arka plan seçici modal.
 * Ekranı tam kaplamaz; yumuşak scale + fade animasyonuyla ortada belirir.
 * Görsel ve gradient tabanlı seçenekler ayrı gruplarda listelenir.
 */
export function BackgroundSelector() {
  const { isBackgroundModalOpen, closeBackgroundModal, activeBackgroundId, setActiveBackgroundId, theme, toggleTheme } =
    useAppContext();

  const imageOptions = backgroundOptions.filter((bg) => bg.kind === 'image');
  const gradientOptions = backgroundOptions.filter((bg) => bg.kind === 'gradient');

  return (
    <AnimatePresence>
      {isBackgroundModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeBackgroundModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 290, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
            className="glass-strong w-[720px] rounded-3xl p-6"
          >
            <header className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-[17px] font-semibold tracking-tight text-white/95">Arka Planlar</h2>
                <p className="mt-0.5 text-[12.5px] text-white/45">
                  Uygulamanın tamamına uygulanacak liquid/abstract temayı seç
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="focus-ring flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white"
                >
                  {theme === 'dark' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                  {theme === 'dark' ? 'Koyu tema' : 'Açık tema'}
                </button>
                <button
                  type="button"
                  onClick={closeBackgroundModal}
                  aria-label="Kapat"
                  className="icon-btn focus-ring h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <GroupLabel icon={<ImageIcon className="h-3 w-3" />} label="Görseller" count={imageOptions.length} />
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

            <GroupLabel label="Gradientler" count={gradientOptions.length} />
            <div className="mt-2.5 grid grid-cols-3 gap-3">
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
  preview,
  index,
}: {
  name: string;
  isActive: boolean;
  onSelect: () => void;
  preview: React.ReactNode;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ y: -3 }}
      className={cn(
        'focus-ring group relative h-[104px] overflow-hidden rounded-2xl border transition-all duration-300',
        isActive
          ? 'border-indigo-400/60 shadow-[0_0_28px_-6px_rgba(99,102,241,0.85)]'
          : 'border-white/10 hover:border-white/30'
      )}
    >
      <span className="absolute inset-0 overflow-hidden">{preview}</span>

      {isActive && (
        <motion.span
          layoutId="bg-selected-check"
          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white shadow-[0_0_12px_2px_rgba(99,102,241,0.85)]"
        >
          <Check className="h-3 w-3" strokeWidth={3} />
        </motion.span>
      )}

      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/75 to-transparent px-2.5 pb-2 pt-6">
        <span className="text-[11px] font-semibold text-white/85">{name}</span>
      </span>
    </motion.button>
  );
}
