insert into public.plants (
  slug,
  common_name,
  name_latin,
  family,
  parts_used,
  contraindications,
  interactions,
  pregnancy_warning_text,
  allergy_note,
  sources
)
values
(
  'chamomile',
  'Chamomile',
  'Matricaria recutita',
  'Asteraceae',
  array['flowers'],
  array['Do not use if you have a known allergy to plants in the Asteraceae family.'],
  array['May intensify the effects of sedative medicines and coumarin anticoagulants.'],
  'Pregnancy: keep to ordinary dietary amounts unless a qualified practitioner advises otherwise.',
  'Possible cross-reaction with ragweed, chrysanthemums, marigolds, and daisies.',
  array['European Medicines Agency herbal monograph', 'British Herbal Pharmacopoeia', 'Commission E monograph collection']
),
(
  'ginger',
  'Ginger',
  'Zingiber officinale',
  'Zingiberaceae',
  array['root'],
  array['Use caution if you have a very sensitive stomach or active gastric irritation.'],
  array['May affect anticoagulants and blood-sugar-lowering medicines.'],
  'Pregnancy: use only conservative dietary amounts and seek guidance for concentrated preparations.',
  'Uncommon, but stop use if mouth or skin irritation appears.',
  array['Traditional European herbal practice', 'Commission E', 'Modern herb monographs']
),
(
  'elderberry',
  'Elderberry',
  'Sambucus nigra',
  'Adoxaceae',
  array['berries'],
  array['Do not use raw berries, leaves, or stems.'],
  array['Use caution alongside immunosuppressive medicines and diuretics.'],
  'Pregnancy: use only well-prepared, conservative servings and avoid raw material.',
  'Stop use if digestive upset or rash appears.',
  array['Folk herb references', 'Herbal monographs', 'Traditional syrup preparations']
),
(
  'valerian',
  'Valerian',
  'Valeriana officinalis',
  'Caprifoliaceae',
  array['root'],
  array['Do not combine with other strongly sedating preparations without guidance.'],
  array['May intensify sedative medicines, alcohol, and certain sleep aids.'],
  'Pregnancy: avoid concentrated use unless a qualified practitioner approves it.',
  'Earthy odor is normal; stop if adverse reactions appear.',
  array['European herbal references', 'Traditional sleep preparations', 'Herbal monographs']
),
(
  'peppermint',
  'Peppermint',
  'Mentha x piperita',
  'Lamiaceae',
  array['leaves'],
  array['Use caution if reflux tends to worsen with minty preparations.'],
  array['May alter how some antacids and reflux medicines feel subjectively.'],
  'Pregnancy: ordinary culinary use is different from concentrated herbal use; keep preparations modest.',
  'May irritate sensitive mouths or throats if overly concentrated.',
  array['Household herbal practice', 'Modern monographs', 'Traditional digestive teas']
)
on conflict (slug) do update set
  common_name = excluded.common_name,
  name_latin = excluded.name_latin,
  family = excluded.family,
  parts_used = excluded.parts_used,
  contraindications = excluded.contraindications,
  interactions = excluded.interactions,
  pregnancy_warning_text = excluded.pregnancy_warning_text,
  allergy_note = excluded.allergy_note,
  sources = excluded.sources;

