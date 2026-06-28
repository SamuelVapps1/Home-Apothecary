import { AppShell } from "@/components/screens/AppShell";
import { Badge } from "@/components/core/Badge";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { Button } from "@/components/core/Button";
import { getCurrentAccount } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const account = await getCurrentAccount();

  if (!account?.user) {
    redirect("/onboarding");
  }

  const email = account.profile?.email || account.user.email || "Unknown";
  const accessLevel = account.profile?.access_level ?? "free";
  const activatedAt = account.profile?.activated_at;
  const accessLabel = accessLevel === "free" ? "Free" : accessLevel === "standard" ? "Standard" : "Premium";
  const accessVariant = accessLevel === "premium" ? "sage" : accessLevel === "standard" ? "amber" : "neutral";

  return (
    <AppShell title="Virtual Apothecary" navIndex={3}>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-4">
        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
          <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Account
          </p>
          <h2 className="mt-2 mb-0 font-display text-3xl font-semibold tracking-display text-[var(--text-primary)]">
            Signed-in profile
          </h2>

          <BotanicalDivider className="mt-4 h-7 w-full text-[var(--color-amber-500)] opacity-80" />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-[var(--bg-parchment)] p-4 shadow-sm">
              <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-on-parchment-2)]">
                Email
              </p>
              <p className="mt-1 mb-0 font-body text-base leading-relaxed text-[var(--text-on-parchment)]">
                {email}
              </p>
            </div>

            <div className="rounded-md bg-[var(--bg-parchment)] p-4 shadow-sm">
              <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-on-parchment-2)]">
                Access level
              </p>
              <div className="mt-2">
                <Badge variant={accessVariant}>{accessLabel}</Badge>
              </div>
            </div>
          </div>

          {activatedAt ? (
            <p className="mt-4 mb-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
              Activated at {new Date(activatedAt).toLocaleString()}.
            </p>
          ) : null}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button href="/auth/logout" variant="ghost">
              Sign out
            </Button>
            <Button href="/browse" variant="secondary">
              Back to Browse
            </Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
