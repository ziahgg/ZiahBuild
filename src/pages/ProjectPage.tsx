import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, Frame, Globe, Lightbulb, PenTool, Play, SearchCheck } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { Eyebrow } from '../components/Eyebrow'
import { MediaFrame } from '../components/MediaFrame'
import { TechnicalSections } from '../components/TechnicalSections'
import { VideoSections } from '../components/VideoSections'
import { allProjects, getProject, projects, projectsForService } from '../data/projects'
import { getService } from '../data/services'
import { whatsappLink } from '../data/site'
import { routes } from '../routes'
import type { Project } from '../types'

type LinkItem = {
  label: string
  href: string
  icon: typeof Frame
  variant: 'primary' | 'dark' | 'outline'
  /** Links to another page of this site (same tab). */
  internal?: boolean
}

export function ProjectPage({ project }: { project: Project }) {
  const primaryService = getService(project.services[0])
  // Previous/next stay inside the same collection (e.g. Website UI/UX Design).
  const siblings = primaryService ? projectsForService(primaryService.slug) : projects
  const index = siblings.indexOf(project)
  const prev = siblings.length > 1 ? siblings[(index - 1 + siblings.length) % siblings.length] : undefined
  const next = siblings.length > 1 ? siblings[(index + 1) % siblings.length] : undefined
  const backHref = primaryService ? routes.service(primaryService.slug) : '#projects'
  const backLabel = primaryService ? primaryService.title : 'All projects'
  const hasImage = Boolean(project.media.image)
  const vertical = Boolean(hasImage && project.media.width && project.media.height && project.media.height > project.media.width)
  // Cross-links between a Figma design case study and the live website built from it.
  const designStudy = project.designCaseStudy ? getProject(project.designCaseStudy) : undefined
  const liveBuild = allProjects.find((p) => p.designCaseStudy === project.slug)

  const links = [
    project.instagramUrl && { label: 'Watch on Instagram', href: project.instagramUrl, icon: Play, variant: 'primary' },
    project.liveUrl && { label: 'View Live Website', href: project.liveUrl, icon: Globe, variant: 'primary' },
    project.figmaUrl && {
      label: 'View Figma Design',
      href: project.figmaUrl,
      icon: Frame,
      variant: project.liveUrl ? 'dark' : 'primary',
    },
    designStudy && {
      label: 'Design case study',
      href: routes.project(designStudy.slug),
      icon: PenTool,
      variant: 'outline',
      internal: true,
    },
    liveBuild && {
      label: 'Live build case study',
      href: routes.project(liveBuild.slug),
      icon: Code2,
      variant: 'outline',
      internal: true,
    },
    project.githubUrl && {
      label: 'View Repository',
      href: project.githubUrl,
      icon: Code2,
      variant: project.liveUrl || project.figmaUrl ? 'outline' : 'primary',
    },
    project.caseStudyUrl && { label: 'Case study', href: project.caseStudyUrl, icon: ArrowUpRight, variant: 'outline' },
  ].filter(Boolean) as LinkItem[]

  return (
    <article aria-labelledby="project-title">
      <header className="pt-28 sm:pt-36">
        <Container>
          <a href={backHref} className="inline-flex items-center gap-2 text-sm text-black/55 hover:text-blue">
            <ArrowLeft className="size-4" /> {backLabel}
          </a>
          <div className="mt-8">
            <Eyebrow>
              {primaryService?.title ?? project.kind} · {String(index + 1).padStart(2, '0')} /{' '}
              {String(siblings.length).padStart(2, '0')}
            </Eyebrow>
            <h1
              id="project-title"
              className={`display mt-5 max-w-5xl ${
                Math.max(project.name.length, (project.industry ?? project.category).length) > 24 ? 'text-[clamp(2.25rem,5vw,4.25rem)]' : 'text-[clamp(2.75rem,7vw,6rem)]'
              }`}
            >
              {project.name}
              <br />
              <span className="text-black/30">{project.industry ?? project.category}</span>
            </h1>
          </div>
        </Container>
      </header>

      {/* Cover + intro + primary CTA */}
      <section aria-label="Cover" className="mt-12">
        <Container>
          <div className={vertical ? 'grid items-start gap-4 md:grid-cols-[minmax(0,360px)_1fr] lg:grid-cols-[minmax(0,420px)_1fr]' : ''}>
          <div
            className={`overflow-hidden rounded-[22px] ring-1 ring-black/[0.06] ${
              vertical
                ? 'mx-auto aspect-[9/16] w-full max-w-[420px]'
                : hasImage
                  ? 'aspect-[16/9]'
                  : 'aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/10]'
            }`}
          >
            <MediaFrame
              media={project.media}
              size="full"
              eager
              sizes={vertical ? '(min-width: 768px) 420px, 92vw' : '(min-width: 1440px) 1376px, 96vw'}
              label="Cover coming soon"
            />
          </div>
          <div
            className={`flex flex-col gap-4 rounded-[22px] border border-black/[0.08] p-4 sm:p-5 ${
              vertical ? 'md:h-full md:justify-between md:p-8' : 'mt-4 sm:flex-row sm:items-center sm:justify-between'
            }`}
          >
            <div className="max-w-2xl">
              {project.brand && (
                <p className="text-[11px] uppercase tracking-[0.08em] text-black/45">
                  {project.brand} · {project.kind}
                </p>
              )}
              <p className={`mt-1 leading-relaxed text-black/70 ${vertical ? 'text-lg' : 'text-[15px]'}`}>
                {project.description}
              </p>
              {vertical && <VideoCaption project={project} />}
            </div>
            {links.length > 0 ? (
              <ProjectLinks links={links} />
            ) : (
              import.meta.env.DEV && (
                <p className="max-w-xs rounded-xl border border-dashed border-black/25 p-3 text-xs text-black/55">
                  Dev note: add <code>figmaUrl</code> / <code>liveUrl</code> in <code>src/data/projects.ts</code> to show
                  the Figma and Website buttons. Hidden in production.
                </p>
              )
            )}
          </div>
          </div>
        </Container>
      </section>

      {/* Overview, problem, solution */}
      <section aria-label="Project details" className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <dl className="divide-y divide-black/10 border-y border-black/10 text-sm">
                {project.brand && <Meta term="Brand">{project.brand}</Meta>}
                {project.industry && <Meta term="Industry">{project.industry}</Meta>}
                <Meta term="Type">{project.kind}</Meta>
                <Meta term="Service">
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
                    {project.services.length === 0 && <li>{project.category}</li>}
                  </ul>
                </Meta>
                {project.scope && <Meta term="Scope">{project.scope.join(' · ')}</Meta>}
                {project.software && <Meta term="Editing software">{project.software}</Meta>}
                {project.published && <Meta term="Published">{project.published}</Meta>}
                {project.technologies.length > 0 && <Meta term="Technologies">{project.technologies.join(', ')}</Meta>}
                {project.githubUrl && (
                  <Meta term="Repository">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="break-all hover:text-blue">
                      {project.githubUrl.replace(/^https:\/\/github\.com\//, '')}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </Meta>
                )}
                {project.githubUrl && !project.liveUrl && <Meta term="Live demo">Not hosted</Meta>}
                {project.liveUrl && (
                  <Meta term="Live site">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="break-all hover:text-blue">
                      {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </Meta>
                )}
              </dl>
            </aside>

            <div>
              <Eyebrow>Overview</Eyebrow>
              <p className="mt-5 max-w-3xl text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-snug tracking-[-0.02em]">
                {project.overview ?? project.description}
              </p>

              {(project.audience || project.objective || project.role) && (
                <dl className="mt-10 grid gap-3 sm:grid-cols-2">
                  {project.audience && <Fact term="Intended users">{project.audience}</Fact>}
                  {project.objective && <Fact term={project.objectiveLabel ?? 'Design objective'}>{project.objective}</Fact>}
                  {project.role && <Fact term="My role">{project.role}</Fact>}
                </dl>
              )}

              {project.problem || project.solution ? (
                <div className="mt-12 grid gap-3 md:grid-cols-2">
                  {project.problem && (
                    <div className="flex flex-col rounded-[22px] border border-black/[0.08] p-6 sm:p-8">
                      <span className="grid size-11 place-items-center rounded-xl bg-black/[0.05]">
                        <SearchCheck aria-hidden="true" className="size-5" />
                      </span>
                      <h2 className="mt-8 text-[11px] font-medium uppercase tracking-[0.08em] text-black/50">The problem</h2>
                      <p className="mt-3 text-[15px] leading-relaxed text-black/75">{project.problem}</p>
                      {project.problemSource && (
                        <p className="mt-auto pt-5 text-xs leading-relaxed text-black/45">{project.problemSource}</p>
                      )}
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
                !project.sections && (
                  <p className="mt-12 rounded-[22px] border border-dashed border-black/20 p-6 text-sm text-black/55">
                    The full case study — problem, process and solution — will be added soon.
                  </p>
                )
              )}

              <VideoSections project={project} showCaption={!vertical} />

              {project.considerations && project.considerations.length > 0 && (
                <div className="mt-16">
                  <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">
                    Key design
                    <span className="text-black/30"> considerations.</span>
                  </h2>
                  <ol className="mt-8 grid gap-3 md:grid-cols-3">
                    {project.considerations.map((c, i) => (
                      <li key={c.title} className="rounded-[22px] bg-black/[0.035] p-6">
                        <span className="text-xs tabular-nums text-blue">{String(i + 1).padStart(2, '0')}</span>
                        <h3 className="mt-3 text-base font-semibold tracking-tight">{c.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-black/65">{c.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <div className="mt-16">
                  <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">
                    Design &amp; development
                    <span className="text-black/30"> highlights.</span>
                  </h2>
                  <ol className="mt-8 grid gap-3 md:grid-cols-2">
                    {project.highlights.map((h, i) => (
                      <li key={h.title} className="rounded-[22px] bg-black/[0.035] p-6">
                        <span className="text-xs tabular-nums text-blue">{String(i + 1).padStart(2, '0')}</span>
                        <h3 className="mt-3 text-base font-semibold tracking-tight">{h.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-black/65">{h.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <TechnicalSections project={project} />
            </div>
          </div>
        </Container>
      </section>

      {/* Final video CTA (video case studies) */}
      {project.instagramUrl && (
        <section aria-labelledby="video-cta" className="pb-14">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] bg-black p-6 text-white sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.08em] text-white/60">Final video</p>
                <h2 id="video-cta" className="display mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)]">
                  Watch the Reel.
                </h2>
                <p className="mt-2 max-w-lg text-sm text-white/70">
                  The final edit of “{project.name}” is published on Instagram
                  {project.published?.includes(' · ') ? `, ${project.published.split(' · ')[1]}` : ''}.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <ButtonLink href={project.instagramUrl} size="lg" icon={false} target="_blank" rel="noopener noreferrer">
                  <Play className="size-5" />
                  Watch on Instagram
                  <ArrowUpRight className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </ButtonLink>
                <ButtonLink {...whatsappLink} variant="light" size="lg">
                  Discuss a Project<span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Repository CTA (technical case studies without a live demo) */}
      {project.githubUrl && !project.liveUrl && !project.figmaUrl && (
        <section aria-labelledby="repo-cta" className="pb-14">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] bg-black p-6 text-white sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.08em] text-white/60">GitHub repository</p>
                <h2 id="repo-cta" className="display mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)]">
                  Read the code.
                </h2>
                <p className="mt-2 max-w-lg text-sm text-white/70">
                  Source code and documentation for {project.name}. There is no hosted demo — the README explains how
                  to run it locally.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <ButtonLink href={project.githubUrl} size="lg" icon={false} target="_blank" rel="noopener noreferrer">
                  <Code2 className="size-5" />
                  View Repository
                  <ArrowUpRight className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </ButtonLink>
                <ButtonLink {...whatsappLink} variant="light" size="lg">
                  Discuss a Project<span className="sr-only"> (opens WhatsApp in a new tab)</span>
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Live website CTA */}
      {project.liveUrl && (
        <section aria-labelledby="live-cta" className="pb-14">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] bg-blue p-6 text-white sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.08em] text-white/70">Live website</p>
                <h2 id="live-cta" className="display mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)]">
                  See {project.name} live.
                </h2>
                <p className="mt-2 max-w-lg text-sm text-white/75">
                  {project.liveNote ??
                    'Explore the published site on GitHub Pages — the interactions described above work in the browser.'}
                </p>
              </div>
              <ButtonLink href={project.liveUrl} variant="light" size="lg" icon={false} target="_blank" rel="noopener noreferrer">
                <Globe className="size-5" />
                View Live Website
                <ArrowUpRight className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </ButtonLink>
            </div>
          </Container>
        </section>
      )}

      {/* Figma CTA */}
      {project.figmaUrl && !project.liveUrl && (
        <section aria-labelledby="figma-cta" className="pb-14">
          <Container>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] bg-blue p-6 text-white sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.08em] text-white/70">Figma</p>
                <h2 id="figma-cta" className="display mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)]">
                  See the full design in Figma.
                </h2>
                <p className="mt-2 max-w-lg text-sm text-white/75">
                  Open the {project.brand ?? project.name} {project.category.toLowerCase()} file to explore every screen
                  and detail.
                </p>
              </div>
              <ButtonLink href={project.figmaUrl} variant="light" size="lg" icon={false} target="_blank" rel="noreferrer">
                <Frame className="size-5" />
                View Figma Design
                <ArrowUpRight className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </ButtonLink>
            </div>
          </Container>
        </section>
      )}

      {/* Previous / next within the collection */}
      {next && prev && (
        <nav aria-label="More projects" className="pb-16">
          <Container>
            <div className="grid gap-3 md:grid-cols-2">
              <a
                href={routes.project(prev.slug)}
                className="group flex min-w-0 items-center gap-5 rounded-[22px] bg-black/[0.035] p-6 transition-colors hover:bg-black/[0.06] sm:p-8"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-black/15 transition-colors group-hover:border-blue group-hover:text-blue">
                  <ArrowLeft className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.08em] text-black/50">Previous project</span>
                  <span className="mt-1 block truncate text-xl font-semibold tracking-tight group-hover:text-blue sm:text-2xl">
                    {prev.name}
                  </span>
                </span>
              </a>
              <a
                href={routes.project(next.slug)}
                className="group flex min-w-0 items-center justify-between gap-5 rounded-[22px] bg-black/[0.035] p-6 text-right transition-colors hover:bg-black/[0.06] sm:p-8"
              >
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.08em] text-black/50">Next project</span>
                  <span className="mt-1 block truncate text-xl font-semibold tracking-tight group-hover:text-blue sm:text-2xl">
                    {next.name}
                  </span>
                </span>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blue text-white transition-transform group-hover:translate-x-1">
                  <ArrowRight className="size-5" />
                </span>
              </a>
            </div>
            <div className="mt-6 flex justify-center">
              <ButtonLink href={backHref} variant="outline">
                {primaryService ? `All ${primaryService.title} projects` : 'All projects'}
              </ButtonLink>
            </div>
          </Container>
        </nav>
      )}
    </article>
  )
}

function ProjectLinks({ links }: { links: LinkItem[] }) {
  return (
    <div className="flex shrink-0 flex-wrap gap-2.5">
      {links.map(({ label, href, icon: Icon, variant, internal }) =>
        internal ? (
          <ButtonLink key={label} href={href} variant={variant} icon={false}>
            <Icon className="size-4" />
            {label}
          </ButtonLink>
        ) : (
          <ButtonLink key={label} href={href} variant={variant} icon={false} target="_blank" rel="noopener noreferrer">
            <Icon className="size-4" />
            {label}
            <ArrowUpRight className="size-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </ButtonLink>
        ),
      )}
    </div>
  )
}

/** Caption and key facts beside a vertical (9:16) cover. */
function VideoCaption({ project }: { project: Project }) {
  const facts = [
    ['Published', project.published],
    ['Editing software', project.software],
    ['Format', project.industry],
  ].filter((f): f is [string, string] => Boolean(f[1]))
  return (
    <>
      {facts.length > 0 && (
        <dl className="mt-6 grid gap-4 border-y border-black/10 py-5 sm:grid-cols-3">
          {facts.map(([term, value]) => (
            <div key={term}>
              <dt className="text-[11px] uppercase tracking-[0.08em] text-black/45">{term}</dt>
              <dd className="mt-1 text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {project.caption && (
        <figure className="mt-6">
          <figcaption className="text-[11px] font-medium uppercase tracking-[0.08em] text-black/45">Original caption</figcaption>
          <blockquote className="mt-3 space-y-2 border-l-2 border-blue pl-4 text-[15px] leading-relaxed text-black/75">
            {project.caption.split('\n').map((line) => (
              <p key={line}>{line}</p>
            ))}
          </blockquote>
        </figure>
      )}
    </>
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

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border border-black/[0.08] p-5">
      <dt className="text-[11px] uppercase tracking-[0.08em] text-black/50">{term}</dt>
      <dd className="mt-2 text-[15px] leading-relaxed text-black/75">{children}</dd>
    </div>
  )
}
