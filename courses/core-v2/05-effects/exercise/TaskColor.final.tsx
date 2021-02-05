import React from 'react'
import { Task } from 'ProjectPlanner/types'
import { useTheme } from 'ProjectPlanner/ThemeContext'

type Props = {
  task?: Task | null
}

export const TaskColor: React.FC<Props> = ({ task, children }) => {
  const divRef = React.useRef<HTMLDivElement>(null!) // <-- See the TypeScript cheat sheet for ! (Non Null Assertion)
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
    // Without the non-null assertion, you need `if (!divRef.current) return`
    divRef.current.style.setProperty(`--taskColor`, statusColor)
  }, [statusColor])

  return <div ref={divRef}>{children}</div>
}
