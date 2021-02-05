import React from 'react'
import { Slider } from '@reach/slider'
import 'ProjectPlanner/Progress.scss'

type Props = {
  completedMinutes: number
  totalMinutes: number
  onChange(value: number): void
  // Some lessons use this
  status?: undefined | 'none' | 'progress' | 'complete'
}

export const Progress: React.FC<Props> = ({ completedMinutes, totalMinutes, onChange, status }) => {
  return (
    <div className="progress" data-status={status}>
      <Slider min={0} max={totalMinutes} step={1} value={completedMinutes} onChange={onChange} />
    </div>
  )
}
