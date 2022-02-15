# State Lecture

# Main Topics to Cover

- ✅ Formik Basics
- ✅ Form Validation
- ✅ Render Props

# Lecture: Formik Intro

Build a formik form similar to this one.

```jsx
<Formik
  initialValues={{ email: '', password: '' }}
  onSubmit={handleSubmit}
  validate={handleValidation}
>
  <Form className="spacing">
    <div>
      <Field name="email" type="email" autoComplete="off" className="form-field" />
    </div>
    <div>
      <Field name="password" type="password" className="form-field" />
    </div>
    <button type="submit" className="button">
      Submit
    </button>
  </Form>
</Formik>
```

Use it to explain basic Formik API concepts. Then use it to demonstrate `useField` to get `meta` data like errors:

```jsx
function EmailField() {
  const [_, meta] = useField('email')
  return (
    <div>
      <Field name="email" type="email" autoComplete="off" className="form-field" />
      {meta.error && <p>{meta.error}</p>}
    </div>
  )
}
```

Use this to help understand the usefulness of render props. We can even make our own `Formik` concept to show internally how render props work.

# Lecture: Field Wrap

"field wrapper" abstractions are hard. The beginning of the lecture gives us two components for `FieldEmail` and `FieldPassword` that each implement their own "wrapper code" in a way that feels like it could be abstracted to something like this:

```jsx
function FieldWrap({ label, name, ...props }: FieldWrapProps) {
  const [field, meta] = useField(name)
  return (
    <div className="field-wrap">
      <label htmlFor="email">{label}</label>
      <div>
        <input {...field} {...props} name={name} />
      </div>
      {meta.error && <div>{meta.error}</div>}
    </div>
  )
}
```

This tightly couples the input to the wrapper code though and makes it difficult to customize the wrapper and the input. If we wanted to pass in an extra `className` or any other spreadable props in, where would they go?

This would be a good time to implement `useId` for generic ids.

Our current abstraction is also difficult to use if we wanted to wrap `textarea` and `select`. So we could replace the `<input />` with a `<Field />` instead. Now we can pass `<FieldWrap as="textarea">` and it will be spread into `<Field>`.

However, we can't do fancy custom input fields like `FieldDatePicker`. The wrapper abstraction and the "field" abstraction are tightly coupled and don't allow us to make more decisions for what kind of input is being wrapped.

If we change the `FieldWrap` to use a render-prop, the form starts to look like this:

```jsx
<FieldWrap label="Email" name="email">
  {(props) => {
    return <input {...props} className="form-field" type="email" />
  }}
</FieldWrap>
```

This isn't too bad, but if you have to repeat that over for every field, then this might be better:

```jsx
function FieldEmail() {
  return (
    <FieldWrap label="Email" name="email">
      {(props) => {
        return <input {...props} className="form-field" type="email" />
      }}
    </FieldWrap>
  )
}

// <FieldEmail /> in the form
```

Now we're back to where we started but without the repeated wrapping code. However we can easily wrap custom fields like `FieldDatePicker`

The last thing we might want to do is pass a `name` prop into these Field-based components because we might want to have two email on field (for example).
