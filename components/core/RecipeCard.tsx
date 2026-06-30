"use client";

import { Badge } from "@/components/core/Badge";
import { LeafWatermark } from "@/components/decorative/LeafWatermark";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type InventoryState = "full" | "partial" | "none" | "neutral";

type RecipeCardProps = {
  title?: string;
  herbName?: string;
  latinName?: string;
  summary?: string;
  tags?: string[];
  hasWarning?: boolean;
  href?: string;
  className?: string;
  inventoryState?: InventoryState;
  inventoryLabel?: string;
};

function inventoryCardClasses(inventoryState?: InventoryState) {
  switch (inventoryState) {
    case "full":
      return "border-[rgba(201,151,58,0.65)] bg-[rgba(201,151,58,0.12)]";
    case "partial":
      return "border-[rgba(201,151,58,0.42)]";
    case "none":
      return "opacity-70";
    default:
      return "";
  }
}

export function RecipeCard({
  title,
  herbName,
  latinName,
  summary,
  tags = [],
  hasWarning = false,
  href,
  className,
  inventoryState = "neutral",
  inventoryLabel,
}: RecipeCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardTitle = title ?? herbName ?? "";
  const inventoryVisible =
    inventoryState !== "neutral" && Boolean(inventoryLabel) && inventoryState !== "none";
  const inventoryBadgeVariant = inventoryState === "full" ? "amber" : "neutral";

  const card = (
    <article
      className={cn(
        "relative h-full overflow-hidden rounded-lg border-t-2 border-t-[var(--color-amber-500)] bg-[var(--bg-card)] p-4 shadow-md transition-all duration-200 ease-in-out",
        hovered && "bg-[var(--bg-card-elevated)] shadow-lg",
        inventoryCardClasses(inventoryState),
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <LeafWatermark
        className="pointer-events-none absolute bottom-[-6px] right-[-2px] h-[88px] w-[72px] text-[var(--text-primary)]"
        opacity={0.065}
      />

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="m-0 font-display text-2xl font-semibold leading-tight tracking-display text-[var(--text-primary)]">
            {cardTitle}
          </h3>
          {latinName ? (
            <p className="m-0 mt-0.5 font-display text-sm italic leading-tight text-[var(--text-latin)]">
              {latinName}
            </p>
          ) : null}
        </div>
        {hasWarning ? (
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(139,26,26,0.55)] bg-[rgba(139,26,26,0.25)] text-[13px] text-[var(--text-primary)]">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        ) : null}
      </div>

      {summary ? (
        <p className="mb-0 mt-2 font-body text-sm leading-normal text-[var(--text-secondary)]">
          {summary}
        </p>
      ) : null}

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {inventoryVisible ? (
          <Badge variant={inventoryBadgeVariant}>{inventoryLabel}</Badge>
        ) : null}

        {tags.map((tag) => (
          <Badge key={tag} variant="sage">
            {tag}
          </Badge>
        ))}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block outline-none focus-visible:shadow-amber">
        {card}
      </Link>
    );
  }

  return card;
}

export const RemedyCard = RecipeCard;
