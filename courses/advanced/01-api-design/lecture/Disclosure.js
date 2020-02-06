import React, { useState, forwardRef } from 'react'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

export function Disclosure({ children, summary, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  function onClick() {
    setOpen(!open)
  }

  return (
    <div className="disclosure">
      <button onClick={onClick} className="disclosure-target">
        {open ? <FaAngleDown /> : <FaAngleRight />}
        <span>{summary}</span>
      </button>
      <div className="disclosure-panel" hidden={!open}>
        {children}
      </div>
    </div>
  )
}

// Note: The span tag needs to be there for correct `vertical-align: middle` CSS to work.
