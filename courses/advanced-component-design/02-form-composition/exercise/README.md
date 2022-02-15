# Form Composition

## ✅ Task 1: Refactor to FieldInput

Refactor `FieldEmail` and `FieldPassword` to the more generic `FieldInput`

1. This component would only be used for `<input>` elements and not `<select>` or `<textarea>`. Those other ones would potentially get their own abstraction. However, we need to consider the different types of inputs and now you'll need to pass a `type` prop. Make the default value "text"

2. Accept a prop called `className` that you'll mix with the existing "form-field" className. You can do this with the `classnames` module we've already imported for you:

```js
classnames('form-field', classnames)
```

3. Accept a prop called `required`. It should be `false` by default unless someone passes in a `true` value. When `true` it should do two things: Add a className called `required` in the same places as the wrap where it has the existing `field-wrap` class. Add a `required={true}` prop onto the input field. The class is for stylistic reasons on the wrap, and the `required` prop (attribute) on the input field is for the actual HTML5 validation.

## ✅ Task 2: First and Last Name

Use your new `FieldInput` for not only the email and password fields, but two new fields for first and last name.
