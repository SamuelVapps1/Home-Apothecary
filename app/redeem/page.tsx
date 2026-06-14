import { AppShell } from "@/components/screens/AppShell";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { Button } from "@/components/core/Button";
import { Input } from "@/components/core/Input";
import { Badge } from "@/components/core/Badge";

export default function RedeemPage() {
  return (
    <AppShell title="Home Apothecary" navIndex={2}>
      <div className="flex min-h-full flex-col gap-5 px-4 py-4">
        <div>
          <h1 className="m-0 font-display text-4xl font-bold tracking-display text-[var(--text-primary)]">
            Redeem your license key.
          </h1>
          <p className="mt-2 mb-0 font-body text-base leading-relaxed text-[var(--text-secondary)]">
            Educational only, not medical advice. Phase 4 will wire this form to the server-side
            one-time redemption flow.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="amber">One-time use</Badge>
          <Badge variant="safety">Server enforced</Badge>
        </div>

        <BotanicalDivider className="h-7 w-full text-[var(--color-amber-500)] opacity-80" />

        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-md">
          <div className="flex flex-col gap-3">
            <Input label="License key" placeholder="XXXX-XXXX-XXXX-XXXX" />
            <Button fullWidth>Redeem key</Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
