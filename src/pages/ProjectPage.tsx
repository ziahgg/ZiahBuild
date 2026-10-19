import { ArrowLeft, ArrowUpRight, Frame, Globe, Lightbulb, SearchCheck } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { Eyebrow } from '../components/Eyebrow'
import { MediaFrame } from '../components/MediaFrame'
import { Swoosh } from '../components/Swoosh'
import { projects } from '../data/projects'
import { getService } from '../data/services'
import { routes } from '../routes'
import type { Project } from '../types'

export function ProjectPage({ project }: { project: Project }) {
  const primaryService = getService(project.services[0])
  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]

  const links = [
    project.figmaUrl && { label: 'Open in Figma', href: project.figmaUrl, icon: Frame, variant: 'primary' as const },
    project.liveUrl && { label: 'Visit Website', href: project.liveUrl, icon: Globe, variant: 'dark' as const },
    project.githubUrl && { label: 'GitHub', href: project.githubUrl, icon: ArrowUpRight, variant: 'outline' as const },
    project.caseStudyUrl && { label: 'Case study', href: project.caseStudyUrl, icon: ArrowUpRight, variant: 'outline' as const },
  ].filter(Boolean) as { label: string; href: string; icon: typeof Frame; variant: 'primary' | 'dark' | 'outline' }[]

  return (
    <article aria-labelledby="project-title">
      <header className="pt-28 sm:pt-36">
        <Container>
          <a
            href={primaryService ? routes.service(primaryService.slug) : '#projects'}
            className="inline-flex items-center gap-2 text-sm text-black/55 hover:text-blue"
          >
            <ArrowLeft className="size-4" /> {primaryService ? primaryService.title : 'All projects'}
          </a>
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Eyebrow>
                {project.kind} · {String(index + 1).padStart(2, '0')}
              </Eyebrow>
              <h1 id="project-title" className="display mt-5 text-[clamp(2.75rem,7vw,6rem)]">
                {project.name}
                <br />
                <span className="text-black/30">{project.category}</span>
              </h1>
            </div>
          </div>
        </Container>
      </header>

      {/* Cover + actions */}
      <section aria-label="Cover" className="mt-12">
        <Container>
          <div className="aspect-[4/3] overflow-hidden rounded-[22px] sm:aspect-[16/9] lg:aspect-[21/10]">
            <MediaFrame media={project.media} label="Cover coming soon" />
          </div>
          <div className="mt-4 flex flex-col gap-4 rounded-[22px] border border-black/[0.08] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <p className="max-w-xl text-[15px] leading-relaxed text-black/65">{project.description}</p>
            {links.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {links.map(({ label, href, icon: Icon, variant }) => (
                  <ButtonLink key={label} href={href} variant={variant} icon={false} target="_blank" rel="noreferrer">
                    <Icon className="size-4" />
                    {label}
                    <span className="sr-only">(opens in a new tab)</span>
                  </ButtonLink>
                ))}
              </div>
            ) : (
              import.meta.env.DEV && (
                <p className="max-w-xs rounded-xl border border-dashed border-black/25 p-3 text-xs text-black/55">
                  Dev note: add <code>figmaUrl</code> / <code>liveUrl</code> in <code>src/data/projects.ts</code> to show
                  the Figma and Website buttons. Hidden in production.
                </p>
              )
            )}
          </div>
        </Container>
      </section>

      {/* Details */}
      <section aria-label="Project details" className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <dl className="divide-y divide-black/10 border-y border-black/10 text-sm">
                <Meta term="Type">{project.kind}</Meta>
                <Meta term="Category">{project.category}</Meta>
                <Meta term="Services">
                  <ul className="flex flex-wrap justify-end gap-1.5">
                    {project.services.map((slug) => {
                      const s = getService(slug)
                      return (
                        s && (
                          <li key={slug}>
                            <a href={routes.service(slug)} className="hover:text-blue">
                              {s.title}
                            </a>
                          </li>
                        )
                      )
                    })}
                  </ul>
                </Meta>
                {project.technologies.length > 0 && <Meta term="Technologies">{project.technologies.join(', ')}</Meta>}
              </dl>
            </aside>

            <div>
              <Eyebrow>Overview</Eyebrow>
              <p className="mt-5 max-w-3xl text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-snug tracking-[-0.02em]">
                {project.overview ?? project.description}
              </p>

              {project.problem || project.solution ? (
                <div className="mt-12 grid gap-3 md:grid-cols-2">
                  {project.problem && (
                    <div className="flex flex-col rounded-[22px] border border-black/[0.08] p-6 sm:p-8">
                      <span className="grid size-11 place-items-center rounded-xl bg-black/[0.05]">
                        <SearchCheck aria-hidden="true" className="size-5" />
                      </span>
                      <h2 className="mt-8 text-[11px] font-medium uppercase tracking-[0.08em] text-black/50">The problem</h2>
                      <p className="mt-3 text-[15px] leading-relaxed text-black/75">{project.problem}</p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="flex flex-col rounded-[22px] bg-black/[0.86] p-6 text-white sm:p-8">
                      <span className="grid size-11 place-items-center rounded-xl bg-blue">
                        <Lightbulb aria-hidden="true" className="size-5" />
                      </span>
                      <h2 className="mt-8 text-[11px] font-medium uppercase tracking-[0.08em] text-white/55">
                        The solution
                      </h2>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/85">{project.solution}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-12 rounded-[22px] border border-dashed border-black/20 p-6 text-sm text-black/55">
                  The full case study — problem, process and solution — will be added soon.
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Next project */}
      {next && next !== project && (
        <section aria-label="Next project" className="pb-16">
          <Container>
            <a
              href={routes.project(next.slug)}
              className="group flex flex-col justify-between gap-6 rounded-[22px] bg-black/[0.035] p-6 transition-colors hover:bg-black/[0.06] sm:flex-row sm:items-end sm:p-10"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.08em] text-black/50">Next project</p>
                <p className="display mt-3 text-[clamp(2rem,5vw,4rem)] transition-colors group-hover:text-blue">
                  {next.name}
                </p>
                <p className="mt-1 text-black/45">{next.category}</p>
              </div>
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-blue text-white transition-transform group-hover:translate-x-1">
                <Swoosh className="size-6" />
              </span>
            </a>
            <div className="mt-6 flex justify-center">
              <ButtonLink href="#projects" variant="outline">
                All projects
              </ButtonLink>
            </div>
          </Container>
        </section>
      )}
    </article>
  )
}

function Meta({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <dt className="shrink-0 text-black/50">{term}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  )
}
