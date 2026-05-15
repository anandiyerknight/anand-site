"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";

type State = "idle" | "submitting" | "ok" | "err";

const countryCodes = [
  { label: "🇮🇳 +91", code: "+91", country: "IN", digits: 10 },
  { label: "🇺🇸 +1", code: "+1", country: "US", digits: 10 },
  { label: "🇨🇦 +1", code: "+1", country: "CA", digits: 10 },
  { label: "🇸🇬 +65", code: "+65", country: "SG", digits: 8 },
  { label: "🇦🇪 +971", code: "+971", country: "AE", digits: 9 },
];

export function AuditForm() {
  const [state, setState] = useState<State>("idle");
  const [countryCode, setCountryCode] = useState(countryCodes[0]);
  const [phoneError, setPhoneError] = useState("");

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
    <section id="audit" className="relative py-12 md:py-32 px-6 md:px-10 border-t border-[var(--color-rule)] bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg-2)] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        <div className="md:col-span-5 flex flex-col justify-center">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
              Not everyone
              <br />
              <span className="italic">qualifies.</span>
            </h2>
          </Reveal>
          <p className="mt-6 md:mt-8 text-[var(--color-ink-2)] text-base md:text-lg leading-relaxed max-w-md">
            Currently accepting 6 new systems builds for Q3 2026.
          </p>
          <div className="mt-8 md:mt-12 space-y-2 md:space-y-3 font-mono text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
            {["10x speed compounds", "Systems compound leverage", "Decisions in days"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <span className="text-[var(--color-cyan)]">▸</span>
                {t}
              </div>
            ))}
          </div>
          <p className="mt-8 md:mt-12 text-xs md:text-sm text-[var(--color-mute)] italic">
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
                <span className="text-[var(--color-mute)]">Q3 2026 · 6 slots</span>
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
                        <input
                          id="social"
                          name="social"
                          required
                          placeholder="@handle or https://..."
                        />
                      </div>
                    </div>

                    {/* Phone with country code */}
                    <div className="field">
                      <label htmlFor="phone">▸ Phone</label>
                      <div className="flex gap-0 border-b-2 border-[var(--color-rule-2)] focus-within:border-[var(--color-cyan)] transition-colors">
                        <select
                          value={countryCode.label}
                          onChange={(e) => {
                            const found = countryCodes.find((c) => c.label === e.target.value);
                            if (found) { setCountryCode(found); setPhoneError(""); }
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
                          onChange={(e) => { if (phoneError) validatePhone(e.target.value); }}
                          className="flex-1 bg-transparent py-3 text-[var(--color-ink)] outline-none border-none placeholder:text-[var(--color-mute)]"
                          style={{ fontSize: "16px" }}
                        />
                      </div>
                      {phoneError && (
                        <p className="mt-1 font-mono text-[10px] text-[var(--color-magenta)]">
                          {phoneError}
                        </p>
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
                      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                        // We never share. Briefs are confidential.
                      </div>
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
