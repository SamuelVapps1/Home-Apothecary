"use client";

import { Badge } from "@/components/core/Badge";
import { Input } from "@/components/core/Input";
import { RemedyCard } from "@/components/core/RemedyCard";
import { Tag } from "@/components/core/Tag";
import type { Remedy } from "@/types";
import { Search, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";

const filters = ["All", "Digestive", "Sleep", "Immunity", "Pain", "Skin"];

function splitIngredientTerms(value: string) {
  return value
    .split(/[,;\n]+/)
    .map((term) => term.trim().toLowerCase())
    .filter(Boolean);
}

function hasSafetyConcern(remedy: Remedy) {
  return (
    remedy.contraindications.length > 0 || remedy.interactions.length > 0 || remedy.pregnancy_warning
  );
}

export function BrowseScreen({
  remedies,
  rateLimited = false,
}: {
  remedies: Remedy[];
  rateLimited?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [ingredients, setIngredients] = useState("");
  const [safetyOnly, setSafetyOnly] = useState(false);

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    const ingredientTerms = splitIngredientTerms(ingredients);

    return remedies.filter((remedy) => {
      const matchesFilter = filter === "All" || remedy.category === filter;
      const matchesSearch =
        query.length === 0 ||
        remedy.name.toLowerCase().includes(query) ||
        remedy.name_latin.toLowerCase().includes(query) ||
        remedy.summary.toLowerCase().includes(query) ||
        remedy.symptoms.some((item) => item.toLowerCase().includes(query));
      const matchesIngredients =
        ingredientTerms.length === 0 ||
        ingredientTerms.every((term) =>
          remedy.ingredients.some((ingredient) => ingredient.toLowerCase().includes(term)),
        );
      const matchesSafety = !safetyOnly || hasSafetyConcern(remedy);

      return matchesFilter && matchesSearch && matchesIngredients && matchesSafety;
    });
  }, [filter, ingredients, remedies, safetyOnly, search]);

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
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)]">
          <Input
            leadingIcon={<Search className="h-4 w-4" />}
            placeholder="Search remedies, herbs, symptoms..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Input
            label="What I have at home"
            placeholder="e.g. honey, ginger, lemon"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            hint="Filter by ingredients you already have on hand."
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
        <Badge variant="neutral">{visible.length} remedies</Badge>
        <span className="font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Traditional use only
        </span>
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((remedy) => (
            <RemedyCard
              key={remedy.slug}
              className="h-full"
              herbName={remedy.name}
              latinName={remedy.name_latin}
              summary={remedy.summary}
              tags={[remedy.category, ...remedy.symptoms.slice(0, 2)]}
              hasWarning={hasSafetyConcern(remedy)}
              href={`/remedies/${remedy.slug}`}
            />
          ))}
        </div>
      ) : (
        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 text-center shadow-md">
          <p className="m-0 font-display text-2xl font-semibold text-[var(--text-primary)]">
            No remedies match those filters.
          </p>
          <p className="mt-2 mb-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
            Clear one or more filters and try again.
          </p>
        </section>
      )}
    </div>
  );
}
