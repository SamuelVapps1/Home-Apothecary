/**
 * @startingPoint section="Core" subtitle="Filter chip with amber active state for category browsing" viewport="700x80"
 */
export interface TagProps {
  /** Tag label */
  children: React.ReactNode;
  /** Highlighted / selected state — amber border and background tint */
  active?: boolean;
  /** Toggle handler */
  onClick?: () => void;
}
