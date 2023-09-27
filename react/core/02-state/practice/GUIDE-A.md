# State

## Goals

Iterate over the state for the grocery items. Then be able to add or subtract quantity

## Task 1

First, map over the items. In JSX, you can iterate over arrays using `.map` since it's an expression and returns a value

```jsx
<div>
  {items.map((item) => {
    return <div>{/* ... */}</div>
  })}
</div>
```

Be sure to use keys for the first JSX node in the map:

```jsx
<div>
  {items.map((item) => {
    return <div key={item.id}>{/* ... */}</div>
  })}
</div>
```

## Task 2

Add a click event for the Add and Subtract buttons. The functions that you need to call are already written but they take only one argument which is the item's ID. When you add a function to `onClick`, it will be called with the event like this:

```jsx
<button onClick={(event) => {}}></button>
```

Therefore doing this won't work because it will call `addQuantity` with the event, not the item's id

```jsx
<button onClick={addQuantity}></button>
```

This is why you need to "wrap" your call to `addQuantity` in an arrow function so we can pass the arrow function to the onClick and when it gets called, it will call our function where we can pass the ID. See `GroceryList.final.tsx` if you need help visualizing this: Line 40 and Line 46

## Finished When

You're done when the items from state are correctly displayed and you can modify their quantity
