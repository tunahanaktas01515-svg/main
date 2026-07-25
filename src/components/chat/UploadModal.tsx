import { AnimatePresence, motion } from 'framer-motion';
import { Check, FileText, X } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { GlassProgressBar } from '../ui/GlassProgressBar';
import { GlowSpinner } from '../ui/Skeleton';

/**
 * Dosya yükleme modalı.
 * Referanstaki koyu glass yükleme kartını taklit eder: dosya ikonu, ad, boyut,
 * glow'lu progress bar ve yüzde göstergesi.
 */
export function UploadModal() {
  const { t, uploadTask, cancelUpload } = useAppContext();
  const isDone = uploadTask?.status === 'done';

  return (
    <AnimatePresence>
      {uploadTask && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-[470px]"
          >
            {/* Kartın arkasındaki yumuşak indigo/violet halo */}
            <span className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),transparent_72%)] blur-2xl" />

            <div className="glass-strong rounded-3xl p-5">
              <button
                type="button"
                onClick={cancelUpload}
                aria-label={t('upload.close')}
                className="icon-btn focus-ring absolute right-4 top-4 h-7 w-7"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              <div className="flex items-center gap-4 pr-10">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.14] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]">
                  <FileText className="h-6 w-6 text-white/80" strokeWidth={1.6} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[19px] font-semibold tracking-tight text-white/95">
                    {uploadTask.fileName}
                  </p>
                  <p className="mt-0.5 text-[13px] font-medium text-white/40">{uploadTask.sizeLabel}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-3.5">
                <div className="mb-2.5 flex items-center gap-2.5">
                  {isDone ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  ) : (
                    <GlowSpinner />
                  )}
                  <span className="text-[13px] font-medium text-white/80">
                    {isDone ? t('upload.done') : t('upload.uploading')}
                  </span>
                  <span className="ml-auto text-[13px] font-semibold tabular-nums text-white/55">
                    {Math.round(uploadTask.progress)}%
                  </span>
                </div>
                <GlassProgressBar progress={uploadTask.progress} size="md" />
              </div>

              <p className="mt-3 text-center text-[11px] text-white/30">
                {isDone ? t('upload.doneNote') : t('upload.secureNote')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
