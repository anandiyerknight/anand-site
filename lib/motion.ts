/**
 * Motion tokens for Framer Motion (which takes seconds, not CSS vars).
 * Mirrors the --duration-* / --ease-smooth tokens in app/globals.css @theme.
 * The design gate bans inline easing arrays outside this file.
 */
export const EASE = [0.22, 1, 0.36, 1] as const; // = --ease-smooth

export const DUR = {
  fast: 0.15, // = --duration-fast
  base: 0.3, // = --duration-base
  slow: 0.4, // = --duration-slow
  reveal: 0.9, // long entrance reveals (hero words, scroll-ins)
} as const;
