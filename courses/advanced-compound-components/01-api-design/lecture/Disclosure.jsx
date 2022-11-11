import * as React from 'react'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  function onSelect() {
    setIsOpen(!isOpen)
    typeof onChange === 'function' && onChange(!isOpen)
  }

  const panelId = React.useId()

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onSelect,
      isOpen,
      panelId,
    })
  })

  return children
}

export const DisclosureButton = React.forwardRef(
  ({ children, onSelect, isOpen, panelId, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        ref={forwardedRef}
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
