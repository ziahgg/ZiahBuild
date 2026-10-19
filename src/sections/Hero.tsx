import { ArrowUpRight, MousePointer2 } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { Eyebrow } from '../components/Eyebrow'
import { MediaFrame } from '../components/MediaFrame'
import { Swoosh } from '../components/Swoosh'
import { projects } from '../data/projects'
import { services } from '../data/services'
import { expertise } from '../data/site'
import { routes } from '../routes'

const featured = projects[0]

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="pt-28 sm:pt-36">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>Welcome to ZiahBuild</Eyebrow>
          <h1 id="hero-title" className="display mt-6 text-[clamp(2.6rem,7.6vw,6.25rem)]">
            I Design It.
            <br />
            I Build It.{' '}
            <span
              aria-hidden="true"
              className="relative -top-[0.06em] mx-[0.04em] inline-grid size-[0.8em] place-items-center rounded-[0.2em] bg-blue align-middle text-white"
            >
              <Swoosh className="size-[0.5em]" />
            </span>{' '}
            <span className="text-black/30">
              I Make
              <br />
              It Work.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-black/60 sm:text-base">
            I&apos;m a multidisciplinary designer and full-stack web developer creating thoughtful digital experiences,
            distinctive visuals, and functional websites for ambitious brands.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:mt-14 lg:grid-cols-2">
          {/* Left: intro card */}
          <div className="flex flex-col rounded-[22px] bg-black/[0.86] p-6 text-white sm:p-8 lg:min-h-[600px]">
            <Eyebrow inverted>Designer &amp; developer</Eyebrow>
            <h2 className="display mt-5 text-[clamp(2.2rem,4.2vw,3.4rem)]">
              Sketch first.
              <br />
              <span className="text-white/45">Ship always.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              One person across the whole journey — interface, visuals, code and motion — so nothing gets lost
              between design and development.
            </p>
            <ul aria-label="Expertise" className="mt-5 flex max-w-lg flex-wrap gap-x-2 gap-y-1 text-[13px] text-white/55">
              {expertise.map((item, i) => (
                <li key={item} className="flex items-center gap-2">
                  {item}
                  {i < expertise.length - 1 && <span aria-hidden="true" className="text-blue">·</span>}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <ButtonLink href="#projects">View My Work</ButtonLink>
              <ButtonLink href="#contact" variant="light">
                Let&apos;s Work Together
              </ButtonLink>
            </div>

            <a
              href={routes.project(featured.slug)}
              className="group mt-10 flex items-center gap-4 rounded-2xl border border-white/20 p-3 transition-colors hover:border-white/40 lg:mt-auto"
            >
              <div className="aspect-[5/4] w-28 shrink-0 overflow-hidden rounded-xl sm:w-32">
                <MediaFrame media={{ ...featured.media, tone: 'blue' }} label={false} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.08em] text-white/50">Featured project</p>
                <p className="mt-1 text-base font-medium leading-snug sm:text-lg">
                  {featured.name} — {featured.category}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-blue">
                  See Project <Swoosh className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          </div>

          {/* Right: design → code composition */}
          <div className="relative min-h-[520px] overflow-hidden rounded-[22px] bg-black/[0.06] sm:min-h-[600px]">
            <div className="dot-grid absolute inset-0 text-black opacity-[0.12]" />
            <DesignCanvas />
            <div className="absolute inset-x-3 bottom-3 grid grid-cols-2 gap-3 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[min(100%-2rem,440px)]">
              <StatCard
                value="6"
                unit="in 1"
                label={`${services.length} disciplines, one point of contact`}
                pill="Design · Build · Motion"
              />
              <StatCard value="UI" unit="→ Code" label="From Figma file to production build" pill="View selected work" href="#projects" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function StatCard({
  value,
  unit,
  label,
  pill,
  href,
}: {
  value: string
  unit: string
  label: string
  pill: string
  href?: string
}) {
  const pillClass =
    'mt-3 inline-flex items-center gap-1.5 rounded-full border border-black/10 px-2.5 py-1.5 text-[11px] text-black/70'
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.35)]">
      <p className="text-2xl font-semibold tracking-tight sm:text-[28px]">
        {value}
        <span className="ml-0.5 text-lg text-blue sm:text-xl">{unit}</span>
      </p>
      <p className="mt-1 text-[11px] leading-snug text-black/55 sm:text-xs">{label}</p>
      {href ? (
        <a href={href} className={`${pillClass} transition-colors hover:border-blue hover:text-blue`}>
          <ArrowUpRight className="size-3" /> {pill}
        </a>
      ) : (
        <span className={pillClass}>
          <ArrowUpRight className="size-3" /> {pill}
        </span>
      )}
    </div>
  )
}

