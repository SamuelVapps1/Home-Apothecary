Small uppercase inline badge for category labels and status indicators. Appears on remedy cards, detail screens, and inline with herb names.

```jsx
<Badge variant="amber">Digestive</Badge>
<Badge variant="sage">Immunity</Badge>
<Badge variant="safety">⚠ Interactions</Badge>
<Badge variant="neutral">Traditional Use</Badge>
```

**Variants**
- `amber` — Primary accent; featured category, primary label
- `sage` — Herb/symptom category tags on remedy cards
- `safety` — Burgundy; contraindications, drug interaction callouts
- `neutral` — Subtle; metadata, source type, secondary info

**Usage**
- Render multiple badges in a flex row with `gap: var(--gap-tags)`
- Use `safety` badge sparingly — only when real contraindications exist
- Do not exceed ~3 badges per remedy card (use Tags for more)
