import classnames from 'classnames'
import { FaTrashAlt, FaPlus } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'

export const icons = {
  plus: FaPlus,
  star: AiFillStar,
  trash: FaTrashAlt,
}

export function Icon({ name, className, size = 1.3, color, ...rest }) {
  const Component = icons[name]
  if (!Component) {
    console.warn('this thing doesnt exist')
    return null
  }

  const props = {
    className: classnames('icon', className),
    style: {
      display: 'inline',
      width: `${size}em`,
      height: `${size}em`,
      verticalAlign: 'middle',
      color: color || 'currentColor',
    },
  }

  return <Component {...rest} {...props} />
}
