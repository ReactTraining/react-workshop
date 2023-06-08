import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  const id = React.useId()

  function onSelect() {
    setIsOpen(!isOpen)
    onChange && onChange(!isOpen)
  }

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, { id, onSelect, isOpen })
  })

  return children
}

export const DisclosureButton = React.forwardRef(
  ({ children, id, onSelect, isOpen, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        onClick={onSelect}
        data-disclosure-button
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-controls={id}
        aria-expanded={isOpen}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = ({ children, id, isOpen, ...props }) => {
  return (
    <div
      {...props}
      id={id}
      data-disclosure-panel
      data-state={isOpen ? 'open' : 'collapsed'}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
