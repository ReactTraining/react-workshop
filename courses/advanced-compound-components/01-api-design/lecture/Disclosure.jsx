import * as React from 'react'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  const panelId = React.useId()

  function onSelect() {
    setIsOpen(!isOpen)
    onChange(!isOpen)
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { onSelect, isOpen, panelId })
  })

  return <div className="disclosure">{children}</div>
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
      className={`disclosure-panel ${isOpen ? 'open' : 'collapsed'}`}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
