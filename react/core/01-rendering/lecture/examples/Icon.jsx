import classnames from 'classnames'
import PropTypes from 'prop-types' // <-- made by the React team
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'

export const icons = {
  plus: FaPlus,
  star: AiFillStar,
  trash: FaTrashAlt,
}

export function Icon({ name, className, size = 1.3, ...rest }) {
  const Component = icons[name]
  if (!Component) return null

  const props = {
    className: classnames('icon', className),
    style: {
      display: 'inline',
      width: `${size}em`,
      height: `${size}em`,
      verticalAlign: 'middle',
      color: 'currentColor',
    },
  }

  return <Component {...rest} {...props} />
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  // name: PropTypes.oneOf(['plus', 'star', 'trash']).isRequired
}

// https://github.com/facebook/prop-types
