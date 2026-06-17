import { createClient } from "@supabase/supabase-js";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const contentDir = path.join(rootDir, "content");

const plantSchema = z.object({
  slug: z.string().min(1),
  common_name: z.string(),
  name_latin: z.string(),
  family: z.string(),
  parts_used: z.array(z.string()),
  contraindications: z.array(z.string()),
  interactions: z.array(z.string()),
  pregnancy_warning_text: z.string(),
  allergy_note: z.string(),
  sources: z.array(z.string()),
});

const recipeComponentSchema = z.object({
  plant_slug: z.string().min(1),
  part_used: z.string(),
  ratio_quantity: z.string(),
  temperature: z.string().optional(),
  time: z.string().optional(),
  prep_notes: z.string().optional(),
  sort_order: z.number().int().optional(),
});

const recipeSchema = z
  .object({
    slug: z.string().min(1),
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    preparation_type: z.enum(["infusion", "decoction", "tincture", "salve", "extract", "oil", "syrup", "powder", "other"]),
    traditional_use: z.string(),
    method_steps: z.array(
      z.object({
        title: z.string(),
        text: z.string(),
      }),
    ),
    dosage_note: z.string(),
    safety_notes: z.array(z.string()),
    sources: z.array(z.string()),
    is_free: z.boolean(),
    required_tier: z.enum(["free", "standard", "premium"]),
    components: z.array(recipeComponentSchema),
  })
  .superRefine((value, ctx) => {
    if (value.is_free && value.required_tier !== "free") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Free recipes must use the free tier.",
        path: ["required_tier"],
      });
    }

    if (!value.is_free && value.required_tier === "free") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Paid recipes must require standard or premium access.",
        path: ["required_tier"],
      });
    }
  });

function readJson(filePath) {
  return readFile(filePath, "utf8").then((raw) => JSON.parse(raw));
}

async function readSeedDir(dirPath, schema) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json") && !entry.name.startsWith("example-"))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  const parsed = [];
  for (const fileName of files) {
    const fullPath = path.join(dirPath, fileName);
    const value = await readJson(fullPath);
    parsed.push(schema.parse(value));
  }

  return parsed;
}

function ensureUnique(values, label) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }

  if (duplicates.size > 0) {
    throw new Error(`${label} contain duplicate values: ${Array.from(duplicates).join(", ")}`);
  }
}

async function loadSeeds() {
  const [plants, recipes] = await Promise.all([
    readSeedDir(path.join(contentDir, "plants"), plantSchema),
    readSeedDir(path.join(contentDir, "recipes"), recipeSchema),
  ]);

  ensureUnique(plants.map((plant) => plant.slug), "Plant slugs");
  ensureUnique(recipes.map((recipe) => recipe.slug), "Recipe slugs");

  return { plants, recipes };
}

function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function main() {
  const apply = process.argv.includes("--apply");
  const { plants, recipes } = await loadSeeds();

  console.log(`Validated ${plants.length} plants and ${recipes.length} recipes from ${path.relative(rootDir, contentDir)}.`);

  if (!apply) {
    console.log("Dry run only. Re-run with --apply to write to Supabase.");
    return;
  }

  const supabase = createServiceRoleClient();

  const { data: plantRows, error: plantError } = await supabase
    .from("plants")
    .upsert(plants, { onConflict: "slug" })
    .select("id,slug");

  if (plantError) {
    throw plantError;
  }

  const plantIdBySlug = new Map((plantRows ?? []).map((row) => [row.slug, row.id]));

  const recipePayload = recipes.map((recipe) => {
    const { components, ...rest } = recipe;
    void components;
    return rest;
  });
  const { data: recipeRows, error: recipeError } = await supabase
    .from("recipes")
    .upsert(recipePayload, { onConflict: "slug" })
    .select("id,slug");

  if (recipeError) {
    throw recipeError;
  }

  const recipeIdBySlug = new Map((recipeRows ?? []).map((row) => [row.slug, row.id]));
  const importedRecipeIds = Array.from(recipeIdBySlug.values());

  if (importedRecipeIds.length > 0) {
    const { error: deleteError } = await supabase.from("recipe_components").delete().in("recipe_id", importedRecipeIds);

    if (deleteError) {
      throw deleteError;
    }
  }

  const componentRows = [];
  for (const recipe of recipes) {
    const recipeId = recipeIdBySlug.get(recipe.slug);

    if (!recipeId) {
      throw new Error(`Missing database id for recipe slug: ${recipe.slug}`);
    }

    for (const component of recipe.components) {
      const plantId = plantIdBySlug.get(component.plant_slug);

      if (!plantId) {
        throw new Error(`Missing database id for plant slug: ${component.plant_slug}`);
      }

      componentRows.push({
        recipe_id: recipeId,
        plant_id: plantId,
        part_used: component.part_used,
        ratio_quantity: component.ratio_quantity,
        temperature: component.temperature ?? null,
        time: component.time ?? null,
        prep_notes: component.prep_notes ?? null,
        sort_order: component.sort_order ?? 0,
      });
    }
  }

  if (componentRows.length > 0) {
    const { error: componentError } = await supabase.from("recipe_components").insert(componentRows);

    if (componentError) {
      throw componentError;
    }
  }

  console.log(
    `Applied ${plants.length} plants, ${recipePayload.length} recipes, and ${componentRows.length} recipe components.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
