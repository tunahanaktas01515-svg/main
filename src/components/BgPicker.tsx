import { useLang } from '../i18n';

export type BgOption = {
  id: string;
  label: string;
  bg: string;
  thumb: string;
};

const g = (v: string): BgOption['bg'] => v;

// Electron paketinde sayfa file:// üzerinden yüklendiği için public varlıklara
// mutlak ("/x.png") değil, taban yoluna göre erişilmelidir.
const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

export const BACKGROUNDS: BgOption[] = [
  { id: 'glass', label: 'Işıltı', bg: `url('${asset('glass-bg.png')}') center / cover no-repeat fixed`, thumb: `url('${asset('glass-bg.png')}') center / cover` },
  { id: 'aurora', label: 'Aurora', bg: 'radial-gradient(1200px 700px at 15% 10%, #ffd6ec 0%, transparent 55%), radial-gradient(1000px 700px at 90% 30%, #cfe0ff 0%, transparent 55%), linear-gradient(160deg, #f6ecff, #e7f0ff)', thumb: 'radial-gradient(60px 40px at 20% 20%, #ffd6ec, transparent), radial-gradient(60px 40px at 80% 40%, #cfe0ff, transparent), linear-gradient(160deg, #f6ecff, #e7f0ff)' },
  { id: 'mint', label: 'Mint', bg: g('linear-gradient(160deg, #e8fbf3 0%, #dff0ff 55%, #f3e9ff 100%)'), thumb: 'linear-gradient(160deg, #e8fbf3, #dff0ff 55%, #f3e9ff)' },
  { id: 'sunset', label: 'Sunset', bg: g('linear-gradient(160deg, #ffe7d6 0%, #ffd6e6 45%, #d9d6ff 100%)'), thumb: 'linear-gradient(160deg, #ffe7d6, #ffd6e6 45%, #d9d6ff)' },
  { id: 'peach', label: 'Peach', bg: g('linear-gradient(160deg, #ffe3e3 0%, #fff0d9 50%, #ffe9f4 100%)'), thumb: 'linear-gradient(160deg, #ffe3e3, #fff0d9 50%, #ffe9f4)' },
  { id: 'sky', label: 'Gökyüzü', bg: g('linear-gradient(160deg, #d7ecff 0%, #eaf3ff 50%, #f4ecff 100%)'), thumb: 'linear-gradient(160deg, #d7ecff, #eaf3ff 50%, #f4ecff)' },
  { id: 'lavender', label: 'Lavanta', bg: g('linear-gradient(160deg, #efe6ff 0%, #e6ebff 55%, #ffe9f6 100%)'), thumb: 'linear-gradient(160deg, #efe6ff, #e6ebff 55%, #ffe9f6)' },
  { id: 'lime', label: 'Limon', bg: g('linear-gradient(160deg, #f2fbd9 0%, #e3f7ea 55%, #dff0ff 100%)'), thumb: 'linear-gradient(160deg, #f2fbd9, #e3f7ea 55%, #dff0ff)' },
  { id: 'coral', label: 'Mercan', bg: g('radial-gradient(900px 600px at 20% 15%, #ffd9d0 0%, transparent 55%), linear-gradient(160deg, #fff0ea, #ffe6f0)'), thumb: 'radial-gradient(60px 40px at 25% 20%, #ffd9d0, transparent), linear-gradient(160deg, #fff0ea, #ffe6f0)' },
  { id: 'ocean', label: 'Okyanus', bg: g('radial-gradient(900px 600px at 80% 20%, #bfe6ff 0%, transparent 55%), linear-gradient(160deg, #e6f5ff, #eaf0ff)'), thumb: 'radial-gradient(60px 40px at 75% 25%, #bfe6ff, transparent), linear-gradient(160deg, #e6f5ff, #eaf0ff)' },
  { id: 'bubblegum', label: 'Şeker', bg: g('linear-gradient(135deg, #ffd6ec 0%, #d6e4ff 100%)'), thumb: 'linear-gradient(135deg, #ffd6ec, #d6e4ff)' },
  { id: 'graphite', label: 'Grafit', bg: g('linear-gradient(160deg, #2a2f3a 0%, #1b1f29 100%)'), thumb: 'linear-gradient(160deg, #2a2f3a, #1b1f29)' },
  { id: 'midnight', label: 'Gece', bg: g('radial-gradient(900px 600px at 20% 15%, #3a2f5a 0%, transparent 55%), linear-gradient(160deg, #14162a, #0c0e1c)'), thumb: 'radial-gradient(60px 40px at 25% 20%, #3a2f5a, transparent), linear-gradient(160deg, #14162a, #0c0e1c)' },
  { id: 'mountains', label: 'Dağlar', bg: `linear-gradient(180deg, rgba(8,9,12,0.35), rgba(6,7,10,0.7)), url('${asset('mountains-bg.png')}') center / cover no-repeat fixed`, thumb: `url('${asset('mountains-bg.png')}') center / cover` },
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
