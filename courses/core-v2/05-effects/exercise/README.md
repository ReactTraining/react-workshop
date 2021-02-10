# Effects

Remember that component hierarchy?

```
Board
├──> TaskGroup
     ├──> TaskDialog
     ├──> TaskCard
```

## Pre-requisite: Understanding CSS Custom Properties (aka Custom Variables)

In CSS you can do this:

```css
body {
  --themeColor: red;
}

div.some-component {
  --themeColor: blue;
}

div.some-component a {
  color: var(--themeColor); /* The anchor will be blue because it's more locally scoped */
}
```

On this project, tasks have one of three colors depending on how complete they are. Instead of adding colors on a case-by-case basis, we're not going to make a convenience component called TaskColor does a lot of the work for us.

Currently, anything that needs this "progress color" in the `TaskDialog` and `TaskCard` components is already using `--taskColor`. So we just have to make `--taskColor` available on an HTML element above it.

This is where `TaskColor.tsx` comes in. All it does is take a `task` as a prop, figures out what color it should be, and adds it to a `div` using a CSS custom property of `--taskColor`.

`TaskColor` is already wrapped around the components that need it:

```jsx
// Pseudo Code:
<TaskColor>
  <TaskCard />
</TaskColor>

<TaskColor>
  <TaskDialog />
</TaskColor>
```

## ✅ Task 1: TaskColor

Open `TaskColor.tsx` and follow these steps. There are more details in the file:

1.  Make a ref
2.  Attach the ref to the `div`
3.  Use `useEffect` or `useLayoutEffect` so you can do some functionality after the div is mounted. Remember, your `.current` isn't available on the first render of the component.
4.  Remember that your `divRef.current` is a reference to the actual DOM node for the DIV
5.  The way you set a CSS custom property in JavaScript is:

```js
// Where `el` is a reference to an element. In your case it will be `divRef.current` instead
el.style.setProperty(`--taskColor`, statusColor)
```

6. Note that in the effect, TypeScript will complain that `.current` might not be available yet. So you'll need to do some "Type Narrowing" by doing an if-statement to see if it's available. In React, when you use `someRef.current` in an effect, the `.current` should almost always be available, and in our case it will be. But TypeScript doesn't know that because it doesn't know the nuances of React and when that effect function is called.

This one is a little tricky, especially with TypeScript. Please review the .final version
