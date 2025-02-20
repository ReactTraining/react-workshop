# Forms

## Goals

Allow the user to fill out the login form and submit. The form already works but the task is to switch from controlled state to `formData` for the form fields.

## Task 1

Remove the controlled state for the input fields. Remember to look at the JSX and remove corresponding props on input fields as well.

Switch the form to use `FormData`. Create a new instance of `FormData` and pass the `event.currentTarget` into the `FormData` constructor.

Your instance variable will have getters and setters. Use the `.get('username')` method to get the username (same for password). You'll need to also use `as string` in TypeScript to assert that your username and password variables are strings because FormData won't know.

NOTE: You will have to add name attributes for this to work with form data:

```html
<input type="text" name="username" ... />
```

## Finished When

With a successful login, you should see the user's object show up in the JavaScript console just as you did before when the practice started.
