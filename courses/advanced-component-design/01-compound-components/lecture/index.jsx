import React, { useState, createContext, useContext, useId, useRef } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Login } from './utils/Login'
import { Signup } from './utils/Signup'
import './styles.scss'

const TabsContext = createContext()

export function Tabs({ children, index: controlledIndex, onChange, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tabsId = useId()

  const isControlled = controlledIndex != null
  const { current: startedControlled } = useRef(isControlled)
  if (isControlled !== startedControlled) {
    console.error('Youre switching between controlled and uncontrolled')
  }

  const context = {
    tabsId,
    selectedIndex: isControlled ? controlledIndex : selectedIndex,
    onSelect: (index) => {
      setSelectedIndex(index)
      onChange && onChange(index)
    },
  }

  return (
    <TabsContext.Provider value={context}>
      <div {...props} className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabList({ children, ...props }) {
  const { selectedIndex, onSelect, tabsId } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      selected: index === selectedIndex,
      onClick: () => onSelect(index),
      id: `${tabsId}-${index}`,
    })
  })

  return (
    <div {...props} className="tab-list">
      {children}
    </div>
  )
}

function Tab({ children, onClick, selected, id, ...props }) {
  return (
    <button
      role="tab"
      {...props}
      aria-selected={selected}
      className="tab"
      data-selected={selected ? '' : undefined}
      onClick={onClick}
      aria-controls={id}
    >
      {children}
    </button>
  )
}
function TabPanels({ children, ...props }) {
  const { selectedIndex, tabsId } = useContext(TabsContext)

  children = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      selected: index === selectedIndex,
      id: `${tabsId}-${index}`,
    })
  })

  return (
    <div {...props} className="tab-panels">
      {children}
    </div>
  )
}

function TabPanel({ children, selected, id, ...props }) {
  return (
    <div id={id} {...props} className="tab-panel" hidden={!selected}>
      {children}
    </div>
  )
}

function App() {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Signup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
