"use client";

import { useState } from "react";
import Image from "next/image";
import type { NewsletterIssue } from "@/lib/newsletters";

type Lead = { name: string; email: string; company: string };
const LS_KEY = "nl_lead";

function getStoredLead(): Lead | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Lead) : null;
  } catch {
    return null;
  }
}

function triggerDownload(pdf: string, title: string) {
  const a = document.createElement("a");
  a.href = pdf;
  a.download = `Anand Iyer - ${title}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function NewsletterLibrary({ issues }: { issues: NewsletterIssue[] }) {
  const [active, setActive] = useState<NewsletterIssue | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [busySlug, setBusySlug] = useState<string | null>(null);

  async function capture(lead: Lead, issue: NewsletterIssue) {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, slug: issue.slug }),
    });
    if (!res.ok) throw new Error("capture failed");
    return (await res.json()) as { ok: boolean; pdf: string; title: string };
  }

  async function onDownloadClick(issue: NewsletterIssue) {
    const stored = getStoredLead();
    if (stored) {
      // Already gave their info once — log this download and serve it directly.
      setBusySlug(issue.slug);
      try {
        const data = await capture(stored, issue);
        triggerDownload(data.pdf, data.title);
      } catch {
        triggerDownload(`/newsletters/${issue.slug}.pdf`, issue.title);
      } finally {
        setBusySlug(null);
      }
      return;
    }
    setActive(issue);
    setState("idle");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!active) return;
    const fd = new FormData(e.currentTarget);
    const lead: Lead = {
      name: (fd.get("name") || "").toString().trim(),
      email: (fd.get("email") || "").toString().trim(),
      company: (fd.get("company") || "").toString().trim(),
    };
    if (!lead.name || !lead.email) return;
    setState("sending");
    try {
      const data = await capture(lead, active);
      localStorage.setItem(LS_KEY, JSON.stringify(lead));
      triggerDownload(data.pdf, data.title);
      setState("done");
      setTimeout(() => setActive(null), 1600);
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {issues.map((issue) => (
          <div
            key={issue.slug}
            className="glass flex flex-col overflow-hidden border border-[var(--color-rule)] hover:border-[var(--color-cyan)] transition-colors duration-300"
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
                onClick={() => onDownloadClick(issue)}
                disabled={busySlug === issue.slug}
                className="btn-primary mt-5 !py-2.5 !px-4 !text-[10px] self-start disabled:opacity-60"
              >
                <span>{busySlug === issue.slug ? "Preparing…" : "Download free"}</span>
                <span aria-hidden>↓</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => state !== "sending" && setActive(null)}
        >
          <div
            className="glass w-full max-w-md p-6 md:p-8 border-2 border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {state === "done" ? (
              <div className="py-10 text-center">
                <div className="w-14 h-14 mx-auto rounded-full border-2 border-[var(--color-cyan)] flex items-center justify-center text-[var(--color-cyan)] text-2xl">
                  ✓
                </div>
                <div className="mt-5 font-display italic text-2xl">Your download is starting.</div>
                <p className="mt-2 text-sm text-[var(--color-ink-2)]">Check your downloads folder.</p>
              </div>
            ) : (
              <>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                  Issue {active.num} / 20
                </div>
                <h3 className="mt-2 font-display text-2xl leading-tight">{active.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-ink-2)]">
                  Free download. Tell me where to send your next one and it is yours.
                </p>
                <form onSubmit={onSubmit} className="mt-6 space-y-5">
                  <div className="field">
                    <label htmlFor="nl-name">Name</label>
                    <input id="nl-name" name="name" required placeholder="Your name" />
                  </div>
                  <div className="field">
                    <label htmlFor="nl-email">Email</label>
                    <input id="nl-email" name="email" required type="email" placeholder="you@company.com" />
                  </div>
                  <div className="field">
                    <label htmlFor="nl-company">Company (optional)</label>
                    <input id="nl-company" name="company" placeholder="Brand / venture" />
                  </div>
                  {state === "error" && (
                    <p className="font-mono text-[11px] text-[var(--color-magenta)]">
                      Something broke. Try again in a moment.
                    </p>
                  )}
                  <div className="flex items-center gap-4 pt-2">
                    <button type="submit" disabled={state === "sending"} className="btn-primary disabled:opacity-60">
                      <span>{state === "sending" ? "Sending…" : "Get the PDF"}</span>
                      <span aria-hidden>↓</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActive(null)}
                      className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)] hover:text-[var(--color-ink)] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
