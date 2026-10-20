import type { Project } from '../types'
import { publicUrl } from './site'

/*
 * Video Editing — four short-form Reels.
 *
 * Sources: the supplied caption for each Reel, the cover frames (designed by
 * ZiahBuild, from Reel.zip) and the public Instagram pages, which confirm each
 * Reel was published by Qube Media (@qubemediamy). The full videos were not
 * reviewed for this copy, so Creative Direction is based on the caption and cover
 * only, and Editing Approach describes what the edit needed to achieve — not
 * specific CapCut effects. No engagement metrics are shown.
 *
 * Covers: /public/covers/video-editing/<name>.png (original 1080×1920) plus a
 * 720×1280 JPEG for grids.
 */

const COVER_EVIDENCE = 'Based on the published caption and the cover frame.'
const EDIT_EVIDENCE = 'Edited in CapCut. Specific effects and techniques are not listed here.'

interface ReelInput {
  slug: string
  name: string
  cover: string
  coverAlt: string
  instagramUrl: string
  published: string
  caption: string
  description: string
  overview: string
  audience: string
  objective: string
  contentObjective: string
  creativeDirection: string
  creativeNote?: string
  editingApproach: string
  reflection: string
}

function reel(input: ReelInput): Project {
  const file = `covers/video-editing/${input.cover}`
  return {
    slug: `video-editing/${input.slug}`,
    name: input.name,
    category: 'Video Editing',
    industry: 'Short-form video · Instagram Reel',
    kind: 'Published Reel',
    services: ['video'],
    scope: ['Video editing', 'Cover design', '9:16 Reel'],
    software: 'CapCut',
    role: 'Video editing in CapCut and the Reel cover design. Scripting, filming and voice-over are not part of what this case study claims.',
    instagramUrl: input.instagramUrl,
    published: input.published,
    caption: input.caption,
    description: input.description,
    overview: input.overview,
    audience: input.audience,
    objective: input.objective,
    objectiveLabel: 'Communication objective',
    technologies: [],
    sections: [
      { title: 'Content objective', text: input.contentObjective },
      { title: 'Creative direction', text: input.creativeDirection, note: input.creativeNote ?? COVER_EVIDENCE },
      { title: 'Editing approach', text: input.editingApproach, note: EDIT_EVIDENCE },
      { title: 'Project reflection', text: input.reflection },
    ],
    media: {
      image: publicUrl(`${file}.png`),
      thumb: publicUrl(`${file}-1280.jpg`),
      width: 1080,
      height: 1920,
      alt: input.coverAlt,
      placeholder: 'video',
    },
  }
}

