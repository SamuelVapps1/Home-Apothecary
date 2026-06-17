Dark-surface input with amber focus ring. Used for the Browse search bar and any form fields (cabinet notes, dosage tracking).

```jsx
// Search bar
<Input
  type="search"
  placeholder="Search recipes, herbs, symptoms…"
  leadingIcon="⌕"
/>

// Form field with safety hint
<Input
  label="Daily Dose"
  placeholder="e.g. 2 cups chamomile tea"
  value={dose}
  onChange={e => setDose(e.target.value)}
  hint="Traditional dosage ranges only — consult a qualified practitioner."
/>
```

**Focus state:** amber border (`--color-amber-500`) + amber glow shadow  
**`leadingIcon`:** any ReactNode — emoji, Lucide icon component, or SVG. Input left-padding adjusts to 40px automatically.  
**`hint`:** render in italic muted text below; always use for dosage fields and safety-adjacent inputs.  

**Placeholder styling:** add `input::placeholder { color: var(--text-muted); opacity: 1; }` to consumer CSS.
