import React, { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { wrapEvent } from '../../utils'

/**
 * Accordion
 */

export const Accordion = forwardRef(({ children, defaultIndex = 0, ...props }, forwardedRef) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      selected: selectedIndex === index,
      selectPanel: () => setSelectedIndex(index),
    })
  })

  return (
    <div data-accordion="" ref={forwardedRef} {...props}>
      {children}
    </div>
  )
})

Accordion.displayName = 'Accordion'

/**
 * Accordion Item
 */

export const AccordionItem = forwardRef(
  ({ children, selected, selectPanel, ...props }, forwardedRef) => {
    children = React.Children.map(children, child => {
      return React.cloneElement(child, {
        selected,
        selectPanel,
      })
    })

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
  }
)

AccordionItem.displayName = 'AccordionItem'

/**
 * Accordion Button
 */

export const AccordionButton = forwardRef(
  ({ children, selected, selectPanel, ...props }, forwardedRef) => {
    return (
      <button
        onClick={selectPanel}
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
  }
)

AccordionButton.displayName = 'AccordionButton'

/**
 * Accordion Panel
 */

export const AccordionPanel = forwardRef(({ children, selected, ...props }, forwardedRef) => {
  return (
    <div
      id="accordion-panel"
      hidden={!selected}
      data-accordion-panel=""
      data-state={selected ? 'open' : 'collapsed'}
      role="region"
      ref={forwardedRef}
      {...props}
    >
      {children}
    </div>
  )
})

AccordionPanel.displayName = 'AccordionPanel'
