# Data Fetching

# Main Topics to Cover

- ✅ useEffect basic API
- ✅ useEffect as it pertains to data fetching
- ✅ Custom Hooks <-- they need this for the exercise
- ✅ How the dep array works - why do functions go in it sometimes (useCallback)

# Lecture

- Teach the general concept of a "side effect"
- You might need to quickly cover promises for groups who have programming backgrounds in areas that don't have them.
- Explain how in this project, we have promise-based functions that perform api calls: `api.boards.getTask(taskId)`. But we could use a raw fetch request or a library like axios. React is un-opinionated about this.
- The basic API of useEffect.
- Why the linter wants certain things in the dependency array.
- The fact that this linter rule is installed separately.
- The cleanup with `isCurrent`
  - Fixes two bugs:
    - Setting state on unmounted component
    - Prevents rapid re-renders with new `taskId` from creating race conditions with the async nature of network calls. This is why we have a Next and Previous feature to illustrate this. You can also snow down the network with Chrome Dev Tools to demonstrate

If it feels right with the group. You can cover useCallback - probably in a deep dive about why certain variables are or are not required in the dep array.

👉🏻 👉🏻 👉🏻 Be sure to convert the code to a `useTask` custom hook. They will need this for the exercise.
