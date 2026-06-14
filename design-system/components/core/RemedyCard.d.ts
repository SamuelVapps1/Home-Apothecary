/**
 * @startingPoint section="UI" subtitle="Herb remedy card — dark surface, amber top border, botanical watermark" viewport="375x160"
 */
export interface RemedyCardProps {
  /** Primary herb name — displayed in large cream serif */
  herbName: string;
  /** Latin botanical name — displayed italic amber below herb name */
  latinName?: string;
  /** One-sentence summary of traditional use */
  summary?: string;
  /** Symptom/category tags rendered as sage-colored pills */
  tags?: string[];
  /** When true, shows a small amber ⚠ badge — for herbs with significant contraindications */
  hasWarning?: boolean;
  /** Click handler for navigating to remedy detail */
  onClick?: () => void;
}
