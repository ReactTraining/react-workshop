import * as React from 'react'
import { wrapEvent, useForkedRef } from '../../utils'

const TabsContext = React.createContext()
const TabContext = React.createContext()
const PanelContext = React.createContext()

export const Tabs = React.forwardRef(
  ({ children, onChange, index: controlledIndex, id, ...props }, forwardedRef) => {
    const isControlled = controlledIndex != null
    const { current: startedControlled } = React.useRef(isControlled)
    if (isControlled !== startedControlled) {
      console.warn('Cannot change from controlled to uncontrolled or vice versa.')
    }

    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const context = {
      tabsId: React.useId(id),
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
  const index = React.useContext(TabContext)
  const { tabsId, selectedIndex, setSelectedIndex } = React.useContext(TabsContext)
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
  const index = React.useContext(PanelContext)
  const { tabsId, selectedIndex } = React.useContext(TabsContext)
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
