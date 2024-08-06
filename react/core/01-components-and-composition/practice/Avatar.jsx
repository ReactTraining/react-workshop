export function Avatar({ src }) {
  return src ? (
    <img
      alt="User Avatar"
      loading="lazy"
      src={src}
      style={{ width: `3em` }}
      className="aspect-square rounded-full"
    />
  ) : (
    <div
      style={{ width: `3em` }}
      className="aspect-square rounded-full border border-slate-400 bg-slate-100"
    />
  )
}
