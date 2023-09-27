# Hooks

## Goals

Prepare a login form so it operates correctly with good or bad user input. Then memoize the `GoogleMaps` component.

## Task 1

In `LoginForm`, there are two refs established for the Username and Password inputs.

1. You still need to attach them to the input JSX: `<input ref={...} >`
2. When the form submits, get the two input values and set them to the `username` and `password` variables
3. At this point you should be able to submit the form with valid credentials
4. If you submit the form with invalid credentials, the form will fail but we need to a: reset the form fields and b: put focus back onto the `username` input field.

Setting focus can be done like this, but see if you can figure out how to reset the inputs.

```js
usernameRef.current.focus()
```

5. Add valid id's to the `username` and `password` via the use `useId()` hook

## Task 2

The `AccountPage` component becomes visible once you login. The `Counter` component will re-render the `AccountPage` every time the `count` state changes. This will then re-render the `GoogleMaps` component.

1. Use React's `memo` function to memoize the `GoogleMaps` component so that it will not re-render unless it's props change. When you do this, the component WILL still re-render because the props being passed in are an object which will be a new and different object from the last render.
2. Use React's `useMemo` hook to stabilize the `pos` variable in `AccountPage` so that it does not become a new and different variable on every re-render

## Finished When

You're finished when the login experience is complete with form clearing and re-focusing on failed login attempts and when the `Counter` component doesn't inadvertently re-render the `GoogleMaps` component.
