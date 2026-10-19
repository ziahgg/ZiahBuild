import { FileDown } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { Eyebrow } from '../components/Eyebrow'
import { Placeholder } from '../components/Placeholder'
import { services } from '../data/services'
import { publicUrl, site } from '../data/site'

/** Set to an imported image (e.g. `import portrait from '../assets/portrait.webp'`) when available. */
const portrait: string | undefined = undefined

const approach = [
  { step: 'Discover', text: 'Understand the goal, the audience and what success looks like.' },
  { step: 'Design', text: 'Shape structure, visuals and interactions in Figma.' },
  { step: 'Build', text: 'Turn the design into responsive, maintainable code or content.' },
  { step: 'Refine', text: 'Review, test and polish the details before handing over.' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden rounded-[22px] lg:min-h-full">
            {portrait ? (
              <img src={portrait} alt="Portrait of ZiahBuild" loading="lazy" className="h-full w-full object-cover" />
            ) : (
              <Placeholder variant="portrait" tone="light" label="Portrait coming soon" />
            )}
            <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.35)] sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-72">
              <p className="text-[11px] uppercase tracking-[0.08em] text-black/50">Core capabilities</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {services.map((s) => (
                  <li key={s.number} className="rounded-full border border-black/10 px-2.5 py-1 text-[11px] text-black/75">
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col rounded-[22px] bg-black/[0.86] p-6 text-white sm:p-8 lg:p-10">
            <Eyebrow inverted>About me</Eyebrow>
            <h2 id="about-title" className="display mt-5 text-[clamp(2.25rem,4.4vw,3.6rem)]">
              One Creative Mind.
              <br />
              <span className="text-white/45">Multiple Ways to Build.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/75">
              I enjoy turning ideas into digital experiences that look intentional, feel intuitive, and work as
              expected. From designing interfaces in Figma to developing full-stack applications, creating Shopify
              storefronts, producing social media visuals, and editing videos, I bring different creative and technical
              disciplines together to deliver cohesive results.
            </p>
            {site.bio && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">{site.bio}</p>}

            <h3 className="mt-10 text-[11px] font-medium uppercase tracking-[0.08em] text-white/50">Working approach</h3>
            <ol className="mt-4 grid gap-3 sm:grid-cols-2">
              {approach.map(({ step, text }, i) => (
                <li key={step} className="rounded-2xl border border-white/15 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <span className="tabular-nums text-blue">0{i + 1}</span> {step}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">{text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-2.5 lg:mt-auto lg:pt-10">
              <ButtonLink href="#contact">Work With Me</ButtonLink>
              {site.cvFile && (
                <a
                  href={publicUrl(site.cvFile)}
                  download
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-blue hover:text-white"
                >
                  <FileDown className="size-4" /> Download CV
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
