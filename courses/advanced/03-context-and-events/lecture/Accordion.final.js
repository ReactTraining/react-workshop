import React, { useState, useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { wrapEvent } from './utils'

const AccordionContext = React.createContext()

/**
 * Accordion
 */

export const Accordion = forwardRef(
  ({ children, onChange, defaultIndex = 0, ...props }, forwardedRef) => {
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex)

    // This unique way of doing a map on the children and creating a context provider
    // for each AccordionItem is for preserving the index of that AccordionItem:
    children = React.Children.map(children, (child, index) => {
      const context = {
        selected: selectedIndex === index,
        selectPanel: () => {
          onChange && onChange(index)
          setSelectedIndex(index)
        },
      }
      return <AccordionContext.Provider value={context} children={child} />
    })

    return (
      <div data-accordion="" ref={forwardedRef} {...props}>
        {children}
      </div>
    )
  }
)

Accordion.displayName = 'Accordion'
Accordion.propTypes = {
  onChange: PropTypes.func,
}

/**
 * Accordion Item
 */

export const AccordionItem = forwardRef(({ children, ...props }, forwardedRef) => {
  const { selected } = useContext(AccordionContext)

  return (
    <div
      data-accordion-item=""
      data-state={selected ? 'open' : 'collapsed'}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </div>
  )
})

AccordionItem.displayName = 'AccordionItem'

/**
 * Accordion Button
 */

export const AccordionButton = forwardRef(({ children, onClick, ...props }, forwardedRef) => {
  const { selected, selectPanel } = useContext(AccordionContext)

  return (
    <button
      onClick={wrapEvent(onClick, selectPanel)}
      data-accordion-button=""
      data-state={selected ? 'open' : 'collapsed'}
      aria-expanded={selected}
      aria-controls="accordion-panel"
      ref={forwardedRef}
      {...props}
    >
      {children}
    </button>
  )
})

AccordionButton.displayName = 'AccordionButton'
AccordionButton.propTypes = {
  onClick: PropTypes.func,
}

/**
 * Accordion Panel
 */

export const AccordionPanel = forwardRef(({ children, ...props }, forwardedRef) => {
  const { selected } = useContext(AccordionContext)

  return (
    <div
      id="accordion-panel"
      hidden={!selected}
      data-accordion-panel=""
      data-state={selected ? 'open' : 'collapsed'}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </div>
  )
})

AccordionPanel.displayName = 'AccordionPanel'
