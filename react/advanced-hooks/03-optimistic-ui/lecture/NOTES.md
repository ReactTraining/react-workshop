# Optimistic UI

Start with a basic form submission that asynchronously updates likes:

1. Add own own implementation of `optimisticLikes` with `useState`. Notice how
   `likes` becomes useless / unused. Set set it but nothing uses it

```ts
const [error, setError] = useState('')
const [likes, setLikes] = useState(0)
const [optimisticLikes, setOptimisticLikes] = useState(0)

async function submit(e: React.FormEvent) {
  e.preventDefault()

  setOptimisticLikes(optimisticLikes + 1)
  const data = (await updateDatabase(optimisticLikes + 1).then((r) => r.json())) as ResponseData

  if (!data.error) {
    console.log(data.likes)
    setLikes(data.likes)
  } else {
    setLikes(data.likes)
    setOptimisticLikes(data.likes)
    setError(data.error)
  }
}
```

2. Refactor to use form actions. Now all of a sudden our `setOptimisticLikes` will not re-render
   until the action has resolved which means we're back to being broken.

3. Refactor to useOptimistic, a hook that appears to be designed for form actions:

```ts
const [error, setError] = useState('')
const [likes, setLikes] = useState(0)

// const [optX, setOptX] = useOptimistic(x, (current, newOptX) => {})

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
