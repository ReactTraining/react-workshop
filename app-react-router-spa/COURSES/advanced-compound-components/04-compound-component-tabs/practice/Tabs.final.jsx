import React, { useRef, useState, useId, createContext, use } from 'react'
import { wrapEvent } from '../../utils'

const TabsContext = createContext()
const TabContext = createContext()
const PanelContext = createContext()

export const Tabs = ({ children, onChange, index: controlledIndex, ...props }) => {
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
    <TabsContext value={context}>
      <div {...props} data-tabs="">
        {children}
      </div>
    </TabsContext>
  )
}

export const TabList = ({ children, ...props }) => {
  children = React.Children.map(children, (child, index) => {
    return <TabContext value={index} children={child} />
  })

  return (
    <div {...props} data-tab-list="" role="tablist">
      {children}
    </div>
  )
}

export const Tab = ({ children, onClick, disabled, ...props }) => {
  const index = use(TabContext)
  const { tabsId, selectedIndex, setSelectedIndex } = use(TabsContext)
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
    >
      {children}
    </button>
  )
}

export const TabPanels = ({ children, ...props }) => {
  children = React.Children.map(children, (child, index) => {
    return <PanelContext value={index} children={child} />
  })

  return (
    <div {...props} data-tab-panels="">
      {children}
    </div>
  )
}

export const TabPanel = ({ children, ...props }) => {
  const index = use(PanelContext)
  const { tabsId, selectedIndex } = use(TabsContext)
  const selected = selectedIndex === index

  return (
    <div
      role="tabpanel"
      {...props}
      id={`tabs-${tabsId}-panel-${index}`}
      aria-labelledby={`tabs-${tabsId}-tab-${index}`}
      hidden={!selected}
      data-tab-panel=""
    >
      {children}
    </div>
  )
}
