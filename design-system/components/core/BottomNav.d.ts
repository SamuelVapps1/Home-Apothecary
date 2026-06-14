export interface BottomNavItem {
  /** Icon — any ReactNode (Lucide component, SVG, or symbol character) */
  icon: React.ReactNode;
  /** Short label rendered below the icon in tracked uppercase */
  label: string;
}

export interface BottomNavProps {
  /** Navigation items — max 5 for mobile usability */
  items: BottomNavItem[];
  /** Index of the currently active item */
  activeIndex?: number;
  /** Called with the tapped item index */
  onItemClick?: (index: number) => void;
}
