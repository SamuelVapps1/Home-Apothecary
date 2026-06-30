import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { BrandMark } from "@/components/decorative/BrandMark";
import { getCurrentAccount } from "@/lib/auth";
import { getPlants } from "@/lib/plants";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

function truncateSummary(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export default async function HomePage() {
  const account = await getCurrentAccount();
  const checkoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL;
  const isLoggedIn = Boolean(account?.user);
  const hasAccess = Boolean(account?.profile?.has_access);
  const accessLevel = account?.profile?.access_level ?? "free";
  const previewPlants = !isLoggedIn ? await getPlants() : null;
  const specimenPlants =
    previewPlants && !previewPlants.error ? previewPlants.plants.slice(0, 3) : [];
  const showSpecimenSection = !isLoggedIn && specimenPlants.length === 3;
  const accessHref = checkoutUrl ?? "/onboarding";
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
              {isLoggedIn ? (
                <h1 className="m-0 font-display text-4xl font-bold leading-tight tracking-display text-[var(--text-primary)]">
                  Plant profiles and recipes, in one paid traditional-use home.
                </h1>
              ) : null}
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
          <div className="flex flex-col gap-8">
            <section className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(260px,0.92fr)] lg:items-center">
              <div className="flex flex-col gap-6">
                <div className="max-w-2xl">
                  <p className="m-0 font-body text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-amber-400)]">
                    Virtual Apothecary
                  </p>
                  <h2 className="mt-2 mb-0 font-display text-5xl font-bold leading-none tracking-display text-[var(--text-primary)] sm:text-6xl">
                    A quiet cabinet of traditional plant lore.
                  </h2>
                  <p className="mt-4 mb-0 max-w-prose font-body text-lg leading-relaxed text-[var(--text-secondary)] sm:text-[20px]">
                    Considered plant profiles and traditional-use recipes, each one sourced and
                    kept with care. Buy a key, sign in by email, and the full cabinet opens.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button href={accessHref} size="lg">
                    Get access
                  </Button>
                  <Button href="/library" size="lg" variant="ghost">
                    Preview the library
                  </Button>
                </div>

                <p className="m-0 font-body text-xs italic leading-relaxed text-[var(--text-muted)]">
                  Educational only, not medical advice.
                </p>
              </div>

              <div className="flex items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 shadow-md sm:p-8">
                <div className="w-full max-w-[22rem] text-[var(--color-amber-500)] opacity-[0.55]">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.4"
                    viewBox="0 0 200 300"
                    className="h-auto w-full"
                  >
                    <path d="M100 290 C100 230 100 150 100 60" />
                    <path d="M100 232 C70 224 48 200 42 168 C74 172 96 196 100 230" />
                    <path d="M100 232 C130 224 152 200 158 168 C126 172 104 196 100 230" />
                    <path d="M100 186 C74 180 56 160 50 134 C78 138 96 158 100 184" />
                    <path d="M100 186 C126 180 144 160 150 134 C122 138 104 158 100 184" />
                    <path d="M100 140 C80 136 66 120 60 100 C84 104 98 118 100 138" />
                    <path d="M100 140 C120 136 134 120 140 100 C116 104 102 118 100 138" />
                    <path d="M100 60 C92 48 92 34 100 22 C108 34 108 48 100 60Z" />
                    <circle cx="100" cy="42" r="2.4" fill="currentColor" stroke="none" />
                  </svg>
                </div>
              </div>
            </section>

            <BotanicalDivider className="h-7 w-full text-[var(--color-amber-500)] opacity-80" />

            {showSpecimenSection ? (
              <section className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <p className="m-0 font-body text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Preview the library
                  </p>
                  <h3 className="m-0 font-display text-4xl font-semibold leading-tight tracking-display text-[var(--text-primary)] sm:text-5xl">
                    Inside the cabinet
                  </h3>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  {specimenPlants.map((plant) => (
                    <Link
                      key={plant.slug}
                      href={`/library/${plant.slug}`}
                      className="block h-full outline-none focus-visible:shadow-amber"
                    >
                      <article className="flex h-full min-h-[13rem] flex-col rounded-md border-t-2 border-t-[var(--color-amber-500)] bg-[var(--bg-parchment)] p-4 shadow-sm transition-transform duration-150 ease-in-out hover:-translate-y-0.5">
                        <div className="flex-1">
                          <h4 className="m-0 font-display text-2xl font-semibold leading-tight text-[var(--text-on-parchment)]">
                            {plant.common_name}
                          </h4>
                          <p className="m-0 mt-0.5 font-display text-sm italic leading-tight text-[var(--text-on-parchment-2)]">
                            {plant.name_latin}
                          </p>
                          <p className="m-0 mt-3 font-body text-sm leading-relaxed text-[var(--text-on-parchment-2)]">
                            {truncateSummary(plant.traditional_use_summary, 120)}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--border-safety)] bg-[rgba(139,26,26,0.14)]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-burgundy-400)]" />
                          </span>
                          <span className="font-body text-[0.68rem] uppercase tracking-widest text-[var(--text-safety)]">
                            Safety shown on the profile
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md md:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="m-0 font-body text-[0.7rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    How access works
                  </p>
                  <h3 className="m-0 font-display text-4xl font-semibold leading-tight tracking-display text-[var(--text-primary)] sm:text-5xl">
                    Three access steps
                  </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      step: "1",
                      title: "Buy a key",
                      body: "A one-time purchase. Your license key arrives by email.",
                    },
                    {
                      step: "2",
                      title: "Sign in by email",
                      body: "No passwords. A single magic link opens your account.",
                    },
                    {
                      step: "3",
                      title: "Open the cabinet",
                      body: "Redeem your key once and the full recipe archive unlocks.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex gap-4 rounded-md border border-[var(--border-subtle)] bg-[rgba(240,232,208,0.04)] p-4"
                    >
                      <div className="min-w-0">
                        <div className="font-display text-5xl leading-none tracking-display text-[var(--color-amber-500)]">
                          {item.step}
                        </div>
                      </div>
                      <div>
                        <h4 className="m-0 font-display text-2xl font-semibold leading-tight text-[var(--text-primary)]">
                          {item.title}
                        </h4>
                        <p className="mt-2 mb-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-[var(--border-safety)] bg-[var(--bg-safety)] p-5 shadow-md md:p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--text-safety)]"
                />
                <div className="min-w-0">
                  <h3 className="m-0 font-display text-4xl font-semibold leading-tight tracking-display text-[var(--text-safety)]">
                    Safety is never hidden behind the paywall.
                  </h3>
                  <p className="mt-3 mb-0 max-w-prose font-body text-sm leading-relaxed text-[var(--text-safety)]">
                    Contraindications, interactions, and pregnancy notes are shown on every plant
                    and every recipe, for paying and previewing readers alike. This is a
                    reference, not a prescription.
                  </p>
                </div>
              </div>
            </section>

            <section className="flex flex-col items-center gap-4 text-center">
              <div className="max-w-2xl">
                <h3 className="m-0 font-display text-4xl font-semibold leading-tight tracking-display text-[var(--text-primary)] sm:text-5xl">
                  Keep your apothecary in one steady place.
                </h3>
                <p className="mt-3 mb-0 font-body text-base leading-relaxed text-[var(--text-secondary)]">
                  Profiles, recipes, and the access that holds them together.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                <Button href={accessHref} size="lg">
                  Get access
                </Button>
                <Button href="/redeem" size="lg" variant="ghost">
                  Already purchased? Redeem
                </Button>
              </div>
            </section>
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
