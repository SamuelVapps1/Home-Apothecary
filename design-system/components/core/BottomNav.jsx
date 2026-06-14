import React from 'react';

/**
 * BottomNav — Fixed mobile bottom navigation bar.
 * Dark surface with amber active-item indicator (top border + colored icon/label).
 * Minimum touch target: 64px bar height with icons at 22px.
 */
export function BottomNav({ items = [], activeIndex = 0, onItemClick }) {
  return React.createElement('nav', {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      background: 'var(--bg-bottom-nav)',
      borderTop: '1px solid var(--border-subtle)',
      height: '64px',
      width: '100%',
      flexShrink: 0,
    },
  },
    items.map((item, i) => {
      const isActive = i === activeIndex;
      return React.createElement('button', {
        key: i,
        onClick: () => onItemClick && onItemClick(i),
        style: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          background: 'transparent',
          border: 'none',
          borderTop: `2px solid ${isActive ? 'var(--color-amber-500)' : 'transparent'}`,
          cursor: 'pointer',
          padding: '8px 4px 6px',
          transition: 'border-color 0.18s ease',
          outline: 'none',
        },
      },
        React.createElement('span', {
          style: {
            fontSize: '20px',
            color: isActive ? 'var(--color-amber-500)' : 'var(--text-muted)',
            lineHeight: 1,
            transition: 'color 0.18s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }, item.icon),
        React.createElement('span', {
          style: {
            fontFamily: 'var(--font-body)',
            fontSize: '0.58rem',
            color: isActive ? 'var(--color-amber-400)' : 'var(--text-muted)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            transition: 'color 0.18s ease',
            lineHeight: 1.2,
          },
        }, item.label)
      );
    })
  );
}
