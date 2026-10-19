import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { Swoosh } from '../components/Swoosh'
import { projectsForService } from '../data/projects'
import { services } from '../data/services'
import { routes } from '../routes'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-black/[0.025] pt-24 sm:pt-28">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="services-title"
            align="left"
            eyebrow="Services"
            lead="What I Can Build"
            muted="With You."
          />
          <p className="max-w-sm text-[15px] leading-relaxed text-black/60 md:pb-2 md:text-right">
            From interface design to technical implementation, social content to ecommerce — six disciplines that work
            better together.
          </p>
        </div>
      </Container>

      <div className="mt-14 bg-black text-white">
        <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ slug, number, title, shortTitle, description, icon: Icon }) => {
            const count = projectsForService(slug).length
            return (
            <li
              key={number}
              className="group relative flex min-h-[320px] flex-col border-b border-white/15 p-6 sm:border-r sm:p-8 lg:[&:nth-child(3n)]:border-r-0"
            >
              <div className="flex items-center justify-between text-[11px] text-white/50">
                <span>
                  {number} — {title}
                </span>
                <Icon
                  aria-hidden="true"
                  className="size-5 text-white/40 transition-colors duration-300 group-hover:text-blue"
                />
              </div>
              <h3 className="display mt-10 text-[clamp(2.25rem,4vw,3.25rem)] transition-colors duration-300 group-hover:text-blue">
                {shortTitle}
              </h3>
              <p className="mt-auto max-w-sm pt-6 text-sm leading-relaxed text-white/60">{description}</p>
              <a
                href={routes.service(slug)}
                className="group/btn mt-6 inline-flex h-10 w-fit items-center gap-2 rounded-full border border-white/25 px-4 text-[13px] font-medium text-white transition-colors hover:border-blue hover:bg-blue"
              >
                View work
                <span className="rounded-full bg-white/15 px-1.5 text-[11px] tabular-nums">{count}</span>
                <Swoosh className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
                <span className="sr-only">for {title}</span>
              </a>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-blue transition-transform duration-500 group-hover:scale-x-100"
              />
            </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
