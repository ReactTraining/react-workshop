# Notes for Instructor

If context wasn't explained in `07-data-flow`, then now is the time to do it. Perhaps start with a basic add-hoc example.

In this lesson we already have authentication state in a context provider, we just need to wire up login, logout, signup, and when the user refreshes the page to dispatch the auth state.

tldr;

- Add `dispatch({ type: 'LOGIN', user })` for signup, login, and the effect (for refreshes) of `PrimaryLayout.js`.
- Add `dispatch({ type: 'LOGOUT' })` to `PrimaryHeader.js`.
- Explain the basic flow of the client's ability to know about authentication status with context.

## PrimaryLayout.js

Program the effect to get the current authentication status to then dispatch into the auth state context. Then if you scroll down there is a callback for the `<LoginForm />` and `<SignupForm>` which will give you the `user` object so you can do a similar `dispatch` to tell the front-end the login status after those forms are successfully submitted.

Here's what the effect might look like:

```js
useEffect(() => {
  let isCurrent = true
  if (!authenticated) {
    api.auth.getAuthenticatedUser().then(user => {
      if (user && isCurrent) {
        dispatch({ type: 'LOGIN', user })
      }
    })
    return () => (isCurrent = false)
  }
}, [authenticated, dispatch])
```

## Logout `PrimaryHeader.js`

In the callback from the "Logout" button being clicked, do an API request to logout from the server-side, and then dispatch an event to logout from the client-side
