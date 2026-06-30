"use client";

import { useEffect, useMemo, useState } from "react";

const INVENTORY_KEY = "va.inventory.v1";
const INVENTORY_EVENT = "va.inventory.change";

function normalizeSlugs(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(new Set(value.filter((item): item is string => typeof item === "string" && item.length > 0)));
}

function readInventory(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(INVENTORY_KEY);
    if (!raw) {
      return [];
    }

    return normalizeSlugs(JSON.parse(raw));
  } catch {
    return [];
  }
}

function writeInventory(next: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(INVENTORY_KEY, JSON.stringify(next));
  } catch {
    return;
  }
}

export function useInventory() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const syncFromStorage = () => {
      setSlugs(readInventory());
    };

    syncFromStorage();

    window.addEventListener("storage", syncFromStorage);
    window.addEventListener(INVENTORY_EVENT, syncFromStorage as EventListener);

    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener(INVENTORY_EVENT, syncFromStorage as EventListener);
    };
  }, []);

  const api = useMemo(() => {
    const set = (next: string[]) => {
      const normalized = normalizeSlugs(next);
      setSlugs(normalized);
      writeInventory(normalized);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(INVENTORY_EVENT, { detail: normalized }));
      }
    };

    const toggle = (slug: string) => {
      set(slugs.includes(slug) ? slugs.filter((item) => item !== slug) : [...slugs, slug]);
    };

    return {
      slugs,
      count: slugs.length,
      has: (slug: string) => slugs.includes(slug),
      toggle,
      set,
    };
  }, [slugs]);

  return api;
}
