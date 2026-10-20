# ZiahBuild — Portfolio

Personal portfolio for **ZiahBuild** — UI/UX & Figma, social media design, full-stack web development,
Shopify, video editing and website design.

A fully static single-page site: **Vite + React + TypeScript + Tailwind CSS + Lucide**.
No backend, database, authentication or environment variables.

Brand palette is locked to three colors in `src/styles/index.css` (`@theme`):
white `#FFFFFF`, black `#000000`, electric blue `#1463FF`. Greys are opacity variations of black/white.

## Run locally

Requires Node.js 20.19+ (or 22+).

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # type-checks, then outputs static files to dist/
npm run preview    # serves dist/ locally
```

Production builds use `base: '/ZiahBuild/'` (set in `vite.config.ts`), matching the GitHub Pages URL
**https://ziahgg.github.io/ZiahBuild/**. The dev server still runs at `/`.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository (default branch `main`).
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `dist/`.
   You can also run it manually from the **Actions** tab.

**Custom domain:** add a file `public/CNAME` containing your domain (e.g. `ziahbuild.com`),
change the build `base` in `vite.config.ts` to `'/'`, configure the DNS records GitHub describes,
and set the domain under **Settings → Pages**.

## Editing content

All content lives in `src/data/` — components don't need to change.

| File | What it holds |
| --- | --- |
| `src/data/site.ts` | Email, social links, CV file, bio, navigation |
| `src/data/services.ts` | The six services |
| `src/data/projects.ts` | Projects: cover image, services, overview, problem, solution, Figma / website / GitHub links |
| `src/data/designProjects.ts` | 10 website + 10 social media case studies: covers, Figma links, problem/solution |
| `src/data/developmentProjects.ts` | 10 live websites: screenshots, live URLs, problem/solution, verified highlights |
| `src/data/fullStackProjects.ts` | 5 full-stack technical case studies: covers, repos, implementation, highlights, limitations |
| `src/data/videoProjects.ts` | 4 Reel case studies: covers, Instagram links, captions, editorial sections |
| `src/data/shopifyProjects.ts` | Shopify Website Design projects (Sheps Farm) |
| `src/data/showcase.ts` | UI/UX, web, social and Shopify galleries |

- **Contact** — `site.email`, `site.phone` and `site.whatsappUrl` in `src/data/site.ts`. Every contact
  button (Let's Talk, Let's Work Together, Work With Me, Start a Project, Get in Touch, Discuss a Project)
  opens the WhatsApp link; the email and phone appear as `mailto:` / `tel:` links in the Contact section
  and footer. Add profiles to `site.socials` to show them too.
- **CV** — put the PDF in `public/` and set `site.cvFile` (e.g. `'ZiahBuild-CV.pdf'`); a download button appears.
- **Project screenshots** — put images in `src/assets/projects/`, import them in `projects.ts`
  and set `media.image` + `media.alt`. Until then a labelled “Preview coming soon” placeholder is shown.
- **Pages** — each service card has a **View work** button → `#/services/<slug>` lists the projects whose
  `services` include that slug. Each project opens `#/work/<slug>` with the cover, Figma / website buttons
  (shown only when `figmaUrl` / `liveUrl` are set), overview, problem and solution. Hash URLs need no
  server rewrites, so they work on GitHub Pages.
- **Project kind** — `Client project`, `Personal project` or `Concept`. Please confirm each entry.
- **Technologies** — only add technologies actually used in that project.
- **Portrait** — import an image in `src/sections/About.tsx` and assign it to `portrait`.
- **Open Graph image** — add `public/og-image.png` (1200×630) and the absolute `og:image` / `og:url`
  tags in `index.html` once the final URL is known.

## Structure

```
src/
  components/   reusable UI (buttons, headings, placeholders, media frame)
  sections/     the homepage sections in page order
  data/         all editable content
  styles/       global styles and design tokens
  assets/       local images
public/         favicon, .nojekyll, CV / videos when available
```