export const videoProjects: Project[] = [
  reel({
    slug: 'malaysia-ai-skills',
    name: 'Malaysia AI Skills',
    cover: 'malaysia-ai-skills',
    coverAlt:
      'Reel cover: "Malaysia Is Giving Free AI Software To 100,000 Youths", with AI app icons marked by question marks above a group of figures',
    instagramUrl: 'https://www.instagram.com/reel/DcIvD3qD_Ij/?srtk=OGhvOTNuYmltaDho',
    published: 'Qube Media on Instagram · 14 August 2026',
    caption:
      'Malaysia is investing in AI skills by offering free AI software to eligible youths. The biggest opportunity is not free access. It is learning the skills that shape tomorrow.\n👇 If you qualified, which AI tool would you choose first?\nThe Intelligence Behind Every Customer Conversation.',
    description:
      'A Reel on Malaysia offering free AI software to eligible youths — framing access as the start, and skills as the real opportunity.',
    overview:
      'A vertical Reel about Malaysia offering free AI software to eligible young people. Rather than simply announcing the news, it reframes it: the opportunity is not the free access, but the skills young people can build with it.',
    audience: 'Young Malaysians and students who may qualify, and followers interested in AI and future careers.',
    objective:
      'Turn a policy headline into a personal question — which AI tool would you learn first? — and move attention from access to skills.',
    contentObjective:
      'The news is simple: free AI software for eligible youths. The Reel’s job is to make it matter to the viewer. The caption argues that free access is worth less than the skills it unlocks, then asks which AI tool viewers would choose first — a question that invites young people to picture themselves using the opportunity.',
    creativeDirection:
      'The cover leads with the headline “Malaysia Is Giving Free AI Software To 100,000 Youths”, with the number set large in yellow so the scale registers at a glance. Familiar AI app icons sit under question marks — a visual cue for the choice the caption asks viewers to make. The Qube Media mark and dark grid background place it within the series’ visual identity.',
    editingApproach:
      'For a news-led Reel, the edit has to keep a clear order: state the news, reframe it, then hand over to the question. The key figure needs to be readable instantly on a phone screen, and the pacing needs to leave room for the reframe — skills, not access — so the closing question lands.',
    reflection:
      'The challenge was to stop an upbeat news item from reading as a plain announcement. Ending on a question viewers can answer in the comments turns information into a prompt to take part.',
  }),
  reel({
    slug: 'ai-business-workflows',
    name: 'AI Business Workflows',
    cover: 'ai-business-workflows',
    coverAlt:
      'Reel cover: "38% of Malaysian businesses use AI", with a shrugging figure in a suit surrounded by AI app icons',
    instagramUrl: 'https://www.instagram.com/reel/Dda9Z00n5K8/?obrf=MXFpdjJlN21mOXBzNQ==',
    published: 'Qube Media on Instagram · 8 September 2026',
    caption:
      'But using AI is only the beginning. The real opportunity is scaling AI across business workflows, customer conversations, and daily operations.\n👇 Do you think Malaysia can become Asia’s next AI powerhouse?\nThe Intelligence Behind Every Customer Conversation.',
    description:
      'A Reel that moves the AI conversation from adoption to integration — business workflows, customer conversations and daily operations.',
    overview:
      'A vertical Reel about the step after adopting AI tools: scaling AI across business workflows, customer conversations and daily operations, and what that could mean for Malaysia’s ambitions.',
    audience: 'Business owners, managers and professionals in Malaysia who use, or are considering, AI tools.',
    objective:
      'Shift the message from “businesses are using AI” to “the opportunity is in how deeply AI is built into the business”.',
    contentObjective:
      'Many businesses have tried AI tools; fewer have built them into how they operate. The caption treats adoption as only the beginning and names three places where the real opportunity lies — workflows, customer conversations and daily operations — before widening to a national question: can Malaysia become Asia’s next AI powerhouse?',
    creativeDirection:
      'The cover opens with “38% of Malaysian businesses use AI”, establishing adoption as the starting point. A figure in a suit shrugs among AI app icons, suggesting uncertainty about what comes next — exactly the gap the caption addresses. A light background with yellow accents keeps it within the series look.',
    creativeNote:
      'Based on the published caption and the cover frame. The 38% figure is shown as stated on the cover and was not independently verified.',
    editingApproach:
      'The message has a two-step structure — where businesses are now, then where the opportunity is — so the edit needs a clear turn between the two. The three focus areas are easiest to follow when each gets its own moment on screen, so viewers can take them in without pausing.',
    reflection:
      '“AI in business” is broad and familiar. Anchoring the message in one statistic and three concrete areas gives viewers something specific to remember before the bigger question at the end.',
  }),
  reel({
    slug: 'malaysia-ai-investment',
    name: 'Malaysia AI Investment',
    cover: 'malaysia-ai-investment',
    coverAlt:
      'Reel cover: "Who will lead Malaysia’s AI future?" above a halftone question mark and an AI humanoid, with the on-screen line "who will build and benefit from it?"',
    instagramUrl: 'https://www.instagram.com/reel/DdGYqIIHxmX/?exln=bnZ2Nmt2eHg1cGMy',
    published: 'Qube Media on Instagram · 8 September 2026',
    caption:
      'Malaysia’s AI market is gaining investor attention, with Zetrix AI reporting RM269.25M in Q2 net profit. What do you think this means for Malaysia’s AI future?\nThe Intelligence Behind Every Customer Conversation.\n👇 Do you think Malaysia can become Asia’s next AI powerhouse?',
    description:
      'Business and technology content on Malaysia’s AI investment landscape — a reported financial result framed within a bigger question about the future.',
    overview:
      'A vertical Reel on growing investor attention in Malaysia’s AI market. The caption cites a reported Q2 result from Zetrix AI and uses it to open a wider question about who will lead — and benefit from — Malaysia’s AI future.',
    audience: 'Followers interested in business, investing and Malaysia’s technology sector.',
    objective:
      'Use one financial headline as an entry point into a broader conversation about Malaysia’s AI future, without turning it into investment advice.',
    contentObjective:
      'Financial figures can feel distant from everyday viewers. The Reel uses one reported result as a sign that the market is drawing attention, then widens the lens: what does it mean for Malaysia’s AI future, and can the country become Asia’s next AI powerhouse?',
    creativeDirection:
      'The cover leads with a question rather than the number — “Who will lead Malaysia’s AI future?” — over a halftone question mark and an AI humanoid. An on-screen line, “who will build and benefit from it?”, shows the Reel speaks about people as well as markets. The financial figure is carried in the caption.',
    creativeNote:
      'Based on the published caption and the cover frame. The RM269.25M figure is quoted from the caption as a reported result and was not independently verified for this case study.',
    editingApproach:
      'Presenting a financial claim responsibly means keeping it clearly attributed — a reported result, not a forecast — and giving it context before moving to the open question. Readable on-screen text matters here, for viewers watching without sound.',
    reflection:
      'The challenge was balance: making a financial headline engaging without overstating it. Leading with a question and attributing the figure keeps the focus on discussion rather than on the number itself.',
  }),
  reel({
    slug: 'customer-feedback-insights',
    name: 'Customer Feedback Insights',
    cover: 'customer-feedback-insights',
    coverAlt:
      'Reel cover: "Another Customer Complaint? Bad News Again?" with a frustrated man holding a football boot and a tablet',
    instagramUrl: 'https://www.instagram.com/reel/DcQfJ_rDyvM/?srtk=MTgyM2U2bWNzcXo0eg==',
    published: 'Qube Media on Instagram · 14 August 2026',
    caption:
      'Every customer complaint reveals more than a single problem. Hidden patterns can uncover opportunities to improve products, services, and customer experience before small issues become bigger business challenges.\n👇 What’s the most valuable lesson you’ve learned from customer feedback?\nThe Intelligence Behind Every Customer Conversation.',
    description:
      'An educational Reel on reading customer complaints as signals — finding patterns that can improve products, services and experience.',
    overview:
      'A vertical Reel about what businesses can learn from customer feedback: a complaint reveals more than one problem, and patterns across complaints point to improvements before small issues grow.',
    audience: 'Business owners and the customer-experience and support teams who handle feedback.',
    objective:
      'Reframe complaints from bad news into useful information, and invite viewers to share a lesson they have learned from feedback.',
    contentObjective:
      'Most people treat a complaint as a one-off problem to fix. The caption argues for a different view: hidden patterns across complaints can reveal ways to improve products, services and customer experience before small issues become bigger challenges. It closes by asking viewers for their most valuable lesson from customer feedback.',
    creativeDirection:
      'The cover opens on a relatable moment — “Another Customer Complaint? Bad News Again?” — with a frustrated man holding a football boot and a tablet. Starting from the feeling of receiving bad news gives the reframe somewhere to go. The light background and yellow shapes match the rest of the series.',
    editingApproach:
      'The structure moves from frustration to insight, so the edit needs a clear emotional turn: the opening should feel familiar, and the shift to “patterns, not single problems” must be easy to follow. Keeping the takeaway short and on screen helps it stay with the viewer.',
    reflection:
      'The challenge was making an abstract idea — finding patterns in feedback — feel concrete. A recognisable scenario at the start gives viewers a reason to stay for the lesson.',
  }),
]
