import { createMiddlewareCookieAdapter, createServerClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url));

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return response;
  }

  const supabase = await createServerClient(
    createMiddlewareCookieAdapter(request, response),
  );

  await supabase.auth.signOut();

  return response;
}

