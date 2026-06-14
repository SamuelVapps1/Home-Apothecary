import React from 'react';

/**
 * Badge — Small inline status/category indicator pill.
 * Use for category labels on remedy cards and status chips inline with text.
 */
export function Badge({ children, variant = 'amber' }) {
  const variants = {
    amber: {
      background: 'rgba(201,151,58,0.17)',
      color: 'var(--color-amber-400)',
      border: '1px solid rgba(201,151,58,0.35)',
    },
    sage: {
      background: 'rgba(122,158,122,0.17)',
      color: 'var(--color-sage-300)',
      border: '1px solid rgba(122,158,122,0.35)',
    },
    safety: {
      background: 'var(--color-burgundy-500)',
      color: 'var(--color-parchment-100)',
      border: '1px solid var(--color-burgundy-400)',
    },
    neutral: {
      background: 'rgba(240,232,208,0.08)',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-subtle)',
    },
  };

  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 9px',
      borderRadius: 'var(--radius-pill)',
      fontSize: '0.65rem',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--font-weight-medium)',
      letterSpacing: 'var(--tracking-widest)',
      textTransform: 'uppercase',
      lineHeight: 1.5,
      whiteSpace: 'nowrap',
      ...(variants[variant] || variants.amber),
    },
  }, children);
}
