import type { Project, ServiceSlug } from '../types'
import { publicUrl } from './site'

/*
 * Design case studies: 10 website UI/UX designs and 10 matching social media
 * designs, built in Figma ("Ziah's Portfolio — 2026").
 *
 * Covers come from Portfolio-Covers-Export.zip and live in /public/covers/:
 *   <slug>-<category>-cover.png       original 1920×1080 export (project page)
 *   <slug>-<category>-cover-1280.jpg  1280px version for grids
 *
 * Source file → cover mapping (explicit, by filename — not by order):
 *   01-Clothing-Fashion-*                          → clothing-fashion
 *   02-Plumbing-*                                  → plumbing
 *   03-Solar-Energy-*                              → solar-energy
 *   04-AI-Powered-CRM-Automation-Sales-Management-* → ai-crm-automation
 *   05-Skin-Clinic-*                               → skin-clinic
 *   06-Legal-Service-*                             → legal-service
 *   07-Architecture-Studio-*                       → architecture-studio
 *   08-Crypto-Trading-*                            → crypto-trading
 *   09-Tennis-Website-Design-*                     → tennis
 *   10-Finance-*                                   → finance
 *
 * Nuvora (mobile app, page "Nuvora" — node 2613-2111) has no export in that
 * zip: its cover in /public/covers/app-design/ is composed from three of the
 * file's own frames (Welcome, Dashboard, Finance Overview), unretouched.
 * Montra (2623-3659), PulseFit (2623-3660) and Cravora (2623-3661) are covered
 * the same way, from three exported frames of each page:
 *   Montra   — Transactions, Home, Reports
 *   PulseFit — Home, Active Workout, Activity
 *   Cravora  — Restaurant Details, Home, Cart
 * Nestora (274-5177) and Taskora (274-5178) are pages in the separate
 * "ziahdesign" file; their covers use three frames from each page's export
 * (Nestora_Portfolio_Export.zip, Taskora_Portfolio_Export.zip):
 *   Nestora  — Search Results, Discover, Property Details
 *   Taskora  — Task Details, Home, Kanban
 *
 * Copy is written from what is visible in each design. The brands and
 * on-screen figures are part of the design concepts — no client results,
 * metrics or outcomes are claimed.
 */

const FIGMA = 'https://www.figma.com/design/olXEM3pl6a0vHZU4HZ8rFz/Ziah-s-Portfolio---2026?node-id='
/** Nestora and Taskora live in the separate "ziahdesign" file. */
const ZIAHDESIGN = 'https://www.figma.com/design/BaGGNADHasoA3oYRZ1L3mv/ziahdesign?node-id='

type Category = 'website' | 'social-media' | 'app-design'

interface DesignInput {
  slug: string
  name: string
  /** Omitted when the product name is the brand (e.g. Nuvora). */
  brand?: string
  /** Figma node id, e.g. "2603-115". */
  node: string
  /** Base URL of another Figma file (defaults to the portfolio file). */
  figmaFile?: string
  description: string
  overview: string
  audience: string
  objective: string
  problem: string
  solution: string
  considerations: { title: string; text: string }[]
  /** Overrides the category's default cover alt text. */
  coverAlt?: string
}

const meta: Record<Category, { service: ServiceSlug; category: string; scope: string[]; alt: string }> = {
  website: {
    service: 'ui-ux',
    category: 'Website UI/UX Design',
    scope: ['Homepage UI', 'Desktop', 'Mobile'],
    alt: 'website design — desktop and mobile homepage mockups',
  },
  'social-media': {
    service: 'social-media',
    category: 'Social Media Design',
    scope: ['Carousels', 'Posts', 'Reels'],
    alt: 'social media design — carousel, post and reel mockups',
  },
  'app-design': {
    service: 'ui-ux',
    category: 'Mobile App UI/UX Design',
    scope: ['Mobile app', 'Design system', 'Prototype'],
    alt: 'mobile app design — onboarding, dashboard and finance screens',
  },
}

const placeholders = { website: 'website', 'social-media': 'social', 'app-design': 'mobile' } as const

function design(category: Category, input: DesignInput): Project {
  const { node, slug, coverAlt, figmaFile, ...rest } = input
  const m = meta[category]
  const file = `covers/${category}/${slug}-${category}-cover`
  return {
    ...rest,
    slug: `${slug}-${category}`,
    category: m.category,
    kind: 'Concept',
    scope: m.scope,
    services: [m.service],
    figmaUrl: `${figmaFile ?? FIGMA}${node}`,
    technologies: [],
    media: {
      image: publicUrl(`${file}.png`),
      thumb: publicUrl(`${file}-1280.jpg`),
      width: 1920,
      height: 1080,
      alt: coverAlt ?? `${[input.brand, input.name].filter(Boolean).join(' ')} ${m.alt}`,
      placeholder: placeholders[category],
    },
  }
}

/* ------------------------------------------------------------------ */
/* Website UI/UX Design                                                */
/* ------------------------------------------------------------------ */

