import { NextResponse, type NextRequest } from "next/server";
import { createMiddlewareCookieAdapter, createServerClient } from "@/lib/supabase/server";

const protectedPrefixes = ["/browse", "/remedies", "/redeem", "/account"];

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export async function middleware(request: NextRequest) {
  if (!isProtectedPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = await createServerClient(
    await createMiddlewareCookieAdapter(request, response),
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const redirectUrl = new URL("/onboarding", request.url);
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);
    response = NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/browse/:path*", "/remedies/:path*", "/redeem"],
};
