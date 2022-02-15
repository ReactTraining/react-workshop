# State

The main task is to make the fields "controlled" in the signup form so when the form is submitted, it will "console log" the main form fields: fullName, username, and password

## ✅ Task 1: Controlled Form Fields

The form fields are uncontrolled to start, we need to make them controlled with state. The state for the main fields (fullName, username, and password) is already setup for you.

You need to:

1. Set the `value` prop (attribute) in JSX for each field to the corresponding state
2. Add an `onChange` prop in JSX for each field so it can set its state

### ✅ More advanced stuff for Task 1. Skip if you want to Task 2

If you want to solve this in a different (more advanced) way, try storing the main form fields in an object instead:

```ts
const [formValues, setFormValues] = useState({
  fullName: '',
  username: '',
  password: '',
})
```

Just keep in mind you now have to be careful when you call `setFormFields` because you need to keep all the object fields in place when you modify one field. For example if you want to modify the fullName:

```ts
setFormFields({ ...formFields, fullName: event.target.value })
```

## ✅ Task 2: Form Submission

When the form submits, it currently logs the form fields. Let's also reset the form (back to an empty form) and put the focus of the cursor back on the fullName field. You'll need a "ref" for that:

```ts
const fullNameRef = useRef<HTMLInputElement>(null!)

// Then you can do: `fullNameRef.current.focus()` when you need to
```

## ✅ Bonus: Only do bonuses if your group is fast at the other tasks

See if you can figure out a way to utilize the "Auto Username" checkbox. It is not controlled yet so make it controlled just like the "Show Password" checkbox.

Then make the `username` value for the user automatically if they have that checkbox checked. Take the `fullName` value and format it like this for the `username`:

```ts
// Turn to lowercase, then remove spaces
fullName.toLowerCase().replaceAll(/\s/g, '')
```
