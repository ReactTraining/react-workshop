import React, { useState, useId } from 'react'

export function Disclosure({ children, onChange, defaultOpen = false, ...props }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const id = useId()
  const panelId = `${id}-panel`

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      isOpen,
      panelId,
      onSelect: () => {
        onChange && onChange(!isOpen)
        setIsOpen(!isOpen)
      },
    })
  })

  return (
    <div {...props} data-disclosure="">
      {children}
    </div>
  )
}

export const DisclosureButton = ({ children, isOpen, panelId, onSelect, ...props }) => {
  // Note, data attributes in React need to have an empty string in order to be created correctly.
  return (
    <button
      {...props}
      onClick={onSelect}
      data-disclosure-button=""
      data-state={isOpen ? 'open' : 'collapsed'}
      aria-expanded={isOpen}
      aria-controls={panelId}
    >
      {children}
    </button>
  )
}

export const DisclosurePanel = ({ children, isOpen, panelId, ...props }) => {
  return (
    <div
      {...props}
      id={panelId}
      hidden={!isOpen}
      data-disclosure-panel=""
      data-state={isOpen ? 'open' : 'collapsed'}
    >
      {children}
    </div>
  )
}
