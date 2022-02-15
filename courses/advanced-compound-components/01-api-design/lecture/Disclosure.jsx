import * as React from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

// Import or write our own:
// import { useId } from '../../useId'
// function useId() {}

export function Disclosure({ children, label, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen)

  function onSelect() {
    setIsOpen(!isOpen)
  }

  // Notice how awful it is to compose class names. We'll fix it with data-attributes

  return (
    <div className="disclosure">
      <button onClick={onSelect} className={`disclosure-button ${isOpen ? 'open' : 'collapsed'}`}>
        {isOpen ? <FaAngleDown /> : <FaAngleRight />}
        <span>{label}</span>
      </button>
      <div className={`disclosure-panel ${isOpen ? 'open' : 'collapsed'}`} hidden={!isOpen}>
        {children}
      </div>
    </div>
  )
}
