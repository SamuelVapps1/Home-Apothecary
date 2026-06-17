import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { AppShell } from "@/components/screens/AppShell";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { getRecipeBySlug, RateLimitError } from "@/lib/recipes";
import { AlertTriangle } from "lucide-react";
import { notFound } from "next/navigation";

const hardCautionPlants = new Set(["st-johns-wort", "licorice", "ginkgo", "ashwagandha"]);

function formatTierLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function isHardCautionPlant(slug: string, commonName: string) {
  const normalizedName = commonName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return hardCautionPlants.has(slug) || hardCautionPlants.has(normalizedName);
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let recipe = null as Awaited<ReturnType<typeof getRecipeBySlug>> | null;

  try {
    recipe = await getRecipeBySlug(slug);
  } catch (error) {
    if (error instanceof RateLimitError) {
      return (
        <AppShell title="Virtual Apothecary" navIndex={1}>
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-4">
            <section className="rounded-lg border border-[var(--border-safety)] bg-[var(--bg-safety)] p-5 shadow-md">
              <p className="m-0 font-display text-2xl font-semibold text-[var(--text-safety)]">
                Content limit reached for now.
              </p>
              <p className="mt-2 mb-0 max-w-prose font-body text-sm leading-relaxed text-[var(--text-safety)]">
                Too many cabinet requests in a short window. Try again later.
              </p>
            </section>
          </div>
        </AppShell>
      );
    }

    throw error;
  }

  if (!recipe) {
    notFound();
  }

  const primaryPlant = recipe.components[0]?.plant ?? null;
  const accessBadge = recipe.is_free ? "Free" : formatTierLabel(recipe.required_tier);
  const hardCautionComponent = recipe.components.find((component) => {
    const plant = component.plant;
    return plant ? isHardCautionPlant(plant.slug, plant.common_name) : false;
  });

  return (
    <AppShell title="Virtual Apothecary" navIndex={1}>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-4">
        <section className="border-b-2 border-[var(--color-amber-500)] bg-[radial-gradient(ellipse_at_50%_20%,_rgba(61,92,61,0.95)_0%,_rgba(17,26,17,1)_74%)] px-5 pb-9 pt-10 text-center">
          <p className="mb-2 font-body text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-amber-500)]">
            Traditional Recipe
          </p>
          <h1 className="m-0 font-display text-5xl font-bold leading-none tracking-display text-[var(--text-primary)]">
            {recipe.title}
          </h1>
          {primaryPlant?.name_latin ? (
            <p className="mt-2 font-display text-[17px] italic text-[var(--color-amber-500)]">
              {primaryPlant.name_latin}
            </p>
          ) : null}
        </section>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="amber">{recipe.category}</Badge>
            <Badge variant="sage">{recipe.preparation_type}</Badge>
            <Badge variant="neutral">{accessBadge}</Badge>
          </div>

          <BotanicalDivider className="h-7 w-full text-[var(--color-amber-500)] opacity-80" />

          <section className="max-w-prose rounded-md bg-[var(--bg-parchment)] p-4 shadow-sm">
            <h2 className="m-0 mb-2 font-display text-xl font-semibold leading-snug text-[var(--text-on-parchment)]">
              Traditional Use
            </h2>
            <p className="m-0 font-body text-base leading-relaxed text-[var(--text-on-parchment-2)]">
              {recipe.traditional_use}
            </p>
          </section>

          {hardCautionComponent?.plant ? (
            <section className="max-w-prose rounded-md border border-[rgba(139,26,26,0.55)] bg-[rgba(139,26,26,0.18)] p-4 shadow-md">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle aria-hidden="true" className="h-4 w-4 text-[var(--text-safety)]" />
                <h2 className="m-0 font-display text-xl font-semibold leading-snug text-[var(--text-safety)]">
                  Hard caution plant
                </h2>
              </div>
              <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                {hardCautionComponent.plant.common_name} is on the hard-caution list. Keep the
                safety section visible and review this entry carefully before any use.
              </p>
            </section>
          ) : null}

          <section className="max-w-prose rounded-md border border-[var(--border-safety)] bg-[var(--bg-safety)] p-4 shadow-md">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle aria-hidden="true" className="h-4 w-4 text-[var(--text-safety)]" />
              <h2 className="m-0 font-display text-xl font-semibold leading-snug text-[var(--text-safety)]">
                Safety
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
                  Recipe notes
                </p>
                {recipe.safety_notes.length > 0 ? (
                  <ul className="m-0 list-disc space-y-1 pl-5 font-body text-sm leading-relaxed text-[var(--text-safety)] marker:text-[var(--color-parchment-200)]">
                    {recipe.safety_notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                    No recipe-specific safety notes are scaffolded for this entry.
                  </p>
                )}
              </div>

              {recipe.components.map((component) => {
                const plant = component.plant;

                if (!plant) {
                  return null;
                }

                return (
                  <div key={component.id} className="rounded-md border border-[rgba(245,238,220,0.14)] bg-[rgba(255,255,255,0.04)] p-3">
                    <p className="mb-1 font-display text-sm font-semibold text-[var(--text-safety)]">
                      {plant.common_name}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
                          Contraindications
                        </p>
                        <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                          {plant.contraindications.join(" ")}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
                          Drug Interactions
                        </p>
                        <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                          {plant.interactions.join(" ")}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
                          Pregnancy
                        </p>
                        <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                          {plant.pregnancy_warning_text}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
                          Allergy note
                        </p>
                        <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                          {plant.allergy_note}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="max-w-prose rounded-md bg-[var(--bg-parchment)] p-4 shadow-sm">
            <h2 className="m-0 mb-2 font-display text-xl font-semibold leading-snug text-[var(--text-on-parchment)]">
              Method
            </h2>
            <div className="space-y-3">
              {recipe.method_steps.map((step, index) => (
                <div key={step.title} className="flex gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-amber-500)] font-display text-base font-semibold text-[var(--text-on-amber)]">
                    {index + 1}
                  </div>
                  <div className="rounded-md bg-[var(--bg-parchment)] px-3 py-2 shadow-sm">
                    <p className="m-0 font-display text-[14px] font-semibold text-[var(--text-on-parchment)]">
                      {step.title}
                    </p>
                    <p className="m-0 mt-0.5 font-body text-[13px] leading-relaxed text-[var(--text-on-parchment-2)]">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-prose rounded-md bg-[var(--bg-parchment)] p-4 shadow-sm">
            <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--text-on-parchment-2)]">
              Components
            </p>
            <div className="space-y-3">
              {recipe.components.map((component) => (
                <div key={component.id} className="rounded-md border border-[rgba(74,53,32,0.12)] bg-[var(--bg-parchment-alt)] p-3 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="m-0 font-display text-[14px] font-semibold text-[var(--text-on-parchment)]">
                        {component.plant?.common_name ?? component.part_used}
                      </p>
                      {component.plant?.name_latin ? (
                        <p className="m-0 mt-0.5 font-display text-[12px] italic text-[var(--text-on-parchment-2)]">
                          {component.plant.name_latin}
                        </p>
                      ) : null}
                    </div>
                    <Badge variant="neutral">{component.part_used}</Badge>
                  </div>

                  <div className="mt-2 grid gap-2 text-[13px] leading-relaxed text-[var(--text-on-parchment-2)] sm:grid-cols-2">
                    <p className="m-0">
                      <span className="font-semibold">Ratio:</span> {component.ratio_quantity}
                    </p>
                    {component.temperature ? (
                      <p className="m-0">
                        <span className="font-semibold">Temperature:</span> {component.temperature}
                      </p>
                    ) : null}
                    {component.time ? (
                      <p className="m-0">
                        <span className="font-semibold">Time:</span> {component.time}
                      </p>
                    ) : null}
                    {component.prep_notes ? (
                      <p className="m-0 sm:col-span-2">
                        <span className="font-semibold">Prep notes:</span> {component.prep_notes}
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-prose rounded-md bg-[var(--bg-parchment)] p-4 shadow-sm">
            <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--text-on-parchment-2)]">
              Dosage note
            </p>
            <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-on-parchment-2)]">
              {recipe.dosage_note}
            </p>
          </section>

          <section className="max-w-prose rounded-md bg-[var(--bg-parchment)] p-4 shadow-sm">
            <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--text-on-parchment-2)]">
              Sources
            </p>
            <ul className="m-0 list-disc space-y-1 pl-5 font-body text-xs italic leading-relaxed text-[var(--text-on-parchment-2)] marker:text-[var(--color-amber-400)]">
              {recipe.sources.map((source) => (
                <li key={source}>{source}</li>
              ))}
            </ul>
          </section>

          <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 shadow-md">
            <p className="m-0 font-body text-xs italic leading-relaxed text-[var(--text-secondary)]">
              Educational only, not medical advice. Traditional use language is intentional and
              safety information is always shown.
            </p>
          </div>

          <Button fullWidth variant="secondary" href="/browse">
            Back to Browse
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
