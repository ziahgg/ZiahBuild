import { Clapperboard, Code2, Frame, LayoutTemplate, MonitorSmartphone, PenTool, ShoppingBag } from 'lucide-react'

const items = [
  { label: 'UI/UX Design', icon: PenTool },
  { label: 'Figma', icon: Frame },
  { label: 'Social Media', icon: LayoutTemplate },
  { label: 'Full-Stack', icon: Code2 },
  { label: 'Shopify', icon: ShoppingBag },
  { label: 'Video Editing', icon: Clapperboard },
  { label: 'Web Design', icon: MonitorSmartphone },
]

/** Disciplines strip — mirrors the logo row under the hero. */
export function Marquee() {
  return (
    <div className="fade-x mx-auto mt-10 max-w-4xl overflow-hidden py-4" aria-label="Disciplines">
      <ul className="flex w-max animate-marquee gap-12 motion-reduce:animate-none">
        {[...items, ...items].map(({ label, icon: Icon }, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-black/80"
          >
            <Icon className="size-5" strokeWidth={2.2} />
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
