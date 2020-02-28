import React from 'react'
import ReactDOM from 'react-dom'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel
} from './Accordion'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import './styles.scss'

function App() {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionButton>What is ARIA?</AccordionButton>
        <AccordionPanel>
          A way to make web content more accessible: "Accessible Rich
          Internet Applications".
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>What does "a11y" stand for?</AccordionButton>
        <AccordionPanel>
          A11y is short for "accessibility" since there are 11
          characters between "a" and "y".
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

/*
✅ It works, but needs some improvements...
❌ Can't add extra DOM container among the buttons, panels, or items.
❌ The way we refactored using `React.cloneElement` means that we could experience
   prop collisions with the owner. And mixed with how we're forwarding props means
   that we're sending props to DOM elements we didn't mean to. Can be fixed but it's
   a little bit of a pain.
❌ We don't know the state of `Accordion` in the owner. So we can't change an icon
   depending on open or not.
❌ What if the owner wants to pass their on `onClick` to `AccordionButton`? How do
   we mix that with our onClick and how do we honor their `event.preventDefault` if
   they do one?
*/

ReactDOM.render(<App />, document.getElementById('root'))
