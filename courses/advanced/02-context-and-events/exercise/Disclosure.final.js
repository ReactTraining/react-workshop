import React, { useState, useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { wrapEvent } from '../lecture/utils'

const DisclosureContext = React.createContext()

export function Disclosure({ children, onChange, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const context = {
    isOpen,
    onSelect: () => {
      onChange && onChange()
      setIsOpen(!isOpen)
    },
  }

  return <DisclosureContext.Provider children={children} value={context} />
}

Disclosure.propTypes = {
  onChange: PropTypes.func,
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
