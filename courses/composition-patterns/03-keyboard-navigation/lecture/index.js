import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Select, SelectOption } from './Select'
// import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import './styles.scss'

function App() {
  let [selectedOption, setSelectedOption] = React.useState('Banana')
  return (
    <div>
      <p>What is you favorite fruit?</p>
      <Select>
        <SelectOption value="Banana" />
        <SelectOption value="Kiwi" />
        <SelectOption value="Apple" />
      </Select>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// This works OK but needs a lot more!
// - Support for proper labels for assistive technology
// - Proper keyboard event handling
// - More nuanced mouse/pointer event handling
