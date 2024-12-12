import React, { useRef, useState, useId, use, createContext } from 'react'
import { wrapEvent } from '../../utils'

const AccordionContext = createContext()

/**
 * Accordion
 */

export const Accordion = ({
  children,
  onChange,
  index: controlledIndex,
  defaultIndex = 0,
  id,
  ...props
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
  const accordionId = useId(id)

  const isControlled = controlledIndex != null
  const { current: startedControlled } = useRef(isControlled)
  if (isControlled !== startedControlled) {
    console.warn('Cannot change from controlled to uncontrolled or vice versa.')
  }

  // index will eventually use a mutable ref to avoid registration re-renders

  const indexRef = useRef(-1) // 2

  const context = {
    accordionId,
    register: (ref) => {
      if (!ref.current) {
        ref.current = ++indexRef.current
      }
      return ref.current
    },
    isSelected: (index) => (isControlled ? controlledIndex === index : selectedIndex === index),
    selectPanel: (index) => {
      onChange && onChange(index)
      if (!isControlled) {
        setSelectedIndex(index)
      }
    },
  }

  return (
    <AccordionContext value={context}>
      <div data-accordion="" {...props}>
        {children}
      </div>
    </AccordionContext>
  )
}

/**
 * Accordion Item
 */

const AccordionItemContext = createContext()

export const AccordionItem = ({ children, ...props }) => {
  const { isSelected, accordionId, register, selectPanel } = use(AccordionContext)

  const indexRef = useRef(null) // { current: null }
  const index = register(indexRef)
  const selected = isSelected(index)

  const context = {
    selected,
    panelId: `accordion-${accordionId}-panel-${index}`,
    buttonId: `accordion-${accordionId}-button-${index}`,
    onSelect: () => selectPanel(index),
  }

  return (
    <AccordionItemContext value={context}>
      <div {...props} data-accordion-item="" data-state={selected ? 'open' : 'collapsed'}>
        {children}
      </div>
    </AccordionItemContext>
  )
}

/**
 * Accordion Button
 */

export const AccordionButton = ({ children, onClick, ...props }) => {
  const { buttonId, panelId, selected, onSelect } = use(AccordionItemContext)

  return (
    <button
      {...props}
      onClick={wrapEvent(onClick, onSelect)}
      data-accordion-button=""
      data-state={selected ? 'open' : 'collapsed'}
      aria-expanded={selected}
      id={buttonId}
      aria-controls={panelId}
    >
      {children}
    </button>
  )
}

/**
 * Accordion Panel
 */

export const AccordionPanel = ({ children, ...props }) => {
  const { buttonId, panelId, selected } = use(AccordionItemContext)

  return (
    <div
      role="region"
      {...props}
      id={panelId}
      aria-labelledby={buttonId}
      hidden={!selected}
      data-accordion-panel=""
      data-state={selected ? 'open' : 'collapsed'}
    >
      {children}
    </div>
  )
}
