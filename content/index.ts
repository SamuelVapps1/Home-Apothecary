import chamomilePlant from "@/content/plants/chamomile.json";
import elderberryPlant from "@/content/plants/elderberry.json";
import gingerPlant from "@/content/plants/ginger.json";
import peppermintPlant from "@/content/plants/peppermint.json";
import valerianPlant from "@/content/plants/valerian.json";
import chamomileRecipe from "@/content/recipes/chamomile.json";
import elderberryRecipe from "@/content/recipes/elderberry.json";
import gingerRecipe from "@/content/recipes/ginger.json";
import peppermintRecipe from "@/content/recipes/peppermint.json";
import valerianRecipe from "@/content/recipes/valerian.json";

export type ContentInteractionSeverity = "AVOID" | "MAJOR" | "MODERATE" | "MINOR_THEORETICAL";

export interface ContentInteractionSeed {
  drug_or_class: string;
  mechanism: string;
  severity: ContentInteractionSeverity;
}

export interface ContentPlantSeed {
  slug: string;
  common_name: string;
  name_latin: string;
  family: string;
  parts_used: string[];
  traditional_use_summary: string;
  age_restrictions: string[];
  max_duration_dose: string[];
  toxicity_signals: string[];
  hard_caution: boolean;
  contraindications: string[];
  interactions: ContentInteractionSeed[];
  pregnancy_warning_text: string;
  allergy_note: string;
  sources: string[];
}

export type ContentRecipeComponentSeed = {
  plant_slug: string;
  part_used: string;
  ratio_quantity: string;
  temperature?: string;
  time?: string;
  prep_notes?: string;
  sort_order?: number;
};

export interface ContentRecipeSeed {
  slug: string;
  title: string;
  category: string;
  summary: string;
  preparation_type: "infusion" | "decoction" | "tincture" | "salve" | "extract" | "oil" | "syrup" | "powder" | "other";
  traditional_use: string;
  method_steps: Array<{ title: string; text: string }>;
  dosage_note: string;
  safety_notes: string[];
  sources: string[];
  is_free: boolean;
  required_tier: "free" | "standard" | "premium";
  components: ContentRecipeComponentSeed[];
}

export const contentPlants = [
  chamomilePlant as ContentPlantSeed,
  gingerPlant as ContentPlantSeed,
  elderberryPlant as ContentPlantSeed,
  valerianPlant as ContentPlantSeed,
  peppermintPlant as ContentPlantSeed,
] satisfies ContentPlantSeed[];

export const contentRecipes = [
  chamomileRecipe as ContentRecipeSeed,
  gingerRecipe as ContentRecipeSeed,
  elderberryRecipe as ContentRecipeSeed,
  valerianRecipe as ContentRecipeSeed,
  peppermintRecipe as ContentRecipeSeed,
] satisfies ContentRecipeSeed[];

