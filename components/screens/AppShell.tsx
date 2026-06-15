import { BottomNav } from "@/components/core/BottomNav";
import { Button } from "@/components/core/Button";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export async function AppShell({
  title,
  children,
  navIndex = 0,
  className,
}: {
  title: string;
  children: ReactNode;
  navIndex?: number;
  className?: string;
}) {
  const user = await getCurrentUser();

  return (
    <div className={cn("flex min-h-dvh flex-col bg-[var(--bg-app)]", className)}>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-header)] px-4">
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none text-[var(--color-amber-500)]">âš—</span>
          <h1 className="m-0 whitespace-nowrap font-display text-[19px] font-bold tracking-display text-[var(--text-primary)]">
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <span className="hidden rounded-pill border border-[var(--border-subtle)] bg-[rgba(240,232,208,0.08)] px-2.5 py-0.5 font-body text-[0.65rem] uppercase tracking-widest text-[var(--text-secondary)] sm:inline-flex">
              {user.email}
            </span>
          ) : null}
          <span className="text-[18px] leading-none text-[var(--text-muted)]">âŠ™</span>
          {user ? (
            <Button href="/auth/logout" size="sm" variant="ghost">
              Sign out
            </Button>
          ) : null}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">{children}</main>

      <BotanicalDivider className="h-7 w-full opacity-60" />
      <BottomNav
        activeIndex={navIndex}
        items={[
          { icon: "home", label: "Home" },
          { icon: "search", label: "Browse" },
          { icon: "book", label: "Cabinet" },
          { icon: "settings", label: "Settings" },
        ]}
      />
    </div>
  );
}

