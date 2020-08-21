import React, { useState, forwardRef } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
// import { useId } from '../../useId'

export function Disclosure({ children, summary, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  function onSelect() {
    setIsOpen(!isOpen)
  }

  // Notice how awful it is to compose class names. We'll fix it with data-attributes

  return (
    <div className="disclosure">
      <button
        onClick={onSelect}
        className={`disclosure-button ${isOpen ? 'open' : 'collapsed'}`}
      >
        {isOpen ? <FaAngleDown /> : <FaAngleRight />}
        <span>{summary}</span>
      </button>
      <div
        className={`disclosure-panel ${isOpen ? 'open' : 'collapsed'}`}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  )
}
