## Data Fetching

Start in `BrowseCourseLessons` with a basic data-fetching effect. Teach these concepts:

- What a "side effect" is in JavaScript
- Render Phase and when component effects need to run
- Dependency Array
- Cleanup Function
- Using `useCallback`

### Event-based Side Effects

In `BrowseCourses` there's a working `removeCourse` function that can be used to start conversations about:

- Whether or not all side effects need to be in `useEffect`
- How we could use `useEffect` instead of having the side effect in the function
- How effects contrast with class-components and cDM, cDU, cWU and why hooks were created
  in the first pace (better abstractions with functional composition)
- How do we update (sync) the state after the delete to the database

## Advanced: Effect Abstraction

Show how we can convert the side effect to `useCourseLessons`. This can start a conversation about code-reuse and abstractions. We can explain how there could now be lots of similar data fetching hooks, or we could make a useApi/usePromise hook instead to reduce boilerplate:

```jsx
export function usePromise<T>(promise: any, defaultRun: boolean = true) {
  const [run, setRun] = useState<{} | boolean>(defaultRun)
  const [results, setResults] = useState<T>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!run) return
    let isCurrent = true
    setIsLoading(true)
    promise()
      .then((results: T) => {
        if (!isCurrent) return
        setIsLoading(false)
        setResults(results)
      })
      .catch((error: any) => {
        setIsLoading(false)
        setError(error)
      })
    return () => {
      isCurrent = false
    }
  }, [promise, run])

  function refetch() {
    setRun({})
  }

  return { results, isLoading, error, refetch }
}
```

## Advanced: Syncing State with Database:

Keeping state in sync with the database can be tricky -- like when we add a lesson to our list from the modal dialog or when we delete a lesson.

Let's discuss various strategies for deleting a lesson and updating our state:

- Refresh the page (bad)
- The "delete" api could in theory return a new list of results that match the original query for the page
  - This is usually bad because it makes our REST architecture brittle and tightly coupled to the views of the front-end
  - Other REST-ful requests like POST are known for returning the data they made, but this can often not be what you need to display results on the page. What if the back-end query was complex in how it joined data from many tables, the response from POST would not be enough to renew our stat with
- Use an immutable strategy to update our state (the current solution)
  - Can be bad for pagination
- Refetch data
  - Costs and extra round trip
  - setState to tell a local useEffect to reRun and not just as an API call directly from the deletion promise chain (which can't be cleaned up). Running from the same useEffect also DRY's up the code

With the refetch data strategy, we can now refetch the list after the modal adds a listing as well
