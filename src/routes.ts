import { useEffect, useState } from 'react'

/*
 * Minimal hash router. GitHub Pages has no server rewrites, so sub-pages
 * live under `#/…`. Any other hash (e.g. `#services`) is a section anchor
 * on the homepage.
 */
export type Route =
  | { name: 'home'; anchor?: string }
  | { name: 'service'; slug: string }
  | { name: 'project'; slug: string }

export const routes = {
  service: (slug: string) => `#/services/${slug}`,
  project: (slug: string) => `#/work/${slug}`,
}

export function parseHash(hash: string): Route {
  const service = hash.match(/^#\/services\/([\w-]+)\/?$/)
  if (service) return { name: 'service', slug: service[1] }
  const project = hash.match(/^#\/work\/([\w-]+(?:\/[\w-]+)?)\/?$/)
  if (project) return { name: 'project', slug: project[1] }
  const anchor = hash.replace(/^#\/?/, '')
  return { name: 'home', anchor: anchor || undefined }
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash))
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
