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

export type ContentPlantSeed = typeof chamomilePlant;
export type ContentRecipeComponentSeed = {
  plant_slug: string;
  part_used: string;
  ratio_quantity: string;
  temperature?: string;
  time?: string;
  prep_notes?: string;
  sort_order?: number;
};
export type ContentRecipeSeed = typeof chamomileRecipe;

export const contentPlants = [
  chamomilePlant,
  gingerPlant,
  elderberryPlant,
  valerianPlant,
  peppermintPlant,
] as const;

export const contentRecipes = [
  chamomileRecipe,
  gingerRecipe,
  elderberryRecipe,
  valerianRecipe,
  peppermintRecipe,
] as const;

