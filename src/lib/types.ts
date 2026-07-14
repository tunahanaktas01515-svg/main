export type PlanId = "free" | "premium";

export interface PlanLimits {
  aiMessages: number | "unlimited";
  chatImports: number | "unlimited";
  modelAnalyses: number | "unlimited";
  chatHistory: number | "unlimited";
  storageGb: number;
}

export interface UsageState {
  aiMessages: number;
  chatImports: number;
  modelAnalyses: number;
  chatHistory: number;
}

export type QuotaKey = keyof UsageState;

export interface AnalysisResult {
  fileName: string;
  format: "STL" | "STEP" | "F3D" | "LINK";
  filamentGrams: number;
  printTimeHours: number;
  filamentType: string;
  filamentReason: string;
  appearance: string;
  colorSuggestion: { name: string; hex: string }[];
  suitability: number; // 0-100
  suitabilityLabel: string;
  improvements: string[];
  printSettings: {
    layerHeight: string;
    infill: string;
    supports: string;
    nozzleTemp: string;
    bedTemp: string;
    speed: string;
  };
  dimensions: { x: number; y: number; z: number };
  complexity: number; // 0-100
}
