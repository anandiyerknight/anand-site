import { type ReactNode } from "react";
import { Reveal } from "../reveal";

/**
 * SectionHead — the one heading block for every section.
 * Layouts:
 *  - default:  tag / title / description stacked
 *  - split:    title left, description right on a 12-col grid (asymmetric)
 *  - indexed:  numbered eyebrow ("01 — Tag") for serialized sections
 * `right` renders a slot (e.g. a CTA) aligned to the heading baseline.
 */
type SectionHeadProps = {
  tag?: ReactNode;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  layout?: "default" | "split" | "indexed";
  size?: "md" | "lg";
  right?: ReactNode;
  className?: string;
};

const TITLE_SIZE = {
  md: "font-display text-[clamp(1.8rem,5vw,4rem)] leading-[1] tracking-tight",
  lg: "font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.95] tracking-tight",
};

function Tag({ tag, index }: { tag?: ReactNode; index?: string }) {
  if (!tag && !index) return null;
  return (
    <p className="font-mono text-[10px] md:text-xs tracking-[0.22em] uppercase text-[var(--color-mute)] mb-4">
      {index && <span className="text-[var(--color-accent)] mr-3">{index}</span>}
      {tag}
    </p>
  );
}

export function SectionHead({
  tag,
  index,
  title,
  description,
  layout = "default",
  size = "md",
  right,
  className = "",
}: SectionHeadProps) {
  if (layout === "split") {
    return (
      <Reveal className={className}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-8 md:mb-14">
          <div className="lg:col-span-7">
            <Tag tag={tag} index={index} />
            <h2 className={TITLE_SIZE[size]}>{title}</h2>
          </div>
          {description && (
            <p className="lg:col-span-5 text-sm md:text-lg leading-relaxed text-[var(--color-ink-2)] lg:pt-9 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </Reveal>
    );
  }

  return (
    <div className={`mb-8 md:mb-14 ${right ? "flex flex-col md:flex-row md:items-end md:justify-between gap-6" : ""} ${className}`}>
      <div className={right ? "max-w-2xl" : "max-w-5xl"}>
        <Tag tag={tag} index={index} />
        <Reveal>
          <h2 className={TITLE_SIZE[size]}>{title}</h2>
        </Reveal>
        {description && (
          <p className="mt-3 md:mt-4 text-sm md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}
