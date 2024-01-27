import React, { useState, useId } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const disclosureId = useId()

  function onSelect() {
    setIsOpen(!isOpen)
    typeof onChange === 'function' && onChange(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { onSelect, isOpen, disclosureId })
  })

  return <div className="disclosure">{children}</div>
}

export const DisclosureButton = React.forwardRef(
  ({ children, onSelect, isOpen, disclosureId, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        ref={forwardedRef}
        onClick={onSelect}
        data-disclosure-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-expanded={isOpen}
        aria-controls={disclosureId}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = ({ children, isOpen, disclosureId, ...props }) => {
  return (
    <div
      {...props}
      id={disclosureId}
      className={`disclosure-panel ${isOpen ? 'open' : 'collapsed'}`}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
