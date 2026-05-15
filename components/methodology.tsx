"use client";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";

const tier1 = ["Netflix", "Amazon Prime", "Gillette", "Adidas", "Reebok", "HDFC", "Byju's"];

export function Methodology() {
  return (
    <section id="methodology" className="relative py-12 md:py-32 px-6 md:px-10 border-t border-[var(--color-rule)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
        <div className="md:col-span-5 md:sticky md:top-32">
          <Reveal>
            <img
              src="/profile.jpg"
              alt="Anand Iyer"
              className="w-full aspect-[4/5] object-cover rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            />
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal>
            <h2 className="font-display text-[clamp(1.8rem,5vw,4.8rem)] leading-[0.98] tracking-tight">
              I build the systems.
              <br />
              You focus on the vision.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 md:mt-10 text-base md:text-lg leading-relaxed text-[var(--color-ink-2)] max-w-2xl">
              With 15 years of production pedigree and 6 production apps, I'm a systems builder for creative and tech founders who want to compound their leverage. I architect end-to-end automations that remove friction and amplify impact.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-md">
              {[
                ["Berklee", "Acoustics"],
                ["S.A.E", "Audio Eng."],
                ["Coder", "Revenue Infrastructure"],
                ["Producer", "Visual Narrative"],
                ["Director", "Creative Direction"],
                ["Founder", "Systems Architecture"],
                ["Jack of all trades", "Master of Some"],
                ["Mirchi Kaan", "Jingle of the Year"],
              ].map(([title, sub]) => (
                <div
                  key={title}
                  className="border-l border-[var(--color-rule-2)] pl-3 md:pl-4 py-2"
                >
                  <div className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[var(--color-cyan)]">
                    {title}
                  </div>
                  <div className="text-xs md:text-sm text-[var(--color-ink-2)] mt-1">{sub}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 md:mt-12">
              <Magnetic strength={0.25}>
                <a href="#audit" className="btn-primary text-xs md:text-sm px-6 md:px-8">
                  See If You Qualify
                  <span aria-hidden>→</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
