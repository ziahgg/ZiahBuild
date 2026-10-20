import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { Eyebrow } from '../components/Eyebrow'
import { Swoosh } from '../components/Swoosh'
import { mailto, site, tel, whatsappLink } from '../data/site'

export function Contact() {
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

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink {...whatsappLink} size="lg">
              Start a Project
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </ButtonLink>
            <ButtonLink {...whatsappLink} size="lg" variant="light">
              Get in Touch
              <span className="sr-only"> (opens WhatsApp in a new tab)</span>
            </ButtonLink>
          </div>

          <dl className="mt-14 grid gap-6 border-t border-white/15 pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.08em] text-white/45">Email</dt>
              <dd className="mt-2">
                <a href={mailto()} className="inline-flex items-center gap-2 break-all text-white/85 underline-offset-4 hover:text-blue hover:underline">
                  <Mail aria-hidden="true" className="size-4 shrink-0" />
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.08em] text-white/45">Phone</dt>
              <dd className="mt-2">
                <a href={tel()} className="inline-flex items-center gap-2 text-white/85 underline-offset-4 hover:text-blue hover:underline">
                  <Phone aria-hidden="true" className="size-4 shrink-0" />
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.08em] text-white/45">WhatsApp</dt>
              <dd className="mt-2">
                <a
                  {...whatsappLink}
                  className="inline-flex items-center gap-2 text-white/85 underline-offset-4 hover:text-blue hover:underline"
                >
                  <MessageCircle aria-hidden="true" className="size-4 shrink-0" />
                  Chat on WhatsApp <ArrowUpRight aria-hidden="true" className="size-4" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>

          {site.socials.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
              {site.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
