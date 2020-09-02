import React from 'react'
import ReactDOM from 'react-dom'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure'
import './styles.scss'

// Incase you want to test your onChange with icons
// import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

function App() {
  return (
    <Disclosure>
      <DisclosureButton>Click Me</DisclosureButton>
      <DisclosurePanel>Panel Info</DisclosurePanel>
    </Disclosure>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
