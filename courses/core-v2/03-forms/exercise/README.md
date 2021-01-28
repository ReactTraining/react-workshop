# Forms

## ✅ Task 1: Controlled `name` and `content` fields

1. Open `Task.js` and create two pieces of state for `name` and `content`.
2. Make the input and textarea form fields "controlled" by giving them a `value` and an `onChange` prop that controls the newly created state.
3. If you can type into the field and submit the form then you're on the right track. Verify the form is being submitted by checking the console. You should see an empty object for now.

## ✅ Task 2: Collect the form fields into an object

4. Inside the `handleSubmit` function, populate the task object with all the task information. You can see what keys are expected by looking at the `Task` type at the top of the file.

```ts
// The JS Way
const task = {}

// The TS Way with a Task type. We already made this for you
// but it's commented out
const task: Task = {}
```

After this step, you should now be able to submit the form and see the data in the console.

## ✅ Task 3: Refs for Focus

5. After the form is submitted, lets clear the form (by resetting the state). See the `.final` if you need to see what we mean.
6. Let's reset the focus of the cursor to be back on the name input field after submission as well. There is no way to "declaratively" do this with JSX. So you'll have to imperatively do it by working directly with the DOM. For this we'll use a "ref"
7. Create a ref using `useRef()`:

```ts
// For TypeScript, refs can be weird. You'll have to do it like this.
// The instructor can explain later
const nameRef = useRef<HTMLInputElement>(null!)

// For JavaScript, you can just do:
const nameRef = useRef()
```

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
