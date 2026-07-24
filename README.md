# Cenan

Yapay zeka destekli muhasebe işlemleri ve ihracat destek platformu için koyu temalı, glassmorphism ağırlıklı masaüstü uygulama arayüzü.

Bu proje sadece frontend içerir (backend yoktur) ve Electron/Tauri gibi bir kabukla sarılabilecek şekilde saf web teknolojileriyle (React + Vite) geliştirilmiştir.

## Teknoloji Yığını

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (CSS-first konfigürasyon, `@theme` ve `@custom-variant dark`)
- Framer Motion (animasyonlar)
- Lucide React (ikonlar)
- clsx + tailwind-merge (`cn` yardımcı fonksiyonu)

## Başlarken

```bash
npm install
npm run dev      # geliştirme sunucusu (http://localhost:5173)
npm run build    # üretim derlemesi
npm run preview  # üretim derlemesini önizleme
```

Uygulama sadece masaüstü genişlikleri için tasarlanmıştır (min-width: 1280px), responsive değildir.

## Proje Yapısı

```
src/
  components/
    layout/      TopBar, Sidebar, AppBackground
    chat/        ChatPanel, ChatInputBar, ModelSelector, VoiceAssistantOverlay, UploadMenu
    news/        NewsGrid, NewsCard, FeaturedNewsCard, MarketSummary
    background/  BackgroundSelectorModal
    ui/          GlassPanel, IconButton, Avatar, GlassProgressBar, Skeleton, DynamicIcon
  pages/         HomePage, NewsPage, CenanPage, DeepWebPage
  context/       AppContext (global state: sayfa, tema, arka plan, sohbet)
  data/          Mock veriler (haberler, borsa, sidebar menüsü, Cenan özellikleri, modeller)
  lib/           cn (className birleştirici), useClickOutside
  types/         Paylaşılan TypeScript tipleri
```

## Özellikler

- Üst bar: tema butonu, oval sayfa sekmeleri (Ana Sayfa / Cenan / Haberler / Deep Web), arka plan seçici, profil
- Sol sidebar: profil popover'ı, "Ana" ve "Cenan" menü grupları
- Cenan modülleri (Fatura Analizi, Banka Mutabakatı, KDV Hesabı) seçildiğinde sağdaki sohbet paneline otomatik sistem promptu enjekte edilir
- Her zaman görünür yapay zeka sohbet paneli: model seçici, mesaj geçmişi, dosya/fotoğraf yükleme (simüle edilmiş ilerleme çubuğu ile), sesli asistan orb animasyonu
- Kalem ikonuyla açılan, CSS gradient tabanlı "liquid" arka plan seçici modal
