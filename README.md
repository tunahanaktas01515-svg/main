# Cenan

Yapay zeka destekli muhasebe işlemleri ve ihracat destek platformu için koyu temalı, glassmorphism ağırlıklı masaüstü uygulama arayüzü.

Bu proje sadece frontend içerir (backend yoktur). Saf web teknolojileriyle (React + Vite) geliştirilmiştir ve `electron/` altındaki ince bir kabukla Windows, macOS ve Linux için masaüstü uygulaması olarak paketlenebilir.

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

## Masaüstü Uygulaması (Electron)

```bash
npm run electron:dev       # Vite dev sunucusu + Electron penceresi (HMR çalışır)
npm run electron:preview   # üretim derlemesini paketlemeden Electron'da açar
npm run electron:build     # mevcut işletim sistemi için kurulum dosyası üretir
```

Belirli bir platformu hedeflemek için `electron:build:win`, `electron:build:mac` veya
`electron:build:linux` kullanılır. Çıktılar `release/` klasörüne yazılır: Windows'ta NSIS
kurulumu, macOS'ta dmg + zip, Linux'ta AppImage + deb (x64 ve arm64).

Kod imzalama ve çapraz derleme kısıtları nedeniyle her platformun kurulum dosyasını
kendi işletim sisteminde üretmek en güvenilir yoldur.

### Nasıl çalışıyor?

- `electron/main.cjs` — ana süreç. Geliştirmede Vite dev sunucusunu yükler; üretimde
  `dist` klasörünü servis eden özel bir `app://` şeması kaydeder. Bu şema sayesinde
  arayüzdeki `/orb/orb.webp` gibi mutlak yollar `file://` protokolündeki gibi bozulmaz,
  yani arayüz kodunda hiçbir değişiklik gerekmez.
- `electron/preload.cjs` — yalıtılmış bağlamda çalışan, salt okunur `window.cenanDesktop`
  bilgisini açan köprü. Node API'leri sayfaya sızmaz.
- `electron/dev.mjs` — Vite'ı Node API'siyle başlatıp gerçek adresini Electron'a geçiren
  ve iki süreci birlikte kapatan geliştirme başlatıcısı.
- `electron-builder.yml` — paketleme yapılandırması. Arayüz Vite tarafından `dist` içine
  toplandığı için `node_modules` paketlenmez; uygulama arşivi yaklaşık 2 MB'tır.

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
