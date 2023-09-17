type Props = {
  children: React.ReactNode
  as?: string | React.ElementType
  size?: number
  className?: string
}

export function Centered({ as: Component = 'div', size = 60, children, ...rest }: Props) {
  return (
    <Component
      style={{
        margin: `0 auto`,
        maxWidth: `${size}rem`,
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}
