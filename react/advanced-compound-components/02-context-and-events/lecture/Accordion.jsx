import React, { useState, useId, use, createContext } from 'react'
import { wrapEvent } from '../../utils'

/**
 * Accordion
 */

export const Accordion = ({ children, onChange, defaultIndex = 0, id, ...props }) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
  const accordionId = useId(id)

  children = React.Children.map(children, (child, index) => {
    const panelId = `accordion-${accordionId}-panel-${index}`
    const buttonId = `accordion-${accordionId}-button-${index}`

    return React.cloneElement(child, {
      buttonId,
      panelId,
      selected: selectedIndex === index,
      selectPanel: () => {
        onChange && onChange(index)
        setSelectedIndex(index)
      },
    })
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

export const AccordionItem = ({ children, buttonId, panelId, selected, selectPanel, ...props }) => {
  children = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      buttonId,
      panelId,
      selected,
      selectPanel,
    })
  })

  return (
    <div {...props} data-accordion-item="" data-state={selected ? 'open' : 'collapsed'}>
      {children}
    </div>
  )
}

/**
 * Accordion Button
 */

export const AccordionButton = ({
  children,
  buttonId,
  panelId,
  selected,
  selectPanel,
  ...props
}) => {
  return (
    <button
      {...props}
      id={buttonId}
      onClick={selectPanel}
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

export const AccordionPanel = ({ children, buttonId, panelId, selected, ...props }) => {
  // Since we're passing our internal implementations down through props,
  // and then also forwarding props, some unneeded things are being passed
  // to the DOM, like props.selectPanel in this case.
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
