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
      isOpen,
      onSelect,
      panelId,
    })
  })

  return <div className="disclosure">{children}</div>
}

export const DetailsButton = React.forwardRef(
  ({ children, isOpen, onSelect, panelId, ...props }, forwardedRef) => {
    return (
      <button
        {...props}
        ref={forwardedRef}
        onClick={onSelect}
        data-disclosure-button=""
        data-state={isOpen ? 'open' : 'collapsed'}
        aria-controls={panelId}
        aria-expanded={isOpen}
      >
        {children}
      </button>
    )
  }
)

DetailsButton.displayName = 'DetailsButton'

export const DetailsPanel = ({ isOpen, panelId, children, ...props }) => {
  return (
    <div
      {...props}
      id={panelId}
      data-disclosure-panel
      data-state={isOpen ? 'open' : 'collapsed'}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
