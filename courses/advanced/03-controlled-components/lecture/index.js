import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from './Accordion'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import './styles.scss'

function App() {
  const [index, setIndex] = useState(0)

  return (
    <Accordion onChange={setIndex}>
      <AccordionItem>
        <AccordionButton>
          {index === 0 ? <FaAngleDown /> : <FaAngleRight />}
          <span>Step 1: Do a thing</span>
        </AccordionButton>
        <AccordionPanel>Panel for Step 1</AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          {index === 1 ? <FaAngleDown /> : <FaAngleRight />}
          <span>Step 2: Do another thing</span>
        </AccordionButton>
        <AccordionPanel>Panel for Step 2</AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
