function About() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      <section className="surface-card rounded-[1.5rem] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] muted-text">
          About Deeronix
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: 'var(--text)' }}>
          Built for focused creators
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 sm:text-base muted-text">
          Deeronix helps teams publish updates, organize media, and keep content pipelines
          structured. The platform is intentionally simple, fast, and editor-first.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="surface-card rounded-[1.2rem] p-5">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
            Mission
          </h2>
          <p className="mt-2 text-sm leading-6 muted-text">
            Reduce publishing friction so teams can ship better content more often.
          </p>
        </article>
        <article className="surface-card rounded-[1.2rem] p-5">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
            Workflow
          </h2>
          <p className="mt-2 text-sm leading-6 muted-text">
            Upload media, link videos, and distribute updates through one consistent flow.
          </p>
        </article>
        <article className="surface-card rounded-[1.2rem] p-5">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
            Direction
          </h2>
          <p className="mt-2 text-sm leading-6 muted-text">
            More automation, richer analytics, and deeper creator tools are on the roadmap.
          </p>
        </article>
      </section>
    </div>
  )
}

export default About
