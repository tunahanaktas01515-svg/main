import { useLang } from '../i18n';

export type BgOption = {
  id: string;
  label: string;
  bg: string;
  thumb: string;
};

export const BACKGROUNDS: BgOption[] = [
  {
    id: 'glass',
    label: 'Işıltı',
    bg: "url('/glass-bg.png') center / cover no-repeat fixed",
    thumb: "url('/glass-bg.png') center / cover",
  },
  {
    id: 'aurora',
    label: 'Aurora',
    bg: 'radial-gradient(1200px 700px at 15% 10%, #ffd6ec 0%, transparent 55%), radial-gradient(1000px 700px at 90% 30%, #cfe0ff 0%, transparent 55%), linear-gradient(160deg, #f6ecff, #e7f0ff)',
    thumb: 'radial-gradient(60px 40px at 20% 20%, #ffd6ec, transparent), radial-gradient(60px 40px at 80% 40%, #cfe0ff, transparent), linear-gradient(160deg, #f6ecff, #e7f0ff)',
  },
  {
    id: 'mint',
    label: 'Mint',
    bg: 'linear-gradient(160deg, #e8fbf3 0%, #dff0ff 55%, #f3e9ff 100%)',
    thumb: 'linear-gradient(160deg, #e8fbf3, #dff0ff 55%, #f3e9ff)',
  },
  {
    id: 'sunset',
    label: 'Sunset',
    bg: 'linear-gradient(160deg, #ffe7d6 0%, #ffd6e6 45%, #d9d6ff 100%)',
    thumb: 'linear-gradient(160deg, #ffe7d6, #ffd6e6 45%, #d9d6ff)',
  },
  {
    id: 'mountains',
    label: 'Dağlar',
    bg: "linear-gradient(180deg, rgba(8,9,12,0.35), rgba(6,7,10,0.7)), url('/mountains-bg.png') center / cover no-repeat fixed",
    thumb: "url('/mountains-bg.png') center / cover",
  },
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
