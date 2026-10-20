import type { Project } from '../types'
import { publicUrl } from './site'

/*
 * Website Design & Development — 10 live websites, each built from the matching
 * Figma design (see designProjects.ts) and published on GitHub Pages.
 *
 * Sources for this copy (checked October 2026):
 *   - each repository's README (github.com/ziahgg/<repo>), which documents the
 *     sections, what is interactive, and which content is placeholder or sample data
 *   - the source code (section components, state, forms)
 *   - the live site itself
 * Every repository uses Vite, React, TypeScript and Tailwind CSS v4 and has no
 * backend. Forms and booking widgets are on-page demos; no outcomes are claimed.
 *
 * Covers are desktop screenshots of each live homepage (1600×900 viewport at
 * 1.2× → 1920×1080), stored in /public/covers/website-development/.
 */

const STACK = ['React', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'GitHub Pages']

interface DevInput {
  slug: string
  name: string
  industry: string
  liveUrl: string
  /** Slug of the Website UI/UX design case study this site was built from. */
  design: string
  description: string
  overview: string
  audience: string
  objective: string
  problem: string
  solution: string
  highlights: { title: string; text: string }[]
}

function dev(input: DevInput): Project {
  const { slug, design, ...rest } = input
  const file = `covers/website-development/${slug}-live-site`
  return {
    ...rest,
    slug: `website-development/${slug}`,
    category: 'Website Design & Development',
    kind: 'Personal project',
    scope: ['Design', 'Front-end build', 'Responsive', 'Deployment'],
    services: ['websites'],
    designCaseStudy: design,
    technologies: STACK,
    media: {
      image: publicUrl(`${file}.jpg`),
      thumb: publicUrl(`${file}-1280.jpg`),
      width: 1920,
      height: 1080,
      alt: `Screenshot of the live ${input.name} website homepage on desktop`,
      placeholder: 'website',
    },
  }
}

