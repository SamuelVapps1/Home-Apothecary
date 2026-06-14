"use client";

import { cn } from "@/lib/utils";
import { BookOpen, Home, Search, Settings } from "lucide-react";

const iconMap = {
  home: Home,
  search: Search,
  book: BookOpen,
  settings: Settings,
};

export function BottomNav({
  items = [],
  activeIndex = 0,
  onItemClick,
}: {
  items?: Array<{ icon: keyof typeof iconMap; label: string }>;
  activeIndex?: number;
  onItemClick?: (index: number) => void;
}) {
  return (
    <nav className="flex h-16 w-full shrink-0 items-stretch border-t border-[var(--border-subtle)] bg-[var(--bg-bottom-nav)]">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon];
        const isActive = index === activeIndex;

        return (
          <button
            key={item.label}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-[3px] border-t-2 bg-transparent px-1 py-2 outline-none transition-all duration-150 ease-in-out",
              isActive ? "border-t-[var(--color-amber-500)]" : "border-t-transparent",
            )}
            onClick={() => onItemClick?.(index)}
            type="button"
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
          </button>
        );
      })}
    </nav>
  );
}
