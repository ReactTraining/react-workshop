import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import 'YesterTech/Heading.scss'

function Heading({ as: Component = 'h1', size = 1, className, ...rest }) {
  return <Component className={classnames('heading', `size-${size}`, className)} {...rest} />
}

Heading.propTypes = {
  size: PropTypes.number,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
}

export default Heading
