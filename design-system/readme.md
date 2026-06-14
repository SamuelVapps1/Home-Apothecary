# Home Apothecary Design System

## Overview

**Home Apothecary** is a paid mobile-first PWA for herbal remedies. The experience should feel like an old leather-bound apothecary book that came to life digitally — warm, authoritative, slightly mysterious, but trustworthy and very readable.

The design language serves three goals:
1. **Discovery** — Browse remedies with rich botanical visual identity
2. **Understanding** — Read preparation and traditional-use information on warm parchment surfaces
3. **Safety** — Surface contraindications and drug interactions prominently, never hidden

---

## Sources

This design system was created from a written product brief (June 2026). No external codebase or Figma file was provided. All visual decisions derive from the brief.

---

## Content Fundamentals

### Voice & Tone
- **Warm authority** — Write like a knowledgeable, caring herbalist, not a pharmaceutical insert and not a wellness influencer.
- **Second person** — "You'll need…" not "The user needs…" or "One must…"
- **Traditional framing** — Acknowledge historical context honestly: "traditionally used for," "folk remedy," "historical use suggests"
- **Not clinical, but serious about safety** — Body copy can be warm and inviting. Safety sections must be unambiguous and complete.

### Naming Conventions
| Element | Convention | Example |
|---|---|---|
| Primary herb name | Title case | Chamomile |
| Latin name | Italic, smaller, amber | *Matricaria recutita* |
| Category labels | Tracked uppercase | DIGESTIVE · SLEEP |
| Section headings | Title case, Cormorant Garamond | Traditional Use |
| Step descriptions | Sentence case, Lora | Steep for 10 minutes… |

### Safety Copy Rules
- Safety sections use **bold phrases** for key terms: "Do not use if…", "May interact with…"
- Pregnancy: Always include an explicit statement, even if the herb is generally safe
- Drug interaction: Name the drug class, not just "medications"
- Never soften safety language with hedging adjectives like "mild" or "slight"

### No Emoji
The vintage aesthetic means no emoji anywhere in the UI. Use SVG icons, plain Unicode symbols (⚠), and botanical decorative elements instead.

### Casing
- Headings: Title Case
- Body prose: Sentence case
- Labels, tags, button text: UPPERCASE (tracked)
- Latin names: *Italic sentence case*

---

## Visual Foundations

### Color System

The palette draws from dark forest environments, warm candlelight, and aged parchment.

| Role | Token | Hex |
|---|---|---|
| App background | `--bg-app` | `#1a2e1a` |
| Card surface | `--bg-card` | `#1e2d1e` |
| Elevated card | `--bg-card-elevated` | `#243324` |
| Light parchment | `--bg-parchment` | `#f5eedc` |
| Alt parchment | `--bg-parchment-alt` | `#ede0c4` |
| Safety/warning bg | `--bg-safety` | `#8b1a1a` |
| Primary text | `--text-primary` | `#f0e8d0` |
| Secondary text | `--text-secondary` | `#c4b896` |
| Amber accent | `--accent-primary` | `#c9973a` |
| Sage accent | `--accent-secondary` | `#7a9e7a` |
| Latin name text | `--text-latin` | `#c9973a` |
| Text on parchment | `--text-on-parchment` | `#2a1f0e` |

