import React from 'react'
import { Slider } from '@reach/slider'
import './Progress.scss'

export const Progress = ({ completedMinutes, totalMinutes, status = 'progress', onChange }) => {
  return (
    <div className="progress" data-status={status}>
      <Slider min={0} max={totalMinutes} step={1} value={completedMinutes} onChange={onChange} />
    </div>
  )
}
