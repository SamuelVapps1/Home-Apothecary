import { createServiceRoleClient } from "@/lib/supabase/admin";
import { consumeRateLimit } from "@/lib/rate-limit";
import { createServerClient } from "@/lib/supabase/server";
import { z } from "zod";
import { NextResponse, type NextRequest } from "next/server";

const bodySchema = z.object({
  key: z.string().trim().min(4).max(128),
});

const REDEEM_WINDOW_SECONDS = 15 * 60;
const ACCOUNT_LIMIT = 5;
const IP_LIMIT = 12;

type CookieOptions = Parameters<NextResponse["cookies"]["set"]>[2];

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

async function createAuthedServerClient(request: NextRequest) {
  const cookieUpdates: Array<{
    name: string;
    value: string;
    options: CookieOptions;
  }> = [];

  const supabase = await createServerClient({
    getAll() {
      return request.cookies.getAll();
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value, options }) => {
        cookieUpdates.push({ name, value, options });
      });
    },
  });

  function applyCookies(response: NextResponse) {
    cookieUpdates.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
    });
  }

  return { supabase, applyCookies };
}

export async function POST(request: NextRequest) {
  const { supabase, applyCookies } = await createAuthedServerClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const response = NextResponse.json({ error: "sign_in_required" }, { status: 401 });
    applyCookies(response);
    return response;
  }

  const clientIp = getClientIp(request);
  const accountBucket = `redeem:account:${user.id}`;
  const ipBucket = `redeem:ip:${clientIp}`;

  try {
    const [accountAllowed, ipAllowed] = await Promise.all([
      consumeRateLimit({ bucket: accountBucket, limit: ACCOUNT_LIMIT, windowSeconds: REDEEM_WINDOW_SECONDS }),
      consumeRateLimit({ bucket: ipBucket, limit: IP_LIMIT, windowSeconds: REDEEM_WINDOW_SECONDS }),
    ]);

    if (!accountAllowed || !ipAllowed) {
      const response = NextResponse.json(
        { error: "Too many redemption attempts. Try again later." },
        { status: 429 },
      );
      applyCookies(response);
      return response;
    }

    const parsedBody = bodySchema.safeParse(await request.json());
    if (!parsedBody.success) {
      const response = NextResponse.json({ error: "Enter a valid license key." }, { status: 400 });
      applyCookies(response);
      return response;
    }

    const serviceRole = createServiceRoleClient();
    const { data: existingKey, error: lookupError } = await serviceRole
      .from("license_keys")
      .select("key,status")
      .eq("key", parsedBody.data.key)
      .maybeSingle();

    if (lookupError || !existingKey || existingKey.status !== "valid") {
      const response = NextResponse.json(
        { error: "That key is invalid or has already been redeemed." },
        { status: 400 },
      );
      applyCookies(response);
      return response;
    }

    const { error: redeemError } = await serviceRole.rpc("redeem_license_key", {
      p_key: parsedBody.data.key,
      p_user_id: user.id,
    });

    if (redeemError) {
      const response = NextResponse.json(
        { error: "That key is invalid or has already been redeemed." },
        { status: 400 },
      );
      applyCookies(response);
      return response;
    }

    const response = NextResponse.json({
      ok: true,
      message: "License key redeemed. Access is now active.",
    });
    applyCookies(response);
    return response;
  } catch {
    const response = NextResponse.json(
      { error: "Something went wrong while redeeming the key." },
      { status: 500 },
    );
    applyCookies(response);
    return response;
  }
}
