import { createServiceRoleClient } from "@/lib/supabase/admin";

type RateLimitOptions = {
  bucket: string;
  limit: number;
  windowSeconds: number;
};

export async function consumeRateLimit({ bucket, limit, windowSeconds }: RateLimitOptions) {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase.rpc("consume_rate_limit", {
    p_bucket: bucket,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });

  if (error) {
    throw error;
  }

  return Boolean(data);
}

