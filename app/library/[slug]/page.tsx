import { Badge } from "@/components/core/Badge";
import { PlantSafetyCard } from "@/components/core/PlantSafetyCard";
import { AppShell } from "@/components/screens/AppShell";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { getPlantBySlug } from "@/lib/plants";
import { notFound } from "next/navigation";

export default async function LibraryProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plant = await getPlantBySlug(slug);

  if (!plant) {
    notFound();
  }

  return (
    <AppShell title="Virtual Apothecary" navIndex={1}>
      <div className="mx-auto w-full max-w-6xl px-4 py-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <main className="flex flex-col gap-5">
            <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md md:p-6">
              <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                Plant profile
              </p>
              <h1 className="mt-2 mb-0 font-display text-4xl font-bold tracking-display text-[var(--text-primary)]">
                {plant.common_name}
              </h1>
              <p className="mt-2 mb-0 font-display text-[17px] italic text-[var(--text-latin)]">
                {plant.name_latin}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="amber">{plant.family}</Badge>
                {plant.hard_caution ? <Badge variant="safety">Hard caution</Badge> : null}
              </div>

              <BotanicalDivider className="mt-4 h-7 w-full text-[var(--color-amber-500)] opacity-80" />
            </section>

            <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
              <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                Parts used
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {plant.parts_used.length > 0 ? (
                  plant.parts_used.map((part) => (
                    <Badge key={part} variant="neutral">
                      {part}
                    </Badge>
                  ))
                ) : (
                  <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                    No parts used are listed for this profile.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
              <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                Traditional use
              </p>
              <p className="mt-3 mb-0 max-w-prose font-body text-base leading-relaxed text-[var(--text-secondary)]">
                {plant.traditional_use_summary}
              </p>
            </section>

            <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
              <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                Sources
              </p>
              {plant.sources.length > 0 ? (
                <ul className="mt-3 m-0 list-disc space-y-1 pl-5 font-body text-sm leading-relaxed text-[var(--text-secondary)] marker:text-[var(--color-amber-400)]">
                  {plant.sources.map((source) => (
                    <li key={source}>{source}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 mb-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                  No sources are listed for this profile.
                </p>
              )}
            </section>
          </main>

          <aside className="self-start lg:sticky lg:top-4">
            <PlantSafetyCard className="max-w-none w-full" plants={[plant]} />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
