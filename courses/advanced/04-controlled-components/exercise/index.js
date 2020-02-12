import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure'
import './styles.scss'

function App() {
  const [open, setOpen] = useState(true)

  return (
    <Disclosure open={open} onChange={() => setOpen(!open)}>
      <DisclosureButton>Click Me</DisclosureButton>
      <DisclosurePanel>Panel Info</DisclosurePanel>
    </Disclosure>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
