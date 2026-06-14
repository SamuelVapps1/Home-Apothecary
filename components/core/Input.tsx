"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ChangeEventHandler, ReactNode } from "react";

export function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  leadingIcon,
  hint,
  className,
}: {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  leadingIcon?: ReactNode;
  hint?: string;
  className?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label ? (
        <label className="font-body text-xs font-medium uppercase tracking-widest text-[var(--text-secondary)]">
          {label}
        </label>
      ) : null}

      <div className="relative">
        {leadingIcon ? (
          <div
            className={cn(
              "pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center text-[16px] transition-colors duration-150",
              focused ? "text-[var(--color-amber-500)]" : "text-[var(--text-muted)]",
            )}
          >
            {leadingIcon}
          </div>
        ) : null}

        <input
          className={cn(
            "w-full rounded-md border bg-[var(--bg-input)] px-3.5 py-[11px] text-base text-[var(--text-primary)] outline-none",
            "shadow-[inset_0_1px_4px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow] duration-150",
            focused
              ? "border-[var(--border-input-focus)] shadow-[0_0_0_3px_rgba(201,151,58,0.3)]"
              : "border-[var(--border-input)]",
            leadingIcon && "pl-10",
          )}
          onBlur={() => setFocused(false)}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </div>

      {hint ? (
        <p className="m-0 font-body text-xs italic leading-relaxed text-[var(--text-muted)]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
