import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { useActiveSection } from '../components/useActiveSection'
import { navLinks } from '../data/site'

const sectionIds = navLinks.map((l) => l.href.slice(1))

export function Navigation({ onHome = true }: { onHome?: boolean }) {
  const [open, setOpen] = useState(false)
  const activeSection = useActiveSection(sectionIds)
  // Sub-pages (service work, project detail) don't highlight a homepage section.
  const active = onHome ? activeSection : ''

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <a
        href="#main"
        className="sr-only rounded-full bg-blue px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className="mx-auto max-w-[1376px] rounded-2xl bg-black/[0.86] text-white shadow-[0_12px_40px_-16px_rgb(0_0_0/0.5)] backdrop-blur-md"
      >
        <div className="flex h-14 items-center gap-6 pl-5 pr-2.5 sm:h-[60px]">
          <a href="#home" className="flex items-center text-xl font-bold tracking-[-0.04em]" aria-label="ZiahBuild — home">
            <span className="text-blue">ZiahBuild</span>
            <span className="text-white">.</span>
          </a>
          <span aria-hidden="true" className="hidden h-[60px] w-px bg-white/15 md:block" />
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors hover:text-white ${
                      isActive ? 'text-white' : 'text-white/65'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-blue transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="ml-auto flex items-center gap-2">
            <ButtonLink href="#contact" size="sm" className="hidden h-9 px-4 sm:inline-flex">
              Let&apos;s Talk
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10 md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <div
          id="mobile-menu"
          hidden={!open}
          className="border-t border-white/10 px-3 pb-3 pt-2 md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-base font-medium hover:bg-white/5 ${
                    active === link.href.slice(1) ? 'text-white' : 'text-white/65'
                  }`}
                >
                  {link.label}
                  {active === link.href.slice(1) && <span className="size-1.5 rounded-full bg-blue" />}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href="#contact" onClick={() => setOpen(false)} className="mt-2 w-full">
            Let&apos;s Talk
          </ButtonLink>
        </div>
      </nav>
    </header>
  )
}
