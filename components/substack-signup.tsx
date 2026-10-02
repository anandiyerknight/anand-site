export function SubstackSignup() {
  return (
    <section
      id="subscribe"
      aria-labelledby="substack-signup-title"
      className="border-b border-[var(--color-rule)] px-6 py-10 md:px-10 md:py-14"
    >
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[minmax(0,1fr)_minmax(320px,480px)] md:items-center">
        <div>
          <p className="font-mono text-[11px] uppercase text-[var(--color-mute)]">
            The Automation Series
          </p>
          <h2
            id="substack-signup-title"
            className="mt-3 max-w-xl font-display text-3xl leading-tight md:text-4xl"
          >
            Get new issues in your inbox.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-ink-2)]">
            Practical notes on automation, outreach, and revenue. Subscribe free
            through Substack.
          </p>
        </div>
        <iframe
          title="Subscribe to Anand Iyer's Automation Series"
          src="https://anandiyerautomation.substack.com/embed"
          width="480"
          height="320"
          style={{
            display: "block",
            width: "100%",
            border: "1px solid var(--color-rule)",
            background: "white",
          }}
          frameBorder="0"
          scrolling="no"
        />
      </div>
    </section>
  );
}
