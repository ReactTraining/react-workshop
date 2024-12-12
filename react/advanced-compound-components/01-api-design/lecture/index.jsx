import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody } from '~/Lesson'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
// import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure.final'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure'
import './styles.css'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <LessonBody>
      <Disclosure onChange={setIsOpen}>
        <DisclosureButton>
          {isOpen ? <FaAngleDown /> : <FaAngleRight />}
          <span>Click Me</span>
        </DisclosureButton>
        <DisclosurePanel>Panel Contents</DisclosurePanel>
      </Disclosure>
    </LessonBody>
  )
}

/*
✅ It works, but needs some improvements...
✅ Be able to rearrange the panel above the button or side-by-side.
✅ Be able to choose the icon and its position (to the left or right of text).
   Or what if we want no icon?
   - Implement an `onChange` for Disclosure
   - We can also implement a render prop on DisclosureButton to 
     contrast the differences
✅ Be able to pass the underlying button own props (like className, id, etc)
   unless we do strange API things like `buttonProps={}`
✅ Convert class-names to data-attributes
❌ Add ARIA
   - aria-expanded on button
   - aria-controls on button
   - data-state: 'open' or 'collapsed' to button and panel (for CSS)
*/

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
