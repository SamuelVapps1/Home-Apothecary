import { MagicLinkForm } from "@/components/auth/MagicLinkForm";
import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { BrandMark } from "@/components/decorative/BrandMark";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const user = await getCurrentUser();
  const checkoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL;
  if (user) {
    redirect("/browse");
  }

  const resolvedSearchParams = (await searchParams) ?? {};
  const nextPath = resolvedSearchParams.next;
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/browse", label: "Browse" },
    { href: "/account", label: "Account" },
  ];

  return (
    <main className="min-h-dvh bg-[var(--bg-app)] px-4 py-6">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 outline-none focus-visible:shadow-amber">
            <BrandMark className="h-7 w-7 shrink-0" />
            <h1 className="m-0 font-display text-4xl font-bold tracking-display text-[var(--text-primary)]">
              Enter with a magic link.
            </h1>
          </Link>

          <nav className="hidden items-center gap-1 rounded-pill border border-[var(--border-subtle)] bg-[rgba(240,232,208,0.05)] p-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                className="rounded-pill px-3 py-1.5 font-body text-[0.72rem] uppercase tracking-widest text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <p className="m-0 font-body text-base leading-relaxed text-[var(--text-secondary)]">
          Educational only, not medical advice. Sign in without a password to continue to the
          gated library.
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="amber">No Passwords</Badge>
          <Badge variant="sage">Supabase Auth</Badge>
        </div>

        <BotanicalDivider className="h-7 w-full text-[var(--color-amber-500)] opacity-80" />

        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-md">
          <MagicLinkForm nextPath={nextPath} />
        </div>

        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-md">
          <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Purchase flow
          </p>
          <p className="mt-2 mb-0 max-w-prose font-body text-sm leading-relaxed text-[var(--text-secondary)]">
            Buy access, receive a license key by email, sign in with the magic link above, then
            redeem the key on the redeem page.
          </p>
          {checkoutUrl ? (
            <div className="mt-4">
              <Button href={checkoutUrl} fullWidth>
                Buy access
              </Button>
            </div>
          ) : null}
        </section>
      </section>
    </main>
  );
}
