/* @ds-bundle: {"format":3,"namespace":"HomeApothecary_b68f09","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"BottomNav","sourcePath":"components/core/BottomNav.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"RemedyCard","sourcePath":"components/core/RemedyCard.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"a2dbd0119da6","components/core/BottomNav.jsx":"636e3cf987c4","components/core/Button.jsx":"17bb901ed1fb","components/core/Input.jsx":"504066f46433","components/core/RemedyCard.jsx":"39f81838938d","components/core/Tag.jsx":"28f04d013457"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HomeApothecary_b68f09 = window.HomeApothecary_b68f09 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/**
 * Badge — Small inline status/category indicator pill.
 * Use for category labels on remedy cards and status chips inline with text.
 */
function Badge({
  children,
  variant = 'amber'
}) {
  const variants = {
    amber: {
      background: 'rgba(201,151,58,0.17)',
      color: 'var(--color-amber-400)',
      border: '1px solid rgba(201,151,58,0.35)'
    },
    sage: {
      background: 'rgba(122,158,122,0.17)',
      color: 'var(--color-sage-300)',
      border: '1px solid rgba(122,158,122,0.35)'
    },
    safety: {
      background: 'var(--color-burgundy-500)',
      color: 'var(--color-parchment-100)',
      border: '1px solid var(--color-burgundy-400)'
    },
    neutral: {
      background: 'rgba(240,232,208,0.08)',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-subtle)'
    }
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
      ...(variants[variant] || variants.amber)
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/BottomNav.jsx
try { (() => {
/**
 * BottomNav — Fixed mobile bottom navigation bar.
 * Dark surface with amber active-item indicator (top border + colored icon/label).
 * Minimum touch target: 64px bar height with icons at 22px.
 */
function BottomNav({
  items = [],
  activeIndex = 0,
  onItemClick
}) {
  return React.createElement('nav', {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      background: 'var(--bg-bottom-nav)',
      borderTop: '1px solid var(--border-subtle)',
      height: '64px',
      width: '100%',
      flexShrink: 0
    }
  }, items.map((item, i) => {
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
        outline: 'none'
      }
    }, React.createElement('span', {
      style: {
        fontSize: '20px',
        color: isActive ? 'var(--color-amber-500)' : 'var(--text-muted)',
        lineHeight: 1,
        transition: 'color 0.18s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, item.icon), React.createElement('span', {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: '0.58rem',
        color: isActive ? 'var(--color-amber-400)' : 'var(--text-muted)',
        letterSpacing: 'var(--tracking-wider)',
        textTransform: 'uppercase',
        transition: 'color 0.18s ease',
        lineHeight: 1.2
      }
    }, item.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/**
 * Button — Primary interactive element for Home Apothecary.
 * Vintage apothecary style: uppercase tracked labels, amber primary,
 * ghost and danger variants for secondary actions and safety CTAs.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  fullWidth = false,
  type = 'button'
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
    userSelect: 'none'
  };
  const sizes = {
    sm: {
      padding: '6px 14px',
      fontSize: '0.68rem',
      borderRadius: 'var(--radius-sm)'
    },
    md: {
      padding: '10px 22px',
      fontSize: '0.74rem',
      borderRadius: 'var(--radius-md)'
    },
    lg: {
      padding: '13px 28px',
      fontSize: '0.82rem',
      borderRadius: 'var(--radius-md)'
    }
  };
  const variants = {
    primary: {
      background: hovered ? 'var(--color-amber-400)' : 'var(--color-amber-500)',
      color: 'var(--text-on-amber)',
      border: '1px solid var(--color-amber-600)',
      boxShadow: hovered ? '0 2px 10px rgba(201,151,58,0.35)' : 'none'
    },
    secondary: {
      background: hovered ? 'rgba(201,151,58,0.10)' : 'transparent',
      color: 'var(--color-amber-400)',
      border: '1px solid var(--color-amber-500)',
      boxShadow: 'none'
    },
    ghost: {
      background: hovered ? 'rgba(240,232,208,0.07)' : 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'none'
    },
    danger: {
      background: hovered ? 'var(--color-burgundy-400)' : 'var(--color-burgundy-500)',
      color: 'var(--text-safety)',
      border: '1px solid var(--color-burgundy-600)',
      boxShadow: 'none'
    }
  };
  const style = {
    ...base,
    ...(sizes[size] || sizes.md),
    ...(variants[variant] || variants.primary)
  };
  return React.createElement('button', {
    type,
    style,
    disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => !disabled && setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => !disabled && setPressed(true),
    onMouseUp: () => setPressed(false)
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
/**
 * Input — Dark-surface text input with amber focus ring.
 * Supports an optional left-side icon, label above, and helper hint below.
 */
function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  leadingIcon,
  hint
}) {
  const [focused, setFocused] = React.useState(false);
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%'
    }
  }, label && React.createElement('label', {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--font-weight-medium)',
      color: 'var(--text-secondary)',
      letterSpacing: 'var(--tracking-widest)',
      textTransform: 'uppercase'
    }
  }, label), React.createElement('div', {
    style: {
      position: 'relative'
    }
  }, leadingIcon && React.createElement('div', {
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
      fontSize: '16px'
    }
  }, leadingIcon), React.createElement('input', {
    type,
    value,
    onChange,
    placeholder,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
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
      boxShadow: focused ? 'var(--shadow-amber-focus)' : 'var(--shadow-inner)',
      transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
      boxSizing: 'border-box'
    }
  })), hint && React.createElement('p', {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      margin: 0,
      fontStyle: 'italic',
      lineHeight: 'var(--leading-normal)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/RemedyCard.jsx
try { (() => {
/**
 * RemedyCard — Card displaying a single herb or remedy in a list.
 *
 * Dark surface with the signature 2px amber top border.
 * Shows herb name (large cream serif), Latin name (italic amber),
 * a short summary, sage-colored category tags, and an optional
 * amber warning badge for herbs with strong contraindications.
 * A subtle botanical leaf watermark appears in the lower-right corner.
 */
function RemedyCard({
  herbName,
  latinName,
  summary,
  tags = [],
  hasWarning = false,
  onClick
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
      overflow: 'hidden'
    }
  }, /* Botanical leaf watermark */
  React.createElement('div', {
    style: {
      position: 'absolute',
      bottom: '-6px',
      right: '-2px',
      width: '72px',
      height: '88px',
      opacity: 0.065,
      pointerEvents: 'none',
      color: 'var(--color-parchment-100)'
    }
  }, React.createElement('svg', {
    viewBox: '0 0 100 122',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement('path', {
    d: 'M50 8 C69 18 84 43 80 69 C76 93 62 110 50 114 C38 110 24 93 20 69 C16 43 31 18 50 8Z',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    fill: 'none'
  }), React.createElement('line', {
    x1: '50',
    y1: '12',
    x2: '50',
    y2: '110',
    stroke: 'currentColor',
    strokeWidth: '0.9'
  }), React.createElement('path', {
    d: 'M50 30 Q41 35 35 44',
    stroke: 'currentColor',
    strokeWidth: '0.6',
    fill: 'none'
  }), React.createElement('path', {
    d: 'M50 48 Q40 54 33 63',
    stroke: 'currentColor',
    strokeWidth: '0.6',
    fill: 'none'
  }), React.createElement('path', {
    d: 'M50 30 Q59 35 65 44',
    stroke: 'currentColor',
    strokeWidth: '0.6',
    fill: 'none'
  }), React.createElement('path', {
    d: 'M50 48 Q60 54 67 63',
    stroke: 'currentColor',
    strokeWidth: '0.6',
    fill: 'none'
  }))), /* Header row: herb name + optional warning badge */
  React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '8px'
    }
  }, React.createElement('div', {
    style: {
      flex: 1
    }
  }, React.createElement('h3', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--text-primary)',
      lineHeight: 'var(--leading-tight)',
      margin: 0,
      letterSpacing: 'var(--tracking-display)'
    }
  }, herbName), latinName && React.createElement('p', {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-sm)',
      fontStyle: 'italic',
      color: 'var(--text-latin)',
      margin: '3px 0 0 0',
      lineHeight: 1.2
    }
  }, latinName)), hasWarning && React.createElement('span', {
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
      marginTop: '2px'
    }
  }, '⚠')), /* Summary text */
  summary && React.createElement('p', {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      lineHeight: 'var(--leading-normal)',
      margin: '8px 0 0 0'
    }
  }, summary), /* Tags */
  tags.length > 0 && React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginTop: '10px'
    }
  }, tags.map((tag, i) => React.createElement('span', {
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
      textTransform: 'uppercase'
    }
  }, tag))));
}
Object.assign(__ds_scope, { RemedyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/RemedyCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
/**
 * Tag — Filter chip / pill button for category browsing.
 * Used in horizontal-scrolling filter rows on the Browse screen.
 * Active state: amber border + tinted background.
 */
function Tag({
  children,
  active = false,
  onClick
}) {
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
      border: `1px solid ${active ? 'var(--color-amber-500)' : hovered ? 'rgba(240,232,208,0.28)' : 'var(--border-subtle)'}`,
      background: active ? 'rgba(201,151,58,0.14)' : hovered ? 'rgba(240,232,208,0.05)' : 'transparent',
      color: active ? 'var(--color-amber-400)' : hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
      fontSize: '0.75rem',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--font-weight-medium)',
      letterSpacing: 'var(--tracking-wide)',
      cursor: 'pointer',
      transition: 'all 0.18s ease',
      whiteSpace: 'nowrap',
      outline: 'none',
      userSelect: 'none'
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.RemedyCard = __ds_scope.RemedyCard;

__ds_ns.Tag = __ds_scope.Tag;

})();
