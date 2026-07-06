"use client";

import { Button } from "@/components/core/Button";
import { Input } from "@/components/core/Input";
import { createBrowserClient } from "@/lib/supabase/client";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

function isValidPassword(value: string) {
  return value.length >= 8;
}

export default function ResetPasswordPage() {
  const configured = Boolean(getSupabaseConfig());
  const supabase = useMemo(() => (configured ? createBrowserClient() : null), [configured]);
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      if (!supabase) {
        if (!cancelled) {
          setError("Supabase env vars are missing in this build.");
          setCheckingSession(false);
        }
        return;
      }

      const { data, error: sessionError } = await supabase.auth.getUser();

      if (cancelled) {
        return;
      }

      if (sessionError || !data.user) {
        setError("Your recovery session is missing. Please open the latest password reset email.");
      }

      setCheckingSession(false);
    }

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!supabase) {
      setError("Supabase env vars are missing in this build.");
      return;
    }

    if (!isValidPassword(newPassword)) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setMessage("Password updated. Redirecting to the cabinet...");
      router.replace("/browse");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Password update failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-dvh bg-[var(--bg-app)] px-4 py-8 text-[var(--text-primary)]">
      <section className="mx-auto flex w-full max-w-lg flex-col gap-5">
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md md:p-6">
          <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Reset password
          </p>
          <h1 className="mt-2 mb-0 font-display text-4xl font-bold tracking-display text-[var(--text-primary)]">
            Create a new password.
          </h1>
          <p className="mt-3 mb-0 max-w-prose font-body text-base leading-relaxed text-[var(--text-secondary)]">
            Use the recovery link from your email, then set a new password for your account.
          </p>

          {message ? (
            <p className="mt-4 mb-0 rounded-md border border-[var(--border-subtle)] bg-[rgba(240,232,208,0.05)] px-3 py-2 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
              {message}
            </p>
          ) : null}

          {error ? (
            <p className="mt-4 mb-0 rounded-md border border-[var(--border-safety)] bg-[var(--bg-safety)] px-3 py-2 font-body text-sm leading-relaxed text-[var(--text-safety)]">
              {error}
            </p>
          ) : null}

          <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              autoComplete="new-password"
              label="New password"
              leadingIcon={<Lock className="h-4 w-4" />}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="At least 8 characters"
              type="password"
              value={newPassword}
              hint="Use a password with at least 8 characters."
            />
            <Input
              autoComplete="new-password"
              label="Confirm new password"
              leadingIcon={<Lock className="h-4 w-4" />}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat your password"
              type="password"
              value={confirmPassword}
            />

            <Button disabled={loading || checkingSession} fullWidth type="submit">
              {loading ? "Updating..." : "Update password"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
