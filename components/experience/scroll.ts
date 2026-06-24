// Scroll progress (0..1) read straight from the real window scroll.
// Lenis scrolls the real window, so this stays correct under smooth scroll
// and is also settable via window.scrollTo for screenshot capture.
export function getScrollProgress(): number {
  if (typeof window === "undefined") return 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

export function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

export function smoothstep(x: number): number {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
}

// normalized progress within a [a,b] sub-range of the page
export function band(p: number, a: number, b: number): number {
  return clamp01((p - a) / (b - a));
}
