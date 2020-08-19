import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from './Disclosure'
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

/*
✅ It works, but needs some improvements...
❌ Accordion cannot be "controlled" from the owner's state
*/

ReactDOM.render(<App />, document.getElementById('root'))
