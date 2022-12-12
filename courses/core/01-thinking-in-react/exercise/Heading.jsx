export function Heading({ as: El = 'h1', children, size = 1, ...rest }) {
  return (
    <El {...rest} className={`heading size-${size}`}>
      {children}
    </El>
  )
}
