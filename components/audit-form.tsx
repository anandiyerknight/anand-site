"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";

type State = "idle" | "submitting" | "ok" | "err";

export function AuditForm() {
  const [state, setState] = useState<State>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setState(res.ok ? "ok" : "err");
    } catch {
      setState("err");
    }
  };

  return (
    <section id="audit" className="relative py-20 md:py-32 px-6 md:px-10 border-t border-[var(--color-rule)] bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg-2)] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        <div className="md:col-span-5 flex flex-col justify-center">

          <Reveal>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
              Not everyone
              <br />
              <span className="italic">qualifies.</span>
            </h2>
          </Reveal>
          <p className="mt-8 text-[var(--color-ink-2)] text-lg leading-relaxed max-w-md">
            Currently accepting 2 new systems builds for Q3 2026.
          </p>
          <div className="mt-12 space-y-3 font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-cyan)]">▸</span>
              10x speed compounds
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-cyan)]">▸</span>
              Systems compound leverage
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--color-cyan)]">▸</span>
              Decisions in days
            </div>
          </div>
          <p className="mt-12 text-sm text-[var(--color-mute)] italic">
            If you're still evaluating, this isn't for you.
          </p>
        </div>

        <div className="md:col-span-7">
          <Reveal>
            <div className="glass p-6 md:p-10 bg-gradient-to-br from-white/8 to-white/3 border-2 border-white/20 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-8 font-mono text-[10px] tracking-[0.22em] uppercase">
                <span className="flex items-center gap-2 text-[var(--color-cyan)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-pulse" />
                  systems_intake.exec()
                </span>
                <span className="text-[var(--color-mute)]">Q3 2026 · 2 of 4 slots</span>
              </div>

              <AnimatePresence mode="wait">
                {state === "ok" ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full border-2 border-[var(--color-cyan)] flex items-center justify-center text-[var(--color-cyan)] text-2xl">
                      ✓
                    </div>
                    <div className="mt-6 font-display italic text-3xl">Brief received.</div>
                    <p className="mt-3 text-[var(--color-ink-2)]">
                      We review every submission within 48 hours. Watch your inbox.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-7"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="field">
                        <label htmlFor="name">▸ Name</label>
                        <input id="name" name="name" required placeholder="Your name" />
                      </div>
                      <div className="field">
                        <label htmlFor="email">▸ Email</label>
                        <input
                          id="email"
                          name="email"
                          required
                          type="email"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="field">
                        <label htmlFor="company">▸ Company</label>
                        <input id="company" name="company" required placeholder="Brand / venture" />
                      </div>
                      <div className="field">
                        <label htmlFor="stage">▸ Stage</label>
                        <input
                          id="stage"
                          name="stage"
                          placeholder="Pre-seed · Seed · Series A · Profitable"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="brief">▸ The Brief</label>
                      <textarea
                        id="brief"
                        name="brief"
                        required
                        rows={5}
                        placeholder="What should the system do? What's broken? What's the deadline?"
                      />
                    </div>

                    <div className="flex flex-col gap-4 pt-6">
                      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                        // We never share. Briefs are confidential.
                      </div>
                      <Magnetic strength={0.2}>
                        <button
                          type="submit"
                          className="w-full md:w-auto btn-primary px-8 py-3 text-base md:text-sm font-semibold shadow-xl hover:shadow-2xl active:scale-95"
                          disabled={state === "submitting"}
                        >
                          {state === "submitting" ? "Applying…" : "Apply to Work Together"}
                          <span aria-hidden>{state === "submitting" ? "·" : "→"}</span>
                        </button>
                      </Magnetic>
                    </div>
                    {state === "err" && (
                      <p className="font-mono text-xs text-[var(--color-magenta)]">
                        // Transmission failed — try again, or email iyeranand91@gmail.com
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
