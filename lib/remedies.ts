import { getCurrentAccount } from "@/lib/auth";
import { consumeRateLimit } from "@/lib/rate-limit";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { createServerClient } from "@/lib/supabase/server";
import { remedies as fallbackRemedies, getRemedyBySlug as getFallbackRemedyBySlug } from "@/lib/sample-remedies";
import type { Remedy } from "@/types";

const remedySelect =
  "id,slug,name,name_latin,category,summary,traditional_use,preparation_steps,ingredients,symptoms,dosage_note,contraindications,interactions,pregnancy_warning,pregnancy_warning_text,allergy_note,sources,is_teaser";

export class RateLimitError extends Error {
  constructor(message = "Too many requests. Try again soon.") {
    super(message);
    this.name = "RateLimitError";
  }
}

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

export async function getRemedies(): Promise<{ remedies: Remedy[]; rateLimited: boolean }> {
  if (!getSupabaseConfig()) {
    return { remedies: normalizeRemedies(fallbackRemedies), rateLimited: false };
  }

  try {
    const account = await getCurrentAccount();
    if (account?.user) {
      await rateLimitContentFetch(account.user.id);
    }

    const supabase = await createServerClient();
    const { data, error } = await supabase.from("remedies").select(remedySelect).order("name");

    if (error || !data) {
      return { remedies: normalizeRemedies(fallbackRemedies), rateLimited: false };
    }

    return { remedies: normalizeRemedies(data as Remedy[]), rateLimited: false };
  } catch (error) {
    if (error instanceof RateLimitError) {
      return { remedies: [], rateLimited: true };
    }

    return { remedies: normalizeRemedies(fallbackRemedies), rateLimited: false };
  }
}

export async function getRemedyBySlug(slug: string): Promise<Remedy | null> {
  if (!getSupabaseConfig()) {
    return getFallbackRemedyBySlug(slug);
  }

  try {
    const account = await getCurrentAccount();
    if (account?.user) {
      await rateLimitContentFetch(account.user.id);
    }

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
  } catch (error) {
    if (error instanceof RateLimitError) {
      throw error;
    }

    return getFallbackRemedyBySlug(slug);
  }
}
