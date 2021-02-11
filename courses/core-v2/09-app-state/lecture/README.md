# App State

# Main Topics to Cover

- ✅ Application State in Context
- ✅ Reducers (with the state in `Board.tsx`)
- ✅ Context with Custom Providers/Consumers
- ✅ Efficiencies for real time updates (debounce)
- ✅ Reduce repetitive network requests

# Lecture

- The starting point is similar to the "Data Fetching" exercise.
- We have the `useTasks` hook so we're not repeating useEffect code but we're still doing an API call for each `TaskCard` and when `TaskDialog` opens.
- Replace the current strategy by doing an API call for all the board's tasks in `Board.tsx`. Much of the code in `Board.tsx` is already written.
- Make a `getTask` utility function to prop-drill down to `TaskCard` and `TaskDialog`.
- Everything should work except for updating tasks.

## Switch to Context

- Depending on how far you want to get with the previous steps, the end goal is to switch to context. A `BoardContext` component already exists to help go fast - they should have seen custom providers before so this will be review.

## Debouncing Updates

If there's time:

In `TaskDialog`, the form updates are hitting the lifted state often and trashing re-renders. Plus we're doing an API call with each one. We could debounce like this:

```tsx
const { updateTask, getTask } = useContext(BoardContext)
const [edited, setEdited] = useState(false)
const [task, setTask] = useState<Task | null>(null)

useEffect(() => {
  const task = getTask(taskId)
  if (task) setTask(task)
}, [taskId])

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
