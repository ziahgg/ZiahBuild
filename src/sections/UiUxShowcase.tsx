import { useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { Container } from '../components/Container'
import { MediaFrame } from '../components/MediaFrame'
import { Placeholder } from '../components/Placeholder'
import { SectionHeading } from '../components/SectionHeading'
import { uiuxGallery } from '../data/showcase'
import type { GalleryItem } from '../types'

const spans = ['lg:col-span-8 lg:row-span-2', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-6', 'lg:col-span-6']

export function UiUxShowcase() {
  return (
    <section aria-labelledby="uiux-title" className="bg-black/[0.025] py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="uiux-title"
            align="left"
            eyebrow="UI/UX & Figma"
            lead="Thoughtful Interfaces."
            muted="Every Detail Matters."
          />
          <p className="max-w-sm text-[15px] leading-relaxed text-black/60 md:pb-2 md:text-right">
            High-fidelity screens, design systems, component libraries, responsive layouts and prototypes — built in
            Figma, ready for development.
          </p>
        </div>

        <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[260px]">
          {uiuxGallery.map((item, i) => (
            <GalleryTile key={item.title} item={item} className={`${spans[i % spans.length]} ${i === 0 ? 'sm:col-span-2' : ''}`} />
          ))}
        </ul>

        <CompareSlider />
      </Container>
    </section>
  )
}

function GalleryTile({ item, className = '' }: { item: GalleryItem; className?: string }) {
  const body = (
    <>
      <div className="absolute inset-0">
        <MediaFrame media={item.media} className="transition-transform duration-700 group-hover:scale-[1.02]" />
      </div>
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl bg-white/95 px-4 py-3 text-black shadow-sm backdrop-blur">
        <span className="text-sm font-medium">{item.title}</span>
        <span className="text-[11px] uppercase tracking-[0.08em] text-black/45">{item.type}</span>
      </div>
    </>
  )
  return (
    <li className={`group relative min-h-[260px] overflow-hidden rounded-[22px] ${className}`}>
      {item.href ? (
        <a href={item.href} target="_blank" rel="noreferrer" className="absolute inset-0">
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  )
}

/** Drag/keyboard-controlled wireframe → final comparison. */
function CompareSlider() {
  const [pos, setPos] = useState(50)
  return (
    <figure className="mt-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] ring-blue ring-offset-2 has-[input:focus-visible]:ring-2 sm:aspect-[21/9]">
        <div className="absolute inset-0">
          <Placeholder variant="website" tone="light" label="Final design" />
        </div>
        <div className="absolute inset-0 bg-white" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Placeholder variant="wireframe" tone="light" label="Wireframe" className="bg-white" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-px bg-blue" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-blue text-white shadow-lg">
            <MoveHorizontal className="size-4" />
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare wireframe and final design"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-4 flex items-center justify-between text-sm text-black/55">
        <span>Wireframe → final design</span>
        <span className="hidden sm:inline">Drag to compare</span>
      </figcaption>
    </figure>
  )
}
