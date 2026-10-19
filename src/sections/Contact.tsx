import { ArrowUpRight } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { Eyebrow } from '../components/Eyebrow'
import { Swoosh } from '../components/Swoosh'
import { mailto, site } from '../data/site'

export function Contact() {
  const hasEmail = Boolean(site.email)
  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-3">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[28px] bg-black px-6 py-16 text-white sm:px-12 sm:py-24 lg:px-16 lg:py-28">
          <Swoosh className="pointer-events-none absolute -right-16 -top-10 -z-10 size-[420px] text-blue opacity-90 sm:size-[560px]" />
          <Eyebrow inverted>Contact</Eyebrow>
          <h2 id="contact-title" className="display mt-6 max-w-4xl text-[clamp(2.75rem,8vw,7rem)]">
            Have an Idea?
            <br />
            <span className="text-blue">Let&apos;s Build It.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Whether you need a website, a digital product, a stronger visual identity, or creative content, let&apos;s
            turn your next idea into something real.
          </p>

          {hasEmail ? (
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={mailto('New project enquiry')} size="lg">
                Start a Project
              </ButtonLink>
              <ButtonLink href={mailto()} size="lg" variant="light">
                Get in Touch
              </ButtonLink>
            </div>
          ) : (
            import.meta.env.DEV && (
              <p className="mt-10 max-w-md rounded-xl border border-dashed border-white/30 p-4 text-sm text-white/60">
                Dev note: set <code className="text-white">email</code> in <code className="text-white">src/data/site.ts</code>{' '}
                to show the “Start a Project” and “Get in Touch” buttons. This note is hidden in production.
              </p>
            )
          )}

          {(hasEmail || site.socials.length > 0) && (
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-sm">
              {hasEmail && (
                <a href={mailto()} className="text-white/80 underline-offset-4 hover:text-blue hover:underline">
                  {site.email}
                </a>
              )}
              {site.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-white/80 hover:text-blue"
                >
                  {s.label} <ArrowUpRight className="size-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
