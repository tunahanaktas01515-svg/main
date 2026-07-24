import {
  Calculator,
  CandlestickChart,
  FileCheck2,
  FileSearch,
  Landmark,
  Newspaper,
  Radar,
  Receipt,
  Scale,
  Ship,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

/**
 * Veri dosyalarında string olarak tutulan ikon adlarını gerçek bileşene bağlayan kayıt.
 * Tüm lucide paketini import etmek yerine açık liste kullanılır — bundle boyutu küçük kalır.
 */
const iconRegistry: Record<string, LucideIcon> = {
  Calculator,
  CandlestickChart,
  FileCheck2,
  FileSearch,
  Landmark,
  Newspaper,
  Radar,
  Receipt,
  Scale,
  Ship,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export function DynamicIcon({ name, ...rest }: DynamicIconProps) {
  const IconComponent = iconRegistry[name];
  if (!IconComponent) return null;
  return <IconComponent {...rest} />;
}
