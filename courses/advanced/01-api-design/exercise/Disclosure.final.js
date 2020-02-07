import React, { useState, forwardRef } from 'react'

export function Disclosure({ children, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      isOpen,
      onSelect: () => setIsOpen(!isOpen),
    })
  })

  return children
}

// We're getting a warning that says: React does not recognize the `isOpen` prop on a DOM element
export const DisclosureButton = forwardRef(({ children, onSelect, ...props }, forwardedRef) => {
  return (
    <button onClick={onSelect} data-disclosure-target="" ref={forwardedRef} {...props}>
      {children}
    </button>
  )
})

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = forwardRef(({ children, isOpen, ...props }, forwardedRef) => {
  return (
    <div hidden={!isOpen} data-disclosure-panel="" ref={forwardedRef} {...props}>
      {children}
    </div>
  )
})

DisclosurePanel.displayName = 'DisclosurePanel'
