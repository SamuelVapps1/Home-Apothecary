import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "amber" | "sage" | "safety" | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  amber: "border-[rgba(201,151,58,0.35)] bg-[rgba(201,151,58,0.17)] text-[var(--color-amber-400)]",
  sage: "border-[rgba(122,158,122,0.35)] bg-[rgba(122,158,122,0.17)] text-[var(--color-sage-300)]",
  safety: "border-[var(--color-burgundy-400)] bg-[var(--color-burgundy-500)] text-[var(--color-parchment-100)]",
  neutral: "border-[var(--border-subtle)] bg-[rgba(240,232,208,0.08)] text-[var(--text-secondary)]",
};

export function Badge({
  children,
  variant = "amber",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-pill border px-2.5 py-0.5 text-[0.65rem] uppercase tracking-widest",
        "font-body font-medium leading-[1.5]",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
