import { getSupabaseConfig } from "@/lib/supabase/config";
import { createServerClient } from "@/lib/supabase/server";

export interface PlantListItem {
  slug: string;
  common_name: string;
  name_latin: string;
  family: string;
  traditional_use_summary: string;
  hard_caution: boolean;
}

const plantSelect = "slug,common_name,name_latin,family,traditional_use_summary,hard_caution";

function normalizePlant(value: unknown): PlantListItem | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const plant = value as Partial<PlantListItem>;

  if (
    typeof plant.slug !== "string" ||
    typeof plant.common_name !== "string" ||
    typeof plant.name_latin !== "string" ||
    typeof plant.family !== "string" ||
    typeof plant.traditional_use_summary !== "string"
  ) {
    return null;
  }

  return {
    slug: plant.slug,
    common_name: plant.common_name,
    name_latin: plant.name_latin,
    family: plant.family,
    traditional_use_summary: plant.traditional_use_summary,
    hard_caution: Boolean(plant.hard_caution),
  };
}

export async function getPlants(): Promise<{ plants: PlantListItem[]; rateLimited: boolean; error: boolean }> {
  if (!getSupabaseConfig()) {
    return { plants: [], rateLimited: false, error: true };
  }

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("plants").select(plantSelect).order("common_name");

    if (error || !data) {
      return { plants: [], rateLimited: false, error: true };
    }

    const plants = Array.isArray(data)
      ? data.map((plant) => normalizePlant(plant)).filter((plant): plant is PlantListItem => plant !== null)
      : [];

    return { plants, rateLimited: false, error: false };
  } catch {
    return { plants: [], rateLimited: false, error: true };
  }
}
