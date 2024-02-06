# Hooks

## Goals

Prepare a login form so it operates correctly with good or bad user input. Then memoize the `GoogleMaps` component.

## Task 1

The login form currently works with the credentials `admin` and `admin` (for username and password). You just need to handle the error-case when the credentials are not `admin` and `admin`. In the `catch`, you'll need to:

1. Set loading to be false.
2. Clear the input fields so the user has to re-type them.
3. Focus on the username input field

Hint:

```js
usernameRef.current.focus()
```

## Task 2

The `AccountPage` component becomes visible once you login. The `Counter` component will re-render the `AccountPage` every time the `count` state changes. This will then re-render the `GoogleMaps` component.

1. Use React's `memo` function to memoize the `GoogleMaps` component so that it will not re-render unless it's props change. When you do this, the component WILL still re-render because the props being passed in are an object which will be a new and different object from the last render.
2. Use React's `useMemo` hook to stabilize the `pos` variable in `AccountPage` so that it does not become a new and different variable on every re-render

## Finished When

You're finished when the login experience is complete with form clearing and re-focusing on failed login attempts and when the `Counter` component doesn't inadvertently re-render the `GoogleMaps` component.
