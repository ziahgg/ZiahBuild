import type { Project } from '../types'
import { publicUrl } from './site'

/*
 * Full-Stack Web Development — technical case studies.
 *
 * Sources (checked October 2026): each repository's README and docs, its
 * package manifest, and spot checks of the source for every central claim
 * (webhooks, auth layers, RLS policies, outbox, RAG and agent guards).
 * Test counts and eval figures are quoted from the READMEs and labelled as such;
 * none of these projects was built or tested as part of the portfolio.
 * All five repositories have a single contributor (ziahgg) and no live demo.
 * Nuvora (added later, same owner, no live demo) is the exception on testing:
 * its type check, lint and Jest suite were run during development; its pgTAP
 * tests were not. Its cover uses screens captured from the running app.
 *
 * Covers come from ZiahBuild-Full-Stack-Covers.zip (original 1920×1080 PNGs)
 * in /public/covers/full-stack/, plus a 1280px JPEG for grids.
 *
 * Add a project: append a `fullStack({...})` entry — the collection page,
 * card and case study pick it up automatically.
 */

type FullStackInput = Omit<
  Project,
  'slug' | 'category' | 'kind' | 'services' | 'media' | 'githubUrl' | 'scope'
> & { slug: string; repo: string; cover: string; coverAlt: string; scope: string[] }

function fullStack({ slug, repo, cover, coverAlt, ...rest }: FullStackInput): Project {
  const file = `covers/full-stack/${cover}`
  return {
    ...rest,
    slug: `full-stack/${slug}`,
    category: 'Full-Stack Web Development',
    kind: 'Personal project',
    services: ['full-stack'],
    githubUrl: `https://github.com/ziahgg/${repo}`,
    problemSource:
      'Problem framing interpreted from the repository’s documentation and code — this is a portfolio project, not a client brief.',
    media: {
      image: publicUrl(`${file}.png`),
      thumb: publicUrl(`${file}-1280.jpg`),
      width: 1920,
      height: 1080,
      alt: coverAlt,
      placeholder: 'dashboard',
    },
  }
}

