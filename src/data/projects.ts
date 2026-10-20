import type { Project } from '../types'
import { socialMediaDesigns, websiteDesigns } from './designProjects'
import { developmentProjects } from './developmentProjects'
import { fullStackProjects } from './fullStackProjects'
import { videoProjects } from './videoProjects'

/**
 * Featured projects — shown on the homepage, on each service's "View work"
 * page (via `services`) and on their own project page (`#/work/<slug>`).
 *
 * To add a real cover image:
 *   1. put the file in src/assets/projects/
 *   2. `import kinoraCover from '../assets/projects/kinora.webp'`
 *   3. set `media: { image: kinoraCover, alt: '…', placeholder: 'dashboard' }`
 *
 * Buttons on the project page appear only for links that are filled in:
 * `figmaUrl` → "Open in Figma", `liveUrl` → "Visit Website", `githubUrl` → "GitHub".
 *
 * Please review before publishing: `kind`, `services`, and the overview /
 * problem / solution drafts below (written from the project briefs only —
 * no metrics or results have been added). `technologies` stays empty until
 * the stack is verified.
 */
const featuredFullStack = ['full-stack/luxestay-la', 'full-stack/theraflow', 'full-stack/voya'].map(
  (slug) => fullStackProjects.find((p) => p.slug === slug)!,
)

export const projects: Project[] = [
  {
    slug: 'kinora',
    name: 'Kinora',
    category: 'Elderly Care Management Platform',
    kind: 'Personal project',
    services: [],
    description:
      'A booking and management experience connecting care recipients, families, nurses, and service administrators.',
    overview:
      'Kinora brings everyone involved in elderly care into one platform — from booking a visit to managing schedules and services — with an interface designed to stay calm and clear for every type of user.',
    problem:
      'Arranging elderly care involves several parties — care recipients, family members, nurses and administrators — who each need different information. Without one shared place, booking and coordination become fragmented and hard to follow.',
    solution:
      'A single platform with role-specific experiences: straightforward booking for families, clear schedules for nurses, and management tools for administrators, all working from the same source of truth.',
    media: { placeholder: 'dashboard', tone: 'light' },
    technologies: [],
  },
  ...featuredFullStack,
]

/** Every project with its own page: featured projects plus all case-study collections. */
export const allProjects: Project[] = [
  ...projects.filter((p) => !p.services.includes('full-stack')),
  ...websiteDesigns,
  ...socialMediaDesigns,
  ...developmentProjects,
  ...fullStackProjects,
  ...videoProjects,
]

export const getProject = (slug: string) => allProjects.find((p) => p.slug === slug)

export const projectsForService = (slug: string) =>
  allProjects.filter((p) => (p.services as string[]).includes(slug))
