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
      className="aspect-square w-[1em] rounded-full"
    />
  ) : (
    <div
      style={{ fontSize: `${size}rem` }}
      className="aspect-square w-[1em] rounded-full border border-pink-300"
    ></div>
  )
}
