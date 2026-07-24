import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, FileText, FolderOpen, Image as ImageIcon, Plus, ScanLine, Table2 } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { useClickOutside } from '../../lib/useClickOutside';
import { cn } from '../../lib/cn';

interface AttachMenuProps {
  /** Menünün açılma yönü */
  placement?: 'top' | 'bottom';
  className?: string;
}

/**
 * Composer ve arama motorunun sol tarafındaki "+" butonu.
 * Üzerine gelindiğinde fotoğraf / dosya / belge seçenekleri açılır,
 * tıklanınca ilgili dosya seçici çalışır ve yükleme akışı başlar.
 */
export function AttachMenu({ placement = 'top', className }: AttachMenuProps) {
  const { startUpload } = useAppContext();
  const [isOpen, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const sheetInputRef = useRef<HTMLInputElement>(null);
  const anyInputRef = useRef<HTMLInputElement>(null);

  useClickOutside(wrapperRef, isOpen, () => setOpen(false));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) startUpload(file.name, file.size);
    event.target.value = '';
    setOpen(false);
  };

  const options = [
    { id: 'photo', label: 'Fotoğraf', hint: 'JPG, PNG, HEIC', icon: ImageIcon, onClick: () => imageInputRef.current?.click() },
    { id: 'file', label: 'Dosya', hint: 'Tüm dosya türleri', icon: FolderOpen, onClick: () => anyInputRef.current?.click() },
    { id: 'doc', label: 'Belge', hint: 'PDF, e-fatura XML', icon: FileText, onClick: () => docInputRef.current?.click() },
    { id: 'sheet', label: 'Tablo', hint: 'CSV, XLSX', icon: Table2, onClick: () => sheetInputRef.current?.click() },
    { id: 'scan', label: 'Tara', hint: 'Örnek fatura ile dene', icon: ScanLine, onClick: () => startUpload('Taranan-Fatura-2024-8871.pdf', 87728) },
    { id: 'camera', label: 'Kamera', hint: 'Anlık çekim', icon: Camera, onClick: () => imageInputRef.current?.click() },
  ];

  return (
    <div
      ref={wrapperRef}
      className={cn('relative', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      <input ref={docInputRef} type="file" accept=".pdf,.xml,.doc,.docx,.txt" className="hidden" onChange={handleChange} />
      <input ref={sheetInputRef} type="file" accept=".csv,.xls,.xlsx" className="hidden" onChange={handleChange} />
      <input ref={anyInputRef} type="file" className="hidden" onChange={handleChange} />

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Dosya ekle"
        className={cn(
          'focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/70 transition-all duration-300 hover:border-indigo-400/40 hover:bg-indigo-500/20 hover:text-white',
          isOpen && 'border-indigo-400/40 bg-indigo-500/20 text-white'
        )}
      >
        <Plus className={cn('h-4.5 w-4.5 transition-transform duration-300', isOpen && 'rotate-45')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: placement === 'top' ? 10 : -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === 'top' ? 8 : -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'glass-strong absolute left-0 z-50 w-[228px] rounded-2xl p-1.5',
              placement === 'top' ? 'bottom-full mb-2.5 origin-bottom-left' : 'top-full mt-2.5 origin-top-left'
            )}
          >
            <p className="px-2.5 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
              Ekle
            </p>
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  option.onClick();
                  setOpen(false);
                }}
                className="focus-ring flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors duration-200 hover:bg-white/[0.09]"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-white/65">
                  <option.icon className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[12.5px] font-medium text-white/88">{option.label}</span>
                  <span className="block truncate text-[10px] text-white/35">{option.hint}</span>
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
