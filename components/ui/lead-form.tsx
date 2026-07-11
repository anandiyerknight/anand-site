"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Magnetic } from "../magnetic";

/**
 * LeadForm — the one lead-capture module behind every gate on the site.
 *
 * Two consumers:
 *  - <LeadForm type="audit" />                the inline audit panel (posts /api/audit)
 *  - useGatedDownload(endpoint) + <GateModal> the gated PDF flow shared by
 *    /newsletters and /work guides (posts /api/newsletter | /api/work-download)
 *
 * Shared invariants: the `nl_lead` localStorage gate (a returning lead never
 * sees the form twice), lead stored only after a successful capture, and the
 * three-state submit machine (idle → sending → done/error).
 */

type Lead = { name: string; email: string; company: string };
const LS_KEY = "nl_lead"; // shared across newsletter + work gates

export function getStoredLead(): Lead | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Lead) : null;
  } catch {
    return null;
  }
}

function storeLead(lead: Lead) {
  localStorage.setItem(LS_KEY, JSON.stringify(lead));
}

function triggerDownload(pdf: string, title: string) {
  const a = document.createElement("a");
  a.href = pdf;
  a.download = `Anand Iyer - ${title}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/* ============================= Gated downloads ============================= */

export type GateItem = {
  slug: string;
  title: string;
  /** mono eyebrow shown in the modal, e.g. "Issue 4 / 20" or the item category */
  tag: string;
  /** direct PDF path used if the capture endpoint fails — the lead still gets the file */
  fallbackPdf: string;
};

export function useGatedDownload(endpoint: string) {
  const [active, setActive] = useState<GateItem | null>(null);
  const [busySlug, setBusySlug] = useState<string | null>(null);

  async function capture(lead: Lead, item: GateItem) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, slug: item.slug }),
    });
    if (!res.ok) throw new Error("capture failed");
    return (await res.json()) as { ok: boolean; pdf: string; title: string };
  }

  /** Entry point for every download button. Returning leads skip the form. */
  async function request(item: GateItem) {
    const stored = getStoredLead();
    if (stored) {
      setBusySlug(item.slug);
      try {
        const data = await capture(stored, item);
        triggerDownload(data.pdf, data.title);
      } catch {
        triggerDownload(item.fallbackPdf, item.title);
      } finally {
        setBusySlug(null);
      }
      return;
    }
    setActive(item);
  }

  return { active, busySlug, request, capture, close: () => setActive(null) };
}

export function GateModal({ gate }: { gate: ReturnType<typeof useGatedDownload> }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const { active } = gate;
  if (!active) return null;

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
      const data = await gate.capture(lead, active);
      storeLead(lead);
      triggerDownload(data.pdf, data.title);
      setState("done");
      setTimeout(() => {
        gate.close();
        setState("idle");
      }, 1600);
    } catch {
      setState("error");
    }
  }

  function close() {
    if (state === "sending") return;
    gate.close();
    setState("idle");
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="glass w-full max-w-md p-6 md:p-8 border-2 border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {state === "done" ? (
          <div className="py-10 text-center">
            <div // @allow-circle: success badge
              className="w-14 h-14 mx-auto rounded-full border-2 border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)] text-2xl">
              ✓
            </div>
            <div className="mt-5 font-display italic text-2xl">Your download is starting.</div>
            <p className="mt-2 text-sm text-[var(--color-ink-2)]">Check your downloads folder.</p>
          </div>
        ) : (
          <>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
              {active.tag}
            </div>
            <h3 className="mt-2 font-display text-2xl leading-tight">{active.title}</h3>
            <p className="mt-2 text-sm text-[var(--color-ink-2)]">
              Free download. Tell me where to send it and it is yours.
            </p>
            <form onSubmit={onSubmit} className="mt-6 space-y-5">
              <div className="field">
                <label htmlFor="gate-name">Name</label>
                <input id="gate-name" name="name" required placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="gate-email">Email</label>
                <input id="gate-email" name="email" required type="email" placeholder="you@company.com" />
              </div>
              <div className="field">
                <label htmlFor="gate-company">Company (optional)</label>
                <input id="gate-company" name="company" placeholder="Brand / venture" />
              </div>
              {state === "error" && (
                <p className="font-mono text-[11px] text-[var(--color-accent)]">
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
                  onClick={close}
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
  );
}

/* ================================ Audit form ================================ */

type AuditState = "idle" | "submitting" | "ok" | "err";

const countryCodes = [
  { label: "🇮🇳 +91", code: "+91", country: "IN", digits: 10 },
  { label: "🇺🇸 +1", code: "+1", country: "US", digits: 10 },
  { label: "🇨🇦 +1", code: "+1", country: "CA", digits: 10 },
  { label: "🇸🇬 +65", code: "+65", country: "SG", digits: 8 },
  { label: "🇦🇪 +971", code: "+971", country: "AE", digits: 9 },
];

export function LeadForm({ type }: { type: "audit" }) {
  const [state, setState] = useState<AuditState>("idle");
  const [countryCode, setCountryCode] = useState(countryCodes[0]);
  const [phoneError, setPhoneError] = useState("");
  void type;

  const validatePhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length !== countryCode.digits) {
      setPhoneError(`Must be ${countryCode.digits} digits for ${countryCode.label}`);
      return false;
    }
    setPhoneError("");
    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const phone = fd.get("phone") as string;
    if (!validatePhone(phone)) return;

    setState("submitting");
    const payload = {
      ...Object.fromEntries(fd.entries()),
      phone: `${countryCode.code} ${phone}`,
    };
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
    <AnimatePresence mode="wait">
      {state === "ok" ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="py-16 text-center"
        >
          <div // @allow-circle: success badge
            className="w-16 h-16 mx-auto rounded-full border-2 border-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent)] text-2xl">
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
          className="space-y-6"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="field">
              <label htmlFor="name">▸ Name</label>
              <input id="name" name="name" required placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="email">▸ Email</label>
              <input id="email" name="email" required type="email" placeholder="you@company.com" />
            </div>
          </div>

          {/* Company + IG/Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="field">
              <label htmlFor="company">▸ Company</label>
              <input id="company" name="company" required placeholder="Brand / venture" />
            </div>
            <div className="field">
              <label htmlFor="social">▸ IG / Website</label>
              <input id="social" name="social" required placeholder="@handle or https://..." />
            </div>
          </div>

          {/* Phone with country code */}
          <div className="field">
            <label htmlFor="phone">▸ Phone</label>
            <div className="flex gap-0 border-b-2 border-[var(--color-rule-2)] focus-within:border-[var(--color-accent)] transition-colors">
              <select
                value={countryCode.label}
                onChange={(e) => {
                  const found = countryCodes.find((c) => c.label === e.target.value);
                  if (found) {
                    setCountryCode(found);
                    setPhoneError("");
                  }
                }}
                className="bg-transparent text-[var(--color-ink-2)] text-sm py-3 pr-2 outline-none cursor-pointer shrink-0 border-none"
                style={{ appearance: "auto" }}
              >
                {countryCodes.map((c) => (
                  <option key={c.label} value={c.label} style={{ background: "#0e0e0e" }}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                id="phone"
                name="phone"
                required
                type="tel"
                placeholder={`${countryCode.digits}-digit number`}
                onChange={(e) => {
                  if (phoneError) validatePhone(e.target.value);
                }}
                className="flex-1 bg-transparent py-3 text-[var(--color-ink)] outline-none border-none placeholder:text-[var(--color-mute)]"
                style={{ fontSize: "16px" }}
              />
            </div>
            {phoneError && (
              <p className="mt-1 font-mono text-[10px] text-[var(--color-accent)]">{phoneError}</p>
            )}
          </div>

          {/* Brief */}
          <div className="field">
            <label htmlFor="brief">▸ The Brief</label>
            <textarea
              id="brief"
              name="brief"
              required
              rows={4}
              placeholder="What should the system do? What's broken? What's the deadline?"
            />
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <Magnetic strength={0.2}>
              <button
                type="submit"
                className="w-full md:w-auto btn-primary px-8 py-3 text-sm font-semibold shadow-xl hover:shadow-2xl active:scale-95"
                disabled={state === "submitting"}
              >
                {state === "submitting" ? "Sending…" : "Request an Audit"}
                <span aria-hidden>{state === "submitting" ? "·" : "→"}</span>
              </button>
            </Magnetic>
          </div>
          {state === "err" && (
            <p className="font-mono text-xs text-[var(--color-accent)]">
              // Transmission failed — try again, or email iyeranand91@gmail.com
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
