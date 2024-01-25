import React, { useRef, useState, useId, createContext, useContext } from 'react'
import { wrapEvent } from '../../utils'

const TabsContext = createContext()
const TabContext = createContext()
const PanelContext = createContext()

export const Tabs = ({ children, ...props }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const tabsId = useId()

  const context = {
    tabsId,
    selectedIndex,
    setSelectedIndex: (index) => {
      setSelectedIndex(index)
    },
  }

  return (
    <TabsContext.Provider value={context}>
      <div id=":r0:" {...props} data-tabs="">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export const TabList = ({ children, ...props }) => {
  children = React.Children.map(children, (child, index) => {
    return <TabContext.Provider value={index} children={child} />
  })
  return (
    <div {...props} data-tab-list="">
      {children}
    </div>
  )
}

export const Tab = ({ children, ...props }) => {
  const index = useContext(TabContext)
  const { tabsId, selectedIndex } = useContext(TabsContext)
  const isSelected = index === selectedIndex

  return (
    <div
      {...props}
      id={`tabs-${tabsId}-tab-${index}`}
      aria-controls={`tabs-${tabsId}-panel-${index}`}
      data-tab=""
      data-selected={isSelected ? '' : undefined}
      aria-selected={isSelected}
    >
      {children}
    </div>
  )
}

export const TabPanels = ({ children, ...props }) => {
  children = React.Children.map(children, (child, index) => {
    return <PanelContext.Provider value={index} children={child} />
  })
  return (
    <div {...props} data-tab-panels="">
      {children}
    </div>
  )
}

export const TabPanel = ({ children, ...props }) => {
  const index = useContext(PanelContext)
  const { tabId, selectedIndex } = useContext(TabsContext)
  const isSelected = index === selectedIndex

  return (
    <div
      id={`tabs-${tabId}-panel-${index}`}
      aria-labelledby={`tabs-${tabId}-panel-${index}`}
      {...props}
      data-tab-panel=""
    >
      {children}
    </div>
  )
}
