"use client";
/* eslint-disable @next/next/no-img-element */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { SystemAsset, SystemCategory, SystemStage } from "@/lib/system";
import type { LightboxData } from "./AssetLightbox";

function badge(a: SystemAsset): string | null {
  if (a.kind === "carousel") return `${(a.gallery ?? [a.src]).length} slides`;
  if (a.kind === "pdf") return "PDF ↗";
  if (a.kind === "site") return "Live ↗";
  if (a.kind === "diagram") return "Diagram";
  return null;
}

function Tile({ asset, onOpen }: { asset: SystemAsset; onOpen?: () => void }) {
  const tag = badge(asset);
  const inner = (
    <>
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[var(--color-rule)] bg-[#0a0a0a]">
        <img
          src={asset.src}
          alt={asset.caption}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {tag && (
          <span className="absolute top-2 left-2 font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--color-ink)] bg-[rgba(0,0,0,0.6)] backdrop-blur px-2 py-1 rounded">
            {tag}
          </span>
        )}
      </div>
      <div className="mt-2 text-[12px] text-[var(--color-ink-2)] leading-snug">{asset.caption}</div>
    </>
  );

  if (asset.kind === "pdf" || asset.kind === "site") {
    return (
      <a href={asset.href} target="_blank" rel="noopener noreferrer" className="group block">
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onOpen} className="group block text-left w-full">
      {inner}
    </button>
  );
}

function CategoryRow({
  category,
  open,
  onToggle,
  onOpenAsset,
}: {
  category: SystemCategory;
  open: boolean;
  onToggle: () => void;
  onOpenAsset: (d: LightboxData) => void;
}) {
  const imageSrcs = category.assets.filter((a) => a.kind === "image").map((a) => a.src);

  const openAsset = (a: SystemAsset) => {
    if (a.kind === "image") {
      onOpenAsset({
        title: category.name,
        images: imageSrcs,
        start: Math.max(0, imageSrcs.indexOf(a.src)),
      });
    } else {
      onOpenAsset({ title: a.caption, images: a.gallery ?? [a.src], start: 0 });
    }
  };

  return (
    <div className="border-t border-[var(--color-rule)]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
      >
        <span className="flex items-baseline gap-3 min-w-0">
          <span className="font-display text-[15px] md:text-base font-semibold tracking-tight">
            {category.name}
          </span>
          <span className="hidden sm:inline text-[12px] text-[var(--color-mute)] truncate">
            {category.blurb}
          </span>
        </span>
        <span className="font-mono text-[11px] text-[var(--color-mute)] shrink-0 group-hover:text-[var(--color-ink)] transition-colors">
          {open ? "− close" : `${category.assets.length} →`}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pb-6 pt-1">
              {category.assets.map((a, idx) => (
                <Tile key={a.src + idx} asset={a} onOpen={() => openAsset(a)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function StagePanel({
  stage,
  onOpenAsset,
}: {
  stage: SystemStage;
  onOpenAsset: (d: LightboxData) => void;
}) {
  const [open, setOpen] = useState<string | null>(stage.categories[0]?.id ?? null);

  // When the active stage changes, reset to its first category.
  useEffect(() => {
    setOpen(stage.categories[0]?.id ?? null);
  }, [stage.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      key={stage.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 rounded-2xl border border-[var(--color-rule)] bg-[var(--color-bg-2)] p-5 md:p-8"
    >
      {/* header */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[12px] text-[var(--color-mute)]">{stage.num}</span>
        <h2 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
          {stage.name}
        </h2>
      </div>

      {/* how we do it / how it works */}
      <div className="mt-6 grid md:grid-cols-2 gap-6 md:gap-10">
        <div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
            How we do it
          </div>
          <ol className="mt-3 space-y-3">
            {stage.howWeDoIt.map((step, i) => (
              <li key={i} className="flex gap-3 text-[14px] text-[var(--color-ink-2)] leading-snug">
                <span className="font-mono text-[11px] text-[var(--color-mute)] pt-0.5">
                  0{i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
            How it works
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {stage.howItWorks.map((x) => (
              <span
                key={x}
                className="border border-[var(--color-rule)] rounded-full px-3 py-1.5 text-[13px] text-[var(--color-ink-2)] bg-[#0a0a0a]"
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* how it looks — categories that open into galleries */}
      <div className="mt-9">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] mb-1">
          How it looks
        </div>
        {stage.categories.map((c) => (
          <CategoryRow
            key={c.id}
            category={c}
            open={open === c.id}
            onToggle={() => setOpen((p) => (p === c.id ? null : c.id))}
            onOpenAsset={onOpenAsset}
          />
        ))}
      </div>

      {/* feeds footer */}
      <div className="mt-6 pt-5 border-t border-[var(--color-rule)] font-mono text-[11px] tracking-[0.06em] uppercase text-[var(--color-mute)]">
        Feeds → <span className="text-[var(--color-ink)]">{stage.feeds}</span>
      </div>
    </motion.div>
  );
}
