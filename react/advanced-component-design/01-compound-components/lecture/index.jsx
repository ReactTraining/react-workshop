import { useState, createContext, useContext } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Login } from './utils/Login'
import { Signup } from './utils/Signup'
import './styles.scss'

export function Tabs({ data, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

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
      content: <Login />,
    },
    {
      label: 'Signup',
      content: <Signup />,
    },
  ]

  return <Tabs data={tabData} />
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
