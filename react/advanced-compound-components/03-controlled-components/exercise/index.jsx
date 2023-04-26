import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure'
import './styles.scss'

function App() {
  const [open, setOpen] = React.useState(false)

  return (
    <Disclosure onChange={() => setOpen(!open)}>
      <DisclosureButton>
        {open ? <FaAngleDown /> : <FaAngleRight />}
        <span>Click Me</span>
      </DisclosureButton>
      <DisclosurePanel>Panel Info</DisclosurePanel>
    </Disclosure>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
