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
  const { current: startsControlled } = useRef(isControlled)
  if (isControlled !== startsControlled) {
    console.warn('Cannot change from controlled to uncontrolled or vice versa.')
  }

  children = React.Children.map(children, (child, index) => {
    const panelId = `accordion-${accordionId}-panel-${index}`
    const buttonId = `accordion-${accordionId}-button-${index}`

    const context = {
      buttonId,
      panelId,
      selected: isControlled ? controlledIndex === index : selectedIndex === index,
      selectPanel: () => {
        onChange && onChange(index)
        if (!isControlled) {
          setSelectedIndex(index)
        }
      },
    }
    return <AccordionContext value={context} children={child} />
  })

  function onKeyDown(event) {
    event.preventDefault()
    const i = isControlled ? controlledIndex : selectedIndex

    switch (event.key) {
      case 'ArrowUp':
        if (i !== 0) {
          onChange && onChange(i - 1)
          if (!isControlled) {
            setSelectedIndex(i - 1)
          }
        }
        break
      case 'ArrowDown':
        if (i < React.Children.count(children) - 1) {
          onChange && onChange(i + 1)
          if (!isControlled) {
            setSelectedIndex(i + 1)
          }
        }
        break
      default:
        break
    }
  }

  return (
    <div data-accordion="" onKeyDown={onKeyDown} {...props}>
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
      onClick={wrapEvent(onClick, selectPanel)}
      data-accordion-button=""
      data-state={selected ? 'open' : 'collapsed'}
      id={buttonId}
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
