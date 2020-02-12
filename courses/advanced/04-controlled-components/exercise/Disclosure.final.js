import React, { useState, useContext, useRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { wrapEvent } from '../lecture/utils'

const DisclosureContext = React.createContext()

export function Disclosure({ children, open: controlledOpen, onChange, defaultOpen = false }) {
  const isControlled = controlledOpen != null
  const { current: wasControlled } = useRef(isControlled)
  if ((!isControlled && wasControlled) || (isControlled && !wasControlled)) {
    console.warn('Cannot change from controlled to uncontrolled or vice versa.')
  }

  if (isControlled && defaultOpen) {
    console.warn('defaultOpen should only be used for uncontrolled components.')
  }

  const [isOpen, setIsOpen] = useState(defaultOpen)

  const context = {
    isOpen: isControlled ? controlledOpen : isOpen,
    onSelect: () => {
      onChange && onChange()
      if (!isControlled) {
        setIsOpen(!isOpen)
      }
    },
  }

  return <DisclosureContext.Provider children={children} value={context} />
}

Disclosure.propTypes = {
  onChange: PropTypes.func,
  open: PropTypes.bool,
}

export const DisclosureButton = forwardRef(({ children, onClick, ...props }, forwardedRef) => {
  const { isOpen, onSelect } = useContext(DisclosureContext)

  return (
    <button
      onClick={wrapEvent(onClick, onSelect)}
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
})

DisclosureButton.displayName = 'DisclosureButton'
DisclosureButton.propTypes = {
  onClick: PropTypes.func,
}

export const DisclosurePanel = forwardRef(({ children, ...props }, forwardedRef) => {
  const { isOpen } = useContext(DisclosureContext)

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
