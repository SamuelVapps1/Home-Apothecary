import { contentPlants, contentRecipes } from "@/content";
import type {
  InteractionSeverity,
  Plant,
  PlantInteraction,
  PreparationType,
  RecipeDetail,
  RecipeComponent,
  Tier,
} from "@/types";

function normalizeTier(value: unknown): Tier {
  return value === "standard" || value === "premium" ? value : "free";
}

function normalizeStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function normalizeInteraction(value: unknown): PlantInteraction | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const interaction = value as Partial<PlantInteraction>;

  if (
    typeof interaction.drug_or_class !== "string" ||
    typeof interaction.mechanism !== "string" ||
    !interaction.severity ||
    !["AVOID", "MAJOR", "MODERATE", "MINOR_THEORETICAL"].includes(interaction.severity)
  ) {
    return null;
  }

  return {
    drug_or_class: interaction.drug_or_class,
    mechanism: interaction.mechanism,
    severity: interaction.severity as InteractionSeverity,
  };
}

function toPlantId(slug: string) {
  return `content-plant:${slug}`;
}

function toRecipeId(slug: string) {
  return `content-recipe:${slug}`;
}

function toComponentId(recipeSlug: string, sortOrder: number, plantSlug: string) {
  return `content-component:${recipeSlug}:${sortOrder}:${plantSlug}`;
}

function buildPlant(value: (typeof contentPlants)[number]): Plant {
  return {
    id: toPlantId(value.slug),
    slug: value.slug,
    common_name: value.common_name,
    name_latin: value.name_latin,
    family: value.family,
    parts_used: normalizeStringArray(value.parts_used),
    traditional_use_summary: typeof value.traditional_use_summary === "string" ? value.traditional_use_summary : "",
    age_restrictions: normalizeStringArray(value.age_restrictions),
    max_duration_dose: normalizeStringArray(value.max_duration_dose),
    toxicity_signals: normalizeStringArray(value.toxicity_signals),
    hard_caution: Boolean(value.hard_caution),
    contraindications: normalizeStringArray(value.contraindications),
    interactions: Array.isArray(value.interactions)
      ? value.interactions.map((item) => normalizeInteraction(item)).filter((item): item is PlantInteraction => item !== null)
      : [],
    pregnancy_warning_text: value.pregnancy_warning_text ?? "",
    allergy_note: value.allergy_note ?? "",
    sources: normalizeStringArray(value.sources),
  };
}

function buildComponent(
  recipeSlug: string,
  value: (typeof contentRecipes)[number]["components"][number],
  plantsBySlug: Map<string, Plant>,
): RecipeComponent {
  const plant = plantsBySlug.get(value.plant_slug) ?? null;
  const sortOrder = typeof value.sort_order === "number" ? value.sort_order : 0;

  return {
    id: toComponentId(recipeSlug, sortOrder, value.plant_slug),
    recipe_id: toRecipeId(recipeSlug),
    plant_id: plant?.id ?? toPlantId(value.plant_slug),
    part_used: value.part_used,
    ratio_quantity: value.ratio_quantity,
    temperature: typeof value.temperature === "string" ? value.temperature : null,
    time: typeof value.time === "string" ? value.time : null,
    prep_notes: typeof value.prep_notes === "string" ? value.prep_notes : null,
    sort_order: sortOrder,
    plant,
  };
}

function buildRecipeDetail(value: (typeof contentRecipes)[number], plantsBySlug: Map<string, Plant>): RecipeDetail {
  const components = value.components
    .map((component) => buildComponent(value.slug, component, plantsBySlug))
    .sort((left, right) => left.sort_order - right.sort_order);

  return {
    id: toRecipeId(value.slug),
    slug: value.slug,
    title: value.title,
    category: value.category,
    summary: value.summary,
    preparation_type: value.preparation_type as PreparationType,
    traditional_use: value.traditional_use,
    method_steps: value.method_steps.map((step) => ({ title: step.title, text: step.text })),
    dosage_note: value.dosage_note,
    safety_notes: normalizeStringArray(value.safety_notes),
    sources: normalizeStringArray(value.sources),
    is_free: value.is_free,
    required_tier: normalizeTier(value.required_tier),
    components,
  };
}

const plantsBySlug = new Map(contentPlants.map((plant) => [plant.slug, buildPlant(plant)] as const));
export const contentPlantsBySlug = plantsBySlug;
export const recipes = contentRecipes.map((recipe) => buildRecipeDetail(recipe, plantsBySlug));

export function getRecipeBySlug(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug) ?? null;
}
