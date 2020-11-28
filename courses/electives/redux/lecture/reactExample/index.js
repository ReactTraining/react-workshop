import * as React from 'react'
import * as ReactDOM from "react-dom"
import { Provider as ReduxProvider } from 'react-redux'
import store from './store'
import PrimaryLayout from './PrimaryLayout'

function App() {
  return (
    <ReduxProvider store={store}>
      <PrimaryLayout />
    </ReduxProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
