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

  const indexRef = useRef(-1)

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
    <AccordionContext.Provider value={context}>
      <div data-accordion="" {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

/**
 * Accordion Item
 */

const ItemContext = createContext()

export const AccordionItem = ({ children, ...props }) => {
  const { isSelected, register, accordionId, selectPanel } = use(AccordionContext)

  const indexRef = useRef()
  const index = register(indexRef)

  const panelId = `accordion-${accordionId}-panel-${index}`
  const buttonId = `accordion-${accordionId}-button-${index}`
  const selected = isSelected(index)

  const context = {
    buttonId,
    panelId,
    selected,
    selectPanel: () => selectPanel(index),
  }

  return (
    <ItemContext.Provider value={context}>
      <div {...props} data-accordion-item="" data-state={selected ? 'open' : 'collapsed'}>
        {children}
      </div>
    </ItemContext.Provider>
  )
}

/**
 * Accordion Button
 */

export const AccordionButton = ({ children, onClick, ...props }) => {
  const { buttonId, panelId, selected, selectPanel } = use(ItemContext)

  return (
    <button
      {...props}
      onClick={wrapEvent(onClick, selectPanel)}
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
  const { buttonId, panelId, selected } = use(ItemContext)

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