export const fullStackProjects: Project[] = [
  fullStack({
    slug: 'webship-ecommerce',
    repo: 'webship-e-commerce',
    cover: 'webship-ecommerce-cover',
    coverAlt: 'Webship cover: storefront product grid and an admin order-status panel showing the Stripe checkout flow',
    name: 'Webship',
    industry: 'E-commerce platform',
    scope: ['Storefront', 'Admin dashboard', 'Payments', 'Auth'],
    description:
      'Full-stack e-commerce app with a customer storefront, Stripe checkout and a role-protected admin dashboard.',
    overview:
      'Webship is an online store built end to end: customers browse and search products, manage a cart, check out with Stripe and review their orders; admins manage products with variants, update order status and view customers and sales statistics.',
    audience: 'Shoppers, and store staff who manage the catalogue, orders and customers.',
    role: 'Sole developer — data model, API route handlers, authentication, Stripe integration and both the storefront and admin interfaces. The README notes that AI coding tools assisted with scaffolding and documentation.',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL (Neon)', 'Prisma 7', 'NextAuth v5', 'Stripe', 'Zustand', 'Zod', 'Tailwind CSS v4'],
    problem:
      'An online store serves two audiences with very different authority. Customers must be able to pay and trust their order status; staff can change prices, stock and order states. The engineering risk is trusting the wrong signal — a browser redirect after payment is not proof of payment, and hiding admin links in the UI does not protect admin APIs.',
    solution:
      'Payment status is only changed by verified Stripe webhooks, never by the client. Admin access is enforced twice: in the route-protection proxy and again inside every admin API handler. The catalogue models products with size/colour variants that carry their own stock and price delta, and orders move through an explicit status lifecycle managed from the admin dashboard.',
    implementation: [
      { title: 'Data model', text: 'Prisma schema for users with roles, categories, products and variants, orders and order items (with Stripe session and payment-intent IDs), addresses and wishlists. Order status is an enum: Pending → Paid → Processing → Shipped → Delivered, or Cancelled.' },
      { title: 'API layer', text: 'Next.js Route Handlers for registration, checkout, the Stripe webhook and admin CRUD for products, orders, customers and statistics. Mutating endpoints validate their payload with Zod `safeParse`.' },
      { title: 'Authentication', text: 'NextAuth v5 with a credentials provider and JWT sessions that carry the user’s role; passwords hashed with bcryptjs (12 rounds).' },
      { title: 'Client state & rendering', text: 'Server Components fetch data for catalogue and admin pages; only the cart lives on the client, in a Zustand store persisted to localStorage.' },
      { title: 'Environments', text: 'Prisma uses the Neon serverless adapter in production and the standard pg adapter locally; deployment is documented for Vercel.' },
    ],
    engineering: [
      {
        title: 'Webhooks as the payment source of truth',
        what: 'Order status changes after payment are applied by a Stripe webhook handler.',
        how: '`stripe.webhooks.constructEvent()` verifies the signature, and processed event IDs are stored on the order (`stripeEventIds`) and checked before an update is applied.',
        why: 'Payment state can’t be spoofed from the browser, and Stripe’s automatic retries can’t apply the same event twice.',
      },
      {
        title: 'Authorization in two layers',
        what: 'Admin routes and admin APIs are protected independently.',
        how: '`src/proxy.ts` redirects any non-ADMIN session away from `/admin`, and each admin route handler re-validates the session and role server-side.',
        why: 'A mistake or bypass in the routing layer alone doesn’t expose admin operations.',
      },
      {
        title: 'Per-route rate limiting',
        what: 'Sensitive endpoints are rate-limited by IP.',
        how: 'An in-memory limiter applies separate policies: auth 10 requests / 15 min, checkout 5 / 60 s, admin API 30 / 60 s.',
        why: 'It slows credential stuffing and checkout abuse without extra infrastructure — at the cost of not sharing limits across instances.',
      },
    ],
    challenges: [
      { title: 'Next.js 16 conventions', text: 'Next.js 16 replaces the root `middleware.ts` with `src/proxy.ts`; the repository documents this change for anyone extending route protection.' },
      { title: 'Rate limiting scope', text: 'The in-memory limiter is deliberately simple; the README lists a shared store such as Redis as the next step for multi-instance deployments.' },
      { title: 'Serverless database connections', text: 'Using Neon’s HTTP/WebSocket adapter in production avoids exhausting connection pools on serverless hosts, while local development keeps a standard Postgres connection.' },
    ],
    validation: [
      { label: 'Tests', text: 'No automated tests are configured — the README lists unit, integration and end-to-end tests as a future improvement.' },
      { label: 'Database', text: 'A Prisma migration and a seed script with demo admin and customer accounts are included.' },
      { label: 'Deployment', text: 'Deployment to Vercel is documented; no live demo is linked from the repository.' },
    ],
    limitations: [
      'Cloudinary is integrated in code, but admin uploads are currently written to `public/uploads`.',
      'The rate limiter is in-memory and per instance.',
      'No explicit CSRF protection beyond framework defaults.',
      'Credentials sign-in only — no OAuth providers.',
    ],
  }),
  fullStack({
    slug: 'voya',
    repo: 'voya-ziah',
    cover: 'voya-cover',
    coverAlt: 'VOYA cover: three phone screens showing a trip overview, a budget chart by category and a day-by-day itinerary',
    name: 'VOYA',
    industry: 'Travel planning app',
    scope: ['Flutter app', 'Supabase backend', 'Realtime sync', 'Tests'],
    description:
      'Cross-platform trip planner with budget, itinerary and checklist synced in real time — Flutter, Riverpod and Supabase.',
    overview:
      'VOYA is a Flutter app for mobile and web that keeps a trip’s budget, day-by-day itinerary, packing checklist, travellers and timeline together under one trip, synced to an authenticated backend. It also includes hotel and flight search, currency conversion, weather and notifications. “Full-stack” here means a Flutter client on a managed backend: the database schema, Row Level Security policies and data access are written by hand, with no custom application server.',
    audience: 'Individual and group travellers planning multi-day trips across devices.',
    role: 'Sole developer — app architecture, 18 feature modules, the Supabase schema and RLS policies, state management and the test suite.',
    technologies: ['Flutter', 'Dart', 'Riverpod 2 (codegen)', 'go_router', 'Supabase (Postgres, Auth, Storage, Realtime)', 'Freezed', 'mocktail'],
    problem:
      'Trip planning is usually scattered across a notes app, a spreadsheet, a currency converter and a weather app. Moving it into one app only helps if the data is private to each user, available on every device they sign in to, and kept in sync while a group edits the same trip.',
    solution:
      'Every planning feature — budget, itinerary, checklist, travellers, timeline — hangs off a single trip, stored in Supabase Postgres and protected by Row Level Security. Four features stream changes through Supabase Realtime, so edits appear on other devices without a refresh. Supabase Auth provides email/password sign-in and OTP password recovery, and the router redirects users based on their session and onboarding state.',
    implementation: [
      { title: 'Feature architecture', text: '18 feature modules under `lib/features`, each with domain, data and presentation layers. Screens depend only on repository interfaces, never on concrete data sources.' },
      { title: 'State management', text: 'Riverpod 2 with generated providers: app-lifetime singletons for repositories, family providers for id-scoped reads, and stream-based notifiers for the realtime features.' },
      { title: 'Database & security', text: 'A hand-written schema of 24 tables, all with Row Level Security — owner-scoped policies for private data and read-only policies for shared catalogue tables.' },
      { title: 'Error handling', text: 'A shared guard translates Supabase Auth, Postgrest and Storage exceptions into typed failures returned as a `Result`, so the UI handles errors without try/catch.' },
    ],
    engineering: [
      {
        title: 'RLS-secured multi-user schema',
        what: 'All 24 tables enforce Row Level Security.',
        how: 'Trip-child tables check ownership through a `trip_id in (select id from trips where user_id = auth.uid())` subquery; catalogue tables such as hotels and airports are public-read with no write policy.',
        why: 'Data isolation is enforced by the database itself, not just by client code that could be bypassed.',
      },
      {
        title: 'Repository pattern, proven in practice',
        what: 'Every feature’s data source was swapped from an in-memory mock to Supabase.',
        how: 'Because screens only see repository interfaces, the README records the swap was made with no changes to any UI file.',
        why: 'It shows the boundaries hold up under a real migration — and lets controller tests run against fakes instead of the network.',
      },
      {
        title: 'Simple, reliable realtime',
        what: 'Trips, budget, itinerary and checklist update live.',
        how: 'A Realtime change on a table triggers a full, joined re-fetch rather than patching nested state from the raw change payload.',
        why: 'It trades a little extra reading for correctness: nested travellers, images and timeline data can’t drift out of sync.',
      },
    ],
    challenges: [
      { title: 'Registration without a session', text: 'With email confirmation enabled, `register()` reported success although no session existed, so later RLS-protected queries failed. It now surfaces a clear “check your email” state instead.' },
      { title: 'Missing profile rows', text: 'Sign-in could crash when a user’s profile row didn’t exist yet. Login now falls back to the session’s metadata, so a data gap never blocks access.' },
      { title: 'Flutter web build', text: 'Getting `flutter build web` to pass required resolving a transitive `analyzer` / `custom_lint_visitor` version conflict, documented in `pubspec.yaml`.' },
    ],
    validation: [
      { label: 'Tests (from README)', text: '`flutter test --coverage` reported 233 test cases: 224 passing and 9 failing (mostly stale assertions from before the registration fix), with 49.7% line coverage. Not re-run for this portfolio.' },
      { label: 'Test approach', text: 'Unit tests for domain logic, error mapping and controllers (using fakes), widget tests for shared components, and integration tests for three user flows.' },
      { label: 'CI', text: 'No CI workflow is set up yet; a draft workflow exists in the testing strategy document.' },
    ],
    limitations: [
      'The Explore tab is a placeholder; the standalone booking module and maps module are scaffolded without finished screens.',
      'No payment processing — hotel and flight bookings show summaries only.',
      'List queries are not paginated yet.',
      'No automatic retry/backoff for failed requests.',
    ],
  }),
  fullStack({
    slug: 'theraflow',
    repo: 'TheraFlow-Ziah',
    cover: 'theraflow-cover',
    coverAlt: 'TheraFlow cover: an appointment calendar, a signed session note and a billing view, with role descriptions for therapist, billing staff and admin',
    name: 'TheraFlow',
    industry: 'Practice management (EHR mini-app)',
    scope: ['ASP.NET Core API', 'Angular client', 'Event-driven modules', 'Tests'],
    description:
      'Practice management for behavioral-health clinics — scheduling, signed session notes and billing — built as an ASP.NET Core modular monolith with an Angular client.',
    overview:
      'TheraFlow manages therapists, patients, sessions and billing for a behavioral-health clinic. Three roles are kept strictly apart: therapists schedule sessions and write and sign clinical notes, billing staff manage invoices and payments, and admins have oversight without authoring clinical content.',
    audience: 'Therapists, billing staff and administrators at a behavioral-health clinic.',
    role: 'Sole developer — the .NET solution and its six modules, the database model and migrations, authentication, the Angular client, tests and architecture decision records.',
    technologies: ['ASP.NET Core (.NET 8)', 'EF Core', 'PostgreSQL', 'MediatR', 'Angular 18', 'xUnit', 'Docker Compose'],
    problem:
      'Clinic software has to keep clinical notes confidential from people who don’t need them — billing staff must know a session happened in order to invoice it, but must never read what was said. At the same time, one action, such as completing an appointment, needs to trigger work in other areas (billing, notifications, audit) without tangling the codebase.',
    solution:
      'Each concern is a separate module: Scheduling (with conflict detection), ClinicalNotes (notes are locked once signed; changes are added as amendments), Billing, Notifications and Audit. Modules communicate only through domain events. Billing staff can confirm that a note exists for an appointment, but the API, the application layer and the response shape all prevent them from receiving note content.',
    implementation: [
      { title: 'Modular monolith', text: 'One .NET solution and one deployable process, with bounded-context class libraries that never reference each other — only a shared library of event contracts and base types.' },
      { title: 'Events & outbox', text: 'Domain events are written to an outbox table; a background dispatcher polls it every five seconds and publishes them in-process through MediatR to handlers in other modules.' },
      { title: 'Persistence', text: 'EF Core on PostgreSQL, with a context that composes each module’s schema. Migrations are applied and one user per role is seeded on first run.' },
      { title: 'API & security', text: 'JWT authentication with role-based policies, exception-handling and request-logging middleware, a health endpoint that checks Postgres, and Swagger in development.' },
      { title: 'Client', text: 'Angular 18 standalone components with a core layer for JWT auth, route guards and an HTTP interceptor.' },
    ],
    engineering: [
      {
        title: 'Confidentiality enforced in three places',
        what: 'Billing staff can never receive clinical note content.',
        how: 'API policies restrict the endpoints, the note service throws if a billing caller requests full content, and the metadata DTO they receive has no content field at all.',
        why: 'A single missed check can’t leak sensitive data — the most important rule is backed up structurally.',
      },
      {
        title: 'Transactional outbox instead of a broker',
        what: 'Cross-module work such as invoicing a completed appointment is event-driven.',
        how: 'Events are saved to the outbox together with the change that produced them, then dispatched in-process (ADR-003).',
        why: 'Events aren’t lost between the database write and publishing, without the cost of running a message broker.',
      },
      {
        title: 'Immutable signed notes',
        what: 'Signed clinical notes can’t be edited.',
        how: 'Once signed, the original content is locked and later changes are stored as amendments appended beneath it.',
        why: 'It preserves a reliable record of what was written and when — an expectation for clinical documentation.',
      },
    ],
    challenges: [
      { title: 'Modular monolith over microservices', text: 'ADR-001 records choosing clear module boundaries inside one process over separately deployed services — keeping isolation without the operational overhead.' },
      { title: 'Session storage trade-off', text: 'The JWT is held in memory with a `sessionStorage` copy to survive reloads, rather than a refresh-token/httpOnly-cookie flow; the README notes this as the first thing to change for real use.' },
      { title: 'Audit strategy', text: 'ADR-002 describes a HIPAA-inspired audit trail combining an interceptor with explicit audit calls — explicitly inspired by, not a claim of, compliance.' },
      { title: 'Learning ASP.NET Core', text: 'A concept map from NestJS to ASP.NET Core was written while building the project and is kept in the docs.' },
    ],
    validation: [
      { label: 'Tests', text: 'xUnit unit and integration test projects (integration tests run against a throwaway PostgreSQL database), plus Angular component tests. Not re-run for this portfolio.' },
      { label: 'Documentation', text: 'An event catalog, an event-flow sequence diagram and three architecture decision records.' },
      { label: 'Local environment', text: 'PostgreSQL via Docker Compose; no hosted demo.' },
    ],
    limitations: [
      'Not a production EHR and not a compliance claim.',
      'Notifications are logged, not delivered by email or SMS.',
      'No payment gateway, no multi-tenancy, no refresh-token flow.',
      'A therapist’s scheduling profile must be linked by an admin before scheduling.',
    ],
  }),
  fullStack({
    slug: 'luxestay-la',
    repo: 'LuxeStay-LA',
    cover: 'luxestay-la-cover',
    coverAlt: 'LuxeStay LA cover: the hospitality website hero and the Resident Dashboard overview on desktop and mobile',
    name: 'LuxeStay LA',
    industry: 'Hospitality website & resident portal',
    scope: ['Website', 'Resident Dashboard', 'Auth', 'Integration-ready'],
    description:
      'Hospitality website and secure Resident Dashboard for furnished stays in Los Angeles — Next.js 16 with signed sessions and integration-ready adapters.',
    overview:
      'LuxeStay LA is a website and Resident Dashboard for a conceptual hospitality brand offering furnished apartments for stays of a month or more. Guests find and compare residences; residents sign in to see their residence, submit maintenance requests, download documents and reach support. Residences and residents are fictional sample data, labelled as such in the product.',
    audience: 'Professionals, corporate travellers and people relocating to Los Angeles — and the residents who live there.',
    role: 'Design and development: art direction and design tokens, UX and information architecture, the Next.js front end, server-side logic (Server Actions, data access layer, sessions, adapters) and quality checks.',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Server Actions', 'node:test'],
    problem:
      'The brand needed a premium first impression, a clear path from browsing to leasing, and somewhere for residents to go after moving in. The hard constraint: listings, pricing and resident records live in a Yardi / RentCafe system with no API documentation or credentials available — so the product couldn’t invent live data or fake an integration, but still had to be complete and ready to connect.',
    solution:
      'An editorial website with a stay finder, shareable filter URLs, sorting, pagination and detailed residence pages that hand off to the official leasing flow when one exists. A Resident Dashboard covers the overview, residence, maintenance requests, documents, guide, support and account. All property and resident data sits behind adapters with capability flags; when a source can’t provide something, the UI links to the official portal instead of showing invented balances or forms that go nowhere.',
    implementation: [
      { title: 'App structure', text: 'Next.js 16 App Router with separate route groups for the public site and the portal, React Server Components, and Server Actions for contact, sign-in and maintenance requests.' },
      { title: 'Sessions & access', text: 'Signed-cookie sessions. A proxy turns away requests without a valid session, and every page, action and route handler re-verifies through a data access layer (`requireResident()`).' },
      { title: 'Data adapters', text: 'Property and resident services query adapters that declare their capabilities; sample and fixture adapters are used today, with RentCafe stubs in place. A cached property service turns upstream failures into “unavailable” states.' },
      { title: 'Secure documents', text: 'Downloads go through a route handler that re-checks the session and document ownership and responds with `Cache-Control: private, no-store` — there are no public file URLs.' },
      { title: 'Progressive enhancement', text: 'The stay finder and filters are GET forms that work without JavaScript, and filter instantly when it’s available.' },
    ],
    engineering: [
      {
        title: 'Server-only resident identity',
        what: 'Resident data can only be read for the signed-in resident.',
        how: 'Data functions require an `AuthenticatedResident`, a type only the data access layer can create; IDs from URLs are always ownership-checked.',
        why: 'Identity can’t be supplied from the client, so one resident can’t reach another’s data by changing an ID.',
      },
      {
        title: 'No ID probing',
        what: 'Another resident’s request or document is indistinguishable from a missing one.',
        how: 'Ownership failures return the same not-found page as records that don’t exist.',
        why: 'Attackers can’t learn which IDs are valid.',
      },
      {
        title: 'Honest, integration-ready data',
        what: 'The UI never shows data the source can’t verify.',
        how: 'Capability flags on each adapter decide whether a feature renders, falls back to the official portal or shows a “being connected” state; sample data is tagged, excluded from the sitemap and served with noindex.',
        why: 'The product is complete today and can connect to the real system later without UI changes — and without misleading residents.',
      },
    ],
    challenges: [
      { title: 'Building without the API', text: 'With no Yardi / RentCafe documentation or credentials, the integration was designed as adapters and stubs, with the connection steps documented in `docs/INTEGRATION.md`.' },
      { title: 'Payments', text: 'Without a verified ledger integration, the dashboard never processes payments or shows balances — it explains why and links to the official payment portal.' },
      { title: 'Minimal dependencies', text: 'No UI or form libraries were added; the only added runtime dependency is `server-only`.' },
    ],
    validation: [
      { label: 'Reported in the README', text: '38 generated pages, 16 unit tests run with `node --test`, 0 axe-core violations across the site and dashboard, and security checks for forged and expired cookies, cross-resident access and secrets in the client bundle. Not re-run for this portfolio.' },
      { label: 'Deployment', text: 'A standard Next.js server application, documented for Vercel or any Node 20.9+ host; no live demo is linked.' },
    ],
    limitations: [
      'The Yardi / RentCafe integration is architected but not implemented.',
      'Photography is placeholder imagery and brand copy is draft.',
      'No analytics or consent tooling is installed.',
    ],
  }),
  fullStack({
    slug: 'propmanage-ai',
    repo: 'propmanage-ai',
    cover: 'propmanage-ai-cover',
    coverAlt: 'PropManage AI cover: a ticket with an AI triage panel showing a cited draft reply awaiting approval, and the agent run steps',
    name: 'PropManage AI',
    industry: 'AI agent & RAG for property management',
    scope: ['API & worker', 'RAG pipeline', 'AI agent', 'Observability'],
    description:
      'An AI-first backend that triages tenant messages, answers from a company’s own documents with citations, and drafts replies that a human approves.',
    overview:
      'Property managers upload documents such as house rules and leases; tenants and staff raise tickets or send email; an AI agent classifies each message, retrieves grounded answers from the company’s documents and drafts a reply for a person to approve. The project focuses on systems design: a multi-tenant data layer, a crash-safe background pipeline, measured retrieval and an agent with guardrails.',
    audience: 'Property-management teams handling tenant questions and requests.',
    role: 'Sole developer — data model and indexing, ingestion and queue workers, retrieval pipeline and evaluation, agent tools and guardrails, the operations view and tests.',
    technologies: ['Next.js 14', 'TypeScript', 'PostgreSQL (Neon) + pgvector', 'Drizzle ORM', 'BullMQ / Redis', 'Transformers.js', 'Groq (Llama 3.3 70B)', 'Vitest'],
    problem:
      'Tenant questions are repetitive, and their answers already live in documents — but an AI that answers them must stay grounded in those documents, must never reply on its own about rent, deposits or legal matters, and needs background processing (PDF ingestion, email) that survives retries and crashes without duplicating work.',
    solution:
      'Uploaded PDFs flow through a queued ingestion pipeline into chunked, embedded documents. Questions are answered by hybrid retrieval with citations and a refusal gate when the documents don’t support an answer. Inbound email becomes a ticket, and a tool-using agent classifies it, searches the knowledge base and drafts a reply — which staff approve, edit or escalate. An operations view shows queue health, pipeline status and agent cost and latency.',
    implementation: [
      { title: 'Web tier and workers', text: 'Next.js serves the UI and API route handlers; slow or retry-prone work runs in a separate BullMQ worker process with queues for document ingestion, embedding batches, email processing and agent triage.' },
      { title: 'Data model & indexing', text: 'An 11-table Drizzle schema on Postgres with pgvector. Every query is scoped to an organization; reads use a composite ticket-list index plus a partial open-tickets index, an HNSW vector index and a GIN full-text index, with keyset pagination.' },
      { title: 'Retrieval', text: 'Local 384-dimension embeddings, vector and keyword search fused with Reciprocal Rank Fusion (k = 60), then a local cross-encoder reranker; answers cite their sources.' },
      { title: 'Agent', text: 'Five tools — search the knowledge base, read ticket history, classify, draft a reply and escalate to a human — running on Groq, draft-only, with every run logged to `agent_runs` (tools, tokens, latency, status).' },
      { title: 'Swappable providers', text: 'Embeddings, reranking, the LLM and storage sit behind small interfaces, so providers can change through configuration without touching call sites.' },
    ],
    engineering: [
      {
        title: 'Guardrails enforced in code',
        what: 'Sensitive topics are always escalated to a person, never drafted.',
        how: 'The `draft_reply` tool re-checks sensitivity (money, rent, deposits, contracts, legal, eviction) itself and escalates regardless of what the model decided.',
        why: 'Safety doesn’t depend on the model following its prompt.',
      },
      {
        title: 'Idempotent background processing',
        what: 'Ingestion and email handling are safe under at-least-once delivery.',
        how: 'Deterministic job IDs, upserts, a pending → processing → ready | failed state machine, retries with exponential backoff and jitter, and a stuck-job sweeper; inbound email is de-duplicated on organization and message ID.',
        why: 'A crash or retry never creates duplicate tickets or half-processed documents.',
      },
      {
        title: 'Retrieval that is measured',
        what: 'Retrieval quality is evaluated, not eyeballed.',
        how: 'An eval reports hit-rate@5 and MRR per configuration. On its small 15-document corpus, hybrid + rerank tied vector-only (MRR 0.962) and beat keyword-only (0.900), as reported in the README.',
        why: 'It gives an honest basis for the design choice — robustness across query types rather than a claimed accuracy gain.',
      },
    ],
    challenges: [
      { title: 'Fusing dense and sparse search', text: 'Vector and keyword retrieval fail in opposite ways; RRF combines them by rank, avoiding score calibration between the two.' },
      { title: 'Reading the eval honestly', text: 'On a small, clean corpus, dense retrieval is already strong, so hybrid retrieval only ties it; its value is expected on noisier corpora with exact-token queries.' },
      { title: 'Keeping the web tier stateless', text: 'All spiky and retry-prone work moves to the worker process, which keeps request handling fast and predictable.' },
    ],
    validation: [
      { label: 'Tests', text: 'Vitest suites for ingestion idempotency and failure handling, RRF ranking and the refusal gate, email de-duplication, escalation enforcement and ops metrics; integration tests use real Postgres and Redis with mocked LLM and embeddings. Not re-run for this portfolio.' },
      { label: 'End-to-end scenarios (README)', text: 'A routine tenant email produced a cited draft; approving it marked it sent; a rent/legal email was escalated with no draft; a duplicate message ID produced exactly one ticket.' },
      { label: 'Deployment', text: 'Runs locally with Neon, Redis in Docker and a Groq API key; no hosted demo.' },
    ],
    limitations: [
      'Inbound email is simulated through a webhook rather than connected to a mail provider.',
      'The retrieval eval uses a small corpus (15 documents, 13 questions).',
      'Answer and agent generation require a Groq API key.',
    ],
  }),
  fullStack({
    slug: 'nuvora',
    repo: 'nuvora',
    cover: 'nuvora-cover',
    coverAlt: 'Nuvora cover: the running app’s Orders list, “Today at a glance” dashboard and Schedule screens, with the React Native, TypeScript and Supabase stack',
    name: 'Nuvora',
    industry: 'Small-business management mobile app',
    scope: ['Expo mobile app', 'Supabase backend', 'Row Level Security', 'Tests'],
    description:
      'Mobile back office for small service businesses — customers, orders, payments, expenses, appointments and reports — built with Expo, TypeScript and Supabase.',
    overview:
      'Nuvora is a React Native app, built with Expo, that implements the Nuvora Figma design. Owners and staff manage customers, create orders from a service price list, record payments and expenses, book pickups and deliveries, and read reports. The app runs against Supabase (Postgres, Auth, Storage) when its public keys are set; otherwise it uses an on-device demo backend that enforces the same rules.',
    audience: 'Owners, managers and staff of small service businesses such as laundries, salons and repair shops.',
    role: 'Sole developer — app architecture, the Supabase schema, RLS policies and triggers, the data layer, all screens and the test suite. Built with AI coding assistance (Claude Code).',
    technologies: ['React Native', 'Expo (SDK 58)', 'Expo Router', 'TypeScript', 'Supabase (Postgres, Auth, Storage)', 'TanStack Query', 'zod', 'Jest', 'pgTAP'],
    problem:
      'A business app that handles money has to get two things right: the numbers must be exact and mean the same thing on every screen, and each business’s data must stay private — including from its own staff, who shouldn’t see expenses or reports. Hiding buttons in the UI doesn’t enforce either.',
    solution:
      'All money is stored and calculated as integer cents, and every metric (revenue recorded, money received, profit, outstanding, overdue) comes from one module of pure functions. Every business table is scoped by `business_id` and protected by Row Level Security with role-aware helper functions. Rules that must always hold — no overpayment, no payments on cancelled orders, sequential order numbers — are enforced in Postgres triggers.',
    implementation: [
      { title: 'App structure', text: 'Expo Router file-based routes with `Stack.Protected` guards that switch between the signed-out, business-setup and app route groups. A custom tab bar includes a floating create sheet.' },
      { title: 'Data layer', text: 'One `DataService` interface with two implementations: Supabase, and an AsyncStorage demo backend with serialized writes. The app loads one workspace per member through TanStack Query, and every screen derives its figures from that snapshot.' },
      { title: 'Database', text: 'A single SQL migration: 11 tables, `security definer` helpers (`is_member`, `has_role`, `is_finance`), triggers for order numbering, total recomputation, payment guarding and notifications, and RPCs for creating a business, inviting members and saving an order with its items in one transaction.' },
      { title: 'Storage', text: 'Receipt photos go to a private bucket under a folder per business, readable only by that business’s owners and managers.' },
      { title: 'Validation', text: 'zod schemas validate forms on the device; the database checks the same rules again.' },
    ],
    engineering: [
      {
        title: 'Overpayment guard in the database',
        what: 'A payment can never exceed an order’s balance due, and cancelled orders can’t be paid.',
        how: 'A `before insert` trigger locks the order row (`for update`), recomputes the amount already paid and raises an error if the new payment would exceed the balance.',
        why: 'Two people recording payments at the same moment can’t overpay an order, and a modified client can’t skip the check.',
      },
      {
        title: 'Roles enforced by RLS, not by hidden UI',
        what: 'Staff can work with orders, customers and the schedule, but can’t record payments or see expenses.',
        how: 'RLS policies call `is_finance(business_id)` for payment inserts and expenses; the app also hides those screens and shows “Not available for your role” when they’re opened directly.',
        why: 'The UI improves the experience, but the database is what actually protects the data.',
      },
      {
        title: 'Integer cents end to end',
        what: 'No floating-point maths on money.',
        how: 'Amounts are typed in as strings and parsed straight to cents, line totals are whole quantity × unit price in cents, and Postgres stores `bigint` cents with a generated line-total column.',
        why: 'Totals, balances and reports always add up exactly.',
      },
    ],
    challenges: [
      { title: 'One set of rules, two backends', text: 'The demo backend has to refuse exactly what the database refuses; unit tests cover overpayment, edits below the amount paid, cancelled orders, order numbering and staff permissions.' },
      { title: 'Clearly defined metrics', text: '“Revenue” is counted when an order is created and “money received” when it is paid; both definitions live in one module and are explained in the app, so the dashboard, finance tab and reports always agree.' },
    ],
    validation: [
      { label: 'Unit tests', text: '37 Jest tests (money, finance metrics, reports, CSV, validation and the demo backend’s rules) — all passing when run during development.' },
      { label: 'Static checks', text: '`tsc --noEmit` and `expo lint` passed; `expo-doctor` reported 20/20 checks.' },
      { label: 'Database tests', text: 'pgTAP tests for RLS isolation and the money rules are included but have not been run — that requires the Supabase CLI and Docker.' },
      { label: 'Manual testing', text: 'The main flows were tested in the Expo web build at phone width using the demo backend. The app has not been run on an iOS or Android device or against a live Supabase project, and no live demo is published.' },
    ],
    limitations: [
      'Team invites don’t send email — the invited person signs up with that address and is linked automatically.',
      'SMS reminders and push notifications aren’t connected to a provider; “Send reminder” opens the device’s Messages app.',
      'Language, date format and first day of week are display-only.',
      'Two-step verification, signed-in devices and account deletion aren’t implemented.',
    ],
  }),
]
