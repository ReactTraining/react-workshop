import * as React from 'react'
import { wrapEvent } from '../../utils'

// import {
//   createDescendantContext,
//   DescendantProvider,
//   useDescendant,
//   useDescendants
// } from '@reach/descendants'

// const DescendantContext = createDescendantContext('DescendantContext')
const AccordionContext = React.createContext()

/**
 * Accordion
 */

export const Accordion = React.forwardRef(
  (
    { children, onChange, index: controlledIndex, defaultIndex = 0, id, ...props },
    forwardedRef
  ) => {
    const [selectedIndex, setSelectedIndex] = React.useState(defaultIndex)
    const accordionId = React.useId(id)

    const isControlled = controlledIndex != null
    const { current: startedControlled } = React.useRef(isControlled)
    if (isControlled !== startedControlled) {
      console.warn('Cannot change from controlled to uncontrolled or vice versa.')
    }

    const iRef = React.useRef(-1)

    const context = {
      accordionId,
      registerIndex: (ref) => {
        if (!ref.current) {
          ref.current = ++iRef.current
        }
        return ref.current
      },
      selected: (index) => (isControlled ? controlledIndex === index : selectedIndex === index),
      selectPanel: (index) => {
        onChange && onChange(index)
        if (!isControlled) {
          setSelectedIndex(index)
        }
      },
    }

    return (
      <AccordionContext.Provider value={context}>
        <div data-accordion="" ref={forwardedRef} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

Accordion.displayName = 'Accordion'

/**
 * Accordion Item
 */

const AccordionItemContext = React.createContext()

export const AccordionItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { accordionId, registerIndex, selected, selectPanel } = React.useContext(AccordionContext)

  const indexRef = React.useRef()
  const index = registerIndex(indexRef)
  const isSelected = selected(index)

  const context = {
    panelId: `accordion-${accordionId}-panel-${index}`,
    buttonId: `accordion-${accordionId}-button-${index}`,
    isSelected,
    selectPanel: () => selectPanel(index),
  }

  return (
    <AccordionItemContext.Provider value={context}>
      <div
        {...props}
        data-accordion-item=""
        data-state={isSelected ? 'open' : 'collapsed'}
        ref={forwardedRef}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
})

AccordionItem.displayName = 'AccordionItem'

/**
 * Accordion Button
 */

export const AccordionButton = React.forwardRef(({ children, onClick, ...props }, forwardedRef) => {
  const { buttonId, panelId, isSelected, selectPanel } = React.useContext(AccordionItemContext)

  return (
    <button
      {...props}
      onClick={wrapEvent(onClick, selectPanel)}
      data-accordion-button=""
      data-state={isSelected ? 'open' : 'collapsed'}
      aria-expanded={isSelected}
      id={buttonId}
      aria-controls={panelId}
      ref={forwardedRef}
    >
      {children}
    </button>
  )
})

AccordionButton.displayName = 'AccordionButton'

/**
 * Accordion Panel
 */

export const AccordionPanel = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { buttonId, panelId, isSelected, selectPanel } = React.useContext(AccordionItemContext)

  return (
    <div
      role="region"
      {...props}
      id={panelId}
      aria-labelledby={buttonId}
      hidden={!isSelected}
      data-accordion-panel=""
      data-state={isSelected ? 'open' : 'collapsed'}
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})

AccordionPanel.displayName = 'AccordionPanel'
