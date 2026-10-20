import { ArrowUpRight } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { MediaFrame } from '../components/MediaFrame'
import { SectionHeading } from '../components/SectionHeading'
import { Swoosh } from '../components/Swoosh'
import { videoProjects } from '../data/videoProjects'
import { routes } from '../routes'

export function VideoShowcase() {
  return (
    <section aria-labelledby="video-title" className="bg-black py-24 text-white sm:py-32">
      <Container>
        <SectionHeading
          id="video-title"
          inverted
          eyebrow="Video editing"
          lead="Stories Told"
          muted="Through Motion."
          description="Short-form Reels edited in CapCut — turning news, business ideas and customer insights into clear, vertical stories."
        />
        <ul className="mt-14 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4">
          {videoProjects.map((reel) => (
            <li key={reel.slug}>
              <a href={routes.project(reel.slug)} className="group block rounded-[18px] focus-visible:outline-offset-8">
                <div className="aspect-[9/16] overflow-hidden rounded-[18px] bg-white/5 ring-1 ring-white/10">
                  <MediaFrame
                    media={reel.media}
                    sizes="(min-width: 1024px) 23vw, 46vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight transition-colors group-hover:text-blue">
                  {reel.name}
                </h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-white/45">Instagram Reel · 9:16</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
                  Case study <Swoosh className="size-4" />
                </span>
              </a>
              <a
                href={reel.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
              >
                Watch on Instagram <ArrowUpRight className="size-4" />
                <span className="sr-only">: {reel.name} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-14">
          <ButtonLink href={routes.service('video')} variant="light">
            View all video work
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
