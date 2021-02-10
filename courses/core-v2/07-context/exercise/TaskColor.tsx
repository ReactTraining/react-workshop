import React from 'react'
import { Task } from './index'
import { useTheme } from './ThemeContext'

type Props = {
  task?: Task | null
}

export const TaskColor: React.FC<Props> = ({ task, children }) => {
  const divRef = React.useRef<HTMLDivElement>(null!)
  const colors = useTheme()

  React.useLayoutEffect(() => {
    if (colors) {
      let statusColor: string | null = null
      if (task) {
        if (task.completedMinutes === 0) {
          statusColor = colors.red
        } else if (task.completedMinutes >= task.minutes) {
          statusColor = colors.green
        } else {
          statusColor = colors.blue
        }
      }
      divRef.current.style.setProperty(`--taskColor`, statusColor)
    }
  }, [colors, task])

  return <div ref={divRef}>{children}</div>
}
