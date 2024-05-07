import React, { useRef, useState, useId, use, createContext } from 'react'
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
    <DisclosureContext value={context}>
      <div {...props} data-disclosure="">
        {children}
      </div>
    </DisclosureContext>
  )
}

export const DisclosureButton = ({ children, onClick, ...props }) => {
  const { isOpen, panelId, onSelect } = use(DisclosureContext)

  return (
    <button
      {...props}
      onClick={wrapEvent(onClick, onSelect)}
      data-disclosure-button=""
      data-state={isOpen ? 'open' : 'collapsed'}
      aria-expanded={isOpen}
      aria-controls={panelId}
    >
      {children}
    </button>
  )
}

export const DisclosurePanel = ({ children, ...props }) => {
  const { isOpen, panelId } = use(DisclosureContext)

  return (
    <div
      {...props}
      id={panelId}
      hidden={!isOpen}
      data-disclosure-panel=""
      data-state={isOpen ? 'open' : 'collapsed'}
    >
      {children}
    </div>
  )
}
