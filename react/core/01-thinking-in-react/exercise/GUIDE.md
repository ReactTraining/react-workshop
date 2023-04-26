# Thinking in React

## ✅ Task 1: Iterate over data

In JSX, you can iterate over arrays using `.map` since it's an expression and returns a value

```jsx
<div>
  {courses.map((course) => {
    return <div>{/* ... */}</div>
  })}
</div>
```

Be sure to use keys for the first JSX node in the map. The instructor will explain this in more detail:

```jsx
<div>
  {courses.map((course) => {
    return <div key={course.id}>{/* ... */}</div>
  })}
</div>
```

## ✅ Task 2: Removing a course

The remove button currently has `null` as its `onClick` value which means React will just ignore the `onClick` altogether. Swap out the `null` for a call to `removeCourse`. Keep in mind when you pass a function to `onClick`, it will be called with a first argument for the `event` object. You really want `removeCourse` called with the `courseId`

## ✅ All Finished?

Ask the instructor about making a `Heading` component
