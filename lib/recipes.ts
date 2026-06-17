import { getCurrentAccount } from "@/lib/auth";
import { consumeRateLimit } from "@/lib/rate-limit";
import { getRecipeBySlug as getFallbackRecipeBySlug, recipes as fallbackRecipes } from "@/lib/content-recipes";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createServerClient } from "@/lib/supabase/server";
import type { Plant, PlantInteraction, Recipe, RecipeComponent, RecipeDetail, Tier } from "@/types";

const recipeSelect = `
  id,
  slug,
  title,
  category,
  summary,
  preparation_type,
  traditional_use,
  method_steps,
  dosage_note,
  safety_notes,
  sources,
  is_free,
  required_tier,
  recipe_components (
    id,
    recipe_id,
    plant_id,
    part_used,
    ratio_quantity,
    temperature,
    time,
    prep_notes,
    sort_order,
    plant:plants (
      id,
      slug,
      common_name,
      name_latin,
      family,
      parts_used,
      traditional_use_summary,
      age_restrictions,
      max_duration_dose,
      toxicity_signals,
      hard_caution,
      contraindications,
      interactions,
      pregnancy_warning_text,
      allergy_note,
      sources
    )
  )
`;

export class RateLimitError extends Error {
  constructor(message = "Too many requests. Try again soon.") {
    super(message);
    this.name = "RateLimitError";
  }
}

function normalizeStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function normalizeTier(value: unknown): Tier {
  return value === "standard" || value === "premium" ? value : "free";
}

function normalizeInteractions(value: unknown): PlantInteraction[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const interaction = item as Partial<PlantInteraction>;

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
        severity: interaction.severity as PlantInteraction["severity"],
      };
    })
    .filter((item): item is PlantInteraction => item !== null);
}

function normalizePlant(value: unknown): Plant | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const plant = value as Partial<Plant>;

  if (!plant.id || !plant.slug || !plant.common_name || !plant.name_latin || !plant.family) {
    return null;
  }

  return {
    id: plant.id,
    slug: plant.slug,
    common_name: plant.common_name,
    name_latin: plant.name_latin,
    family: plant.family,
    parts_used: normalizeStringArray(plant.parts_used),
    traditional_use_summary: typeof plant.traditional_use_summary === "string" ? plant.traditional_use_summary : "",
    age_restrictions: normalizeStringArray(plant.age_restrictions),
    max_duration_dose: normalizeStringArray(plant.max_duration_dose),
    toxicity_signals: normalizeStringArray(plant.toxicity_signals),
    hard_caution: Boolean(plant.hard_caution),
    contraindications: normalizeStringArray(plant.contraindications),
    interactions: normalizeInteractions(plant.interactions),
    pregnancy_warning_text: plant.pregnancy_warning_text ?? "",
    allergy_note: plant.allergy_note ?? "",
    sources: normalizeStringArray(plant.sources),
  };
}

function normalizeRecipeComponent(value: unknown): RecipeComponent | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const component = value as Record<string, unknown>;
  const plant = normalizePlant(component.plant ?? component["plants"]);

  if (
    typeof component.id !== "string" ||
    typeof component.recipe_id !== "string" ||
    typeof component.plant_id !== "string" ||
    typeof component.part_used !== "string" ||
    typeof component.ratio_quantity !== "string"
  ) {
    return null;
  }

  return {
    id: component.id,
    recipe_id: component.recipe_id,
    plant_id: component.plant_id,
    part_used: component.part_used,
    ratio_quantity: component.ratio_quantity,
    temperature: typeof component.temperature === "string" ? component.temperature : null,
    time: typeof component.time === "string" ? component.time : null,
    prep_notes: typeof component.prep_notes === "string" ? component.prep_notes : null,
    sort_order: typeof component.sort_order === "number" ? component.sort_order : 0,
    plant,
  };
}

