import type { LucideIcon } from 'lucide-react'

/** Illustration used when a real screenshot is not available yet. */
export type PreviewVariant =
  | 'dashboard'
  | 'website'
  | 'mobile'
  | 'store'
  | 'product'
  | 'social'
  | 'system'
  | 'components'
  | 'wireframe'
  | 'video'
  | 'portrait'

export type Tone = 'light' | 'dark' | 'blue' | 'ghost'

/** Either a real image or a designed placeholder. */
export interface Media {
  /** Imported asset URL (e.g. `import shot from '../assets/kinora.webp'`). */
  image?: string
  /** Smaller version of `image` for grids (e.g. a 1280px JPEG). */
  thumb?: string
  /** Intrinsic size of `image`, used to reserve space and avoid cropping. */
  width?: number
  height?: number
  alt?: string
  placeholder: PreviewVariant
  tone?: Tone
}

export type ProjectKind = 'Client project' | 'Personal project' | 'Concept'

export type ServiceSlug = 'ui-ux' | 'social-media' | 'full-stack' | 'shopify' | 'video' | 'websites'

export interface Project {
  slug: string
  name: string
  category: string
  kind: ProjectKind
  /** Short summary used on cards. */
  description: string
  /** Cover image shown on cards and at the top of the project page. */
  media: Media
  /** Services this project appears under on the "View work" pages. */
  services: ServiceSlug[]
  /** Brand name shown in the design, e.g. "AERIS". */
  brand?: string
  /** Deliverables, e.g. ["Desktop", "Mobile"] or ["Carousels", "Posts", "Reels"]. */
  scope?: string[]
  /** Longer introduction on the project page. */
  overview?: string
  /** Who the design is for. */
  audience?: string
  /** The main design objective. */
  objective?: string
  /** The problem the project addresses. */
  problem?: string
  /** How the design / build solves it. */
  solution?: string
  /** Key design decisions shown on the project page. */
  considerations?: { title: string; text: string }[]
  /** Only list technologies that were actually used. */
  technologies: string[]
  figmaUrl?: string
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
}

export interface Service {
  slug: ServiceSlug
  number: string
  title: string
  shortTitle: string
  description: string
  icon: LucideIcon
}

export interface GalleryItem {
  title: string
  type: string
  media: Media
  /** CSS aspect-ratio, e.g. "4 / 5". */
  aspect?: string
  href?: string
}

export interface VideoItem {
  title: string
  category: string
  orientation: 'horizontal' | 'vertical'
  /** Local file in /public (e.g. "videos/reel.mp4") or a public URL. */
  src?: string
  poster?: string
}

export interface SocialLink {
  label: string
  href: string
}
