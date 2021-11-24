import * as React from 'react'
import * as ReactDOM from 'react-dom'
import LoginForm from 'YesterTech/LoginForm'
import SignupForm from 'YesterTech/SignupForm'
import 'YesterTech/styles/global-styles.scss'
import './styles.scss'

export function Tabs({ data, ...props }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  return (
    <div className="tabs">
      <div className="tab-list">
        {data.map((tab, index) => {
          const selected = index === selectedIndex
          return (
            <button
              key={index}
              role="tab"
              {...props}
              aria-selected={selected}
              className="tab"
              data-selected={selected ? '' : undefined}
              onClick={() => setSelectedIndex(index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      <div className="tab-panels">
        <div className="tab-panel">{data[selectedIndex].content}</div>
      </div>
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

  return <Tabs data={tabData} />
}

ReactDOM.render(<App />, document.getElementById('root'))