export const developmentProjects: Project[] = [
  dev({
    slug: 'aeris',
    name: 'AERIS',
    industry: 'Clothing & Fashion',
    liveUrl: 'https://ziahgg.github.io/Aeris/',
    design: 'clothing-fashion-website',
    description: 'A fashion e-commerce homepage built as a working front end — filters, quick add, wishlist and bag included.',
    overview:
      'AERIS is a static, responsive build of the fashion homepage designed in Figma. Beyond matching the visuals, the goal was to make the shopping interactions on the page actually respond — without a backend.',
    audience: 'Shoppers browsing a modern apparel brand on desktop and mobile.',
    objective: 'Turn the homepage design into a fast, faithful front end where browsing and shopping interactions feel real.',
    problem:
      'An e-commerce homepage only feels credible when it behaves like a shop: filters should filter, a product should go into the bag, the wishlist should remember what was saved. A static site has no backend or checkout, so those interactions need to work entirely in the browser — and the layout has to hold up across desktop, tablet and mobile.',
    solution:
      'Each Figma section became its own React component, with copy and products kept in a content file. Best-seller tabs filter the product grid, quick add puts a chosen size in the bag, hearts toggle the wishlist, and both drawers update the header counts and persist in localStorage. A search drawer filters the catalogue. Checkout is deliberately out of scope, so the bag shows a subtotal only.',
    highlights: [
      { title: 'Shop interactions without a backend', text: 'Filter tabs, "View all", quick add, wishlist and bag drawers, with state saved in localStorage.' },
      { title: 'Responsive at three sizes', text: 'Desktop follows the 1440 frame; mobile uses snap rails, a 2-up product grid and an accordion footer; tablet adapts the mobile structure.' },
      { title: 'Design tokens from Figma', text: 'Colors and text styles from the Figma variables are defined as Tailwind tokens, with the Jost typeface self-hosted.' },
      { title: 'Accessible navigation', text: 'A skip link, visible focus rings and section links that scroll to the right place.' },
    ],
  }),
  dev({
    slug: 'clearflow',
    name: 'ClearFlow',
    industry: 'Plumbing',
    liveUrl: 'https://ziahgg.github.io/ClearFlow/',
    design: 'plumbing-website',
    description: 'A local plumbing homepage with a service-area checker, pricing toggle and review filters — built to answer questions fast.',
    overview:
      'ClearFlow is a single-page website for a local plumbing company, built from the Figma design. It organizes a lot of reassurance — services, pricing, reviews, coverage and FAQs — into a page that stays quick to scan.',
    audience: 'Homeowners and renters looking for a plumber, often with an urgent problem.',
    objective: 'Answer the questions people ask before calling a plumber, and keep booking and calling one tap away.',
    problem:
      'Plumbing customers arrive with specific questions: do you cover my area, what will it cost, can I trust you? A long, static page can bury those answers. The site needed to present thirteen sections of trust-building content while letting visitors get to the answer that matters to them without reading everything.',
    solution:
      'Sections follow the order of a decision — trust, services, why choose us, pricing, reviews, how it works, service areas, FAQ and a final call to action. Small interactions answer questions directly: a ZIP code checker validates the input and confirms coverage, pricing switches between residential and commercial, reviews can be filtered and browsed, and the FAQ expands in place.',
    highlights: [
      { title: 'Service-area ZIP checker', text: 'A validated form that tells visitors immediately whether their ZIP code is covered.' },
      { title: 'Pricing & review controls', text: 'A residential/commercial pricing switch and filterable, scrollable reviews.' },
      { title: 'Clear contact paths', text: 'Booking online and calling are offered side by side in the header and hero.' },
      { title: 'Accessible build', text: 'A skip link, keyboard-friendly menus and accordions, and reduced-motion support.' },
    ],
  }),
  dev({
    slug: 'lumora-solar',
    name: 'Lumora Solar',
    industry: 'Solar Energy',
    liveUrl: 'https://ziahgg.github.io/Lumora-Solar/',
    design: 'solar-energy-website',
    description: 'A solar installer website where the hero estimate form carries its answers into the quote form below.',
    overview:
      'Lumora Solar is a responsive single-page site for a residential and commercial solar installer, built from the Figma design. It walks visitors from the benefits of solar to services, packages, projects, savings and a quote request.',
    audience: 'Homeowners and businesses exploring solar before requesting a quote.',
    objective: 'Explain solar clearly and make the path from first interest to a quote request feel effortless.',
    problem:
      'Solar is a considered purchase, and a page that asks for the same details twice — once to explore, again to request a quote — adds friction at exactly the wrong moment. The site also had to present a lot of material (services, packages, projects, savings, testimonials and FAQs) without losing the main action.',
    solution:
      'The hero "Explore your solar options" card collects a ZIP code, monthly bill and property type, then hands those answers to the quote form in the final call to action, so visitors never repeat themselves. Projects and testimonials are browsable, the FAQ expands in place, and every form confirms on the page. Forms are intentionally not connected to a service yet.',
    highlights: [
      { title: 'Connected forms', text: 'Answers from the hero estimate card prefill the final quote form through a small event-based handoff.' },
      { title: 'Rich content, clear structure', text: 'Thirteen sections, one component each, with copy kept in a central content file.' },
      { title: 'Browsable proof', text: 'Project and testimonial carousels let visitors explore without leaving the page.' },
      { title: 'Accessible & responsive', text: 'Desktop and mobile layouts from the design, a skip link and reduced-motion support.' },
    ],
  }),
  dev({
    slug: 'pipeloop',
    name: 'Pipeloop',
    industry: 'AI-Powered CRM Automation & Sales Management',
    liveUrl: 'https://ziahgg.github.io/Pipeloop/',
    design: 'ai-crm-automation-website',
    description: 'A SaaS marketing site that explains an AI CRM through interactive product UI built in code.',
    overview:
      'Pipeloop is a responsive marketing site for an AI-powered CRM and sales-automation product, built from the Figma homepage. Instead of static screenshots, the product views are built as real interface components.',
    audience: 'Sales teams and leaders evaluating CRM and sales-automation software.',
    objective: 'Make an abstract AI product easy to understand by showing how it works inside realistic, interactive product UI.',
    problem:
      'AI CRM products are hard to grasp from marketing copy alone, and static screenshots quickly look generic or become blurry on large screens. The site needed to show pipeline, automation, assistant and insights features clearly — at any size — while keeping the page readable for a non-technical buyer.',
    solution:
      'Product views are rebuilt as components inside a shared app frame, so they stay sharp and responsive. Feature sections cover the pipeline, automation, the AI assistant, insights and integrations. Interactions demonstrate the product: suggested next steps from the assistant can be added, the insights dashboard switches date ranges, and the FAQ expands in place.',
    highlights: [
      { title: 'Product UI in code', text: 'Dashboards and cards are built as components inside a reusable app frame rather than embedded images.' },
      { title: 'Interactive demos', text: 'Add suggested next steps and switch the insights date range to see the product respond.' },
      { title: 'Accessible charts', text: 'Charts carry descriptive labels so their meaning is available to screen readers.' },
      { title: 'Flexible deployment', text: 'The base path comes from the build environment, so the same code deploys to any repository path.' },
    ],
  }),
  dev({
    slug: 'aster',
    name: 'Aster',
    industry: 'Skin Clinic',
    liveUrl: 'https://ziahgg.github.io/aster/',
    design: 'skin-clinic-website',
    description: 'A consultation-first skin clinic site with treatment and concern browsing and an interactive booking preview.',
    overview:
      'Aster is a responsive one-page website for a consultation-first skin clinic, built from the Figma design with its original imagery and icons.',
    audience: 'Prospective patients researching skin concerns, treatments and specialists.',
    objective: 'Present treatments, specialists and the patient journey calmly, and guide visitors toward booking a consultation.',
    problem:
      'Clinic websites need to carry a lot of reassurance — treatments, concerns, specialists, the clinic itself, results and FAQs — without feeling clinical or overwhelming. Visitors also need a clear idea of what booking looks like before they commit to contacting the clinic.',
    solution:
      'The page moves from treatments and skin concerns to the clinic’s approach, specialists, patient journey, spaces and results, then a FAQ and booking section. The booking widget lets visitors pick a day and time as an interactive preview — it is not connected to a booking system, and the README notes this clearly.',
    highlights: [
      { title: 'Booking preview', text: 'An interactive day-and-time picker that shows how booking would work.' },
      { title: 'Structured content', text: 'Thirteen sections, from treatments and concerns to specialists, results and booking.' },
      { title: 'Faithful brand build', text: 'Colour and type tokens come from the Figma file, with Geist self-hosted and the original design imagery.' },
      { title: 'Responsive & considerate', text: 'Desktop and 390px mobile layouts, a FAQ accordion and reduced-motion support.' },
    ],
  }),
  dev({
    slug: 'algojo-law',
    name: 'Algojo Law',
    industry: 'Legal Services',
    liveUrl: 'https://ziahgg.github.io/Algojo-Law/',
    design: 'legal-service-website',
    description: 'A law firm website with structured practice areas, testimonials and a consultation request form.',
    overview:
      'Algojo Law is a responsive single-page website built from the "Legal Services Homepage" design. It guides visitors from credibility and practice areas to attorneys, the firm’s approach and a consultation request.',
    audience: 'Individuals and businesses looking for legal guidance.',
    objective: 'Present the firm credibly and make requesting a confidential consultation straightforward.',
    problem:
      'Law firm sites must communicate credibility and a wide range of practice areas without overwhelming people who may already be stressed. They also need a clear, low-pressure way to start a conversation — and should never present placeholder figures as real credentials.',
    solution:
      'Practice areas are driven from a single data file, keeping the content easy to maintain. Sections cover credentials, practice areas, why choose us, process, attorneys, approach, insights, testimonials and FAQs before the consultation form. The consultation and newsletter forms show a status message on submit and are not yet connected to a service; metric and contact placeholders from the design are kept clearly bracketed.',
    highlights: [
      { title: 'Data-driven practice areas', text: 'Practice areas render from one data file, so content changes don’t touch layout code.' },
      { title: 'Consultation flow', text: 'A consultation form with on-page confirmation, positioned after the trust-building sections.' },
      { title: 'Testimonial carousel & FAQ', text: 'Browsable testimonials and an expanding FAQ keep long content compact.' },
      { title: 'Honest placeholders', text: 'Figures and contact details from the design remain marked as placeholders until verified.' },
    ],
  }),
  dev({
    slug: 'forma',
    name: 'Forma',
    industry: 'Architecture Studio',
    liveUrl: 'https://ziahgg.github.io/Forma/',
    design: 'architecture-studio-website',
    description: 'An image-led architecture studio site with scroll-aware navigation and swipeable project rails.',
    overview:
      'FORMA is a responsive homepage for a contemporary architecture studio, built from the Figma design. Large photography leads the page, supported by sections on the studio’s services, philosophy, process, materials and sustainability.',
    audience: 'Prospective clients planning homes, workplaces or renovations.',
    objective: 'Let the architecture lead, while keeping a long, story-driven page easy to navigate.',
    problem:
      'An architecture studio’s homepage is long and visual: featured projects, services, philosophy, process, materials, sustainability, team and an inquiry form. Without good orientation, visitors lose their place — and on mobile, wide project imagery has to remain browsable without shrinking into thumbnails.',
    solution:
      'The header highlights the current section as visitors scroll, using an IntersectionObserver, so the navigation always shows where they are. On smaller screens, projects sit in swipeable rails with a swipe hint. The inquiry form validates the email address and is ready to be connected to a form service.',
    highlights: [
      { title: 'Scroll-aware navigation', text: 'The active navigation link updates as each section comes into view.' },
      { title: 'Swipeable project rails', text: 'Featured work stays large on mobile, with a visual hint that more can be swiped.' },
      { title: 'Story-led structure', text: 'Twelve sections, from studio intro and projects to philosophy, materials and team.' },
      { title: 'Considerate motion', text: 'Animations respect the visitor’s reduced-motion setting.' },
    ],
  }),
  dev({
    slug: 'flow-trading',
    name: 'Flow Trading',
    industry: 'Crypto Trading',
    liveUrl: 'https://ziahgg.github.io/FlowTrading/',
    design: 'crypto-trading-website',
    description: 'A crypto & forex platform site with a working demo terminal, market filters and charts — all on sample data.',
    overview:
      'FlowTrading is a responsive homepage for a crypto and forex trading platform, built from the Figma design. It demonstrates the product through interactive, clearly labelled sample data.',
    audience: 'New and experienced traders comparing crypto and forex platforms.',
    objective: 'Present a data-heavy platform in a legible, explorable way — without implying live prices or real trading.',
    problem:
      'Trading platforms are dense: markets, charts, order panels, portfolios and security settings. A marketing site needs to make that depth tangible and explorable, while being careful never to suggest that prices are live or that orders are real.',
    solution:
      'Interactive demos let visitors explore the product: markets filter by category and search, the trading terminal switches buy/sell, price, amount and timeframe and "places" a demo order, and security settings can be toggled. Charts are drawn in code. All prices, balances and positions come from a single sample-data file and are labelled as simulated.',
    highlights: [
      { title: 'Demo trading terminal', text: 'Buy/sell, price and amount inputs, tabs and timeframes in an interactive order panel.' },
      { title: 'Market explorer', text: 'Category filters and search across the sample market list.' },
      { title: 'Charts in code', text: 'Price charts and visuals rendered as components, scaled to the viewport.' },
      { title: 'Responsible data', text: 'All market data lives in one sample-data file and is labelled as simulated on screen.' },
    ],
  }),
  dev({
    slug: 'algojo-tennis',
    name: 'AlgojoTennis',
    industry: 'Tennis',
    liveUrl: 'https://ziahgg.github.io/AlgojoTennis/',
    design: 'tennis-website',
    description: 'A tennis club website with a multi-step court booking preview, event filters and program content.',
    overview:
      'AlgojoTennis is a responsive marketing website for a tennis club, built from the Figma design. It brings programs, coaches, courts, membership, events and booking together on one energetic page.',
    audience: 'Club members, active players, beginners and parents of junior players.',
    objective: 'Help each type of visitor find their path — booking a court, joining a program or exploring membership.',
    problem:
      'A tennis club serves very different visitors, and court booking is the most frequent task. The site needed to show programs, coaches, courts, membership and events for everyone, while making booking feel quick — even though there is no reservation system behind it yet.',
    solution:
      'A booking preview walks through date, court, time and number of players before confirming, demonstrating the intended flow with sample availability. Events can be filtered by tournaments, social, juniors and workshops, and the "AlgojoTennis Difference" section steps through the club’s pillars. The README notes that booking is illustrative and not connected to payments or reservations.',
    highlights: [
      { title: 'Multi-step booking preview', text: 'Date, court, time and players, followed by a confirmation state.' },
      { title: 'Filterable events', text: 'Tournaments, social, juniors and workshops filters for the events list.' },
      { title: 'Interactive storytelling', text: 'A stepper presents the club’s pillars one at a time.' },
      { title: 'Content in one place', text: 'Programs, coaches, courts and events are driven from a central content file.' },
    ],
  }),
  dev({
    slug: 'radar-finance',
    name: 'RadarFinance',
    industry: 'Finance',
    liveUrl: 'https://ziahgg.github.io/RadarFinance/',
    design: 'finance-website',
    description: 'A financial intelligence platform site that explains spending, cash flow and reports with charts built in code.',
    overview:
      'RadarFinance is a responsive marketing website for a financial intelligence platform, built from the Figma design. It explains the product through an overview, dashboard, spending, cash-flow and report sections.',
    audience: 'People who want a clearer picture of their personal finances.',
    objective: 'Make financial insight feel approachable and trustworthy, and show how the platform presents information.',
    problem:
      'Finance products ask for trust and are easy to over-explain. The site had to show what the platform does — dashboards, spending, cash flow, reports and security — in a calm, readable way, without presenting sample numbers as real financial data.',
    solution:
      'Each capability gets its own focused section, with dashboards and charts built as components using illustrative sample data from the design. On mobile, the insights articles become a swipeable carousel with dots that stay in sync, and the menu closes with the Escape key. Sample figures are documented as illustrative.',
    highlights: [
      { title: 'Charts in code', text: 'Dashboard and cash-flow visuals rendered as components rather than static images.' },
      { title: 'Focused sections', text: 'Overview, platform, dashboard, spending, cash flow, reports, security and how it works.' },
      { title: 'Mobile carousel', text: 'Swipeable insight cards with tab-style indicators kept in sync with scrolling.' },
      { title: 'Keyboard-friendly menu', text: 'The mobile menu can be closed with Escape.' },
    ],
  }),
]
