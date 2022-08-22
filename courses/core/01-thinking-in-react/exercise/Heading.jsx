export function Heading({ as: El = 'h1', children, size = 1, ...props }) {
  return (
    <El {...props} className={`heading size-${size}`}>
      {children}
    </El>
  )
}