insert into public.recipes (
  slug,
  title,
  category,
  summary,
  preparation_type,
  traditional_use,
  method_steps,
  dosage_note,
  safety_notes,
  sources,
  is_free,
  required_tier
)
values
(
  'chamomile',
  'Chamomile',
  'Sleep',
  'A gentle flowering herb traditionally used to calm the nerves and ease uneasy digestion.',
  'infusion',
  'Chamomile has long been used in household herbal practice for its soft, settling character. Traditionally it is prepared as a warm infusion when the body feels tense, restless, or unsettled after food.',
  '[{"title":"Measure","text":"Use 2 heaped teaspoons of dried flowers for one cup."},{"title":"Infuse","text":"Pour freshly boiled water over the herb and cover for 10 minutes."},{"title":"Serve","text":"Strain and drink warm. Honey may be added after the tea cools slightly."}]'::jsonb,
  'Traditional range: 1 to 3 cups daily, depending on the preparation and tolerance.',
  '{}'::text[],
  array['European Medicines Agency herbal monograph', 'British Herbal Pharmacopoeia', 'Commission E monograph collection'],
  true,
  'free'
),
(
  'ginger',
  'Ginger',
  'Digestive',
  'A warming root traditionally used to settle the stomach and support circulation.',
  'infusion',
  'Ginger has been used in kitchens and herbal practice alike as a warming, aromatic root. Traditionally it is prepared when the body feels cold, sluggish, or unsettled after travel or meals.',
  '[{"title":"Slice","text":"Cut a small piece of fresh root or use a teaspoon of dried slices."},{"title":"Simmer","text":"Steep in hot water for 10 to 15 minutes to draw out the aroma."},{"title":"Balance","text":"Drink plain or with a little honey or lemon if the flavor feels too sharp."}]'::jsonb,
  'Traditional range: small cups through the day; keep preparations modest and conservative.',
  '{}'::text[],
  array['Traditional European herbal practice', 'Commission E', 'Modern herb monographs'],
  true,
  'free'
),
(
  'elderberry',
  'Elderberry',
  'Seasonal',
  'A dark berry preparation traditionally used in seasonal folk practice.',
  'decoction',
  'Elderberry has a long folk history as a seasonal remedy. Traditionally it is prepared as a syrup or decoction when people want a warming, dark berry infusion during the cold months.',
  '[{"title":"Cook","text":"Simmer the berries thoroughly rather than using them raw."},{"title":"Strain","text":"Press through a sieve to remove skins and seeds."},{"title":"Store","text":"Keep refrigerated and use only a small serving at a time."}]'::jsonb,
  'Traditional range only; keep servings small and preparation thorough.',
  '{}'::text[],
  array['Folk herb references', 'Herbal monographs', 'Traditional syrup preparations'],
  false,
  'standard'
),
(
  'valerian',
  'Valerian',
  'Sleep',
  'A root traditionally used for settled evenings and calmer night rest.',
  'infusion',
  'Valerian has been used for generations in quiet evening preparations. Traditionally it is taken when a person wants a stronger, earthy herb for winding down rather than stimulation.',
  '[{"title":"Grind","text":"Lightly bruise the root to expose the aroma before steeping."},{"title":"Steep","text":"Infuse in hot water for 10 to 15 minutes, covered."},{"title":"Use at night","text":"Drink in the evening and keep the rest of the routine calm and simple."}]'::jsonb,
  'Traditional range: modest evening servings only.',
  '{}'::text[],
  array['European herbal references', 'Traditional sleep preparations', 'Herbal monographs'],
  false,
  'premium'
),
(
  'peppermint',
  'Peppermint',
  'Digestive',
  'A cooling aromatic herb traditionally used after meals and for a clear, bright mouthfeel.',
  'infusion',
  'Peppermint is a familiar household herb, traditionally used after meals and in refreshing infusions. Its bright aroma is often chosen when the body feels heavy or overfull.',
  '[{"title":"Crush","text":"Gently bruise the leaves before steeping."},{"title":"Infuse","text":"Cover with hot water for 5 to 8 minutes to keep the flavor lively."},{"title":"Drink","text":"Sip slowly after food or during the day as a cooling herbal cup."}]'::jsonb,
  'Traditional range: a cup after meals or as needed for a short, conservative run.',
  '{}'::text[],
  array['Household herbal practice', 'Modern monographs', 'Traditional digestive teas'],
  true,
  'free'
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  summary = excluded.summary,
  preparation_type = excluded.preparation_type,
  traditional_use = excluded.traditional_use,
  method_steps = excluded.method_steps,
  dosage_note = excluded.dosage_note,
  safety_notes = excluded.safety_notes,
  sources = excluded.sources,
  is_free = excluded.is_free,
  required_tier = excluded.required_tier;

insert into public.recipe_components (
  recipe_id,
  plant_id,
  part_used,
  ratio_quantity,
  temperature,
  time,
  prep_notes,
  sort_order
)
select
  r.id,
  p.id,
  case p.slug
    when 'chamomile' then 'flowers'
    when 'ginger' then 'root'
    when 'elderberry' then 'berries'
    when 'valerian' then 'root'
    when 'peppermint' then 'leaves'
  end,
  case p.slug
    when 'chamomile' then '2 heaped teaspoons per cup'
    when 'ginger' then 'small piece or a teaspoon of dried slices'
    when 'elderberry' then 'small serving'
    when 'valerian' then 'modest evening serving'
    when 'peppermint' then 'one cup after meals'
  end,
  case p.slug
    when 'chamomile' then 'freshly boiled water'
    when 'ginger' then 'hot water'
    when 'elderberry' then 'simmered'
    when 'valerian' then 'hot water'
    when 'peppermint' then 'hot water'
  end,
  case p.slug
    when 'chamomile' then '10 minutes'
    when 'ginger' then '10 to 15 minutes'
    when 'elderberry' then 'thoroughly cooked'
    when 'valerian' then '10 to 15 minutes'
    when 'peppermint' then '5 to 8 minutes'
  end,
  case p.slug
    when 'chamomile' then 'Cover the cup while it infuses.'
    when 'ginger' then 'Steep until the aroma draws through.'
    when 'elderberry' then 'Simmer thoroughly rather than using raw material.'
    when 'valerian' then 'Lightly bruise the root before steeping.'
    when 'peppermint' then 'Bruise the leaves before steeping.'
  end,
  1
from public.recipes r
join public.plants p on p.slug = r.slug
where r.slug in ('chamomile', 'ginger', 'elderberry', 'valerian', 'peppermint')
on conflict (recipe_id, plant_id, part_used) do update set
  ratio_quantity = excluded.ratio_quantity,
  temperature = excluded.temperature,
  time = excluded.time,
  prep_notes = excluded.prep_notes,
  sort_order = excluded.sort_order;

