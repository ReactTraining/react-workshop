# Forms

# Main Topics to Cover

- ✅ Formik Basics
- ✅ Formik Validation
- ✅ Field Wrap Abstraction
- ✅ Render Props

# Lecture: Formik Intro

Build a formik form similar to this one.

```jsx
<Formik
  initialValues={{ email: '', password: '' }}
  onSubmit={handleSubmit}
  validate={handleValidation}
>
  <Form className="space-y-3">
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

Since Formik uses Context (Formik is a Provider), show how we can turn `<Field />` into:

```jsx
function EmailField() {
  return <Field name="email" type="email" autoComplete="off" className="form-field" />
}
```

Then use it to demonstrate `useField` to get `meta` data like errors:

```jsx
function EmailField() {
  const [_, meta] = useField('email')
  return (
    <div>
      <Field name="email" type="email" autoComplete="off" className="form-field" />
      {meta.error && <p className="text-sm text-red-700">{meta.error}</p>}
    </div>
  )
}
```

Use this to help understand the usefulness of render props. We can even make our own `Formik` concept to show internally how render props work.

# Lecture: Field Wrap

"field wrapper" abstractions are hard. The beginning of the lecture gives us two components for `FieldEmail` and `FieldPassword` that each implement their own "wrapper code" in a way that feels like it could be abstracted to something like this:

```jsx
function FieldWrap({ label, name, id, ...props }: FieldWrapProps) {
  const [field, meta] = useField(name)
  return (
    <div className="space-y-1">
      <label htmlFor={id}>{label}</label>
      <div>
        <input {...field} {...props} name={name} id={id} />
      </div>
      {meta.error && <p className="text-sm text-red-700">{meta.error}</p>}
    </div>
  )
}
```

This tightly couples the input to the wrapper code though and makes it difficult to customize the wrapper and the input. If we wanted to pass in an extra `className` or any other spreadable props in, where would they go?

Our current abstraction is also difficult to use if we wanted to wrap `textarea` and `select`. So we could replace the `<input />` with a `<Field />` instead. Now we can pass `<FieldWrap as="textarea">` and it will be spread into `<Field>`.

However, we can't do fancy custom input fields like `FieldDatePicker`. The wrapper abstraction and the "field" abstraction are tightly coupled and don't allow us to make more decisions for what kind of input is being wrapped.

## Render Props for FieldWrap:

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
function FieldInput({ name, label, required = false, type = 'text' }) {
  return (
    <FieldWrap name={name} label={label}>
      {(field) => {
        return <input {...field} className="form-field" type={type} required={required} />
      }}
    </FieldWrap>
  )
}
```

Now we're back to where we started but without the repeated wrapping code. However we can easily wrap custom fields like `FieldDatePicker`

The last thing we might want to do is pass a `name` prop into these Field-based components because we might want to have two email on field (for example).

# Final Code

```js
function FieldWrap({ label, name, required = false, children }) {
  const [field, meta] = useField(name)
  const id = useId()
  return (
    <div className={classnames('space-y-1', { required })}>
      <label htmlFor={id}>{label}</label>
      <div>{children({ id, name, ...field })}</div>
      {meta.error && <div>{meta.error}</div>}
    </div>
  )
}

function FieldInput({ name, label, required = false, type = 'text', className, ...props }) {
  return (
    <FieldWrap name={name} label={label} required={required}>
      {(field) => {
        return (
          <input
            {...props}
            {...field}
            className={classnames('form-field', className)}
            type={type}
            required={required}
          />
        )
      }}
    </FieldWrap>
  )
}

function FieldDatePicker({ name, label, ...props }) {
  return (
    <FieldWrap name={name} label={label}>
      {(field) => {
        return (
          <div className="form-field inline-flex items-center">
            <input
              {...field}
              {...props}
              type="text"
              className="flex-1 border-none focus:outline-none"
            />
            <Icon name="calendar" size={1} className="mb-1" />
          </div>
        )
      }}
    </FieldWrap>
  )
}
```
