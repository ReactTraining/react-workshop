import React from 'react'

type Props = {
  minSize?: number
  gap?: number
} & React.HTMLAttributes<HTMLDivElement>

export function Tiles({ children, minSize = 14, gap = 1, ...rest }: Props) {
  const style = {
    gridTemplateColumns: `repeat(auto-fill, minmax(${minSize}em, 1fr))`,
    gap: gap ? `${gap}em` : undefined,
  }

  // https://codepen.io/bradwestfall/pen/qLJoqK
  // The reason for wrapping in an arbitrary div is for one, we need to ensure
  // the first child of grid is under our control without affecting the children
  // passed in, but also grid items will grow vertically to the height of their
  // row siblings, we might not want that for the children passed in, but we can
  // do that to our arbitrary div
  return (
    <div {...rest} className="grid" style={style}>
      {React.Children.map(children, (child) => (
        <div>{child}</div>
      ))}
    </div>
  )
}
