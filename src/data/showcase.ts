import type { GalleryItem } from '../types'

/*
 * Gallery content for the discipline showcases. Every entry renders a
 * designed placeholder until `media.image` is set.
 */

export const uiuxGallery: GalleryItem[] = [
  { title: 'High-fidelity interface', type: 'Product UI', media: { placeholder: 'dashboard', tone: 'light' } },
  { title: 'Design system foundations', type: 'Design system', media: { placeholder: 'system', tone: 'dark' } },
  { title: 'Component library', type: 'Components', media: { placeholder: 'components', tone: 'light' } },
  { title: 'Responsive layouts', type: 'Mobile & tablet', media: { placeholder: 'mobile', tone: 'blue' } },
  { title: 'Interactive prototype', type: 'Prototype', media: { placeholder: 'website', tone: 'light' } },
]

export const webCapabilities = [
  'Responsive frontend development',
  'Reusable component architecture',
  'TypeScript & React',
  'API integration',
  'Backend & database integration for client projects',
  'Maintainable, documented codebases',
]

export const webGallery: GalleryItem[] = [
  { title: 'Websites', type: 'Marketing & business sites', media: { placeholder: 'website', tone: 'light' } },
  { title: 'Dashboards', type: 'Data & admin interfaces', media: { placeholder: 'dashboard', tone: 'dark' } },
  { title: 'Application interfaces', type: 'Web apps', media: { placeholder: 'components', tone: 'light' } },
]

export const socialGallery: GalleryItem[] = [
  { title: 'Carousel series', type: 'Carousel post', aspect: '4 / 5', media: { placeholder: 'social', tone: 'blue' } },
  { title: 'Campaign key visual', type: 'Campaign graphic', aspect: '1 / 1', media: { placeholder: 'social', tone: 'dark' } },
  { title: 'Story template', type: 'Reusable template', aspect: '9 / 16', media: { placeholder: 'social', tone: 'light' } },
  { title: 'Launch promo', type: 'Promotional content', aspect: '1 / 1', media: { placeholder: 'social', tone: 'light' } },
  { title: 'Brand content system', type: 'Brand system', aspect: '4 / 5', media: { placeholder: 'system', tone: 'dark' } },
  { title: 'Feed banner', type: 'Campaign graphic', aspect: '16 / 9', media: { placeholder: 'social', tone: 'blue' } },
]

export const shopifyCapabilities = [
  'Shopify storefronts',
  'Product detail pages',
  'Collection pages',
  'Product imagery',
  'Promotional sections',
  'Responsive shopping',
]

export const shopifyGallery: GalleryItem[] = [
  { title: 'Storefront homepage', type: 'Storefront', media: { placeholder: 'store', tone: 'light' } },
  { title: 'Product detail page', type: 'Product page', media: { placeholder: 'product', tone: 'dark' } },
  { title: 'Mobile shopping', type: 'Responsive', media: { placeholder: 'mobile', tone: 'blue' } },
  { title: 'Collection page', type: 'Collection', media: { placeholder: 'store', tone: 'dark' } },
]

