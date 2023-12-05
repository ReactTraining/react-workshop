import React, { useState, useId } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const panelId = useId()

  function onSelect() {
    setIsOpen(!isOpen)
    typeof onChange === 'function' && onChange(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      isOpen,
      onSelect,
      panelId,
    })
  })

  return <div data-disclosure="">{children}</div>
}

export const DisclosureButton = React.forwardRef(
  ({ children, onSelect, isOpen, panelId, ...props }, forwardedRef) => {
    return (
      <button
        ref={forwardedRef}
        {...props}
        onClick={onSelect}
        aria-controls={panelId}
        aria-expanded={isOpen}
        data-disclosure-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

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
