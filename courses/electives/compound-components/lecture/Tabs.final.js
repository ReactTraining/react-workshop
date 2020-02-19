import React, { useState, useContext } from 'react'

const TabsContext = React.createContext()
const TabContext = React.createContext()

export function Tabs({ children }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <TabsContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      <div data-reach-tabs="">{children}</div>
    </TabsContext.Provider>
  )
}

export function TabList({ children }) {
  children = React.Children.map(children, (child, index) => (
    <TabContext.Provider value={index}>{child}</TabContext.Provider>
  ))

  return <div data-reach-tab-list="">{children}</div>
}

export function Tab({ children, disabled, ...props }) {
  const index = useContext(TabContext)
  const { selectedIndex, setSelectedIndex } = useContext(TabsContext)
  const selected = index === selectedIndex

  return (
    <button
      {...props}
      data-reach-tab=""
      className={disabled ? 'disabled' : selected ? 'active' : ''}
      onClick={disabled ? undefined : () => setSelectedIndex(index)}
    >
      {children}
    </button>
  )
}

export function TabPanels({ children, ...props }) {
  const { selectedIndex } = useContext(TabsContext)
  return (
    <div {...props} data-reach-tab-panels="">
      {children[selectedIndex]}
    </div>
  )
}

export function TabPanel({ children, ...props }) {
  return (
    <div {...props} data-reach-tab-panel="">
      {children}
    </div>
  )
}

export function DataTabs({ data }) {
  return (
    <Tabs>
      <TabList>
        {data.map(tab => (
          <Tab>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map(tab => (
          <TabPanel>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
