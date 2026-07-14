"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SubscriptionProvider>{children}</SubscriptionProvider>
    </LanguageProvider>
  );
}
