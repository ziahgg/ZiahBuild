import { Container } from '../components/Container'
import { Placeholder } from '../components/Placeholder'
import { SectionHeading } from '../components/SectionHeading'
import { socialGallery } from '../data/showcase'

export function SocialShowcase() {
  return (
    <section aria-labelledby="social-title" className="bg-black/[0.025] py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="social-title"
          eyebrow="Social media design"
          lead="Visuals That Make"
          muted="Brands Recognizable."
          description="Carousel posts, campaign graphics, promotional content, brand systems and reusable templates — designed to stay consistent across every post."
        />
        {/* CSS columns keep each item at its own aspect ratio — nothing is stretched or cropped. */}
        <ul className="mt-14 columns-1 gap-3 sm:columns-2 lg:columns-3">
          {socialGallery.map((item) => (
            <li key={item.title} className="group mb-3 break-inside-avoid">
              <figure>
                <div className="overflow-hidden rounded-[18px]" style={item.media.image ? undefined : { aspectRatio: item.aspect }}>
                  {item.media.image ? (
                    <img
                      src={item.media.image}
                      alt={item.media.alt ?? item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full"
                    />
                  ) : (
                    <Placeholder variant={item.media.placeholder} tone={item.media.tone} />
                  )}
                </div>
                <figcaption className="flex items-baseline justify-between gap-3 px-1 pb-3 pt-3">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="text-[11px] uppercase tracking-[0.08em] text-black/45">
                    {item.type} · {item.aspect?.replace(/\s/g, '')}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
