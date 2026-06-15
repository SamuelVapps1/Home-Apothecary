import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr/dist/module/types";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";

type CookieAdapter = {
  getAll: () => { name: string; value: string }[];
  setAll: (cookiesToSet: { name: string; value: string; options: CookieOptions }[]) => void;
};

type CookieStoreLike = {
  getAll: () => { name: string; value: string }[];
  set?: (name: string, value: string, options: CookieOptions) => void;
};

function createCookieAdapterFromStore(cookieStore: CookieStoreLike): CookieAdapter {
  return {
    getAll() {
      return cookieStore.getAll();
    },
    setAll(cookiesToSet) {
      try {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set?.(name, value, options);
        });
      } catch {
        // Read-only cookie stores are expected in Server Components.
      }
    },
  };
}

export async function createServerClient(cookieAdapter?: CookieAdapter) {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error("Supabase environment variables are missing.");
  }

  const adapter = cookieAdapter ?? createCookieAdapterFromStore(await cookies());

  return createSupabaseServerClient(config.url, config.anonKey, {
    cookies: {
      getAll: adapter.getAll,
      setAll: adapter.setAll,
    },
  });
}

export function createMiddlewareCookieAdapter(request: {
  cookies: { getAll: () => { name: string; value: string }[] };
}, response: {
  cookies: { set: (name: string, value: string, options: CookieOptions) => void };
}): CookieAdapter {
  return {
    getAll() {
      return request.cookies.getAll();
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options);
      });
    },
  };
}
