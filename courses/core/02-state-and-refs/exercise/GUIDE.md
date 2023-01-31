# State

The main task is to make the fields "controlled" for username and password. The form will then allow the user to login if they type "admin" for both username and password. These are the main tasks. There are some bonuses tasks listed below

## ✅ Task 1: Controlled Form Fields

The username and password are uncontrolled right now. We need to make them controlled with state. You can use the code below if you forgot how to create state:

```ts
// Option One
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

// Option Two
const [formValues, setFormValues] = useState({
  username: '',
  password: '',
})

// There are some tradeoffs to option one vs two. Some things will
// be easier if you do option one, some will be more difficult.
```

If you do option two, keep in mind you'll be setting an object for your state and you'll want to keep all the existing state when setting just one form field:

```ts
setFormValues({ ...formValues, username: event.target.value })
```

## ✅ Task 2: Form Submission

We have a promise-based login function created for you that will resolve if you pass a username and password that are both "admin" and will reject if they're not.

We have the arguments commented out for login because we don't know how you decided to program your state for those two variables. Pass in `username` and `password` and when the promise resolves (for a successful login) we'll give you a `user` object from the server. Call `onSuccess` with that user object (we're already doing this for you) and then you'll need to program the form to clear and to reset focus back to the username.

When you test the form, type bad credentials to see the promise reject. The `.catch` will allow you to set some error state which will lead to a re-render that shows the `<Notice type="error" />` in the JSX.

## ✅ Task 3: Test your Form

When you fill out the form and login, you should be able to follow this flow of your code:

1. With good credentials, the `login` function should resolve and call `onSuccess` with a `user` object.
2. Open the index file which creates `<LoginForm onSuccess={setUser} />`. Make sure you understand how the user object will be added to state in the `App` component (this is already complete).
3. The state change causes a re-render and the JSX conditionally shows a welcoming message now.

If you get this far, you're done. Move onto the Bonus section if you think you'll have time.

## ✅ Bonus: Checkbox for "Show password"

On the web, showing a password to a user is a matter of switching from `<input type="password" />` to `<input type="text" />`. This attribute (prop) can be controlled programmatically from React's state.

1. Make some state called `showPassword` that is a boolean.
2. Use that state to determine if you'll be doing `type="password"` or `type="text"`
3. Make the input controlled with with the `showPassword` state:

```jsx
// Notice for checkboxes, its `checked` and not `value` for controlled:
<input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
```