/** Abstract illustration of the design-to-development workflow. */
function DesignCanvas() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      {/* Design frame with selection */}
      <div className="absolute left-[7%] top-[8%] w-[70%] max-w-[440px]">
        <p className="mb-1.5 text-[10px] font-medium text-black/45">Home — Desktop 1440</p>
        <div className="relative rounded-md bg-white p-[6%] shadow-[0_24px_50px_-24px_rgb(0_0_0/0.35)]">
          <div className="flex items-center justify-between">
            <span className="h-2 w-14 rounded-full bg-black" />
            <span className="flex gap-1.5">
              <span className="h-1.5 w-6 rounded-full bg-black/15" />
              <span className="h-1.5 w-6 rounded-full bg-black/15" />
              <span className="h-1.5 w-6 rounded-full bg-black/15" />
            </span>
          </div>
          <div className="relative mt-[8%]">
            <div className="space-y-2">
              <span className="block h-3.5 w-11/12 rounded bg-black/80" />
              <span className="block h-3.5 w-3/5 rounded bg-black/25" />
            </div>
            {/* selection box */}
            <span className="absolute -inset-1.5 border border-blue">
              {[
                '-left-1 -top-1',
                '-right-1 -top-1',
                '-left-1 -bottom-1',
                '-right-1 -bottom-1',
              ].map((p) => (
                <span key={p} className={`absolute size-2 border border-blue bg-white ${p}`} />
              ))}
              <span className="absolute -top-5 left-0 rounded-sm bg-blue px-1 py-px text-[9px] text-white">H1 · 96</span>
            </span>
          </div>
          <span className="mt-[7%] block h-5 w-24 rounded-full bg-blue" />
          <div className="mt-[8%] grid grid-cols-3 gap-2">
            <span className="aspect-[4/3] rounded bg-black/[0.07]" />
            <span className="aspect-[4/3] rounded bg-black/[0.07]" />
            <span className="aspect-[4/3] rounded bg-black/[0.07]" />
          </div>
        </div>
        <MousePointer2 className="absolute -right-3 top-[44%] size-5 fill-blue text-blue" />
      </div>

      {/* Code panel */}
      <div className="absolute right-[5%] top-[30%] hidden w-[46%] max-w-[300px] rounded-xl bg-black p-4 font-mono text-[10.5px] leading-[1.7] text-white/70 shadow-[0_24px_50px_-20px_rgb(0_0_0/0.5)] sm:block">
        <div className="mb-3 flex gap-1.5">
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/25" />
        </div>
        <p>
          <span className="text-blue">export function</span> <span className="text-white">Hero</span>() {'{'}
        </p>
        <p className="pl-3">
          <span className="text-blue">return</span> (
        </p>
        <p className="pl-6">
          &lt;<span className="text-white">h1</span> className=
          <span className="text-white/90">&quot;display&quot;</span>&gt;
        </p>
        <p className="pl-9 text-white">I Design It.</p>
        <p className="pl-6">
          &lt;/<span className="text-white">h1</span>&gt;
        </p>
        <p className="pl-3">)</p>
        <p>{'}'}</p>
      </div>
    </div>
  )
}
