import * as React from 'react'
import { wrapEvent, useForkedRef } from '../../utils'

import {
  createDescendantContext,
  DescendantProvider,
  useDescendant,
  useDescendants,
} from '@reach/descendants'

const DescendantContext = createDescendantContext('DescendantContext')
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

    const context = {
      accordionId,
      isSelected: (index) => {
        return isControlled ? controlledIndex === index : selectedIndex === index
      },
      selectPanel: (index) => {
        onChange && onChange(index)
        if (!isControlled) {
          setSelectedIndex(index)
        }
      },
    }

    const [descendants, setDescendants] = useDescendants()

    return (
      <DescendantProvider context={DescendantContext} items={descendants} set={setDescendants}>
        <AccordionContext.Provider value={context}>
          <div data-accordion="" ref={forwardedRef} {...props}>
            {children}
          </div>
        </AccordionContext.Provider>
      </DescendantProvider>
    )
  }
)

Accordion.displayName = 'Accordion'

/**
 * Accordion Item
 */

const AccordionItemContext = React.createContext()

export const AccordionItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const { accordionId, isSelected, selectPanel } = React.useContext(AccordionContext)

  const itemRef = React.useRef()
  const ref = useForkedRef(itemRef, forwardedRef)

  const index = useDescendant({
    context: DescendantContext,
    element: itemRef.current,
  })

  const selected = isSelected(index)

  const context = {
    selectPanel: () => selectPanel(index),
    selected,
    panelId: `accordion-${accordionId}-panel-${index}`,
    buttonId: `accordion-${accordionId}-button-${index}`,
  }

  return (
    <AccordionItemContext.Provider value={context}>
      <div {...props} data-accordion-item="" data-state={selected ? 'open' : 'collapsed'} ref={ref}>
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
  const { panelId, selected, selectPanel } = React.useContext(AccordionItemContext)

  return (
    <button
      {...props}
      onClick={wrapEvent(onClick, selectPanel)}
      data-accordion-button=""
      data-state={selected ? 'open' : 'collapsed'}
      aria-expanded={selected}
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
  const { buttonId, panelId, selected } = React.useContext(AccordionItemContext)

  return (
    <div
      role="region"
      {...props}
      id={panelId}
      aria-labelledby={buttonId}
      hidden={!selected}
      data-accordion-panel=""
      data-state={selected ? 'open' : 'collapsed'}
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})

AccordionPanel.displayName = 'AccordionPanel'
