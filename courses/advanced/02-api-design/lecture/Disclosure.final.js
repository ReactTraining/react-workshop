import React, { useState, forwardRef } from 'react'

export function Disclosure({ children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      isOpen,
      onSelect: () => setIsOpen(!isOpen),
    })
  })

  // Notice we don't need the wrapper div. It wasn't doing anything stylistically for us anyway
  return children
}

export const DisclosureButton = forwardRef(
  ({ children, isOpen, onSelect, ...props }, forwardedRef) => {
    // Note, data attributes in React need to have an empty string in order to be created correctly.
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
