import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { BrandMark } from "@/components/decorative/BrandMark";
import { Button } from "@/components/core/Button";
import { Badge } from "@/components/core/Badge";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function HomePage() {
  const user = await getCurrentUser();
  const checkoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL;
  const navItems = [
    { href: "/", label: "Home" },
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
                Home Apothecary
              </p>
              <h1 className="m-0 font-display text-4xl font-bold leading-tight tracking-display text-[var(--text-primary)]">
                Traditional remedies, carefully gated.
              </h1>
            </div>
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

        <p className="m-0 max-w-prose font-body text-base leading-relaxed text-[var(--text-secondary)]">
          Educational only, not medical advice. Browse a warm, mobile-first library of herbal
          remedies with prominent safety warnings and purchase-gated full content.
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="amber">Paid Access</Badge>
          <Badge variant="sage">Magic Link</Badge>
          <Badge variant="neutral">Offline Friendly</Badge>
        </div>

        <BotanicalDivider className="h-7 w-full text-[var(--color-amber-500)] opacity-80" />

        <div className="flex flex-col gap-3">
          {user ? (
            <Button href="/browse" fullWidth>
              Continue to the Cabinet
            </Button>
          ) : (
            <Button href="/onboarding" fullWidth>
              Start With Magic Link
            </Button>
          )}
          <Button href="/browse" fullWidth variant="secondary">
            Browse the Cabinet
          </Button>
          {checkoutUrl ? (
            <Button href={checkoutUrl} fullWidth variant="ghost">
              Buy access
            </Button>
          ) : null}
          {user ? (
            <Button href="/auth/logout" fullWidth variant="ghost">
              Sign out
            </Button>
          ) : null}
        </div>

        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-md">
          <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Purchase flow
          </p>
          <p className="mt-2 mb-0 max-w-prose font-body text-sm leading-relaxed text-[var(--text-secondary)]">
            Buy access, receive a license key by email, sign in with a magic link, then redeem the
            key on the redeem page. The access gate stays server enforced.
          </p>
        </section>

        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-md">
          <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
            What to expect
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 font-body text-sm leading-relaxed text-[var(--text-secondary)] marker:text-[var(--color-amber-400)]">
            <li>Traditional-use framing only, never cure claims.</li>
            <li>Full remedy content stays server-gated behind access.</li>
            <li>Safety information is always visible and prominent.</li>
          </ul>
        </section>

        <Link
          className="font-body text-sm uppercase tracking-widest text-[var(--color-amber-400)]"
          href="/redeem"
        >
          Already purchased? Redeem your key
        </Link>
      </section>
    </main>
  );
}
