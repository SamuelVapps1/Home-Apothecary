import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { AppShell } from "@/components/screens/AppShell";
import { BotanicalDivider } from "@/components/decorative/BotanicalDivider";
import { getRemedyBySlug } from "@/lib/remedies";
import { notFound } from "next/navigation";

export default async function RemedyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const remedy = await getRemedyBySlug(slug);

  if (!remedy) {
    notFound();
  }

  return (
    <AppShell title="Home Apothecary" navIndex={1}>
      <div className="flex min-h-full flex-col">
        <section className="border-b-2 border-[var(--color-amber-500)] bg-[radial-gradient(ellipse_at_50%_20%,_rgba(61,92,61,0.95)_0%,_rgba(17,26,17,1)_74%)] px-5 pb-9 pt-10 text-center">
          <p className="mb-2 font-body text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-amber-500)]">
            Traditional Remedy
          </p>
          <h1 className="m-0 font-display text-5xl font-bold leading-none tracking-display text-[var(--text-primary)]">
            {remedy.name}
          </h1>
          <p className="mt-2 font-display text-[17px] italic text-[var(--color-amber-500)]">
            {remedy.name_latin}
          </p>
        </section>

        <div className="flex flex-col gap-4 px-4 py-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="amber">{remedy.category}</Badge>
            <Badge variant="sage">Traditional use</Badge>
            {remedy.is_teaser ? <Badge variant="neutral">Teaser</Badge> : null}
          </div>

          <BotanicalDivider className="h-7 w-full text-[var(--color-amber-500)] opacity-80" />

          <section className="rounded-md bg-[var(--bg-parchment)] p-4 shadow-sm">
            <h2 className="m-0 mb-2 font-display text-xl font-semibold leading-snug text-[var(--text-on-parchment)]">
              Traditional Use
            </h2>
            <p className="m-0 font-body text-base leading-relaxed text-[var(--text-on-parchment-2)]">
              {remedy.traditional_use}
            </p>
          </section>

          <section className="rounded-md bg-[var(--bg-parchment)] p-4 shadow-sm">
            <h2 className="m-0 mb-2 font-display text-xl font-semibold leading-snug text-[var(--text-on-parchment)]">
              Preparation
            </h2>
            <div className="space-y-3">
              {remedy.preparation_steps.map((step, index) => (
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

          <section className="rounded-md border border-[var(--border-safety)] bg-[var(--bg-safety)] p-4 shadow-md">
            <div className="mb-3 flex items-center gap-2">
              <span aria-hidden="true" className="text-lg leading-none text-[var(--text-safety)]">
                ⚠
              </span>
              <h2 className="m-0 font-display text-xl font-semibold leading-snug text-[var(--text-safety)]">
                Safety & Interactions
              </h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
                  Contraindications
                </p>
                <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                  {remedy.contraindications.join(" ")}
                </p>
              </div>
              <div>
                <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
                  Drug Interactions
                </p>
                <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                  {remedy.interactions.join(" ")}
                </p>
              </div>
              <div>
                <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
                  Pregnancy
                </p>
                <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                  {remedy.pregnancy_warning_text}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-md bg-[var(--bg-parchment)] p-4 shadow-sm">
            <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--text-on-parchment-2)]">
              Dosage note
            </p>
            <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-on-parchment-2)]">
              {remedy.dosage_note}
            </p>
          </section>

          <section className="rounded-md bg-[var(--bg-parchment)] p-4 shadow-sm">
            <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--text-on-parchment-2)]">
              Sources
            </p>
            <ul className="m-0 space-y-1 pl-4 font-body text-xs italic leading-relaxed text-[var(--text-on-parchment-2)]">
              {remedy.sources.map((source) => (
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
