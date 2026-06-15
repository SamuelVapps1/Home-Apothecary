"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, Search, User } from "lucide-react";

const iconMap = {
  home: Home,
  search: Search,
  user: User,
};

export function BottomNav({
  items = [],
  activeIndex = 0,
}: {
  items?: Array<{ icon: keyof typeof iconMap; label: string; href: string }>;
  activeIndex?: number;
}) {
  return (
    <nav className="flex h-16 w-full shrink-0 items-stretch border-t border-[var(--border-subtle)] bg-[var(--bg-bottom-nav)] md:hidden">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon];
        const isActive = index === activeIndex;

        return (
          <Link
            key={item.label}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-[3px] border-t-2 bg-transparent px-1 py-2 outline-none transition-all duration-150 ease-in-out",
              isActive ? "border-t-[var(--color-amber-500)]" : "border-t-transparent",
            )}
            href={item.href}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                isActive ? "text-[var(--color-amber-500)]" : "text-[var(--text-muted)]",
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                "font-body text-[0.58rem] uppercase tracking-wider transition-colors duration-150",
                isActive ? "text-[var(--color-amber-400)]" : "text-[var(--text-muted)]",
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
