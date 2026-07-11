import type { Tier } from "@/types";

export type InventoryMatchState = "full" | "partial" | "none" | "neutral";

export interface InventoryMatchComponent {
  plant?: {
    slug?: string | null;
  } | null;
}

export interface InventoryMatchRecipe {
  components?: InventoryMatchComponent[];
  plantSlugs?: string[];
  required_tier?: Tier;
}

export interface RecipeInventoryMatch {
  state: InventoryMatchState;
  label?: string;
  ownedCount: number;
  total: number;
}

function getTierRank(tier: Tier) {
  switch (tier) {
    case "free":
      return 0;
    case "standard":
      return 1;
    case "premium":
      return 2;
  }
}

export function isTierAtOrAbove(accessTier: Tier, requiredTier: Tier) {
  return getTierRank(accessTier) >= getTierRank(requiredTier);
}

export function getRecipePlantSlugs(recipe: InventoryMatchRecipe) {
  if (Array.isArray(recipe.plantSlugs) && recipe.plantSlugs.length > 0) {
    return Array.from(new Set(recipe.plantSlugs.filter((slug): slug is string => typeof slug === "string" && slug.length > 0)));
  }

  if (!Array.isArray(recipe.components)) {
    return [];
  }

  const slugs: string[] = [];
  const seen = new Set<string>();

  recipe.components.forEach((component) => {
    const slug = component.plant?.slug;
    if (typeof slug !== "string" || slug.length === 0 || seen.has(slug)) {
      return;
    }

    seen.add(slug);
    slugs.push(slug);
  });

  return slugs;
}

export function isRecipeFullyMatchable(recipe: InventoryMatchRecipe, inventorySlugs: Set<string>) {
  const requiredSlugs = getRecipePlantSlugs(recipe);

  if (requiredSlugs.length === 0) {
    return false;
  }

  return requiredSlugs.every((slug) => inventorySlugs.has(slug));
}

export function getRecipeInventoryMatch(recipe: InventoryMatchRecipe, inventorySlugs: Set<string>) {
  const requiredSlugs = getRecipePlantSlugs(recipe);
  const total = requiredSlugs.length;

  if (total === 0) {
    return {
      state: "neutral" as InventoryMatchState,
      label: undefined,
      ownedCount: 0,
      total,
    };
  }

  const ownedCount = requiredSlugs.filter((slug) => inventorySlugs.has(slug)).length;

  if (ownedCount === total) {
    return {
      state: "full" as InventoryMatchState,
      label: "You can make this",
      ownedCount,
      total,
    };
  }

  if (ownedCount > 0) {
    return {
      state: "partial" as InventoryMatchState,
      label: `${ownedCount} of ${total} ingredients`,
      ownedCount,
      total,
    };
  }

  return {
    state: "none" as InventoryMatchState,
    label: undefined,
    ownedCount,
    total,
  };
}

export function countAccessibleRecipeMatches(
  recipes: InventoryMatchRecipe[],
  inventorySlugs: Set<string>,
  accessTier: Tier,
) {
  return recipes.filter(
    (recipe) =>
      isRecipeFullyMatchable(recipe, inventorySlugs) &&
      recipe.required_tier !== undefined &&
      isTierAtOrAbove(accessTier, recipe.required_tier),
  ).length;
}

export function countRecipesAtTier(
  recipes: InventoryMatchRecipe[],
  inventorySlugs: Set<string>,
  requiredTier: Tier,
) {
  return recipes.filter(
    (recipe) =>
      isRecipeFullyMatchable(recipe, inventorySlugs) && recipe.required_tier === requiredTier,
  ).length;
}
