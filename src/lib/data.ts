import type { MakerModel, Plan, SiteStats, User } from "@/lib/types";

export const ADMIN_EMAIL = "tunahanaktas01515@gmail.com";

export const PLANS: Plan[] = [
  {
    id: "free",
    priceMonthly: 0,
    currency: "TRY",
    aiCredits: 5,
    features: [
      "5 AI credits / month",
      "Basic model search",
      "Limited STL analysis",
    ],
  },
  {
    id: "basic",
    priceMonthly: 39,
    currency: "TRY",
    aiCredits: 50,
    features: [
      "50 AI credits / month",
      "Full STL / STEP / F3D analysis",
      "AI-enriched search",
      "Model comparison",
    ],
  },
  {
    id: "premium",
    priceMonthly: 79,
    currency: "TRY",
    aiCredits: 250,
    highlighted: true,
    features: [
      "250 AI credits / month",
      "Priority AI responses",
      "Advanced printer profiles",
      "Unlimited comparisons",
      "Early access features",
    ],
  },
];

export const MOCK_MODELS: MakerModel[] = [
  {
    id: "m1",
    title: "RC Drift Chassis V4",
    description: "Modular 1/10 drift chassis with adjustable wheelbase.",
    aiDescription:
      "AI: Strong TPU bumper zones recommended. 20% gyroid infill for chassis rails; PETG preferred over PLA for impact resistance.",
    thumbnail:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    hasVideo: true,
    category: "RC Cars",
    tags: ["rc", "drift", "chassis", "1/10"],
    source: { id: "printables", name: "Printables", url: "https://www.printables.com" },
    isFree: true,
    downloadUrl: "https://www.printables.com/model/rc-drift-chassis",
    likes: 1842,
    downloads: 9201,
    printTime: "18h",
    filamentGrams: 420,
    difficulty: "hard",
    printerTypes: ["Ender 3", "Prusa MK4", "Bambu X1"],
  },
  {
    id: "m2",
    title: "FPV Drone Frame 5\"",
    description: "Lightweight freestyle frame with camera cage.",
    aiDescription:
      "AI: Use carbon-look PETG or PA-CF if available. Reinforce arm roots; avoid >0.28mm layers on arms.",
    thumbnail:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    hasVideo: true,
    category: "Drones",
    tags: ["fpv", "drone", "frame", "5inch"],
    source: { id: "thingiverse", name: "Thingiverse", url: "https://www.thingiverse.com" },
    isFree: true,
    downloadUrl: "https://www.thingiverse.com/thing:fpv-frame-5",
    likes: 3201,
    downloads: 15400,
    printTime: "6h",
    filamentGrams: 95,
    difficulty: "medium",
    printerTypes: ["Bambu P1S", "Prusa Mini"],
  },
  {
    id: "m3",
    title: "Planetary Gearbox 14:1",
    description: "Compact planetary reduction for RC servo upgrades.",
    aiDescription:
      "AI: Print gears at 0.12–0.16mm with 100% infill. Dry filament mandatory. Allow 0.2mm clearance.",
    thumbnail:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    hasVideo: false,
    category: "Mechanics",
    tags: ["gear", "planetary", "servo", "rc"],
    source: { id: "cults", name: "Cults3D", url: "https://cults3d.com" },
    isFree: false,
    price: 12.99,
    currency: "USD",
    downloadUrl: "https://cults3d.com/en/3d-model/planetary-gearbox",
    likes: 890,
    downloads: 2100,
    printTime: "4h",
    filamentGrams: 48,
    difficulty: "hard",
    printerTypes: ["Prusa MK4", "Voron 2.4"],
  },
  {
    id: "m4",
    title: "Propeller Guard Kit",
    description: "Snap-on propeller guards for 3-inch whoops.",
    aiDescription:
      "AI: TPU 95A recommended. 2 walls, 15% infill. Fast print-friendly design.",
    thumbnail:
      "https://images.unsplash.com/photo-1508614589041-895b88991e3d?w=800&q=80",
    hasVideo: false,
    category: "Drones",
    tags: ["propeller", "guard", "whoop", "tpu"],
    source: { id: "myminifactory", name: "MyMiniFactory", url: "https://www.myminifactory.com" },
    isFree: true,
    downloadUrl: "https://www.myminifactory.com/object/prop-guard",
    likes: 654,
    downloads: 4800,
    printTime: "2h",
    filamentGrams: 32,
    difficulty: "easy",
    printerTypes: ["Ender 3", "A1 mini"],
  },
  {
    id: "m5",
    title: "RC Boat Hull 600mm",
    description: "Fast electric RC boat hull with deck hatch.",
    aiDescription:
      "AI: Print upright with tree supports. PETG/ABS for water resistance. Seal seams before launch.",
    thumbnail:
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
    hasVideo: true,
    category: "RC Boats",
    tags: ["boat", "hull", "rc", "electric"],
    source: { id: "printables", name: "Printables", url: "https://www.printables.com" },
    isFree: false,
    price: 8.5,
    currency: "EUR",
    downloadUrl: "https://www.printables.com/model/rc-boat-hull",
    likes: 421,
    downloads: 980,
    printTime: "28h",
    filamentGrams: 780,
    difficulty: "hard",
    printerTypes: ["Prusa XL", "Bambu X1C"],
  },
  {
    id: "m6",
    title: "Tool-Free Filament Spool Holder",
    description: "Bearing-based spool holder for dry boxes.",
    aiDescription:
      "AI: PLA/PETG both fine. 0.2mm layer, 20% infill. No supports needed.",
    thumbnail:
      "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800&q=80",
    hasVideo: false,
    category: "Tools",
    tags: ["spool", "holder", "filament", "tools"],
    source: { id: "thingiverse", name: "Thingiverse", url: "https://www.thingiverse.com" },
    isFree: true,
    downloadUrl: "https://www.thingiverse.com/thing:spool-holder",
    likes: 5102,
    downloads: 42000,
    printTime: "3h",
    filamentGrams: 68,
    difficulty: "easy",
    printerTypes: ["Any FDM"],
  },
  {
    id: "m7",
    title: "Servo Mount Bracket Kit",
    description: "Universal servo mounts for RC planes and cars.",
    aiDescription:
      "AI: Print flat on bed. 4 walls, 40% infill. Heat-set inserts optional.",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    hasVideo: false,
    category: "RC Cars",
    tags: ["servo", "mount", "bracket", "rc"],
    source: { id: "cults", name: "Cults3D", url: "https://cults3d.com" },
    isFree: true,
    downloadUrl: "https://cults3d.com/en/3d-model/servo-mount",
    likes: 1102,
    downloads: 7600,
    printTime: "1.5h",
    filamentGrams: 22,
    difficulty: "easy",
    printerTypes: ["Ender 3", "Prusa Mini"],
  },
  {
    id: "m8",
    title: "Hexacopter Arm Set",
    description: "Replaceable arms with integrated cable channels.",
    aiDescription:
      "AI: PA-CF or PETG-CF ideal. Orient arms for layer lines along length for strength.",
    thumbnail:
      "https://images.unsplash.com/photo-1527979809431-ea3dbf54dca4?w=800&q=80",
    hasVideo: true,
    category: "Drones",
    tags: ["hexacopter", "arm", "carbon", "fpv"],
    source: { id: "myminifactory", name: "MyMiniFactory", url: "https://www.myminifactory.com" },
    isFree: false,
    price: 15,
    currency: "USD",
    downloadUrl: "https://www.myminifactory.com/object/hexa-arms",
    likes: 733,
    downloads: 1540,
    printTime: "9h",
    filamentGrams: 180,
    difficulty: "medium",
    printerTypes: ["Bambu X1C", "Prusa MK4"],
  },
];

