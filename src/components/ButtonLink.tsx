import { Swoosh } from './Swoosh'

type Variant = 'primary' | 'light' | 'dark' | 'outline'

const variants: Record<Variant, string> = {
  primary: 'bg-blue text-white hover:bg-black',
  light: 'bg-white text-black hover:bg-blue hover:text-white',
  dark: 'bg-black text-white hover:bg-blue',
  outline: 'border border-current/20 text-current hover:border-blue hover:text-blue',
}

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  icon?: boolean
}

const sizes = {
  sm: 'h-8 px-3.5 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`group inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      {icon && (
        <Swoosh className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-rotate-12" />
      )}
    </a>
  )
}
