# Data Cache

# Main Topics to Cover

- ✅ Reducers (with the state in `Board.tsx`)
- ✅ Context with Custom Providers/Consumers

# Lecture

- The starting point is similar to the "Data Fetching" exercise.
- We have the `useTasks` hook to remove repetitive code but we're still doing an API call for each `TaskCard`. Then doing it again when `TaskDialog` opens.
- Replace the current strategy by doing an API call for all the board's tasks in `Board.tsx`. Much of the code in `Board.tsx` is already written.
- Make a `getTask` utility function to prop-drill down to `TaskCard` and `TaskDialog`.
- Everything should work except for updating tasks.

## Switch to Context

- Put `getTask` on context instead of prop-drilling.
- Put `updateTask` on context.

## Debouncing Updates

If the group feels comfortable with JS and useEffect, and if there's time :)

In `TaskDialog`, the form updates are hitting the lifted state often and trashing re-renders. Plus we're doing an API call with each one. We could debounce like this:

```tsx
const { updateTask } = useContext(BoardContext)
const [edited, setEdited] = useState(false)
const { getTask } = useContext(BoardContext)
const [task, setTask] = useState<Task | null>(null)

useEffect(() => {
  const task = getTask(taskId)
  if (task) setTask(task)
}, [getTask, taskId])

function update(partialTask: Partial<Task>) {
  if (!task) return
  setTask({ ...task, ...partialTask })
  setEdited(true)
}

useEffect(() => {
  if (edited && task) {
    const id = setTimeout(() => {
      updateTask(task.id, { ...task, name: task.name.trim(), content: task.content.trim() })
    }, 400)
    return () => {
      clearTimeout(id)
    }
  }
}, [edited, task, updateTask])
```
