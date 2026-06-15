import { createServiceRoleClient } from "@/lib/supabase/admin";
import crypto from "crypto";
import { NextResponse, type NextRequest } from "next/server";

function normalizeSignature(signature: string) {
  return signature.trim().replace(/^sha256=/i, "");
}

function timingSafeHexEqual(expectedHex: string, receivedHex: string) {
  if (!/^[0-9a-f]+$/i.test(expectedHex) || !/^[0-9a-f]+$/i.test(receivedHex)) {
    return false;
  }

  if (expectedHex.length !== receivedHex.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(expectedHex, "hex"), Buffer.from(receivedHex, "hex"));
}

function findFirstString(value: unknown, keys: string[]): string | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      const found = findFirstString(entry, keys);
      if (found) {
        return found;
      }
    }
    return null;
  }

  const record = value as Record<string, unknown>;

  for (const key of keys) {
    const candidate = record[key];
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  for (const nested of Object.values(record)) {
    const found = findFirstString(nested, keys);
    if (found) {
      return found;
    }
  }

  return null;
}

function getEventName(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const record = payload as Record<string, unknown>;
  const topLevel = record["meta"];
  const nestedEvent = findFirstString(topLevel, ["event_name", "event", "name"]);
  if (nestedEvent) {
    return nestedEvent;
  }

  return findFirstString(payload, ["event_name", "event"]);
}

export async function POST(request: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret missing." }, { status: 500 });
  }

  const rawBody = await request.text();
  const signatureHeader = request.headers.get("x-signature");

  if (!signatureHeader) {
    return NextResponse.json({ error: "Missing signature." }, { status: 401 });
  }

  const expectedSignature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const receivedSignature = normalizeSignature(signatureHeader);

  if (!timingSafeHexEqual(expectedSignature, receivedSignature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const eventName = getEventName(payload);
  const shouldProcess = eventName === "order_created" || eventName === "license_key_created";
  if (!shouldProcess) {
    return NextResponse.json({ ok: true });
  }

  const licenseKey =
    findFirstString(payload, ["license_key", "licenseKey", "key", "license_key_value"]) ?? null;
  const orderId =
    findFirstString(payload, ["lemonsqueezy_order_id", "order_id", "orderId", "order_number", "id"]) ??
    null;

  if (!licenseKey || !orderId) {
    return NextResponse.json({ ok: true });
  }

  const serviceRole = createServiceRoleClient();
  const { error } = await serviceRole.from("license_keys").upsert(
    {
      key: licenseKey,
      lemonsqueezy_order_id: orderId,
      status: "valid",
      redeemed_by: null,
      redeemed_at: null,
    },
    {
      onConflict: "key",
    },
  );

  if (error) {
    return NextResponse.json({ error: "Failed to store license key." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
