import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Plant } from "@/types";

type PlantSafetyCardProps = {
  plants: Plant[];
  recipeNotes?: string[];
  className?: string;
};

export function PlantSafetyCard({ plants, recipeNotes, className }: PlantSafetyCardProps) {
  const hardCautionPlant = plants.find((plant) => plant.hard_caution) ?? null;

  return (
    <section
      className={cn(
        "max-w-prose rounded-md border border-[var(--border-safety)] bg-[var(--bg-safety)] p-4 shadow-md",
        className,
      )}
    >
      {hardCautionPlant ? (
        <section className="rounded-md border border-[rgba(139,26,26,0.55)] bg-[rgba(139,26,26,0.18)] p-4 shadow-md">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle aria-hidden="true" className="h-4 w-4 text-[var(--text-safety)]" />
            <h2 className="m-0 font-display text-xl font-semibold leading-snug text-[var(--text-safety)]">
              Hard caution plant
            </h2>
          </div>
          <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
            {hardCautionPlant.common_name} is marked hard caution. Keep the safety section visible
            and review this entry carefully before any use.
          </p>
        </section>
      ) : null}

      <div className={cn("space-y-4", hardCautionPlant ? "mt-4" : "")}>
        <div className="mb-3 flex items-center gap-2">
          <AlertTriangle aria-hidden="true" className="h-4 w-4 text-[var(--text-safety)]" />
          <h2 className="m-0 font-display text-xl font-semibold leading-snug text-[var(--text-safety)]">
            Safety
          </h2>
        </div>

        {recipeNotes && recipeNotes.length > 0 ? (
          <div>
            <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
              Recipe notes
            </p>
            <ul className="m-0 list-disc space-y-1 pl-5 font-body text-sm leading-relaxed text-[var(--text-safety)] marker:text-[var(--color-parchment-200)]">
              {recipeNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="space-y-4">
          {plants.map((plant) => (
            <div key={plant.slug} className="rounded-md border border-[rgba(245,238,220,0.14)] bg-[rgba(255,255,255,0.04)] p-3">
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
                  {plant.interactions.length > 0 ? (
                    <ul className="m-0 list-disc space-y-1 pl-5 font-body text-sm leading-relaxed text-[var(--text-safety)] marker:text-[var(--color-parchment-200)]">
                      {plant.interactions.map((interaction) => (
                        <li key={`${interaction.drug_or_class}-${interaction.severity}`}>
                          <span className="font-semibold">{interaction.drug_or_class}</span>
                          {interaction.mechanism ? ` ${interaction.mechanism}` : ""}
                          {interaction.severity ? ` (${interaction.severity})` : ""}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                      No interaction entries are scaffolded for this plant.
                    </p>
                  )}
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
                <div>
                  <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
                    Traditional use summary
                  </p>
                  <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                    {plant.traditional_use_summary || "No plant summary is scaffolded for this entry."}
                  </p>
                </div>
                <div>
                  <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
                    Age restrictions
                  </p>
                  {plant.age_restrictions.length > 0 ? (
                    <ul className="m-0 list-disc space-y-1 pl-5 font-body text-sm leading-relaxed text-[var(--text-safety)] marker:text-[var(--color-parchment-200)]">
                      {plant.age_restrictions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                      No age restriction entries are scaffolded for this plant.
                    </p>
                  )}
                </div>
                <div>
                  <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
                    Max duration / dose
                  </p>
                  {plant.max_duration_dose.length > 0 ? (
                    <ul className="m-0 list-disc space-y-1 pl-5 font-body text-sm leading-relaxed text-[var(--text-safety)] marker:text-[var(--color-parchment-200)]">
                      {plant.max_duration_dose.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                      No max duration or dose entries are scaffolded for this plant.
                    </p>
                  )}
                </div>
                <div>
                  <p className="mb-1 font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-parchment-400)]">
                    Toxicity signals
                  </p>
                  {plant.toxicity_signals.length > 0 ? (
                    <ul className="m-0 list-disc space-y-1 pl-5 font-body text-sm leading-relaxed text-[var(--text-safety)] marker:text-[var(--color-parchment-200)]">
                      {plant.toxicity_signals.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="m-0 font-body text-sm leading-relaxed text-[var(--text-safety)]">
                      No toxicity signals are scaffolded for this plant.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
