import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { wrapEvent } from '../../utils'

export function Disclosure({ children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      isOpen,
      onSelect: () => setIsOpen(!isOpen),
    })
  })

  return children
}

// We're getting a warning that says: React does not recognize the `isOpen` prop on a DOM element
export const DisclosureButton = forwardRef(
  ({ children, isOpen, onSelect, ...props }, forwardedRef) => {
    return (
      <button
        onClick={onSelect}
        data-disclosure-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-expanded={isOpen}
        aria-controls="disclosure-panel"
        ref={forwardedRef}
        {...props}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = forwardRef(({ children, isOpen, ...props }, forwardedRef) => {
  return (
    <div
      id="disclosure-panel"
      hidden={!isOpen}
      data-disclosure-panel=""
      data-state={isOpen ? 'open' : 'collapsed'}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </div>
  )
})

DisclosurePanel.displayName = 'DisclosurePanel'
