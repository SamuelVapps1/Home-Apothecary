"use client";

import { Button } from "@/components/core/Button";
import { Input } from "@/components/core/Input";
import { createBrowserClient } from "@/lib/supabase/client";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { Mail } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";

export function MagicLinkForm({ nextPath = "/browse" }: { nextPath?: string }) {
  const configured = Boolean(getSupabaseConfig());
  const supabase = useMemo(() => (configured ? createBrowserClient() : null), [configured]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!supabase) {
      setError("Supabase env vars are missing in this build.");
      return;
    }

    setSending(true);

    try {
      const redirectBase = window.location.origin;
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${redirectBase}/auth/callback?next=${encodeURIComponent(nextPath)}`,
        },
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      setMessage("Magic link sent. Check your inbox to continue.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to send magic link.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input
        label="Email address"
        placeholder="you@example.com"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        leadingIcon={<Mail className="h-4 w-4" />}
        hint="We will send a passwordless sign-in link to this address."
      />

      <Button fullWidth type="submit" disabled={sending || !email}>
        {sending ? "Sending..." : "Send Magic Link"}
      </Button>

      {message ? <p className="m-0 font-body text-sm text-[var(--color-sage-300)]">{message}</p> : null}
      {error ? <p className="m-0 font-body text-sm text-[var(--color-burgundy-300)]">{error}</p> : null}
      {!configured ? (
        <p className="m-0 font-body text-xs italic leading-relaxed text-[var(--text-muted)]">
          Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to enable auth.
        </p>
      ) : null}
    </form>
  );
}