export const websiteDesigns: Project[] = [
  design('website', {
    slug: 'clothing-fashion',
    name: 'Clothing & Fashion',
    brand: 'AERIS',
    node: '0-1',
    description: 'E-commerce homepage for AERIS, a modern apparel brand — campaign-led storytelling with a clear path into shopping.',
    overview:
      'A desktop and mobile e-commerce homepage for AERIS, an apparel brand launching its Autumn/Winter 2026 collection. Editorial campaign imagery is paired with a restrained interface so the clothing stays the focus.',
    audience: 'Style-conscious shoppers browsing on desktop and mobile.',
    objective: 'Present the new collection with a premium brand feel while making it effortless to start shopping.',
    problem:
      'Fashion shoppers decide in seconds. When a homepage is cluttered or categories are hard to find, the collection loses its impact and visitors leave before reaching a product. Shipping and returns terms — a common source of hesitation — are often buried until checkout.',
    solution:
      'A full-bleed campaign hero sets the mood, with one clear "Shop Now" action and a secondary link to the campaign. Navigation is split into Women, Men, New In and Collections, and a slim announcement bar surfaces free shipping and returns up front. On mobile, the same hierarchy carries into a stacked hero and a "Shop by category" entry point.',
    considerations: [
      { title: 'Visual hierarchy', text: 'An oversized, light-weight headline over campaign photography, with a single primary button so the next step is never in doubt.' },
      { title: 'Typography & color', text: 'A wide-tracked uppercase wordmark and a neutral stone-and-black palette let the garments carry the color.' },
      { title: 'Mobile experience', text: 'Navigation condenses to menu, search, wishlist and bag icons, keeping the hero and category entry visible without long scrolling.' },
    ],
  }),
  design('website', {
    slug: 'plumbing',
    name: 'Plumbing',
    brand: 'ClearFlow Plumbing',
    node: '2603-115',
    description: 'Homepage for a local plumbing service — clear services, upfront quotes and easy booking.',
    overview:
      'A homepage for ClearFlow, a local plumbing company. The design focuses on the questions people ask in the first few seconds: can you help me, can I trust you, and how do I book?',
    audience: 'Homeowners and renters in the service area — often dealing with an urgent problem.',
    objective: 'Build trust quickly and make booking or calling a plumber the obvious next step.',
    problem:
      'People usually look for a plumber when something has already gone wrong. They need to know straight away whether a company covers their area, can be trusted in their home and how pricing works — yet many local service sites hide those answers behind generic copy and a single contact form.',
    solution:
      'The hero answers the key questions in one view: a licensed-and-insured badge, the areas served, opening hours with 24/7 emergency dispatch, and two direct actions — book a plumber or call. A booking-slot card and a written-quote card preview the process and reinforce the promise of a flat-rate quote before work begins.',
    considerations: [
      { title: 'Trust signals', text: 'Licensing, background-checked plumbers and upfront pricing are stated in the hero rather than on secondary pages.' },
      { title: 'Two contact paths', text: 'Online booking and a phone number sit side by side — and the number is repeated in the header — for visitors who prefer to call.' },
      { title: 'Mobile usability', text: 'Full-width booking and call buttons are stacked for quick, thumb-friendly use in urgent, on-the-go moments.' },
    ],
  }),
  design('website', {
    slug: 'solar-energy',
    name: 'Solar Energy',
    brand: 'Lumora Solar',
    node: '2603-116',
    description: 'Homepage for a residential & commercial solar installer — services, savings estimates and clear quotes.',
    overview:
      'A homepage for Lumora Solar, an installer serving homes and businesses. It balances the long-term benefit of solar with a practical, low-pressure first step for visitors who are still exploring.',
    audience: 'Homeowners and business owners considering solar for the first time.',
    objective: 'Explain the value of solar clearly and turn interest into qualified quote requests.',
    problem:
      'Solar is a considered, high-value purchase. Visitors arrive unsure whether it suits their property, what it might cost and which incentives apply — and a generic "contact us" form gives them little reason to start a conversation.',
    solution:
      'The headline leads with the benefit — clean energy today, lower costs for years — and an "Explore your options" form asks for just a ZIP code, monthly bill and property type. Three process highlights (free site assessment, custom system design, itemized proposal) set expectations, and a banner addresses incentives before visitors have to ask.',
    considerations: [
      { title: 'Low-commitment first step', text: 'A short options form replaces a cold contact form, giving visitors a reason to engage before they are ready to talk to sales.' },
      { title: 'Transparency', text: 'Process highlights and the promise of an itemized proposal explain what happens next, reducing uncertainty.' },
      { title: 'Color with purpose', text: 'A deep navy base keeps the layout calm, with solar yellow reserved for primary actions and key highlights.' },
    ],
  }),
  design('website', {
    slug: 'ai-crm-automation',
    name: 'AI-Powered CRM Automation & Sales Management',
    brand: 'Pipeloop',
    node: '2603-117',
    description: 'Homepage for an AI CRM that qualifies leads, drafts follow-ups and keeps pipelines current.',
    overview:
      'A SaaS homepage for Pipeloop, an AI-assisted CRM. The design translates an abstract product into concrete jobs a sales team recognizes, supported by a preview of the actual workspace.',
    audience: 'Sales leaders and teams evaluating CRM and sales-automation tools.',
    objective: "Communicate the product's value and workflow in seconds, and lead visitors to a free trial or product tour.",
    problem:
      'AI sales tools are hard to evaluate from a homepage: the value feels abstract, features overlap with existing CRMs, and teams worry about automated messages going out without oversight. Visitors need to understand what the product does — and how it fits their workflow — almost instantly.',
    solution:
      'A plain-language headline and subline name three concrete jobs: qualifying leads, drafting follow-ups and booking meetings. Reassurance points — "Human approval on every AI message" and "Connects to the tools you already use" — sit directly beneath the CTAs, and a pipeline dashboard preview shows the workspace the team would actually use.',
    considerations: [
      { title: 'Clarity over buzzwords', text: 'Copy describes outcomes and tasks rather than technology, so the product is understandable without prior context.' },
      { title: 'Show the product', text: 'A dashboard preview with pipeline, leads and automations makes the feature set tangible from the first screen.' },
      { title: 'Restrained SaaS palette', text: 'A white layout with a single blue accent keeps "Start Free" and "Explore the Platform" clearly prioritized.' },
    ],
  }),
  design('website', {
    slug: 'skin-clinic',
    name: 'Skin Clinic',
    brand: 'aster.',
    node: '2603-118',
    description: 'Homepage for a consultation-first skin clinic — personalized care, clearly explained.',
    overview:
      'A homepage for aster., a skin clinic built around professional consultations. The design positions the clinic as a calm, credible guide rather than a place to buy quick fixes.',
    audience: 'Prospective patients researching skin concerns and treatments.',
    objective: 'Help visitors find the right treatment path and make booking a consultation feel simple and reassuring.',
    problem:
      'Skin treatments can feel confusing and intimidating. Prospective patients often don’t know which treatment fits their concern, and clinic sites that lead with long treatment lists or aggressive promotions undermine the trust a medical-aesthetic service depends on.',
    solution:
      'The headline promises personalized care, clearly explained, and the primary action is "Book a Consultation". Navigation lets visitors browse by treatment or by skin concern, and a utility bar clarifies that consultations are by appointment and new patients are welcome. Warm neutrals and generous whitespace keep the tone professional and calm.',
    considerations: [
      { title: 'Browse by concern', text: 'Separate Treatments and Skin Concerns menus support visitors who know the treatment as well as those who only know the problem.' },
      { title: 'Tone & typography', text: 'A soft two-tone headline and a muted burgundy palette feel clinical yet approachable.' },
      { title: 'Consultation-first CTA', text: 'The main action is a consultation, not a purchase — matching how the clinic actually works.' },
    ],
  }),
  design('website', {
    slug: 'legal-service',
    name: 'Legal Service',
    brand: 'Algojo Law',
    node: '2603-119',
    description: 'Homepage for a law firm — clear practice areas, credible attorneys and easy consultations.',
    overview:
      'A homepage for Algojo Law. The design balances authority with approachability, guiding visitors from uncertainty to a confidential first conversation.',
    audience: 'Individuals and businesses looking for legal guidance.',
    objective: 'Communicate credibility and practice areas clearly, and make scheduling a consultation straightforward.',
    problem:
      'People contacting a law firm are often stressed and unsure which kind of lawyer they need. They look for signs of credibility and a clear, confidential way to start, while many legal websites lead with dense text and jargon.',
    solution:
      'A serif-led, dark navy hero conveys seriousness, and the copy speaks directly to the visitor’s situation. Two paths — schedule a consultation or explore practice areas — are supported by office hours, contact details and a confidentiality note in the top bar. Credibility figures are designed as clearly marked slots, to be filled only with verified data.',
    considerations: [
      { title: 'Credibility without claims', text: 'Statistic slots are labelled as placeholders for verified metrics instead of showing invented numbers.' },
      { title: 'Typography', text: 'A classic serif for headlines paired with a clean sans-serif for body text and navigation.' },
      { title: 'Accessible contact', text: 'Phone, hours, location and a consultation button stay visible on desktop and mobile.' },
    ],
  }),
  design('website', {
    slug: 'architecture-studio',
    name: 'Architecture Studio',
    brand: 'FORMA',
    node: '2603-120',
    description: 'Homepage for a contemporary architecture studio — thoughtful spaces, project-led storytelling.',
    overview:
      'A homepage for FORMA, a contemporary architecture studio. The work leads the experience, with the interface stepping back to let light, material and space speak.',
    audience: 'Private clients and businesses planning homes, workplaces or renovations.',
    objective: "Showcase the studio's projects and design approach, and invite visitors to explore the work or start a project.",
    problem:
      'For an architecture studio, the work is the argument. Websites that bury projects behind long text or generic layouts fail to convey the quality of the spaces, and prospective clients can’t sense the studio’s approach before reaching out.',
    solution:
      'A full-bleed featured residence with an oversized wordmark makes the work the first thing visitors see. A concise statement of approach follows, with two actions — explore the work or discuss a project — and a featured-project label connects the hero directly to the portfolio.',
    considerations: [
      { title: 'Image-led layout', text: 'Large photography carries the page; text is kept short and placed where it doesn’t compete with the architecture.' },
      { title: 'Minimal interface', text: 'A compact pill navigation and a single blue accent keep UI elements quiet.' },
      { title: 'Scale & typography', text: 'The oversized wordmark gives the studio a confident, recognizable presence on desktop and mobile.' },
    ],
  }),
  design('website', {
    slug: 'crypto-trading',
    name: 'Crypto Trading',
    brand: 'FlowTrading',
    node: '2603-121',
    description: 'Website for a crypto & forex trading platform — markets, tools and a clear path to trade.',
    overview:
      'A website for FlowTrading, a platform for trading digital assets and currency pairs. The design presents dense market information in a calm, legible way for both new and experienced traders.',
    audience: 'New and experienced traders comparing crypto and forex platforms.',
    objective: "Present the platform's markets and tools clearly, and offer a confident path to sign up or explore first.",
    problem:
      'Trading platforms must show dense, fast-moving information without overwhelming newcomers, while still signalling enough depth for experienced traders. Trust is critical: visitors want to understand what they can do before creating an account.',
    solution:
      'The hero states the platform’s scope in one line and offers two paths — create an account, or explore markets with no account needed. A watchlist and price chart preview the product in context, with sample data clearly labelled as simulated. A dark interface with one electric-blue accent keeps prices legible and primary actions obvious.',
    considerations: [
      { title: 'Data legibility', text: 'Tabular watchlist rows and high-contrast figures make prices and changes easy to scan.' },
      { title: 'Honest previews', text: 'Market data in the design is marked as simulated, avoiding the impression of live performance.' },
      { title: 'Clear navigation', text: 'Markets, Trade, Crypto, Forex and Learn separate what traders do from where they learn.' },
    ],
  }),
  design('website', {
    slug: 'tennis',
    name: 'Tennis',
    brand: 'AlgojoTennis',
    node: '2603-175',
    description: 'Website for a tennis club — programs, coaching, courts and membership in one place.',
    overview:
      'A website for AlgojoTennis, a tennis club serving players at every level. The design brings programs, coaching, court booking and membership together with an energetic, athletic identity.',
    audience: 'Beginners, juniors, competitive players and members of a local tennis club.',
    objective: 'Make it easy for each type of visitor to find their path — booking a court, joining a program or becoming a member.',
    problem:
      'Tennis clubs serve very different visitors — beginners, juniors, competitive players and members who simply want to book a court. When programs, coaching, courts and membership information are scattered, visitors struggle to find their path and the club’s energy gets lost.',
    solution:
      'Navigation is organized around what visitors come to do: Programs, Coaching, Courts and Membership. The hero pairs an athletic visual with two direct actions — book a court or explore programs — and a "Programs for every level" card signals that every ability is welcome.',
    considerations: [
      { title: 'Task-based navigation', text: 'Menu items map to real visitor goals rather than internal club structure.' },
      { title: 'Energy through type & color', text: 'Bold condensed headlines with the signature lime and deep green create a sporty, recognizable identity.' },
      { title: 'Mobile booking', text: '"Book a Court" stays in the mobile header and hero for quick access.' },
    ],
  }),
  design('website', {
    slug: 'finance',
    name: 'Finance',
    brand: 'RadarFinance',
    node: '2603-176',
    description: 'Website for a financial intelligence platform — a clearer view of spending, cash flow and goals.',
    overview:
      'A website for RadarFinance, a platform that helps people understand their spending, cash flow and goals. The design makes an abstract product feel tangible and trustworthy.',
    audience: 'Individuals who want a clearer picture of their personal finances.',
    objective: 'Explain the value of the platform simply and encourage visitors to get started or explore the product.',
    problem:
      'Finance tools ask people to connect sensitive data and change habits, so the website has to earn trust and explain value without jargon. Many finance sites lean on abstract claims or dense feature lists that make the product hard to picture.',
    solution:
      'The headline frames the product around one outcome — a clearer view of your financial future. A lifestyle photo with a floating spending card makes the product tangible and is labelled as an illustrative preview. An uncluttered layout with a single blue accent keeps attention on "Get Started" and "Explore the Platform".',
    considerations: [
      { title: 'One clear promise', text: 'A short, outcome-focused headline replaces a list of features.' },
      { title: 'Product in context', text: 'The spending card shows what the product does inside a real-life moment.' },
      { title: 'Trustworthy palette', text: 'Navy, white and blue keep the experience calm, familiar and easy to read.' },
    ],
  }),
]

