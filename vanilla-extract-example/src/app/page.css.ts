import { style } from '@vanilla-extract/css';

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6rem',
  minHeight: '100vh',
});

export const description = style({
  display: 'inherit',
  justifyContent: 'inherit',
  alignItems: 'inherit',
  fontSize: '0.85rem',
  maxWidth: 'var(--max-width)',
  width: '100%',
  zIndex: 2,
  fontFamily: 'var(--font-mono)',
});

export const linkInDescription = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',

  '@media': {
    '(max-width: 700px)': {
      padding: '1rem',
    },
  },
});

export const paragraphInDescription = style({
  position: 'relative',
  margin: 0,
  padding: '1rem',
  backgroundColor: 'rgba(var(--callout-rgb), 0.5)',
  border: '1px solid rgba(var(--callout-border-rgb), 0.3)',
  borderRadius: 'var(--borderRadius)',

  '@media': {
    '(max-width: 700px)': {
      display: 'flex',
      justifyContent: 'center',
      position: 'fixed',
      width: '100%',

      alignItems: 'center',
      inset: '0 0 auto',
      padding: '2rem 1rem 1.4rem',
      borderRadius: 0,
      border: 'none',
      borderBottom: '1px solid rgba(var(--callout-border-rgb), 0.25)',
      background:
        'linear-gradient(to bottom, rgba(var(--background-start-rgb), 1), rgba(var(--callout-rgb), 0.5))',
      backgroundClip: 'padding-box',
      backdropFilter: ' blur(24px)',
    },
  },
});

export const divisionInDescription = style({
  '@media': {
    '(max-width: 700px)': {
      alignItems: 'flex-end',
      pointerEvents: 'none',
      inset: 'auto 0 0',
      padding: '2rem',
      height: '200px',
      background:
        'linear-gradient(to bottom, transparent 0%, rgb(var(--background-end-rgb)) 40%)',
      zIndex: 1,
    },
  },
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(25%, auto))',
  maxWidth: '100%',
  width: 'var(--max-width)',
  '@media': {
    '(min-width: 701px) and (max-width: 1120px)': {
      gridTemplateColumns: 'repeat(2, 50%)',
    },
    '(max-width: 700px)': {
      gridTemplateColumns: '1fr',
      marginBottom: '120px',
      maxWidth: '320px',
      textAlign: 'center',
    },
  },
});

export const code = style({
  fontWeight: 700,
  fontFamily: 'var(--font-mono)',
});

export const card = style({
  padding: '1rem 1.2rem',
  borderRadius: 'var(--borderRadius)',
  background: 'rgba(var(--card-rgb), 0)',
  border: '1px solid rgba(var(--card-border-rgb), 0)',
  transition: `background 200ms, border 200ms`,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        background: 'rgba(var(--card-rgb), 0.1)',
        border: '1px solid rgba(var(--card-border-rgb), 0.15)',
      },
    },

    '(max-width: 700px)': {
      padding: '1rem 2.5rem',
    },
  },
});

export const cardSpan = style({
  display: 'inline-block',
  transition: 'transform 200ms',
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        [`${card}:hover &`]: {
          transform: 'translateX(4px)',
        },
      },
    },

    '(prefers-reduced-motion)': {
      selectors: {
        [`${card}:hover &`]: {
          transform: 'none',
        },
      },
    },
  },
});

export const cardH2 = style({
  fontWeight: 600,
  marginBottom: '0.7rem',
  '@media': {
    '(max-width: 700px)': {
      marginBottom: '0.5rem',
    },
  },
});

export const cardP = style({
  margin: 0,
  opacity: 0.6,
  fontSize: '0.9rem',
  lineHeight: 1.5,
  maxWidth: '30ch',
});

export const center = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  padding: '4rem 0',

  '::before': {
    background: 'var(--secondary-glow)',
    borderRadius: '50%',
    width: '480px',
    height: '360px',
    marginLeft: '-400px',
    content: '',
    left: '50%',
    position: 'absolute',
    filter: 'blur(45px)',
    transform: 'translateZ(0)',
  },
  '::after': {
    background: 'var(--primary-glow)',
    width: '240px',
    height: '180px',
    zIndex: -1,
    content: '',
    left: '50%',
    position: 'absolute',
    filter: 'blur(45px)',
    transform: 'translateZ(0)',
  },

  '@media': {
    '(max-width: 700px)': {
      padding: '8rem 0 6rem',

      '::before': {
        transform: 'none',
        height: '300px',
      },
    },
  },
});

export const logo = style({
  position: 'relative',
  '@media': {
    '(prefersColor-scheme: dark)': {
      filter: 'invert(1) drop-shadow(0 0 0.3rem #ffffff70)',
    },
  },
});

export const vercelLogo = style({
  '@media': {
    '(prefersColor-scheme: dark)': {
      filter: 'invert(1)',
    },
  },
});
