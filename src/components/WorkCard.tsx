import { ArrowUpRight } from 'lucide-react'
import { routes } from '../routes'
import type { Project } from '../types'
import { MediaFrame } from './MediaFrame'
import { Swoosh } from './Swoosh'

/** Project card used on the service work pages. */
export function WorkCard({ project, index }: { project: Project; index: number }) {
  const vertical = Boolean(project.media.width && project.media.height && project.media.height > project.media.width)
  return (
    <li>
      <a href={routes.project(project.slug)} className="group block rounded-[22px] focus-visible:outline-offset-8">
        {/* The frame matches the cover's own ratio (16:9 or 9:16 Reels), so nothing is cropped. */}
        <div
          className={`relative overflow-hidden rounded-[18px] ring-1 ring-black/[0.06] ${vertical ? 'aspect-[9/16]' : 'aspect-[16/9]'}`}
        >
          <MediaFrame
            media={project.media}
            sizes={vertical ? '(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw' : '(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw'}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute right-3 top-3 grid size-10 translate-y-1 place-items-center rounded-full bg-blue text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <Swoosh className="size-4" />
          </span>
        </div>
        <div className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.08em] text-black/50">
          <span className="tabular-nums text-blue">{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-6 bg-black/20" />
          <span>{project.brand ? `${project.brand} · ${project.kind}` : project.kind}</span>
        </div>
        <h3 className="mt-2.5 text-[clamp(1.35rem,2vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em] transition-colors group-hover:text-blue">
          {project.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-black/45">{project.industry ?? project.scope?.join(' · ') ?? project.category}</p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-black/65">{project.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
          View case study <Swoosh className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </a>
      {project.instagramUrl && (
        <a
          href={project.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-black/70 underline decoration-black/20 underline-offset-4 hover:text-blue hover:decoration-blue"
        >
          Watch on Instagram <ArrowUpRight className="size-4" />
          <span className="sr-only">: {project.name} (opens in a new tab)</span>
        </a>
      )}
    </li>
  )
}
