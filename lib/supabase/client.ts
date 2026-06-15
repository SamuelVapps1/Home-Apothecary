"use client";

import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

export function createBrowserClient() {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error("Supabase environment variables are missing.");
  }

  return createSupabaseBrowserClient(config.url, config.anonKey);
}
