"use client";

import { Badge } from "@/components/core/Badge";
import { Input } from "@/components/core/Input";
import { RecipeCard } from "@/components/core/RecipeCard";
import { useInventory } from "@/components/hooks/useInventory";
import { Tag } from "@/components/core/Tag";
import type { RecipeDetail } from "@/types";
import { Search, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";

function uniqueCategories(recipes: RecipeDetail[]) {
  return Array.from(new Set(recipes.map((recipe) => recipe.category))).sort();
}

function hasSafetyConcern(recipe: RecipeDetail) {
  const plantSafety = recipe.components.some(
    (component) =>
      Boolean(component.plant?.hard_caution) ||
      (component.plant?.contraindications.length ?? 0) > 0 ||
      (component.plant?.interactions.length ?? 0) > 0 ||
      Boolean(component.plant?.pregnancy_warning_text) ||
      Boolean(component.plant?.allergy_note),
  );

  return plantSafety || recipe.safety_notes.length > 0;
}

function splitTerms(value: string) {
  return value
    .split(/[,;\n]+/)
    .map((term) => term.trim().toLowerCase())
    .filter(Boolean);
}

function formatTierLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

type InventoryState = "full" | "partial" | "none" | "neutral";

function getRecipeInventoryMatch(recipe: RecipeDetail, inventorySlugs: Set<string>) {
  const required = Array.from(
    new Set(recipe.components.map((component) => component.plant?.slug).filter(Boolean)),
  ) as string[];
  const total = required.length;

  if (total === 0) {
    return {
      state: "neutral" as InventoryState,
      label: undefined,
      ownedCount: 0,
      total,
    };
  }

  const ownedCount = required.filter((slug) => inventorySlugs.has(slug)).length;

  if (ownedCount === total) {
    return {
      state: "full" as InventoryState,
      label: "You can make this",
      ownedCount,
      total,
    };
  }

  if (ownedCount > 0) {
    return {
      state: "partial" as InventoryState,
      label: `${ownedCount} of ${total} ingredients`,
      ownedCount,
      total,
    };
  }

  return {
    state: "none" as InventoryState,
    label: undefined,
    ownedCount,
    total,
  };
}

export function BrowseScreen({
  recipes,
  rateLimited = false,
}: {
  recipes: RecipeDetail[];
  rateLimited?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [plantQuery, setPlantQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [safetyOnly, setSafetyOnly] = useState(false);
  const inventory = useInventory();

  const filters = useMemo(() => ["All", ...uniqueCategories(recipes)], [recipes]);
  const inventorySlugs = useMemo(() => new Set(inventory.slugs), [inventory.slugs]);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    const plantTerms = splitTerms(plantQuery);

    return recipes.filter((recipe) => {
      const matchesFilter = filter === "All" || recipe.category === filter;
      const matchesSearch =
        query.length === 0 ||
        recipe.title.toLowerCase().includes(query) ||
        recipe.category.toLowerCase().includes(query) ||
        recipe.summary.toLowerCase().includes(query) ||
        recipe.traditional_use.toLowerCase().includes(query) ||
        recipe.preparation_type.toLowerCase().includes(query) ||
        recipe.components.some((component) => {
          const plant = component.plant;
          return (
            component.part_used.toLowerCase().includes(query) ||
            component.ratio_quantity.toLowerCase().includes(query) ||
            Boolean(component.temperature?.toLowerCase().includes(query)) ||
            Boolean(component.time?.toLowerCase().includes(query)) ||
            Boolean(component.prep_notes?.toLowerCase().includes(query)) ||
            Boolean(plant?.common_name.toLowerCase().includes(query)) ||
            Boolean(plant?.name_latin.toLowerCase().includes(query)) ||
            Boolean(plant?.family.toLowerCase().includes(query))
          );
        });
      const matchesPlantTerms =
        plantTerms.length === 0 ||
        plantTerms.every((term) =>
          recipe.components.some((component) => {
            const plant = component.plant;
            return (
              Boolean(plant?.common_name.toLowerCase().includes(term)) ||
              Boolean(plant?.name_latin.toLowerCase().includes(term)) ||
              Boolean(plant?.family.toLowerCase().includes(term)) ||
              component.part_used.toLowerCase().includes(term) ||
              component.ratio_quantity.toLowerCase().includes(term) ||
              Boolean(component.prep_notes?.toLowerCase().includes(term)) ||
              Boolean(component.temperature?.toLowerCase().includes(term)) ||
              Boolean(component.time?.toLowerCase().includes(term))
            );
          }),
        );
      const matchesSafety = !safetyOnly || hasSafetyConcern(recipe);

      return matchesFilter && matchesSearch && matchesPlantTerms && matchesSafety;
    });
  }, [filter, plantQuery, recipes, safetyOnly, search]);

  const visibleWithInventory = useMemo(() => {
    if (inventory.count === 0) {
      return visible.map((recipe) => ({
        recipe,
        match: getRecipeInventoryMatch(recipe, inventorySlugs),
      }));
    }

    const ranked = visible.map((recipe, index) => {
      const match = getRecipeInventoryMatch(recipe, inventorySlugs);
      const rank =
        match.state === "full" ? 0 : match.state === "partial" ? 1 : match.state === "none" ? 2 : 3;

      return {
        recipe,
        match,
        index,
        rank,
      };
    });

    ranked.sort((left, right) => left.rank - right.rank || left.index - right.index);

    return ranked;
  }, [inventory.count, inventorySlugs, visible]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4">
      {rateLimited ? (
        <section className="rounded-lg border border-[var(--border-safety)] bg-[var(--bg-safety)] p-4 shadow-md">
          <p className="m-0 font-display text-2xl font-semibold text-[var(--text-safety)]">
            Content limit reached for now.
          </p>
          <p className="mt-2 mb-0 max-w-prose font-body text-sm leading-relaxed text-[var(--text-safety)]">
            Too many cabinet requests in a short window. Try again later.
          </p>
        </section>
      ) : null}

      <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-md">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <Input
            leadingIcon={<Search className="h-4 w-4" />}
            placeholder="Search recipes, plants, traditional use..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Input
            label="Plants or parts"
            placeholder="e.g. chamomile, root, leaves"
            value={plantQuery}
            onChange={(event) => setPlantQuery(event.target.value)}
            hint="Filter by the plant material used in a recipe."
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((item) => (
            <Tag key={item} active={filter === item} onClick={() => setFilter(item)}>
              {item}
            </Tag>
          ))}
          <Tag active={safetyOnly} onClick={() => setSafetyOnly((value) => !value)}>
            <ShieldAlert className="h-3.5 w-3.5" />
            Safety Check
          </Tag>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <Badge variant="neutral">{visible.length} recipes</Badge>
        <span className="font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Traditional use only
        </span>
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleWithInventory.map(({ recipe, match }) => {
            const primaryPlant = recipe.components[0]?.plant ?? null;
            const tierLabel = recipe.is_free ? "Free" : formatTierLabel(recipe.required_tier);
            const inventoryProps =
              inventory.count > 0
                ? {
                    inventoryState: match.state,
                    inventoryLabel: match.label,
                  }
                : {};

            return (
              <RecipeCard
                key={recipe.slug}
                className="h-full"
                title={recipe.title}
                latinName={primaryPlant?.name_latin}
                summary={recipe.summary}
                tags={[
                  recipe.category,
                  recipe.preparation_type,
                  tierLabel,
                  primaryPlant?.common_name ?? "Plant blend",
                ].filter(Boolean)}
                hasWarning={hasSafetyConcern(recipe)}
                href={`/recipes/${recipe.slug}`}
                {...inventoryProps}
              />
            );
          })}
        </div>
      ) : (
        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 text-center shadow-md">
          <p className="m-0 font-display text-2xl font-semibold text-[var(--text-primary)]">
            No recipes match those filters.
          </p>
          <p className="mt-2 mb-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
            Clear one or more filters and try again.
          </p>
        </section>
      )}
    </div>
  );
}
