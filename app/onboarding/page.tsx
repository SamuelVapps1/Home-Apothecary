import { MagicLinkForm } from "@/components/auth/MagicLinkForm";
import { Badge } from "@/components/core/Badge";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) {
    redirect("/browse");
  }

  const resolvedSearchParams = (await searchParams) ?? {};
  const nextPath = resolvedSearchParams.next;

  return (
    <main className="min-h-dvh bg-[var(--bg-app)] px-4 py-6">
      <section className="mx-auto flex w-full max-w-md flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl leading-none text-[var(--color-amber-500)]">âš—</span>
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
          <MagicLinkForm nextPath={nextPath} />
        </div>
      </section>
    </main>
  );
}

