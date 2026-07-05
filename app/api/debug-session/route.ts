// app/api/debug-session/route.ts
// DOCASNY DIAGNOSTICKY ENDPOINT - po vyrieseni bugu ZMAZAT.
// Nevracia hodnoty tokenov, len mena cookies a stav auth.

import { createServerClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sbCookies = request.cookies
    .getAll()
    .filter((c) => c.name.startsWith("sb-"))
    .map((c) => ({ name: c.name, length: c.value.length }));

  // Zachytime, co sa supabase klient POKUSI zapisat do cookies
  // (ak sa pokusi o delete, uvidime prazdne hodnoty / maxAge 0 = smoking gun)
  const attemptedWrites: { name: string; valueLength: number; options: unknown }[] = [];

  const supabase = await createServerClient({
    getAll() {
      return request.cookies.getAll();
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value, options }) => {
        attemptedWrites.push({ name, valueLength: value.length, options });
      });
    },
  });

  const { data, error } = await supabase.auth.getUser();

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    cookiesReceived: sbCookies,
    user: data?.user ? { id: data.user.id, email: data.user.email } : null,
    authError: error ? { message: error.message, status: error.status, code: error.code } : null,
    attemptedCookieWrites: attemptedWrites,
  });
}