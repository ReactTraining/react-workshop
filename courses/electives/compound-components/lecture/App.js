import React, { useState, useContext, createContext, Children } from 'react'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

function Tabs({ data }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div data-reach-tabs>
      <div data-reach-tab-list>
        {data.map((tab, index) => {
          const isActive = index === activeIndex
          return (
            <div
              data-reach-tab
              key={index}
              className={isActive ? 'active' : ''}
              onClick={() => setActiveIndex(index)}
            >
              {tab.label}
            </div>
          )
        })}
      </div>
      <div data-reach-tab-panels>{data[activeIndex].content}</div>
    </div>
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
      <Tabs data={tabData} />
    </div>
  )
}

export default App
