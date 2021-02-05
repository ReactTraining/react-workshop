import React from 'react'
import { Task } from 'ProjectPlanner/types'
import { useTheme } from 'ProjectPlanner/ThemeContext'

type Props = {
  task?: Task | null
}

export const TaskColor: React.FC<Props> = ({ task, children }) => {
  // Make a ref for the div below. The "type" for a div is HTMLElementDiv
  // If you're doing TypeScript, you'll need to give useRef that type
  // as a generic: https://github.com/typescript-cheatsheets/react#useref

  // useTheme is just a custom hook to get our websites theme colors.
  // Then we make `statusColor` based on the details of the task
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

  // The whole point of this component is to make a CSS custom property
  // called `--taskColor` on an element which is one of three colors from
  // `statusColor`. This`TaskColor` component just makes a div with that
  // property.But there's no way to add CSS custom properties directly in
  // JSX(like we can with attributes like className).So we made the ref so
  // we can do this more "imperatively".So you'll need a ref and a useEffect
  // or useLayoutEffect.

  return <div>{children}</div>
}
