"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./reveal";
import { WorkLightbox, type LightboxData } from "./work-lightbox";
import { hasCaseStudy, type WorkItem, type WorkType } from "@/lib/work";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";
import { useGatedDownload, GateModal } from "./ui/lead-form";
import { EASE } from "@/lib/motion";

type FilterKey = WorkType | "all";
const FILTER_DEFS: { key: WorkType; label: string }[] = [
  { key: "landing-page", label: "Landing Pages" },
  { key: "carousel", label: "Carousels" },
  { key: "guide", label: "Guides" },
];

function caseById(id?: string): CaseStudy | null {
  if (!id) return null;
  return caseStudies.find((c) => c.id === id) ?? null;
}

export function WorkShowcase({ items }: { items: WorkItem[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [lightbox, setLightbox] = useState<LightboxData | null>(null);
  const [caseActive, setCaseActive] = useState<CaseStudy | null>(null);

  // Gated-download flow — shared LeadForm module (same nl_lead gate as /newsletters)
  const gate = useGatedDownload("/api/work-download");

  const sorted = useMemo(
    () => [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    [items]
  );

  const visible = useMemo(() => {
    if (filter === "all") return sorted;
    if (filter === "case-study") return sorted.filter(hasCaseStudy);
    return sorted.filter((w) => w.type === filter);
  }, [sorted, filter]);

  // Only show tabs for the content types actually present.
  const tabs = useMemo<{ key: FilterKey; label: string }[]>(() => {
    const present = new Set(items.map((w) => w.type));
    const list: { key: FilterKey; label: string }[] = [{ key: "all", label: "All" }];
    for (const f of FILTER_DEFS) if (present.has(f.key)) list.push(f);
    if (items.some(hasCaseStudy)) list.push({ key: "case-study", label: "Case Studies" });
    return list;
  }, [items]);

  function onDownloadClick(item: WorkItem) {
    if (!item.pdf) return;
    gate.request({
      slug: item.slug,
      title: item.title,
      tag: item.category,
      fallbackPdf: item.pdf,
    });
  }

  return (
    <>
      {/* Filter tabs */}
      {tabs.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`font-mono text-[11px] tracking-[0.18em] uppercase px-4 py-2 rounded-sm border transition-colors ${
                filter === f.key
                  ? "bg-[var(--color-accent)] text-black border-[var(--color-accent)]"
                  : "border-[var(--color-rule)] text-[var(--color-ink-2)] hover:border-[var(--color-ink-2)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {visible.map((item, idx) => {
          const linkedCase = caseById(item.caseStudyId);
          const cardCase = item.type === "case-study" ? caseById(item.caseStudyId) : null;
          return (
            <Reveal key={item.slug} delay={(idx % 3) * 0.06}>
              <div className="flex flex-col overflow-hidden h-full rounded-3xl bg-[var(--color-bg-2)] ring-1 ring-[var(--color-rule)] hover:ring-[var(--color-mute)] transition-shadow duration-300">
                {/* Visual area */}
                {item.type === "carousel" && item.gallery?.length ? (
                  <button
                    type="button"
                    onClick={() => setLightbox({ title: item.title, images: item.gallery! })}
                    className="relative aspect-[1200/675] bg-[var(--color-bg-2)] border-b border-[var(--color-rule)] group"
                  >
                    <Image
                      src={item.gallery[0]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        View {item.gallery.length} slides →
                      </span>
                    </span>
                  </button>
                ) : item.cover ? (
                  <div className="relative aspect-[1200/675] bg-[var(--color-bg-2)] border-b border-[var(--color-rule)]">
                    <Image
                      src={item.cover}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  </div>
                ) : item.type === "guide" ? (
                  <div
                    className="relative aspect-[1200/675] border-b border-[var(--color-rule)] flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${item.brandColor}22, var(--color-bg-2))` }}
                  >
                    <span className="font-display italic text-3xl text-[var(--color-ink-2)]">PDF</span>
                  </div>
                ) : cardCase ? (
                  <div className="relative aspect-[1200/675] bg-[var(--color-bg-2)] border-b border-[var(--color-rule)] flex flex-col justify-center p-6">
                    <div className="grid grid-cols-2 gap-3">
                      {cardCase.metrics.slice(0, 4).map((m) => (
                        <div key={m.label}>
                          <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
                            {m.label}
                          </div>
                          <div className="font-display italic text-xl grad-text">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 md:p-6">
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                    {item.category}
                  </div>
                  <h3 className="mt-2 font-display text-xl md:text-2xl leading-tight">{item.title}</h3>
                  <p className="mt-3 text-sm text-[var(--color-ink-2)] leading-relaxed flex-1">{item.blurb}</p>

                  {/* Actions */}
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {item.type === "landing-page" && item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary !py-2.5 !px-4 !text-[10px]"
                      >
                        <span>Visit live</span>
                        <span aria-hidden>↗</span>
                      </a>
                    )}

                    {item.type === "carousel" && (
                      <button
                        type="button"
                        onClick={() => setLightbox({ title: item.title, images: item.gallery ?? [] })}
                        className="btn-primary !py-2.5 !px-4 !text-[10px]"
                      >
                        <span>View carousel</span>
                        <span aria-hidden>→</span>
                      </button>
                    )}

                    {item.type === "guide" && (
                      <button
                        type="button"
                        onClick={() => onDownloadClick(item)}
                        disabled={gate.busySlug === item.slug}
                        className="btn-primary !py-2.5 !px-4 !text-[10px] disabled:opacity-60"
                      >
                        <span>{gate.busySlug === item.slug ? "Preparing…" : "Download"}</span>
                        <span aria-hidden>↓</span>
                      </button>
                    )}

                    {item.type === "case-study" && cardCase && (
                      <button
                        type="button"
                        onClick={() => setCaseActive(cardCase)}
                        className="btn-primary !py-2.5 !px-4 !text-[10px]"
                      >
                        <span>Read case</span>
                        <span aria-hidden>→</span>
                      </button>
                    )}

                    {item.type !== "case-study" && linkedCase && (
                      <button
                        type="button"
                        onClick={() => setCaseActive(linkedCase)}
                        className="btn-ghost !py-2.5 !px-4 !text-[10px]"
                      >
                        <span>Case study</span>
                        <span aria-hidden>→</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Carousel lightbox */}
      <WorkLightbox data={lightbox} onClose={() => setLightbox(null)} />

      {/* Gated download form — shared module */}
      <GateModal gate={gate} />

      {/* Case study modal (reuses lib/case-studies.ts) */}
      <AnimatePresence>
        {caseActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-[rgba(2,2,6,0.92)] backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setCaseActive(null)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl glass p-8 md:p-12 max-h-[88vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8 font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                <span>{caseActive.category}</span>
                <button onClick={() => setCaseActive(null)} className="hover:text-[var(--color-accent)]">
                  Close [esc] ✕
                </button>
              </div>
              <h3 className="font-display italic text-5xl md:text-7xl leading-none">{caseActive.brand}</h3>
              <p className="mt-6 text-xl text-[var(--color-ink-2)]">{caseActive.headline}</p>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {caseActive.metrics.map((m) => (
                  <div key={m.label} className="border-l border-[var(--color-rule-2)] pl-3">
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent)]">
                      {m.label}
                    </div>
                    <div className="font-display italic text-xl md:text-2xl mt-1">{m.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-4">
                {caseActive.body.map((p, i) => (
                  <p key={i} className="text-[var(--color-ink-2)] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
