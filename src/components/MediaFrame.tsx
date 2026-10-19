import type { Media } from '../types'
import { Placeholder } from './Placeholder'

/** Shows the real image when one is provided, otherwise a designed placeholder. */
export function MediaFrame({ media, className = '', label }: { media: Media; className?: string; label?: string | false }) {
  if (media.image) {
    return (
      <img
        src={media.image}
        alt={media.alt ?? ''}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }
  return <Placeholder variant={media.placeholder} tone={media.tone} className={className} label={label} />
}
