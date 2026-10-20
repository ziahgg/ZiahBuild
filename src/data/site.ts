import type { SocialLink } from '../types'

/**
 * Global site content. Fill in the empty values when they are available —
 * every link and button that depends on them is hidden until then, so the
 * site never shows a control that does nothing.
 */
export const site = {
  name: 'ZiahBuild',
  statement: 'Design, development and content — one creative mind, built to work together.',
  /** Public contact email, used for `mailto:` links. */
  email: 'nurfauziahmakmur6@gmail.com',
  /** Public phone number in international format, used for `tel:` links. */
  phone: '+6285232396140',
  /** WhatsApp chat link — every "contact me" button opens this. */
  whatsappUrl: 'https://wa.me/qr/2KO3ILDBLTHUG1',
  /** Path inside /public, e.g. "ZiahBuild-CV.pdf". Leave empty if there is no CV. */
  cvFile: '',
  /** Professional profiles, e.g. { label: 'LinkedIn', href: 'https://…' }. */
  socials: [] as SocialLink[],
  /** Optional short biography shown in the About section. */
  bio: '',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const

export const expertise = [
  'UI/UX Design',
  'Figma',
  'Social Media Design',
  'Full-Stack Development',
  'Shopify',
  'Video Editing',
]

/** Resolves a file in /public against the deployed base path. */
export const publicUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const tel = () => (site.phone ? `tel:${site.phone.replace(/[^\d+]/g, '')}` : '')

/** Props for contact buttons: open the WhatsApp chat in a new tab. */
export const whatsappLink = {
  href: site.whatsappUrl,
  target: '_blank',
  rel: 'noopener noreferrer',
} as const

export const mailto = (subject?: string) =>
  site.email ? `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}` : ''
