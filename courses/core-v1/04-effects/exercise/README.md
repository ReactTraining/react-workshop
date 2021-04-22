# Effects

Navigate to any product page (ex: http://localhost:3000/products/1)

When you navigate to a product profile page, a chat widget will pop up for the user to request support for a given product.

Right now the chat pops up immediately when you navigate to a product page. The marketing team thinks this is disruptive and wants us to give the user some time (around 5 seconds) to look at the page before being prompted to chat.

## Task: Delay chat popup for 5 seconds

1. Open `ProductProfile.tsx`
2. Make `chatIsVisible` stateful.
3. After a 5-second timeout, set `chatIsVisible` to `true`. This is a side effect!

You can delay execution of a function by setting a timeout using `window.setTimeout`, which returns a timeout ID.

```js
const TIME_IN_MILLISECONDS = 5000
const timeoutId = window.setTimeout(functionToDelay, TIME_IN_MILLISECONDS)
```

**Hint:** Don't forget to clean up the effect if the component unmounts. You can remove a timeout by passing the returned timeout ID to `window.clearTimeout`.

```js
window.clearTimeout(timeoutId)
```
