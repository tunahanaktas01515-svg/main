export interface Feature {
  id: string
  title: string
  desc: string
  question: string
  answer: string
  icon: string
}

export const MUHASEBE_FEATURES: Feature[] = [
  {
    id: 'fatura',
    title: 'Fatura ve Gider Fişi Okutma',
    desc: 'Fotoğraf veya PDF yükle, saniyeler içinde sisteme işlensin. Manuel giriş derdine son.',
    question: 'Bu faturayı sisteme işler misin?',
    answer: 'Fatura okundu: KDV %20, matrah 12.500 ₺, toplam 15.000 ₺ olarak kaydedildi.',
    icon: 'invoice',
  },
  {
    id: 'mutabakat',
    title: 'Otomatik Banka Mutabakatı',
    desc: 'Banka ekstresini yükle, sistem kendisi eşleştirsin. Uyuşmayanları otomatik işaretlesin.',
    question: 'Banka ekstresini mutabakat yapar mısın?',
    answer: '128 hareketin 124’ü eşleşti. 4 uyuşmayan kayıt işaretlendi.',
    icon: 'bank',
  },
  {
    id: 'anomali',
    title: 'Akıllı Anomali ve Hata Tespiti',
    desc: '“Bu fatura normalden çok yüksek”, “Bu ödeme şüpheli” diye uyarsın. Gözden kaçanı yakalasın.',
    question: 'Şüpheli işlem var mı?',
    answer: '2 anomali: bir fatura ortalamanın %340 üzerinde, bir ödeme tekrarlanmış görünüyor.',
    icon: 'alert',
  },
  {
    id: 'sesli',
    title: 'Sesli Asistan ile İşlem',
    desc: '“Bu ayki KDV ne kadar?”, “Şu carinin borcu ne?” diye sor, anında cevap alsın.',
    question: 'Bu ayki KDV ne kadar?',
    answer: 'Temmuz KDV: hesaplanan 42.800 ₺, indirilecek 31.500 ₺, ödenecek 11.300 ₺.',
    icon: 'mic',
  },
  {
    id: 'oneri',
    title: 'Akıllı Fiş ve Kayıt Önerisi',
    desc: 'Sistem “Bu faturayı şöyle kaydet” diye öneri sunsun. Karar vermeyi kolaylaştırsın.',
    question: 'Bu faturayı nasıl kaydederim?',
    answer: 'Öneri: 770 Genel Yönetim Gideri / 191 İndirilecek KDV olarak fişlenmeli.',
    icon: 'suggest',
  },
]

export const IHRACAT_FEATURES: Feature[] = [
  {
    id: 'gtip',
    title: 'GTİP Kodu Önerisi',
    desc: 'Ürünü yaz, en doğru GTİP kodunu önersin. Yanlış kod riskini azaltır.',
    question: 'Zeytinyağının GTİP kodu ne?',
    answer: 'Önerilen GTİP: 1509.10.20 — Sızma zeytinyağı. Alternatif: 1509.10.80.',
    icon: 'code',
  },
  {
    id: 'belge',
    title: 'İhracat Belge Kontrol Listesi',
    desc: 'Eksik evrakı otomatik tespit etsin ve uyarsın. Gümrükte takılma riskini düşürsün.',
    question: 'Eksik evrağım var mı?',
    answer: 'Eksik: ATR belgesi ve menşe şahadetnamesi. Fatura ve çeki listesi tamam.',
    icon: 'checklist',
  },
  {
    id: 'risk',
    title: 'Hedef Ülke Risk Analizi',
    desc: 'Ülkeye göre siyasi, ekonomik ve gümrük risklerini özetlesin.',
    question: 'Almanya’ya ihracat riskleri neler?',
    answer: 'Düşük risk. CE zorunlu, ödeme güvenli. Gümrükte ATR ile vergi avantajı var.',
    icon: 'globe',
  },
  {
    id: 'kur',
    title: 'Kur Farkı ve Döviz Hesaplama',
    desc: 'İhracat faturalarında otomatik kur farkı hesaplasın, muhasebe kaydını kolaylaştırsın.',
    question: '10.000 € faturanın kur farkını hesapla',
    answer: 'Fatura kuru 35,20 ₺, tahsilat kuru 35,90 ₺ → 7.000 ₺ lehte kur farkı.',
    icon: 'exchange',
  },
  {
    id: 'dosya',
    title: 'İhracat Dosyası Hazırlık Asistanı',
    desc: '“Bu dosya için hangi belgeler lazım?” diye sorsun, eksikleri listelesin.',
    question: 'Bu dosya için hangi belgeler lazım?',
    answer: 'Gerekli: ticari fatura, çeki listesi, ATR, menşe şahadetnamesi, konşimento.',
    icon: 'folder',
  },
]

export interface Integration {
  name: string
  status: 'soon'
}

export const INTEGRATIONS: Integration[] = [
  { name: 'Logo', status: 'soon' },
  { name: 'Paraşüt', status: 'soon' },
  { name: 'Zirve', status: 'soon' },
  { name: 'Excel', status: 'soon' },
  { name: 'İhracat Uygulamaları', status: 'soon' },
]

/** Cycling ad-style prompt/answer pairs for the animated demo */
export const AD_CONVOS: { q: string; a: string }[] = [
  { q: 'Bu ayki KDV ne kadar?', a: 'Ödenecek KDV: 11.300 ₺. Geçen aya göre %8 düşük.' },
  { q: 'Şu faturayı sisteme işle', a: 'İşlendi ✓ Matrah 12.500 ₺, KDV 2.500 ₺.' },
  { q: 'Almanya’ya ihracat riski?', a: 'Düşük risk. ATR ile vergi avantajı mevcut.' },
  { q: 'Bu carinin borcu ne?', a: 'Yıldız Ltd. bakiyesi: 48.750 ₺ borç.' },
  { q: 'Zeytinyağı GTİP kodu?', a: 'Önerilen: 1509.10.20 — Sızma zeytinyağı.' },
]
