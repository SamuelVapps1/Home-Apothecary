Filter chip / pill button for category selection rows on Browse and search screens.

```jsx
// Filter row example
const [active, setActive] = React.useState('all');

<div style={{ display: 'flex', gap: 'var(--gap-tags)', overflowX: 'auto' }}>
  {['All', 'Digestive', 'Sleep', 'Immunity', 'Pain', 'Skin'].map(cat => (
    <Tag key={cat} active={active === cat} onClick={() => setActive(cat)}>
      {cat}
    </Tag>
  ))}
</div>
```

**Active state:** amber border + subtle amber background tint  
**Hover state:** slightly brighter border + faint text brightening  
**Usage:** render in a horizontally scrollable flex row; hide scrollbar with CSS  

**Standard filter categories (Browse screen):**  
All · Digestive · Sleep · Immunity · Pain · Skin · What I Have · ⚠ Safety Check
