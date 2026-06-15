import { getSupabaseConfig } from "@/lib/supabase/config";
import { createServerClient } from "@/lib/supabase/server";

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

