import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from './Accordion'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import './styles.scss'

function App() {
  const [index, setIndex] = useState(0)

  console.log(index)

  return (
    <Accordion onChange={setIndex} defaultIndex={0}>
      <AccordionItem>
        <AccordionButton>
          {index === 0 ? <FaAngleDown /> : <FaAngleRight />}
          <span>What is ARIA?</span>
        </AccordionButton>
        <AccordionPanel>
          A way to make web content more accessible: "Accessible Rich Internet
          Applications".
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          {index === 1 ? <FaAngleDown /> : <FaAngleRight />}
          <span>What does "a11y" stand for?</span>
        </AccordionButton>
        <AccordionPanel>
          A11y is short for "accessibility" since there are 11 characters between "a" and
          "y".
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

/*
✅ It works, but needs some improvements...
❌ Can't add extra DOM container among the buttons, panels, or items.
❌ With `React.cloneElement` and passing props down, there's a high chance for prop
   collisions when the user of our API (the owner) wants to pass in something that's
   similar to what we passed. Fix this with context.
❌ What if the owner wants to pass their on `onClick` to `AccordionButton`? How do
   we mix that with our onClick and how do we honor their `event.preventDefault` if
   they do one?
*/

ReactDOM.render(<App />, document.getElementById('root'))