/* ------------------------------------------------------------------ */
/* Social Media Design                                                 */
/* ------------------------------------------------------------------ */

export const socialMediaDesigns: Project[] = [
  design('social-media', {
    slug: 'clothing-fashion',
    name: 'Clothing & Fashion',
    brand: 'AERIS',
    node: '2603-34507',
    description: 'Social campaign for AERIS — new arrivals, outfit inspiration and seasonal offers in one consistent feed.',
    overview:
      'A social media campaign for the AERIS Autumn/Winter 2026 collection, covering carousels, posts and reels that share one visual system with the website.',
    audience: 'Followers who discover and shop fashion through Instagram and short-form video.',
    objective: 'Announce, inspire and promote — while keeping every post unmistakably AERIS.',
    problem:
      'A fashion feed has to announce new arrivals, inspire and promote offers at the same time, without the brand starting to look like a discount retailer. Mixing these messages without a system quickly makes a feed feel inconsistent.',
    solution:
      'A shared system — the AERIS wordmark, wide-tracked uppercase headlines and a warm neutral palette — ties together distinct formats: new-arrival grids, an outfit-inspiration reel, a seasonal trend guide and a promotional post. Offers use the same restrained typography as editorial content, so promotions stay on-brand.',
    considerations: [
      { title: 'Content system', text: 'Each format has a clear job — arrivals, inspiration, guides and offers — so the feed can stay varied without losing focus.' },
      { title: 'Visual consistency', text: 'Repeated wordmark placement, uppercase headlines and earthy tones make posts recognizable at a glance.' },
      { title: 'Hierarchy', text: 'One headline and one call to action per post keep the message quick to read in a scrolling feed.' },
    ],
  }),
  design('social-media', {
    slug: 'plumbing',
    name: 'Plumbing',
    brand: 'ClearFlow Plumbing',
    node: '2603-34508',
    description: 'Social content for ClearFlow — practical tips, service spotlights and behind-the-scenes reels.',
    overview:
      'A social media set for ClearFlow Plumbing that keeps a local service useful and memorable between emergencies.',
    audience: 'Local homeowners and renters who follow home-care and service accounts.',
    objective: 'Stay helpful and top-of-mind, and make it obvious how to book when a problem appears.',
    problem:
      'Plumbing is a need-based service — most followers won’t need a plumber today. Content has to stay useful between emergencies and keep the company memorable, while also building trust in the people who will enter customers’ homes.',
    solution:
      'Practical tips ("5 signs of a hidden water leak", "Never pour grease down the drain"), service spotlights and a behind-the-scenes reel give followers a reason to engage before they need help. Recurring elements — upfront pricing, the phone number and a booking button — make the next step clear whenever it is needed.',
    considerations: [
      { title: 'Useful first', text: 'Tips and how-to content earn attention; service posts follow the same helpful tone.' },
      { title: 'Recognizable system', text: 'Blue gradients, a lime accent and the ClearFlow badge appear on every format.' },
      { title: 'Human trust', text: 'Reels and imagery put real-looking technicians at the center to make the brand feel personal.' },
    ],
  }),
  design('social-media', {
    slug: 'solar-energy',
    name: 'Solar Energy',
    brand: 'Lumora Solar',
    node: '2603-34509',
    description: 'Social content for Lumora Solar — educational tips, installation stories and myth-busting posts.',
    overview:
      'A social media set for Lumora Solar that answers common questions and shows the people and process behind each installation.',
    audience: 'Homeowners and businesses researching solar before requesting a quote.',
    objective: 'Address doubts early and make solar feel understandable and approachable.',
    problem:
      'Solar buyers have questions and misconceptions — about weather, cost and installation — long before they ask for a quote. A feed that only posts promotions doesn’t address those doubts.',
    solution:
      'Myth-busting posts answer one misconception in a single sentence ("Solar panels still produce power on cloudy days — just less of it"), process carousels walk through installation from first call to switch-on, and a reel follows the install crew on the roof.',
    considerations: [
      { title: 'Education-led', text: 'Each post answers one question, making complex topics easy to absorb in a feed.' },
      { title: 'Consistent palette', text: 'Navy, white and solar yellow are used consistently across tips, stories and reels.' },
      { title: 'Clear labels', text: 'Tags such as "Solar tip" and "Installation process" help followers recognize each series.' },
    ],
  }),
  design('social-media', {
    slug: 'ai-crm-automation',
    name: 'AI-Powered CRM Automation & Sales Management',
    brand: 'Pipeloop',
    node: '2603-34510',
    description: 'Social content for Pipeloop — product explainers and sales-productivity tips built from real UI.',
    overview:
      'A social media set for Pipeloop that explains an AI CRM in concrete terms and offers practical value to sales professionals.',
    audience: 'Sales representatives, managers and founders active on LinkedIn and Instagram.',
    objective: 'Make an abstract product concrete and give salespeople a reason to follow before they are ready to buy.',
    problem:
      'AI CRM products are abstract and crowded, and sales professionals scroll past generic "AI" claims. Content has to explain what the product does in plain terms while staying valuable to people who aren’t evaluating software yet.',
    solution:
      'Product explainers are built around simplified interface cards — a suggested next step, a pipeline by stage, an insights chart — and are mixed with practical productivity tips such as habits of productive sales reps. Real UI fragments make features concrete instead of relying on claims.',
    considerations: [
      { title: 'Show, don’t claim', text: 'Simplified product UI explains features faster than descriptive copy.' },
      { title: 'Value beyond the product', text: 'Tip-based posts serve followers who aren’t buyers yet.' },
      { title: 'Brand link', text: 'The blue-and-dark palette and dot-grid texture connect the feed to the website.' },
    ],
  }),
  design('social-media', {
    slug: 'skin-clinic',
    name: 'Skin Clinic',
    brand: 'aster.',
    node: '2603-34511',
    description: 'Social content for aster. — skincare education, treatment explainers and practical tips.',
    overview:
      'A social media set for aster. that reflects the clinic’s consultation-first approach: explain first, recommend second.',
    audience: 'People looking for trustworthy skincare guidance and treatment information.',
    objective: 'Establish the clinic as a calm, credible educator and invite followers to book a consultation.',
    problem:
      'Skincare content online is crowded with quick fixes and conflicting advice. A clinic needs to stand out as a trustworthy, educational voice — without making promises it can’t keep or blending into generic beauty content.',
    solution:
      'Every post leads with understanding: healthy habits explained, clinical facials explained, uneven tone and acne approached by starting with the cause. Numbered tip series, framed layouts and a burgundy-and-cream palette create a calm, recognizable visual language across carousels, posts and reels.',
    considerations: [
      { title: 'Explain, don’t promise', text: 'Copy focuses on understanding causes and routines rather than guaranteed results.' },
      { title: 'Series formats', text: 'Numbered tips and recurring labels make the feed easy to follow over time.' },
      { title: 'Calm aesthetic', text: 'Thin frames, soft imagery and muted burgundy match the clinic website.' },
    ],
  }),
  design('social-media', {
    slug: 'legal-service',
    name: 'Legal Service',
    brand: 'Algojo Law',
    node: '2603-34512',
    description: 'Social content for Algojo Law — plain-language legal explainers, Q&A posts and consultation prompts.',
    overview:
      'A social media set for Algojo Law that breaks everyday legal questions into clear, responsible content.',
    audience: 'Individuals and small businesses facing everyday legal questions.',
    objective: 'Make legal topics approachable while staying clearly informational, and offer an easy route to a consultation.',
    problem:
      'Legal topics are complex and sensitive, and a firm’s social content must be helpful without being mistaken for formal legal advice. It also needs to stay professional while competing for attention in a casual feed.',
    solution:
      'Recurring formats — know-your-rights explainers, a legal tip of the week and Q&A posts — break questions such as "Do I need a lawyer to review a lease?" into plain, digestible points. Each post carries a "general information only" note, and a consultation post provides a clear next step.',
    considerations: [
      { title: 'Responsible communication', text: 'Disclaimers are built into the layout rather than added as an afterthought.' },
      { title: 'Readable structure', text: 'Short headlines and numbered points turn dense topics into scannable posts.' },
      { title: 'Authoritative identity', text: 'Navy, burgundy and a classic serif keep the tone serious and consistent with the website.' },
    ],
  }),
  design('social-media', {
    slug: 'architecture-studio',
    name: 'Architecture Studio',
    brand: 'FORMA',
    node: '2603-34513',
    description: 'Social content for FORMA — project stories, studio philosophy and project tour reels.',
    overview:
      'A social media set for FORMA that presents projects and studio thinking with the same care as the buildings themselves.',
    audience: 'Prospective clients, design enthusiasts and collaborators following architecture.',
    objective: 'Showcase projects and the studio’s philosophy, and invite people to start a conversation about their space.',
    problem:
      'Architecture is slow, considered work, while social media rewards speed. A studio needs to present projects and ideas in a way that feels as thoughtful as its buildings, without reducing them to quick snapshots.',
    solution:
      'A small set of formats — project case studies, project-tour reels, a studio introduction, philosophy quotes and an inquiry post — gives the feed rhythm. Large photography and generous margins keep the focus on light and space, while consistent labels identify each content type.',
    considerations: [
      { title: 'Photography first', text: 'Images fill most of each post; text is reserved for a single headline and short context.' },
      { title: 'Content rhythm', text: 'Alternating projects, ideas and studio posts keeps the feed varied but coherent.' },
      { title: 'Quiet palette', text: 'Deep burgundy and warm off-white support the imagery instead of competing with it.' },
    ],
  }),
  design('social-media', {
    slug: 'crypto-trading',
    name: 'Crypto Trading',
    brand: 'FlowTrading',
    node: '2603-34514',
    description: 'Social content for FlowTrading — beginner-friendly crypto and forex education with responsible framing.',
    overview:
      'A social media set for FlowTrading focused on education and account security rather than hype.',
    audience: 'Beginner and intermediate traders learning crypto and forex basics.',
    objective: 'Build understanding and trust through clear, responsible educational content.',
    problem:
      'Crypto and forex content is often hype-driven, and beginners struggle with basic terminology. A trading brand needs to educate responsibly and build trust — avoiding anything that reads like a trading tip.',
    solution:
      'The feed is built around education: concept-of-the-week posts, a blockchain explainer, glossary terms such as "pip" and security reminders. Every post carries an "educational content · not financial advice" line, keeping the tone responsible.',
    considerations: [
      { title: 'Responsible framing', text: 'Educational labels and the absence of price predictions keep the content trustworthy.' },
      { title: 'Product-matched style', text: 'Dark UI panels, blue gradients and monospaced accents mirror the platform interface.' },
      { title: 'Bite-sized learning', text: 'One concept per post makes technical topics easy to follow.' },
    ],
  }),
  design('social-media', {
    slug: 'tennis',
    name: 'Tennis',
    brand: 'AlgojoTennis',
    node: '2603-34515',
    description: 'Social content for AlgojoTennis — technique tips, drills, junior programs and beginner guides.',
    overview:
      'A social media set for AlgojoTennis that speaks to beginners, active players and parents of junior players.',
    audience: 'Club members, active players, beginners and parents of juniors.',
    objective: 'Offer useful tennis content for each audience while promoting the club’s programs.',
    problem:
      'A tennis club’s audience ranges from complete beginners to competitive players and parents of juniors. One-size-fits-all posts fail to speak to any of them, and the club risks looking like a generic sports account.',
    solution:
      'Content is organized by audience and intent: technique tips and drills for active players, a "New to tennis? Start here" guide for newcomers, and program posts for juniors. Category tags such as Training, Programs and Drill Spotlight tell followers instantly who each post is for.',
    considerations: [
      { title: 'Audience-specific series', text: 'Each format targets a specific type of player rather than everyone at once.' },
      { title: 'High-energy identity', text: 'Bold condensed headlines with lime and deep green match the website.' },
      { title: 'Clear tagging', text: 'Consistent labels help followers recognize and follow the series that matter to them.' },
    ],
  }),
  design('social-media', {
    slug: 'finance',
    name: 'Finance',
    brand: 'RadarFinance',
    node: '2603-34516',
    description: 'Social content for RadarFinance — approachable money explainers, checklists and feature spotlights.',
    overview:
      'A social media set for RadarFinance that combines personal-finance education with clear glimpses of the product.',
    audience: 'People who want to understand and organize their personal finances.',
    objective: 'Make money topics approachable and show how the product helps — without sounding like financial advice.',
    problem:
      'Money topics can feel stressful or dull, and finance apps compete with a flood of advice online. Content needs to make concepts approachable and show how the product helps, without overpromising.',
    solution:
      'Short explainers ("What is an emergency fund?"), a practical monthly budget checklist and a spotlight on the Overview dashboard combine education with product context. Simple data cards and checklists echo the app interface, and each post is marked as educational content.',
    considerations: [
      { title: 'Approachable tone', text: 'Simple language and checklists make finance feel manageable rather than intimidating.' },
      { title: 'Product context', text: 'Feature posts reuse interface elements so followers recognize the product later.' },
      { title: 'Scannable hierarchy', text: 'One large headline, supporting data cards and a clear label structure every post.' },
    ],
  }),
]

