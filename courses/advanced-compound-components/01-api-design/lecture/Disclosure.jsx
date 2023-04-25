import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export function Disclosure({ children, onChange, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  const disclosureId = React.useId()

  function onSelect() {
    setIsOpen(!isOpen)
    onChange && onChange(!isOpen)
    // onChange?.() // optional chaining
  }

  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, { isOpen, onSelect, disclosureId })
  })

  return <div className="disclosure">{children}</div>
}

export const DisclosureButton = React.forwardRef(
  ({ children, onSelect, isOpen, disclosureId, ...props }, forwardedRef) => {
    return (
      <button
        ref={forwardedRef}
        {...props}
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
      data-disclosure-panel=""
      data-state={isOpen ? 'open' : 'collapsed'}
      hidden={!isOpen}
    >
      {children}
    </div>
  )
}
