import type { Media } from '../types'
import { Placeholder } from './Placeholder'

interface MediaFrameProps {
  media: Media
  className?: string
  label?: string | false
  /** "thumb" serves the lighter grid image; "full" adds a srcset with the original. */
  size?: 'thumb' | 'full'
  /** Load immediately (above-the-fold hero images). */
  eager?: boolean
  sizes?: string
}

/** Shows the real image when one is provided, otherwise a designed placeholder. */
export function MediaFrame({ media, className = '', label, size = 'thumb', eager = false, sizes }: MediaFrameProps) {
  if (media.image) {
    const src = size === 'thumb' ? (media.thumb ?? media.image) : media.image
    const srcSet = size === 'full' && media.thumb && media.width ? `${media.thumb} 1280w, ${media.image} ${media.width}w` : undefined
    return (
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? (sizes ?? '100vw') : undefined}
        alt={media.alt ?? ''}
        width={media.width}
        height={media.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
        className={`h-full w-full bg-black/[0.04] object-cover ${className}`}
      />
    )
  }
  return <Placeholder variant={media.placeholder} tone={media.tone} className={className} label={label} />
}
