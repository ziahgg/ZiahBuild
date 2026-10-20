import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { Eyebrow } from '../components/Eyebrow'
import { WorkCard } from '../components/WorkCard'
import { projectsForService } from '../data/projects'
import { services } from '../data/services'
import { routes } from '../routes'
import type { Service } from '../types'

/** Services whose collections are browsed side by side via the switcher. */
const designCollections = ['ui-ux', 'social-media'] as const

export function ServiceWorkPage({ service }: { service: Service }) {
  const work = projectsForService(service.slug)
  const Icon = service.icon
  const showSwitcher = (designCollections as readonly string[]).includes(service.slug)

  return (
    <>
      <section aria-labelledby="service-title" className="pt-28 sm:pt-36">
        <Container>
          <a href="#services" className="inline-flex items-center gap-2 text-sm text-black/55 hover:text-blue">
            <ArrowLeft className="size-4" /> All services
          </a>

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-3xl">
              <Eyebrow>
                Service {service.number} · {work.length} {work.length === 1 ? 'project' : 'projects'}
              </Eyebrow>
              <h1 id="service-title" className="display mt-5 text-[clamp(2.4rem,5.5vw,4.5rem)]">
                {service.title}
                <br />
                <span className="text-black/30">Selected Work.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-black/60 sm:text-base">{service.description}</p>
            </div>
            <span className="hidden size-28 place-items-center rounded-[22px] bg-blue text-white md:grid">
              <Icon aria-hidden="true" className="size-12" strokeWidth={1.6} />
            </span>
          </div>

          {showSwitcher && (
            <nav aria-label="Design collections" className="mt-10 inline-flex rounded-full bg-black/[0.05] p-1">
              {designCollections.map((slug) => {
                const s = services.find((x) => x.slug === slug)!
                const current = slug === service.slug
                return (
                  <a
                    key={slug}
                    href={routes.service(slug)}
                    aria-current={current ? 'page' : undefined}
                    className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors sm:px-5 ${
                      current ? 'bg-black text-white' : 'text-black/60 hover:text-black'
                    }`}
                  >
                    <span className="sm:hidden">{s.shortTitle === 'UI/UX' ? 'Website UI/UX' : 'Social Media'}</span>
                    <span className="hidden sm:inline">{s.title}</span>
                    <span className={`text-xs tabular-nums ${current ? 'text-white/60' : 'text-black/35'}`}>
                      {projectsForService(slug).length}
                    </span>
                  </a>
                )
              })}
            </nav>
          )}
        </Container>
      </section>

      <section aria-label={`${service.title} projects`} className="py-14 sm:py-16">
        <Container>
          {work.length > 0 ? (
            <ul className={`grid gap-x-4 gap-y-14 md:grid-cols-2 ${work.length > 4 ? 'xl:grid-cols-3' : ''}`}>
              {work.map((project, i) => (
                <WorkCard key={project.slug} project={project} index={i} />
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-start gap-6 rounded-[22px] border border-dashed border-black/20 p-8 sm:p-12">
              <p className="display text-[clamp(1.75rem,3.5vw,2.75rem)]">
                Work coming soon.
                <br />
                <span className="text-black/30">Projects for this service are being prepared.</span>
              </p>
              <ButtonLink href="#contact">Start a Project</ButtonLink>
            </div>
          )}
        </Container>
      </section>

      <section aria-labelledby="other-services" className="border-t border-black/10 py-14">
        <Container>
          <h2 id="other-services" className="text-[11px] font-medium uppercase tracking-[0.08em] text-black/50">
            Other services
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <li key={s.slug}>
                  <a
                    href={routes.service(s.slug)}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm text-black/75 transition-colors hover:border-blue hover:text-blue"
                  >
                    <span className="text-xs tabular-nums text-black/40">{s.number}</span> {s.title}
                  </a>
                </li>
              ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
