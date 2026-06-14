Renders a vintage apothecary-style button with uppercase tracked labels. Four variants cover all interactive contexts in the app.

```jsx
<Button variant="primary">Add to Cabinet</Button>
<Button variant="secondary" size="sm">Learn More</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="danger">⚠ Report Safety Issue</Button>
<Button variant="primary" fullWidth disabled>Loading…</Button>
```

**Variants**
- `primary` — Amber fill; main CTA (add to cabinet, save, confirm)
- `secondary` — Amber outline on transparent; secondary actions
- `ghost` — Subtle border; cancel, dismiss, low-priority actions
- `danger` — Burgundy fill; safety-related destructive actions

**Sizes**
- `sm` — Inline, tight contexts (tags row, card secondary action)
- `md` — Default; most screen-level buttons
- `lg` — Hero CTA, full-bleed action rows

**Behaviour**
- Press: `scale(0.97)` transform for tactile feedback
- Hover: primary lightens to amber-400 with glow shadow
- Disabled: 50% opacity, cursor not-allowed, click suppressed
