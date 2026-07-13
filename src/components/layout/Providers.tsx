"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CompareProvider } from "@/context/CompareContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/layout/Header";
import { SideBanner } from "@/components/layout/SideBanner";
import { useLanguage } from "@/context/LanguageContext";

function Shell({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <SideBanner />
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
      <footer className="border-t border-[var(--border)] py-4 text-center text-xs text-[var(--text-muted)]">
        © {new Date().getFullYear()} MakerAI Hub — {t("footer.rights")}
      </footer>
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CompareProvider>
          <Shell>{children}</Shell>
        </CompareProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}