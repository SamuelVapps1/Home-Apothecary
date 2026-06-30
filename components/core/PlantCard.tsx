"use client";

import { LeafWatermark } from "@/components/decorative/LeafWatermark";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

type PlantCardProps = {
  slug: string;
  name: string;
  latinName: string;
  summary: string;
  hardCaution?: boolean;
  isOwned?: boolean;
  onToggleOwned?: (slug: string) => void;
  className?: string;
};

export function PlantCard({
  slug,
  name,
  latinName,
  summary,
  hardCaution = false,
  isOwned = false,
  onToggleOwned,
  className,
}: PlantCardProps) {
  return (
    <article
      className={cn(
        "group relative h-full min-h-[18rem] overflow-hidden rounded-lg border border-[var(--border-parchment)] border-t-2 border-t-[var(--color-amber-500)] bg-[var(--bg-parchment)] p-4 text-[var(--text-on-parchment)] shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <LeafWatermark
        className="pointer-events-none absolute bottom-[-6px] right-[-2px] h-[88px] w-[72px] text-[var(--text-on-parchment)]"
        opacity={0.065}
      />

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <Link href={`/library/${slug}`} className="outline-none focus-visible:shadow-amber">
            <h3 className="m-0 font-display text-2xl font-semibold leading-tight tracking-display text-[var(--text-on-parchment)] transition-colors group-hover:text-[var(--color-amber-700)]">
              {name}
            </h3>
          </Link>
          <p className="m-0 mt-0.5 font-display text-sm italic leading-tight text-[var(--text-on-parchment-2)]">
            {latinName}
          </p>
        </div>

        {hardCaution ? (
          <span
            className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(139,26,26,0.55)] bg-[rgba(139,26,26,0.18)] text-[13px] text-[var(--text-on-parchment)]"
            aria-label="Hard caution"
          >
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        ) : null}
      </div>

      <p className="mb-0 mt-2 font-body text-sm leading-normal text-[var(--text-on-parchment-2)]">
        {summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          aria-pressed={isOwned}
          onClick={() => onToggleOwned?.(slug)}
          className={cn(
            "inline-flex select-none items-center gap-2 rounded-pill border px-3 py-1.5 font-body text-[0.68rem] uppercase tracking-widest transition-[background-color,border-color,box-shadow,transform,color] duration-150 ease-in-out outline-none focus-visible:shadow-[0_0_0_3px_rgba(201,151,58,0.3)]",
            isOwned
              ? "border-[rgba(122,158,122,0.5)] bg-[rgba(122,158,122,0.18)] text-[var(--text-on-parchment)]"
              : "border-[var(--border-parchment)] bg-[rgba(255,255,255,0.22)] text-[var(--text-on-parchment-2)] hover:bg-[rgba(255,255,255,0.3)]",
          )}
        >
          <span
            className={cn(
              "inline-flex h-4 w-4 items-center justify-center rounded-full border text-[10px] leading-none",
              isOwned
                ? "border-[var(--color-sage-500)] bg-[var(--color-sage-400)] text-[var(--text-on-parchment)]"
                : "border-[var(--color-parchment-400)] bg-transparent text-[var(--text-on-parchment-2)]",
            )}
            aria-hidden="true"
          >
            {isOwned ? "+" : ""}
          </span>
          <span>In my apothecary</span>
        </button>

        <Link
          href={`/library/${slug}`}
          className="font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-amber-700)] transition-colors hover:text-[var(--color-amber-600)] outline-none focus-visible:shadow-amber"
        >
          View profile
        </Link>
      </div>
    </article>
  );
}
