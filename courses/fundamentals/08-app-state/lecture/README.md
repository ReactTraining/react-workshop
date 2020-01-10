# Notes for Instructor

## Teach basic context

This one is pretty straightforward because most of the work is already done. It's mostly explaining the code.

1. You'll probably want to make sure you're logged out to start this one. When the app launches, the logout will work.
2. If context wasn't explained in `07-data-flow`, then now is the time to do it. Perhaps start with a basic add-hoc example.
3. Once context is understood, open `AuthState.js` and go over its parts.

## Login

1. Open `PrimaryLayout.js` and the first thing to show is the `<LoginForm />`
2. The form works and will call the `onAuthenticated` callback with a `user`
3. From here, you just need to do this:

```js
dispatch({ type: 'LOGIN', user })
history.push('/')
```

4. Go through the flow of the dispatch leading to state changes in the context and how that will rend up causing a re-render on `PrimaryLayout` because it uses `useAuthState()`
5. Now routes that weren't available before are suddenly available. You should be able to click the Avatar and go to the "My Account" section once logged in.
6. You can do the same two lines of code for the `<SignupForm />` callback.

## Logout

1. Open `PrimaryHeader.js`. When the logout handler runs, do this:

```js
api.auth.logout().then(() => dispatch({ type: 'LOGOUT' }))
```

## Login and Refresh, how do we stay logged in?

In the `PrimaryLayout`, do an effect to get the current logged in user. Then dispatch them if one exists:

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
