export function Avatar({ src }) {
  return (
    <img
      alt="User Avatar"
      loading="lazy"
      src={src}
      style={{ width: `3em` }}
      className="aspect-square rounded-full"
    />
  )
}
