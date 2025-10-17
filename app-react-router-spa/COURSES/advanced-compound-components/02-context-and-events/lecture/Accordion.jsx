import React, { useState, useId, use, createContext } from 'react'
import { wrapEvent } from '../../utils'

/**
 * Accordion
 */

const AccordionContext = createContext()

export const Accordion = ({ children, onChange, defaultIndex = 0, id, ...props }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
  const accordionId = useId(id)

  children = React.Children.map(children, (child, index) => {
    const panelId = `accordion-${accordionId}-panel-${index}`
    const buttonId = `accordion-${accordionId}-button-${index}`

    const context = {
      buttonId,
      panelId,
      selected: selectedIndex === index,
      selectPanel: () => {
        onChange && onChange(index)
        setSelectedIndex(index)
      },
    }

    return <AccordionContext.Provider value={context}>{child}</AccordionContext.Provider>
  })

  return (
    <div data-accordion="" {...props}>
      {children}
    </div>
  )
}

/**
 * Accordion Item
 */

export const AccordionItem = ({ children, ...props }) => {
  const { selected } = use(AccordionContext)

  return (
    <div {...props} data-accordion-item="" data-state={selected ? 'open' : 'collapsed'}>
      {children}
    </div>
  )
}

/**
 * Accordion Button
 */

export const AccordionButton = ({ children, onClick, ...props }) => {
  const { buttonId, panelId, selected, selectPanel } = use(AccordionContext)

  return (
    <button
      {...props}
      id={buttonId}
      onClick={wrapEvent(onClick, selectPanel)}
      data-accordion-button=""
      data-state={selected ? 'open' : 'collapsed'}
      aria-expanded={selected}
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
  const { buttonId, panelId, selected } = use(AccordionContext)

  return (
    <div
      role="region"
      {...props}
      aria-labelledby={buttonId}
      id={panelId}
      hidden={!selected}
      data-accordion-panel=""
      data-state={selected ? 'open' : 'collapsed'}
    >
      {children}
    </div>
  )
}
