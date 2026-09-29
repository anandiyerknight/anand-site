import Image from "next/image";
import Link from "next/link";
import type { NewsletterIssue } from "@/lib/newsletters";

export function NewsletterLibrary({ issues }: { issues: NewsletterIssue[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {issues.map((issue) => (
        <Link
          key={issue.slug}
          href={`/newsletters/${issue.slug}`}
          className="group glass flex flex-col overflow-hidden border border-[var(--color-rule)] hover:border-[var(--color-cyan)] transition-colors duration-300"
        >
          <div className="relative aspect-[1200/675] bg-[var(--color-bg-2)] border-b border-[var(--color-rule)]">
            <Image
              src={`/newsletters/${issue.slug}.png`}
              alt={issue.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col flex-1 p-5 md:p-6">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
              Issue {issue.num} / {issues.length}
            </div>
            <h3 className="mt-2 font-display text-xl md:text-2xl leading-tight">{issue.title}</h3>
            <p className="mt-3 text-sm text-[var(--color-ink-2)] leading-relaxed flex-1">{issue.blurb}</p>
            <span className="mt-5 inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-ink)] group-hover:text-[var(--color-cyan)] transition-colors">
              Read issue <span aria-hidden>→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
