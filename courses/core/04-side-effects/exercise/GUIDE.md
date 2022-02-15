# Side Effects

## ✅ Task 1: Get Courses

1. Open `BrowseCourses.tsx`.
2. In the browser, navigate to `http://localhost:3000/admin/courses`
3. Write a `useEffect` to get all the courses. Hint, the effect is identical to the code in `PreviousNextCourse` if you want to peek 👀.
4. When the page loads and you finish the effect, you should be able to see a list of courses
5. Click on Any course to see the list of lessons for that course, and on that page you'll see the implementation of `PreviousNextCourse`

## ✅ Task 2: Custom Hook

1. Since we now have the same useEffect logic twice, refactor `BrowseCourses` and `PreviousNextCourse` to use the existing `useAllCourses.ts` custom hook.

Remember, the main reason for custom hooks is code-reuse, not "state sharing" between the two components.
