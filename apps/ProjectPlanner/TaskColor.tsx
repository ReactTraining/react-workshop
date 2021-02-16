import React, { useLayoutEffect } from 'react'
import { Task } from 'ProjectPlanner/types'
import { useTheme } from 'ProjectPlanner/ThemeContext'

type Props = {
  task?: Task | null
}

export const TaskColor: React.FC<Props> = ({ task, children }) => {
  const ref = React.useRef<HTMLDivElement>(null!)
  const { colors } = useTheme()
  let statusColor: string | null = null

  if (task) {
    if (task.completedMinutes === 0) {
      statusColor = colors.red
    } else if (task.completedMinutes >= task.minutes) {
      statusColor = colors.green
    } else {
      statusColor = colors.brightBlue
    }
  }

  useLayoutEffect(() => {
    if (!ref.current || !statusColor) return
    ref.current.style.setProperty(`--taskColor`, statusColor)
  }, [statusColor])

  return <div ref={ref}>{children}</div>
}
