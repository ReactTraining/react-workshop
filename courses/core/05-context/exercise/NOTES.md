# Context

Currently, three components all use the `useCourses` custom hook abstraction individually:

- `BrowseCourses`
- `BrowseCourseLessons`
- `PreviousNextCourse`

In one way this is nice because each is not repeating code, but the bad thing perhaps is that we are running the same query over and over as the user navigates around the app.

What if we moved this `useCourses` data into a state that is lifted up for everyone to use. Then to avoid the deep prop drilling, we can pass down the state through context.

# Task 1: Create an abstraction for Context

1. In the `index.tsx` file, we render the `App` with some other providers wrapped around it. You need to wrap the `CourseProvider` in a similar way to the other providers. This file doesn't have a `final` to review.
2. Open `CoursesContext.jsx`. Notice it's not TypeScript, this will make it easier if you're newer to React and TypeScript to stay focused on just context with React.
3. Open `BrowseCourses.tsx` and find this line of code:

```tsx
const { courses, isLoading, refetch } = useCourses()
```

This is what we need to put in the `CoursesProvider` abstraction now. Keep it in the `BrowseCourses` page for now but make a copy of it at the top of `CoursesProvider`.

4. Now you need to make the context which has three parts:

- Make the context variable, remember this goes outside of the components
- Make the provider JSX and wrap the children (there's a comment where the children variable is now). Remember to pass a `context` variable into the provider as a `value` prop. We have the `context` variable made for you (commented out)
- Make a custom hook for consuming the context (already made for you). You just need to add the `useContext` part:

```js
// Part One: Create Context Variable
const CoursesContext = createContext()

// Part Two: Create Provider
<CourseContext.Provider value={context}>{children}</CourseContext.Provider>

// Part Three: Consume Context
const context = useContext(CourseContext)
```

👀 If you have steps 1-4 done, you should be able to render your code without errors. However, even though context is ready to be used, nobody is using it. Go to these three files and change out their use of the `useCourses` custom hook for `useCoursesContext` instead:

5. `BrowseCourses.tsx`
6. `PreviousNextCourse.tsx`

These two files will be the easiest because you just need to switch from `useCourses` to `useCoursesContext`

```js
// const { courses, isLoading, refetch } = useCourses()
const { courses, isLoading, refetch } = useCoursesContext()
```

There is no final file provided because it's just one line of code that changes.

7. `BrowseCourseLessons.tsx`

This last file is a little more tricky because it wants the _lessons_ of a particular course and the course itself. Here's how we are currently doing that:

```tsx
// Get a course
const { courses, isLoading, refetch } = useCourses()
const course = courses?.find((c) => c.slug === courseSlug)
const lessons = course?.lessons
```

Notice how we derive the `course` and `lessons` from the array of courses. Sure we could have had a special ApI call just for those things but starting from this point is a bit easier to refactor into where we're going with context. Here's what it needs to be now:

```tsx
// Get a course
const { getCourse, isLoading, refetch } = useCourses()
const course = getCourse(courseSlug)
const lessons = course?.lessons
```

Notice that one of the items passed down through context is a `getCourse` function and we can call that with the slug we have to get the course we want. Then we can dig into that course to get the lessons the same way.
