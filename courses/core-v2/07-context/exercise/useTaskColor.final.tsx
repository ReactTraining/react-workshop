import { useTheme } from './ThemeContext'
import { Task } from './index'

export const useTaskColor = (task: Task) => {
  const colors = useTheme()
  let taskColor = ''

  if (colors && task) {
    if (task.completedMinutes === 0) {
      taskColor = colors.red
    } else if (task.completedMinutes >= task.minutes) {
      taskColor = colors.green
    } else {
      taskColor = colors.blue
    }
  }

  return taskColor
}
