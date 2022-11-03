import * as React from 'react'

export function Disclosure({ onChange, children, defaultIsOpen = false, ...props }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  const id = React.useId()

  function onSelect() {
    setIsOpen(!isOpen)
    typeof onChange === 'function' && onChange(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { isOpen, onSelect, panelId: `disclosure-panel-${id}` })
  })

  return children
}

export const DisclosureButton = React.forwardRef(
  ({ onSelect, panelId, isOpen, children, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        ref={forwardedRef}
        onClick={onSelect}
        data-disclosure-button
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        {children}
      </button>
    )
  }
)

DisclosureButton.displayName = 'DisclosureButton'

export function DisclosurePanel({ isOpen, panelId, children, ...props }) {
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
