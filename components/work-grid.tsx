import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./reveal";
import { Section } from "./ui/section";
import { SectionHead } from "./ui/section-head";
import { workItems } from "@/lib/work";

// Home-page teaser. Shows the featured work and links through to the full /work page.
export function WorkGrid() {
  const featured = workItems
    .filter((w) => w.featured)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, 6);

  return (
    <Section id="work-grid" spacing="xl">
        <SectionHead
          size="lg"
          index="03"
          tag="Selected builds"
          title={
            <>
              Landing pages <span className="italic">and the brands behind them.</span>
            </>
          }
          right={
            <Link href="/work" className="btn-ghost shrink-0">
              <span>See all work</span>
              <span aria-hidden>→</span>
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featured.map((item, i) => (
            <Reveal key={item.slug} delay={(i % 3) * 0.06}>
              <Link
                href="/work"
                className="group flex flex-col overflow-hidden h-full rounded-3xl bg-[var(--color-bg-2)] ring-1 ring-[var(--color-rule)] hover:ring-[var(--color-mute)] transition-shadow duration-300"
              >
                <div className="relative aspect-[1200/675] bg-[var(--color-bg-2)] border-b border-[var(--color-rule)] overflow-hidden">
                  {item.cover || item.gallery?.[0] ? (
                    <Image
                      src={item.cover ?? item.gallery![0]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-display italic text-3xl text-[var(--color-ink-2)]">
                      {item.title}
                    </div>
                  )}
                </div>
                <div className="p-5 md:p-6">
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-mute)]">
                    {item.category}
                  </div>
                  <h3 className="mt-2 font-display text-xl md:text-2xl leading-tight">{item.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
    </Section>
  );
}
