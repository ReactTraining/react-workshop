# State

## Goals

Allow the user to fill out the login form and submit. Lift the state of the logged-in user for the entire app to have access to.

## Task 1

When you run the code you'll see that the login form already works. Study the code and see how we're collecting the user data from the form and then calling a `login()` function to simulate logging in. Note that we don't persist your login status anywhere so refreshing will start everything all over.

Your task is to "lift the state" of the user. This will require you to:

1. Move the `user` state from the form up to the `App`.
2. pass down an `onSubmit` prop from the `App` to the form.
3. When the user logs in, now call the `onSubmit` function we get as a prop instead of setting state in `LoginForm`.
4. Move the div that shows the user's id from the form to the app in the right box to observe it changing when you login.

## Finished When

You can see the user's ID show up in the white box to the right of the form
