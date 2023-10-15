import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody } from '~/Lesson'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure'
import './styles.css'

// Incase you want to test your onChange with icons
// import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

function App() {
  return (
    <LessonBody>
      <Disclosure>
        <DisclosureButton>Click Me</DisclosureButton>
        <DisclosurePanel>Panel Info</DisclosurePanel>
      </Disclosure>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
