import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, Image as ImageIcon, ScanLine } from 'lucide-react';

interface UploadMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onFilesSelected: (files: FileList) => void;
}

/**
 * "+" ikonuna tıklandığında açılan dosya / fotoğraf / belge yükleme menüsü.
 * Dışarı tıklayınca kapatma mantığı, üst bileşen (ChatInputBar) tarafındaki
 * sarmalayıcı ref üzerinden useClickOutside ile yönetilir (bkz. ChatInputBar).
 */
export function UploadMenu({ isOpen, onClose, onFilesSelected }: UploadMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFilesSelected(event.target.files);
    }
    event.target.value = '';
    onClose();
  };

  return (
    <>
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleChange} multiple />
      <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} multiple />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="glass-panel-strong absolute bottom-full left-0 z-30 mb-2 w-56 origin-bottom-left rounded-2xl p-1.5"
          >
            <MenuOption
              icon={<FileText className="h-4 w-4" />}
              label="Dosya Yükle"
              onClick={() => fileInputRef.current?.click()}
            />
            <MenuOption
              icon={<ImageIcon className="h-4 w-4" />}
              label="Fotoğraf Yükle"
              onClick={() => imageInputRef.current?.click()}
            />
            <MenuOption
              icon={<ScanLine className="h-4 w-4" />}
              label="Belge Tara"
              onClick={onClose}
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
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white"
    >
      {icon}
      {label}
    </button>
  );
}
