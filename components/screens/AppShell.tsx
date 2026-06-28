import Link from "next/link";
import { BottomNav } from "@/components/core/BottomNav";
import { Button } from "@/components/core/Button";
import { BrandMark } from "@/components/decorative/BrandMark";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { getCurrentAccount } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const navItems = [
  { icon: "home" as const, label: "Home", href: "/" },
  { icon: "leaf" as const, label: "Library", href: "/library" },
  { icon: "search" as const, label: "Browse", href: "/browse" },
  { icon: "user" as const, label: "Account", href: "/account" },
];

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
  const account = await getCurrentAccount();
  const user = account?.user ?? null;

  return (
    <div className={cn("flex min-h-dvh flex-col bg-[var(--bg-app)]", className)}>
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-header)] px-4">
        <Link className="flex items-center gap-2.5 outline-none focus-visible:shadow-amber" href="/">
          <BrandMark className="h-6 w-6 shrink-0" />
          <h1 className="m-0 whitespace-nowrap font-display text-[19px] font-bold tracking-display text-[var(--text-primary)]">
            {title}
          </h1>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-1 rounded-pill border border-[var(--border-subtle)] bg-[rgba(240,232,208,0.05)] p-1">
            {navItems.map((item, index) => {
              const isActive = index === navIndex;
              return (
                <Link
                  key={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-pill px-3 py-1.5 font-body text-[0.72rem] uppercase tracking-widest transition-colors",
                    isActive
                      ? "bg-[rgba(201,151,58,0.16)] text-[var(--color-amber-400)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {user ? (
            <span className="hidden rounded-pill border border-[var(--border-subtle)] bg-[rgba(240,232,208,0.08)] px-2.5 py-0.5 font-body text-[0.65rem] uppercase tracking-widest text-[var(--text-secondary)] lg:inline-flex">
              {user.email}
            </span>
          ) : null}

          {user ? (
            <Button href="/auth/logout" size="sm" variant="ghost">
              Sign out
            </Button>
          ) : null}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">{children}</main>

      <BotanicalDivider className="h-7 w-full opacity-60 md:hidden" />
      <BottomNav
        activeIndex={navIndex}
        items={navItems}
      />
    </div>
  );
}
