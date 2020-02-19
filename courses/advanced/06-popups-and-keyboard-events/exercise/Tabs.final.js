import React, { useState, useContext, forwardRef, useRef } from 'react'
import { useId } from '../../useId'
import { wrapEvent } from '../../utils'

const TabsContext = React.createContext()
const TabContext = React.createContext()
const PanelContext = React.createContext()

export const Tabs = forwardRef(
  ({ children, onChange, index: controlledIndex, id, ...props }, forwardedRef) => {
    const isControlled = controlledIndex != null
    const { current: wasControlled } = useRef(isControlled)
    if ((!isControlled && wasControlled) || (isControlled && !wasControlled)) {
      console.warn('Cannot change from controlled to uncontrolled or vice versa.')
    }

    const [selectedIndex, setSelectedIndex] = useState(0)

    const context = {
      tabsId: useId(id),
      selectedIndex: isControlled ? controlledIndex : selectedIndex,
      setSelectedIndex: index => {
        onChange && onChange(index)
        if (!isControlled) {
          setSelectedIndex(index)
        }
      },
    }

    return (
      <TabsContext.Provider value={context}>
        <div {...props} data-tabs="" ref={forwardedRef}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

export const TabList = forwardRef(({ children, ...props }, forwardedRef) => {
  const totalTabs = React.Children.count(children)
  children = React.Children.map(children, (child, index) => {
    return <TabContext.Provider value={{ index, totalTabs }}>{child}</TabContext.Provider>
  })

  return (
    <div {...props} data-tab-list="" role="tablist" ref={forwardedRef}>
      {children}
    </div>
  )
})

export const Tab = forwardRef(({ children, onClick, onKeyDown, ...props }, forwardedRef) => {
  const { index, totalTabs } = useContext(TabContext)
  const { tabsId, selectedIndex, setSelectedIndex } = useContext(TabsContext)
  const selected = index === selectedIndex

  function handleClick() {
    setSelectedIndex(index)
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case 'Home':
        setSelectedIndex(0)
        break
      case 'End':
        setSelectedIndex(totalTabs - 1)
        break
      case 'ArrowLeft':
        if (selectedIndex !== 0) {
          setSelectedIndex(selectedIndex - 1)
        }
        break
      case 'ArrowRight':
        if (selectedIndex < totalTabs - 1) {
          setSelectedIndex(selectedIndex + 1)
        }
        break
      // case 'Tab':
      //   event.preventDefault()
      //   break
      default:
        break
    }
  }

  return (
    <button
      role="tab"
      {...props}
      id={`tabs-${tabsId}-tab-${index}`}
      aria-controls={`tabs-${tabsId}-panel-${index}`}
      aria-selected={selected}
      data-tab=""
      data-selected={selected ? '' : undefined}
      onClick={wrapEvent(onClick, handleClick)}
      onKeyDown={wrapEvent(onKeyDown, handleKeyDown)}
      ref={forwardedRef}
    >
      {children}
    </button>
  )
})

export const TabPanels = forwardRef(({ children, ...props }, forwardedRef) => {
  children = React.Children.map(children, (child, index) => {
    return <PanelContext.Provider value={index} children={child} />
  })

  return (
    <div {...props} data-tab-panels="" ref={forwardedRef}>
      {children}
    </div>
  )
})

export const TabPanel = forwardRef(({ children, ...props }, forwardedRef) => {
  const index = useContext(PanelContext)
  const { tabsId, selectedIndex } = useContext(TabsContext)
  const selected = selectedIndex === index

  return (
    <div
      role="tabpanel"
      {...props}
      id={`tabs-${tabsId}-tab-${index}`}
      aria-labelledby={`tabs-${tabsId}-panel-${index}`}
      hidden={!selected}
      data-tab-panel=""
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})
