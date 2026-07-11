import { type ReactNode } from "react";

/**
 * Section — the single wrapper for every full-width page band.
 * Owns the horizontal padding, vertical rhythm, top rule, and container width
 * so individual sections never restate them.
 */
type SectionProps = {
  id?: string;
  /** Vertical rhythm. tight=list pages · base=dense sections · large=landmark sections · xl=extra headroom */
  spacing?: "tight" | "base" | "large" | "xl";
  /** Top hairline rule (border-t). On by default — pass false for flush sections. */
  bordered?: boolean;
  /** Container width: default=max-w-7xl, narrow=max-w-5xl */
  width?: "default" | "narrow";
  /** Extra classes on the outer <section> (backgrounds, overflow) */
  className?: string;
  /** Extra classes on the inner container (e.g. a grid) */
  containerClassName?: string;
  children: ReactNode;
};

const SPACING: Record<NonNullable<SectionProps["spacing"]>, string> = {
  tight: "py-12 md:py-20",
  base: "py-12 md:py-28",
  large: "py-12 md:py-32",
  xl: "py-24 md:py-32",
};

export function Section({
  id,
  spacing = "large",
  bordered = true,
  width = "default",
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative ${SPACING[spacing]} px-6 md:px-10 ${
        bordered ? "border-t border-[var(--color-rule)]" : ""
      } ${className}`}
    >
      <div className={`${width === "narrow" ? "max-w-5xl" : "max-w-7xl"} mx-auto ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
