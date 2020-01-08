import React, { useState, useContext, createContext, Children } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

const TabsContext = createContext()

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div data-reach-tabs>{children}</div>
    </TabsContext.Provider>
  )
}

const TabContext = createContext()

function TabList({ children }) {
  const wrappedChildren = Children.map(children, (child, index) => (
    <TabContext.Provider value={index}>{child}</TabContext.Provider>
  ))
  return <div data-reach-tab-list>{wrappedChildren}</div>
}

function Tab({ children, isDisabled, ...rest }) {
  const index = useContext(TabContext)
  const { activeIndex, setActiveIndex } = useContext(TabsContext)
  const isActive = index === activeIndex
  return (
    <div
      data-reach-tab
      className={isDisabled ? 'disabled' : isActive ? 'active' : ''}
      onClick={isDisabled ? undefined : () => setActiveIndex(index)}
      {...rest}
    >
      {children}
    </div>
  )
}

function TabPanels({ children }) {
  const { activeIndex } = useContext(TabsContext)
  return <div data-reach-tab-panels>{children[activeIndex]}</div>
}

function TabPanel({ children }) {
  return children
}

function DataTabs({ data }) {
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

function App() {
  const tabData = [
    {
      label: 'Login',
      content: <LoginForm />,
    },
    {
      label: 'Signup',
      content: <SignupForm />,
    },
  ]

  return (
    <div>
      <DataTabs data={tabData} />
    </div>
  )
}

export default App
