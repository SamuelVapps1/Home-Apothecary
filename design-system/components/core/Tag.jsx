import React from 'react';

/**
 * Tag — Filter chip / pill button for category browsing.
 * Used in horizontal-scrolling filter rows on the Browse screen.
 * Active state: amber border + tinted background.
 */
export function Tag({ children, active = false, onClick }) {
  const [hovered, setHovered] = React.useState(false);

  return React.createElement('button', {
    onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '7px 15px',
      borderRadius: 'var(--radius-pill)',
      border: `1px solid ${active
        ? 'var(--color-amber-500)'
        : hovered
          ? 'rgba(240,232,208,0.28)'
          : 'var(--border-subtle)'}`,
      background: active
        ? 'rgba(201,151,58,0.14)'
        : hovered
          ? 'rgba(240,232,208,0.05)'
          : 'transparent',
      color: active
        ? 'var(--color-amber-400)'
        : hovered
          ? 'var(--text-primary)'
          : 'var(--text-secondary)',
      fontSize: '0.75rem',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--font-weight-medium)',
      letterSpacing: 'var(--tracking-wide)',
      cursor: 'pointer',
      transition: 'all 0.18s ease',
      whiteSpace: 'nowrap',
      outline: 'none',
      userSelect: 'none',
    },
  }, children);
}
