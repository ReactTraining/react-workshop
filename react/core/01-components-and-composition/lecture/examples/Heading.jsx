export function Heading({ children, size = 1, ...rest }) {
  return (
    <h1 {...rest} className="heading heading-size-1">
      {children}
    </h1>
  )
}
