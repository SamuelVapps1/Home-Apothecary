import React from 'react';

/**
 * RemedyCard — Card displaying a single recipe in a list.
 *
 * Dark surface with the signature 2px amber top border.
 * Shows herb name (large cream serif), Latin name (italic amber),
 * a short summary, sage-colored category tags, and an optional
 * amber warning badge for herbs with strong contraindications.
 * A subtle botanical leaf watermark appears in the lower-right corner.
 */
export function RemedyCard({
  herbName,
  latinName,
  summary,
  tags = [],
  hasWarning = false,
  onClick,
}) {
  const [hovered, setHovered] = React.useState(false);

  return React.createElement('div', {
    onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      position: 'relative',
      background: hovered ? 'var(--bg-card-elevated)' : 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      borderTop: '2px solid var(--color-amber-500)',
      padding: 'var(--padding-card)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background 0.2s ease, box-shadow 0.2s ease',
      boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-md)',
      overflow: 'hidden',
    },
  },
    /* Botanical leaf watermark */
    React.createElement('div', {
      style: {
        position: 'absolute',
        bottom: '-6px',
        right: '-2px',
        width: '72px',
        height: '88px',
        opacity: 0.065,
        pointerEvents: 'none',
        color: 'var(--color-parchment-100)',
      },
    },
      React.createElement('svg', {
        viewBox: '0 0 100 122',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        style: { width: '100%', height: '100%' },
      },
        React.createElement('path', {
          d: 'M50 8 C69 18 84 43 80 69 C76 93 62 110 50 114 C38 110 24 93 20 69 C16 43 31 18 50 8Z',
          stroke: 'currentColor', strokeWidth: '1.5', fill: 'none',
        }),
        React.createElement('line', { x1: '50', y1: '12', x2: '50', y2: '110', stroke: 'currentColor', strokeWidth: '0.9' }),
        React.createElement('path', { d: 'M50 30 Q41 35 35 44', stroke: 'currentColor', strokeWidth: '0.6', fill: 'none' }),
        React.createElement('path', { d: 'M50 48 Q40 54 33 63', stroke: 'currentColor', strokeWidth: '0.6', fill: 'none' }),
        React.createElement('path', { d: 'M50 30 Q59 35 65 44', stroke: 'currentColor', strokeWidth: '0.6', fill: 'none' }),
        React.createElement('path', { d: 'M50 48 Q60 54 67 63', stroke: 'currentColor', strokeWidth: '0.6', fill: 'none' }),
      )
    ),

    /* Header row: herb name + optional warning badge */
    React.createElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' },
    },
      React.createElement('div', { style: { flex: 1 } },
        React.createElement('h3', {
          style: {
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-primary)',
            lineHeight: 'var(--leading-tight)',
            margin: 0,
            letterSpacing: 'var(--tracking-display)',
          },
        }, herbName),
        latinName && React.createElement('p', {
          style: {
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-sm)',
            fontStyle: 'italic',
            color: 'var(--text-latin)',
            margin: '3px 0 0 0',
            lineHeight: 1.2,
          },
        }, latinName)
      ),
      hasWarning && React.createElement('span', {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'rgba(139,26,26,0.25)',
          border: '1px solid rgba(139,26,26,0.55)',
          fontSize: '13px',
          flexShrink: 0,
          marginTop: '2px',
        },
      }, '⚠')
    ),

    /* Summary text */
    summary && React.createElement('p', {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
        lineHeight: 'var(--leading-normal)',
        margin: '8px 0 0 0',
      },
    }, summary),

    /* Tags */
    tags.length > 0 && React.createElement('div', {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        marginTop: '10px',
      },
    }, tags.map((tag, i) =>
      React.createElement('span', {
        key: i,
        style: {
          padding: '3px 10px',
          borderRadius: 'var(--radius-pill)',
          background: 'rgba(122,158,122,0.15)',
          border: '1px solid rgba(122,158,122,0.30)',
          color: 'var(--color-sage-300)',
          fontSize: '0.68rem',
          fontFamily: 'var(--font-body)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
        },
      }, tag)
    ))
  );
}
