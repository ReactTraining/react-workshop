export function Heading({ as: El, children, size = 1, ...props }) {
  El = El || `h${size}`
  return (
    <El {...props} className={`heading size-${size}`}>
      {children}
    </El>
  )
}
