import { createServerClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextPath = requestUrl.searchParams.get("next") ?? "/browse";
  const redirectUrl = new URL(nextPath, request.url);
  const response = NextResponse.redirect(redirectUrl);

  if (!code) {
    const fallbackUrl = new URL("/onboarding", request.url);
    fallbackUrl.searchParams.set("error", "missing_code");
    return NextResponse.redirect(fallbackUrl);
  }

  try {
    const supabase = await createServerClient({
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      const fallbackUrl = new URL("/onboarding", request.url);
      fallbackUrl.searchParams.set("error", "auth_failed");
      return NextResponse.redirect(fallbackUrl);
    }
  } catch {
    const fallbackUrl = new URL("/onboarding", request.url);
    fallbackUrl.searchParams.set("error", "auth_failed");
    return NextResponse.redirect(fallbackUrl);
  }

  return response;
}

