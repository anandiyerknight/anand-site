"use client";

import Image from "next/image";
import type { NewsletterIssue } from "@/lib/newsletters";
import { useGatedDownload, GateModal, type GateItem } from "./ui/lead-form";

function toGateItem(issue: NewsletterIssue): GateItem {
  return {
    slug: issue.slug,
    title: issue.title,
    tag: `Issue ${issue.num} / 20`,
    fallbackPdf: `/newsletters/${issue.slug}.pdf`,
  };
}

export function NewsletterLibrary({ issues }: { issues: NewsletterIssue[] }) {
  const gate = useGatedDownload("/api/newsletter");

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {issues.map((issue) => (
          <div
            key={issue.slug}
            className="glass flex flex-col overflow-hidden border border-[var(--color-rule)] hover:border-[var(--color-accent)] transition-colors duration-300"
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
                Issue {issue.num} / 20
              </div>
              <h3 className="mt-2 font-display text-xl md:text-2xl leading-tight">{issue.title}</h3>
              <p className="mt-3 text-sm text-[var(--color-ink-2)] leading-relaxed flex-1">{issue.blurb}</p>
              <button
                type="button"
                onClick={() => gate.request(toGateItem(issue))}
                disabled={gate.busySlug === issue.slug}
                className="btn-primary mt-5 !py-2.5 !px-4 !text-[10px] self-start disabled:opacity-60"
              >
                <span>{gate.busySlug === issue.slug ? "Preparing…" : "Download free"}</span>
                <span aria-hidden>↓</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <GateModal gate={gate} />
    </>
  );
}
