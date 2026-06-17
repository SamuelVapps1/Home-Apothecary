# Content Ingestion + Rendering Harness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reviewable JSON content scaffolds for plants and recipes, plus an import harness and detail-page rendering updates that keep plant safety visible and prominent.

**Architecture:** Keep content in small JSON documents committed to the repo so non-developers can review diffs and validate arrays/strings before import. Build a Node-based ingestion harness that validates the JSON against local schemas, then upserts plants, recipes, and recipe_components into Supabase. Update the recipe detail page to always render plant safety in a burgundy card and add a hard-caution warning card for a short, explicit plant list.

**Tech Stack:** Next.js App Router, TypeScript, Node.js fs/path, JSON Schema-style validation helpers, Supabase JS client, existing app UI components.

---

### Task 1: Define JSON content format

**Files:**
- Create: `content/plants/example-plant.json`
- Create: `content/recipes/example-recipe.json`
- Create: `content/schemas/plant.schema.json`
- Create: `content/schemas/recipe.schema.json`
- Create: `content/schemas/recipe-component.schema.json`

- [ ] **Step 1: Add schema files**

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Plant",
  "type": "object",
  "required": ["slug", "common_name", "name_latin", "family", "parts_used", "contraindications", "interactions", "pregnancy_warning_text", "allergy_note", "sources"],
  "properties": {
    "slug": { "type": "string", "minLength": 1 },
    "common_name": { "type": "string", "minLength": 1 },
    "name_latin": { "type": "string", "minLength": 1 },
    "family": { "type": "string", "minLength": 1 },
    "parts_used": { "type": "array", "items": { "type": "string" } },
    "contraindications": { "type": "array", "items": { "type": "string" } },
    "interactions": { "type": "array", "items": { "type": "string" } },
    "pregnancy_warning_text": { "type": "string" },
    "allergy_note": { "type": "string" },
    "sources": { "type": "array", "items": { "type": "string" } }
  },
  "additionalProperties": false
}
```

- [ ] **Step 2: Add recipe schema files**

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Recipe",
  "type": "object",
  "required": ["slug", "title", "category", "summary", "preparation_type", "traditional_use", "method_steps", "dosage_note", "safety_notes", "sources", "is_free", "required_tier", "components"],
  "properties": {
    "slug": { "type": "string", "minLength": 1 },
    "title": { "type": "string", "minLength": 1 },
    "category": { "type": "string", "minLength": 1 },
    "summary": { "type": "string", "minLength": 1 },
    "preparation_type": { "type": "string", "enum": ["infusion", "decoction", "tincture", "salve", "extract", "oil", "syrup", "powder", "other"] },
    "traditional_use": { "type": "string", "minLength": 1 },
    "method_steps": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["title", "text"],
        "properties": {
          "title": { "type": "string" },
          "text": { "type": "string" }
        },
        "additionalProperties": false
      }
    },
    "dosage_note": { "type": "string" },
    "safety_notes": { "type": "array", "items": { "type": "string" } },
    "sources": { "type": "array", "items": { "type": "string" } },
    "is_free": { "type": "boolean" },
    "required_tier": { "type": "string", "enum": ["free", "standard", "premium"] },
    "components": { "type": "array", "items": { "$ref": "recipe-component.schema.json" } }
  },
  "additionalProperties": false
}
```

- [ ] **Step 3: Add scaffold content**

```json
{
  "slug": "example-plant",
  "common_name": "Example Plant",
  "name_latin": "Examplea officinalis",
  "family": "",
  "parts_used": [],
  "contraindications": [],
  "interactions": [],
  "pregnancy_warning_text": "",
  "allergy_note": "",
  "sources": []
}
```

```json
{
  "slug": "example-recipe",
  "title": "Example Recipe",
  "category": "",
  "summary": "",
  "preparation_type": "other",
  "traditional_use": "",
  "method_steps": [],
  "dosage_note": "",
  "safety_notes": [],
  "sources": [],
  "is_free": true,
  "required_tier": "free",
  "components": [
    {
      "plant_slug": "example-plant",
      "part_used": "",
      "ratio_quantity": "",
      "temperature": "",
      "time": "",
      "prep_notes": ""
    }
  ]
}
```

- [ ] **Step 4: Validate schemas by inspection**

Run: `node -e "const fs=require('fs'); JSON.parse(fs.readFileSync('content/plants/example-plant.json','utf8')); JSON.parse(fs.readFileSync('content/recipes/example-recipe.json','utf8')); console.log('ok')"`
Expected: `ok`

### Task 2: Build import harness

**Files:**
- Create: `scripts/import-content.mjs`
- Modify: `package.json`

- [ ] **Step 1: Add importer script**

```js
import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

// Read JSON files, validate required fields, resolve recipe component plant slugs,
// then upsert plants, recipes, and recipe_components in that order.
```

- [ ] **Step 2: Wire package scripts**

```json
{
  "scripts": {
    "content:import": "node scripts/import-content.mjs"
  }
}
```

- [ ] **Step 3: Add import validation**

```js
function assertArrayOfStrings(value, label) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${label} must be an array of strings`);
  }
}
```

- [ ] **Step 4: Add upsert flow**

```js
await supabase.from("plants").upsert(plants, { onConflict: "slug" });
await supabase.from("recipes").upsert(recipes, { onConflict: "slug" });
await supabase.from("recipe_components").upsert(components, { onConflict: "recipe_id,plant_id,part_used" });
```

- [ ] **Step 5: Run importer dry validation**

Run: `node scripts/import-content.mjs --dry-run`
Expected: JSON validates and prints row counts without writing.

### Task 3: Update recipe detail rendering

**Files:**
- Modify: `app/recipes/[slug]/page.tsx`
- Modify: `components/screens/BrowseScreen.tsx`
- Modify: `types/index.ts`
- Modify: `lib/recipes.ts`

- [ ] **Step 1: Add hard-caution plant list**

```ts
const HARD_CAUTION_PLANTS = new Set(["st-johns-wort", "licorice", "ginkgo", "ashwagandha"]);
```

- [ ] **Step 2: Render warning card**

```tsx
{HARD_CAUTION_PLANTS.has(primaryPlant?.slug ?? "") ? (
  <section className="rounded-md border border-[var(--border-safety)] bg-[var(--bg-safety)] p-4 shadow-md">
    <h2 className="m-0 font-display text-xl font-semibold text-[var(--text-safety)]">Warning</h2>
  </section>
) : null}
```

- [ ] **Step 3: Keep plant safety visible**

```tsx
<section className="rounded-md border border-[var(--border-safety)] bg-[var(--bg-safety)] p-4 shadow-md">
  <h2 className="m-0 font-display text-xl font-semibold text-[var(--text-safety)]">Plant Safety</h2>
</section>
```

- [ ] **Step 4: Make browse cards content-aware**

```tsx
<RecipeCard
  title={recipe.title}
  summary={recipe.summary}
  tags={[recipe.category, recipe.preparation_type]}
/>
```

- [ ] **Step 5: Verify compile**

Run: `npm run lint && npm run build`
Expected: both pass.

### Task 4: Review and handoff

**Files:**
- Modify: `docs/superpowers/plans/2026-06-17-content-ingestion.md`

- [ ] **Step 1: Confirm coverage**
- [ ] **Step 2: Summarize remaining gaps**
- [ ] **Step 3: Hand off for approval**

---

**Coverage check**
- JSON format and schemas: Task 1
- Import harness: Task 2
- Always-visible safety and hard-caution warnings: Task 3
- Validation: Task 3 and Task 4

