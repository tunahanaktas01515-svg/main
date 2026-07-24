import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, Image as ImageIcon, ScanLine, Table2 } from 'lucide-react';

interface UploadMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelected: (file: File) => void;
  /** Kamera taraması yerine örnek belgeyle yükleme akışını başlatır (demo) */
  onScanDemo: () => void;
}

/**
 * "+" ikonuna tıklandığında açılan dosya / fotoğraf / belge yükleme menüsü.
 * Dışarı tıklayınca kapanma, üst bileşendeki sarmalayıcı ref üzerinden yönetilir.
 */
export function UploadMenu({ isOpen, onClose, onFileSelected, onScanDemo }: UploadMenuProps) {
  const docInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const sheetInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onFileSelected(file);
    event.target.value = '';
    onClose();
  };

  return (
    <>
      <input ref={docInputRef} type="file" accept=".pdf,.xml,.txt,.doc,.docx" className="hidden" onChange={handleChange} />
      <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      <input ref={sheetInputRef} type="file" accept=".csv,.xls,.xlsx" className="hidden" onChange={handleChange} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="glass-strong absolute bottom-full left-0 z-40 mb-2.5 w-[212px] origin-bottom-left rounded-2xl p-1.5"
          >
            <p className="px-2.5 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
              Yükle
            </p>
            <MenuOption
              icon={<FileText className="h-4 w-4" />}
              label="Belge / PDF"
              hint="e-Fatura XML dahil"
              onClick={() => docInputRef.current?.click()}
            />
            <MenuOption
              icon={<ImageIcon className="h-4 w-4" />}
              label="Fotoğraf"
              hint="JPG, PNG"
              onClick={() => imageInputRef.current?.click()}
            />
            <MenuOption
              icon={<Table2 className="h-4 w-4" />}
              label="Tablo"
              hint="CSV, XLSX"
              onClick={() => sheetInputRef.current?.click()}
            />
            <MenuOption
              icon={<ScanLine className="h-4 w-4" />}
              label="Belge Tara"
              hint="Örnek fatura ile dene"
              onClick={() => {
                onScanDemo();
                onClose();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuOption({
  icon,
  label,
  hint,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  hint: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="focus-ring flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors duration-200 hover:bg-white/[0.08]"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-white/65">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[12.5px] font-medium text-white/85">{label}</span>
        <span className="block truncate text-[10px] text-white/35">{hint}</span>
      </span>
    </button>
  );
}
