# Data Flow

# Main Topics to Cover

- ✅ State Lifting
- ✅ Prop Drilling
- ✅ Reducers (with the state in `Board.tsx`)
- ✅ Context

# Lecture

- Our starting point is similar to the ending point for the last exercise.
- Even with the `useTasks` hook (to remove repetitive code) we're still doing an API call for each `TaskCard`. Then doing it again when `TaskDialog` opens.
- Replace the current strategy by doing an API call for all the board's tasks in `Board.tsx`.
- Prop drill a `getBoard` function down to TaskCard and TaskDialog.
- Everything should work except for updating tasks.

## Switch to Context

- Put `getTask` on context instead of prop drilling.
- Put `updateTask` on context.

## Debouncing Updates

```tsx
// const { updateTask } = useContext(BoardContext)
// const [edited, setEdited] = useState(false)
// const { getTask } = useContext(BoardContext)
// const [task, setTask] = useState<Task | null>(null)

// useEffect(() => {
//   const task = getTask(taskId)
//   if (task) setTask(task)
// }, [getTask, taskId])

// function update(partialTask: Partial<Task>) {
//   if (!task) return
//   setTask({ ...task, ...partialTask })
//   setEdited(true)
// }

// useEffect(() => {
//   if (edited && task) {
//     const id = setTimeout(() => {
//       updateTask(task.id, { ...task, name: task.name.trim(), content: task.content.trim() })
//     }, 400)
//     return () => {
//       clearTimeout(id)
//     }
//   }
// }, [edited, task, updateTask])
```
