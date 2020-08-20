import React, { useState, useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useId } from '../../useId'
import { wrapEvent } from '../../utils'

const DisclosureContext = React.createContext()

export function Disclosure({
  children,
  onChange,
  defaultOpen = false,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const id = useId(props.id)
  const panelId = `panel-${id}`

  const context = {
    isOpen,
    panelId,
    onSelect: () => {
      onChange && onChange()
      setIsOpen(!isOpen)
    }
  }

  return (
    <DisclosureContext.Provider children={children} value={context} />
  )
}

Disclosure.propTypes = {
  onChange: PropTypes.func
}

export const DisclosureButton = forwardRef(
  ({ children, onClick, ...props }, forwardedRef) => {
    const { isOpen, panelId, onSelect } = useContext(
      DisclosureContext
    )

    return (
      <button
        {...props}
        onClick={wrapEvent(onClick, onSelect)}
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
DisclosureButton.propTypes = {
  onClick: PropTypes.func
}

export const DisclosurePanel = forwardRef(
  ({ children, ...props }, forwardedRef) => {
    const { isOpen, panelId } = useContext(DisclosureContext)

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
