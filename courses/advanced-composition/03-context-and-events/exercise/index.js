import React from 'react'
import ReactDOM from 'react-dom'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from './Disclosure'
import './styles.scss'

function App() {
  return (
    <Disclosure>
      <DisclosureButton>Click Me</DisclosureButton>
      <DisclosurePanel>Panel Info</DisclosurePanel>
    </Disclosure>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
