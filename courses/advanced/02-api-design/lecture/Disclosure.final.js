import React, { useState, forwardRef } from 'react'
import { useId } from '../../useId'

export function Disclosure({
  children,
  defaultOpen = false,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const id = useId(props.id)
  const panelId = `panel-${id}`

  children = React.Children.map(children, child => {
    return React.cloneElement(child, {
      isOpen,
      panelId,
      onSelect: () => setIsOpen(!isOpen)
    })
  })

  // Notice we don't need the wrapper div. It wasn't doing anything stylistically for us anyway
  return children
}

export const DisclosureButton = forwardRef(
  (
    { children, isOpen, panelId, onSelect, ...props },
    forwardedRef
  ) => {
    // Note, data attributes in React need to have an empty string in order to be created correctly.
    return (
      <button
        {...props}
        onClick={onSelect}
        data-disclosure-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-expanded={isOpen}
        aria-controls={panelId}
        ref={forwardedRef}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export const DisclosurePanel = forwardRef(
  ({ children, isOpen, panelId, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        id={panelId}
        hidden={!isOpen}
        data-disclosure-panel=""
        data-state={isOpen ? 'open' : 'collapsed'}
        ref={forwardedRef}
      >
        {children}
      </div>
    )
  }
)

DisclosurePanel.displayName = 'DisclosurePanel'
