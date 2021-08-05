# Object Types

We've got a simple todo app in `index.ts`. We've made good progress with our types, but there's still some more work to do.

Several of our functions accept objects as arguments, and at the moment those objects are not typed and are implied as `any`. Let's provide some types for each missing object parameter.

You should be able to figure out the correct types each object key accepts based on how each function is used. For example, if I look at the `toggleEditMode`, I see it takes an object with a `listItem` key. When it is called in `editTask`, I can see that value is an `HTMLElement` type, so I might start with that for my type definition.

Note that there is an interface for the `Todo` type at the bottom. Take a look, it might help you out!

```ts
// this function accepts a Todo object
function getTodoMarkup({ editMode, complete, label }) {
  // ...
}
// incompleteTodos and completeTodos are both arrays of Todo objects
function getMarkup({ incompleteTodos = [], completeTodos = [] }) {
  // ...
}
```
