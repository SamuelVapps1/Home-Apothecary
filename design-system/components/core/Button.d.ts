/**
 * @startingPoint section="Core" subtitle="Amber primary, ghost, and danger button variants" viewport="700x180"
 */
export interface ButtonProps {
  /** Button label / content */
  children: React.ReactNode;
  /** Visual variant. primary = amber fill; secondary = amber outline; ghost = subtle; danger = burgundy */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Size. Affects padding and font size. */
  size?: 'sm' | 'md' | 'lg';
  /** Disables interaction and reduces opacity */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Stretch button to full container width */
  fullWidth?: boolean;
  /** HTML button type attribute */
  type?: 'button' | 'submit' | 'reset';
}
