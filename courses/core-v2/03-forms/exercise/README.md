# Forms

## ✅ Task 1: Controlled `name` and `content` fields

1. Open `Task.tsx` and create state for `name` and `content`. Notice that the state for the task has been moved to a single object. So create those properties on that object.
2. Make the input and textarea form fields "controlled" by giving them a `value` and an `onChange` prop that controls the newly created state. Notice that if you call `setTask` directly you have to account for all the other state. We created an `update` function for you. Use it like this:

```js
// This will set your entire state so it only has a `name` property. Don't do this
setTask({ name: 'some new name' })

// We created this `update` function for you. It takes an object and "blends" it into
// the existing state. Check out its implementation in `Task.tsx`
update({ name: 'some new name' })
```

3. If you can type into the field and submit the form then you're on the right track. Verify the form is being submitted by checking the console. You should see an empty object for now.

## ✅ Task 2: Submit the form

4. At this point, you should be able to fill out the form and submit it. You'll see the data in the console.
5. Clear the form by setting the state for the task to be the initial values again.

Hint: Use empty strings for `name` and `content`

## ✅ BONUS TASK!

6. Let's reset the focus of the cursor to be back on the name input field after submission as well. There is no way to "declaratively" do this with JSX. So you'll have to imperatively do it by working directly with the DOM. For this we'll use a "ref"
7. Create a ref using `useRef()`:

```ts
// For TypeScript, refs can be weird. Make sure you pass the type
// of the element that will be stored in the ref.
const nameRef = useRef<HTMLInputElement>()

// For JavaScript, you can just do:
const nameRef = useRef()
```

- https://github.com/typescript-cheatsheets/react#useref
- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator

8. Assign the ref to the input like this: `<input ref={nameRef} />`
9. Now at the end of the `handleSubmit` function, make the input focused again.

In JavaScript, you would ordinarily do that like this:

```js
const el = document.getElementById('some-id')
el.focus()
```

All you need is a reference to an element then you can call its `.focus()` method.

In React, a ref's `.current` property _is_ the same thing as what `el` is above. So if you're doing JavaScript you can do this `nameRef.current.focus()`

The `.current` property isn't available though until the DOM has been created. This isn't a big deal for us since the form can only be submitted after the DOM was created, thus the `.current` property will be available in `handleSubmit`.

However, TypeScript isn't going to be okay with us using the `.current` property that can possibly be null. So you'll have to do:

```ts
if (nameRef.current) nameRef.current.focus()

// Or "Optional Chaining" which is actually a JS thing not TS
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
nameRef.current?.focus
```
