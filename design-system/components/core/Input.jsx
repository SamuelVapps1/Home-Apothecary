import React from 'react';

/**
 * Input — Dark-surface text input with amber focus ring.
 * Supports an optional left-side icon, label above, and helper hint below.
 */
export function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  leadingIcon,
  hint,
}) {
  const [focused, setFocused] = React.useState(false);

  return React.createElement('div', {
    style: { display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' },
  },
    label && React.createElement('label', {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--text-secondary)',
        letterSpacing: 'var(--tracking-widest)',
        textTransform: 'uppercase',
      },
    }, label),

    React.createElement('div', { style: { position: 'relative' } },
      leadingIcon && React.createElement('div', {
        style: {
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: focused ? 'var(--color-amber-500)' : 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
          transition: 'color 0.18s ease',
          fontSize: '16px',
        },
      }, leadingIcon),

      React.createElement('input', {
        type,
        value,
        onChange,
        placeholder,
        onFocus: () => setFocused(true),
        onBlur:  () => setFocused(false),
        style: {
          width: '100%',
          padding: leadingIcon ? '11px 14px 11px 40px' : '11px 14px',
          background: 'var(--bg-input)',
          border: `1px solid ${focused ? 'var(--border-input-focus)' : 'var(--border-input)'}`,
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          outline: 'none',
          boxShadow: focused
            ? 'var(--shadow-amber-focus)'
            : 'var(--shadow-inner)',
          transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
          boxSizing: 'border-box',
        },
      })
    ),

    hint && React.createElement('p', {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-muted)',
        margin: 0,
        fontStyle: 'italic',
        lineHeight: 'var(--leading-normal)',
      },
    }, hint)
  );
}
