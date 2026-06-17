import { getSupabaseConfig } from "@/lib/supabase/config";
import { createServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/types";

export async function getCurrentUser() {
  if (!getSupabaseConfig()) {
    return null;
  }

  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user ?? null;
  } catch {
    return null;
  }
}

export async function getCurrentAccount() {
  if (!getSupabaseConfig()) {
    return null;
  }

  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("id,email,has_access,access_level,activated_at")
      .eq("id", user.id)
      .maybeSingle();

    return { user, profile: (profile as Profile | null) ?? null };
  } catch {
    return null;
  }
}
