import React from 'react'

export const useCSSPropertyRef = (arg: {
  [key: string]: string
}): React.MutableRefObject<HTMLDivElement> => {
  const ref = React.useRef<HTMLDivElement>(null!)
  React.useLayoutEffect(() => {
    if (!ref.current) return
    for (let property in arg) {
      ref.current.style.setProperty(`--${property}`, arg[property])
    }
  }, [arg])

  return ref
}
