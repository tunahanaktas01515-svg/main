import type { BackgroundOption } from '../types';

/**
 * Arka plan seçenekleri.
 * İlk grup: abstract liquid / ocean / purple blur görselleri (public/backgrounds).
 * İkinci grup: katmanlı radial + linear gradientlerden oluşan CSS tabanlı arka planlar.
 */
export const backgroundOptions: BackgroundOption[] = [
  {
    id: 'nova',
    name: 'Nova',
    kind: 'gradient',
    className:
      'bg-[radial-gradient(60%_50%_at_12%_10%,rgba(99,102,241,0.34),transparent_60%),radial-gradient(55%_45%_at_88%_8%,rgba(139,92,246,0.28),transparent_60%),radial-gradient(70%_60%_at_50%_100%,rgba(59,130,246,0.22),transparent_65%),linear-gradient(180deg,#060608,#050505)]',
  },
  {
    id: 'liquid-purple',
    name: 'Liquid Purple',
    kind: 'image',
    src: '/backgrounds/bg_liquid_purple.webp',
    thumb: '/backgrounds/thumbs/bg_liquid_purple.webp',
    dim: 0.72,
  },
  {
    id: 'liquid-blue',
    name: 'Liquid Blue',
    kind: 'image',
    src: '/backgrounds/bg_liquid_blue.webp',
    thumb: '/backgrounds/thumbs/bg_liquid_blue.webp',
    dim: 0.68,
  },
  {
    id: 'aurora-mesh',
    name: 'Aurora Mesh',
    kind: 'image',
    src: '/backgrounds/bg_aurora_mesh.webp',
    thumb: '/backgrounds/thumbs/bg_aurora_mesh.webp',
    dim: 0.6,
  },
  {
    id: 'purple-bloom',
    name: 'Purple Bloom',
    kind: 'image',
    src: '/backgrounds/bg_purple_bloom.webp',
    thumb: '/backgrounds/thumbs/bg_purple_bloom.webp',
    dim: 0.55,
  },
  {
    id: 'ocean',
    name: 'Black Sand',
    kind: 'image',
    src: '/backgrounds/bg_ocean_black_sand.webp',
    thumb: '/backgrounds/thumbs/bg_ocean_black_sand.webp',
    dim: 0.7,
  },
  {
    id: 'obsidian',
    name: 'Obsidian Silk',
    kind: 'image',
    src: '/backgrounds/bg_obsidian_silk.webp',
    thumb: '/backgrounds/thumbs/bg_obsidian_silk.webp',
    dim: 0.5,
  },
  {
    id: 'midnight-indigo',
    name: 'Midnight Indigo',
    kind: 'gradient',
    className:
      'bg-[radial-gradient(65%_55%_at_50%_110%,rgba(67,56,202,0.45),transparent_60%),radial-gradient(55%_40%_at_50%_-10%,rgba(30,27,75,0.65),transparent_60%),linear-gradient(180deg,#04040a,#020203)]',
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    kind: 'gradient',
    className:
      'bg-[radial-gradient(60%_50%_at_18%_82%,rgba(37,99,235,0.38),transparent_60%),radial-gradient(50%_40%_at_82%_18%,rgba(30,64,175,0.34),transparent_60%),linear-gradient(160deg,#020617,#050505)]',
  },
  {
    id: 'plasma',
    name: 'Plasma Drift',
    kind: 'gradient',
    className:
      'bg-[radial-gradient(45%_35%_at_8%_12%,rgba(236,72,153,0.2),transparent_60%),radial-gradient(55%_45%_at_92%_28%,rgba(99,102,241,0.34),transparent_60%),radial-gradient(60%_50%_at_40%_95%,rgba(59,130,246,0.26),transparent_60%),linear-gradient(180deg,#060506,#050505)]',
  },
  {
    id: 'nebula',
    name: 'Nebula Noise',
    kind: 'gradient',
    className:
      'bg-[radial-gradient(50%_40%_at_28%_28%,rgba(124,58,237,0.4),transparent_60%),radial-gradient(55%_45%_at_72%_74%,rgba(14,116,144,0.3),transparent_60%),linear-gradient(200deg,#050408,#040406)]',
  },
  {
    id: 'graphite',
    name: 'Graphite',
    kind: 'gradient',
    className:
      'bg-[radial-gradient(70%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%),linear-gradient(180deg,#0b0b0d,#050505)]',
  },
];

export const defaultBackgroundId = backgroundOptions[0].id;
