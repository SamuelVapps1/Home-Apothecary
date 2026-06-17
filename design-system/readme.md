# Virtual Apothecary Design System

## Overview

Virtual Apothecary is a paid mobile-first PWA for traditional herbal recipes. The experience should feel like an old leather-bound apothecary book that came to life digitally: warm, authoritative, slightly mysterious, but trustworthy and very readable.

## Content Fundamentals

- Warm authority: write like a knowledgeable, caring herbalist.
- Second person: prefer "You will need..." over indirect phrasing.
- Traditional framing: use "traditionally used for," "folk remedy," and similar language.
- Safety first: contraindications, interactions, and pregnancy information must stay visible.
- No emoji.

## Visual Foundations

- App background: dark forest green.
- Cards: slightly lighter green with an amber top border.
- Readable surfaces: warm parchment.
- Safety sections: deep burgundy with cream text.
- Display type: Cormorant Garamond.
- Body type: Lora.

## File Index

```text
styles.css
tokens/
  fonts.css
  colors.css
  typography.css
  spacing.css
assets/
  botanical-divider.svg
  leaf-watermark.svg
  icon-herb.svg
  icon-mortar.svg
components/
  core/
    Button.jsx
    Badge.jsx
    Tag.jsx
    RemedyCard.jsx
    Input.jsx
    BottomNav.jsx
ui_kits/
  home_apothecary/
    index.html
SKILL.md
```

## Notes

- The generated design-system bundle namespace is intentionally left unchanged for compatibility.
- Update the documented product name in source-facing copy only.
