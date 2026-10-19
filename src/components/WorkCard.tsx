import { routes } from '../routes'
import type { Project } from '../types'
import { MediaFrame } from './MediaFrame'
import { Swoosh } from './Swoosh'

/** Project card used on the service work pages and "more work" lists. */
export function WorkCard({ project, index }: { project: Project; index: number }) {
  return (
    <li>
      <a href={routes.project(project.slug)} className="group block">
        <div className="aspect-[4/3] overflow-hidden rounded-[22px]">
          <MediaFrame
            media={project.media}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.08em] text-black/50">
          <span className="tabular-nums text-blue">{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-6 bg-black/20" />
          <span>{project.kind}</span>
        </div>
        <h3 className="mt-2.5 text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.035em] transition-colors group-hover:text-blue">
          {project.name}
        </h3>
        <p className="mt-1 text-[15px] font-medium text-black/45">{project.category}</p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-black/65">{project.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue">
          View project <Swoosh className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </a>
    </li>
  )
}