export const CATEGORIES = [
  "RC Cars",
  "Drones",
  "RC Boats",
  "Mechanics",
  "Tools",
];

export const SOURCES = [
  "Printables",
  "Thingiverse",
  "Cults3D",
  "MyMiniFactory",
];

export const DEFAULT_STATS: SiteStats = {
  visitorsToday: 1284,
  visitorsWeek: 9420,
  totalUsers: 0,
  totalAnalyses: 356,
  totalSearches: 4210,
  premiumUsers: 0,
};

export const SEED_USERS: User[] = [
  {
    id: "u-admin",
    name: "Tunahan Aktaş",
    email: ADMIN_EMAIL,
    role: "admin",
    plan: "premium",
    aiCredits: 250,
    createdAt: new Date().toISOString(),
    status: "active",
  },
];

export const PENDING_CONTENT = [
  {
    id: "c1",
    title: "Custom RC Wing Mount",
    author: "maker42",
    submittedAt: "2026-07-12",
    status: "pending" as const,
  },
  {
    id: "c2",
    title: "Mini Quad Canopy",
    author: "dronefox",
    submittedAt: "2026-07-11",
    status: "pending" as const,
  },
  {
    id: "c3",
    title: "Filament Guide Clip",
    author: "printlab",
    submittedAt: "2026-07-10",
    status: "pending" as const,
  },
];