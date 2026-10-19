import { Swoosh } from './Swoosh'

interface EyebrowProps {
  children: React.ReactNode
  className?: string
  /** Use on dark surfaces. */
  inverted?: boolean
}

export function Eyebrow({ children, className = '', inverted = false }: EyebrowProps) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.08em] ${
        inverted ? 'text-white/80' : 'text-black/70'
      } ${className}`}
    >
      <Swoosh className="size-3.5 text-blue" />
      {children}
    </p>
  )
}
