import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from './Accordion'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import './styles.scss'

function App() {
  const [index, setIndex] = React.useState(0)

  return (
    <div>
      <p>
        Want to read more about{' '}
        <button onClick={() => null} className="as-link">
          a11y
        </button>
      </p>

      <Accordion onChange={setIndex}>
        <AccordionItem>
          <AccordionButton>
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
    </div>
  )
}

/*
✅ It works, but needs some improvements...
❌ Accordion cannot be "controlled" from the owner's state

Problems with React.Children.map technique to get the index 
that we'll fix later
❌ Can't add extra DOM container around accordion item
❌ Can't abstract AccordionItem into another component
*/

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
