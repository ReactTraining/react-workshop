# Notes for Instructor

The advanced workshop starts with the attendees writing code first. Start with the exercise and have the students follow the README.

When they're finished, this is a great opportunity to have a discussion on the various ways that they may have implemented the `Disclosure` component. Many students will probably create an API with one element like:

```jsx
<Disclosure summary="Click Me">Panel Info</Disclosure>`
```

## Lecture

😡 We can't rearrangement to put the panel above the button or side-by-side.
😡 We can't add extra DOM container among the button and/or panel (like a `div` around the button).
😡 We can't pass the underlying button its own props (like className, id, etc) unless we do some nasty prop forwarding with `buttonProps={}`
😡 We can't forward refs to the panel or button. Even if we did do `forwardRef`, how would we know what element it goes to?
😡 We don't get to choose the icon or it's position (to the left or right of text)

🛠Refactor to Compound Components. See `Disclosure.final.js`

Things to remember while refactoring:

- Use data-attributes instead of classnames -- So that way the forwarded props that the user passes in for things like `className` don't clobber ours, and so we don't pollute the global namespace of CSS for the consumer of our API.
- Add `displayName` -- Devtools just says `<ForwardRef/>` or "Anonymous" (depending on version).

😄 We CAN change the arrangement: `<DisclosurePanel />` before `<DisclosureButton />` if we want.
😄 We CAN pass in our own props in a way that feels more natural without a sloppy API.
😄 We CAN forward refs
😄 We CAN choose the icon now and its relative position to the button's text by passing it in as `children`

😡 Still, we can't add extra DOM container among the button and/or panel.

### Exercise

Let the students refactor to get caught up to where we have our lecture code. Main lesson learned: React gives us the ability to make a composable API.
