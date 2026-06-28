import { AppShell } from "@/components/screens/AppShell";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { PlantCard } from "@/components/core/PlantCard";
import { getPlants } from "@/lib/plants";

export default async function LibraryPage() {
  const { plants, rateLimited, error } = await getPlants();

  return (
    <AppShell title="Virtual Apothecary" navIndex={1}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4">
        {rateLimited ? (
          <section className="rounded-lg border border-[var(--border-safety)] bg-[var(--bg-safety)] p-5 shadow-md">
            <p className="m-0 font-display text-2xl font-semibold text-[var(--text-safety)]">
              Content limit reached for now.
            </p>
            <p className="mt-2 mb-0 max-w-prose font-body text-sm leading-relaxed text-[var(--text-safety)]">
              Too many library requests in a short window. Try again later.
            </p>
          </section>
        ) : null}

        {error && !rateLimited ? (
          <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
            <p className="m-0 font-display text-2xl font-semibold text-[var(--text-primary)]">
              The plant library is unavailable right now.
            </p>
            <p className="mt-2 mb-0 max-w-prose font-body text-sm leading-relaxed text-[var(--text-secondary)]">
              Try again in a moment. If the public plant table is not reachable, the page will
              stay read-only and safe.
            </p>
          </section>
        ) : null}

        <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 shadow-md">
          <p className="m-0 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Plant library
          </p>
          <h1 className="mt-2 mb-0 font-display text-4xl font-bold tracking-display text-[var(--text-primary)]">
            Plant Library
          </h1>
          <p className="mt-3 mb-0 max-w-prose font-body text-base leading-relaxed text-[var(--text-secondary)]">
            Browse traditional-use plant profiles with safety shown alongside each entry.
          </p>

          <BotanicalDivider className="mt-4 h-7 w-full text-[var(--color-amber-500)] opacity-80" />
        </section>

        {plants.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {plants.map((plant) => (
              <PlantCard
                key={plant.slug}
                slug={plant.slug}
                name={plant.common_name}
                latinName={plant.name_latin}
                summary={plant.traditional_use_summary}
                hardCaution={plant.hard_caution}
              />
            ))}
          </div>
        ) : (
          <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 text-center shadow-md">
            <p className="m-0 font-display text-2xl font-semibold text-[var(--text-primary)]">
              No plant profiles are available yet.
            </p>
            <p className="mt-2 mb-0 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
              Once the public plant table has records, they will appear here in a read-only grid.
            </p>
          </section>
        )}
      </div>
    </AppShell>
  );
}
