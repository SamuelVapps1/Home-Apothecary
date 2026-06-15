import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

type AdminConfig = {
  url: string;
  serviceRoleKey: string;
};

function getAdminConfig(): AdminConfig | null {
  const config = getSupabaseConfig();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!config || !serviceRoleKey) {
    return null;
  }

  return { url: config.url, serviceRoleKey };
}

export function createServiceRoleClient() {
  const config = getAdminConfig();

  if (!config) {
    throw new Error("Supabase service role environment variables are missing.");
  }

  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

