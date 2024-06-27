import React, { useState, useId } from 'react'

export function Disclosure({ children, onChange, label, defaultIsOpen = false, ...props }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const panelId = useId()

  function onSelect() {
    setIsOpen(!isOpen)
    onChange && onChange(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      panelId,
      onSelect,
      isOpen,
    })
  })

  return <div data-disclosure="">{children}</div>
}

export const DisclosureButton = ({ children, onSelect, panelId, isOpen, ...props }) => {
  return (
    <button
      {...props}
      onClick={onSelect}
      data-disclosure-button=""
      data-state={`${isOpen ? 'open' : 'collapsed'}`}
      aria-expanded={isOpen}
      aria-controls={panelId}
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
      data-disclosure-panel
      data-state={`${isOpen ? 'open' : 'collapsed'}`}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
