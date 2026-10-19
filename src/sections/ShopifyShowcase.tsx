import { Container } from '../components/Container'
import { MediaFrame } from '../components/MediaFrame'
import { SectionHeading } from '../components/SectionHeading'
import { shopifyCapabilities, shopifyGallery } from '../data/showcase'

const spans = ['md:col-span-8', 'md:col-span-4', 'md:col-span-4', 'md:col-span-8']

export function ShopifyShowcase() {
  return (
    <section aria-labelledby="shopify-title" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="shopify-title"
            align="left"
            eyebrow="Shopify & e-commerce"
            lead="Online Stores Designed"
            muted="for Better Experiences."
          />
          <ul className="flex max-w-md flex-wrap gap-1.5 md:justify-end md:pb-2">
            {shopifyCapabilities.map((c) => (
              <li key={c} className="rounded-full border border-black/10 px-3 py-1.5 text-xs text-black/70">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-14 grid gap-3 md:grid-cols-12">
          {shopifyGallery.map((item, i) => (
            <li key={item.title} className={`group relative h-[340px] overflow-hidden rounded-[22px] sm:h-[420px] ${spans[i % spans.length]}`}>
              <MediaFrame media={item.media} className="transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl bg-white/95 px-4 py-3 text-black shadow-sm">
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-[11px] uppercase tracking-[0.08em] text-black/45">{item.type}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
