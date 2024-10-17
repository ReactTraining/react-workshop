import React, { useState, useId } from 'react'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  function onSelect() {
    if (typeof onChange === 'function') {
      onChange(!isOpen)
    }
    setIsOpen(!isOpen)
  }

  const panelId = useId()

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { isOpen, onSelect, panelId })
  })

  return <div data-disclosure>{children}</div>
}

export const DisclosureButton = ({ children, isOpen, panelId, onSelect, ...props }) => {
  return (
    <button
      {...props}
      onClick={onSelect}
      data-disclosure-button=""
      data-state={isOpen ? 'open' : 'collapsed'}
      aria-controls={panelId}
    >
      {children}
    </button>
  )
}
export const DisclosurePanel = ({ children, panelId, isOpen }) => {
  return (
    <div
      id={panelId}
      data-disclosure-panel
      data-state={isOpen ? 'open' : 'collapsed'}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
