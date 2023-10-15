import React, { useState, useId } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export function Disclosure({ children, label, defaultIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  function onSelect() {
    setIsOpen(!isOpen)
  }

  // Notice how awful it is to build class name strings.
  // We'll fix it with data-attributes

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
