import React, { useState, useId } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const id = useId()

  function onSelect() {
    setIsOpen(!isOpen)
    onChange && onChange(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { isOpen, onSelect, id })
  })

  // Notice how awful it is to build class name strings.
  // We'll fix it with data-attributes

  return <div data-disclosure="">{children}</div>
}

export const DisclosureButton = React.forwardRef(
  ({ children, isOpen, onSelect, id, ...props }, forwardedRef) => {
    return (
      <button
        ref={forwardedRef}
        {...props}
        onClick={onSelect}
        aria-expanded={isOpen}
        aria-controls={id}
        data-disclosure-button=""
        data-disclosure-state={isOpen ? 'open' : 'collapsed'}
      >
        {typeof children === 'function' ? children(isOpen) : children}
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
      className={`disclosure-panel ${isOpen ? 'open' : 'collapsed'}`}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
