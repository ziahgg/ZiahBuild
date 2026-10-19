import { Check } from 'lucide-react'
import { Container } from '../components/Container'
import { Eyebrow } from '../components/Eyebrow'
import { MediaFrame } from '../components/MediaFrame'
import { Placeholder } from '../components/Placeholder'
import { webCapabilities, webGallery } from '../data/showcase'

export function WebShowcase() {
  return (
    <section aria-labelledby="web-title" className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="flex flex-col rounded-[22px] bg-black/[0.86] p-6 text-white sm:p-8 lg:min-h-[580px]">
            <Eyebrow inverted>Web development</Eyebrow>
            <h2 id="web-title" className="display mt-5 text-[clamp(2.25rem,4.4vw,3.6rem)]">
              Designed Beautifully.
              <br />
              <span className="text-white/45">Built to Function.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              Websites, dashboards and application interfaces built with a focus on structure, performance and code
              that stays easy to change.
            </p>
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:mt-auto">
              {webCapabilities.map((c) => (
                <li key={c} className="flex items-start gap-2.5 border-t border-white/10 pt-3 text-sm text-white/80">
                  <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-blue" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[22px] lg:min-h-[580px]">
            <Placeholder variant="website" tone="blue" />
          </div>
        </div>

        <ul className="mt-3 grid gap-3 md:grid-cols-3">
          {webGallery.map((item) => (
            <li key={item.title} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-[22px]">
                <MediaFrame media={item.media} className="transition-transform duration-700 group-hover:scale-[1.02]" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="text-xs text-black/50">{item.type}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-black/45">
          Backend, database and authentication work is offered for client projects. This portfolio itself is a fully
          static site.
        </p>
      </Container>
    </section>
  )
}
