import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { PrimaryLayout } from 'ProjectPlanner/PrimaryLayout'
import 'ProjectPlanner/styles/global-styles.scss'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PrimaryLayout />
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
