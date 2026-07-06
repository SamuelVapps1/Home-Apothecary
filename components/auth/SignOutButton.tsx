"use client";

import { Button } from "@/components/core/Button";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = NonNullable<ComponentPropsWithoutRef<typeof Button>["variant"]>;
type ButtonSize = NonNullable<ComponentPropsWithoutRef<typeof Button>["size"]>;

type SignOutButtonProps = {
  size?: ButtonSize;
  variant?: ButtonVariant;
  children?: React.ReactNode;
};

export function SignOutButton({ size = "md", variant = "ghost", children = "Sign out" }: SignOutButtonProps) {
  return (
    <form action="/auth/logout" method="post">
      <Button size={size} variant={variant} type="submit">
        {children}
      </Button>
    </form>
  );
}
