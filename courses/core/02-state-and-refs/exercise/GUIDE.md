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

// There are some tradeoffs to option one vs two. Some tasks might be
// easier and some might be more difficult with option one
// (and same for option two).
```

If you do option two, keep in mind you'll be setting an object for your state and you'll want to keep all the existing state when setting just one form field:

```ts
setFormValues({ ...formValues, username: event.target.value })
```

## ✅ Task 2: Form Submission

Complete the if-statement to allow for a successful login if the username and password are both "admin. You can see that setting the error to be `true` will create an error `<Notice type="error" />` in the JSX.

As an optional second part to task two, reset the form and put the focus back on the username after the form is successfully submitted. There is already a ref for you called `usernameRef`

## ✅ Task 3: Login Flow

When you fill out the form and login, you should be able to follow this flow of your code:

1. The if-statement you wrote is mimicking the back-end logic. After the if-statement we have a user object that we pretend we got from the backend.
2. We call `onSuccess` with the user object which gets stored as state in the `App` component.
3. The state change causes a re-render and new instructions for the UI of app. Now a welcome message will show for the logged in Admin user.
4. To make things easier to test, you can start the state with the string `admin` instead of an empty string so the form is pre-populated with the `admin` values:

```ts
const [username, setUsername] = useState('admin')
const [password, setPassword] = useState('admin')
```

If you get this far, you're done. Move onto the Bonus section if you wish.

## ✅ Bonus: Checkbox for "Show password"

On the web, showing a password to a user is a matter of switching from `<input type="password" />` to `<input type="text" />`. This attribute (prop) can be controlled programmatically from React's state.

1. Make some state called `showPassword` that is a boolean.
2. Use that state to determine if you'll be doing `type="password"` or `type="text"`
3. Make the input controlled with with the `showPassword` state:

```jsx
// Notice for checkboxes, its `checked` and not `value` for controlled:
<input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
```
