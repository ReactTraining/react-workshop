import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody } from '~/Lesson'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure.final'
import './styles.css'

function App() {
  return (
    <LessonBody>
      <Disclosure>
        <DisclosureButton>
          {(isOpen) => {
            return (
              <>
                {isOpen ? <FaAngleDown /> : <FaAngleRight />}
                <span>Click Me</span>
              </>
            )
          }}
        </DisclosureButton>

        <DisclosurePanel>Panel Info</DisclosurePanel>
      </Disclosure>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
