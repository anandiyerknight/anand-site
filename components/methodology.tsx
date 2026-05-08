"use client";
import { PortraitPlaceholder } from "./portrait-placeholder";
import { Reveal } from "./reveal";

const tier1 = ["Netflix", "Amazon Prime", "Gillette", "Adidas", "Reebok", "HDFC", "Byju's"];

export function Methodology() {
  return (
    <section id="methodology" className="relative py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        <div className="md:col-span-5 md:sticky md:top-32">
          <Reveal>
            <img 
              src="/profile.jpg" 
              alt="Anand Iyer" 
              className="w-full aspect-[4/5] object-cover rounded-[2.5rem] border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            />
          </Reveal>
          <div className="mt-6 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
            <span>// 15+ yrs · pedigree</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-pulse" />
              In session
            </span>
          </div>
        </div>

        <div className="md:col-span-7">


          <Reveal>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.98] tracking-tight">
              I don't provide{" "}
              <span className="italic text-[var(--color-mute)]">"services."</span>
              <br />
              I build <span className="italic">Done-For-You</span> Revenue
              <br />
              Infrastructure.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 text-lg md:text-xl leading-relaxed text-[var(--color-ink-2)] max-w-2xl">
              With 15+ years of production pedigree for{" "}
              {tier1.map((b, i) => (
                <span key={b}>
                  <span className="text-[var(--color-ink)] underline decoration-[var(--color-cyan)] decoration-2 underline-offset-4">
                    {b}
                  </span>
                  {i < tier1.length - 1 ? ", " : ""}
                </span>
              ))}
              , I have moved from high-stakes creative direction to building the engines that
              power it.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-mute)] max-w-2xl">
              I architect end-to-end digital transformations — from AI-native SaaS platforms to
              luxury D2C brands. Every automation is a move toward total market efficiency.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 grid grid-cols-2 gap-4 max-w-md">
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
                  className="border-l border-[var(--color-rule-2)] pl-4 py-2"
                >
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-cyan)]">
                    {title}
                  </div>
                  <div className="text-sm text-[var(--color-ink-2)] mt-1">{sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
