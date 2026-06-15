import { getSupabaseConfig } from "@/lib/supabase/config";
import { createServerClient } from "@/lib/supabase/server";
import { remedies as fallbackRemedies, getRemedyBySlug as getFallbackRemedyBySlug } from "@/lib/sample-remedies";
import type { Remedy } from "@/types";

const remedySelect =
  "id,slug,name,name_latin,category,summary,traditional_use,preparation_steps,ingredients,symptoms,dosage_note,contraindications,interactions,pregnancy_warning,pregnancy_warning_text,allergy_note,sources,is_teaser";

function normalizeRemedy(remedy: Remedy): Remedy {
  return {
    ...remedy,
    preparation_steps: remedy.preparation_steps ?? [],
    ingredients: remedy.ingredients ?? [],
    symptoms: remedy.symptoms ?? [],
    contraindications: remedy.contraindications ?? [],
    interactions: remedy.interactions ?? [],
    sources: remedy.sources ?? [],
  };
}

function normalizeRemedies(remedies: Remedy[]) {
  return remedies.map(normalizeRemedy);
}

export async function getRemedies(): Promise<Remedy[]> {
  if (!getSupabaseConfig()) {
    return normalizeRemedies(fallbackRemedies);
  }

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.from("remedies").select(remedySelect).order("name");

    if (error || !data) {
      return normalizeRemedies(fallbackRemedies);
    }

    return normalizeRemedies(data as Remedy[]);
  } catch {
    return normalizeRemedies(fallbackRemedies);
  }
}

export async function getRemedyBySlug(slug: string): Promise<Remedy | null> {
  if (!getSupabaseConfig()) {
    return getFallbackRemedyBySlug(slug);
  }

  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("remedies")
      .select(remedySelect)
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return getFallbackRemedyBySlug(slug);
    }

    return normalizeRemedy(data as Remedy);
  } catch {
    return getFallbackRemedyBySlug(slug);
  }
}

