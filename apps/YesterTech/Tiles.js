import React from 'react'
import PropTypes from 'prop-types'
import 'YesterTech/Tiles.scss'

function Tiles({ children, minSize = 10, ...rest }) {
  // https://codepen.io/bradwestfall/pen/qLJoqK
  // The reason for wrapping in an arbitrary div is for one, we need to ensure
  // the first child of grid is under our control without affecting the children
  // passed in, but also grid items will grow vertically to the height of their
  // row siblings, we might not want that for the children passed in, but we can
  // do that to our arbitrary div

  const style = {
    gridTemplateColumns: `repeat(auto-fill, minmax(${minSize}em, 1fr))`
  }

  return (
    <div {...rest} className="tiles" style={style}>
      {React.Children.map(children, child => (
        <div>{child}</div>
      ))}
    </div>
  )
}

Tiles.propTypes = {
  minSize: PropTypes.number
}

export default Tiles
