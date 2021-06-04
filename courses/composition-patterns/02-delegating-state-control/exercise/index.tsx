import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import { Disclosure, DisclosureButton, DisclosurePanel } from './Disclosure'
import './styles.scss'

function App() {
  return (
    <div className="App">
      <Disclosure>
        <DisclosureButton>I just want to tell you how I'm feeling</DisclosureButton>
        <DisclosurePanel>
          <blockquote>
            <p>
              Never gonna give you up. Never gonna let you down. Never gonna run around and desert
              you.
            </p>
            <p>
              Never gonna make you cry. Never gonna say goodbye. Never gonna tell a lie and hurt you
            </p>
            <cite>Richard Paul Astley</cite>
          </blockquote>
        </DisclosurePanel>
      </Disclosure>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
