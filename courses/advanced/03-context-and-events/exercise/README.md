# Context and Events

## Task One: Refactor with context

In this task we replace the implicit props that were being passed done through the `React.cloneElement` technique to using context instead:

```jsx
// This goes in `Disclosure`
const context = {
  /* Put the props that we were passing down with cloneElement here instead */
}

<DisclosureContext.Provider children={children} value={context} />
```

## Task Two: Add an `onChange` to `Disclosure`

- When the owner provides an `onChange` function, pass the new `isOpen` status.
- In Disclosure, only call the `onChange` function if one was passed in.
- Make sure you test things out by adding an `onChange` in the owner and that you get the open state passed.

## Task Three: Add an `onClick` to `DisclosureButton`

- Merge the `onSelect` that we need with the `onClick` that the owner passed in using `wrapEvent`
- Make sure you test things out by adding an `onClick` in the owner and that you can do `event.preventDefault` to stop the default behavior of `Disclosure`.
