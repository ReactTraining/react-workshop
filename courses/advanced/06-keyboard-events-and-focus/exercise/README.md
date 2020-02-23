# Keyboard Events and Focus Management

## Task One: Basic Keyboard Events

1. Doing keyboard events for navigating the tabs will require knowledge of the total tab count. In `TabList` we're currently passing down the `index` of each tab through context. Now let's also pass down a `totalTabs` variable which you can get from `React.Children.count(children)`.
2. Now that we have `totalTabs` available in the `Tab` component, we can program a `handleKeyDown` function to pass into `onKeyDown` of the `Tab`. Be sure to use `wrapEvent` so the owner can pass down their own `onKeyDown`.
3. In your `handleKeyDown` function, handle the `event.key` for `Home`, `End`, `ArrowLeft`, `ArrowRight`. In each case, you'll be calling `setSelectedIndex()` with the index you want to change to. You'll need that `totalTabs` key for some conditional logic.

## Task Two: Focus Management

When the user changes tabs with the arrow keys, we need to make sure we also set the focus to that tab. Notice how when you click on the first tab it turns blue but also gets a while focus box around it. If you use the arrow key to move to the next tab it will turn blue but doesn't have focus (doesn't get the white box around it).

1. Create a ref inside the `Tab` component. Combine this ref with `forwardedRef` using `useForkedRef` like this:

```js
const tabref = useRef(null)
const ref = useForkedRef(tabRef, forwardedRef)
```

2. Now you can attach the `ref` to the Tab DOM element instead of only attaching the forwarded ref.
3. Create an effect using `useEffect` where you check to see if this tab is currently selected and if so, focus on it using `tabRef.current.focus()`. After doing this, you might notice that the first tab will have focus when the page first loads. You can use a `ref` to keep track of the mount status of the component and even though the effect will always run on the first mount, you can decide not to set focus if it's the first mount. See the final solution if you need more help.
4. Setup the `tabIndex` for the Tab button. Currently it doesn't have one which means if you have any tabs open that are not the first one, then you start your focus on the "Start Focus Here" button and click tab, the browser will tab through all the non-selected tabs before it gets to your selected one. What we want is for all tabs to have a `tabIndex={-1}` if they aren't selected so this doesn't happen. But we want to still be able to move focus from the "Start Focus Here" button to the tabs. The solution is to set the `tabIndex` to `-1` if it's not selected and to `0` if it is. Feel free to checkout the final solution.

[Learn more about tab index](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
