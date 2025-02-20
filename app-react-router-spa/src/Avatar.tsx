import classnames from 'classnames'

type Props = {
  src: string
  size?: number
  className?: string
} & React.HTMLAttributes<HTMLImageElement>

export function Avatar({ src, size = 2, className, ...props }: Props) {
  return src ? (
    <img
      alt="User Avatar"
      loading="lazy"
      {...props}
      src={src}
      style={{ fontSize: `${size}rem` }}
      className={classnames('aspect-square w-[1em] rounded-full', className)}
    />
  ) : (
    <div
      style={{ fontSize: `${size}rem` }}
      className={classnames('aspect-square w-[1em] rounded-full border border-pink-300', className)}
    />
  )
}
