import React, { useState, useId } from 'react'

export function Disclosure({ children, onChange, defaultIsOpen = false, ...props }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const panelId = useId()

  function onSelect() {
    setIsOpen(!isOpen)
    onChange(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { onSelect, isOpen, panelId })
  })

  return (
    <div data-disclosure {...props}>
      {children}
    </div>
  )
}

export const DisclosureButton = ({ children, panelId, onSelect, isOpen, ...props }) => {
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

export const DisclosurePanel = ({ children, panelId, isOpen, ...props }) => {
  return (
    <div
      {...props}
      id={panelId}
      className={`disclosure-panel ${isOpen ? 'open' : 'collapsed'}`}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
