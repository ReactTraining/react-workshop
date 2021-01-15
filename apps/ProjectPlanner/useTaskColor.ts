import { Task } from 'ProjectPlanner/types'
import { useTheme } from 'ProjectPlanner/ThemeContext'

export function useTaskColor(task: Task | null) {
  const { colors } = useTheme()
  let color: string = colors.brightBlue
  if (task?.completedMinutes === 0) {
    color = colors.red
  } else if (task?.completedMinutes! >= task?.minutes!) {
    color = colors.green
  }
  return color
}
