// middleware.ts
// FIX: middleware uz nikdy nepropaguje MAZANIE auth cookies do browsera.
// Mazanie sessions patri vylucne do /auth/logout. Middleware len gatuje.
// + INSTRUMENTACIA: docasne logovanie do Vercel logs (tag "mw-auth").
//   Po potvrdeni root cause console.log blok zmazat.

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

const protectedPrefixes = ["/browse", "/remedies", "/redeem", "/account"];

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function middleware(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const attemptedWrites: { name: string; deletion: boolean }[] = [];

  const supabase = await createServerClient({
    getAll() {
      return request.cookies.getAll();
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value }) =>
        attemptedWrites.push({ name, deletion: value === "" }),
      );

      // GUARD: prazdna hodnota = pokus o delete session cookie.
      // Middleware to NIKDY neprepusti do browsera.
      const writes = cookiesToSet.filter(({ value }) => value !== "");
      if (writes.length === 0) {
        return;
      }

      writes.forEach(({ name, value }) => request.cookies.set(name, value));
      response = NextResponse.next({ request });
      writes.forEach(({ name, value, options }) =>
        response.cookies.set(name, value, options),
      );
    },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // INSTRUMENTACIA - docasne, po vyrieseni zmazat
  console.log(
    JSON.stringify({
      tag: "mw-auth",
      path: request.nextUrl.pathname,
      cookiesIn: request.cookies
        .getAll()
        .filter((c) => c.name.startsWith("sb-"))
        .map((c) => `${c.name}(${c.value.length})`),
      userId: user?.id ?? null,
      authError: error ? `${error.status ?? "?"} ${error.message}` : null,
      attemptedWrites,
    }),
  );

  if (isProtectedPath(request.nextUrl.pathname) && !user) {
    const redirectUrl = new URL("/onboarding", request.url);
    redirectUrl.searchParams.set("next", request.nextUrl.pathname);

    const redirectResponse = NextResponse.redirect(redirectUrl);

    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });

    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|auth(?:/.*)?|api(?:/.*)?|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)",
  ],
};
