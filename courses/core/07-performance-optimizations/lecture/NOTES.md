# Performance

1. Change the `useCourses` count to be 10,000. Look at how slow the filter is now 😨
2. Talk about the culprits of the slowness:

- Quick Re-Renders followed by massive iteration on the data
- Calling Get Courses on every re-render

3. We can start by using `useMemo` on `getCourses`
4. Use `startTransition` to isolate `setCourses` as a non-eager update
5. Memoize the iteration by creating a separate `CourseList` component

- Requires us to use `useCallback` for `removeCourse`
