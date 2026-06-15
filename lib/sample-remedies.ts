import type { Remedy, RemedyTeaser } from "@/types";

export const remedies: Remedy[] = [
  {
    id: "1",
    slug: "chamomile",
    name: "Chamomile",
    name_latin: "Matricaria recutita",
    category: "Sleep",
    summary: "A gentle flowering herb traditionally used to calm the nerves and ease uneasy digestion.",
    traditional_use:
      "Chamomile has long been used in household herbal practice for its soft, settling character. Traditionally it is prepared as a warm infusion when the body feels tense, restless, or unsettled after food.",
    preparation_steps: [
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
    ingredients: ["Dried chamomile flowers", "Freshly boiled water", "Raw honey, optional"],
    symptoms: ["restlessness", "evening tension", "post-meal heaviness"],
    dosage_note: "Traditional range: 1 to 3 cups daily, depending on the preparation and tolerance.",
    contraindications: [
      "Do not use if you have a known allergy to plants in the Asteraceae family.",
    ],
    interactions: [
      "May intensify the effects of sedative medicines and coumarin anticoagulants.",
    ],
    pregnancy_warning: true,
    pregnancy_warning_text:
      "Pregnancy: keep to ordinary dietary amounts unless a qualified practitioner advises otherwise.",
    allergy_note: "Possible cross-reaction with ragweed, chrysanthemums, marigolds, and daisies.",
    sources: [
      "European Medicines Agency herbal monograph",
      "British Herbal Pharmacopoeia",
      "Commission E monograph collection",
    ],
    is_teaser: false,
  },
  {
    id: "2",
    slug: "ginger",
    name: "Ginger",
    name_latin: "Zingiber officinale",
    category: "Digestive",
    summary: "A warming root traditionally used to settle the stomach and support circulation.",
    traditional_use:
      "Ginger has been used in kitchens and herbal practice alike as a warming, aromatic root. Traditionally it is prepared when the body feels cold, sluggish, or unsettled after travel or meals.",
    preparation_steps: [
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
    ingredients: ["Fresh ginger root or dried ginger slices", "Water", "Honey or lemon, optional"],
    symptoms: ["nausea", "travel sickness", "cold digestion"],
    dosage_note: "Traditional range: small cups through the day; keep preparations modest and conservative.",
    contraindications: ["Use caution if you have a very sensitive stomach or active gastric irritation."],
    interactions: ["May affect anticoagulants and blood-sugar-lowering medicines."],
    pregnancy_warning: true,
    pregnancy_warning_text:
      "Pregnancy: use only conservative dietary amounts and seek guidance for concentrated preparations.",
    allergy_note: "Uncommon, but stop use if mouth or skin irritation appears.",
    sources: ["Traditional European herbal practice", "Commission E", "Modern herb monographs"],
    is_teaser: false,
  },
  {
    id: "3",
    slug: "elderberry",
    name: "Elderberry",
    name_latin: "Sambucus nigra",
    category: "Immunity",
    summary: "A dark berry preparation traditionally used in seasonal folk practice.",
    traditional_use:
      "Elderberry has a long folk history as a seasonal remedy. Traditionally it is prepared as a syrup or decoction when people want a warming, dark berry infusion during the cold months.",
    preparation_steps: [
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
    ingredients: ["Cooked elderberries", "Water", "Optional honey", "Optional warming spices"],
    symptoms: ["seasonal weariness", "cool weather routines", "convalescent care"],
    dosage_note: "Traditional range only; keep servings small and preparation thorough.",
    contraindications: ["Do not use raw berries, leaves, or stems."],
    interactions: ["Use caution alongside immunosuppressive medicines and diuretics."],
    pregnancy_warning: true,
    pregnancy_warning_text: "Pregnancy: use only well-prepared, conservative servings and avoid raw material.",
    allergy_note: "Stop use if digestive upset or rash appears.",
    sources: ["Folk herb references", "Herbal monographs", "Traditional syrup preparations"],
    is_teaser: true,
  },
  {
    id: "4",
    slug: "valerian",
    name: "Valerian",
    name_latin: "Valeriana officinalis",
    category: "Sleep",
    summary: "A root traditionally used for settled evenings and calmer night rest.",
    traditional_use:
      "Valerian has been used for generations in quiet evening preparations. Traditionally it is taken when a person wants a stronger, earthy herb for winding down rather than stimulation.",
    preparation_steps: [
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
    ingredients: ["Dried valerian root", "Hot water"],
    symptoms: ["restless evenings", "tension", "sleep ritual support"],
    dosage_note: "Traditional range: modest evening servings only.",
    contraindications: ["Do not combine with other strongly sedating preparations without guidance."],
    interactions: ["May intensify sedative medicines, alcohol, and certain sleep aids."],
    pregnancy_warning: true,
    pregnancy_warning_text: "Pregnancy: avoid concentrated use unless a qualified practitioner approves it.",
    allergy_note: "Earthy odor is normal; stop if adverse reactions appear.",
    sources: ["European herbal references", "Traditional sleep preparations", "Herbal monographs"],
    is_teaser: false,
  },
  {
    id: "5",
    slug: "peppermint",
    name: "Peppermint",
    name_latin: "Mentha x piperita",
    category: "Digestive",
    summary: "A cooling aromatic herb traditionally used after meals and for a clear, bright mouthfeel.",
    traditional_use:
      "Peppermint is a familiar household herb, traditionally used after meals and in refreshing infusions. Its bright aroma is often chosen when the body feels heavy or overfull.",
    preparation_steps: [
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
    ingredients: ["Peppermint leaves", "Hot water"],
    symptoms: ["heaviness after meals", "bloating", "taste fatigue"],
    dosage_note: "Traditional range: a cup after meals or as needed for a short, conservative run.",
    contraindications: ["Use caution if reflux tends to worsen with minty preparations."],
    interactions: ["May alter how some antacids and reflux medicines feel subjectively."],
    pregnancy_warning: true,
    pregnancy_warning_text: "Pregnancy: ordinary culinary use is different from concentrated herbal use; keep preparations modest.",
    allergy_note: "May irritate sensitive mouths or throats if overly concentrated.",
    sources: ["Household herbal practice", "Modern monographs", "Traditional digestive teas"],
    is_teaser: false,
  },
];

export const teaserRemedies: RemedyTeaser[] = remedies
  .filter((remedy) => remedy.is_teaser)
  .map((remedy) => ({
    id: remedy.id,
    slug: remedy.slug,
    name: remedy.name,
    name_latin: remedy.name_latin,
    category: remedy.category,
    summary: remedy.summary,
    symptoms: remedy.symptoms,
    is_teaser: true,
  }));

export function getRemedyBySlug(slug: string) {
  return remedies.find((remedy) => remedy.slug === slug) ?? null;
}
