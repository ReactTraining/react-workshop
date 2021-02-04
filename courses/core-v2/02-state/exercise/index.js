import React from 'react'
import ReactDOM from 'react-dom'
// import { Task } from './Task'
import { Task } from './Task.final'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function App() {
  return <Task />
}

ReactDOM.render(<App />, document.getElementById('root'))
