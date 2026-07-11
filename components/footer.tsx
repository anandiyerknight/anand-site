"use client";

export function Footer() {
  return (
    <footer className="relative pt-24 pb-12 px-6 md:px-10 border-t border-[var(--color-rule)] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between flex-wrap gap-6">
          <h2 className="font-display text-[clamp(3rem,12vw,12rem)] leading-[0.85] tracking-[-0.04em]">
            Architect
            <br />
            <span className="italic grad-text">the engine.</span>
          </h2>
          <a href="#audit" className="btn-primary text-sm self-end">
            Submit Brief
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="mt-20 pt-10 border-t border-[var(--color-rule-2)] grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)] mb-3">
              // Studio
            </div>
            <div className="font-display italic text-2xl">Anand Iyer</div>
            <div className="text-sm text-[var(--color-mute)] mt-1">Architect · Strategic Director</div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)] mb-3">
              // Contact
            </div>
            <a
              href="mailto:iyeranand91@gmail.com"
              className="block text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
            >
              iyeranand91@gmail.com
            </a>
            <a
              href="tel:+919833764750"
              className="block text-[var(--color-ink-2)] hover:text-[var(--color-accent)] transition-colors mt-1"
            >
              +91 9833 764 750
            </a>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)] mb-3">
              // Coords
            </div>
            <div className="text-[var(--color-ink-2)]">Mumbai, India</div>
            <div className="font-mono text-xs text-[var(--color-mute)] mt-1">
              19.07°N · 72.87°E
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)] mb-3">
              // Index
            </div>
            <ul className="space-y-2">
              {[
                ["Proof", "#proof"],
                ["Stack", "#stack"],
                ["Work", "#work"],
                ["Cases", "#cases"],
                ["Audit", "#audit"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a
                    href={h}
                    className="font-mono text-xs tracking-[0.18em] uppercase text-[var(--color-ink-2)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-rule-2)] flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
          <span>© 2026 · Flippit Media · All rights operational</span>
          <span className="opacity-60">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
          <span>Built with infrastructure, not headcount.</span>
        </div>
      </div>
    </footer>
  );
}
