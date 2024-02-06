# State

## Goals

Allow the user to fill out the login form and submit. Then the user will see a confirmation form to enter a 4-digit code.

## Task 1

Open `LoginForm.tsx` and add state for `username` and `password`. There's already some state for `loading` in case you need to see an example. After creating state:

1. Add `value` and `onChange` props to the input fields to make them "controlled"
2. After you do step 1, you should be able to login with any credentials and `console.log` the values from the `handleLogin` function.
3. Notice that `handleLogin` will call `onSubmit` to set some `user` state in the parent component.

## Task 2

When the `App` component gets a re-render because the login form set its user state, do some conditional JSX to display the `ConfirmationCode` component instead:

Hint:

```jsx
<div>
  {condition & <CompOne /> : <CompTwo />}
</div>
```

## Task 3

In the `ConfirmationCode` component, make 4 refs (one for each input). Then:

1. Attach the refs to the DOM with `ref={inputRef1}`
2. Use `onChange` on each input ref to focus on the next input after someone types a character

Hint:

```
inputRef2.current.focus()
```

3. Enable the code in the `onSubmit` function to `console.log` the confirmation code

## Finished When

You're finished when you can see the `console.log` of the confirmation code
