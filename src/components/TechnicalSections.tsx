import type { Project } from '../types'

/**
 * Engineering sections for technical case studies: implementation,
 * highlights (what / how / why), challenges and validation. Each section
 * renders only when the project has data for it.
 */
export function TechnicalSections({ project }: { project: Project }) {
  const { implementation, engineering, challenges, validation, limitations } = project
  return (
    <>
      {implementation && implementation.length > 0 && (
        <section aria-labelledby="tech-implementation" className="mt-16">
          <SectionTitle id="tech-implementation" lead="Technical" muted=" implementation." />
          <dl className="mt-8 divide-y divide-black/10 border-y border-black/10">
            {implementation.map((item) => (
              <div key={item.title} className="grid gap-2 py-5 sm:grid-cols-[200px_1fr] sm:gap-8">
                <dt className="text-sm font-semibold tracking-tight">{item.title}</dt>
                <dd className="text-[15px] leading-relaxed text-black/70">
                  <Code>{item.text}</Code>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {engineering && engineering.length > 0 && (
        <section aria-labelledby="tech-highlights" className="mt-16">
          <SectionTitle id="tech-highlights" lead="Engineering" muted=" highlights." />
          <ol className="mt-8 grid gap-3">
            {engineering.map((h, i) => (
              <li key={h.title} className="rounded-[22px] bg-black/[0.035] p-6 sm:p-8">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs tabular-nums text-blue">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-lg font-semibold tracking-tight">{h.title}</h3>
                </div>
                <dl className="mt-5 grid gap-5 md:grid-cols-3">
                  {(
                    [
                      ['What', h.what],
                      ['How', h.how],
                      ['Why it matters', h.why],
                    ] as const
                  ).map(([term, text]) => (
                    <div key={term}>
                      <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-black/45">{term}</dt>
                      <dd className="mt-2 text-sm leading-relaxed text-black/70">
                        <Code>{text}</Code>
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ol>
        </section>
      )}

      {challenges && challenges.length > 0 && (
        <section aria-labelledby="tech-challenges" className="mt-16">
          <SectionTitle id="tech-challenges" lead="Challenges &" muted=" trade-offs." />
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {challenges.map((c) => (
              <li key={c.title} className="rounded-[22px] border border-black/[0.08] p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold tracking-tight">{c.title}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] ${
                      c.inferred ? 'border border-black/15 text-black/55' : 'bg-blue/10 text-blue'
                    }`}
                  >
                    {c.inferred ? 'Inferred' : 'Documented'}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/70">
                  <Code>{c.text}</Code>
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {((validation && validation.length > 0) || (limitations && limitations.length > 0)) && (
        <section aria-labelledby="tech-validation" className="mt-16">
          <SectionTitle id="tech-validation" lead="Validation &" muted=" limitations." />
          <div className="mt-8 grid gap-3 lg:grid-cols-2">
            {validation && validation.length > 0 && (
              <dl className="rounded-[22px] border border-black/[0.08] p-6">
                {validation.map((v) => (
                  <div key={v.label} className="border-b border-black/10 py-4 first:pt-0 last:border-0 last:pb-0">
                    <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-black/45">{v.label}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-black/70">
                      <Code>{v.text}</Code>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            {limitations && limitations.length > 0 && (
              <div className="rounded-[22px] bg-black/[0.86] p-6 text-white">
                <h3 className="text-[11px] font-medium uppercase tracking-[0.08em] text-white/55">Known limitations</h3>
                <ul className="mt-4 space-y-3">
                  {limitations.map((l) => (
                    <li key={l} className="flex gap-3 text-sm leading-relaxed text-white/80">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-blue" />
                      <span>
                        <Code inverted>{l}</Code>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}

function SectionTitle({ id, lead, muted }: { id: string; lead: string; muted: string }) {
  return (
    <h2 id={id} className="display text-[clamp(1.75rem,3vw,2.5rem)]">
      {lead}
      <span className="text-black/30">{muted}</span>
    </h2>
  )
}

/** Renders `backtick` spans in data strings as inline code. */
function Code({ children, inverted = false }: { children: string; inverted?: boolean }) {
  const parts = children.split(/(`[^`]+`)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('`') && part.endsWith('`') ? (
          <code
            key={i}
            className={`rounded px-1 py-0.5 font-mono text-[0.85em] ${inverted ? 'bg-white/10 text-white' : 'bg-black/[0.06] text-black'}`}
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        ),
      )}
    </>
  )
}
