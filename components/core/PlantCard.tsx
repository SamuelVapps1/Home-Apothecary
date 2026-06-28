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
  className?: string;
};

export function PlantCard({
  slug,
  name,
  latinName,
  summary,
  hardCaution = false,
  className,
}: PlantCardProps) {
  return (
    <Link
      href={`/library/${slug}`}
      className="block h-full outline-none focus-visible:shadow-amber"
    >
      <article
        className={cn(
          "group relative h-full min-h-[18rem] overflow-hidden rounded-lg border-t-2 border-t-[var(--color-amber-500)] bg-[var(--bg-card)] p-4 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-[var(--bg-card-elevated)] hover:shadow-lg",
          className,
        )}
      >
        <LeafWatermark
          className="pointer-events-none absolute bottom-[-6px] right-[-2px] h-[88px] w-[72px] text-[var(--text-primary)]"
          opacity={0.065}
        />

        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="m-0 font-display text-2xl font-semibold leading-tight tracking-display text-[var(--text-primary)]">
              {name}
            </h3>
            <p className="m-0 mt-0.5 font-display text-sm italic leading-tight text-[var(--text-latin)]">
              {latinName}
            </p>
          </div>

          {hardCaution ? (
            <span
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[rgba(139,26,26,0.55)] bg-[rgba(139,26,26,0.25)] text-[13px] text-[var(--text-primary)]"
              aria-label="Hard caution"
            >
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          ) : null}
        </div>

        <p className="mb-0 mt-2 font-body text-sm leading-normal text-[var(--text-secondary)]">
          {summary}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-body text-[0.68rem] uppercase tracking-widest text-[var(--color-amber-400)] transition-colors group-hover:text-[var(--color-amber-300)]">
            View profile
          </span>
          <span className="font-body text-[0.68rem] uppercase tracking-widest text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-secondary)]">
            Open
          </span>
        </div>
      </article>
    </Link>
  );
}
