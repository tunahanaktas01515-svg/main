import type { BackgroundOption } from '../types';

/**
 * Uygulama arka planı seçenekleri. Görsel dosyası kullanmak yerine
 * katmanlı radial/linear gradientlerle "liquid" abstract efektler üretiliyor.
 * Bu sayede dış görsel bağımlılığı olmadan premium bir görünüm sağlanıyor.
 */
export const backgroundOptions: BackgroundOption[] = [
  {
    id: 'bg-default',
    name: 'Varsayılan Nova',
    className:
      'bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.35),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.3),transparent_50%),radial-gradient(circle_at_50%_85%,rgba(59,130,246,0.25),transparent_55%),#050505]',
  },
  {
    id: 'bg-liquid-purple',
    name: 'Liquid Purple',
    className:
      'bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.45),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.4),transparent_55%),linear-gradient(135deg,#0a0a12,#050505)]',
  },
  {
    id: 'bg-deep-ocean',
    name: 'Deep Ocean',
    className:
      'bg-[radial-gradient(circle_at_20%_80%,rgba(37,99,235,0.4),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(30,64,175,0.35),transparent_50%),linear-gradient(160deg,#020617,#050505)]',
  },
  {
    id: 'bg-violet-mist',
    name: 'Violet Mist',
    className:
      'bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.35),transparent_45%),radial-gradient(circle_at_10%_90%,rgba(79,70,229,0.3),transparent_50%),#060608]',
  },
  {
    id: 'bg-aurora',
    name: 'Aurora Flow',
    className:
      'bg-[radial-gradient(circle_at_75%_75%,rgba(56,189,248,0.28),transparent_50%),radial-gradient(circle_at_25%_25%,rgba(129,140,248,0.35),transparent_50%),linear-gradient(200deg,#04040a,#050505)]',
  },
  {
    id: 'bg-nebula',
    name: 'Nebula Noise',
    className:
      'bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,0.4),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(14,116,144,0.3),transparent_50%),#040406]',
  },
  {
    id: 'bg-midnight',
    name: 'Midnight Indigo',
    className:
      'bg-[radial-gradient(circle_at_50%_100%,rgba(67,56,202,0.4),transparent_55%),radial-gradient(circle_at_50%_0%,rgba(30,27,75,0.5),transparent_55%),#020203]',
  },
  {
    id: 'bg-plasma',
    name: 'Plasma Drift',
    className:
      'bg-[radial-gradient(circle_at_10%_10%,rgba(236,72,153,0.22),transparent_40%),radial-gradient(circle_at_90%_30%,rgba(99,102,241,0.35),transparent_50%),radial-gradient(circle_at_40%_90%,rgba(59,130,246,0.28),transparent_50%),#050506]',
  },
];
