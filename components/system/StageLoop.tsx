"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { SystemStage } from "@/lib/system";

type Wires = { w: number; h: number; paths: string[]; arc: string | null };

export function StageLoop({
  stages,
  active,
  onSelect,
}: {
  stages: SystemStage[];
  active: number;
  onSelect: (i: number) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [wires, setWires] = useState<Wires>({ w: 0, h: 0, paths: [], arc: null });

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.innerWidth < 780) {
      setWires({ w: 0, h: 0, paths: [], arc: null });
      return;
    }
    const lr = wrap.getBoundingClientRect();
    const cards = cardRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (cards.length < 4) return;
    const R = cards.map((c) => {
      const r = c.getBoundingClientRect();
      return {
        left: r.left - lr.left,
        right: r.right - lr.left,
        bottom: r.bottom - lr.top,
        cx: (r.left + r.right) / 2 - lr.left,
        cy: (r.top + r.bottom) / 2 - lr.top,
      };
    });
    const midY = R[0].cy;
    const paths: string[] = [];
    for (let i = 0; i < R.length - 1; i++) {
      paths.push(`M${R[i].right + 2},${midY} L${R[i + 1].left - 7},${midY}`);
    }
    const yBand = Math.max(...R.map((r) => r.bottom)) + 40;
    const last = R[R.length - 1];
    const arc = `M${last.cx},${last.bottom + 2} C${last.cx},${yBand} ${R[0].cx},${yBand} ${R[0].cx},${R[0].bottom + 6}`;
    setWires({ w: lr.width, h: lr.height, paths, arc });
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, stages]);

  useEffect(() => {
    const ro = new ResizeObserver(() => measure());
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <div ref={wrapRef} className="relative">
      {wires.arc && (
        <svg
          className="absolute inset-0 z-0 pointer-events-none"
          width={wires.w}
          height={wires.h}
          style={{ overflow: "visible" }}
        >
          <defs>
            <marker
              id="sysah"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="4.5"
              orient="auto"
            >
              <path d="M0,0 L8,4.5 L0,9 Z" fill="var(--color-ink)" />
            </marker>
          </defs>
          {wires.paths.map((d, i) => (
            <g key={i}>
              <path d={d} className="sys-wire-base" />
              <path d={d} className="sys-wire-flow" markerEnd="url(#sysah)" />
            </g>
          ))}
          <path d={wires.arc} className="sys-wire-base" />
          <path d={wires.arc} className="sys-wire-flow" markerEnd="url(#sysah)" />
        </svg>
      )}

      <div className="relative z-10 flex flex-col md:flex-row gap-0 md:gap-5 items-stretch">
        {stages.map((s, i) => {
          const on = active === i;
          return (
            <button
              key={s.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onClick={() => onSelect(i)}
              aria-pressed={on}
              className={`group relative flex-1 text-left rounded-2xl border p-4 md:p-5 mb-8 md:mb-0 transition-all duration-200 ${
                on
                  ? "border-[var(--color-ink)] bg-[#121212]"
                  : "border-[var(--color-rule)] bg-[var(--color-bg-2)] hover:border-[var(--color-rule-2)] hover:-translate-y-0.5"
              }`}
            >
              <span
                className={`font-mono text-[11px] inline-flex items-center justify-center w-8 h-6 rounded-md border ${
                  on
                    ? "bg-[var(--color-ink)] text-[var(--color-bg)] border-[var(--color-ink)]"
                    : "text-[var(--color-mute)] border-[var(--color-rule)]"
                }`}
              >
                {s.num}
              </span>
              <span
                className={`absolute top-4 right-4 text-lg leading-none transition-transform duration-200 ${
                  on ? "rotate-45 text-[var(--color-ink)]" : "text-[var(--color-mute)]"
                }`}
                aria-hidden
              >
                +
              </span>
              <span className="block mt-3 font-display text-[15px] md:text-base font-semibold tracking-tight">
                {s.name}
              </span>
              <span className="block mt-1 text-[12px] text-[var(--color-mute)] leading-snug">
                {s.hint}
              </span>

              {i < stages.length - 1 && (
                <span
                  className="md:hidden absolute left-1/2 -bottom-6 -translate-x-1/2 text-[var(--color-mute)]"
                  aria-hidden
                >
                  ↓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* desktop: arc label sits in the band the feedback curve draws into */}
      <div className="relative z-10 hidden md:flex justify-center items-end" style={{ height: 84 }}>
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-mute)] bg-[var(--color-bg)] px-3">
          ↺ Every conversion sharpens the next cycle
        </span>
      </div>

      {/* mobile: simple loop-back pill */}
      <div className="md:hidden mt-1 flex justify-center">
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-mute)] border border-[var(--color-rule)] rounded-full px-3 py-2">
          ↺ loops back to Data Enrichment
        </span>
      </div>
    </div>
  );
}
