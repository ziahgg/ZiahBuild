import { Braces, Layers, PenTool } from 'lucide-react'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'

const strengths = [
  {
    title: 'Design with Purpose',
    description: 'Every layout, color and interaction starts from a goal — so the visuals explain, guide and convert.',
    icon: PenTool,
  },
  {
    title: 'Build with Precision',
    description: 'Designs become clean, responsive, accessible code that behaves exactly the way it was intended.',
    icon: Braces,
  },
  {
    title: 'Create with Consistency',
    description: 'Shared systems across web, product, social and video keep a brand recognizable everywhere it appears.',
    icon: Layers,
  },
]

export function Introduction() {
  return (
    <section aria-labelledby="intro-title" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="intro-title"
          eyebrow="My approach"
          lead="From First Sketch"
          muted="to Final Product."
          description="I combine design thinking, visual communication and technical implementation — so ideas move from a rough sketch to a working product without losing their intent along the way."
        />
        <ol className="mx-auto mt-14 grid max-w-[1080px] gap-3 md:grid-cols-3">
          {strengths.map(({ title, description, icon: Icon }, i) => (
            <li
              key={title}
              className="group flex min-h-[340px] flex-col rounded-2xl border border-black/[0.08] bg-white p-6 transition-colors duration-300 hover:border-black/20"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
                <span className="text-xs tabular-nums text-black/35">0{i + 1}</span>
              </div>
              <div className="flex flex-1 items-center justify-center py-8">
                <Icon
                  aria-hidden="true"
                  className="size-24 text-black/30 transition-colors duration-300 group-hover:text-blue"
                  strokeWidth={1.6}
                />
              </div>
              <p className="max-w-[30ch] text-[13px] leading-relaxed text-black/60">{description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
