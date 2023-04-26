import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
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

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
