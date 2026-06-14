export function LeafWatermark({
  className = "",
  opacity = 0.065,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      style={{ opacity }}
      viewBox="0 0 100 122"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 8 C69 18 84 43 80 69 C76 93 62 110 50 114 C38 110 24 93 20 69 C16 43 31 18 50 8Z" stroke="currentColor" strokeWidth="1.5" />
      <line x1="50" x2="50" y1="12" y2="110" stroke="currentColor" strokeWidth="0.9" />
      <path d="M50 30 Q41 35 35 44" stroke="currentColor" strokeWidth="0.6" />
      <path d="M50 48 Q40 54 33 63" stroke="currentColor" strokeWidth="0.6" />
      <path d="M50 66 Q41 72 35 81" stroke="currentColor" strokeWidth="0.6" />
      <path d="M50 30 Q59 35 65 44" stroke="currentColor" strokeWidth="0.6" />
      <path d="M50 48 Q60 54 67 63" stroke="currentColor" strokeWidth="0.6" />
      <path d="M50 66 Q59 72 65 81" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}
