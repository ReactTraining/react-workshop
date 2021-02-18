import React, { useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

const colors = {
  red: '#ff5656',
  green: '#4dd579',
  blue: '#04b3ff',
}

export const TaskCard: React.FC<{ color: string }> = ({ color }) => {
  const taskRef = useRef<HTMLDivElement>(null)

  // We need to apply the CSS property of `--taskColor` to the div below.
  // We have a ref made, and this is the line of code that will address
  // that ref and assign the CSS Property, but there's a few steps missing.
  // See the README.md
  // taskRef.current.style.setProperty(`--taskColor`, colors[color])

  return (
    <div className="task-card spacing">
      <Heading>Task Card</Heading>
      {color && <span>{colors[color]}</span>}
    </div>
  )
}
