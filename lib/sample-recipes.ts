import type { RecipeDetail } from "@/types";

export const recipes: RecipeDetail[] = [
  {
    id: "1",
    slug: "chamomile",
    title: "Chamomile",
    category: "Sleep",
    summary: "A gentle flowering herb traditionally used to calm the nerves and ease uneasy digestion.",
    preparation_type: "infusion",
    traditional_use:
      "Chamomile has long been used in household herbal practice for its soft, settling character. Traditionally it is prepared as a warm infusion when the body feels tense, restless, or unsettled after food.",
    method_steps: [
      {
        title: "Measure",
        text: "Use 2 heaped teaspoons of dried flowers for one cup.",
      },
      {
        title: "Infuse",
        text: "Pour freshly boiled water over the herb and cover for 10 minutes.",
      },
      {
        title: "Serve",
        text: "Strain and drink warm. Honey may be added after the tea cools slightly.",
      },
    ],
    dosage_note: "Traditional range: 1 to 3 cups daily, depending on the preparation and tolerance.",
    safety_notes: [],
    sources: [
      "European Medicines Agency herbal monograph",
      "British Herbal Pharmacopoeia",
      "Commission E monograph collection",
    ],
    is_free: true,
    required_tier: "free",
    components: [
      {
        id: "1-1",
        recipe_id: "1",
        plant_id: "plant-chamomile",
        part_used: "flowers",
        ratio_quantity: "2 heaped teaspoons per cup",
        temperature: "freshly boiled water",
        time: "10 minutes",
        prep_notes: "Cover the cup while it infuses.",
        sort_order: 1,
        plant: {
          id: "plant-chamomile",
          slug: "chamomile",
          common_name: "Chamomile",
          name_latin: "Matricaria recutita",
          family: "Asteraceae",
          parts_used: ["flowers"],
          contraindications: [
            "Do not use if you have a known allergy to plants in the Asteraceae family.",
          ],
          interactions: ["May intensify the effects of sedative medicines and coumarin anticoagulants."],
          pregnancy_warning_text:
            "Pregnancy: keep to ordinary dietary amounts unless a qualified practitioner advises otherwise.",
          allergy_note: "Possible cross-reaction with ragweed, chrysanthemums, marigolds, and daisies.",
          sources: [
            "European Medicines Agency herbal monograph",
            "British Herbal Pharmacopoeia",
            "Commission E monograph collection",
          ],
        },
      },
    ],
  },
  {
    id: "2",
    slug: "ginger",
    title: "Ginger",
    category: "Digestive",
    summary: "A warming root traditionally used to settle the stomach and support circulation.",
    preparation_type: "infusion",
    traditional_use:
      "Ginger has been used in kitchens and herbal practice alike as a warming, aromatic root. Traditionally it is prepared when the body feels cold, sluggish, or unsettled after travel or meals.",
    method_steps: [
      {
        title: "Slice",
        text: "Cut a small piece of fresh root or use a teaspoon of dried slices.",
      },
      {
        title: "Simmer",
        text: "Steep in hot water for 10 to 15 minutes to draw out the aroma.",
      },
      {
        title: "Balance",
        text: "Drink plain or with a little honey or lemon if the flavor feels too sharp.",
      },
    ],
    dosage_note: "Traditional range: small cups through the day; keep preparations modest and conservative.",
    safety_notes: [],
    sources: ["Traditional European herbal practice", "Commission E", "Modern herb monographs"],
    is_free: true,
    required_tier: "free",
    components: [
      {
        id: "2-1",
        recipe_id: "2",
        plant_id: "plant-ginger",
        part_used: "root",
        ratio_quantity: "small piece or a teaspoon of dried slices",
        temperature: "hot water",
        time: "10 to 15 minutes",
        prep_notes: "Steep until the aroma draws through.",
        sort_order: 1,
        plant: {
          id: "plant-ginger",
          slug: "ginger",
          common_name: "Ginger",
          name_latin: "Zingiber officinale",
          family: "Zingiberaceae",
          parts_used: ["root"],
          contraindications: ["Use caution if you have a very sensitive stomach or active gastric irritation."],
          interactions: ["May affect anticoagulants and blood-sugar-lowering medicines."],
          pregnancy_warning_text:
            "Pregnancy: use only conservative dietary amounts and seek guidance for concentrated preparations.",
          allergy_note: "Uncommon, but stop use if mouth or skin irritation appears.",
          sources: ["Traditional European herbal practice", "Commission E", "Modern herb monographs"],
        },
      },
    ],
  },
  {
    id: "3",
    slug: "elderberry",
    title: "Elderberry",
    category: "Seasonal",
    summary: "A dark berry preparation traditionally used in seasonal folk practice.",
    preparation_type: "decoction",
    traditional_use:
      "Elderberry has a long folk history as a seasonal remedy. Traditionally it is prepared as a syrup or decoction when people want a warming, dark berry infusion during the cold months.",
    method_steps: [
      {
        title: "Cook",
        text: "Simmer the berries thoroughly rather than using them raw.",
      },
      {
        title: "Strain",
        text: "Press through a sieve to remove skins and seeds.",
      },
      {
        title: "Store",
        text: "Keep refrigerated and use only a small serving at a time.",
      },
    ],
    dosage_note: "Traditional range only; keep servings small and preparation thorough.",
    safety_notes: [],
    sources: ["Folk herb references", "Herbal monographs", "Traditional syrup preparations"],
    is_free: false,
    required_tier: "standard",
    components: [
      {
        id: "3-1",
        recipe_id: "3",
        plant_id: "plant-elderberry",
        part_used: "berries",
        ratio_quantity: "small serving",
        temperature: "simmered",
        time: "thoroughly cooked",
        prep_notes: "Simmer thoroughly rather than using raw material.",
        sort_order: 1,
        plant: {
          id: "plant-elderberry",
          slug: "elderberry",
          common_name: "Elderberry",
          name_latin: "Sambucus nigra",
          family: "Adoxaceae",
          parts_used: ["berries"],
          contraindications: ["Do not use raw berries, leaves, or stems."],
          interactions: ["Use caution alongside immunosuppressive medicines and diuretics."],
          pregnancy_warning_text:
            "Pregnancy: use only well-prepared, conservative servings and avoid raw material.",
          allergy_note: "Stop use if digestive upset or rash appears.",
          sources: ["Folk herb references", "Herbal monographs", "Traditional syrup preparations"],
        },
      },
    ],
  },
  {
    id: "4",
    slug: "valerian",
    title: "Valerian",
    category: "Sleep",
    summary: "A root traditionally used for settled evenings and calmer night rest.",
    preparation_type: "infusion",
    traditional_use:
      "Valerian has been used for generations in quiet evening preparations. Traditionally it is taken when a person wants a stronger, earthy herb for winding down rather than stimulation.",
    method_steps: [
      {
        title: "Grind",
        text: "Lightly bruise the root to expose the aroma before steeping.",
      },
      {
        title: "Steep",
        text: "Infuse in hot water for 10 to 15 minutes, covered.",
      },
      {
        title: "Use at night",
        text: "Drink in the evening and keep the rest of the routine calm and simple.",
      },
    ],
    dosage_note: "Traditional range: modest evening servings only.",
    safety_notes: [],
    sources: ["European herbal references", "Traditional sleep preparations", "Herbal monographs"],
    is_free: false,
    required_tier: "premium",
    components: [
      {
        id: "4-1",
        recipe_id: "4",
        plant_id: "plant-valerian",
        part_used: "root",
        ratio_quantity: "modest evening serving",
        temperature: "hot water",
        time: "10 to 15 minutes",
        prep_notes: "Lightly bruise the root before steeping.",
        sort_order: 1,
        plant: {
          id: "plant-valerian",
          slug: "valerian",
          common_name: "Valerian",
          name_latin: "Valeriana officinalis",
          family: "Caprifoliaceae",
          parts_used: ["root"],
          contraindications: ["Do not combine with other strongly sedating preparations without guidance."],
          interactions: ["May intensify sedative medicines, alcohol, and certain sleep aids."],
          pregnancy_warning_text:
            "Pregnancy: avoid concentrated use unless a qualified practitioner approves it.",
          allergy_note: "Earthy odor is normal; stop if adverse reactions appear.",
          sources: ["European herbal references", "Traditional sleep preparations", "Herbal monographs"],
        },
      },
    ],
  },
  {
    id: "5",
    slug: "peppermint",
    title: "Peppermint",
    category: "Digestive",
    summary: "A cooling aromatic herb traditionally used after meals and for a clear, bright mouthfeel.",
    preparation_type: "infusion",
    traditional_use:
      "Peppermint is a familiar household herb, traditionally used after meals and in refreshing infusions. Its bright aroma is often chosen when the body feels heavy or overfull.",
    method_steps: [
      {
        title: "Crush",
        text: "Gently bruise the leaves before steeping.",
      },
      {
        title: "Infuse",
        text: "Cover with hot water for 5 to 8 minutes to keep the flavor lively.",
      },
      {
        title: "Drink",
        text: "Sip slowly after food or during the day as a cooling herbal cup.",
      },
    ],
    dosage_note: "Traditional range: a cup after meals or as needed for a short, conservative run.",
    safety_notes: [],
    sources: ["Household herbal practice", "Modern monographs", "Traditional digestive teas"],
    is_free: true,
    required_tier: "free",
    components: [
      {
        id: "5-1",
        recipe_id: "5",
        plant_id: "plant-peppermint",
        part_used: "leaves",
        ratio_quantity: "one cup after meals",
        temperature: "hot water",
        time: "5 to 8 minutes",
        prep_notes: "Bruise the leaves before steeping.",
        sort_order: 1,
        plant: {
          id: "plant-peppermint",
          slug: "peppermint",
          common_name: "Peppermint",
          name_latin: "Mentha x piperita",
          family: "Lamiaceae",
          parts_used: ["leaves"],
          contraindications: ["Use caution if reflux tends to worsen with minty preparations."],
          interactions: ["May alter how some antacids and reflux medicines feel subjectively."],
          pregnancy_warning_text:
            "Pregnancy: ordinary culinary use is different from concentrated herbal use; keep preparations modest.",
          allergy_note: "May irritate sensitive mouths or throats if overly concentrated.",
          sources: ["Household herbal practice", "Modern monographs", "Traditional digestive teas"],
        },
      },
    ],
  },
];

export function getRecipeBySlug(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug) ?? null;
}
