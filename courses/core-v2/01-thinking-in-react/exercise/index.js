import React from 'react'
import ReactDOM from 'react-dom'
// import { BrowseBoards } from './BrowseBoards'
import { BrowseBoards } from './BrowseBoards.final'
import 'ProjectPlanner/styles/global-styles.scss'
import 'ProjectPlanner/Heading.scss'
import './styles.scss'

function App() {
  return <BrowseBoards />
}

ReactDOM.render(<App />, document.getElementById('root'))
