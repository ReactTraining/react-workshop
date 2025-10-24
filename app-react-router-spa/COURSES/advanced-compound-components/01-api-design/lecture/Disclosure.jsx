import React, { useState, useId } from 'react'

export function Disclosure({ children, onChange, defaultIsOpen = false, ...props }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const panelId = useId()

  function onSelect() {
    setIsOpen(!isOpen)
    if (typeof onChange === 'function') {
      onChange(!isOpen)
    }
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { onSelect, isOpen, panelId })
  })

  return (
    <div {...props} className="disclosure">
      {children}
    </div>
  )
}

export const DisclosureButton = ({ children, onSelect, isOpen, panelId, ...props }) => {
  return (
    <button
      {...props}
      onClick={onSelect}
      data-disclosure-button
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
      id={panelId}
      {...props}
      className={`disclosure-panel ${isOpen ? 'open' : 'collapsed'}`}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
