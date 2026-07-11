import { createServiceRoleClient } from "@/lib/supabase/admin";
import { getSupabaseConfig } from "@/lib/supabase/config";
import type { Tier } from "@/types";

export interface WelcomePlant {
  slug: string;
  common_name: string;
  name_latin: string;
}

export type WelcomeRecipe = {
  plantSlugs: string[];
  required_tier: Tier;
  is_free: boolean;
};

export interface WelcomeData {
  plants: WelcomePlant[];
  recipes: WelcomeRecipe[];
}

const plantSelect = "slug,common_name,name_latin";
const recipeSelect = `
  is_free,
  required_tier,
  recipe_components (
    plant:plants (
      slug
    )
  )
`;

function normalizeTier(value: unknown): Tier {
  return value === "standard" || value === "premium" ? value : "free";
}

function normalizePlant(value: unknown): WelcomePlant | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const plant = value as Partial<WelcomePlant>;

  if (
    typeof plant.slug !== "string" ||
    typeof plant.common_name !== "string" ||
    typeof plant.name_latin !== "string"
  ) {
    return null;
  }

  return {
    slug: plant.slug,
    common_name: plant.common_name,
    name_latin: plant.name_latin,
  };
}

function normalizeComponentPlantSlug(value: unknown) {
  if (!value || typeof value !== "object") {
    return null;
  }

  const component = value as Record<string, unknown>;
  const plant = component.plant ?? component["plants"];

  if (!plant || typeof plant !== "object") {
    return null;
  }

  const slug = (plant as { slug?: unknown }).slug;
  return typeof slug === "string" && slug.length > 0 ? slug : null;
}

function normalizeRecipe(value: unknown): WelcomeRecipe | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const recipe = value as Record<string, unknown>;

  if (typeof recipe.is_free !== "boolean" || !recipe.required_tier) {
    return null;
  }

  const plantSlugs = Array.isArray(recipe.recipe_components)
    ? Array.from(
        new Set(
          recipe.recipe_components
            .map((component) => normalizeComponentPlantSlug(component))
            .filter((slug): slug is string => slug !== null),
        ),
      )
    : [];

  return {
    plantSlugs,
    required_tier: normalizeTier(recipe.required_tier),
    is_free: recipe.is_free,
  };
}

function sortByName<T extends { common_name?: string }>(left: T, right: T) {
  const leftName = left.common_name ?? "";
  const rightName = right.common_name ?? "";
  return leftName.localeCompare(rightName);
}

export async function getWelcomeData(): Promise<WelcomeData> {
  // Service-role is used here ONLY because RLS row-hides locked recipes; the select is
  // intentionally restricted to non-content match-shape fields; replacing this with a
  // SECURITY DEFINER RPC is a planned follow-up migration.
  if (!getSupabaseConfig() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { plants: [], recipes: [] };
  }

  try {
    const supabase = createServiceRoleClient();

    const [plantsResult, recipesResult] = await Promise.all([
      supabase.from("plants").select(plantSelect).order("common_name"),
      supabase.from("recipes").select(recipeSelect),
    ]);

    if (plantsResult.error || recipesResult.error) {
      return { plants: [], recipes: [] };
    }

    const plants = Array.isArray(plantsResult.data)
      ? plantsResult.data
          .map((plant) => normalizePlant(plant))
          .filter((plant): plant is WelcomePlant => plant !== null)
      : [];
    const recipes = Array.isArray(recipesResult.data)
      ? recipesResult.data
          .map((recipe) => normalizeRecipe(recipe))
          .filter((recipe): recipe is WelcomeRecipe => recipe !== null)
      : [];

    return {
      plants: plants.sort(sortByName),
      recipes,
    };
  } catch {
    return { plants: [], recipes: [] };
  }
}
