# Effects

In this exercise there are two tasks, one is easier and one is a little bit more difficult. Do either one you want, or both!

## Task One: Query for Product Categories (Easier)

1. Open `ProductFilters.js`.
2. Currently `categories` is `null` so we need to make it stateful.
3. Then use an effect to query for the categories using the `getCategories` function.
4. Don't forget to do a cleanup function.

Here's how the promise-based `getCategories` works:

```js
getCategories().then(categories => {
}
```

Hey! Are you getting this error "useEffect is called conditionally"? Remember, we can't conditionally call hooks. You might be doing the effect after that early-return `if` statement which is also version of "conditionalizing hooks". So just move the effect above the early return.

## Task Two: Implement the "Use GitHub" feature for signup (Slightly more difficult)

1. Open `Singup.js`
2. Everything is already working except when `Use GitHub` is checked, we need to populate the Full Name and Avatar from a network request to GitHub's API. First, create a `useEffect`.
3. In the effect, query for the user information based on their `username`:

```js
api.auth.getGitHubUser(username).then(user => {
  // look inside user to see what GitHub gives us
  console.log(user)
}
```

Why is this task more difficult?

Keep in mind that you don't want to query GitHub if the user hasn't event typed a username yet. In fact, we might want to wait until we receive a few characters first (like 5 for example). Then when we get a response from GitHub, it might not have any `user` data if the `username` doesn't match anyone. So we probably don't want to set the state unless we have actual user data to set.
