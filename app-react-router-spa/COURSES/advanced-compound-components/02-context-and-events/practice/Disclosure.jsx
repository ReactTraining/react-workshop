import React, { useState, useId, use, createContext } from 'react'
import { wrapEvent } from '../../utils'

export function Disclosure({ children, defaultOpen = false, ...props }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const id = useId()
  const panelId = `panel-${id}`

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      isOpen,
      panelId,
      onSelect: () => setIsOpen(!isOpen),
    })
  })

  return (
    <div {...props} data-disclosure="">
      {children}
    </div>
  )
}

export const DisclosureButton = ({ children, isOpen, panelId, onSelect, ...props }) => {
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
