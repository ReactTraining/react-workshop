import React from 'react'
import styles from './Tiles.module.scss'

type Props = {
  minSize?: number
} & React.HTMLAttributes<HTMLDivElement>

export function Tiles({ children, minSize = 10, ...rest }: Props) {
  const style = {
    gridTemplateColumns: `repeat(auto-fill, minmax(${minSize}em, 1fr))`,
  }

  // https://codepen.io/bradwestfall/pen/qLJoqK
  // The reason for wrapping in an arbitrary div is for one, we need to ensure
  // the first child of grid is under our control without affecting the children
  // passed in, but also grid items will grow vertically to the height of their
  // row siblings, we might not want that for the children passed in, but we can
  // do that to our arbitrary div
  return (
    <div {...rest} className={styles.component} style={style}>
      {React.Children.map(children, (child) => (
        <div>{child}</div>
      ))}
    </div>
  )
}
