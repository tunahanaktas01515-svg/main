import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

/**
 * Menü verisinde string olarak tutulan ikon adını (örn. "Newspaper")
 * gerçek lucide-react bileşenine dönüştürüp render eder.
 */
export function DynamicIcon({ name, ...rest }: DynamicIconProps) {
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name];

  if (!IconComponent) return null;

  return <IconComponent {...rest} />;
}
