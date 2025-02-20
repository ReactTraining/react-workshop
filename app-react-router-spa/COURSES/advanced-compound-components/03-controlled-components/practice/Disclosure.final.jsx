import React, { useRef, useState, useId, use, createContext } from 'react'
import { wrapEvent } from '../../utils'

const DisclosureContext = createContext()

export function Disclosure({
  children,
  open: controlledOpen,
  onChange,
  defaultOpen = false,
  ...props
}) {
  const isControlled = controlledOpen != null
  const { current: startedControlled } = useRef(isControlled)
  if (isControlled !== startedControlled) {
    console.warn('Cannot change from controlled to uncontrolled or vice versa.')
  }

  if (isControlled && defaultOpen) {
    console.warn('defaultOpen should only be used for uncontrolled components.')
  }

  const [isOpen, setIsOpen] = useState(defaultOpen)

  const id = useId()
  const panelId = `panel-${id}`

  const context = {
    isOpen: isControlled ? controlledOpen : isOpen,
    panelId,
    onSelect: () => {
      onChange && onChange(!isOpen)
      if (!isControlled) {
        setIsOpen(!isOpen)
      }
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
