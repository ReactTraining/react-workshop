import React, { useState, forwardRef } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import { useId } from '../../useId'

export function Disclosure({
  children,
  summary,
  defaultIsOpen = false
}) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  function onSelect() {
    setIsOpen(!isOpen)
  }

  return (
    <div className="disclosure">
      <button onClick={onSelect} className="disclosure-button">
        {isOpen ? <FaAngleDown /> : <FaAngleRight />}
        <span>{summary}</span>
      </button>
      <div className="disclosure-panel" hidden={!isOpen}>
        {children}
      </div>
    </div>
  )
}
