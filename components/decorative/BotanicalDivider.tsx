export function BotanicalDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 360 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0" x2="155" y1="14" y2="14" opacity="0.45" stroke="currentColor" strokeWidth="0.75" />
      <line x1="205" x2="360" y1="14" y2="14" opacity="0.45" stroke="currentColor" strokeWidth="0.75" />
      <path d="M180 5 L186 14 L180 23 L174 14 Z" fill="currentColor" opacity="0.65" />
      <ellipse
        cx="148"
        cy="11"
        rx="8"
        ry="3.5"
        opacity="0.55"
        stroke="currentColor"
        strokeWidth="0.9"
        transform="rotate(-25 148 11)"
      />
      <line x1="145" x2="151" y1="8" y2="16" opacity="0.4" stroke="currentColor" strokeWidth="0.5" />
      <ellipse
        cx="212"
        cy="11"
        rx="8"
        ry="3.5"
        opacity="0.55"
        stroke="currentColor"
        strokeWidth="0.9"
        transform="rotate(25 212 11)"
      />
      <line x1="209" x2="215" y1="8" y2="16" opacity="0.4" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}
