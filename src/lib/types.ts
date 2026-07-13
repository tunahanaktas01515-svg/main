export type Locale =
  | "tr"
  | "en"
  | "de"
  | "fr"
  | "it"
  | "es"
  | "ru"
  | "ar"
  | "zh"
  | "ja";

export type UserRole = "user" | "admin";
export type PlanId = "free" | "basic" | "premium";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: PlanId;
  aiCredits: number;
  createdAt: string;
  status: "active" | "banned" | "pending";
}

export interface Plan {
  id: PlanId;
  priceMonthly: number;
  currency: string;
  aiCredits: number;
  features: string[];
  highlighted?: boolean;
}

export interface ModelSource {
  id: string;
  name: string;
  url: string;
}

export interface MakerModel {
  id: string;
  title: string;
  description: string;
  aiDescription: string;
  thumbnail: string;
  hasVideo: boolean;
  category: string;
  tags: string[];
  source: ModelSource;
  isFree: boolean;
  price?: number;
  currency?: string;
  downloadUrl: string;
  likes: number;
  downloads: number;
  printTime?: string;
  filamentGrams?: number;
  difficulty: "easy" | "medium" | "hard";
  printerTypes: string[];
}

export interface AnalysisResult {
  fileName: string;
  fileType: string;
  dimensions: { x: number; y: number; z: number; unit: string };
  volumeCm3: number;
  estimatedWeightG: number;
  weakPoints: string[];
  improvements: string[];
  printerSettings: {
    layerHeight: string;
    infill: string;
    supports: string;
    nozzleTemp: string;
    bedTemp: string;
    printSpeed: string;
  };
  filamentCost: {
    material: string;
    grams: number;
    costTry: number;
  };
  summary: string;
}

export interface SiteStats {
  visitorsToday: number;
  visitorsWeek: number;
  totalUsers: number;
  totalAnalyses: number;
  totalSearches: number;
  premiumUsers: number;
}