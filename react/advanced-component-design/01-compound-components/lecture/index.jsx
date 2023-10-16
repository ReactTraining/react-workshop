import { useState, createContext, useContext, useId } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { LessonBody } from '~/Lesson'
import './styles.css'

export function Tabs({ data, ...props }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <LessonBody>
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
    </LessonBody>
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

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
