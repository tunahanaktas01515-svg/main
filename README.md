# Cenan — Muhasebe & İhracat Paneli

Cenan, muhasebe ve ihracat süreçlerini yöneten, uygulama (app) benzeri bir web panelidir. React + Vite + TypeScript ile geliştirilmiştir; ileride mobil/masaüstü uygulamaya dönüştürülebilecek şekilde tasarlanmıştır.

## Özellikler

### Sayfa ikonları (üst menü)

Menüde yazı yerine 4 ikon bulunur; imleç üzerine geldiğinde ikonun sağında yazı soldan sağa açılır.

- **Ev** — en solda, siyah bacalı ev ikonu (ana panel). Üzerine gelince etrafına beyaz ışık yayılır ve imleç ayrılmadıkça bacadan sürekli duman çıkar; "Ev" yazısı açılır.
- **İşlemler** — halka + sap (lollipop) ikonu. Üzerine gelince halka hafifçe zıplayıp geri gelir, etrafına beyaz ışık yayılır; "İşlemler" yazısı açılır.
- **Borsa** — dünya küre ikonu; "Borsa" yazısı açılır.
- **Ajanlar** — çiçek/küre ikonu. Üzerine gelince küre sağa açılıp yerine döner; "Ajanlar" yazısı açılır.

### Üst bar

- Ayarların **soluna** TR/EN **dil değiştirici** eklendi (tüm arayüz Türkçe ↔ İngilizce).
- Ayarlar ve profil ikonu; üzerine gelince çevrelerine beyaz ışık yayar.
- Varsayılan profil görseli: yıldızlı çöp-adam avatarı.

### Ana panel (Ev)

- "Hoşgeldin, Ayşe!" karşılaması.
- **Hızlı Bakış** — 4 mini istatistik kartı (fatura, ihracat, tahsilat, aktif ajan).
- **Günlük İş Akışı** — o gün tamamlanan işleri renkli, etiketli satırlarla gösteren zaman çizelgesi.
- **Bugün Kullanılan Kredi** ve **Kalan Kredi** kutuları.
- **Ekstremelerim** kutusu: sol üstte şeffaf arka planlı siyah sepet ikonu + başlık, sağ üstte küçük **iyzico** etiketi; ekstre geçmişi + otonom ödemeler.
- **Borsa** butonu (Borsa sayfasına gider) ve piyasa kartları.

### Sayfalar

`Ev` (panel), `İşlemler`, `Borsa`, `Ajanlar`. Arayüz TR/EN olarak çevrilebilir.

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tip kontrol + üretim derlemesi
npm run lint     # oxlint
```

> Not: Bazı ikon hareketleri (küçülme/büyüme, kayma, duman) `transform` yerine `width/height`, `top/left`, `opacity` gibi özelliklerle yapılmıştır; böylece her ortamda güvenilir şekilde çalışır.
