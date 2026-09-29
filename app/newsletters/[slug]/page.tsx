import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { getNewsletterPageContent } from "@/lib/newsletter-pages";
import { newsletterIssues } from "@/lib/newsletters";

type NewsletterPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return newsletterIssues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: NewsletterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = newsletterIssues.find((candidate) => candidate.slug === slug);
  if (!issue) return {};
  const content = getNewsletterPageContent(issue.slug, issue.title, issue.blurb);
  return {
    title: `${content.title} | Anand Iyer`,
    description: content.intro,
    alternates: { canonical: `/newsletters/${issue.slug}` },
    openGraph: {
      title: content.title,
      description: content.intro,
      type: "article",
      images: [`/newsletters/${issue.slug}.png`],
    },
  };
}

export default async function NewsletterIssuePage({ params }: NewsletterPageProps) {
  const { slug } = await params;
  const issueIndex = newsletterIssues.findIndex((issue) => issue.slug === slug);
  if (issueIndex === -1) notFound();

  const issue = newsletterIssues[issueIndex];
  const content = getNewsletterPageContent(issue.slug, issue.title, issue.blurb);

  return (
    <main className="relative">
      <Nav />
      <article>
        <header className="px-6 md:px-10 pt-32 md:pt-44 pb-12 md:pb-20 border-b border-[var(--color-rule)]">
          <div className="max-w-6xl mx-auto">
            <Link href="/newsletters" className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] hover:text-[var(--color-ink)] transition-colors">
              ← All newsletters
            </Link>
            <div className="mt-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-20 items-end">
              <div>
                <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)]">{content.eyebrow}</div>
                <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.92] tracking-tight max-w-5xl">{content.title}</h1>
                <p className="mt-7 text-lg md:text-xl text-[var(--color-ink-2)] leading-relaxed max-w-2xl">{content.intro}</p>
              </div>
              <div className="border border-[var(--color-rule)] bg-[var(--color-bg-2)] p-3">
                <img src={`/newsletters/${issue.slug}.png`} alt="" className="block w-full h-auto" />
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 md:px-10 py-12 md:py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_280px] gap-12 lg:gap-24">
            <div className="max-w-3xl">
              {content.sections.map((section) => (
                <section key={section.heading} className="mb-14 last:mb-0">
                  <h2 className="font-display text-3xl md:text-4xl leading-tight">{section.heading}</h2>
                  <div className="mt-5 space-y-5 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets && (
                    <ul className="mt-6 space-y-3 border-l border-[var(--color-rule)] pl-6 text-base md:text-lg text-[var(--color-ink)] leading-relaxed">
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  )}
                </section>
              ))}
              <div className="mt-16 border border-[var(--color-rule)] bg-[var(--color-bg-2)] p-6 md:p-8">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">The takeaway</div>
                <p className="mt-4 font-display italic text-2xl md:text-3xl leading-tight">{content.takeaway}</p>
              </div>
            </div>

            <aside className="lg:pt-1">
              <div className="lg:sticky lg:top-28 border-t border-[var(--color-rule)] pt-5">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">Issue {issue.num} / {newsletterIssues.length}</div>
                <p className="mt-4 text-sm text-[var(--color-ink-2)] leading-relaxed">{issue.blurb}</p>
                <div className="mt-7 flex flex-col gap-3">
                  <a href={`/newsletters/${issue.slug}.pdf`} target="_blank" rel="noreferrer" className="btn-primary !rounded-none !text-[10px]">Download PDF <span aria-hidden>↓</span></a>
                  <Link href="/newsletters" className="btn-ghost !rounded-none !text-[10px]">Browse all issues <span aria-hidden>→</span></Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
