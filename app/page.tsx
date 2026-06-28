import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { BrandMark } from "@/components/decorative/BrandMark";
import { getCurrentAccount } from "@/lib/auth";
import Link from "next/link";

export default async function HomePage() {
  const account = await getCurrentAccount();
  const checkoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL;
  const isLoggedIn = Boolean(account?.user);
  const hasAccess = Boolean(account?.profile?.has_access);
  const accessLevel = account?.profile?.access_level ?? "free";
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/library", label: "Library" },
    { href: "/browse", label: "Browse" },
    { href: "/account", label: "Account" },
  ];

  return (
    <main className="min-h-dvh bg-[var(--bg-app)] px-4 py-6 text-[var(--text-primary)]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 outline-none focus-visible:shadow-amber">
            <BrandMark className="h-7 w-7 shrink-0" />
            <div>
              <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                Virtual Apothecary
              </p>
              <h1 className="m-0 font-display text-4xl font-bold leading-tight tracking-display text-[var(--text-primary)]">
                Plant profiles and recipes, in one paid traditional-use home.
              </h1>
            </div>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <nav className="flex items-center gap-1 rounded-pill border border-[var(--border-subtle)] bg-[rgba(240,232,208,0.05)] p-1">
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

            {isLoggedIn ? (
              <Button href="/auth/logout" size="sm" variant="ghost">
                Sign out
              </Button>
            ) : null}
          </div>
        </header>

        {!isLoggedIn ? (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <section className="flex flex-col gap-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md md:p-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="amber">Traditional use</Badge>
                <Badge variant="sage">Magic link</Badge>
                <Badge variant="neutral">Server-gated content</Badge>
              </div>

              <div className="max-w-2xl">
                <h2 className="m-0 font-display text-4xl font-semibold leading-tight tracking-display text-[var(--text-primary)] md:text-5xl">
                  A calm place for plant profiles, recipe notes, and the access path behind them.
                </h2>
                <p className="mt-4 mb-0 max-w-prose font-body text-base leading-relaxed text-[var(--text-secondary)]">
                  Buy access when you are ready, sign in with a magic link, and redeem your key
                  from email. You can still preview the library before deciding.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {checkoutUrl ? (
                  <Button href={checkoutUrl} fullWidth size="lg">
                    Buy access
                  </Button>
                ) : null}
                <Button
                  href="/onboarding"
                  fullWidth
                  size="lg"
                  variant={checkoutUrl ? "secondary" : "primary"}
                >
                  Start with magic link
                </Button>
                <Button href="/library" fullWidth variant="ghost">
                  Browse the library
                </Button>
                <Button href="/redeem" fullWidth variant="ghost">
                  Already purchased? Redeem
                </Button>
              </div>

              <BotanicalDivider className="h-7 w-full text-[var(--color-amber-500)] opacity-80" />

              <p className="m-0 max-w-prose font-body text-xs leading-relaxed text-[var(--text-muted)]">
                Educational only, not medical advice. Traditional-use framing is intentional, and
                safety sections stay visible on content pages.
              </p>
            </section>

            <aside className="grid gap-4">
              <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
                <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  Access model
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 font-body text-sm leading-relaxed text-[var(--text-secondary)] marker:text-[var(--color-amber-400)]">
                  <li>License keys are redeemed once on the server.</li>
                  <li>The library preview is public and read-only.</li>
                  <li>Full recipe content remains behind access checks.</li>
                </ul>
              </section>

              <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
                <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  What to expect
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 font-body text-sm leading-relaxed text-[var(--text-secondary)] marker:text-[var(--color-amber-400)]">
                  <li>Plant library cards stay list-safe and non-gated.</li>
                  <li>Recipes keep traditional-use framing only.</li>
                  <li>Contraindications, interactions, and pregnancy notes stay visible.</li>
                </ul>
              </section>
            </aside>
          </div>
        ) : hasAccess ? (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md md:p-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="sage">Access active</Badge>
                <Badge variant="amber">
                  {accessLevel.charAt(0).toUpperCase() + accessLevel.slice(1)} tier
                </Badge>
              </div>

              <h2 className="mt-4 mb-0 font-display text-4xl font-semibold leading-tight tracking-display text-[var(--text-primary)] md:text-5xl">
                Your library is open.
              </h2>
              <p className="mt-4 mb-0 max-w-prose font-body text-base leading-relaxed text-[var(--text-secondary)]">
                Choose the plant library for profiles or the recipe browse surface for full entries
                and traditional-use notes.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Button href="/library" fullWidth size="lg">
                  Plant Library
                </Button>
                <Button href="/browse" fullWidth size="lg" variant="secondary">
                  Recipes
                </Button>
              </div>
            </section>

            <aside className="grid gap-4">
              <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
                <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  Signed in
                </p>
                <p className="mt-3 mb-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                  Access is active for this account. Safety sections remain visible everywhere the
                  content appears.
                </p>
              </section>
              <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
                <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  Next step
                </p>
                <Link
                  className="mt-3 inline-flex font-body text-sm uppercase tracking-widest text-[var(--color-amber-400)]"
                  href="/redeem"
                >
                  Redeem a new key
                </Link>
              </section>
            </aside>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md md:p-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="neutral">Access locked</Badge>
                <Badge variant="amber">Preview mode</Badge>
              </div>

              <h2 className="mt-4 mb-0 font-display text-4xl font-semibold leading-tight tracking-display text-[var(--text-primary)] md:text-5xl">
                Your account is signed in, but the full library is still locked.
              </h2>
              <p className="mt-4 mb-0 max-w-prose font-body text-base leading-relaxed text-[var(--text-secondary)]">
                You can preview the plant library and browse the recipe surface, but the complete
                content unlocks after purchase and redemption.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {checkoutUrl ? (
                  <Button href={checkoutUrl} fullWidth size="lg">
                    Buy access
                  </Button>
                ) : (
                  <Button href="/onboarding" fullWidth size="lg">
                    Start with magic link
                  </Button>
                )}
                <Button href="/library" fullWidth size="lg" variant="secondary">
                  Browse the library
                </Button>
                <Button href="/browse" fullWidth variant="ghost">
                  Preview recipes
                </Button>
                <Button href="/redeem" fullWidth variant="ghost">
                  Redeem your key
                </Button>
              </div>
            </section>

            <aside className="grid gap-4">
              <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
                <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  Account status
                </p>
                <p className="mt-3 mb-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                  Your profile exists, but access has not been activated yet.
                </p>
              </section>
              <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
                <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  Reminder
                </p>
                <p className="mt-3 mb-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                  Full entries stay server-side only. Previewing the library does not bypass the
                  access check.
                </p>
              </section>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
