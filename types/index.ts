export const tierOrder = ["free", "standard", "premium"] as const;

export type Tier = (typeof tierOrder)[number];

export const preparationTypes = [
  "infusion",
  "decoction",
  "tincture",
  "salve",
  "extract",
  "oil",
  "syrup",
  "powder",
  "other",
] as const;

export type PreparationType = (typeof preparationTypes)[number];

export interface PreparationStep {
  title: string;
  text: string;
}

export interface Profile {
  id: string;
  email: string;
  has_access: boolean;
  access_level: Tier;
  activated_at: string | null;
}

export interface LicenseKey {
  key: string;
  lemonsqueezy_order_id: string;
  status: "valid" | "redeemed";
  tier: Tier;
  redeemed_by: string | null;
  redeemed_at: string | null;
}

export interface Plant {
  id: string;
  slug: string;
  common_name: string;
  name_latin: string;
  family: string;
  parts_used: string[];
  contraindications: string[];
  interactions: string[];
  pregnancy_warning_text: string;
  allergy_note: string;
  sources: string[];
}

export interface RecipeComponent {
  id: string;
  recipe_id: string;
  plant_id: string;
  part_used: string;
  ratio_quantity: string;
  temperature: string | null;
  time: string | null;
  prep_notes: string | null;
  sort_order: number;
  plant: Plant | null;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  preparation_type: PreparationType;
  traditional_use: string;
  method_steps: PreparationStep[];
  dosage_note: string;
  safety_notes: string[];
  sources: string[];
  is_free: boolean;
  required_tier: Tier;
  components: RecipeComponent[];
}

export type RecipeDetail = Recipe;

export interface RecipeTeaser {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  is_free: true;
}

export type Remedy = Recipe;
export type RemedyTeaser = RecipeTeaser;
