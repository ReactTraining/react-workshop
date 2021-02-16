import { TabPanelProps } from '@reach/tabs'
import * as React from 'react'

const TabsContext = React.createContext<TabsContextValue>({
  selectedIndex: -1,
  setSelectedIndex() {},
})
const TabContext = React.createContext<TabContextValue>({ index: -1 })
const PanelContext = React.createContext<PanelContextValue>({ index: -1 })

export function Tabs({ children, ...props }: TabsProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const context: TabsContextValue = {
    selectedIndex,
    setSelectedIndex,
  }

  return (
    <TabsContext.Provider value={context}>
      <div {...props} className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabList({ children, ...props }: TabListProps) {
  children = React.Children.map(children, (child, index) => {
    return <TabContext.Provider value={{ index }} children={child} />
  })

  return (
    <div {...props} className="tab-list" role="tablist">
      {children}
    </div>
  )
}

export function Tab({ children, disabled, ...props }: TabProps) {
  const { index } = React.useContext(TabContext)
  const { selectedIndex, setSelectedIndex } = React.useContext(TabsContext)
  const selected = index === selectedIndex

  return (
    <button
      role="tab"
      {...props}
      aria-selected={selected}
      disabled={disabled}
      className="tab"
      data-selected={selected ? '' : undefined}
      onClick={() => setSelectedIndex(index)}
    >
      {children}
    </button>
  )
}

export function TabPanels({ children, ...props }: TabPanelsProps) {
  children = React.Children.map(children, (child, index) => {
    return <PanelContext.Provider value={{ index }} children={child} />
  })

  return (
    <div {...props} className="tab-panels">
      {children}
    </div>
  )
}

export function TabPanel({ children, ...props }: TabPanelProps) {
  const { index } = React.useContext(PanelContext)
  const { selectedIndex } = React.useContext(TabsContext)
  const selected = selectedIndex === index

  return (
    <div role="tabpanel" {...props} hidden={!selected} className="tab-panel">
      {children}
    </div>
  )
}

export function DataTabs({ data }: DataTabsProps) {
  return (
    <Tabs>
      <TabList>
        {data.map((tab) => (
          <Tab>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map((tab) => (
          <TabPanel>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

interface TabsContextValue {
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
}

interface TabContextValue {
  index: number
}

interface PanelContextValue {
  index: number
}

interface TabsProps extends React.ComponentProps<'div'> {}
interface TabListProps extends React.ComponentProps<'div'> {}
interface TabProps extends React.ComponentProps<'button'> {
  disabled?: boolean
}
interface TabPanelsProps extends React.ComponentProps<'div'> {}
interface DataTabsProps {
  data: { label: string; content: React.ReactNode }[]
}
