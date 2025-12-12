import React, { useState, useId } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const panelId = useId()

  function onSelect() {
    setIsOpen(!isOpen)
    if (typeof onChange === 'function') {
      onChange(!isOpen)
    }
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { isOpen, onSelect, panelId })
  })

  return <div data-disclosure="">{children}</div>
}

export const DisclosureButton = ({ children, isOpen, onSelect, panelId, ...props }) => {
  return (
    <button
      {...props}
      onClick={onSelect}
      data-disclosure-button=""
      data-state={isOpen ? 'open' : 'collapsed'}
      aria-expanded={isOpen}
      aria-controls={panelId}
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
