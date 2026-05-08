"use client";
import { useRef, type ReactNode, type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

/** Wrap content to get a CSS-driven cursor spotlight (paired with .glass-hover). */
export function Spotlight({ children, onMouseMove, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handle = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
    onMouseMove?.(e);
  };

  return (
    <div ref={ref} onMouseMove={handle} {...rest}>
      {children}
    </div>
  );
}
