import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody } from '~/Lesson'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from './Accordion'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import './styles.css'

function App() {
  const [index, setIndex] = useState(0)

  return (
    <LessonBody>
      <Accordion onChange={setIndex} defaultIndex={0}>
        <AccordionItem>
          <AccordionButton
            onClick={(e) => {
              e.preventDefault()
              console.log('outer')
            }}
          >
            {index === 0 ? <FaAngleDown /> : <FaAngleRight />}
            <span>What is ARIA?</span>
          </AccordionButton>
          <AccordionPanel>
            A way to make web content more accessible: "Accessible Rich Internet Applications".
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            {index === 1 ? <FaAngleDown /> : <FaAngleRight />}
            <span>What does "a11y" stand for?</span>
          </AccordionButton>
          <AccordionPanel>
            A11y is short for "accessibility" since there are 11 characters between "a" and "y".
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </LessonBody>
  )
}

/*
✅ It works, but needs some improvements...
✅ With `React.cloneElement` and passing props down, there's a high chance for prop
   collisions when the user of our API (the owner) wants to pass in something that's
   similar to what we passed. Also, when pass data down through props because of
   `cloneElement` and we're also using forwarding props, there's a good chance we'll
   get errors like the one we have in the console now.
   - Fix this with context.
✅ Can't add extra DOM container among the buttons or panels
❌ What if the owner wants to pass their on `onClick` to `AccordionButton`? How do
   we mix that with our onClick and how do we honor their `event.preventDefault` if
   they do one?

Problems with React.Children.map technique to get the index 
that we'll fix later
❌ Can't add extra DOM container around accordion item
❌ Can't abstract AccordionItem into another component
*/

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
