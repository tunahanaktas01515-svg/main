import type { SurfaceTheme } from '../types';

/**
 * İkonların ve cam blokların dokusunu belirleyen 5 yüzey teması.
 * Seçim `<html data-surface>` üzerinden CSS değişkenlerine uygulanır.
 */
export const surfaceThemes: SurfaceTheme[] = [
  {
    id: 'glass',
    nameKey: 'surface.glass.name',
    descriptionKey: 'surface.glass.desc',
    preview: 'border-white/25 bg-white/[0.12] backdrop-blur-xl',
  },
  {
    id: 'metallic',
    nameKey: 'surface.metallic.name',
    descriptionKey: 'surface.metallic.desc',
    preview:
      'border-white/30 bg-[linear-gradient(150deg,rgba(255,255,255,0.32),rgba(255,255,255,0.04)_48%,rgba(255,255,255,0.24))]',
  },
  {
    id: 'iconic',
    nameKey: 'surface.iconic.name',
    descriptionKey: 'surface.iconic.desc',
    preview: 'border-indigo-400/50 bg-indigo-500/35',
  },
  {
    id: 'white',
    nameKey: 'surface.white.name',
    descriptionKey: 'surface.white.desc',
    preview: 'border-white/50 bg-white/35',
  },
  {
    id: 'transparent',
    nameKey: 'surface.transparent.name',
    descriptionKey: 'surface.transparent.desc',
    preview: 'border-white/30 bg-transparent',
  },
];
