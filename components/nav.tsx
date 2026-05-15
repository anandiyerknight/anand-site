"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { label: "Systems", href: "#systems" },
  { label: "Logic", href: "#methodology" },
  { label: "Work", href: "#work-grid" },
  { label: "Stack", href: "#tech" },
  { label: "Qualify", href: "#audit" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 backdrop-blur-xl bg-[rgba(6,6,10,0.55)] border-b border-[var(--color-rule)]"
          : "py-6"
      }`}
    >
      <div className="px-6 md:px-10 flex items-center justify-between gap-8">
        <Link href="#top" className="flex items-baseline gap-3 group">
          <span className="font-display italic text-2xl tracking-tight">Anand Iyer</span>
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)] group-hover:text-[var(--color-cyan)] transition-colors">
            / AI Architect
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--color-ink-2)] hover:text-[var(--color-cyan)] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-4">
          <a href="#audit" className="btn-primary !py-2 md:!py-2.5 !px-3 md:!px-4 !text-xs md:!text-[10px]">
            <span>Apply</span>
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
