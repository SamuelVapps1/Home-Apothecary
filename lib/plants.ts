import { getSupabaseConfig } from "@/lib/supabase/config";
import { createServerClient } from "@/lib/supabase/server";
import type { Plant, PlantInteraction } from "@/types";

export interface PlantListItem {
  slug: string;
  common_name: string;
  name_latin: string;
  family: string;
  traditional_use_summary: string;
  hard_caution: boolean;
}

const plantSelect = "slug,common_name,name_latin,family,traditional_use_summary,hard_caution";
const plantDetailSelect = `
  slug,
  common_name,
  name_latin,
  family,
  parts_used,
  traditional_use_summary,
  contraindications,
  interactions,
  pregnancy_warning_text,
  age_restrictions,
  max_duration_dose,
  toxicity_signals,
  hard_caution,
  allergy_note,
  sources
`;

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

function normalizeStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
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

function normalizePlantDetail(value: unknown): Plant | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const plant = value as Partial<Plant>;

  if (
    typeof plant.slug !== "string" ||
    typeof plant.common_name !== "string" ||
    typeof plant.name_latin !== "string" ||
    typeof plant.family !== "string"
  ) {
    return null;
  }

  return {
    id: plant.id ?? plant.slug,
    slug: plant.slug,
    common_name: plant.common_name,
    name_latin: plant.name_latin,
    family: plant.family,
    parts_used: normalizeStringArray(plant.parts_used),
    traditional_use_summary:
      typeof plant.traditional_use_summary === "string" ? plant.traditional_use_summary : "",
    age_restrictions: normalizeStringArray(plant.age_restrictions),
    max_duration_dose: normalizeStringArray(plant.max_duration_dose),
    toxicity_signals: normalizeStringArray(plant.toxicity_signals),
    hard_caution: Boolean(plant.hard_caution),
    contraindications: normalizeStringArray(plant.contraindications),
    interactions: normalizeInteractions(plant.interactions),
    pregnancy_warning_text: typeof plant.pregnancy_warning_text === "string" ? plant.pregnancy_warning_text : "",
    allergy_note: typeof plant.allergy_note === "string" ? plant.allergy_note : "",
    sources: normalizeStringArray(plant.sources),
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

export async function getPlantBySlug(slug: string): Promise<Plant | null> {
  if (!getSupabaseConfig()) {
    return null;
  }

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("plants").select(plantDetailSelect).eq("slug", slug).maybeSingle();

    if (error || !data) {
      return null;
    }

    return normalizePlantDetail(data);
  } catch {
    return null;
  }
}
