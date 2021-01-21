import React from 'react'
import { Slider } from '@reach/slider'
import 'ProjectPlanner/Progress.scss'

// type Props = {
//   completedMinutes: number
//   totalMinutes: number
//   color: string
//   onChange(value: number): void
// }

export const Progress = ({ completedMinutes, totalMinutes, color, onChange }) => {
  return (
    <div className="progress" style={{ color }}>
      <Slider min={0} max={totalMinutes} step={1} value={completedMinutes} onChange={onChange} />
    </div>
  )
}
