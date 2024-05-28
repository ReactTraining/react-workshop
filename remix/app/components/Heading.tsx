import classnames from 'classnames'

type Props = {
  children: React.ReactNode
  size?: 1 | 2 | 3 | 4
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
} & React.HTMLAttributes<HTMLHeadingElement>

export function Heading({ as: El = 'h1', size = 1, className, ...props }: Props) {
  return (
    <El
      {...props}
      className={classnames(
        {
          'text-3xl': size === 1,
          'text-2xl': size === 2,
          'text-xl': size === 3,
          'text-lg': size === 4,
        },
        className
      )}
    />
  )
}
