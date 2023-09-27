import PropTypes from 'prop-types' // <-- made by the React team
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'

export const icons = {
  plus: FaPlus,
  star: AiFillStar,
  trash: FaTrashAlt,
}

export function Icon({ name }) {
  const Component = icons[name]
  return <Component />
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  // name: PropTypes.oneOf(['plus', 'star', 'trash']).isRequired
}

// https://github.com/facebook/prop-types
