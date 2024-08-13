import React, { useState, useId } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  function onSelect() {
    setIsOpen(!isOpen)
    onChange(!isOpen)
  }

  const panelId = useId()

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { onSelect, isOpen, panelId })
  })

  return <div className="disclosure">{children}</div>
}

export const DisclosureButton = ({ children, onSelect, isOpen, panelId, ...props }) => {
  return (
    <button
      {...props}
      onClick={onSelect}
      data-disclosure-button
      data-state={isOpen ? 'open' : 'collapsed'}
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
      className={`disclosure-panel ${isOpen ? 'open' : 'collapsed'}`}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
