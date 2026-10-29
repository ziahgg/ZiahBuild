import { Clapperboard, Code2, LayoutTemplate, MonitorSmartphone, PenTool, ShoppingBag } from 'lucide-react'
import type { Service } from '../types'

export const services: Service[] = [
  {
    slug: 'ui-ux',
    number: '01',
    title: 'UI/UX Design',
    shortTitle: 'UI/UX',
    heading: 'UI/UX Design for Web, Mobile & Games',
    description:
      'User-centered interfaces for websites, web dashboards, and mobile apps — from user flows and wireframes to interactive prototypes, design systems, and polished responsive experiences.',
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
    title: 'Full-Stack Development',
    shortTitle: 'Full-Stack',
    heading: 'Full-Stack Development for Web, Mobile & Games',
    description:
      'End-to-end development for websites, interactive web dashboards, and mobile apps — combining responsive interfaces, backend systems, databases, authentication, and API integrations.',
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
      'Business websites, landing pages, SaaS marketing websites, and end-to-end implementation — designed in Figma, built and published live.',
    intro:
      'Real websites for ten different industries — each designed in Figma, built with React, TypeScript and Tailwind CSS, and published live on GitHub Pages. Open a case study to see the problem, the solution and how it was built.',
    icon: MonitorSmartphone,
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
