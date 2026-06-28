import { AppShell } from "@/components/screens/AppShell";
import { Badge } from "@/components/core/Badge";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { RedeemForm } from "@/components/auth/RedeemForm";
import { Button } from "@/components/core/Button";

export default function RedeemPage() {
  const checkoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL;

  return (
    <AppShell title="Virtual Apothecary" navIndex={3}>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-4">
        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
          <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Redeem access
          </p>
          <h1 className="mt-2 mb-0 font-display text-4xl font-bold tracking-display text-[var(--text-primary)]">
            Enter the license key from your email.
          </h1>
          <p className="mt-3 mb-0 max-w-prose font-body text-base leading-relaxed text-[var(--text-secondary)]">
            Buy access, receive a license key by email, sign in with your magic link, then redeem
            the key here. Access activates on your account after a successful redemption.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="amber">One-time use</Badge>
            <Badge variant="safety">Server enforced</Badge>
            <Badge variant="neutral">Has access gate</Badge>
          </div>

          <BotanicalDivider className="mt-4 h-7 w-full text-[var(--color-amber-500)] opacity-80" />

          <div className="mt-4 rounded-md bg-[var(--bg-parchment)] p-4 shadow-sm">
            <RedeemForm />
          </div>
        </section>

        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
          <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Buy flow
          </p>
          <p className="mt-2 mb-0 max-w-prose font-body text-sm leading-relaxed text-[var(--text-secondary)]">
            Buy access, receive your license key by email, sign in with a magic link, then redeem
            the key on this page. If you already have a key, redeem it above.
          </p>
          {checkoutUrl ? (
            <div className="mt-4">
              <Button href={checkoutUrl} fullWidth>
                Buy access
              </Button>
            </div>
          ) : null}
        </section>
      </div>
    </AppShell>
  );
}
