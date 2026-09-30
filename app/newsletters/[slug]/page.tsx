import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { newsletterCaseStudies } from "@/lib/newsletter-pages";
import { newsletterIssues } from "@/lib/newsletters";

type NewsletterPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

function RichText({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function generateStaticParams() {
  return newsletterIssues.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: NewsletterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const issue = newsletterIssues.find((candidate) => candidate.slug === slug);
  const caseStudy = newsletterCaseStudies[slug];
  if (!issue || !caseStudy) return {};

  return {
    title: `${issue.title} | Anand Iyer`,
    description: caseStudy.profileHtml.replace(/<[^>]+>/g, ""),
    alternates: { canonical: `/newsletters/${issue.slug}` },
    openGraph: {
      title: issue.title,
      description: caseStudy.profileHtml.replace(/<[^>]+>/g, ""),
      type: "article",
      images: [`/newsletters/${issue.slug}.png`],
    },
  };
}

export default async function NewsletterIssuePage({ params }: NewsletterPageProps) {
  const { slug } = await params;
  const issue = newsletterIssues.find((candidate) => candidate.slug === slug);
  const caseStudy = newsletterCaseStudies[slug];
  if (!issue || !caseStudy) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.headline,
    description: caseStudy.profileHtml.replace(/<[^>]+>/g, ""),
    image: `https://anandiyer.co.in/newsletters/${issue.slug}.png`,
    author: { "@type": "Person", name: "Anand Iyer", url: "https://anandiyer.co.in" },
    publisher: { "@type": "Person", name: "Anand Iyer", url: "https://anandiyer.co.in" },
    articleSection: issue.title,
    mainEntityOfPage: `https://anandiyer.co.in/newsletters/${issue.slug}`,
  };

  return (
    <main className="relative">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article>
        <header className="px-6 md:px-10 pt-32 md:pt-44 pb-12 md:pb-20 border-b border-[var(--color-rule)]">
          <div className="max-w-6xl mx-auto">
            <Link href="/newsletters" className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] hover:text-[var(--color-ink)] transition-colors">
              ← All newsletters
            </Link>
            <div className="mt-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-20 items-end">
              <div>
                <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-mute)]">{caseStudy.eyebrow}</div>
                <h1 className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.86] tracking-tight max-w-4xl">{issue.title}</h1>
                <p className="mt-8 text-lg md:text-xl text-[var(--color-ink-2)] leading-relaxed max-w-2xl">{caseStudy.headline}</p>
              </div>
              <div className="border border-[var(--color-rule)] bg-[var(--color-bg-2)] p-3">
                <img src={`/newsletters/${issue.slug}.png`} alt={issue.title} className="block w-full h-auto" />
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 md:px-10 py-12 md:py-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_280px] gap-12 lg:gap-24">
            <div className="max-w-3xl">
              <section className="mb-16">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">The case study</h2>
                <div className="mt-6 border border-[var(--color-rule)] bg-[var(--color-bg-2)] p-6 md:p-8">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">{caseStudy.profileLabel}</div>
                  <p className="mt-4 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed"><RichText html={caseStudy.profileHtml} /></p>
                </div>
              </section>

              <section className="mb-16">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">The situation</h2>
                <div className="mt-5 space-y-5 text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed">
                  {caseStudy.situation.map((paragraph) => <p key={paragraph}><RichText html={paragraph} /></p>)}
                </div>
              </section>

              <section className="mb-16">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">What they did</h2>
                <ol className="mt-6 border-t border-[var(--color-rule)]">
                  {caseStudy.steps.map((step, index) => (
                    <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 border-b border-[var(--color-rule)] text-base md:text-lg text-[var(--color-ink-2)] leading-relaxed">
                      <span className="font-display text-xl text-[var(--color-cyan)]">{index + 1}</span>
                      <span><RichText html={step} /></span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="mb-16">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">{caseStudy.resultsTitle}</h2>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 border border-[var(--color-cyan)] bg-[var(--color-bg-2)] p-6">
                    <div className="font-display text-3xl md:text-4xl leading-tight text-[var(--color-cyan)]">{caseStudy.hero.value}</div>
                    <div className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">{caseStudy.hero.label}</div>
                  </div>
                  {caseStudy.metrics.map((metric) => (
                    <div key={`${metric.value}-${metric.label}`} className="border border-[var(--color-rule)] bg-[var(--color-bg-2)] p-5">
                      <div className="font-display text-2xl md:text-3xl leading-tight">{metric.value}</div>
                      <div className="mt-2 text-sm text-[var(--color-ink-2)] leading-relaxed">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-16">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">Before / after</h2>
                <div className="mt-6 overflow-hidden border border-[var(--color-rule)]">
                  <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[var(--color-bg-2)] font-mono text-[10px] tracking-[0.16em] uppercase">
                    <div className="p-4" />
                    <div className="p-4">Before</div>
                    <div className="p-4 text-[var(--color-cyan)]">After</div>
                  </div>
                  {caseStudy.beforeAfter.map((row) => (
                    <div key={row.label} className="grid grid-cols-[1.2fr_1fr_1fr] border-t border-[var(--color-rule)] text-sm md:text-base">
                      <div className="p-4 font-medium">{row.label}</div>
                      <div className="p-4 text-[var(--color-magenta)]">{row.before}</div>
                      <div className="p-4 text-[var(--color-cyan)]">{row.after}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="border border-[var(--color-rule)] bg-[var(--color-bg-2)] p-6 md:p-8">
                <h2 className="font-display text-3xl leading-tight">{caseStudy.cta.heading}</h2>
                <p className="mt-4 text-base text-[var(--color-ink-2)] leading-relaxed">{caseStudy.cta.body}</p>
                <Link href="/#audit" className="mt-6 inline-flex btn-primary !rounded-none !text-[10px]">
                  {caseStudy.cta.button}
                </Link>
              </section>
            </div>

            <aside className="lg:pt-1">
              <div className="lg:sticky lg:top-28 border-t border-[var(--color-rule)] pt-5">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">Issue {issue.num} / {newsletterIssues.length}</div>
                <p className="mt-4 text-sm text-[var(--color-ink-2)] leading-relaxed">{issue.blurb}</p>
                <div className="mt-7">
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
