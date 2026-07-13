import type { AnalysisResult, Locale } from "@/lib/types";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatNumber(n: number, locale: Locale): string {
  const map: Record<Locale, string> = {
    tr: "tr-TR",
    en: "en-US",
    de: "de-DE",
    fr: "fr-FR",
    it: "it-IT",
    es: "es-ES",
    ru: "ru-RU",
    ar: "ar-SA",
    zh: "zh-CN",
    ja: "ja-JP",
  };
  return new Intl.NumberFormat(map[locale]).format(n);
}

export function formatPrice(
  amount: number,
  currency: string,
  locale: Locale
): string {
  const map: Record<Locale, string> = {
    tr: "tr-TR",
    en: "en-US",
    de: "de-DE",
    fr: "fr-FR",
    it: "it-IT",
    es: "es-ES",
    ru: "ru-RU",
    ar: "ar-SA",
    zh: "zh-CN",
    ja: "ja-JP",
  };
  return new Intl.NumberFormat(map[locale], {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const summaries: Record<Locale, (name: string) => string> = {
  tr: (name) =>
    `${name} analizi tamamlandı. Model baskıya uygun görünüyor; zayıf noktalar ve önerilen ayarlar aşağıda. PETG veya ABS ile daha dayanıklı sonuç alabilirsiniz.`,
  en: (name) =>
    `Analysis of ${name} is complete. The model looks printable; weak points and recommended settings are below. PETG or ABS will yield more durable results.`,
  de: (name) =>
    `Analyse von ${name} abgeschlossen. Das Modell ist druckbar; Schwachstellen und Einstellungen siehe unten.`,
  fr: (name) =>
    `Analyse de ${name} terminée. Le modèle est imprimable ; points faibles et réglages ci-dessous.`,
  it: (name) =>
    `Analisi di ${name} completata. Il modello è stampabile; punti deboli e impostazioni sotto.`,
  es: (name) =>
    `Análisis de ${name} completado. El modelo es imprimible; puntos débiles y ajustes abajo.`,
  ru: (name) =>
    `Анализ ${name} завершён. Модель пригодна к печати; слабые места и настройки ниже.`,
  ar: (name) =>
    `اكتمل تحليل ${name}. النموذج قابل للطباعة؛ نقاط الضعف والإعدادات أدناه.`,
  zh: (name) =>
    `${name} 分析完成。模型可打印；弱点与建议设置见下方。`,
  ja: (name) =>
    `${name} の分析が完了しました。印刷可能です。弱点と推奨設定は以下です。`,
};

const weakByLocale: Record<Locale, string[]> = {
  tr: [
    "İnce duvar bölgelerinde katman ayrılması riski",
    "Desteksiz overhang açıları 55° üzeri",
    "Montaj delikleri etrafında stres yoğunlaşması",
  ],
  en: [
    "Layer separation risk on thin walls",
    "Unsupported overhangs above 55°",
    "Stress concentration around mounting holes",
  ],
  de: [
    "Schichtrennung an dünnen Wänden möglich",
    "Überhänge über 55° ohne Stützen",
    "Spannung um Montagebohrungen",
  ],
  fr: [
    "Risque de délamination sur parois fines",
    "Surplombs >55° sans supports",
    "Concentration de contrainte autour des trous",
  ],
  it: [
    "Rischio delaminazione su pareti sottili",
    "Sbalzi >55° senza supporti",
    "Stress intorno ai fori di montaggio",
  ],
  es: [
    "Riesgo de delaminación en paredes finas",
    "Voladizos >55° sin soportes",
    "Estrés alrededor de orificios",
  ],
  ru: [
    "Риск расслоения на тонких стенках",
    "Свесы >55° без поддержек",
    "Концентрация напряжений у отверстий",
  ],
  ar: [
    "خطر انفصال الطبقات في الجدران الرقيقة",
    "بروزات فوق 55° بدون دعامات",
    "تركز إجهاد حول فتحات التثبيت",
  ],
  zh: ["薄壁处有分层风险", "超过55°的悬垂需支撑", "安装孔周围应力集中"],
  ja: [
    "薄壁での層間剥離リスク",
    "55°超のオーバーハングにサポート必要",
    "取付穴周辺の応力集中",
  ],
};

const improveByLocale: Record<Locale, string[]> = {
  tr: [
    "Kritik bölgelerde duvar kalınlığını 0.4–0.8 mm artırın",
    "Montaj bölgelerine fileto / chamfer ekleyin",
    "Baskı yönünü dayanım eksenine göre çevirin",
    "İç boşluklara gyroid %20–30 infill kullanın",
  ],
  en: [
    "Increase wall thickness by 0.4–0.8 mm in critical areas",
    "Add fillets/chamfers around mounts",
    "Orient print for strength along load axis",
    "Use gyroid 20–30% infill in cavities",
  ],
  de: [
    "Wandstärke in kritischen Bereichen erhöhen",
    "Verrundungen an Montagepunkten",
    "Druckrichtung an Lastachse anpassen",
    "Gyroid 20–30% Infill nutzen",
  ],
  fr: [
    "Augmenter l'épaisseur des parois critiques",
    "Ajouter congés aux points de fixation",
    "Orienter l'impression selon la charge",
    "Infill gyroid 20–30%",
  ],
  it: [
    "Aumentare spessore pareti critiche",
    "Aggiungere raccordi sui supporti",
    "Orientare la stampa lungo il carico",
    "Infill gyroid 20–30%",
  ],
  es: [
    "Aumentar espesor en zonas críticas",
    "Añadir filetes en montajes",
    "Orientar impresión según carga",
    "Relleno gyroid 20–30%",
  ],
  ru: [
    "Увеличить толщину стенок в критических зонах",
    "Добавить скругления у креплений",
    "Ориентировать печать по нагрузке",
    "Gyroid заполнение 20–30%",
  ],
  ar: [
    "زيادة سماكة الجدران في المناطق الحرجة",
    "إضافة شطف عند نقاط التثبيت",
    "توجيه الطباعة حسب محور الحمل",
    "حشو gyroid بنسبة 20–30%",
  ],
  zh: [
    "关键区域壁厚增加0.4–0.8mm",
    "安装处添加圆角/倒角",
    "按受力方向调整打印朝向",
    "空腔使用20–30% gyroid填充",
  ],
  ja: [
    "重要部の壁厚を0.4–0.8mm増やす",
    "取付部にフィレットを追加",
    "荷重軸に合わせて向きを調整",
    "空洞は gyroid 20–30% 充填",
  ],
};

export function simulateAnalysis(
  fileName: string,
  fileSize: number,
  locale: Locale
): AnalysisResult {
  const h = hashString(fileName + fileSize);
  const ext = fileName.split(".").pop()?.toLowerCase() || "stl";
  const x = 40 + (h % 120);
  const y = 30 + ((h >> 3) % 100);
  const z = 10 + ((h >> 7) % 80);
  const volume = (x * y * z) / 1000;
  const grams = Math.round(volume * 1.24);
  const costTry = Math.round(grams * 0.85 * 100) / 100;

  return {
    fileName,
    fileType: ext.toUpperCase(),
    dimensions: { x, y, z, unit: "mm" },
    volumeCm3: Math.round(volume * 10) / 10,
    estimatedWeightG: grams,
    weakPoints: weakByLocale[locale],
    improvements: improveByLocale[locale],
    printerSettings: {
      layerHeight: "0.16–0.20 mm",
      infill: "20–30% gyroid",
      supports: locale === "tr" ? "Ağaç / normal (overhang >50°)" : "Tree / normal (overhang >50°)",
      nozzleTemp: "PETG 240°C / PLA 210°C",
      bedTemp: "PETG 80°C / PLA 60°C",
      printSpeed: "50–80 mm/s",
    },
    filamentCost: {
      material: "PETG",
      grams,
      costTry,
    },
    summary: summaries[locale](fileName),
  };
}

export function simulateAiReply(question: string, locale: Locale): string {
  const replies: Record<Locale, string> = {
    tr: `MakerAI: "${question}" için önerim — PETG veya ABS tercih edin, kritik bağlantılarda %40+ infill ve 4 duvar kullanın. Katman yüksekliği 0.16–0.2 mm, destekleri overhang >50° bölgelerde açın. Filament kurutulmuş olsun.`,
    en: `MakerAI: For "${question}" — prefer PETG or ABS, use 40%+ infill and 4 walls on critical joints. Layer height 0.16–0.2 mm, enable supports above 50° overhangs. Keep filament dry.`,
    de: `MakerAI: Zu "${question}" — PETG/ABS, 40%+ Infill und 4 Wände an kritischen Stellen. Schichthöhe 0.16–0.2 mm.`,
    fr: `MakerAI: Pour "${question}" — préférez PETG/ABS, 40%+ rempli et 4 parois aux joints critiques.`,
    it: `MakerAI: Per "${question}" — preferisci PETG/ABS, infill 40%+ e 4 pareti sui giunti critici.`,
    es: `MakerAI: Para "${question}" — usa PETG/ABS, relleno 40%+ y 4 paredes en uniones críticas.`,
    ru: `MakerAI: По запросу "${question}" — PETG/ABS, заполнение 40%+ и 4 стенки в критических местах.`,
    ar: `MakerAI: بخصوص "${question}" — فضّل PETG أو ABS، حشو 40%+ و4 جدران في المفاصل الحرجة.`,
    zh: `MakerAI：关于“${question}”——建议PETG/ABS，关键连接处40%+填充和4层壁厚。`,
    ja: `MakerAI: 「${question}」について — PETG/ABSを推奨。重要接合部は充填40%以上・壁4周。`,
  };
  return replies[locale];
}