export function Heading({ as: El, children, size = 1, ...props }) {
  return (
    <El {...props} className={`heading size-${size}`}>
      {children}
    </El>
  )
}
