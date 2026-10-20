import type { Project } from '../types'

/**
 * Editorial sections for video case studies: the original caption and the
 * objective / direction / editing / reflection narrative. Renders nothing
 * for projects without `sections` or `caption`.
 */
export function VideoSections({ project, showCaption = true }: { project: Project; showCaption?: boolean }) {
  const caption = showCaption ? project.caption : undefined
  const { sections } = project
  if (!caption && !sections) return null
  return (
    <>
      {caption && (
        <figure className="mt-12 rounded-[22px] bg-black/[0.035] p-6 sm:p-8">
          <figcaption className="text-[11px] font-medium uppercase tracking-[0.08em] text-black/45">
            Original caption{project.published ? ` · ${project.published}` : ''}
          </figcaption>
          <blockquote className="mt-4 space-y-2 text-[15px] leading-relaxed text-black/75">
            {caption.split('\n').map((line) => (
              <p key={line}>{line}</p>
            ))}
          </blockquote>
        </figure>
      )}

      {sections && sections.length > 0 && (
        <ol className="mt-12 divide-y divide-black/10 border-y border-black/10">
          {sections.map((section, i) => (
            <li key={section.title} className="grid gap-3 py-8 md:grid-cols-[220px_1fr] md:gap-10">
              <h2 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight">
                <span className="text-xs tabular-nums text-blue">{String(i + 1).padStart(2, '0')}</span>
                {section.title}
              </h2>
              <div>
                <p className="text-[15px] leading-relaxed text-black/75">{section.text}</p>
                {section.note && <p className="mt-3 text-xs leading-relaxed text-black/45">{section.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      )}
    </>
  )
}
