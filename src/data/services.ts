import { Clapperboard, Code2, LayoutTemplate, MonitorSmartphone, PenTool, ShoppingBag } from 'lucide-react'
import type { Service } from '../types'

export const services: Service[] = [
  {
    slug: 'ui-ux',
    number: '01',
    title: 'UI/UX Design & Figma',
    shortTitle: 'UI/UX',
    description:
      'User flows, wireframes, prototypes, design systems, reusable components, and polished interface design.',
    icon: PenTool,
  },
  {
    slug: 'social-media',
    number: '02',
    title: 'Social Media Design',
    shortTitle: 'Social',
    description:
      'Carousel posts, campaign graphics, content templates, promotional visuals, and cohesive visual systems.',
    icon: LayoutTemplate,
  },
  {
    slug: 'full-stack',
    number: '03',
    title: 'Full-Stack Web Development',
    shortTitle: 'Full-Stack',
    description:
      'Responsive frontends, backend functionality where appropriate, databases, authentication, and API integrations.',
    icon: Code2,
  },
  {
    slug: 'shopify',
    number: '04',
    title: 'Shopify Website Design',
    shortTitle: 'Shopify',
    description:
      'Storefronts, product pages, collection pages, ecommerce layouts, and responsive shopping experiences.',
    icon: ShoppingBag,
  },
  {
    slug: 'video',
    number: '05',
    title: 'Video Editing',
    shortTitle: 'Video',
    description: 'Short-form content, promotional videos, product showcases, and visual storytelling.',
    icon: Clapperboard,
  },
  {
    slug: 'websites',
    number: '06',
    title: 'Website Design & Development',
    shortTitle: 'Websites',
    description:
      'Business websites, landing pages, SaaS marketing websites, portfolio websites, and end-to-end implementation.',
    icon: MonitorSmartphone,
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
