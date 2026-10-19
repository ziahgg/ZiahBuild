import { Container } from '../components/Container'
import { navLinks, site } from '../data/site'

export function Footer() {
  return (
    <footer className="pb-8 pt-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#home" className="text-2xl font-bold tracking-[-0.04em]">
              <span className="text-black">ZiahBuild</span>
              <span className="text-blue">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-black/55">{site.statement}</p>
          </div>
          <nav aria-label="Footer">
            <p className="text-[11px] uppercase tracking-[0.08em] text-black/45">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-black/75 hover:text-blue">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {site.socials.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-[0.08em] text-black/45">Elsewhere</p>
              <ul className="mt-4 space-y-2 text-sm">
                {site.socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="text-black/75 hover:text-blue">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-black/10 pt-6 text-xs text-black/45 sm:flex-row">
          <p>© {new Date().getFullYear()} ZiahBuild. All rights reserved.</p>
          <p>Designed &amp; built by ZiahBuild.</p>
        </div>
      </Container>
    </footer>
  )
}
