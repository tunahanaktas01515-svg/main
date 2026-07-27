import { useLang } from '../i18n';

export type BgOption = {
  id: string;
  label: string;
  bg: string;
  thumb: string;
};

const photo = (file: string, label: string): BgOption => ({
  id: file,
  label,
  bg: `url('/bg/${file}.jpg') center / cover no-repeat fixed`,
  thumb: `url('/bg/${file}.jpg') center / cover`,
});

/** First 12 user wallpapers — Arka Plan picker. */
export const BACKGROUNDS: BgOption[] = [
  photo('bg-01-skyline', 'Skyline'),
  photo('bg-02-white-porsche', 'Beyaz GT3'),
  photo('bg-03-black-fluid', 'Siyah Akış'),
  photo('bg-04-wave-lines', 'Dalga'),
  photo('bg-05-teal-porsche', 'Teal GT3'),
  photo('bg-06-porsche-rear', 'Porsche'),
  photo('bg-07-mountains', 'Zirve'),
  photo('bg-08-black-beach', 'Kara Kum'),
  photo('bg-09-lake-mirror', 'Ayna Göl'),
  photo('bg-10-focus', 'Focus'),
  photo('bg-11-lowpoly', 'Low Poly'),
  photo('bg-12-soft-ribbons', 'Şeritler'),
];

type BgPickerProps = {
  current: string;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export function BgPicker({ current, onSelect, onClose }: BgPickerProps) {
  const { L } = useLang();
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--wide" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="close">×</button>
        <h2 className="modal__title">{L.bgTitle}</h2>
        <p className="modal__sub">{L.bgSub}</p>
        <div className="bg-grid">
          {BACKGROUNDS.map((b) => (
            <button
              key={b.id}
              type="button"
              className={`bg-swatch ${current === b.id ? 'is-active' : ''}`}
              onClick={() => onSelect(b.id)}
            >
              <span className="bg-swatch__thumb" style={{ background: b.thumb }} />
              <span className="bg-swatch__label">{b.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
