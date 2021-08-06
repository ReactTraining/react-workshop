# Forms and Events

For this exercise we just want to get some practice typing event handlers.

Start with the `Tabs` component in `Tabs.tsx`. This is a compound component, meaning it has sub-components that only make sense in the context of `Tabs`.

Individual `Tab` components have an event handler to manage selection of each tab for users who want to navigate via keyboard. We want to write an event handler for the component's `onKeyDown` event that enables this.

All of the logic for selecting tabs is already here, we just need to put it together in the event handler.

| Key          | Function to call    |
| ------------ | ------------------- |
| `Home`       | `selectFirstTab`    |
| `End`        | `selectLastTab`     |
| `ArrowLeft`  | `selectPreviousTab` |
| `ArrowRight` | `selectNextTab`     |

Adding types to the event object should help here! The `handleKeyDown` function is already declared and assigned to the `onKeyDown` prop, you just need to complete the event handler depending on the key that is pressed.

**HINT:** Keyboard event objects have a `key` property that matches the string of the key from the table above

Next, go into the actual implementation of our component in `index.tsx` and make the fields in our login form controlled inputs by storing their values in state, and updating them with the `onChange` event.

When we submit the form, do something with those values in the form's `onSubmit` event. You can do whatever you want here, so be creative if you feel like it 🙂