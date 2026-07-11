import { type ReactNode } from "react";

/**
 * PageHeader — the hero band of every secondary route (/work, /newsletters).
 */
export function PageHeader({
  tag,
  title,
  description,
  note,
}: {
  tag: ReactNode;
  title: ReactNode;
  description: ReactNode;
  note?: ReactNode;
}) {
  return (
    <section className="px-6 md:px-10 pt-32 md:pt-44 pb-10 md:pb-16 border-b border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
          {tag}
        </div>
        <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.95] tracking-tight max-w-4xl">
          {title}
        </h1>
        <p className="mt-6 md:mt-8 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed max-w-2xl">
          {description}
        </p>
        {note && (
          <p className="mt-4 text-xs md:text-sm text-[var(--color-mute)] italic max-w-2xl">{note}</p>
        )}
      </div>
    </section>
  );
}
