"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Tag({
  children,
  active = false,
  onClick,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill border px-4 py-[7px] text-[0.75rem]",
        "font-body font-medium tracking-wide transition-all duration-150 ease-in-out outline-none",
        active
          ? "border-[var(--color-amber-500)] bg-[rgba(201,151,58,0.14)] text-[var(--color-amber-400)]"
          : hovered
            ? "border-[rgba(240,232,208,0.28)] bg-[rgba(240,232,208,0.05)] text-[var(--text-primary)]"
            : "border-[var(--border-subtle)] bg-transparent text-[var(--text-secondary)]",
        className,
      )}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      type="button"
    >
      {children}
    </button>
  );
}
