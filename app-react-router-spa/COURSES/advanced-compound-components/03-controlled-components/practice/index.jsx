import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody } from '~/Lesson'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure'
import './styles.css'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <LessonBody>
      <Disclosure onChange={() => setOpen(!open)}>
        <DisclosureButton>
          {open ? <FaAngleDown /> : <FaAngleRight />}
          <span>Click Me</span>
        </DisclosureButton>
        <DisclosurePanel>Panel Info</DisclosurePanel>
      </Disclosure>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
