import React from 'react';

/**
 * Button — Primary interactive element for Home Apothecary.
 * Vintage apothecary style: uppercase tracked labels, amber primary,
 * ghost and danger variants for secondary actions and safety CTAs.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  fullWidth = false,
  type = 'button',
}) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'background 0.18s ease, box-shadow 0.18s ease, transform 0.12s ease, border-color 0.18s ease',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--font-weight-medium)',
    letterSpacing: 'var(--tracking-widest)',
    textTransform: 'uppercase',
    width: fullWidth ? '100%' : 'auto',
    outline: 'none',
    transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
    textDecoration: 'none',
    userSelect: 'none',
  };

  const sizes = {
    sm: { padding: '6px 14px',  fontSize: '0.68rem', borderRadius: 'var(--radius-sm)' },
    md: { padding: '10px 22px', fontSize: '0.74rem', borderRadius: 'var(--radius-md)' },
    lg: { padding: '13px 28px', fontSize: '0.82rem', borderRadius: 'var(--radius-md)' },
  };

  const variants = {
    primary: {
      background: hovered ? 'var(--color-amber-400)' : 'var(--color-amber-500)',
      color: 'var(--text-on-amber)',
      border: '1px solid var(--color-amber-600)',
      boxShadow: hovered ? '0 2px 10px rgba(201,151,58,0.35)' : 'none',
    },
    secondary: {
      background: hovered ? 'rgba(201,151,58,0.10)' : 'transparent',
      color: 'var(--color-amber-400)',
      border: '1px solid var(--color-amber-500)',
      boxShadow: 'none',
    },
    ghost: {
      background: hovered ? 'rgba(240,232,208,0.07)' : 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'none',
    },
    danger: {
      background: hovered ? 'var(--color-burgundy-400)' : 'var(--color-burgundy-500)',
      color: 'var(--text-safety)',
      border: '1px solid var(--color-burgundy-600)',
      boxShadow: 'none',
    },
  };

  const style = {
    ...base,
    ...(sizes[size] || sizes.md),
    ...(variants[variant] || variants.primary),
  };

  return React.createElement('button', {
    type,
    style,
    disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => !disabled && setHovered(true),
    onMouseLeave: () => { setHovered(false); setPressed(false); },
    onMouseDown:  () => !disabled && setPressed(true),
    onMouseUp:    () => setPressed(false),
  }, children);
}
