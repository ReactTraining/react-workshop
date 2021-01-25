import React from 'react'
import ReactDOM from 'react-dom'
import { TaskCard } from './TaskCard'
// import { TaskCard } from './TaskCard.final'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function App() {
  return <TaskCard />
}

ReactDOM.render(<App />, document.getElementById('root'))
