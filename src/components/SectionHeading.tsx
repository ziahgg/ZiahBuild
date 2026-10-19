import { Eyebrow } from './Eyebrow'

interface SectionHeadingProps {
  eyebrow: string
  /** First line, rendered in solid black (or white when inverted). */
  lead: string
  /** Second line, rendered muted. */
  muted: string
  description?: React.ReactNode
  align?: 'center' | 'left'
  inverted?: boolean
  id?: string
}

/** Two-tone headline pattern: solid first line, muted second line. */
export function SectionHeading({
  eyebrow,
  lead,
  muted,
  description,
  align = 'center',
  inverted = false,
  id,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <Eyebrow inverted={inverted}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={`display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] ${inverted ? 'text-white' : 'text-black'}`}
      >
        {lead}
        <br />
        <span className={inverted ? 'text-white/45' : 'text-black/35'}>{muted}</span>
      </h2>
      {description && (
        <p
          className={`mt-6 text-[15px] leading-relaxed ${inverted ? 'text-white/65' : 'text-black/60'} ${
            centered ? 'mx-auto max-w-xl' : 'max-w-lg'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
