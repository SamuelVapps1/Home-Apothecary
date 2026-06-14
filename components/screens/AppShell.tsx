import { BottomNav } from "@/components/core/BottomNav";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function AppShell({
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
  return (
    <div className={cn("flex min-h-dvh flex-col bg-[var(--bg-app)]", className)}>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-header)] px-4">
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none text-[var(--color-amber-500)]">⚗</span>
          <h1 className="m-0 whitespace-nowrap font-display text-[19px] font-bold tracking-display text-[var(--text-primary)]">
            {title}
          </h1>
        </div>
        <span className="text-[18px] leading-none text-[var(--text-muted)]">⊙</span>
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
