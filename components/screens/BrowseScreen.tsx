"use client";

import { Badge } from "@/components/core/Badge";
import { Input } from "@/components/core/Input";
import { RemedyCard } from "@/components/core/RemedyCard";
import { Tag } from "@/components/core/Tag";
import { remedies } from "@/lib/sample-remedies";
import { Search, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";

const filters = ["All", "Digestive", "Sleep", "Immunity", "Pain", "Skin"];

export function BrowseScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const visible = useMemo(() => {
    return remedies.filter((remedy) => {
      const matchesFilter = filter === "All" || remedy.category === filter;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        remedy.name.toLowerCase().includes(query) ||
        remedy.name_latin.toLowerCase().includes(query) ||
        remedy.summary.toLowerCase().includes(query) ||
        remedy.symptoms.some((item) => item.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="flex min-h-full flex-col bg-[var(--bg-app)]">
      <div className="bg-[radial-gradient(ellipse_at_top,_rgba(61,92,61,0.52)_0%,_rgba(17,26,17,0)_72%)] px-4 pb-4 pt-4">
        <div className="mb-3">
          <Input
            leadingIcon={<Search className="h-4 w-4" />}
            placeholder="Search remedies, herbs, symptoms…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((item) => (
            <Tag key={item} active={filter === item} onClick={() => setFilter(item)}>
              {item}
            </Tag>
          ))}
          <Tag active={false}>
            <ShieldAlert className="h-3.5 w-3.5" />
            Safety Check
          </Tag>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 pb-6">
        <div className="flex items-center justify-between">
          <Badge variant="neutral">{visible.length} remedies</Badge>
          <span className="font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Traditional use only
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {visible.map((remedy) => (
            <RemedyCard
              key={remedy.slug}
              herbName={remedy.name}
              latinName={remedy.name_latin}
              summary={remedy.summary}
              tags={[remedy.category, ...remedy.symptoms.slice(0, 2)]}
              hasWarning={remedy.contraindications.length > 0 || remedy.interactions.length > 0}
              href={`/remedies/${remedy.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
