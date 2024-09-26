# Optimistic UI

Start with a basic form submission that asynchronously updates likes:

1. Add our own implementation of `optimisticLikes` with `useState`. Notice how
   `likes` becomes useless / unused. Set set it but nothing uses it. Also re-factor
   to use transitions. See commented solution in App.tsx

2. Refactor `onSubmit={submit}` to `action={action}` and now the homegrown optimistic likes
   don't work.

3. Refactor to useOptimistic, a hook that appears to be designed for form actions:

```ts
const [error, setError] = useState('')
const [likes, setLikes] = useState(0)

const [optimisticLikes, setOptimisticLikes] = useOptimistic(
  likes,
  (currentLikes, newOptimisticLikes: number) => {
    return newOptimisticLikes
  }
)

async function action() {
  setOptimisticLikes(optimisticLikes + 1)
  const data = (await updateDatabase(optimisticLikes + 1).then((r) => r.json())) as ResponseData

  if (!data.error) {
    console.log(data.likes)
    setLikes(data.likes)
  } else {
    setLikes(data.likes)
    setError(data.error)
  }
}
```

4. Now with useOptimistic, if we go back and re-factor to `onSubmit={submit}`, we can see a warning:

Warning: An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition.