**Why these choices:**
- Forest greens (#1a2e1a range) evoke old apothecary cabinets and dark wood shelves
- Parchment creams (#f5eedc) feel like aged herbalist notebooks — never pure white
- Amber (#c9973a) suggests candlelight, gold lettering on antique labels
- Burgundy (#8b1a1a) reads as serious and important without being alarm-red

### Typography

**Display: Cormorant Garamond** (Google Fonts)
- Herb names, app title, Latin text, section headings in content cards
- Gives the feel of an old botanical monograph or apothecary ledger
- Use weights 400 (italic/Latin), 600 (herb names), 700 (app title)

**Body: Lora** (Google Fonts)
- Prose descriptions, preparation steps, UI labels, button text, tags
- Warm readable serif — not clinical, not too decorative
- Use weights 400 (body), 500 (emphasis), 600 (small-cap labels)

*Production note: Download and self-host both fonts for offline PWA support. The `@font-face` in `tokens/fonts.css` currently uses Google Fonts CDN.*

### Backgrounds & Surfaces
- **App bg**: Dark forest green, full bleed, no texture
- **Cards (dark)**: Slightly lighter green surface, 2px amber top border — the signature card element
- **Cards (parchment)**: Warm cream background for readable content (traditional use, steps, dosage)
- **Hero sections**: Dark green radial/linear gradient with low-opacity botanical line art overlay
- **Safety sections**: Deep burgundy, cream text — visually unmistakable

### Decorative Elements
- **Botanical line art**: Thin-stroke engraving style (18th–19th century illustration aesthetic). Used as card watermarks (5–8% opacity) and hero backgrounds
- **Ornamental dividers**: Horizontal lines with leaf pairs flanking a diamond center
- **Card amber border**: 2px solid `--color-amber-500` at top — the most repeated structural motif
- **Step circles**: Amber circle badge containing a step number in Cormorant Garamond

### Card Anatomy
| Card type | Background | Border | Radius | Shadow |
|---|---|---|---|---|
| Remedy card | `--bg-card` | 2px amber top | 12px | shadow-md |
| Parchment card | `--bg-parchment` | none | 8px | shadow-sm |
| Safety card | `--bg-safety` | 1px burgundy | 10px | shadow-md |
| Dosage card | `--bg-parchment` | 3px amber left | 8px | shadow-sm |

### Hover & Press States
- **Card hover**: Background → `--bg-card-elevated`, shadow increases to shadow-lg
- **Button primary hover**: Amber lightens to `--color-amber-400`, subtle glow shadow
- **Button press**: `transform: scale(0.97)` — tactile press feel
- **Tag/chip hover**: Border brightens, faint bg tint
- **All transitions**: `0.18s ease` for UI, `0.2s ease` for card-level changes

### Shadows
- `--shadow-sm`: `0 1px 3px rgba(0,0,0,0.35)` — parchment cards
- `--shadow-md`: `0 2px 8px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.3)` — remedy cards (default)
- `--shadow-lg`: `0 4px 16px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.35)` — card hover, modals
- `--shadow-amber-focus`: `0 0 0 3px rgba(201,151,58,0.3)` — input focus ring

### Corner Radii
- Cards: `12px` (`--radius-lg`)
- Inputs, buttons: `8px` (`--radius-md`)
- Tags, badges: `999px` (`--radius-pill`)
- Step circles: `50%`
- Safety card: `10px`

### Animation Philosophy
- Transitions only — no decorative keyframe loops on content
- `0.18s ease` for micro-interactions
- `0.2s ease` for card-level state changes
- No motion on the botanical illustrations — they are static, engraved-feel elements

### Layout
- Mobile-first: 375px base width
- Horizontal screen padding: `--space-4` (16px)
- Bottom nav height: 64px (touch-safe)
- Header height: 56px
- Minimum touch target: 44px

---

## Iconography

### UI Icons: Lucide
**Lucide** (https://lucide.dev) — thin 1.5px stroke, rounded linecaps. Load from CDN:
```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

Key icons used:
- Navigation: `home`, `search`, `book-open`, `settings`
- Functional: `chevron-right`, `arrow-left`, `filter`, `x`, `plus`
- State: `alert-triangle`, `check-circle`, `info`
- Content: `leaf`, `flask-conical`, `heart`

### Custom Botanical SVGs (assets/)
| File | Purpose |
|---|---|
| `botanical-divider.svg` | Ornamental section divider with leaf pairs |
| `leaf-watermark.svg` | Single leaf watermark for card corners |
| `icon-herb.svg` | Small herb sprig for category chips |
| `icon-mortar.svg` | Mortar & pestle for brand mark use |

Use with `color: var(--text-accent)` or `color: var(--color-parchment-100)` depending on surface.

### Sourcing Vintage Botanical Illustrations (Production)
For hero screens and full-bleed remedy illustrations, source from:
1. **Biodiversity Heritage Library** (biodiversitylibrary.org) — public domain botanical plates, searchable by plant name
2. **Rawpixel Vintage Collections** (rawpixel.com) — curated vintage botanical illustrations, many free/CC0
3. **Wellcome Collection** (wellcomecollection.org) — CC-BY licensed botanical and medical illustrations
4. **New York Public Library Digital Collections** (digitalcollections.nypl.org) — public domain

Target style: **18th–19th century engraving** — single plant on white/off-white, thin line work, Ehret or Sowerby style. Convert to line-only (remove background) and use as SVG overlay at low opacity, or as amber-tinted illustration over dark surfaces.

---

## File Index

```
styles.css                     ← Global CSS entry (import only this file)
tokens/
  fonts.css                    ← Google Fonts @import + @font-face declarations
  colors.css                   ← Color scale + semantic aliases
  typography.css               ← Font stacks, size scale, weights, leading
  spacing.css                  ← Spacing scale, radii, shadows, z-index
assets/
  botanical-divider.svg        ← Ornamental horizontal divider
  leaf-watermark.svg           ← Leaf silhouette for card watermarks
  icon-herb.svg                ← Herb/sprig icon for category chips
  icon-mortar.svg              ← Mortar & pestle brand icon
components/
  core/
    Button.jsx + .d.ts         ← Primary, secondary, ghost, danger variants
    Badge.jsx + .d.ts          ← Amber, sage, safety, neutral inline badges
    Tag.jsx + .d.ts            ← Filter chip with amber active state
    RemedyCard.jsx + .d.ts     ← Herb card with amber top border
    Input.jsx + .d.ts          ← Dark input with amber focus ring
    BottomNav.jsx + .d.ts      ← Mobile bottom navigation bar
    core.card.html             ← Component showcase (Design System tab)
guidelines/
  colors-backgrounds.card.html   ← Dark forest green scale
  colors-parchment.card.html     ← Parchment cream scale
  colors-amber.card.html         ← Amber/gold accent scale
  colors-sage.card.html          ← Sage green scale
  colors-safety.card.html        ← Burgundy/safety scale
  colors-text.card.html          ← Text color tokens
  type-display.card.html         ← Cormorant Garamond specimens
  type-body.card.html            ← Lora specimens
  type-labels.card.html          ← Labels, tracked uppercase
  type-scale.card.html           ← Full size scale
  spacing.card.html              ← Spacing token scale
  radii.card.html                ← Border radius examples
  shadows.card.html              ← Shadow system
  decorative.card.html           ← Botanical dividers, card motifs
ui_kits/
  home_apothecary/
    index.html                 ← Browse + Remedy Detail interactive prototype
    BrowseScreen.jsx           ← Home/browse screen component
    RemedyDetail.jsx           ← Remedy detail screen component
SKILL.md                       ← Agent skill manifest
```

---

*Design system created June 2026 from product brief. No external codebase or Figma linked.*
