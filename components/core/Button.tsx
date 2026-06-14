"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-[var(--color-amber-600)] bg-[var(--color-amber-500)] text-[var(--text-on-amber)] hover:bg-[var(--color-amber-400)] hover:shadow-[0_2px_10px_rgba(201,151,58,0.35)]",
  secondary:
    "border-[var(--color-amber-500)] bg-transparent text-[var(--color-amber-400)] hover:bg-[rgba(201,151,58,0.10)]",
  ghost:
    "border-[var(--border-subtle)] bg-transparent text-[var(--text-primary)] hover:bg-[rgba(240,232,208,0.07)]",
  danger:
    "border-[var(--color-burgundy-600)] bg-[var(--color-burgundy-500)] text-[var(--text-safety)] hover:bg-[var(--color-burgundy-400)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-[0.68rem]",
  md: "px-[22px] py-2.5 text-[0.74rem]",
  lg: "px-7 py-3.5 text-[0.82rem]",
};

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

type ButtonProps =
  | (SharedProps &
      ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
      })
  | (SharedProps &
      Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
        href: string;
      });

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  href,
  ...rest
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const common = cn(
    "inline-flex select-none items-center justify-center gap-1.5 rounded-md border font-body font-medium uppercase tracking-widest",
    "transition-[background-color,box-shadow,transform,border-color,opacity] duration-150 ease-in-out",
    "outline-none focus-visible:shadow-[0_0_0_3px_rgba(201,151,58,0.3)]",
    fullWidth && "w-full",
    sizeClasses[size],
    variantClasses[variant],
    pressed && "scale-[0.97]",
    className,
  );

  const interactiveProps = {
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
    onMouseLeave: () => setPressed(false),
  };

  if (href) {
    const anchorProps = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
    return (
      <Link className={common} href={href} {...interactiveProps} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={common}
      type={buttonProps.type ?? "button"}
      {...interactiveProps}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
