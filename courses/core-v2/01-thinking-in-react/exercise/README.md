# Thinking in React

Remember, the only files you'll ever work on will have corresponding `.final` files. These `.final` files are for you to review while your coding. They are the solution and it's okay to look. 🙂

## ✅ Task 1: Map over array of data

1. We currently have an array of boards. In JSX, use `boards.map(fn)` to iterate over the array and create dynamic JSX:

```js
<div>
  {boards.map((board) => {
    return <div key={board.id}>...</div>
  })}
</div>
```

2. The first JSX node within the map will need a unique `key` prop. The instructor will explain more about this.

## ✅ Task 2: Click Events

3. When the "Remove" button is clicked, call the `removeBoard` function with the task's ID.

## ✅ BONUS TASK!

4. Replace the `h1` and `h2` elements with a custom component called `Heading`. Currently, heading only returns an `h1` element, but see if you can have it return 1 through 6.

5. The `size` prop being passed in is not being used. Turn that numeric value into the className `size-1`, `size-2`, etc...

6. If you want to try out TypeScript, rename the `BrowseBoards.js` extension to `.tsx`. Here's an example Type Alias for the Props of Heading

```ts
type Props = {
  size?: 1 | 2 | 3 | 4
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  [key: string]: any // so you can use `...rest`
  // There are better ways to do `...rest` props in TypeScript, but this is
  // somewhat of a starting point
}
```
