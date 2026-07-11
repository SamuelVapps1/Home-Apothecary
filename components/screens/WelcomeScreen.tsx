"use client";

import { Button } from "@/components/core/Button";
import { Input } from "@/components/core/Input";
import { useInventory } from "@/components/hooks/useInventory";
import {
  countAccessibleRecipeMatches,
  countRecipesAtTier,
} from "@/lib/inventory-match";
import type { Tier } from "@/types";
import { Check, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { WelcomePlant, WelcomeRecipe } from "@/lib/welcome";

function matchPlant(plant: WelcomePlant, query: string) {
  const normalized = query.trim().toLowerCase();

  if (normalized.length === 0) {
    return true;
  }

  return (
    plant.common_name.toLowerCase().includes(normalized) ||
    plant.name_latin.toLowerCase().includes(normalized)
  );
}

function WelcomeMatchCard({
  plant,
  selected,
  onToggle,
}: {
  plant: WelcomePlant;
  selected: boolean;
  onToggle: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onToggle(plant.slug)}
      className={cn(
        "flex w-full items-start justify-between gap-4 rounded-md border p-4 text-left shadow-sm transition-[background-color,border-color,transform,box-shadow] duration-150 ease-in-out outline-none hover:-translate-y-0.5 focus-visible:shadow-[0_0_0_3px_rgba(201,151,58,0.3)]",
        selected
          ? "border-[var(--color-amber-500)] bg-[rgba(201,151,58,0.09)]"
          : "border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[rgba(201,151,58,0.28)]",
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="m-0 font-display text-lg font-semibold leading-tight text-[var(--text-primary)]">
          {plant.common_name}
        </p>
        <p className="m-0 mt-1 font-display text-sm italic leading-tight text-[var(--color-amber-500)]">
          {plant.name_latin}
        </p>
      </div>

      <span
        aria-hidden="true"
        className={cn(
          "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border",
          selected
            ? "border-[var(--color-amber-500)] bg-[rgba(201,151,58,0.16)] text-[var(--color-amber-500)]"
            : "border-[var(--border-subtle)] bg-transparent text-transparent",
        )}
      >
        <Check className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}

function ResultStrip({
  hasSelection,
  accessibleCount,
  standardCount,
}: {
  hasSelection: boolean;
  accessibleCount: number;
  standardCount: number;
}) {
  return (
    <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-parchment)] p-4 text-[var(--text-on-parchment)] shadow-md">
      {hasSelection ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="m-0 font-display text-5xl font-bold leading-none tracking-display text-[var(--text-on-parchment)]">
              {accessibleCount}
            </p>
            <p className="mt-2 mb-0 font-body text-sm leading-relaxed text-[var(--text-on-parchment-2)]">
              {`${accessibleCount} ${accessibleCount === 1 ? "recipe" : "recipes"} you can make now`}
            </p>
            <p className="mt-1 mb-0 font-body text-sm leading-relaxed text-[var(--text-on-parchment-2)]">
              {`${standardCount} more with Standard`}
            </p>
          </div>

          <Button href="/browse" size="lg">
            Show my recipes
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-on-parchment-2)]">
            Select the herbs you have to see your matches.
          </p>
          <Button href="/browse" size="lg">
            Show my recipes
          </Button>
        </div>
      )}
    </section>
  );
}

export function WelcomeScreen({
  plants,
  recipes,
  accessTier,
}: {
  plants: WelcomePlant[];
  recipes: WelcomeRecipe[];
  accessTier: Tier;
}) {
  const [filter, setFilter] = useState("");
  const inventory = useInventory();
  const inventorySlugs = useMemo(() => new Set(inventory.slugs), [inventory.slugs]);
  const hasSelection = inventory.count > 0;
  const showFilter = plants.length > 12;

  const visiblePlants = useMemo(
    () => plants.filter((plant) => matchPlant(plant, filter)),
    [filter, plants],
  );

  const accessibleCount = useMemo(
    () => countAccessibleRecipeMatches(recipes, inventorySlugs, accessTier),
    [accessTier, inventorySlugs, recipes],
  );

  const standardCount = useMemo(
    () => (accessTier === "free" ? countRecipesAtTier(recipes, inventorySlugs, "standard") : 0),
    [accessTier, inventorySlugs, recipes],
  );

  const selectionCountLabel = hasSelection
    ? `${inventory.count} ${inventory.count === 1 ? "herb" : "herbs"} selected`
    : "Your selection is saved on this device and stays editable later.";

  return (
    <main className="min-h-dvh bg-[var(--bg-app)] px-4 py-6 text-[var(--text-primary)]">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 pb-32 md:pb-6">
        <header className="relative overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md md:p-6">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--color-amber-500)] opacity-10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[var(--color-sage-400)] opacity-10 blur-3xl" />

          <p className="m-0 font-body text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-amber-400)]">
            WELCOME
          </p>
          <h1 className="mt-2 mb-0 max-w-3xl font-display text-4xl font-bold leading-tight tracking-display text-[var(--text-primary)] sm:text-5xl">
            Which of these herbs do you have at home?
          </h1>
          <p className="mt-3 mb-0 max-w-2xl font-body text-base leading-relaxed text-[var(--text-secondary)]">
            Select the plants you already have. We will save the selection on this device and use
            it to show recipe matches from your current access level.
          </p>
        </header>

        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-md md:p-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                Herb selection
              </p>
              <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                {selectionCountLabel}
              </p>
            </div>

            {showFilter ? (
              <Input
                leadingIcon={<Search className="h-4 w-4" />}
                placeholder="Filter herbs..."
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              />
            ) : null}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[repeat(auto-fill,minmax(190px,1fr))]">
            {visiblePlants.map((plant) => (
              <WelcomeMatchCard
                key={plant.slug}
                plant={plant}
                selected={inventory.has(plant.slug)}
                onToggle={inventory.toggle}
              />
            ))}
          </div>

          {visiblePlants.length === 0 ? (
            <p className="mt-4 mb-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
              No herbs match that filter.
            </p>
          ) : null}

          <div className="mt-5 hidden md:block">
            <ResultStrip
              hasSelection={hasSelection}
              accessibleCount={accessibleCount}
              standardCount={standardCount}
            />
          </div>
        </section>

        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-md md:p-5">
          <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Note
          </p>
          <p className="mt-2 mb-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
            Your selection is saved on this device and editable later. A match means you have the
            plant material, it is not a recommendation. Safety notes are always shown with every
            recipe.
          </p>
        </div>

        <div className="md:hidden">
          <div className="fixed inset-x-4 bottom-4 z-30">
            <ResultStrip
              hasSelection={hasSelection}
              accessibleCount={accessibleCount}
              standardCount={standardCount}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            className="font-body text-[0.72rem] uppercase tracking-widest text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            href="/browse"
          >
            Skip for now - I&apos;ll browse everything
          </Link>
        </div>
      </section>
    </main>
  );
}
