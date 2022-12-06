import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export function Disclosure({ children, onChange, label, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  const id = React.useId()

  function onSelect() {
    setIsOpen(!isOpen)
    typeof onChange === 'function' && onChange(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { onSelect, isOpen, id })
  })

  return children
}

export const DisclosureButton = React.forwardRef(
  ({ onSelect, id, isOpen, children, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        ref={forwardedRef}
        onClick={onSelect}
        data-state={isOpen ? 'open' : 'collapsed'}
        data-disclosure-button=""
        aria-expanded={isOpen}
        aria-controls={id}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = ({ isOpen, children, id, ...props }) => {
  return (
    <div
      {...props}
      id={id}
      data-state={isOpen ? 'open' : 'collapsed'}
      data-disclosure-panel=""
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
