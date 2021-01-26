import { Nullish, Task } from '../types'
import { useTheme } from '../ThemeContext'

export function useTaskColor(task: Task | Nullish) {
  const { colors } = useTheme()
  let color: string = colors.brightBlue
  if (task && task.completedMinutes === 0) {
    color = colors.red
  } else if (task && task.completedMinutes! >= task.minutes!) {
    color = colors.green
  }
  return color
}
