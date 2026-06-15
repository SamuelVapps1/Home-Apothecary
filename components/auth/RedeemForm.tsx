"use client";

import { Button } from "@/components/core/Button";
import { Input } from "@/components/core/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

type RedeemState = {
  kind: "idle" | "success" | "error";
  message: string;
};

export function RedeemForm() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState<RedeemState>({ kind: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState({ kind: "idle", message: "" });

    try {
      const response = await fetch("/api/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        setState({
          kind: "error",
          message: data.error ?? "Could not redeem that key.",
        });
        return;
      }

      setState({
        kind: "success",
        message: data.message ?? "License key redeemed.",
      });
      setKey("");
      router.refresh();
    } catch {
      setState({
        kind: "error",
        message: "Could not redeem that key.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input
        label="License key"
        placeholder="XXXX-XXXX-XXXX-XXXX"
        value={key}
        onChange={(event) => setKey(event.target.value)}
      />

      {state.message ? (
        <div
          className={
            state.kind === "error"
              ? "rounded-md border border-[var(--border-safety)] bg-[var(--bg-safety)] px-4 py-3 font-body text-sm leading-relaxed text-[var(--text-safety)]"
              : "rounded-md border border-[rgba(201,151,58,0.35)] bg-[rgba(201,151,58,0.1)] px-4 py-3 font-body text-sm leading-relaxed text-[var(--text-primary)]"
          }
        >
          {state.message}
        </div>
      ) : null}

      <Button fullWidth disabled={isSubmitting} type="submit">
        {isSubmitting ? "Redeeming..." : "Redeem key"}
      </Button>
    </form>
  );
}
