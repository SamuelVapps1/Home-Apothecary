import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { Button } from "@/components/core/Button";
import { Badge } from "@/components/core/Badge";
import { Input } from "@/components/core/Input";

export default function OnboardingPage() {
  return (
    <main className="min-h-dvh bg-[var(--bg-app)] px-4 py-6">
      <section className="mx-auto flex w-full max-w-md flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl leading-none text-[var(--color-amber-500)]">⚗</span>
          <h1 className="m-0 font-display text-4xl font-bold tracking-display text-[var(--text-primary)]">
            Enter with a magic link.
          </h1>
        </div>

        <p className="m-0 font-body text-base leading-relaxed text-[var(--text-secondary)]">
          Educational only, not medical advice. Sign in without a password to continue to the
          gated cabinet.
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="amber">No Passwords</Badge>
          <Badge variant="sage">Supabase Auth</Badge>
        </div>

        <BotanicalDivider className="h-7 w-full text-[var(--color-amber-500)] opacity-80" />

        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-md">
          <div className="flex flex-col gap-3">
            <Input
              label="Email address"
              placeholder="you@example.com"
              hint="Phase 2 will wire this to Supabase magic-link auth."
            />
            <Button fullWidth>Send Magic Link</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
