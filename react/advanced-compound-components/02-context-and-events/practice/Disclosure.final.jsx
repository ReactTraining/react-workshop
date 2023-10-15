import React, { useState, useId, useContext, createContext } from 'react'
import { wrapEvent } from '../../utils'

const DisclosureContext = createContext()

export function Disclosure({ children, onChange, defaultOpen = false, ...props }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const id = useId()
  const panelId = `panel-${id}`

  const context = {
    isOpen,
    panelId,
    onSelect: () => {
      onChange && onChange(!isOpen)
      setIsOpen(!isOpen)
    },
  }

  return (
    <DisclosureContext.Provider value={context}>
      <div {...props} data-disclosure="">
        {children}
      </div>
    </DisclosureContext.Provider>
  )
}

export const DisclosureButton = React.forwardRef(
  ({ children, onClick, ...props }, forwardedRef) => {
    const { isOpen, panelId, onSelect } = useContext(DisclosureContext)

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

export const DisclosurePanel = React.forwardRef(({ children, ...props }, forwardedRef) => {
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
})

DisclosurePanel.displayName = 'DisclosurePanel'
