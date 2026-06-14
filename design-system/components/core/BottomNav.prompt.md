Fixed mobile bottom navigation bar. Amber top border on active item; icon and label both use amber color.

```jsx
const [navIndex, setNavIndex] = React.useState(0);

<BottomNav
  items={[
    { icon: <HomeIcon size={20}/>, label: 'Home' },
    { icon: <SearchIcon size={20}/>, label: 'Browse' },
    { icon: <BookOpenIcon size={20}/>, label: 'Cabinet' },
    { icon: <SettingsIcon size={20}/>, label: 'Settings' },
  ]}
  activeIndex={navIndex}
  onItemClick={setNavIndex}
/>
```

**Active state:** 2px amber top border + amber icon + amber label  
**Inactive state:** muted parchment-500 icon and label  
**Height:** 64px — meets minimum touch-target requirement  
**Icon source:** Prefer Lucide icons (1.5px stroke, rounded). Unicode symbols (⌂ ⊕) work as fallback in non-production cards.  
**Max items:** 5 (4 recommended). Fewer = more generous hit targets.

**Positioning:** Wrap screen content in a flex column; place `<BottomNav>` as the last child with `flexShrink: 0`. The content area above takes `flex: 1; overflowY: auto`.
