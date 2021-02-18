import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { TaskCard } from './TaskCard'
// import { TaskCard } from './TaskCard.final'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function App() {
  const [color, setColor] = useState<string | null>(null)

  return (
    <div className="spacing">
      <div className="horizontal-spacing">
        <button
          onClick={() => {
            setColor('red')
          }}
          className="button button-small"
        >
          Red
        </button>
        <button
          onClick={() => {
            setColor('green')
          }}
          className="button button-small"
        >
          Green
        </button>
        <button
          onClick={() => {
            setColor('blue')
          }}
          className="button button-small"
        >
          Blue
        </button>
      </div>
      <TaskCard color={color} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
