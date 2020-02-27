# Effects

## Task: Query for Product Categories

In the browser, navigate to: http://localhost:3000/products

1. Open `ProductFilters.js`.
2. Currently `categories` is `null` so we need to make it stateful.
3. Then use an effect to query for the categories using the `getCategories` function.
4. Don't forget to do a cleanup function.

Here's how the promise-based `getCategories` works:

```js
getCategories().then(categories => {
  // do more stuff here
}
```

Hey! Are you getting this error "useEffect is called conditionally"? Remember, we can't conditionally call hooks. You might be doing the effect after that early-return `if` statement which is also version of "conditionalizing hooks". So just move the effect above the early return.

## Bonus Task: Custom Hooks

If you have time, try converting the code to a custom hook!
