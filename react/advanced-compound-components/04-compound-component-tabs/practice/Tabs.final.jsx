import React, { useRef, useState, useId, createContext, useContext } from 'react'
import { wrapEvent } from '../../utils'

const TabsContext = createContext()
const TabContext = createContext()
const PanelContext = createContext()

export const Tabs = React.forwardRef(
  ({ children, onChange, index: controlledIndex, ...props }, forwardedRef) => {
    const isControlled = controlledIndex != null
    const { current: startedControlled } = useRef(isControlled)
    if (isControlled !== startedControlled) {
      console.warn('Cannot change from controlled to uncontrolled or vice versa.')
    }

    const [selectedIndex, setSelectedIndex] = useState(0)

    const context = {
      tabsId: useId(),
      selectedIndex: isControlled ? controlledIndex : selectedIndex,
      setSelectedIndex: (index) => {
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

export const TabList = React.forwardRef(({ children, ...props }, forwardedRef) => {
  children = React.Children.map(children, (child, index) => {
    return <TabContext.Provider value={index} children={child} />
  })

  return (
    <div {...props} data-tab-list="" role="tablist" ref={forwardedRef}>
      {children}
    </div>
  )
})

export const Tab = React.forwardRef(({ children, onClick, disabled, ...props }, forwardedRef) => {
  const index = useContext(TabContext)
  const { tabsId, selectedIndex, setSelectedIndex } = useContext(TabsContext)
  const selected = index === selectedIndex

  function handleClick() {
    setSelectedIndex(index)
  }

  return (
    <button
      role="tab"
      {...props}
      id={`tabs-${tabsId}-tab-${index}`}
      aria-controls={`tabs-${tabsId}-panel-${index}`}
      aria-selected={selected}
      disabled={disabled}
      data-tab=""
      data-selected={selected ? '' : undefined}
      onClick={wrapEvent(onClick, handleClick)}
      ref={forwardedRef}
    >
      {children}
    </button>
  )
})

export const TabPanels = React.forwardRef(({ children, ...props }, forwardedRef) => {
  children = React.Children.map(children, (child, index) => {
    return <PanelContext.Provider value={index} children={child} />
  })

  return (
    <div {...props} data-tab-panels="" ref={forwardedRef}>
      {children}
    </div>
  )
})

export const TabPanel = React.forwardRef(({ children, ...props }, forwardedRef) => {
  const index = useContext(PanelContext)
  const { tabsId, selectedIndex } = useContext(TabsContext)
  const selected = selectedIndex === index

  return (
    <div
      role="tabpanel"
      {...props}
      id={`tabs-${tabsId}-panel-${index}`}
      aria-labelledby={`tabs-${tabsId}-tab-${index}`}
      hidden={!selected}
      data-tab-panel=""
      ref={forwardedRef}
    >
      {children}
    </div>
  )
})
