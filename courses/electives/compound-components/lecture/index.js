import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

export function Tabs({ data, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div data-reach-tabs>
      <div data-reach-tab-list>
        {data.map((tab, index) => {
          const selected = index === selectedIndex
          return (
            <button
              key={index}
              role="tab"
              {...props}
              aria-selected={selected}
              data-reach-tab=""
              data-selected={selected ? '' : undefined}
              onClick={() => setSelectedIndex(index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div data-reach-tab-panels="">
        <div data-reach-tab-panel="">
          {data[selectedIndex].content}
        </div>
      </div>
    </div>
  )
}

function App() {
  const tabData = [
    {
      label: 'Login',
      content: <LoginForm />
    },
    {
      label: 'Signup',
      content: <SignupForm />
    }
  ]

  return <Tabs data={tabData} />
}

ReactDOM.render(<App />, document.getElementById('root'))
