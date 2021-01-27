import React from 'react'
import { Task, Nullish } from 'ProjectPlanner/types'
import { useTheme } from './ThemeContext'

type Props = {
  task: Task | Nullish
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

  React.useLayoutEffect(() => {
    if (!ref.current || !statusColor) return
    ref.current.style.setProperty(`--taskColor`, statusColor)
  }, [statusColor])

  return <div ref={ref}>{children}</div>
}
