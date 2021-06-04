import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from './Accordion'
import './styles.scss'

function App() {
  return (
    <div className="App">
      <Accordion>
        <AccordionItem value="name">
          <h3>
            <AccordionButton>What is your name?</AccordionButton>
          </h3>
          <AccordionPanel>
            <p>My name is Sir Lancelot of Camelot.</p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="quest">
          <h3>
            <AccordionButton>What is your quest?</AccordionButton>
          </h3>
          <AccordionPanel>
            <p>To seek the Holy Grail.</p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="color">
          <h3>
            <AccordionButton>What is your favorite color?</AccordionButton>
          </h3>
          <AccordionPanel>
            <p>Blue.</p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
