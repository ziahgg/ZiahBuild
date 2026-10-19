/** The curved arrow mark used for eyebrows, buttons and the headline badge. */
export function Swoosh({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M3.5 8.5c1.2 5.6 6.8 8.6 13.8 6.2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M13.6 11.6l4 3-2.9 4.1"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
