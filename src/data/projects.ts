import type { Project } from '../types'
import { socialMediaDesigns, websiteDesigns } from './designProjects'
import { developmentProjects } from './developmentProjects'

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
  {
    slug: 'huddlflow',
    name: 'HuddlFlow',
    category: 'AI Meeting & Team Collaboration SaaS',
    kind: 'Concept',
    services: [],
    description:
      'A meeting productivity concept combining transcripts, AI-generated notes, task management, and team collaboration.',
    overview:
      'HuddlFlow is a SaaS concept exploring how a team workspace can capture a meeting and carry it forward — from the conversation itself to the notes, decisions and tasks that follow.',
    problem:
      'Meeting outcomes are easily lost between the call, scattered notes and separate task tools, so decisions are not always turned into clear, owned actions.',
    solution:
      'One collaborative workspace that connects transcripts, AI-generated notes and task management, so what was discussed flows directly into what needs to be done.',
    media: { placeholder: 'dashboard', tone: 'dark' },
    technologies: [],
  },
  {
    slug: 'luxestay-la',
    name: 'LuxeStay LA',
    category: 'Furnished Apartment Website',
    kind: 'Personal project',
    services: [],
    description:
      'A premium furnished-apartment website with an elevated hospitality aesthetic and a resident dashboard experience.',
    overview:
      'LuxeStay LA presents furnished apartments with the feel of a premium hospitality brand, paired with a resident dashboard for life after move-in.',
    problem:
      'Furnished-apartment listings often feel generic and fail to communicate a premium stay, and residents have no single place to manage their stay once they arrive.',
    solution:
      'An editorial, hospitality-inspired website that showcases each residence with care, combined with a resident dashboard experience that keeps everything in one place.',
    media: { placeholder: 'website', tone: 'dark' },
    technologies: [],
  },
  {
    slug: 'theraflow',
    name: 'TheraFlow',
    category: 'Digital Product / Application',
    kind: 'Personal project',
    services: [],
    description:
      'A digital product with a focused application experience. Interface designs and full scope will be added here.',
    media: { placeholder: 'mobile', tone: 'blue' },
    technologies: [],
  },
  {
    slug: 'voya',
    name: 'VOYA',
    category: 'Travel Planning Application',
    kind: 'Personal project',
    services: [],
    description:
      'A travel-planning application focused on organizing trips and creating a cohesive digital experience.',
    overview:
      'VOYA is a travel-planning application that turns the many moving parts of a trip into one organized, enjoyable experience.',
    problem:
      'Trip details are usually spread across bookings, notes and different apps, which makes planning harder to follow — before and during the trip.',
    solution:
      'A cohesive app experience that organizes each trip in one place, with a clear structure that keeps plans easy to review and update.',
    media: { placeholder: 'mobile', tone: 'light' },
    technologies: [],
  },
]

/** Every project with its own page: featured projects plus the design case studies. */
export const allProjects: Project[] = [...projects, ...websiteDesigns, ...socialMediaDesigns, ...developmentProjects]

export const getProject = (slug: string) => allProjects.find((p) => p.slug === slug)

export const projectsForService = (slug: string) =>
  allProjects.filter((p) => (p.services as string[]).includes(slug))