function normalizeRecipe(value: Recipe | RecipeDetail | Record<string, unknown>): RecipeDetail | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const recipe = value as Record<string, unknown>;
  if (
    typeof recipe.id !== "string" ||
    typeof recipe.slug !== "string" ||
    typeof recipe.title !== "string" ||
    typeof recipe.category !== "string" ||
    typeof recipe.summary !== "string" ||
    typeof recipe.preparation_type !== "string" ||
    typeof recipe.traditional_use !== "string" ||
    typeof recipe.dosage_note !== "string" ||
    typeof recipe.is_free !== "boolean"
  ) {
    return null;
  }

  const components = Array.isArray(recipe.recipe_components)
    ? recipe.recipe_components
        .map((component) => normalizeRecipeComponent(component))
        .filter((component): component is RecipeComponent => component !== null)
        .sort((left, right) => left.sort_order - right.sort_order)
    : [];

  return {
    id: recipe.id,
    slug: recipe.slug,
    title: recipe.title,
    category: recipe.category,
    summary: recipe.summary,
    preparation_type: recipe.preparation_type as RecipeDetail["preparation_type"],
    traditional_use: recipe.traditional_use,
    method_steps: Array.isArray(recipe.method_steps) ? (recipe.method_steps as RecipeDetail["method_steps"]) : [],
    dosage_note: recipe.dosage_note,
    safety_notes: normalizeStringArray(recipe.safety_notes),
    sources: normalizeStringArray(recipe.sources),
    is_free: recipe.is_free,
    required_tier: normalizeTier(recipe.required_tier),
    components,
  };
}

function normalizeRecipes(recipes: Array<Recipe | RecipeDetail | Record<string, unknown>>) {
  return recipes.map((recipe) => normalizeRecipe(recipe)).filter((recipe): recipe is RecipeDetail => recipe !== null);
}

async function rateLimitContentFetch(accountId: string) {
  const allowed = await consumeRateLimit({
    bucket: `content:${accountId}`,
    limit: 120,
    windowSeconds: 60,
  });

  if (!allowed) {
    throw new RateLimitError();
  }
}

async function selectRecipes(slug?: string) {
  const supabase = await createServerClient();
  const query = supabase.from("recipes").select(recipeSelect);

  if (slug) {
    return query.eq("slug", slug).maybeSingle();
  }

  return query.order("title");
}

export async function getRecipes(): Promise<{ recipes: RecipeDetail[]; rateLimited: boolean }> {
  if (!getSupabaseConfig()) {
    return { recipes: normalizeRecipes(fallbackRecipes), rateLimited: false };
  }

  try {
    const account = await getCurrentAccount();
    if (account?.user) {
      await rateLimitContentFetch(account.user.id);
    }

    const { data, error } = await selectRecipes();

    if (error || !data) {
      return { recipes: normalizeRecipes(fallbackRecipes), rateLimited: false };
    }

    return { recipes: normalizeRecipes(Array.isArray(data) ? data : []), rateLimited: false };
  } catch (error) {
    if (error instanceof RateLimitError) {
      return { recipes: [], rateLimited: true };
    }

    return { recipes: normalizeRecipes(fallbackRecipes), rateLimited: false };
  }
}

export async function getRecipeBySlug(slug: string): Promise<RecipeDetail | null> {
  if (!getSupabaseConfig()) {
    return getFallbackRecipeBySlug(slug);
  }

  try {
    const account = await getCurrentAccount();
    if (account?.user) {
      await rateLimitContentFetch(account.user.id);
    }

    const { data, error } = await selectRecipes(slug);

    if (error || !data) {
      return getFallbackRecipeBySlug(slug);
    }

    return normalizeRecipe(data as Record<string, unknown>);
  } catch (error) {
    if (error instanceof RateLimitError) {
      throw error;
    }

    return getFallbackRecipeBySlug(slug);
  }
}

export { getRecipeBySlug as getRemedyBySlug, getRecipes as getRemedies };
