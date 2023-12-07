# Rendering Performance

This practice has three tabs where the rendering of the second tab is significantly slower than the others. If you click on the second tab and then immediately click to one the fast tabs you'll have to wait until the slow tab finishes first before you'll see your second clicked tab show.

Decide if `useTransition` or `useDeferredValue` is better suited to make this UI faster

Here is the syntax for each:

```js
/****************************************
  useTransition
*****************************************/
const [pending, startTransition] = useTransition()

function someEvent() {
  setState() // high priority
  startTransition(() => {
    setState() // low priority
  })
}

/****************************************
  useDeferredValue
*****************************************/
const [myState, setMyState] = useState()
const myStateDeferred = useDeferredValue(myState)
```

## Task 1

Make the UI faster by allowing the user to click on the slow tab then immediately click on a fast tab. Clicking the fast tab should show the fast tab soon instead of waiting for the slow tab to finish.

## Bonus Task

When a tab is clicked, it gets a darker background color if you pass a prop of `selected={true}`. Right now that prop is being passed but the user doesn't see the color until the tab is fully rendered. This means if we click on the slow tab, we have to wait a few seconds for it to render but also the tab's background color remains light and there's no visual queue to know we even clicked. See if you can fix this issue.

Hint: you'll need another `useState`

## Bonus Task

When a tab is "loading", like in the case of the slow tab, it would be nice if there was a "Loading..." indicator.
