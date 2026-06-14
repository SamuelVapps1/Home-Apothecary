The main list item for Browse and search results. Dark surface (#1e2d1e), 2px amber top border, subtle botanical leaf watermark in the lower-right corner.

```jsx
<RemedyCard
  herbName="Chamomile"
  latinName="Matricaria recutita"
  summary="A gentle flowering herb used for centuries to calm the nervous system and ease digestion."
  tags={['Sleep', 'Digestive', 'Anxiety']}
  hasWarning={false}
  onClick={() => navigate('/remedy/chamomile')}
/>

<RemedyCard
  herbName="Valerian"
  latinName="Valeriana officinalis"
  summary="A root with powerful sedative compounds traditionally used for insomnia."
  tags={['Sleep', 'Anxiety']}
  hasWarning={true}
/>
```

**`hasWarning`** — Show the amber ⚠ badge when the herb has significant drug interactions or contraindications (e.g. Valerian + sedatives, St. John's Wort + many medications). This badge is intentionally understated on the card — full detail is on the Remedy Detail safety section.

**Tags** — Use the standard category vocabulary: Sleep · Digestive · Immunity · Pain · Skin · Antiviral · Nervine · Adaptogen

**Hover** — Background lightens to --bg-card-elevated, shadow upgrades to shadow-lg.
