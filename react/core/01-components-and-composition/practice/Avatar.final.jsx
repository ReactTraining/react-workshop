import classnames from 'classnames'

// This solution shows a utility for merging class name strings together:
// classnames('hello', 'world') yields the string 'hello world'
// It has lots of cool features that aren't shown yet here, but you're
// free to not use it and just do regular string concatenation instead

export function Avatar({ src, size = 3, className, ...props }) {
  return src ? (
    <img
      alt="User Avatar"
      loading="lazy"
      {...props}
      src={src}
      style={{ width: `${size}em` }}
      className={classnames('aspect-square rounded-full', className)}
    />
  ) : (
    <div
      style={{ width: `${size}em` }}
      className="aspect-square rounded-full border border-slate-400 bg-slate-100"
    />
  )
}
