"use client";

import { Button } from "@/components/core/Button";
import { Input } from "@/components/core/Input";
import { createBrowserClient } from "@/lib/supabase/client";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";

type Mode = "signin" | "signup";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function formatAuthError(message: string, mode: Mode) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Email or password is incorrect.";
  }

  if (normalized.includes("user already registered") || normalized.includes("already exists")) {
    return mode === "signup"
      ? "An account already exists for that email. Sign in instead or reset your password."
      : "That account already exists. Try signing in instead.";
  }

  if (normalized.includes("password should be at least")) {
    return "Password must be at least 8 characters.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Check your email to confirm your account.";
  }

  return message;
}

function isFirstLogin(createdAt: string | null | undefined) {
  if (!createdAt) {
    return false;
  }

  const createdAtMs = new Date(createdAt).getTime();
  if (Number.isNaN(createdAtMs)) {
    return false;
  }

  return Date.now() - createdAtMs <= 10 * 60 * 1000;
}

export function AuthForm({ nextPath = "/browse" }: { nextPath?: string }) {
  const configured = Boolean(getSupabaseConfig());
  const supabase = useMemo(() => (configured ? createBrowserClient() : null), [configured]);
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  function clearStatus() {
    setMessage(null);
    setError(null);
    setFieldErrors({});
  }

  function validateInputs() {
    const nextFieldErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!isValidEmail(email)) {
      nextFieldErrors.email = "Enter a valid email address.";
    }

    if (password.length < 8) {
      nextFieldErrors.password = "Password must be at least 8 characters.";
    }

    if (mode === "signup" && password !== confirmPassword) {
      nextFieldErrors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(nextFieldErrors);
    return Object.keys(nextFieldErrors).length === 0;
  }

  function buildCallbackUrl(next: string) {
    return `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
  }

  function getAuthNextPath() {
    return mode === "signup" ? "/welcome" : nextPath;
  }

  async function handleGoogleSignIn() {
    clearStatus();

    if (!supabase) {
      setError("Supabase env vars are missing in this build.");
      return;
    }

    setLoading(true);

    try {
      const authNextPath = getAuthNextPath();
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: buildCallbackUrl(authNextPath),
        },
      });

      if (signInError) {
        setError(formatAuthError(signInError.message, mode));
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    clearStatus();

    if (!supabase) {
      setError("Supabase env vars are missing in this build.");
      return;
    }

    if (!isValidEmail(email)) {
      setFieldErrors({ email: "Enter the email address you want to reset." });
      return;
    }

    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: buildCallbackUrl("/auth/reset-password"),
      });

      if (resetError) {
        setError(formatAuthError(resetError.message, mode));
        return;
      }

      setMessage("Check your email for a password reset link.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Password reset failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearStatus();

    if (!supabase) {
      setError("Supabase env vars are missing in this build.");
      return;
    }

    if (!validateInputs()) {
      return;
    }

    setLoading(true);

    try {
      if (mode === "signin") {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(formatAuthError(signInError.message, mode));
          return;
        }

        if (data.session) {
          router.replace(isFirstLogin(data.session.user.created_at) ? "/welcome" : getAuthNextPath());
          router.refresh();
          return;
        }

        setError("Sign in did not create a session.");
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: buildCallbackUrl("/welcome"),
        },
      });

      if (signUpError) {
        setError(formatAuthError(signUpError.message, mode));
        return;
      }

      if (data.session) {
        router.replace("/welcome");
        router.refresh();
        return;
      }

      setMessage("Check your email to confirm your account.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  const submitLabel = mode === "signin" ? "Sign in with email" : "Create account";
  const modeLabel = mode === "signin" ? "Sign in" : "Create account";

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {message ? (
        <p className="m-0 rounded-md border border-[var(--border-subtle)] bg-[rgba(240,232,208,0.05)] px-3 py-2 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
          {message}
        </p>
      ) : null}

      {error ? (
        <p className="m-0 rounded-md border border-[var(--border-safety)] bg-[var(--bg-safety)] px-3 py-2 font-body text-sm leading-relaxed text-[var(--text-safety)]">
          {error}
        </p>
      ) : null}

      <Button fullWidth size="lg" type="button" disabled={loading} onClick={handleGoogleSignIn}>
        Continue with Google
      </Button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--border-subtle)]" />
        <span className="font-body text-[0.68rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
          or continue with email
        </span>
        <div className="h-px flex-1 bg-[var(--border-subtle)]" />
      </div>

      <div className="inline-flex rounded-pill border border-[var(--border-subtle)] p-1">
        <button
          className={`rounded-pill px-3 py-1.5 font-body text-[0.72rem] uppercase tracking-widest transition-colors ${
            mode === "signin"
              ? "bg-[rgba(240,232,208,0.08)] text-[var(--text-primary)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
          type="button"
          onClick={() => {
            clearStatus();
            setMode("signin");
          }}
        >
          Sign in
        </button>
        <button
          className={`rounded-pill px-3 py-1.5 font-body text-[0.72rem] uppercase tracking-widest transition-colors ${
            mode === "signup"
              ? "bg-[rgba(240,232,208,0.08)] text-[var(--text-primary)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
          type="button"
          onClick={() => {
            clearStatus();
            setMode("signup");
          }}
        >
          Sign up
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          autoComplete="email"
          label="Email address"
          leadingIcon={<Mail className="h-4 w-4" />}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          type="email"
          value={email}
        />
        {fieldErrors.email ? (
          <p className="m-0 -mt-1 font-body text-xs leading-relaxed text-[var(--text-safety)]">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <Input
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          label="Password"
          leadingIcon={<Lock className="h-4 w-4" />}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 8 characters"
          type="password"
          value={password}
          hint="Use a password with at least 8 characters."
        />
        {fieldErrors.password ? (
          <p className="m-0 -mt-1 font-body text-xs leading-relaxed text-[var(--text-safety)]">
            {fieldErrors.password}
          </p>
        ) : null}
      </div>

      {mode === "signup" ? (
        <div className="flex flex-col gap-3">
          <Input
            autoComplete="new-password"
            label="Confirm password"
            leadingIcon={<Lock className="h-4 w-4" />}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repeat your password"
            type="password"
            value={confirmPassword}
          />
          {fieldErrors.confirmPassword ? (
            <p className="m-0 -mt-1 font-body text-xs leading-relaxed text-[var(--text-safety)]">
              {fieldErrors.confirmPassword}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3">
        <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
          {modeLabel}
        </p>
        {mode === "signin" ? (
          <button
            className="font-body text-xs uppercase tracking-widest text-[var(--color-amber-400)] transition-colors hover:text-[var(--color-amber-300)]"
            disabled={loading}
            type="button"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        ) : null}
      </div>

      <Button fullWidth disabled={loading} type="submit">
        {loading ? "Working..." : submitLabel}
      </Button>

      {!configured ? (
        <p className="m-0 font-body text-xs italic leading-relaxed text-[var(--text-muted)]">
          Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to enable auth.
        </p>
      ) : null}
    </form>
  );
}
