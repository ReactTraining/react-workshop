import React, { useState, useId } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export function Disclosure({ children, onChange, defaultIsOpen = false, ...props }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const panelId = useId()

  function onSelect() {
    if (typeof onChange === 'function') {
      onChange(!isOpen)
    }
    setIsOpen(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { onSelect, isOpen, panelId })
  })

  // Notice how awful it is to build class name strings.
  // We'll fix it with data-attributes

  return (
    <div {...props} data-disclosure="">
      {children}
    </div>
  )
}

export const DisclosureButton = ({ children, isOpen, onSelect, panelId, ...props }) => {
  return (
    <button
      {...props}
      onClick={onSelect}
      data-disclosure-button=""
      data-state={isOpen ? 'open' : 'collapsed'}
      aria-controls={panelId}
      aria-expanded={isOpen}
    >
      {typeof children === 'function' ? children(isOpen) : children}
    </button>
  )
}
export const DisclosurePanel = ({ children, isOpen, panelId, ...props }) => {
  return (
    <div
      {...props}
      id={panelId}
      data-disclosure-panel=""
      data-state={isOpen ? 'open' : 'collapsed'}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
