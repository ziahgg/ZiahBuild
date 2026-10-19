import type { PreviewVariant, Tone } from '../types'

/*
 * Designed, clearly-labelled placeholders for work whose real screenshots
 * have not been added yet. They are abstract wireframes — never presented
 * as finished project screenshots.
 */

const toneClass: Record<Tone, string> = {
  light: 'bg-black/[0.045] text-black',
  dark: 'bg-black text-white',
  blue: 'bg-blue text-white',
  ghost: 'bg-white/[0.06] text-white',
}

interface PlaceholderProps {
  variant: PreviewVariant
  tone?: Tone
  label?: string | false
  className?: string
}

export function Placeholder({ variant, tone = 'light', label = 'Preview coming soon', className = '' }: PlaceholderProps) {
  const accent = tone === 'blue' ? 'bg-white' : 'bg-blue'
  const Art = art[variant]
  return (
    <div
      role="img"
      aria-label={`${label || 'Placeholder'} — ${variant} illustration`}
      className={`relative isolate h-full w-full overflow-hidden ${toneClass[tone]} ${className}`}
    >
      <div className="dot-grid absolute inset-0 -z-10 opacity-[0.07]" />
      <Art accent={accent} />
      {label && (
        <span className="absolute left-3 top-3 rounded-full bg-current/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  )
}

type ArtProps = { accent: string }

const Bar = ({ className = '' }: { className?: string }) => <div className={`rounded-full bg-current/15 ${className}`} />
const Box = ({ className = '' }: { className?: string }) => <div className={`rounded-md bg-current/10 ${className}`} />

function Dashboard({ accent }: ArtProps) {
  const bars = [40, 65, 50, 80, 58, 92, 70, 84]
  return (
    <div className="absolute inset-x-[7%] bottom-0 top-[16%] flex overflow-hidden rounded-t-xl border border-current/15 bg-current/[0.04] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)]">
      <div className="hidden w-[18%] flex-col gap-2 border-r border-current/10 p-[3%] sm:flex">
        <div className={`mb-2 size-4 rounded ${accent}`} />
        {[0, 1, 2, 3, 4].map((i) => (
          <Bar key={i} className={`h-1.5 ${i === 1 ? 'w-full' : 'w-3/4'}`} />
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-[4%] p-[4%]">
        <div className="flex items-center justify-between">
          <Bar className="h-2.5 w-1/3" />
          <div className="size-5 rounded-full bg-current/15" />
        </div>
        <div className="grid grid-cols-3 gap-[4%]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-current/10 p-[8%]">
              <Bar className="h-1.5 w-1/2" />
              <Bar className={`mt-2 h-3 w-2/3 ${i === 0 ? accent : ''}`} />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-[3%] rounded-lg border border-current/10 p-[4%]">
          {bars.map((h, i) => (
            <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-t ${i === 5 ? accent : 'bg-current/15'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Website({ accent }: ArtProps) {
  return (
    <div className="absolute inset-x-[7%] bottom-0 top-[16%] overflow-hidden rounded-t-xl border border-current/15 bg-current/[0.04]">
      <div className="flex items-center gap-1.5 border-b border-current/10 px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 rounded-full bg-current/25" />
        ))}
        <Bar className="ml-3 h-1.5 w-1/4" />
      </div>
      <div className="grid h-full grid-cols-5 gap-[5%] p-[6%]">
        <div className="col-span-3 flex flex-col gap-2.5 pt-[4%]">
          <Bar className="h-4 w-11/12 bg-current/25" />
          <Bar className="h-4 w-3/4 bg-current/25" />
          <Bar className="mt-2 h-1.5 w-full" />
          <Bar className="h-1.5 w-5/6" />
          <div className={`mt-3 h-6 w-1/3 rounded-full ${accent}`} />
        </div>
        <Box className="col-span-2 h-[58%] rounded-xl bg-current/15" />
        <div className="col-span-5 -mt-[18%] grid grid-cols-3 gap-[5%]">
          {[0, 1, 2].map((i) => (
            <Box key={i} className="aspect-[4/3]" />
          ))}
        </div>
      </div>
    </div>
  )
}

function Mobile({ accent }: ArtProps) {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-[6%] px-[8%] pt-[14%]">
      {[0, 1].map((p) => (
        <div
          key={p}
          className={`flex aspect-[9/19] w-[34%] max-w-[180px] flex-col gap-2 rounded-[22px] border-[5px] border-current/20 bg-current/[0.05] p-3 ${
            p === 1 ? 'mb-[8%] hidden sm:flex' : ''
          }`}
        >
          <Bar className="mx-auto h-1.5 w-1/3" />
          <Box className={`mt-2 aspect-square w-full rounded-xl ${p === 0 ? 'bg-current/15' : ''}`} />
          <Bar className="h-2 w-3/4 bg-current/25" />
          <Bar className="h-1.5 w-full" />
          <Bar className="h-1.5 w-2/3" />
          <div className={`mt-auto h-5 w-full rounded-full ${accent}`} />
        </div>
      ))}
    </div>
  )
}

function Store({ accent }: ArtProps) {
  return (
    <div className="absolute inset-x-[7%] bottom-0 top-[16%] overflow-hidden rounded-t-xl border border-current/15 bg-current/[0.04] p-[5%]">
      <div className="flex items-center justify-between">
        <Bar className="h-2.5 w-1/5 bg-current/25" />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <Bar key={i} className="h-1.5 w-8" />
          ))}
        </div>
      </div>
      <div className="mt-[5%] grid grid-cols-4 gap-[4%]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <Box className="aspect-[3/4] rounded-lg bg-current/15" />
            <Bar className="mt-2 h-1.5 w-3/4" />
            <Bar className={`mt-1.5 h-1.5 w-1/3 ${i === 1 ? accent : ''}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Product({ accent }: ArtProps) {
  return (
    <div className="absolute inset-[8%] top-[16%] grid grid-cols-2 gap-[6%]">
      <div className="grid grid-rows-[1fr_auto] gap-2">
        <Box className="rounded-xl bg-current/15" />
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <Box key={i} className={`aspect-square ${i === 0 ? 'ring-2 ring-current/30' : ''}`} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2.5 pt-[6%]">
        <Bar className="h-1.5 w-1/3" />
        <Bar className="h-4 w-11/12 bg-current/25" />
        <Bar className="h-3 w-1/4 bg-current/25" />
        <div className="mt-2 flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-6 w-8 rounded-md border border-current/20" />
          ))}
        </div>
        <Bar className="mt-2 h-1.5 w-full" />
        <Bar className="h-1.5 w-4/5" />
        <div className={`mt-auto h-8 w-full rounded-full ${accent}`} />
      </div>
    </div>
  )
}

function Social({ accent }: ArtProps) {
  return (
    <div className="absolute inset-[9%] top-[18%] flex flex-col justify-between">
      <div className={`size-8 rounded-full ${accent}`} />
      <div className="space-y-2">
        <Bar className="h-4 w-11/12 bg-current/30" />
        <Bar className="h-4 w-2/3 bg-current/30" />
        <Bar className="mt-3 h-1.5 w-1/2" />
      </div>
      <div className="flex items-center gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`h-1.5 rounded-full ${i === 0 ? `w-5 ${accent}` : 'w-1.5 bg-current/25'}`} />
        ))}
      </div>
    </div>
  )
}

function System({ accent }: ArtProps) {
  return (
    <div className="absolute inset-[8%] top-[18%] grid grid-cols-2 grid-rows-2 gap-[5%]">
      <div className="flex items-end gap-2">
        <span className="size-10 rounded-lg border border-current/25 bg-white" />
        <span className="size-10 rounded-lg border border-current/25 bg-black" />
        <span className={`size-10 rounded-lg ${accent}`} />
      </div>
      <div className="flex items-end">
        <span className="text-5xl font-semibold leading-none tracking-tight opacity-80">Aa</span>
      </div>
      <div className="flex flex-col justify-center gap-2">
        <Bar className="h-3 w-full bg-current/25" />
        <Bar className="h-2 w-4/5" />
        <Bar className="h-1.5 w-3/5" />
      </div>
      <div className="flex flex-wrap content-center gap-2">
        <span className={`h-7 w-20 rounded-full ${accent}`} />
        <span className="h-7 w-16 rounded-full border border-current/30" />
      </div>
    </div>
  )
}

function Components({ accent }: ArtProps) {
  return (
    <div className="absolute inset-[8%] top-[18%] flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className={`h-8 w-24 rounded-full ${accent}`} />
        <span className="h-8 w-20 rounded-full border border-current/25" />
      </div>
      <div className="flex h-9 items-center rounded-lg border border-current/20 px-3">
        <Bar className="h-1.5 w-1/3" />
      </div>
      <div className="flex items-center gap-3">
        <span className={`flex h-5 w-9 items-center justify-end rounded-full px-0.5 ${accent}`}>
          <span className="size-4 rounded-full bg-white" />
        </span>
        <span className="flex h-5 w-9 items-center rounded-full bg-current/20 px-0.5">
          <span className="size-4 rounded-full bg-white" />
        </span>
        <span className="size-5 rounded border border-current/30" />
      </div>
      <div className="mt-auto grid grid-cols-2 gap-2">
        <Box className="h-14" />
        <Box className="h-14" />
      </div>
    </div>
  )
}

function Wireframe() {
  return (
    <div className="absolute inset-[7%] top-[16%] flex flex-col gap-[4%]">
      <div className="flex justify-between">
        <span className="h-3 w-1/5 rounded border border-dashed border-current/40" />
        <span className="h-3 w-1/3 rounded border border-dashed border-current/40" />
      </div>
      <div className="grid flex-1 grid-cols-5 gap-[4%]">
        <div className="col-span-3 flex flex-col gap-2 pt-[4%]">
          <span className="h-4 w-11/12 rounded border border-dashed border-current/40" />
          <span className="h-4 w-3/4 rounded border border-dashed border-current/40" />
          <span className="mt-2 h-6 w-1/3 rounded-full border border-dashed border-current/40" />
        </div>
        <span className="relative col-span-2 rounded-lg border border-dashed border-current/40">
          <span className="absolute inset-0 m-auto h-px w-[140%] origin-center rotate-[38deg] bg-current/25" />
        </span>
      </div>
      <div className="grid grid-cols-3 gap-[4%]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="aspect-[4/3] rounded border border-dashed border-current/40" />
        ))}
      </div>
    </div>
  )
}

function Video({ accent }: ArtProps) {
  return (
    <div className="absolute inset-[8%] top-[18%] flex flex-col justify-end gap-3">
      <div className="flex gap-1">
        {[30, 55, 40, 70, 45, 60, 35].map((w, i) => (
          <span key={i} style={{ flexGrow: w }} className={`h-6 rounded ${i === 3 ? accent : 'bg-current/15'}`} />
        ))}
      </div>
      <div className="flex gap-1">
        {[50, 30, 65, 40, 55].map((w, i) => (
          <span key={i} style={{ flexGrow: w }} className="h-3 rounded bg-current/10" />
        ))}
      </div>
    </div>
  )
}

function Portrait({ accent }: ArtProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="relative text-[clamp(8rem,22vw,16rem)] font-semibold leading-none tracking-[-0.08em] opacity-90">
        Z<span className={`absolute -right-[0.18em] bottom-[0.12em] size-[0.16em] rounded-full ${accent}`} />
      </span>
    </div>
  )
}

const art: Record<PreviewVariant, (p: ArtProps) => React.ReactElement> = {
  dashboard: Dashboard,
  website: Website,
  mobile: Mobile,
  store: Store,
  product: Product,
  social: Social,
  system: System,
  components: Components,
  wireframe: Wireframe,
  video: Video,
  portrait: Portrait,
}
