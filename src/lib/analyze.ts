import type { AnalysisResult } from "./types";

/**
 * Deterministic pseudo-random generator so the same input always yields the
 * same "analysis". This keeps the demo believable without a backend.
 */
function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FILAMENTS = [
  {
    type: "PLA",
    reason:
      "Easy to print, low warping and great surface detail — ideal for display and prototype parts.",
    temp: "200–215 °C",
    bed: "55–60 °C",
  },
  {
    type: "PETG",
    reason:
      "Tougher and more heat-resistant than PLA with good layer adhesion — great for functional parts.",
    temp: "230–245 °C",
    bed: "70–80 °C",
  },
  {
    type: "ABS",
    reason:
      "High impact and heat resistance for mechanical or automotive parts (print in an enclosure).",
    temp: "240–255 °C",
    bed: "95–110 °C",
  },
  {
    type: "TPU 95A",
    reason:
      "Flexible and durable — perfect for grips, gaskets and shock-absorbing components.",
    temp: "220–235 °C",
    bed: "40–50 °C",
  },
];

const PALETTES = [
  [
    { name: "Galaxy Blue", hex: "#2f7bff" },
    { name: "Cyber Cyan", hex: "#22d3ee" },
    { name: "Graphite", hex: "#2b3242" },
  ],
  [
    { name: "Ember Orange", hex: "#ff7a1a" },
    { name: "Signal Red", hex: "#ff3b52" },
    { name: "Warm Sand", hex: "#e8c39e" },
  ],
  [
    { name: "Forest", hex: "#2f9e6f" },
    { name: "Lime Glow", hex: "#a3e635" },
    { name: "Charcoal", hex: "#1f2530" },
  ],
  [
    { name: "Royal Purple", hex: "#7c5cff" },
    { name: "Rose", hex: "#ff6fae" },
    { name: "Silver", hex: "#c8cfdd" },
  ],
];

const APPEARANCES = [
  "Smooth matte surface with crisp edges and subtle layer texture on curved faces.",
  "Glossy, premium look with sharp overhangs — visible layer lines only under raking light.",
  "Organic, sculpted finish where fine surface detail reads clearly across the whole part.",
  "Clean mechanical look with flat faces and tight tolerances suited for assemblies.",
];

const IMPROVEMENTS = [
  "Add a 3–4 mm brim to improve first-layer adhesion on the narrow base.",
  "Reduce overhang angles below 50° or enable tree supports to protect steep faces.",
  "Increase wall count to 3 perimeters for a stronger, more rigid final part.",
  "Split the model at the natural seam to eliminate supports and improve surface quality.",
  "Orient the part diagonally to balance strength across layer lines.",
  "Enable ironing on the top surface for a smoother, more finished look.",
  "Hollow the interior and add drain holes to cut filament use by up to 40%.",
];

function detectFormat(name: string): AnalysisResult["format"] {
  const lower = name.toLowerCase();
  if (lower.startsWith("http")) return "LINK";
  if (lower.endsWith(".f3d")) return "F3D";
  if (lower.endsWith(".step") || lower.endsWith(".stp")) return "STEP";
  return "STL";
}

function pick<T>(arr: T[], rnd: () => number): T {
  return arr[Math.floor(rnd() * arr.length)];
}

export function analyzeModel(
  source: string,
  sizeBytes?: number,
): AnalysisResult {
  const seed = hashSeed(source + (sizeBytes ?? 0));
  const rnd = mulberry32(seed);

  const format = detectFormat(source);
  const fileName =
    format === "LINK"
      ? source.replace(/^https?:\/\//, "").slice(0, 42) + "…"
      : source;

  const x = Math.round(20 + rnd() * 160);
  const y = Math.round(20 + rnd() * 160);
  const z = Math.round(15 + rnd() * 140);

  // Rough volume-based filament estimate (cm³ * density * infill factor).
  const boundingCm3 = (x * y * z) / 1000;
  const solidity = 0.12 + rnd() * 0.25;
  const grams = Math.max(6, Math.round(boundingCm3 * solidity * 1.24));
  const printTimeHours = Math.max(
    0.4,
    Math.round((grams / 11 + rnd() * 2) * 10) / 10,
  );

  const filament = pick(FILAMENTS, rnd);
  const palette = pick(PALETTES, rnd);
  const appearance = pick(APPEARANCES, rnd);

  const improvements = [...IMPROVEMENTS]
    .sort(() => rnd() - 0.5)
    .slice(0, 3 + Math.floor(rnd() * 2));

  const suitability = 68 + Math.floor(rnd() * 30);
  const complexity = 30 + Math.floor(rnd() * 65);

  const suitabilityLabel =
    suitability >= 90
      ? "Excellent"
      : suitability >= 80
        ? "Very good"
        : "Good";

  const infill = `${10 + Math.floor(rnd() * 5) * 5}%`;
  const layerHeight = pick(["0.12 mm", "0.16 mm", "0.20 mm", "0.28 mm"], rnd);
  const needsSupport = rnd() > 0.5;

  return {
    fileName,
    format,
    filamentGrams: grams,
    printTimeHours,
    filamentType: filament.type,
    filamentReason: filament.reason,
    appearance,
    colorSuggestion: palette,
    suitability,
    suitabilityLabel,
    improvements,
    printSettings: {
      layerHeight,
      infill,
      supports: needsSupport ? "Recommended (tree)" : "Not required",
      nozzleTemp: filament.temp,
      bedTemp: filament.bed,
      speed: `${40 + Math.floor(rnd() * 6) * 10} mm/s`,
    },
    dimensions: { x, y, z },
    complexity,
  };
}
