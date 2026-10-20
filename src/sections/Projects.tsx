import { ArrowUpRight } from 'lucide-react'
import { Container } from '../components/Container'
import { MediaFrame } from '../components/MediaFrame'
import { SectionHeading } from '../components/SectionHeading'
import { projects } from '../data/projects'
import { Swoosh } from '../components/Swoosh'
import { routes } from '../routes'
import type { Project } from '../types'

/*
 * Grid slots, repeated in order if more projects are added to the data file.
 */
const layout = [
  // Equal 16:9 slots match the exported 1920×1080 covers, so nothing is cropped.
  { span: 'lg:col-span-6', media: 'aspect-[16/9]' },
] as { span: string; media: string; wide?: boolean }[]

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="projects-title"
          eyebrow="Selected projects"
          lead="A Selection of"
          muted="Things I've Built."
          description="Products, platforms and websites — from first concept to interface design and build. Each entry notes whether it is client work, a personal project or a concept."
        />
        <ul className="mt-16 grid gap-x-3 gap-y-12 lg:grid-cols-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} slot={layout[i % layout.length]} />
          ))}
        </ul>
      </Container>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  slot,
}: {
  project: Project
  index: number
  slot: (typeof layout)[number]
}) {
  const links = [
    project.caseStudyUrl && { label: 'Case study', href: project.caseStudyUrl },
    project.liveUrl && { label: 'Live site', href: project.liveUrl },
    project.githubUrl && { label: 'GitHub', href: project.githubUrl },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <li id={`project-${project.slug}`} className={`group scroll-mt-28 ${slot.span}`}>
      <article className={slot.wide ? 'grid gap-6 lg:grid-cols-12 lg:items-end' : ''}>
        <a
          href={routes.project(project.slug)}
          tabIndex={-1}
          aria-hidden="true"
          className={`block overflow-hidden rounded-[22px] ${slot.media} ${slot.wide ? 'lg:col-span-8' : ''}`}
        >
          <MediaFrame
            media={project.media}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </a>
        <div className={`mt-6 ${slot.wide ? 'lg:col-span-4 lg:mt-0 lg:pb-2' : ''}`}>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.08em] text-black/50">
            <span className="tabular-nums text-blue">{String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-6 bg-black/20" />
            <span>{project.kind}</span>
          </div>
          <h3 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.035em]">
            <a href={routes.project(project.slug)} className="transition-colors hover:text-blue">
              {project.name}
            </a>
          </h3>
          <p className="mt-1 text-[15px] font-medium text-black/45">{project.category}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-black/65">{project.description}</p>
          {project.technologies.length > 0 && (
            <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <li key={t} className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/70">
                  {t}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={routes.project(project.slug)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue hover:text-black"
            >
              View project <Swoosh className="size-4" />
              <span className="sr-only">{project.name}</span>
            </a>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium underline decoration-black/20 underline-offset-4 hover:text-blue hover:decoration-blue"
                >
                  {link.label}
                  <ArrowUpRight className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
          </div>
        </div>
      </article>
    </li>
  )
}
