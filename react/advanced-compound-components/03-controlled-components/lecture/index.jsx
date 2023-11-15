import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from './Accordion'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import './styles.css'

function App() {
  const [index, setIndex] = useState(0)

  return (
    <LessonBody>
      <div className="flex gap-6 max-lg:flex-col">
        <div className="lg:flex-1">
          <LessonCard>
            <button onClick={() => setIndex(1)} className="button">
              Open a11y
            </button>
          </LessonCard>
        </div>
        <div className="lg:flex-1">
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
      </div>
    </LessonBody>
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

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
