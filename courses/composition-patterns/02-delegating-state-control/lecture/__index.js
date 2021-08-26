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
      <Select selectedOption={selectedOption} setSelectedOption={setSelectedOption}>
        <SelectOption value="Banana" />
        <SelectOption value="Kiwi" />
        <SelectOption value="Apple" />
      </Select>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
