import React, { useState, forwardRef } from 'react'

export function Disclosure({ children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      open,
      onClick: () => setOpen(!open),
    })
  })

  // Notice we don't need the wrapper div. It wasn't doing anything stylistically for us anyway
  return children
}

export const DisclosureButton = forwardRef(({ children, onClick, ...props }, forwardedRef) => {
  // Note, data attributes in React need to have an empty string in order to be created correctly.
  return (
    <button onClick={onClick} data-disclosure-target="" ref={forwardedRef} {...props}>
      {children}
    </button>
  )
})

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = forwardRef(({ children, open, ...props }, forwardedRef) => {
  return (
    <div hidden={!open} data-disclosure-panel="" ref={forwardedRef} {...props}>
      {children}
    </div>
  )
})

DisclosurePanel.displayName = 'DisclosurePanel'
