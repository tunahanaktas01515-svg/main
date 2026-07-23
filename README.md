# Cenan — Muhasebe & İhracat Paneli

Cenan, muhasebe ve ihracat süreçlerini yöneten, uygulama (app) benzeri bir web panelidir. React + Vite + TypeScript ile geliştirilmiştir; ileride mobil/masaüstü uygulamaya dönüştürülebilecek şekilde tasarlanmıştır.

## Özellikler

### Sayfa ikonları (üst menü)

Menüde yazı yerine 4 ikon bulunur; imleç üzerine geldiğinde ikonun sağında yazı soldan sağa açılır.

- **Cenan** — tel-örgü çiçek ikonu. Üzerine gelince içe doğru küçülüp tekrar büyür, ardından "Cenan" yazısı açılır. (Ana panel)
- **İşlemler** — siyah ev ikonu. Üzerine gelince etrafına beyaz ışık yayılır ve imleç ayrılmadıkça bacadan sürekli duman çıkar; "İşlemler" yazısı açılır.
- **Borsa** — küre/pervane ikonu. Üzerine gelince küre sağa açılıp yerine geri döner; "Borsa" yazısı açılır.
- **Ajanlar** — dünya ikonu. İkon animasyonu yoktur; sadece "Ajanlar" yazısı açılır.

### Üst bar

- Arama ikonu kaldırıldı.
- Ayarlar ve profil ikonu; üzerine gelince çevrelerine beyaz ışık yayar.
- Varsayılan profil görseli: yıldızlı çöp-adam avatarı.

### Ana panel

- "Hoşgeldin, Ayşe!" karşılaması.
- **Günlük İş Geçmişi** — o gün yapılan işleri noktalarla gösteren zaman çizelgesi.
- **Bugün Kullanılan Kredi** ve **Kalan Kredi** kutuları.
- **Ekstreler** kutusu: sol üstte şeffaf arka planlı siyah sepet ikonu + "Ekstremelerim", sağ üstte küçük **iyzico** etiketi; ekstre geçmişi + otonom ödemeler.
- **Borsa** butonu (Borsa sayfasına gider) ve piyasa kartları.

### Sayfalar

`Cenan` (panel), `İşlemler`, `Borsa`, `Ajanlar`.

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tip kontrol + üretim derlemesi
npm run lint     # oxlint
```

> Not: Bazı ikon hareketleri (küçülme/büyüme, kayma, duman) `transform` yerine `width/height`, `top/left`, `opacity` gibi özelliklerle yapılmıştır; böylece her ortamda güvenilir şekilde çalışır.
