import { useLayoutEffect, useRef } from 'react'
import { getProject } from './data/projects'
import { getService } from './data/services'
import { HomePage } from './pages/HomePage'
import { ProjectPage } from './pages/ProjectPage'
import { ServiceWorkPage } from './pages/ServiceWorkPage'
import { useHashRoute } from './routes'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { Navigation } from './sections/Navigation'

const baseTitle = 'ZiahBuild — Designer & Full-Stack Developer'

export default function App() {
  const route = useHashRoute()
  const service = route.name === 'service' ? getService(route.slug) : undefined
  const project = route.name === 'project' ? getProject(route.slug) : undefined
  const page = service ? 'service' : project ? 'project' : 'home'

  // Scroll handling between "pages": sub-pages start at the top; returning
  // home to a section anchor scrolls there once the homepage has rendered.
  const previousPage = useRef(page)
  useLayoutEffect(() => {
    const cameFromSubPage = previousPage.current !== 'home'
    previousPage.current = page
    if (page !== 'home') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (cameFromSubPage) {
      const anchor = route.name === 'home' ? route.anchor : undefined
      const target = anchor ? document.getElementById(anchor) : null
      if (target) target.scrollIntoView({ behavior: 'instant' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }
    document.title = service
      ? `${service.title} — Work · ZiahBuild`
      : project
        ? `${project.name} — ${project.category} · ZiahBuild`
        : baseTitle
  }, [route, page, service, project])

  return (
    <>
      <Navigation onHome={page === 'home'} />
      <main id="main" key={page === 'home' ? 'home' : window.location.hash}>
        {service ? (
          <ServiceWorkPage service={service} />
        ) : project ? (
          <ProjectPage project={project} />
        ) : (
          <HomePage />
        )}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
