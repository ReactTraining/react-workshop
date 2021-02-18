# Effects

## A Little Background on CSS Properties

In modern CSS, you can create Custom Properties (aka Custom Variables) by prefixing with `--`. Notice how the color of the `a` elements in this sample CSS will get their color from `var(--themeColor)`. By looking at the CSS, you can probably tell the `a` is inside `div.some-component` which is inside `body`. When you use a CSS custom property with `var()`, it will look for the nearest one in the hierarchy, which would give us a blue color:

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

## ✅ Task 1: Change the `--themeColor` to match the color prop

If you want to open `styles.scss`, you'll see a few things referring to `--taskColor`, and the `body` has a default grayish color applied to that property. So we're going to make a more local `--taskColor` so the parts that read from `-taskColor` will read our local value.

1. A `taskRef` is already made for you. Apply it to the `div` using the `ref` prop.
2. The commented-out line of code that starts with `taskRef.current.style` will work, but not right when the component function first runs. Remember, the `.current` property of refs won't exist until after the first render-phase (the first pass at calling the component function).
3. `useEffect` will run code just after the render-phase finishes. By the time `useEffect` runs, the DOM will have been created for the div, and the `.current` property of the ref will be available. Use `useEffect` to run that line of code just after the render-phase.

## ✅ Bonus Task:

Try to think of a way to abstract this code with the `ref` and `useEffect`. You can try to do it as a custom hook or a component. Take a look at the `TaskCard.final.tsx` to see an example of doing it as a component.