/* ------------------------------------------------------------------ */
/* Mobile App UI/UX Design (listed under the UI/UX service)            */
/* ------------------------------------------------------------------ */

export const appDesigns: Project[] = [
  design('app-design', {
    slug: 'nuvora',
    name: 'Nuvora',
    node: '2613-2111',
    description:
      'Mobile app for small service businesses — customers, orders, payments, expenses and appointments in one workspace.',
    overview:
      'Nuvora is a mobile app concept for small service businesses such as laundries, salons and repair shops. The Figma file covers the full product: brand identity, a design system, onboarding and business setup, a home dashboard, customers, orders, finance, appointments, reports, notifications and settings, plus empty, loading and error states and an interactive prototype.',
    audience: 'Owners and staff of small service businesses who manage their day from a phone.',
    objective: 'Bring the daily back office — who ordered what, who has paid and what is due today — into one calm, easy-to-read app.',
    problem:
      'Small service businesses often track orders in a notebook, payments in a chat app and expenses in a spreadsheet. It becomes hard to answer simple questions: who still owes money, what is due today, and whether the month is actually profitable.',
    solution:
      'A "Today at a glance" dashboard shows money received, outstanding balances and revenue recorded today, with progress rings for collections, completed orders and overdue orders. Dedicated flows cover creating orders, recording payments (with a validation state for amounts above the balance due), adding expenses, booking appointments (with a clash warning) and reading reports. A short note on the finance screen explains how revenue, money received and profit are counted.',
    considerations: [
      { title: 'Money you can trust', text: 'Large, tabular figures with clear labels — received, outstanding, recorded — and plain-language definitions so numbers never feel ambiguous.' },
      { title: 'Design system first', text: 'Tokens, a serif display face paired with a clean sans, status badges, fields and feedback patterns are defined once and reused across every screen.' },
      { title: 'Every state designed', text: 'Validation errors, confirmations, empty lists, loading skeletons and network errors are designed alongside the main flows.' },
    ],
  }),
  design('app-design', {
    slug: 'velora',
    name: 'Velora — Travel & Hotel Booking App',
    node: '2617-10811',
    coverAlt: 'Velora mobile app design — onboarding, home and hotel detail screens',
    description:
      'Travel and hotel booking app — hotel discovery, room selection, booking review and a clear payment screen in one flow.',
    overview:
      'Velora is a mobile app concept for discovering and booking hotels. The Figma file covers brand identity, a design system, onboarding and sign-in, a home screen with featured destinations and recommended stays, search with filters, list and map results, destination pages, hotel details, room selection, booking review, payment and confirmation, My Trips, saved stays and profile — plus empty, loading, offline and payment-failed states, and Flights and Car rental screens.',
    audience: 'Travellers who want to find and book a stay from their phone.',
    objective: 'Make booking a hotel feel calm and transparent, from the first search to the confirmed trip.',
    problem:
      'Hotel booking apps often hide the real price until the last step, bury room differences in long lists and make it hard to see what happens after paying. Travellers lose confidence right before they commit.',
    solution:
      'A dark search hero keeps destination, dates and guests in view. Hotel cards layer key facts over large photography; room cards compare size, beds, capacity, price per night and cancellation terms side by side. The review and payment screens show an itemised price — nightly rate, taxes and fees — before a dark "Amount Due" card and the payment methods, and a confirmation card carries the booking ID into My Trips.',
    considerations: [
      { title: 'Price shown up front', text: 'Prices always carry their unit (/night), and the full total with taxes and fees appears before payment.' },
      { title: 'Restrained accent', text: 'Ink surfaces and a lime accent used only for key actions, selected states and success — photography carries the colour.' },
      { title: 'Every state designed', text: 'Empty saved stays and trips, loading skeletons, no results, offline and payment-declined screens sit alongside the main flow.' },
    ],
  }),
  design('app-design', {
    slug: 'montra',
    name: 'Montra — Personal Finance App',
    node: '2623-3659',
    coverAlt: 'Montra mobile app design — transactions, home overview and reports screens',
    description:
      'Personal finance app — transactions, budgets, savings goals and reports in one calm money overview.',
    overview:
      'Montra is a mobile app concept for tracking personal money. The Figma page covers a home overview with total balance and the month’s spending and income, a searchable transaction list with filters, budgets with progress, savings goals, accounts, notifications, reports with cash flow and spending by category, and profile settings.',
    audience: 'People who want a clear picture of their own spending, budgets and savings on their phone.',
    objective: 'Answer “how am I doing this month?” at a glance, then let users drill into any number.',
    problem:
      'Money apps often show a wall of numbers without context. Users can’t tell quickly whether they are on track, where the money went, or how this month compares with the last.',
    solution:
      'The home screen leads with total balance and a spent-versus-income pair for the month, followed by budgets with an amount left and days remaining. Transactions are grouped by day with income and expense totals and quick filters. Reports pair a cash-flow line chart with a category donut and a plain-language summary of what was kept.',
    considerations: [
      { title: 'Numbers with context', text: 'Figures always carry a comparison or a remainder — “left”, “days to go”, change versus last month — so they read as answers.' },
      { title: 'One strong accent', text: 'Black surfaces and a single yellow accent mark the key figures and actions; categories get their own small colour tags.' },
      { title: 'Scannable lists', text: 'Transactions are grouped by day with merchant, category, account and time in a consistent two-line row.' },
    ],
  }),
  design('app-design', {
    slug: 'pulsefit',
    name: 'PulseFit — Fitness App',
    node: '2623-3660',
    coverAlt: 'PulseFit mobile app design — home, active workout and activity screens',
    description:
      'Fitness app — planned workouts, a focused active-workout screen and weekly progress tracking.',
    overview:
      'PulseFit is a mobile app concept for following workouts and tracking progress. The Figma page covers a home screen with weekly progress and a planned-day calendar, workout details, an active workout with timer and controls, activity and progress statistics, goals and body measurements, saved workouts and profile.',
    audience: 'People building a regular workout habit who train from their phone.',
    objective: 'Make it obvious what to do today, keep the workout itself distraction-free, and show progress over the week.',
    problem:
      'Fitness apps tend to crowd the screen with feeds and metrics. During a workout users need only the current exercise and the time; afterwards they want to see whether the week is on track.',
    solution:
      'The home screen shows a weekly workout ring, a streak and the week’s plan as a date strip, with today’s planned session below. The active-workout screen keeps the timer and controls large, and the activity screen summarises active minutes, the weekly goal and workout count with a period switcher.',
    considerations: [
      { title: 'Focus during the workout', text: 'Large photography, a big timer and few controls so the screen can be read mid-exercise.' },
      { title: 'Progress at a glance', text: 'Rings, a week strip and short labels (“0 of 4 workouts · 4 to go”) turn goals into a clear next step.' },
      { title: 'Restrained palette', text: 'Monochrome surfaces with an orange accent reserved for streaks, live states and primary actions.' },
    ],
  }),
  design('app-design', {
    slug: 'cravora',
    name: 'Cravora — Food Delivery App',
    node: '2623-3661',
    coverAlt: 'Cravora mobile app design — restaurant details, home and cart screens',
    description:
      'Food delivery app — restaurant discovery, dish options, cart, checkout and order tracking in one clear ordering flow.',
    overview:
      'Cravora is a mobile app concept for ordering food for delivery. The Figma page covers a home screen with a delivery address, promotions, cuisines and nearby restaurants, restaurant menus, dish details with options, the cart with a promo code and itemised fees, checkout, order tracking and history, favourites, notifications and profile.',
    audience: 'People ordering food from local restaurants on their phone.',
    objective: 'Get from craving to placed order quickly, with the full price clear before checkout.',
    problem:
      'Delivery apps often surface fees late and make dish options easy to miss, so the total at checkout comes as a surprise and orders need correcting.',
    solution:
      'Restaurant pages show rating, delivery time, fee and minimum order up front, with a categorised menu. The cart lists each dish with its chosen options and quantity, shows an applied promo, and breaks down subtotal, delivery and service fees before a single checkout button carrying the total.',
    considerations: [
      { title: 'Price clarity', text: 'Delivery fee, service fee and discounts are itemised in the cart, and the checkout button repeats the total.' },
      { title: 'Appetite-led visuals', text: 'Large food photography with a lime accent used for add buttons, promotions and the active tab.' },
      { title: 'One-handed ordering', text: 'Add and quantity controls sit on the right of each row, and the primary action stays at the bottom of the screen.' },
    ],
  }),
  design('app-design', {
    slug: 'nestora',
    name: 'Nestora — Property Rental App',
    node: '274-5177',
    figmaFile: ZIAHDESIGN,
    coverAlt: 'Nestora mobile app design — search results, discover and property details screens',
    description:
      'Property rental platform concept — home discovery, rental terms and a streamlined path from search to contacting the agent and booking a viewing.',
    overview:
      'Nestora is a mobile app concept for finding a home to rent. The Figma page covers discovery with featured homes and neighborhoods, search with filters and a map view, property details with a gallery and rental terms, saved homes, side-by-side comparison, recently viewed, contacting the listing agent, inquiry tracking, viewing appointments, notifications, profile and settings — including loading, empty, error and validation states.',
    audience: 'Prospective tenants looking for a long-term rental, and the agents who list the homes.',
    objective: 'Help renters judge a home quickly and take the next step — ask the agent or book a viewing — without hunting for the terms.',
    problem:
      'Rental listings often hide key terms like deposit, lease length and pet rules, or fill gaps with guesses. Renters bounce between listings, lose track of homes they liked and can’t tell whether an agent has replied.',
    solution:
      'Listings lead with monthly rent, beds, baths and size, and a rental-terms block shows deposit, lease, furnishing, pets and utilities — anything unknown reads “Not specified”. Saved homes and a three-home comparison keep the shortlist in one place, and inquiries and viewings each have a status timeline.',
    considerations: [
      { title: 'Never invented terms', text: 'Unknown details are labelled “Not specified”, and every listing carries a sample-listing tag in this concept.' },
      { title: 'Warm and restrained', text: 'Warm neutral surfaces with ink actions; amber marks location and selection, and red is reserved for favourites and errors.' },
      { title: 'Every state designed', text: 'Loading, empty, error, validation, sending and send-failed states sit alongside the main flows.' },
    ],
  }),
  design('app-design', {
    slug: 'taskora',
    name: 'Taskora — Team Productivity App',
    node: '274-5178',
    figmaFile: ZIAHDESIGN,
    coverAlt: 'Taskora mobile app design — task details, home and board screens',
    description:
      'Team productivity platform concept — organise projects, manage tasks and subtasks, track progress and collaborate across the team.',
    overview:
      'Taskora is a mobile app concept for small teams. The Figma page covers a home screen with “My Day” and overdue alerts, search with filters, projects with progress and health, project details and members, tasks and subtasks, a kanban board, a calendar, My Tasks and overdue views, team workload, comments and activity, notifications, profile and settings — 71 screens and states, built on a token-based design system.',
    audience: 'Small product, design and marketing teams who plan and track work together.',
    objective: 'Answer at a glance what needs attention today, what the team is working on, what is overdue or blocked, and how each project is doing.',
    problem:
      'Task tools get noisy: status, priority and deadlines blur together, progress is hard to read, and it isn’t clear who is waiting on whom.',
    solution:
      'Every task shows its project, due date, priority and assignee in one consistent row. Projects carry a progress bar and an on-track / at-risk / off-track badge, tasks break into subtasks that roll up into progress, and the board, calendar and My Tasks views show the same work from different angles.',
    considerations: [
      { title: 'Colour never alone', text: 'Status, priority and health badges always pair colour with a label and an icon.' },
      { title: 'One hierarchy', text: 'Project → task → subtask is used on every screen, so progress reads the same everywhere.' },
      { title: 'States included', text: 'Validation errors, save failures with retry, empty projects, empty days and “all caught up” are designed, not left to chance.' },
    ],
  }),
]
