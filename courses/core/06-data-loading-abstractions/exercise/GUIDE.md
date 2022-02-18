# Data Loading Abstractions

- The main objective is to add a course through the API, then to refetch the data (or somehow invalidate the cache)
- Open `AddCourseForm`. Right now the old strategy for refetching is commented out in the component
- There is a mostly-finished custom hook to abstract the React Query mutation strategy
- Read more about mutations here if you need to: https://react-query.tanstack.com/guides/mutations
- Follow the instructions that are numbered.
- The `useCreateCourse` hook is almost finished except for step 3️⃣ where you need to invalidate the cache
- It's also a little tricky to realize how you even use this abstraction:

```tsx
const createCourse = useCreateCourse()
// call `createCourse({ name: '', slug: '' })` with some form data
```

- When the form is submitted, call that `createCourse` function and then redirect.
- Don't be shy about looking at the solution file.

If it feels like we could have just written a simple `useCreateCourse` hook that does the API call then invalidates the cache without going through `useMutation`, you're right. Sort of...

Consider that when we use `useMutation`, it will mark this part of the cache as being in the middle of a mutation for the `useIsMutating` hook.

Here's a great article on mutations: https://tkdodo.eu/blog/mastering-mutations-in-react-query#what-are-mutations
