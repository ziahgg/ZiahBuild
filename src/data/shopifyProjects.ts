import type { Project } from '../types'
import { publicUrl } from './site'

/*
 * Shopify Website Design.
 *
 * Copy is based on the live store at https://shepsfarm.com/ (reviewed October
 * 2026): its homepage content, and the page source, which confirms it runs on
 * Shopify with the Horizon theme. No metrics, reviews or responsibilities beyond
 * the service category are claimed.
 *
 * Cover: /public/covers/shopify/sheps-farm-cover.png (original 1920×1080 PNG)
 * plus a 1280px JPEG for grids.
 */

const LIVE_EVIDENCE = 'Based on the live store at shepsfarm.com, reviewed October 2026.'

export const shopifyProjects: Project[] = [
  {
    slug: 'shopify/sheps-farm',
    name: 'Sheps Farm',
    category: 'Shopify Website Design',
    industry: 'Ontario beef tallow · Shopify store',
    kind: 'Live store',
    services: ['shopify'],
    scope: ['Shopify storefront', 'Desktop', 'Mobile'],
    technologies: ['Shopify', 'Horizon theme'],
    liveUrl: 'https://shepsfarm.com/',
    liveNote: 'Visit the live Shopify store at shepsfarm.com to browse the product and storefront.',
    description:
      'A Shopify storefront for an Ontario beef-tallow brand — a product-first homepage, a clear quality story and subscribe-and-save purchasing.',
    overview:
      'Sheps Farm sells beef tallow made in Ontario. Its Shopify store brings the product, its purchase options and the reasons it is different together on one homepage — from where the fat comes from to the batch date stamped on every lid.',
    audience: 'Home cooks and natural-skincare buyers in Ontario looking for clearly sourced, high-quality tallow.',
    objective: 'Explain why this tallow is different, and make buying it — once or by subscription — straightforward.',
    objectiveLabel: 'Store objective',
    sections: [
      {
        title: 'Store structure',
        text: 'The homepage leads with a single promise, “The purest tallow you can buy”, supported by four facts: kidney suet only, double rendered, water-rendered for zero odour, and a batch date stamped on every lid. The featured product sits directly below, with one-time purchase and Subscribe & Save 15% options, so visitors can add to cart without leaving the homepage. Navigation covers Home, About us, Shop, How it works and Blog.',
        note: LIVE_EVIDENCE,
      },
      {
        title: 'Communicating quality',
        text: 'Product claims are organised into scannable blocks: “Not all tallow is created equal” with four differentiators, a six-step “How we render it. The long way.” process, and “Endless uses” covering cooking, baking, deep frying and skincare. A short founder quote reinforces the batch-dating promise.',
        note: LIVE_EVIDENCE,
      },
      {
        title: 'Clarity for buyers',
        text: 'An announcement bar states up front that products are sold and delivered within Ontario only. Prices show in CAD with a currency selector in the header, and an email sign-up offers 10% off a first order.',
        note: LIVE_EVIDENCE,
      },
      {
        title: 'Visual identity',
        text: 'A green announcement bar, warm cream backgrounds and orange primary buttons carry the brand, with bold rounded headlines that highlight a single word. Product photography is labelled with badges such as “Batch dated” and “Kidney suet only”, and a scrolling ticker repeats the key product facts. On mobile, the product image sits above the headline and the buttons go full width.',
        note: LIVE_EVIDENCE,
      },
    ],
    media: {
      image: publicUrl('covers/shopify/sheps-farm-cover.png'),
      thumb: publicUrl('covers/shopify/sheps-farm-cover-1280.jpg'),
      width: 1920,
      height: 1080,
      alt: 'Sheps Farm cover: the Shopify store homepage on desktop and mobile, with the headline “The purest tallow you can buy” and a tub of pure beef tallow',
      placeholder: 'store',
    },
  },
]
